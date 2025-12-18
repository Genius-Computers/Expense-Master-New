// Advanced Reports - Customer, Requests, Performance, Financial, Banks Reports

export const customersReportPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير العملاء</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <style>
        /* Custom Scrollbar - Enhanced */
        .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 #f7fafc;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
            border-color: #d1d5db;
        }
        
        /* Force scrollbar to always show */
        .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
        }
        
        .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/reports" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للتقارير
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-users text-blue-600 ml-2"></i>
                تقرير العملاء الشامل
            </h1>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <div>
                    <h2 class="text-xl font-bold">إجمالي العملاء: <span id="totalCustomers" class="text-blue-600">0</span></h2>
                    <p class="text-gray-600 text-sm">تاريخ التقرير: <span id="reportDate"></span></p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <input 
                            type="text" 
                            id="searchInput" 
                            placeholder="بحث في العملاء..." 
                            class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onkeyup="searchTable()"
                        />
                        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                    <button onclick="exportToExcel()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap">
                        <i class="fas fa-file-excel ml-2"></i>
                        تصدير Excel
                    </button>
                </div>
            </div>

            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                <p class="text-gray-600">جاري تحميل البيانات...</p>
            </div>

            <div id="tableContainer" class="hidden overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <tr>
                            <th class="px-4 py-3 text-right">#</th>
                            <th class="px-4 py-3 text-right">الاسم الكامل</th>
                            <th class="px-4 py-3 text-right">الهاتف</th>
                            <th class="px-4 py-3 text-right">البريد الإلكتروني</th>
                            <th class="px-4 py-3 text-right">نوع التوظيف</th>
                            <th class="px-4 py-3 text-right">الراتب الشهري</th>
                            <th class="px-4 py-3 text-right">الالتزامات الشهرية</th>
                            <th class="px-4 py-3 text-right">الموظف المخصص</th>
                        </tr>
                    </thead>
                    <tbody id="reportTable" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let reportData = [];
        const authToken = localStorage.getItem('authToken');
        
        async function loadReport() {
            try {
                const response = await axios.get('/api/customers', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                if (response.data.success) {
                    reportData = response.data.data || [];
                    displayReport();
                }
            } catch (error) {
                console.error('Error loading report:', error);
                alert('حدث خطأ في تحميل التقرير');
            } finally {
                document.getElementById('loading').classList.add('hidden');
            }
        }
        
        function displayReport() {
            document.getElementById('totalCustomers').textContent = reportData.length;
            document.getElementById('reportDate').textContent = new Date().toLocaleDateString('ar-SA');
            document.getElementById('tableContainer').classList.remove('hidden');
            
            const tbody = document.getElementById('reportTable');
            tbody.innerHTML = reportData.map((customer, index) => \`
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">\${index + 1}</td>
                    <td class="px-4 py-3 font-medium">\${customer.full_name}</td>
                    <td class="px-4 py-3">\${customer.phone}</td>
                    <td class="px-4 py-3">\${customer.email || '-'}</td>
                    <td class="px-4 py-3">\${customer.employment_type || '-'}</td>
                    <td class="px-4 py-3">\${(customer.monthly_salary || 0).toLocaleString('ar-SA')} ريال</td>
                    <td class="px-4 py-3">\${(customer.monthly_obligations || 0).toLocaleString('ar-SA')} ريال</td>
                    <td class="px-4 py-3">\${customer.assigned_employee_name || 'غير محدد'}</td>
                </tr>
            \`).join('');
        }
        
        function searchTable() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const tbody = document.getElementById('reportTable');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        window.exportToExcel = function() {
            const ws = XLSX.utils.json_to_sheet(reportData.map(c => ({
                'الاسم': c.full_name,
                'الهاتف': c.phone,
                'البريد': c.email,
                'نوع التوظيف': c.employment_type,
                'الراتب': c.monthly_salary,
                'الالتزامات': c.monthly_obligations,
                'الموظف المخصص': c.assigned_employee_name
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'العملاء');
            XLSX.writeFile(wb, 'تقرير_العملاء_' + new Date().toISOString().split('T')[0] + '.xlsx');
        }
        
        document.addEventListener('DOMContentLoaded', loadReport);
    </script>
</body>
</html>`;

export const requestsReportPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير طلبات التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <style>
        /* Custom Scrollbar - Enhanced */
        .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #22c55e #f7fafc;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
            border-color: #d1d5db;
        }
        
        /* Force scrollbar to always show */
        .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
        }
        
        .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/reports" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للتقارير
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-file-invoice text-green-600 ml-2"></i>
                تقرير طلبات التمويل
            </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">إجمالي الطلبات</div>
                <div class="text-3xl font-bold text-blue-600" id="totalRequests">0</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">قيد المراجعة</div>
                <div class="text-3xl font-bold text-yellow-600" id="pendingRequests">0</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">مقبول</div>
                <div class="text-3xl font-bold text-green-600" id="approvedRequests">0</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">مرفوض</div>
                <div class="text-3xl font-bold text-red-600" id="rejectedRequests">0</div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <canvas id="requestsChart" height="100"></canvas>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h2 class="text-xl font-bold">تفاصيل الطلبات</h2>
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <input 
                            type="text" 
                            id="searchInputRequests" 
                            placeholder="بحث في الطلبات..." 
                            class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            onkeyup="searchRequestsTable()"
                        />
                        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                    <button onclick="exportToExcel()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap">
                        <i class="fas fa-file-excel ml-2"></i>
                        تصدير Excel
                    </button>
                </div>
            </div>

            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-green-600 mb-4"></i>
                <p class="text-gray-600">جاري تحميل البيانات...</p>
            </div>

            <div id="tableContainer" class="hidden overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gradient-to-r from-green-600 to-green-700 text-white">
                        <tr>
                            <th class="px-4 py-3 text-right">رقم الطلب</th>
                            <th class="px-4 py-3 text-right">اسم العميل</th>
                            <th class="px-4 py-3 text-right">البنك</th>
                            <th class="px-4 py-3 text-right">المبلغ المطلوب</th>
                            <th class="px-4 py-3 text-right">الحالة</th>
                            <th class="px-4 py-3 text-right">التاريخ</th>
                        </tr>
                    </thead>
                    <tbody id="reportTable" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let reportData = [];
        const authToken = localStorage.getItem('authToken');
        
        async function loadReport() {
            try {
                const response = await axios.get('/api/financing-requests', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                if (response.data.success) {
                    reportData = response.data.data || [];
                    displayReport();
                    displayChart();
                }
            } catch (error) {
                console.error('Error loading report:', error);
                alert('حدث خطأ في تحميل التقرير');
            } finally {
                document.getElementById('loading').classList.add('hidden');
            }
        }
        
        function displayReport() {
            const stats = {
                total: reportData.length,
                pending: reportData.filter(r => r.status === 'pending').length,
                approved: reportData.filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external').length,
                rejected: reportData.filter(r => r.status === 'rejected').length
            };
            
            document.getElementById('totalRequests').textContent = stats.total;
            document.getElementById('pendingRequests').textContent = stats.pending;
            document.getElementById('approvedRequests').textContent = stats.approved;
            document.getElementById('rejectedRequests').textContent = stats.rejected;
            document.getElementById('tableContainer').classList.remove('hidden');
            
            const tbody = document.getElementById('reportTable');
            tbody.innerHTML = reportData.map(req => {
                const statusColors = {
                    'pending': 'bg-yellow-100 text-yellow-800',
                    'approved': 'bg-green-100 text-green-800',
                    'approved_internal': 'bg-green-100 text-green-800',
                    'approved_external': 'bg-green-100 text-green-800',
                    'rejected': 'bg-red-100 text-red-800'
                };
                const statusText = {
                    'pending': 'قيد المراجعة',
                    'approved': 'مقبول',
                    'approved_internal': 'مقبول (داخلي)',
                    'approved_external': 'مقبول (خارجي)',
                    'rejected': 'مرفوض'
                };
                
                return \`
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3">#\${req.id}</td>
                        <td class="px-4 py-3 font-medium">\${req.customer_name || '-'}</td>
                        <td class="px-4 py-3">\${req.bank_name || '-'}</td>
                        <td class="px-4 py-3">\${(req.requested_amount || 0).toLocaleString('ar-SA')} ريال</td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 text-xs rounded-full \${statusColors[req.status] || 'bg-gray-100 text-gray-800'}">
                                \${statusText[req.status] || req.status}
                            </span>
                        </td>
                        <td class="px-4 py-3">\${new Date(req.created_at).toLocaleDateString('ar-SA')}</td>
                    </tr>
                \`;
            }).join('');
        }
        
        function displayChart() {
            const stats = {
                pending: reportData.filter(r => r.status === 'pending').length,
                approved: reportData.filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external').length,
                rejected: reportData.filter(r => r.status === 'rejected').length
            };
            
            const ctx = document.getElementById('requestsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['قيد المراجعة', 'مقبول', 'مرفوض'],
                    datasets: [{
                        label: 'عدد الطلبات',
                        data: [stats.pending, stats.approved, stats.rejected],
                        backgroundColor: ['#eab308', '#22c55e', '#ef4444']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
        
        function searchRequestsTable() {
            const searchValue = document.getElementById('searchInputRequests').value.toLowerCase();
            const tbody = document.getElementById('reportTable');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        window.exportToExcel = function() {
            const ws = XLSX.utils.json_to_sheet(reportData.map(r => ({
                'رقم الطلب': r.id,
                'العميل': r.customer_name,
                'البنك': r.bank_name,
                'المبلغ': r.requested_amount,
                'الحالة': r.status,
                'التاريخ': r.created_at
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'الطلبات');
            XLSX.writeFile(wb, 'تقرير_الطلبات_' + new Date().toISOString().split('T')[0] + '.xlsx');
        }
        
        document.addEventListener('DOMContentLoaded', loadReport);
    </script>
</body>
</html>`;

export const financialReportPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التقرير المالي</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/reports" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للتقارير
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-dollar-sign text-yellow-600 ml-2"></i>
                التقرير المالي
            </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي المبالغ المطلوبة</div>
                <div class="text-3xl font-bold mt-2" id="totalAmount">0 ريال</div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">المبالغ الموافق عليها</div>
                <div class="text-3xl font-bold mt-2" id="approvedAmount">0 ريال</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي العمولات المدفوعة</div>
                <div class="text-3xl font-bold mt-2" id="commissionsAmount">0 ريال</div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <canvas id="financialChart" height="100"></canvas>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4">متوسط المبالغ</h3>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">متوسط المبلغ المطلوب:</span>
                        <span class="font-bold" id="avgRequested">0 ريال</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">متوسط المبلغ الموافق عليه:</span>
                        <span class="font-bold text-green-600" id="avgApproved">0 ريال</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4">معدل القبول</h3>
                <div class="text-center">
                    <div class="text-5xl font-bold text-green-600" id="approvalRate">0%</div>
                    <div class="text-gray-600 mt-2">من إجمالي الطلبات</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const authToken = localStorage.getItem('authToken');
        
        async function loadReport() {
            try {
                const [requestsRes, paymentsRes] = await Promise.all([
                    axios.get('/api/financing-requests', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    }),
                    axios.get('/api/payments', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    }).catch(() => ({ data: { data: [] } }))
                ]);
                
                const requests = requestsRes.data.data || [];
                const payments = paymentsRes.data.data || [];
                
                const totalAmount = requests.reduce((sum, r) => sum + (r.requested_amount || 0), 0);
                const approvedAmount = requests
                    .filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external')
                    .reduce((sum, r) => sum + (r.requested_amount || 0), 0);
                const commissionsAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
                
                const approvedCount = requests.filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external').length;
                const approvalRate = requests.length > 0 ? ((approvedCount / requests.length) * 100).toFixed(1) : 0;
                
                document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('ar-SA') + ' ريال';
                document.getElementById('approvedAmount').textContent = approvedAmount.toLocaleString('ar-SA') + ' ريال';
                document.getElementById('commissionsAmount').textContent = commissionsAmount.toLocaleString('ar-SA') + ' ريال';
                document.getElementById('avgRequested').textContent = (requests.length > 0 ? (totalAmount / requests.length) : 0).toLocaleString('ar-SA') + ' ريال';
                document.getElementById('avgApproved').textContent = (approvedCount > 0 ? (approvedAmount / approvedCount) : 0).toLocaleString('ar-SA') + ' ريال';
                document.getElementById('approvalRate').textContent = approvalRate + '%';
                
                displayChart(totalAmount, approvedAmount, commissionsAmount);
            } catch (error) {
                console.error('Error loading report:', error);
            }
        }
        
        function displayChart(total, approved, commissions) {
            const ctx = document.getElementById('financialChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['المبالغ المطلوبة', 'الموافق عليها', 'العمولات المدفوعة'],
                    datasets: [{
                        data: [total, approved, commissions],
                        backgroundColor: ['#3b82f6', '#22c55e', '#eab308']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        
        document.addEventListener('DOMContentLoaded', loadReport);
    </script>
</body>
</html>`;
