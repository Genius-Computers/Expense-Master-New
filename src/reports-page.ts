export const reportsPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منظومة التقارير - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-chart-line ml-3"></i>
                    منظومة التقارير والإحصائيات
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للوحة التحكم
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-users text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-total-customers">0</div>
                        <div class="text-sm opacity-90">إجمالي العملاء</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-file-invoice text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-total-requests">0</div>
                        <div class="text-sm opacity-90">إجمالي الطلبات</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-clock text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-pending-requests">0</div>
                        <div class="text-sm opacity-90">طلبات قيد المراجعة</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-check-circle text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-approved-requests">0</div>
                        <div class="text-sm opacity-90">طلبات موافق عليها</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Report Types -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Customer Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير العملاء</h3>
                    <p class="text-sm text-blue-100 mt-2">تقرير شامل لجميع العملاء وإحصائياتهم</p>
                </div>
                <div class="p-6">
                    <button onclick="generateCustomersReport()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financing Requests Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                    <i class="fas fa-file-invoice text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير طلبات التمويل</h3>
                    <p class="text-sm text-green-100 mt-2">تحليل الطلبات حسب الحالة والفترة</p>
                </div>
                <div class="p-6">
                    <button onclick="generateRequestsReport()" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Performance Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                    <i class="fas fa-chart-bar text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير الأداء</h3>
                    <p class="text-sm text-purple-100 mt-2">تحليل أداء النظام والإحصائيات</p>
                </div>
                <div class="p-6">
                    <button onclick="generatePerformanceReport()" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financial Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
                    <i class="fas fa-dollar-sign text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">التقرير المالي</h3>
                    <p class="text-sm text-yellow-100 mt-2">ملخص المبالغ والتمويلات</p>
                </div>
                <div class="p-6">
                    <button onclick="generateFinancialReport()" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Banks Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                    <i class="fas fa-university text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير البنوك</h3>
                    <p class="text-sm text-teal-100 mt-2">توزيع الطلبات حسب البنوك</p>
                </div>
                <div class="p-6">
                    <button onclick="generateBanksReport()" class="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Custom Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6">
                    <i class="fas fa-cogs text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير مخصص</h3>
                    <p class="text-sm text-pink-100 mt-2">إنشاء تقرير حسب معايير خاصة</p>
                </div>
                <div class="p-6">
                    <button onclick="openCustomReportModal()" class="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        إنشاء تقرير
                    </button>
                </div>
            </div>
        </div>

        <!-- Report Display Area -->
        <div id="report-display" class="hidden">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800" id="report-title">التقرير</h2>
                    <div class="flex gap-2">
                        <button onclick="exportReport('pdf')" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-file-pdf ml-2"></i>
                            تصدير PDF
                        </button>
                        <button onclick="exportReport('excel')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-file-excel ml-2"></i>
                            تصدير Excel
                        </button>
                        <button onclick="printReport()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-print ml-2"></i>
                            طباعة
                        </button>
                        <button onclick="closeReport()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-times ml-2"></i>
                            إغلاق
                        </button>
                    </div>
                </div>
                <div id="report-content" class="prose max-w-none"></div>
            </div>
        </div>
    </div>

    <script>
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Load initial stats
        async function loadStats() {
            try {
                console.log('📊 Loading reports statistics...');
                
                // Use dashboard stats API for better performance
                const statsRes = await axios.get('/api/dashboard/stats', {
                    headers: authToken ? { 'Authorization': 'Bearer ' + authToken } : {}
                });
                
                if (statsRes.data.success) {
                    const stats = statsRes.data.data;
                    console.log('✅ Stats loaded:', stats);
                    
                    document.getElementById('stat-total-customers').textContent = stats.total_customers || 0;
                    document.getElementById('stat-total-requests').textContent = stats.total_requests || 0;
                    document.getElementById('stat-pending-requests').textContent = stats.pending_requests || 0;
                    document.getElementById('stat-approved-requests').textContent = stats.approved_requests || 0;
                } else {
                    console.error('❌ Failed to load stats:', statsRes.data);
                }
            } catch (error) {
                console.error('❌ Error loading stats:', error);
                
                // Fallback: try without authentication
                try {
                    console.log('🔄 Retrying without auth...');
                    const statsRes = await axios.get('/api/dashboard/stats');
                    
                    if (statsRes.data.success) {
                        const stats = statsRes.data.data;
                        document.getElementById('stat-total-customers').textContent = stats.total_customers || 0;
                        document.getElementById('stat-total-requests').textContent = stats.total_requests || 0;
                        document.getElementById('stat-pending-requests').textContent = stats.pending_requests || 0;
                        document.getElementById('stat-approved-requests').textContent = stats.approved_requests || 0;
                    }
                } catch (retryError) {
                    console.error('❌ Retry failed:', retryError);
                }
            }
        }

        // Generate Customers Report
        window.generateCustomersReport = async function() {
            try {
                const response = await axios.get('/api/customers', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                const customers = response.data.data || [];
                
                let html = \`
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-4">تقرير العملاء الشامل</h3>
                        <p class="text-gray-600">إجمالي العملاء: <strong>\${customers.length}</strong></p>
                        <p class="text-gray-600">تاريخ التقرير: <strong>\${new Date().toLocaleDateString('ar-SA')}</strong></p>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم الكامل</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الهاتف</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد الإلكتروني</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع التوظيف</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الراتب الشهري</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الطلبات</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                \`;
                
                customers.forEach(customer => {
                    html += \`
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.full_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.phone}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.email || '-'}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.employment_type}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.monthly_salary?.toLocaleString('ar-SA')} ريال</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.total_requests || 0}</td>
                        </tr>
                    \`;
                });
                
                html += \`
                            </tbody>
                        </table>
                    </div>
                \`;
                
                showReport('تقرير العملاء', html);
            } catch (error) {
                alert('حدث خطأ في تحميل التقرير');
                console.error(error);
            }
        }

        // Generate Requests Report
        window.generateRequestsReport = async function() {
            try {
                const response = await axios.get('/api/financing-requests', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                const requests = response.data.data || [];
                const statusCounts = {
                    pending: requests.filter(r => r.status === 'pending').length,
                    approved: requests.filter(r => r.status === 'approved').length,
                    rejected: requests.filter(r => r.status === 'rejected').length
                };
                
                let html = \`
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-4">تقرير طلبات التمويل</h3>
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <div class="text-yellow-600 text-2xl font-bold">\${statusCounts.pending}</div>
                                <div class="text-sm text-gray-600">قيد المراجعة</div>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <div class="text-green-600 text-2xl font-bold">\${statusCounts.approved}</div>
                                <div class="text-sm text-gray-600">موافق عليها</div>
                            </div>
                            <div class="bg-red-50 p-4 rounded-lg">
                                <div class="text-red-600 text-2xl font-bold">\${statusCounts.rejected}</div>
                                <div class="text-sm text-gray-600">مرفوضة</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم العميل</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البنك</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                \`;
                
                requests.forEach(request => {
                    const statusColors = {
                        pending: 'bg-yellow-100 text-yellow-800',
                        approved: 'bg-green-100 text-green-800',
                        rejected: 'bg-red-100 text-red-800'
                    };
                    const statusText = {
                        pending: 'قيد المراجعة',
                        approved: 'موافق عليه',
                        rejected: 'مرفوض'
                    };
                    
                    html += \`
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">#\${request.id}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${request.customer_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${request.bank_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${request.financing_amount?.toLocaleString('ar-SA')} ريال</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full \${statusColors[request.status]}">
                                    \${statusText[request.status]}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">\${new Date(request.created_at).toLocaleDateString('ar-SA')}</td>
                        </tr>
                    \`;
                });
                
                html += \`
                            </tbody>
                        </table>
                    </div>
                \`;
                
                showReport('تقرير طلبات التمويل', html);
            } catch (error) {
                alert('حدث خطأ في تحميل التقرير');
                console.error(error);
            }
        }

        // Generate Performance Report
        window.generatePerformanceReport = async function() {
            const html = \`
                <div class="text-center py-12">
                    <i class="fas fa-chart-line text-6xl text-purple-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">تقرير الأداء</h3>
                    <p class="text-gray-600">قريباً - سيتم إضافة تحليلات الأداء المتقدمة</p>
                </div>
            \`;
            showReport('تقرير الأداء', html);
        }

        // Generate Financial Report
        window.generateFinancialReport = async function() {
            try {
                const response = await axios.get('/api/financing-requests', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                const requests = response.data.data || [];
                const totalAmount = requests.reduce((sum, r) => sum + (r.financing_amount || 0), 0);
                const approvedAmount = requests
                    .filter(r => r.status === 'approved')
                    .reduce((sum, r) => sum + (r.financing_amount || 0), 0);
                
                const html = \`
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-4">التقرير المالي</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="bg-blue-50 p-6 rounded-lg">
                                <div class="text-blue-600 text-3xl font-bold">\${totalAmount.toLocaleString('ar-SA')} ريال</div>
                                <div class="text-sm text-gray-600 mt-2">إجمالي مبالغ الطلبات</div>
                            </div>
                            <div class="bg-green-50 p-6 rounded-lg">
                                <div class="text-green-600 text-3xl font-bold">\${approvedAmount.toLocaleString('ar-SA')} ريال</div>
                                <div class="text-sm text-gray-600 mt-2">المبالغ الموافق عليها</div>
                            </div>
                        </div>
                    </div>
                \`;
                
                showReport('التقرير المالي', html);
            } catch (error) {
                alert('حدث خطأ في تحميل التقرير');
                console.error(error);
            }
        }

        // Generate Banks Report
        window.generateBanksReport = function() {
            const html = \`
                <div class="text-center py-12">
                    <i class="fas fa-university text-6xl text-teal-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">تقرير البنوك</h3>
                    <p class="text-gray-600">قريباً - سيتم إضافة تحليل توزيع الطلبات حسب البنوك</p>
                </div>
            \`;
            showReport('تقرير البنوك', html);
        }

        // Open Custom Report Modal
        window.generateCustomReport = function() {
            alert('قريباً - سيتم إضافة خاصية التقارير المخصصة');
        }

        // Show Report
        function showReport(title, content) {
            document.getElementById('report-title').textContent = title;
            document.getElementById('report-content').innerHTML = content;
            document.getElementById('report-display').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Close Report
        function closeReport() {
            document.getElementById('report-display').classList.add('hidden');
        }

        // Export Report
        function exportReport(format) {
            alert(\`سيتم تصدير التقرير بصيغة \${format.toUpperCase()} قريباً\`);
        }

        // Print Report
        window.printReport = function() {
            const printContent = document.getElementById('report-content').innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(\`
                <html dir="rtl">
                <head>
                    <title>طباعة التقرير</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                        th { background-color: #f3f4f6; }
                    </style>
                </head>
                <body>
                    \${printContent}
                    <script>window.print(); window.close();</\script>
                </body>
                </html>
            \`);
        }

        // Load stats on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Page loaded, starting to load stats...');
            loadStats();
        });
        
        // Also try to load immediately
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            console.log('🚀 Document ready, loading stats immediately...');
            loadStats();
        }
    </script>
</body>
</html>
`;
