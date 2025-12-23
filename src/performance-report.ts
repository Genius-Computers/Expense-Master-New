export const performanceReportPage = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير الأداء</title>
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
                    <i class="fas fa-chart-line text-green-600 ml-3"></i>
                    تقرير الأداء الشامل
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

        <!-- Filter Section -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6 no-print">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-filter ml-2"></i>
                تصفية التقرير
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">من تاريخ</label>
                    <input type="date" id="startDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">إلى تاريخ</label>
                    <input type="date" id="endDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex items-end">
                    <button onclick="loadPerformanceReport()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all">
                        <i class="fas fa-search ml-2"></i>
                        تطبيق الفلتر
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading Indicator -->
        <div id="loading" class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-6xl text-blue-600"></i>
            <p class="mt-4 text-xl text-gray-600">جاري تحميل البيانات...</p>
        </div>

        <!-- KPI Cards -->
        <div id="kpiCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" style="display: none;">
            <!-- Cards will be inserted here -->
        </div>

        <!-- Charts Section -->
        <div id="charts" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" style="display: none;">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">الطلبات حسب الحالة</h3>
                <canvas id="requestStatusChart"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">الإيرادات الشهرية</h3>
                <canvas id="monthlyRevenueChart"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">نمو العملاء</h3>
                <canvas id="customerGrowthChart"></canvas>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">أداء الموظفين</h3>
                <canvas id="employeePerformanceChart"></canvas>
            </div>
        </div>

        <!-- Performance Metrics Table -->
        <div id="metricsTable" class="bg-white rounded-xl shadow-lg overflow-hidden mb-8" style="display: none;">
            <div class="p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-chart-bar ml-2"></i>
                    مقاييس الأداء التفصيلية
                </h2>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-700 mb-3">معدلات التحويل</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">من زائر إلى عميل:</span>
                                <span class="font-bold text-blue-600" id="conversionRate">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">من عميل إلى طلب:</span>
                                <span class="font-bold text-blue-600" id="requestRate">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">معدل إتمام الطلبات:</span>
                                <span class="font-bold text-blue-600" id="completionRate">-</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-700 mb-3">متوسط الأوقات</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">وقت معالجة الطلب:</span>
                                <span class="font-bold text-green-600" id="avgProcessingTime">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">وقت الرد على العميل:</span>
                                <span class="font-bold text-green-600" id="avgResponseTime">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">دورة حياة العميل:</span>
                                <span class="font-bold text-green-600" id="customerLifecycle">-</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                        <h4 class="font-bold text-gray-700 mb-3">المؤشرات المالية</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">متوسط قيمة الطلب:</span>
                                <span class="font-bold text-purple-600" id="avgOrderValue">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">إجمالي الإيرادات:</span>
                                <span class="font-bold text-purple-600" id="totalRevenue">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">نمو الإيرادات:</span>
                                <span class="font-bold text-purple-600" id="revenueGrowth">-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Performers -->
        <div id="topPerformers" class="bg-white rounded-xl shadow-lg overflow-hidden" style="display: none;">
            <div class="p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-trophy ml-2"></i>
                    أفضل الأداءات
                </h2>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المرتبة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد العملاء</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الطلبات</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات المقبولة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">معدل النجاح</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجمالي التمويل</th>
                        </tr>
                    </thead>
                    <tbody id="topPerformersBody" class="bg-white divide-y divide-gray-200">
                        <!-- Rows will be inserted here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let performanceData = null;
        let charts = {};

        async function loadPerformanceReport() {
            try {
                const token = localStorage.getItem('authToken') || localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;

                let url = '/api/reports/performance';
                const params = new URLSearchParams();
                if (startDate) params.append('start_date', startDate);
                if (endDate) params.append('end_date', endDate);
                if (params.toString()) url += '?' + params.toString();

                const response = await fetch(url, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                if (!response.ok) {
                    throw new Error('Failed to load performance report');
                }

                performanceData = await response.json();

                // Hide loading, show content
                document.getElementById('loading').style.display = 'none';
                document.getElementById('kpiCards').style.display = 'grid';
                document.getElementById('charts').style.display = 'grid';
                document.getElementById('metricsTable').style.display = 'block';
                document.getElementById('topPerformers').style.display = 'block';

                // Render all sections
                renderKPICards();
                renderCharts();
                renderMetrics();
                renderTopPerformers();

            } catch (error) {
                console.error('Error loading performance report:', error);
                document.getElementById('loading').innerHTML = \`
                    <div class="text-center py-12">
                        <i class="fas fa-exclamation-triangle text-6xl text-red-600"></i>
                        <p class="mt-4 text-xl text-red-600">حدث خطأ في تحميل التقرير</p>
                        <p class="text-gray-600">\${error.message}</p>
                    </div>
                \`;
            }
        }

        function renderKPICards() {
            const kpis = [
                { title: 'إجمالي الطلبات', value: performanceData.total_requests, icon: 'fa-file-alt', color: 'blue', trend: '+12%' },
                { title: 'معدل القبول', value: performanceData.approval_rate + '%', icon: 'fa-check-circle', color: 'green', trend: '+5%' },
                { title: 'العملاء النشطين', value: performanceData.active_customers, icon: 'fa-users', color: 'purple', trend: '+8%' },
                { title: 'الإيرادات الشهرية', value: formatCurrency(performanceData.monthly_revenue), icon: 'fa-dollar-sign', color: 'yellow', trend: '+15%' }
            ];

            const html = kpis.map(kpi => \`
                <div class="stat-card bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-gray-500 text-sm font-medium">\${kpi.title}</span>
                        <span class="text-green-600 text-sm font-bold">\${kpi.trend}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-3xl font-bold text-gray-800">\${kpi.value}</p>
                        </div>
                        <div class="bg-\${kpi.color}-100 rounded-full p-3">
                            <i class="fas \${kpi.icon} text-2xl text-\${kpi.color}-600"></i>
                        </div>
                    </div>
                </div>
            \`).join('');

            document.getElementById('kpiCards').innerHTML = html;
        }

        function renderCharts() {
            // Chart 1: Request Status
            const ctx1 = document.getElementById('requestStatusChart').getContext('2d');
            if (charts.requestStatus) charts.requestStatus.destroy();
            charts.requestStatus = new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: ['قيد المعالجة', 'مقبول', 'مرفوض'],
                    datasets: [{
                        data: [
                            performanceData.pending_requests,
                            performanceData.approved_requests,
                            performanceData.rejected_requests
                        ],
                        backgroundColor: ['#fbbf24', '#10b981', '#ef4444']
                    }]
                }
            });

            // Chart 2: Monthly Revenue (dummy data)
            const ctx2 = document.getElementById('monthlyRevenueChart').getContext('2d');
            if (charts.monthlyRevenue) charts.monthlyRevenue.destroy();
            charts.monthlyRevenue = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                    datasets: [{
                        label: 'الإيرادات',
                        data: [120000, 150000, 180000, 220000, 260000, 300000],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true
                    }]
                }
            });

            // Chart 3: Customer Growth (dummy data)
            const ctx3 = document.getElementById('customerGrowthChart').getContext('2d');
            if (charts.customerGrowth) charts.customerGrowth.destroy();
            charts.customerGrowth = new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                    datasets: [{
                        label: 'عملاء جدد',
                        data: [10, 15, 25, 30, 35, 40],
                        backgroundColor: '#3b82f6'
                    }]
                }
            });

            // Chart 4: Employee Performance (dummy data)
            const ctx4 = document.getElementById('employeePerformanceChart').getContext('2d');
            if (charts.employeePerformance) charts.employeePerformance.destroy();
            charts.employeePerformance = new Chart(ctx4, {
                type: 'radar',
                data: {
                    labels: ['جودة الخدمة', 'سرعة الأداء', 'رضا العملاء', 'معدل الإغلاق', 'الالتزام'],
                    datasets: [{
                        label: 'متوسط الأداء',
                        data: [85, 90, 88, 92, 95],
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderColor: '#10b981'
                    }]
                }
            });
        }

        function renderMetrics() {
            document.getElementById('conversionRate').textContent = performanceData.conversion_rate + '%';
            document.getElementById('requestRate').textContent = performanceData.request_rate + '%';
            document.getElementById('completionRate').textContent = performanceData.completion_rate + '%';
            
            document.getElementById('avgProcessingTime').textContent = performanceData.avg_processing_time + ' يوم';
            document.getElementById('avgResponseTime').textContent = performanceData.avg_response_time + ' ساعة';
            document.getElementById('customerLifecycle').textContent = performanceData.customer_lifecycle + ' يوم';
            
            document.getElementById('avgOrderValue').textContent = formatCurrency(performanceData.avg_order_value);
            document.getElementById('totalRevenue').textContent = formatCurrency(performanceData.total_revenue);
            document.getElementById('revenueGrowth').textContent = performanceData.revenue_growth + '%';
        }

        function renderTopPerformers() {
            const performers = performanceData.top_performers || [];
            const tbody = document.getElementById('topPerformersBody');
            
            const rows = performers.map((p, index) => \`
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full \${index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'} font-bold">
                            \${index + 1}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap font-medium">\${p.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">\${p.customers_count}</td>
                    <td class="px-6 py-4 whitespace-nowrap">\${p.requests_count}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-green-600 font-bold">\${p.approved_count}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                            \${p.success_rate}%
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-purple-600 font-bold">\${formatCurrency(p.total_amount)}</td>
                </tr>
            \`).join('');

            tbody.innerHTML = rows || '<tr><td colspan="7" class="text-center py-8 text-gray-500">لا توجد بيانات</td></tr>';
        }

        function formatCurrency(amount) {
            if (!amount) return '0 ريال';
            return parseFloat(amount).toLocaleString('ar-SA') + ' ريال';
        }

        function exportToExcel() {
            alert('جاري تصدير البيانات...');
            // Export implementation
        }

        // Set default dates (last 30 days)
        const today = new Date();
        const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        document.getElementById('endDate').valueAsDate = today;
        document.getElementById('startDate').valueAsDate = lastMonth;

        // Load report on page load
        loadPerformanceReport();
    </script>
</body>
</html>
`;
