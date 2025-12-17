export const tenantsPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة الشركات - SaaS Multi-Tenant</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-building ml-3"></i>
                    إدارة الشركات - SaaS Multi-Tenant
                </h1>
                <div class="flex gap-3">
                    <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
                        <i class="fas fa-arrow-right ml-2"></i>
                        العودة للوحة التحكم
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">إجمالي الشركات</p>
                        <p class="text-3xl font-bold text-emerald-600" id="total-tenants">0</p>
                    </div>
                    <i class="fas fa-building text-4xl text-emerald-200"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">شركات نشطة</p>
                        <p class="text-3xl font-bold text-green-600" id="active-tenants">0</p>
                    </div>
                    <i class="fas fa-check-circle text-4xl text-green-200"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">شركات تجريبية</p>
                        <p class="text-3xl font-bold text-yellow-600" id="trial-tenants">0</p>
                    </div>
                    <i class="fas fa-hourglass-half text-4xl text-yellow-200"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">شركات متوقفة</p>
                        <p class="text-3xl font-bold text-red-600" id="suspended-tenants">0</p>
                    </div>
                    <i class="fas fa-ban text-4xl text-red-200"></i>
                </div>
            </div>
        </div>

        <!-- Tenants Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-list ml-2"></i>
                        قائمة الشركات
                    </h2>
                    <button onclick="addTenant()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة شركة جديدة
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الشركة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subdomain</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدمين</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رابط الحاسبة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="tenants-tbody" class="bg-white divide-y divide-gray-200">
                        <!-- Will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        async function loadTenants() {
            try {
                const response = await axios.get('/api/tenants');
                const tenants = response.data.data;
                
                // Update stats
                document.getElementById('total-tenants').textContent = tenants.length;
                document.getElementById('active-tenants').textContent = tenants.filter(t => t.status === 'active').length;
                document.getElementById('trial-tenants').textContent = tenants.filter(t => t.status === 'trial').length;
                document.getElementById('suspended-tenants').textContent = tenants.filter(t => t.status === 'suspended').length;
                
                // Populate table
                const tbody = document.getElementById('tenants-tbody');
                tbody.innerHTML = tenants.map((tenant, index) => \`
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${index + 1}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <i class="fas fa-building text-emerald-600 ml-2"></i>
                                <span class="font-medium text-gray-900">\${tenant.company_name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <code class="bg-gray-100 px-2 py-1 rounded">\${tenant.slug}</code>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <code class="bg-gray-100 px-2 py-1 rounded">\${tenant.subdomain || '-'}</code>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                \${tenant.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  tenant.status === 'trial' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}">
                                \${tenant.status === 'active' ? 'نشط' : tenant.status === 'trial' ? 'تجريبي' : 'متوقف'}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <i class="fas fa-users ml-1"></i>
                            \${tenant.max_users || 10}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <a href="/c/\${tenant.slug}/calculator" target="_blank" 
                               class="text-blue-600 hover:text-blue-800 font-medium">
                                <i class="fas fa-external-link-alt ml-1"></i>
                                فتح الحاسبة
                            </a>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex gap-2">
                                <button onclick="viewTenant(\${tenant.id})" 
                                        class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-all">
                                    <i class="fas fa-eye"></i> عرض
                                </button>
                                <button onclick="editTenant(\${tenant.id})" 
                                        class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-all">
                                    <i class="fas fa-edit"></i> تعديل
                                </button>
                                <button onclick="deleteTenant(\${tenant.id})" 
                                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-all">
                                    <i class="fas fa-trash"></i> حذف
                                </button>
                            </div>
                        </td>
                    </tr>
                \`).join('');
            } catch (error) {
                console.error('Error loading tenants:', error);
                alert('حدث خطأ في تحميل البيانات');
            }
        }

        function addTenant() {
            window.location.href = '/admin/tenants/add';
        }

        function editTenant(id) {
            window.location.href = \`/admin/tenants/\${id}/edit\`;
        }

        function viewTenant(id) {
            window.location.href = \`/admin/tenants/\${id}\`;
        }

        async function deleteTenant(id) {
            if (!confirm('هل أنت متأكد من حذف هذه الشركة؟')) return;
            
            try {
                await axios.delete(\`/api/tenants/\${id}\`);
                alert('تم حذف الشركة بنجاح');
                loadTenants();
            } catch (error) {
                console.error('Error deleting tenant:', error);
                alert('حدث خطأ في حذف الشركة');
            }
        }

        // Load on page ready
        loadTenants();
    </script>
</body>
</html>
`;

