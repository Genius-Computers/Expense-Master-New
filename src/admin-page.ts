export const adminHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة الإدارة - نظام التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-100">
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-lg">
        <div class="container mx-auto px-4">
            <h1 class="text-2xl font-bold">
                <i class="fas fa-chart-line ml-2"></i>
                لوحة الإدارة - نظام التمويل الجديد
            </h1>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8">
        <div id="statsCards" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">إجمالي العملاء</p>
                        <p class="text-3xl font-bold text-blue-600" id="totalCustomers">0</p>
                    </div>
                    <i class="fas fa-users text-4xl text-blue-300"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">إجمالي الطلبات</p>
                        <p class="text-3xl font-bold text-green-600" id="totalRequests">0</p>
                    </div>
                    <i class="fas fa-file-invoice text-4xl text-green-300"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">قيد الانتظار</p>
                        <p class="text-3xl font-bold text-yellow-600" id="pendingRequests">0</p>
                    </div>
                    <i class="fas fa-clock text-4xl text-yellow-300"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">مقبول</p>
                        <p class="text-3xl font-bold text-purple-600" id="approvedRequests">0</p>
                    </div>
                    <i class="fas fa-check-circle text-4xl text-purple-300"></i>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
                <i class="fas fa-users ml-2 text-blue-600"></i>
                إدارة العملاء
                <button onclick="loadCustomers()" class="mr-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    <i class="fas fa-sync ml-2"></i>تحديث
                </button>
            </h2>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-right">#</th>
                            <th class="px-4 py-3 text-right">الاسم</th>
                            <th class="px-4 py-3 text-right">الجوال</th>
                            <th class="px-4 py-3 text-right">جهة العمل</th>
                            <th class="px-4 py-3 text-right">المسمى الوظيفي</th>
                            <th class="px-4 py-3 text-right">الراتب</th>
                            <th class="px-4 py-3 text-right">الطلبات</th>
                        </tr>
                    </thead>
                    <tbody id="customersTableBody">
                        <tr>
                            <td colspan="7" class="text-center py-8">
                                <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                <p class="text-gray-500 mt-2">جاري التحميل...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
                <i class="fas fa-file-invoice ml-2 text-green-600"></i>
                طلبات التمويل
                <button onclick="loadRequests()" class="mr-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
                    <i class="fas fa-sync ml-2"></i>تحديث
                </button>
            </h2>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-right">#</th>
                            <th class="px-4 py-3 text-right">اسم العميل</th>
                            <th class="px-4 py-3 text-right">الجوال</th>
                            <th class="px-4 py-3 text-right">المبلغ</th>
                            <th class="px-4 py-3 text-right">المدة</th>
                            <th class="px-4 py-3 text-right">البنك</th>
                            <th class="px-4 py-3 text-right">الحالة</th>
                        </tr>
                    </thead>
                    <tbody id="requestsTableBody">
                        <tr>
                            <td colspan="7" class="text-center py-8">
                                <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                <p class="text-gray-500 mt-2">جاري التحميل...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        async function loadStats() {
            try {
                const response = await axios.get('/api/stats');
                const data = response.data.data;
                
                document.getElementById('totalCustomers').textContent = data.total_customers;
                document.getElementById('totalRequests').textContent = data.total_requests;
                document.getElementById('pendingRequests').textContent = data.pending_requests;
                document.getElementById('approvedRequests').textContent = data.approved_requests;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        async function loadCustomers() {
            const tbody = document.getElementById('customersTableBody');
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i><p class="text-gray-500 mt-2">جاري التحميل...</p></td></tr>';
            
            try {
                const response = await axios.get('/api/customers');
                const customers = response.data.data;
                
                if (customers.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">لا توجد بيانات</td></tr>';
                    return;
                }
                
                tbody.innerHTML = customers.map((c, i) => \`
                    <tr class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">\${i + 1}</td>
                        <td class="px-4 py-3 font-semibold">\${c.full_name}</td>
                        <td class="px-4 py-3">\${c.phone}</td>
                        <td class="px-4 py-3">\${c.employer_name || '-'}</td>
                        <td class="px-4 py-3">\${c.job_title || '-'}</td>
                        <td class="px-4 py-3">\${c.monthly_salary.toLocaleString()} ريال</td>
                        <td class="px-4 py-3">
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">\${c.total_requests || 0}</span>
                            \${c.pending_requests > 0 ? \`<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm mr-1">\${c.pending_requests} معلق</span>\` : ''}
                        </td>
                    </tr>
                \`).join('');
            } catch (error) {
                console.error('Error loading customers:', error);
                tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-red-500">خطأ في التحميل: ' + error.message + '</td></tr>';
            }
        }

        async function loadRequests() {
            const tbody = document.getElementById('requestsTableBody');
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i><p class="text-gray-500 mt-2">جاري التحميل...</p></td></tr>';
            
            try {
                const response = await axios.get('/api/requests');
                const requests = response.data.data;
                
                if (requests.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">لا توجد بيانات</td></tr>';
                    return;
                }
                
                const statusColors = {
                    'pending': 'bg-yellow-100 text-yellow-800',
                    'approved': 'bg-green-100 text-green-800',
                    'rejected': 'bg-red-100 text-red-800'
                };
                
                const statusLabels = {
                    'pending': 'قيد الانتظار',
                    'approved': 'مقبول',
                    'rejected': 'مرفوض'
                };
                
                tbody.innerHTML = requests.map((r, i) => \`
                    <tr class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">\${i + 1}</td>
                        <td class="px-4 py-3 font-semibold">\${r.customer_name}</td>
                        <td class="px-4 py-3">\${r.customer_phone}</td>
                        <td class="px-4 py-3 font-bold text-blue-600">\${r.requested_amount.toLocaleString()} ريال</td>
                        <td class="px-4 py-3">\${r.duration_months} شهر</td>
                        <td class="px-4 py-3">\${r.bank_name || '-'}</td>
                        <td class="px-4 py-3">
                            <span class="\${statusColors[r.status]} px-3 py-1 rounded-full text-sm font-semibold">
                                \${statusLabels[r.status]}
                            </span>
                        </td>
                    </tr>
                \`).join('');
            } catch (error) {
                console.error('Error loading requests:', error);
                tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-red-500">خطأ في التحميل: ' + error.message + '</td></tr>';
            }
        }

        window.addEventListener('DOMContentLoaded', async () => {
            await loadStats();
            await loadCustomers();
            await loadRequests();
        });
    </script>
</body>
</html>
`
