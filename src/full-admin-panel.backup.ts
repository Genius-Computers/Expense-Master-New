export const fullAdminPanel = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        .sidebar-item { transition: all 0.3s; }
        .sidebar-item:hover { background: rgba(255,255,255,0.1); transform: translateX(-5px); }
        .sidebar-item.active { background: rgba(255,255,255,0.2); border-right: 4px solid white; }
        .content-section { display: none; }
        .content-section.active { display: block; animation: fadeIn 0.3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Top Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center space-x-reverse space-x-4">
                <button onclick="toggleDarkMode()" class="p-2 hover:bg-white/10 rounded-lg">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="p-2 hover:bg-white/10 rounded-lg">
                    <i class="fas fa-bell"></i>
                </button>
            </div>
            <div class="flex items-center space-x-reverse space-x-3">
                <div class="text-right">
                    <div class="font-bold">مدير النظام (مدير النظام)</div>
                    <div class="text-xs text-blue-200">admin@tamweel.sa</div>
                </div>
                <i class="fas fa-user-circle text-3xl"></i>
            </div>
        </div>
    </div>

    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-72 bg-gradient-to-b from-blue-700 to-blue-900 text-white overflow-y-auto">
            <div class="p-6">
                <div class="flex items-center justify-center mb-8">
                    <div class="text-center">
                        <i class="fas fa-calculator text-4xl mb-2"></i>
                        <h2 class="text-xl font-bold">حاسبة التمويل</h2>
                    </div>
                </div>
                
                <nav class="space-y-2">
                    <a onclick="showSection('dashboard')" class="sidebar-item active flex items-center p-3 rounded-lg cursor-pointer" data-section="dashboard">
                        <i class="fas fa-tachometer-alt w-6"></i>
                        <span class="mr-3">لوحة المعلومات</span>
                    </a>
                    
                    <a onclick="showSection('customers')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="customers">
                        <i class="fas fa-users w-6"></i>
                        <span class="mr-3">العملاء</span>
                    </a>
                    
                    <a onclick="showSection('financing-requests')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="financing-requests">
                        <i class="fas fa-file-invoice w-6"></i>
                        <span class="mr-3">طلبات التمويل</span>
                    </a>
                    
                    <a onclick="showSection('banks')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="banks">
                        <i class="fas fa-university w-6"></i>
                        <span class="mr-3">البنوك</span>
                    </a>
                    
                    <a onclick="showSection('rates')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="rates">
                        <i class="fas fa-percent w-6"></i>
                        <span class="mr-3">نسب التمويل</span>
                    </a>
                    
                    <a onclick="showSection('subscriptions')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="subscriptions">
                        <i class="fas fa-crown w-6"></i>
                        <span class="mr-3">الاشتراكات</span>
                    </a>
                    
                    <a onclick="showSection('users')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="users">
                        <i class="fas fa-user-cog w-6"></i>
                        <span class="mr-3">المستخدمين</span>
                    </a>
                    
                    <a onclick="showSection('packages')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="packages">
                        <i class="fas fa-box w-6"></i>
                        <span class="mr-3">إدارة الباقات</span>
                    </a>
                    
                    <a onclick="showSection('subscription-requests')" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer" data-section="subscription-requests">
                        <i class="fas fa-clipboard-list w-6"></i>
                        <span class="mr-3">طلبات الاشتراك</span>
                    </a>
                </nav>
                
                <div class="mt-8 pt-8 border-t border-white/20">
                    <a href="/" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer">
                        <i class="fas fa-home w-6"></i>
                        <span class="mr-3">الصفحة الرئيسية</span>
                    </a>
                    <a href="/calculator" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer">
                        <i class="fas fa-calculator w-6"></i>
                        <span class="mr-3">الحاسبة</span>
                    </a>
                    <a onclick="logout()" class="sidebar-item flex items-center p-3 rounded-lg cursor-pointer text-red-300">
                        <i class="fas fa-sign-out-alt w-6"></i>
                        <span class="mr-3">تسجيل الخروج</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto p-6">
            <!-- Dashboard Section -->
            <div id="dashboard-section" class="content-section active">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-tachometer-alt text-blue-600 ml-2"></i>
                    لوحة المعلومات
                </h1>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-blue-100 text-sm mb-1">إجمالي العملاء</p>
                                <p class="text-3xl font-bold" id="stat-customers">0</p>
                            </div>
                            <i class="fas fa-users text-5xl opacity-30"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-green-100 text-sm mb-1">إجمالي الطلبات</p>
                                <p class="text-3xl font-bold" id="stat-requests">0</p>
                            </div>
                            <i class="fas fa-file-invoice text-5xl opacity-30"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-yellow-100 text-sm mb-1">قيد الانتظار</p>
                                <p class="text-3xl font-bold" id="stat-pending">0</p>
                            </div>
                            <i class="fas fa-clock text-5xl opacity-30"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-purple-100 text-sm mb-1">مقبول</p>
                                <p class="text-3xl font-bold" id="stat-approved">0</p>
                            </div>
                            <i class="fas fa-check-circle text-5xl opacity-30"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Additional Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">البنوك النشطة</span>
                            <i class="fas fa-university text-blue-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-banks">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">الاشتراكات النشطة</span>
                            <i class="fas fa-crown text-yellow-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-subscriptions">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">المستخدمين النشطين</span>
                            <i class="fas fa-user-check text-green-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-users">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">إجمالي الحسابات</span>
                            <i class="fas fa-calculator text-purple-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-calculations">0</p>
                    </div>
                </div>
            </div>

            <!-- Customers Section -->
            <div id="customers-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-users text-blue-600 ml-2"></i>
                        إدارة العملاء
                    </h1>
                    <div class="flex space-x-reverse space-x-3">
                        <button onclick="exportExcel('customers')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-file-excel ml-2"></i>
                            تصدير Excel
                        </button>
                        <button onclick="showAddCustomerModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-plus ml-2"></i>
                            إضافة عميل
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="mb-4">
                        <input type="text" id="searchCustomers" placeholder="بحث في العملاء..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الجوال</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البريد</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">جهة العمل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المسمى</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الراتب</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الطلبات</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="customersTable">
                                <tr>
                                    <td colspan="9" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Financing Requests Section -->
            <div id="financing-requests-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-file-invoice text-green-600 ml-2"></i>
                        طلبات التمويل من العملاء
                    </h1>
                    <div class="flex space-x-reverse space-x-3">
                        <select id="filterStatus" onchange="loadFinancingRequests()" class="px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">جميع الحالات</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="approved">مقبول</option>
                            <option value="rejected">مرفوض</option>
                        </select>
                        <select id="filterBank" onchange="loadFinancingRequests()" class="px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">جميع البنوك</option>
                        </select>
                        <button onclick="loadFinancingRequests()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-sync ml-2"></i>
                            تحديث
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-red-100 border-r-4 border-red-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">مرفوض</div>
                        <div class="text-2xl font-bold text-red-600" id="requests-rejected">0</div>
                    </div>
                    <div class="bg-green-100 border-r-4 border-green-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">تحت المعالجة</div>
                        <div class="text-2xl font-bold text-green-600" id="requests-processing">0</div>
                    </div>
                    <div class="bg-purple-100 border-r-4 border-purple-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">تحت المراجعة</div>
                        <div class="text-2xl font-bold text-purple-600" id="requests-review">0</div>
                    </div>
                    <div class="bg-blue-100 border-r-4 border-blue-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">طلب اكتمال بيانات</div>
                        <div class="text-2xl font-bold text-blue-600" id="requests-incomplete">2</div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">العميل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الجوال</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">نوع التمويل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المبلغ</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المدة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البنك</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="requestsTable">
                                <tr>
                                    <td colspan="9" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Other sections will be loaded dynamically -->
            <div id="banks-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-university text-blue-600 ml-2"></i>
                    إدارة البنوك
                </h1>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600">قسم إدارة البنوك - قيد التطوير</p>
                </div>
            </div>

            <div id="rates-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-percent text-green-600 ml-2"></i>
                    نسب التمويل
                </h1>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600">قسم نسب التمويل - قيد التطوير</p>
                </div>
            </div>

            <div id="subscriptions-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-crown text-yellow-600 ml-2"></i>
                    الاشتراكات
                </h1>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600">قسم الاشتراكات - قيد التطوير</p>
                </div>
            </div>

            <div id="users-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-user-cog text-purple-600 ml-2"></i>
                    المستخدمين
                </h1>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600">قسم المستخدمين - قيد التطوير</p>
                </div>
            </div>

            <div id="packages-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-box text-orange-600 ml-2"></i>
                    إدارة الباقات
                </h1>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600">قسم الباقات - قيد التطوير</p>
                </div>
            </div>

            <div id="subscription-requests-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-clipboard-list text-red-600 ml-2"></i>
                    طلبات الاشتراك
                </h1>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600">قسم طلبات الاشتراك - قيد التطوير</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Navigation
        function showSection(sectionName) {
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all sidebar items
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionName + '-section').classList.add('active');
            
            // Add active class to selected sidebar item
            document.querySelector(\`[data-section="\${sectionName}"]\`).classList.add('active');
            
            // Load data for the section
            loadSectionData(sectionName);
        }
        
        async function loadSectionData(section) {
            switch(section) {
                case 'dashboard':
                    await loadDashboardStats();
                    break;
                case 'customers':
                    await loadCustomers();
                    break;
                case 'financing-requests':
                    await loadFinancingRequests();
                    break;
            }
        }
        
        // Load Dashboard Stats
        async function loadDashboardStats() {
            try {
                const response = await axios.get('/api/dashboard/stats');
                if (response.data.success) {
                    const stats = response.data.data;
                    document.getElementById('stat-customers').textContent = stats.total_customers;
                    document.getElementById('stat-requests').textContent = stats.total_requests;
                    document.getElementById('stat-pending').textContent = stats.pending_requests;
                    document.getElementById('stat-approved').textContent = stats.approved_requests;
                    document.getElementById('stat-banks').textContent = stats.active_banks;
                    document.getElementById('stat-subscriptions').textContent = stats.active_subscriptions;
                    document.getElementById('stat-users').textContent = stats.active_users;
                    document.getElementById('stat-calculations').textContent = stats.total_calculations;
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        
        // Load Customers
        async function loadCustomers() {
            try {
                const response = await axios.get('/api/customers');
                if (response.data.success) {
                    const customers = response.data.data;
                    const tbody = document.getElementById('customersTable');
                    
                    if (customers.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-gray-500">لا توجد بيانات</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = customers.map((customer, index) => \`
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">\${index + 1}</td>
                            <td class="px-4 py-3 font-medium">\${customer.full_name}</td>
                            <td class="px-4 py-3">\${customer.phone}</td>
                            <td class="px-4 py-3 text-sm">\${customer.email || '-'}</td>
                            <td class="px-4 py-3 text-sm">\${customer.employer_name || '-'}</td>
                            <td class="px-4 py-3 text-sm">\${customer.job_title || '-'}</td>
                            <td class="px-4 py-3 font-medium">\${customer.monthly_salary.toLocaleString('ar-SA')} ريال</td>
                            <td class="px-4 py-3">
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">\${customer.total_requests} طلب</span>
                            </td>
                            <td class="px-4 py-3">
                                <button onclick="viewCustomer(\${customer.id})" class="text-blue-600 hover:text-blue-800 ml-2">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="editCustomer(\${customer.id})" class="text-green-600 hover:text-green-800">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading customers:', error);
            }
        }
        
        // Load Financing Requests
        async function loadFinancingRequests() {
            try {
                const response = await axios.get('/api/financing-requests');
                if (response.data.success) {
                    const requests = response.data.data;
                    const tbody = document.getElementById('requestsTable');
                    
                    if (requests.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-gray-500">لا توجد طلبات</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = requests.map((req, index) => {
                        const statusColors = {
                            'pending': 'bg-yellow-100 text-yellow-800',
                            'approved': 'bg-green-100 text-green-800',
                            'rejected': 'bg-red-100 text-red-800'
                        };
                        const statusText = {
                            'pending': 'قيد الانتظار',
                            'approved': 'مقبول',
                            'rejected': 'مرفوض'
                        };
                        
                        return \`
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">\${index + 1}</td>
                                <td class="px-4 py-3 font-medium">\${req.customer_name}</td>
                                <td class="px-4 py-3">\${req.customer_phone}</td>
                                <td class="px-4 py-3 text-sm">\${req.financing_type_name || '-'}</td>
                                <td class="px-4 py-3 font-medium">\${req.requested_amount.toLocaleString('ar-SA')}</td>
                                <td class="px-4 py-3">\${req.duration_months} شهر</td>
                                <td class="px-4 py-3 text-sm">\${req.selected_bank_name || '-'}</td>
                                <td class="px-4 py-3">
                                    <span class="\${statusColors[req.status]} px-2 py-1 rounded text-xs">\${statusText[req.status]}</span>
                                </td>
                                <td class="px-4 py-3">
                                    <button onclick="viewRequest(\${req.id})" class="text-blue-600 hover:text-blue-800 ml-2">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="updateStatus(\${req.id})" class="text-green-600 hover:text-green-800">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        \`;
                    }).join('');
                }
            } catch (error) {
                console.error('Error loading requests:', error);
            }
        }
        
        // Utility functions
        function toggleDarkMode() {
            alert('وضع الليل - قيد التطوير');
        }
        
        function logout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
                window.location.href = '/';
            }
        }
        
        function exportExcel(type) {
            alert('تصدير Excel - قيد التطوير');
        }
        
        function showAddCustomerModal() {
            alert('إضافة عميل - قيد التطوير');
        }
        
        function viewCustomer(id) {
            alert('عرض العميل رقم: ' + id);
        }
        
        function editCustomer(id) {
            alert('تعديل العميل رقم: ' + id);
        }
        
        function viewRequest(id) {
            alert('عرض الطلب رقم: ' + id);
        }
        
        function updateStatus(id) {
            alert('تحديث حالة الطلب رقم: ' + id);
        }
        
        // Initialize on load
        loadDashboardStats();
    </script>
</body>
</html>
`;
