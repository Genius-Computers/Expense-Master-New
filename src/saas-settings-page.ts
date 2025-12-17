export const saasSettingsPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إعدادات SaaS - Multi-Tenant System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50">
    <div class="bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-cogs ml-3"></i>
                    إعدادات نظام SaaS Multi-Tenant
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- System Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-800">نموذج النظام</h3>
                    <i class="fas fa-sitemap text-3xl text-amber-600"></i>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">النوع:</span>
                        <span class="font-bold text-amber-600">SaaS Multi-Tenant</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">الإصدار:</span>
                        <span class="font-bold">v1.0.0</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">الحالة:</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">نشط</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-800">عزل البيانات</h3>
                    <i class="fas fa-database text-3xl text-blue-600"></i>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>tenant_id في كل جدول</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>تصفية تلقائية بالـ APIs</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>عزل كامل للبيانات</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-800">روابط الوصول</h3>
                    <i class="fas fa-link text-3xl text-purple-600"></i>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>Slug: /c/:tenant/*</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-600"></i>
                        <span>Subdomain: قريباً</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-600"></i>
                        <span>Custom Domain: قريباً</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Configuration Sections -->
        <div class="space-y-6">
            <!-- Tenant Management -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
                    <h2 class="text-xl font-bold flex items-center">
                        <i class="fas fa-building ml-3"></i>
                        إدارة الشركات (Tenants)
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-bold text-gray-800 mb-3">الميزات المتاحة</h3>
                            <ul class="space-y-2 text-sm">
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>إنشاء شركات جديدة مع slug فريد</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>تحديد عدد المستخدمين لكل شركة</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>حالات متعددة: نشط، تجريبي، متوقف</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>رابط حاسبة مخصص لكل شركة</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800 mb-3">إجراءات سريعة</h3>
                            <div class="space-y-2">
                                <a href="/admin/tenants" class="block w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg text-center font-bold">
                                    <i class="fas fa-eye ml-2"></i>
                                    عرض جميع الشركات
                                </a>
                                <a href="/admin/tenant-calculators" class="block w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg text-center font-bold">
                                    <i class="fas fa-calculator ml-2"></i>
                                    حاسبات الشركات
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Isolation -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <h2 class="text-xl font-bold flex items-center">
                        <i class="fas fa-shield-alt ml-3"></i>
                        عزل البيانات (Data Isolation)
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="border-r border-gray-200 pr-4">
                            <h4 class="font-bold text-gray-800 mb-3">الجداول المحمية</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> customers</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> financing_requests</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> users</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> notifications</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> subscriptions</li>
                            </ul>
                        </div>
                        <div class="border-r border-gray-200 pr-4">
                            <h4 class="font-bold text-gray-800 mb-3">APIs المحمية</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/customers</li>
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/financing-requests</li>
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/users</li>
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/notifications</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800 mb-3">آلية الحماية</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><i class="fas fa-key text-amber-600 ml-1"></i> JWT Token مع tenant_id</li>
                                <li><i class="fas fa-filter text-amber-600 ml-1"></i> WHERE tenant_id = ?</li>
                                <li><i class="fas fa-lock text-amber-600 ml-1"></i> عزل تلقائي</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Statistics -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                    <h2 class="text-xl font-bold flex items-center">
                        <i class="fas fa-chart-bar ml-3"></i>
                        إحصائيات النظام
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-grid">
                        <div class="text-center p-4 bg-emerald-50 rounded-lg">
                            <div class="text-3xl font-bold text-emerald-600" id="stat-tenants">0</div>
                            <div class="text-sm text-gray-600 mt-1">إجمالي الشركات</div>
                        </div>
                        <div class="text-center p-4 bg-blue-50 rounded-lg">
                            <div class="text-3xl font-bold text-blue-600" id="stat-active">0</div>
                            <div class="text-sm text-gray-600 mt-1">شركات نشطة</div>
                        </div>
                        <div class="text-center p-4 bg-purple-50 rounded-lg">
                            <div class="text-3xl font-bold text-purple-600" id="stat-trial">0</div>
                            <div class="text-sm text-gray-600 mt-1">شركات تجريبية</div>
                        </div>
                        <div class="text-center p-4 bg-amber-50 rounded-lg">
                            <div class="text-3xl font-bold text-amber-600" id="stat-total-users">0</div>
                            <div class="text-sm text-gray-600 mt-1">إجمالي المستخدمين</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        async function loadStats() {
            try {
                const [tenantsRes, usersRes] = await Promise.all([
                    axios.get('/api/tenants'),
                    axios.get('/api/users')
                ]);
                
                const tenants = tenantsRes.data.data;
                document.getElementById('stat-tenants').textContent = tenants.length;
                document.getElementById('stat-active').textContent = tenants.filter(t => t.status === 'active').length;
                document.getElementById('stat-trial').textContent = tenants.filter(t => t.status === 'trial').length;
                document.getElementById('stat-total-users').textContent = usersRes.data.data.length;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        loadStats();
    </script>
</body>
</html>
`;
