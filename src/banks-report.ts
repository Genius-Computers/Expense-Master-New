export const banksReportPage = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير البنوك</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
        }
        .stat-card {
            transition: all 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6 no-print">
            <div>
                <a href="/admin/panel" class="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                    <i class="fas fa-arrow-right ml-2"></i> العودة للوحة التحكم
                </a>
                <h1 class="text-4xl font-bold text-gray-800">
                    <i class="fas fa-university text-blue-600 ml-3"></i>
                    تقرير البنوك الشامل
                </h1>
            </div>
            <div class="space-x-2 space-x-reverse">
                <button onclick="window.print()" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-print ml-2"></i>
                    طباعة
                </button>
                <button onclick="exportToExcel()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-file-excel ml-2"></i>
                    تصدير Excel
                </button>
            </div>
        </div>

        <!-- Loading Indicator -->
        <div id="loading" class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-6xl text-blue-600"></i>
            <p class="mt-4 text-xl text-gray-600">جاري تحميل البيانات...</p>
        </div>

        <!-- Summary Cards -->
        <div id="summaryCards" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" style="display: none;">
            <!-- Cards will be inserted here -->
        </div>

        <!-- Charts -->
        <div id="charts" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" style="display: none;">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">توزيع الطلبات حسب البنك</h3>
                <canvas id="requestsByBankChart"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">معدلات القبول حسب البنك</h3>
                <canvas id="approvalRatesChart"></canvas>
            </div>
        </div>

        <!-- Banks Table -->
        <div id="banksTable" class="bg-white rounded-xl shadow-lg overflow-hidden" style="display: none;">
            <div class="p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-table ml-2"></i>
                    تفاصيل البنوك
                </h2>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم البنك</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجمالي الطلبات</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طلبات مقبولة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طلبات مرفوضة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طلبات قيد المعالجة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">معدل القبول</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">متوسط مبلغ التمويل</th>
                        </tr>
                    </thead>
                    <tbody id="banksTableBody" class="bg-white divide-y divide-gray-200">
                        <!-- Rows will be inserted here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let banksData = [];
        let requestsByBankChart = null;
        let approvalRatesChart = null;

        async function loadBanksReport() {
            try {
                const token = localStorage.getItem('authToken') || localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const response = await fetch('/api/reports/banks', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                if (!response.ok) {
                    throw new Error('Failed to load banks report');
                }

                const data = await response.json();
                banksData = data.banks || [];

                // Hide loading, show content
                document.getElementById('loading').style.display = 'none';
                document.getElementById('summaryCards').style.display = 'grid';
                document.getElementById('charts').style.display = 'grid';
                document.getElementById('banksTable').style.display = 'block';

                // Render summary cards
                renderSummaryCards(data.summary);

                // Render charts
                renderCharts();

                // Render table
                renderBanksTable();

            } catch (error) {
                console.error('Error loading banks report:', error);
                document.getElementById('loading').innerHTML = \`
                    <div class="text-center py-12">
                        <i class="fas fa-exclamation-triangle text-6xl text-red-600"></i>
                        <p class="mt-4 text-xl text-red-600">حدث خطأ في تحميل التقرير</p>
                        <p class="text-gray-600">\${error.message}</p>
                    </div>
                \`;
            }
        }

        function renderSummaryCards(summary) {
            const cards = [
                {
                    title: 'إجمالي البنوك',
                    value: summary.total_banks,
                    icon: 'fa-university',
                    color: 'blue'
                },
                {
                    title: 'إجمالي الطلبات',
                    value: summary.total_requests,
                    icon: 'fa-file-alt',
                    color: 'green'
                },
                {
                    title: 'معدل القبول الإجمالي',
                    value: summary.overall_approval_rate + '%',
                    icon: 'fa-check-circle',
                    color: 'purple'
                },
                {
                    title: 'متوسط مبلغ التمويل',
                    value: formatCurrency(summary.average_amount),
                    icon: 'fa-money-bill-wave',
                    color: 'yellow'
                }
            ];

            const html = cards.map(card => \`
                <div class="stat-card bg-white rounded-xl shadow-lg p-6 border-r-4 border-\${card.color}-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium">\${card.title}</p>
                            <p class="text-3xl font-bold text-gray-800 mt-2">\${card.value}</p>
                        </div>
                        <div class="bg-\${card.color}-100 rounded-full p-4">
                            <i class="fas \${card.icon} text-3xl text-\${card.color}-600"></i>
                        </div>
                    </div>
                </div>
            \`).join('');

            document.getElementById('summaryCards').innerHTML = html;
        }

        function renderCharts() {
            // Chart 1: Requests by Bank
            const ctx1 = document.getElementById('requestsByBankChart').getContext('2d');
            const labels = banksData.map(b => b.bank_name);
            const requestsData = banksData.map(b => b.total_requests);

            if (requestsByBankChart) requestsByBankChart.destroy();
            requestsByBankChart = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'عدد الطلبات',
                        data: requestsData,
                        backgroundColor: 'rgba(59, 130, 246, 0.6)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Chart 2: Approval Rates
            const ctx2 = document.getElementById('approvalRatesChart').getContext('2d');
            const approvalRates = banksData.map(b => parseFloat(b.approval_rate) || 0);

            if (approvalRatesChart) approvalRatesChart.destroy();
            approvalRatesChart = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'معدل القبول %',
                        data: approvalRates,
                        backgroundColor: [
                            'rgba(16, 185, 129, 0.6)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(251, 146, 60, 0.6)',
                            'rgba(139, 92, 246, 0.6)',
                            'rgba(236, 72, 153, 0.6)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function renderBanksTable() {
            const tbody = document.getElementById('banksTableBody');
            const rows = banksData.map(bank => \`
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">\${bank.bank_name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-700">\${bank.total_requests}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-green-600 font-bold">\${bank.approved_requests}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-red-600 font-bold">\${bank.rejected_requests}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-yellow-600 font-bold">\${bank.pending_requests}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                            \${bank.approval_rate}%
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-700">\${formatCurrency(bank.average_amount)}</td>
                </tr>
            \`).join('');

            tbody.innerHTML = rows;
        }

        function formatCurrency(amount) {
            if (!amount) return '0 ريال';
            return parseFloat(amount).toLocaleString('ar-SA') + ' ريال';
        }

        function exportToExcel() {
            let csv = '\\uFEFF'; // BOM for UTF-8
            csv += 'اسم البنك,إجمالي الطلبات,طلبات مقبولة,طلبات مرفوضة,طلبات قيد المعالجة,معدل القبول,متوسط مبلغ التمويل\\n';

            banksData.forEach(bank => {
                csv += \`"\${bank.bank_name}",\${bank.total_requests},\${bank.approved_requests},\${bank.rejected_requests},\${bank.pending_requests},\${bank.approval_rate}%,\${bank.average_amount}\\n\`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'تقرير_البنوك_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
        }

        // Load report on page load
        loadBanksReport();
    </script>
</body>
</html>
`;
