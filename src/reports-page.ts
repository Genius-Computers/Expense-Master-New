export const reportsPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منظومة التقارير - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
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
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
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
            <!-- Requests Followup Report (Manager Only) -->
            <div id="requestsFollowupReport" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                    <i class="fas fa-tasks text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير متابعة الطلبات</h3>
                    <p class="text-sm text-orange-100 mt-2">متابعة حالة طلبات التمويل والموظفين المخصصين</p>
                </div>
                <div class="p-6">
                    <button onclick="goToRequestsFollowup()" class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Customer Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير العملاء</h3>
                    <p class="text-sm text-blue-100 mt-2">تقرير شامل لجميع العملاء وإحصائياتهم</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('تقرير العملاء')" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financing Requests Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                    <i class="fas fa-file-invoice text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير طلبات التمويل</h3>
                    <p class="text-sm text-green-100 mt-2">تحليل الطلبات حسب الحالة والفترة</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('تقرير طلبات التمويل')" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Performance Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                    <i class="fas fa-chart-bar text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير الأداء</h3>
                    <p class="text-sm text-purple-100 mt-2">تحليل أداء النظام والإحصائيات</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('تقرير الأداء')" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financial Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
                    <i class="fas fa-dollar-sign text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">التقرير المالي</h3>
                    <p class="text-sm text-yellow-100 mt-2">ملخص المبالغ والتمويلات</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('التقرير المالي')" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Banks Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                    <i class="fas fa-university text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير البنوك</h3>
                    <p class="text-sm text-teal-100 mt-2">توزيع الطلبات حسب البنوك</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('تقرير البنوك')" class="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        console.log('📊 Reports page loaded');
        
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Navigate to Requests Followup Report
        window.goToRequestsFollowup = function() {
            console.log('🔗 Navigating to Requests Followup Report');
            console.log('User data:', userData);
            
            if (userData.tenant_id) {
                const url = '/admin/reports/requests-followup?tenant_id=' + userData.tenant_id;
                console.log('Redirecting to:', url);
                window.location.href = url;
            } else {
                console.log('No tenant_id found, redirecting without tenant_id');
                window.location.href = '/admin/reports/requests-followup';
            }
        }

        // Show coming soon message
        window.showComingSoon = function(reportName) {
            alert('قريباً: ' + reportName + '\\n\\nسيتم إضافة هذا التقرير قريباً');
        }

        // Load initial stats
        async function loadStats() {
            try {
                console.log('📊 Loading reports statistics...');
                
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
            }
        }

        // Hide Requests Followup Report for employees
        function applyReportPermissions() {
            const userRole = userData.role || userData.user_type;
            console.log('🔐 Applying permissions for role:', userRole);
            
            // Hide for employees/users
            if (userRole === 'employee' || userRole === 'user') {
                const requestsFollowupCard = document.getElementById('requestsFollowupReport');
                if (requestsFollowupCard) {
                    console.log('❌ Hiding Requests Followup Report for employee');
                    requestsFollowupCard.style.display = 'none';
                }
            } else {
                console.log('✅ Showing Requests Followup Report for:', userRole);
            }
        }

        // Load stats on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Page loaded, initializing...');
            console.log('Auth token:', authToken ? 'Present' : 'Missing');
            console.log('User data:', userData);
            
            loadStats();
            applyReportPermissions();
        });
    </script>
</body>
</html>
`;
