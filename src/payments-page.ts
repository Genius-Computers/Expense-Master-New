// Payments Page - Receipt Vouchers for Approved Requests

export const paymentsPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سندات القبض - المدفوعات</title>
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
            scrollbar-color: #10b981 #f7fafc;
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
            background: linear-gradient(180deg, #10b981 0%, #059669 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #059669 0%, #047857 100%);
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
            <a href="/admin/panel" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للوحة التحكم
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-receipt text-green-600 ml-2"></i>
                سندات القبض - العمولات
            </h1>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي المدفوعات</div>
                <div class="text-3xl font-bold mt-2" id="totalPayments">0</div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي العمولات</div>
                <div class="text-3xl font-bold mt-2" id="totalAmount">0 ريال</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">طلبات مقبولة غير مدفوعة</div>
                <div class="text-3xl font-bold mt-2" id="unpaidRequests">0</div>
            </div>
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">هذا الشهر</div>
                <div class="text-3xl font-bold mt-2" id="thisMonthAmount">0 ريال</div>
            </div>
        </div>

        <!-- Add Payment Button -->
        <div class="mb-6">
            <button onclick="openAddPaymentModal()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all">
                <i class="fas fa-plus ml-2"></i>
                إضافة سند قبض جديد
            </button>
            <button onclick="exportToExcel()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all mr-2">
                <i class="fas fa-file-excel ml-2"></i>
                تصدير Excel
            </button>
        </div>

        <!-- Payments Table -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-4 gap-4 flex-wrap">
                <h2 class="text-xl font-bold">سجل المدفوعات</h2>
                <div class="relative">
                    <input 
                        type="text" 
                        id="searchPayments" 
                        placeholder="بحث في المدفوعات..." 
                        class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        onkeyup="searchPaymentsTable()"
                    />
                    <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
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
                            <th class="px-4 py-3 text-right">رقم السند</th>
                            <th class="px-4 py-3 text-right">التاريخ</th>
                            <th class="px-4 py-3 text-right">اسم العميل</th>
                            <th class="px-4 py-3 text-right">الموظف المخصص</th>
                            <th class="px-4 py-3 text-right">المبلغ</th>
                            <th class="px-4 py-3 text-right">طريقة الدفع</th>
                            <th class="px-4 py-3 text-right">ملاحظات</th>
                            <th class="px-4 py-3 text-right">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="paymentsTable" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>

            <div id="emptyState" class="hidden text-center py-12">
                <i class="fas fa-inbox text-gray-300 text-6xl mb-4"></i>
                <p class="text-gray-500 text-xl">لا توجد مدفوعات مسجلة</p>
            </div>
        </div>
    </div>

    <!-- Add Payment Modal -->
    <div id="addPaymentModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-receipt text-green-600 ml-2"></i>
                    سند قبض جديد
                </h2>
                <button onclick="closeAddPaymentModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>

            <form id="paymentForm" class="space-y-4">
                <!-- Approved Request Selection -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-file-invoice ml-1 text-blue-600"></i>
                        الطلب المقبول <span class="text-red-600">*</span>
                    </label>
                    <select id="requestSelect" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="">اختر الطلب المقبول...</option>
                    </select>
                </div>

                <!-- Customer Info Display -->
                <div id="customerInfo" class="hidden bg-blue-50 p-4 rounded-lg space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">اسم العميل:</span>
                        <span class="font-bold" id="customerName">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">الموظف المخصص:</span>
                        <span class="font-bold" id="employeeName">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">مبلغ التمويل:</span>
                        <span class="font-bold text-green-600" id="financingAmount">-</span>
                    </div>
                </div>

                <!-- Payment Amount -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-dollar-sign ml-1 text-green-600"></i>
                        مبلغ العمولة (ريال) <span class="text-red-600">*</span>
                    </label>
                    <input type="number" id="amount" required min="0" step="0.01" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                           placeholder="أدخل مبلغ العمولة">
                </div>

                <!-- Payment Date -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-calendar ml-1 text-purple-600"></i>
                        تاريخ الدفع <span class="text-red-600">*</span>
                    </label>
                    <input type="date" id="paymentDate" required 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>

                <!-- Payment Method -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-money-bill-wave ml-1 text-yellow-600"></i>
                        طريقة الدفع
                    </label>
                    <select id="paymentMethod" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="cash">نقداً</option>
                        <option value="bank_transfer">تحويل بنكي</option>
                        <option value="check">شيك</option>
                        <option value="online">دفع إلكتروني</option>
                    </select>
                </div>

                <!-- Receipt Number -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-hashtag ml-1 text-indigo-600"></i>
                        رقم السند (اختياري)
                    </label>
                    <input type="text" id="receiptNumber" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                           placeholder="رقم السند أو المرجع">
                </div>

                <!-- Notes -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-sticky-note ml-1 text-orange-600"></i>
                        ملاحظات (اختياري)
                    </label>
                    <textarea id="notes" rows="3" 
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="أي ملاحظات إضافية..."></textarea>
                </div>

                <!-- Submit Button -->
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-save ml-2"></i>
                        حفظ السند
                    </button>
                    <button type="button" onclick="closeAddPaymentModal()" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-times ml-2"></i>
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let paymentsData = [];
        let approvedRequests = [];
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Load all data
        async function loadData() {
            try {
                const [paymentsRes, requestsRes] = await Promise.all([
                    axios.get('/api/payments', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    }),
                    axios.get('/api/financing-requests', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    })
                ]);

                paymentsData = paymentsRes.data.data || [];
                const allRequests = requestsRes.data.data || [];
                
                // Filter approved requests that don't have payments yet
                const paidRequestIds = paymentsData.map(p => p.financing_request_id);
                approvedRequests = allRequests.filter(r => 
                    (r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external')
                    && !paidRequestIds.includes(r.id)
                );

                displayStats();
                displayPaymentsTable();
                populateRequestSelect();
            } catch (error) {
                console.error('Error loading data:', error);
                alert('حدث خطأ في تحميل البيانات');
            } finally {
                document.getElementById('loading').classList.add('hidden');
            }
        }

        function displayStats() {
            const totalAmount = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0);
            const thisMonth = new Date();
            const thisMonthPayments = paymentsData.filter(p => {
                const paymentDate = new Date(p.payment_date);
                return paymentDate.getMonth() === thisMonth.getMonth() && 
                       paymentDate.getFullYear() === thisMonth.getFullYear();
            });
            const thisMonthAmount = thisMonthPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

            document.getElementById('totalPayments').textContent = paymentsData.length;
            document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('ar-SA') + ' ريال';
            document.getElementById('unpaidRequests').textContent = approvedRequests.length;
            document.getElementById('thisMonthAmount').textContent = thisMonthAmount.toLocaleString('ar-SA') + ' ريال';
        }

        function displayPaymentsTable() {
            const tbody = document.getElementById('paymentsTable');
            const tableContainer = document.getElementById('tableContainer');
            const emptyState = document.getElementById('emptyState');

            if (paymentsData.length === 0) {
                tableContainer.classList.add('hidden');
                emptyState.classList.remove('hidden');
                return;
            }

            tableContainer.classList.remove('hidden');
            emptyState.classList.add('hidden');

            tbody.innerHTML = paymentsData.map(payment => {
                const paymentMethods = {
                    'cash': 'نقداً',
                    'bank_transfer': 'تحويل بنكي',
                    'check': 'شيك',
                    'online': 'دفع إلكتروني'
                };

                return \`
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium">\${payment.receipt_number || '#' + payment.id}</td>
                        <td class="px-4 py-3">\${new Date(payment.payment_date).toLocaleDateString('ar-SA')}</td>
                        <td class="px-4 py-3 font-medium text-blue-600">\${payment.customer_name || '-'}</td>
                        <td class="px-4 py-3">\${payment.employee_name || 'غير محدد'}</td>
                        <td class="px-4 py-3 font-bold text-green-600">\${(payment.amount || 0).toLocaleString('ar-SA')} ريال</td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                \${paymentMethods[payment.payment_method] || payment.payment_method}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">\${payment.notes || '-'}</td>
                        <td class="px-4 py-3">
                            <button onclick="deletePayment(\${payment.id})" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                \`;
            }).join('');
        }

        function populateRequestSelect() {
            const select = document.getElementById('requestSelect');
            select.innerHTML = '<option value="">اختر الطلب المقبول...</option>' + 
                approvedRequests.map(req => \`
                    <option value="\${req.id}" 
                            data-customer="\${req.customer_name || 'غير محدد'}"
                            data-employee="\${req.assigned_employee_name || 'غير محدد'}"
                            data-amount="\${req.requested_amount || 0}">
                        #\${req.id} - \${req.customer_name || 'غير محدد'} - \${(req.requested_amount || 0).toLocaleString('ar-SA')} ريال
                    </option>
                \`).join('');
        }

        // Modal functions
        window.openAddPaymentModal = function() {
            if (approvedRequests.length === 0) {
                alert('لا توجد طلبات مقبولة غير مدفوعة');
                return;
            }
            document.getElementById('addPaymentModal').classList.remove('hidden');
            document.getElementById('paymentDate').valueAsDate = new Date();
        }

        window.closeAddPaymentModal = function() {
            document.getElementById('addPaymentModal').classList.add('hidden');
            document.getElementById('paymentForm').reset();
            document.getElementById('customerInfo').classList.add('hidden');
        }

        // Request selection change
        document.getElementById('requestSelect').addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                document.getElementById('customerInfo').classList.remove('hidden');
                document.getElementById('customerName').textContent = selectedOption.dataset.customer;
                document.getElementById('employeeName').textContent = selectedOption.dataset.employee;
                document.getElementById('financingAmount').textContent = parseFloat(selectedOption.dataset.amount).toLocaleString('ar-SA') + ' ريال';
            } else {
                document.getElementById('customerInfo').classList.add('hidden');
            }
        });

        // Submit payment form
        document.getElementById('paymentForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const requestId = document.getElementById('requestSelect').value;
            const selectedRequest = approvedRequests.find(r => r.id == requestId);

            if (!selectedRequest) {
                alert('يجب اختيار طلب مقبول');
                return;
            }

            const paymentData = {
                financing_request_id: parseInt(requestId),
                customer_id: selectedRequest.customer_id,
                employee_id: selectedRequest.assigned_employee_id || null,
                amount: parseFloat(document.getElementById('amount').value),
                payment_date: document.getElementById('paymentDate').value,
                payment_method: document.getElementById('paymentMethod').value,
                receipt_number: document.getElementById('receiptNumber').value || null,
                notes: document.getElementById('notes').value || null
            };

            try {
                const response = await axios.post('/api/payments', paymentData, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });

                if (response.data.success) {
                    alert('✅ تم حفظ سند القبض بنجاح');
                    closeAddPaymentModal();
                    window.location.reload();
                } else {
                    alert('خطأ: ' + (response.data.error || 'فشل حفظ السند'));
                }
            } catch (error) {
                console.error('Error saving payment:', error);
                alert('حدث خطأ في حفظ السند');
            }
        });

        // Delete payment
        window.deletePayment = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا السند؟')) return;

            try {
                const response = await axios.delete(\`/api/payments/\${id}\`, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });

                if (response.data.success) {
                    alert('✅ تم حذف السند بنجاح');
                    window.location.reload();
                } else {
                    alert('خطأ: ' + (response.data.error || 'فشل الحذف'));
                }
            } catch (error) {
                console.error('Error deleting payment:', error);
                alert('حدث خطأ في الحذف');
            }
        }

        // Export to Excel
        window.exportToExcel = function() {
            const ws = XLSX.utils.json_to_sheet(paymentsData.map(p => ({
                'رقم السند': p.receipt_number || p.id,
                'التاريخ': p.payment_date,
                'العميل': p.customer_name,
                'الموظف': p.employee_name,
                'المبلغ': p.amount,
                'طريقة الدفع': p.payment_method,
                'ملاحظات': p.notes
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'المدفوعات');
            XLSX.writeFile(wb, 'سندات_القبض_' + new Date().toISOString().split('T')[0] + '.xlsx');
        }

        function searchPaymentsTable() {
            const searchValue = document.getElementById('searchPayments').value.toLowerCase();
            const tbody = document.getElementById('paymentsTable');
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

        document.addEventListener('DOMContentLoaded', loadData);
    </script>
</body>
</html>`;
