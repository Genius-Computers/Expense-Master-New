export const banksManagementPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة البنوك - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-university ml-3"></i>
                    إدارة البنوك
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للوحة التحكم
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- Action Bar -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex-1 w-full md:w-auto">
                    <div class="relative">
                        <input type="text" id="searchInput" placeholder="البحث عن بنك..." 
                            class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                        <i class="fas fa-search absolute right-3 top-4 text-gray-400"></i>
                    </div>
                </div>
                <button onclick="openAddBankModal()" class="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                    <i class="fas fa-plus"></i>
                    <span>إضافة بنك جديد</span>
                </button>
            </div>
        </div>

        <!-- Banks Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                        <tr>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">#</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">اسم البنك</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">رمز البنك</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">الحالة</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">نطاق البنك</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">تاريخ الإضافة</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="banksTableBody" class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin text-4xl mb-2"></i>
                                <p>جاري تحميل البيانات...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add/Edit Bank Modal -->
    <div id="bankModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-4 flex items-center justify-between">
                <h2 class="text-xl font-bold flex items-center">
                    <i class="fas fa-university ml-2"></i>
                    <span id="modalTitle">إضافة بنك جديد</span>
                </h2>
                <button onclick="closeBankModal()" class="text-white hover:text-gray-200">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <form id="bankForm" class="p-6 space-y-6">
                <input type="hidden" id="bankId">
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        <i class="fas fa-university text-yellow-600 ml-1"></i>
                        اسم البنك
                    </label>
                    <input type="text" id="bankName" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="مثال: مصرف الراجحي">
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        <i class="fas fa-code text-yellow-600 ml-1"></i>
                        رمز البنك
                    </label>
                    <input type="text" id="bankCode" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="مثال: RAJ">
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        <i class="fas fa-image text-yellow-600 ml-1"></i>
                        رابط الشعار (اختياري)
                    </label>
                    <input type="url" id="logoUrl"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png">
                </div>

                <div>
                    <label class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="isActive" checked class="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500">
                        <span class="text-sm font-bold text-gray-700">
                            <i class="fas fa-check-circle text-green-600 ml-1"></i>
                            البنك نشط
                        </span>
                    </label>
                </div>

                <div class="bg-blue-50 border-r-4 border-blue-500 p-4 rounded">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-info-circle ml-1"></i>
                        <strong>ملاحظة:</strong> البنك سيكون خاصاً بشركتك فقط. يمكنك إدارة نسب التمويل الخاصة به من صفحة "نسب التمويل".
                    </p>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-save ml-2"></i>
                        حفظ البنك
                    </button>
                    <button type="button" onclick="closeBankModal()" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all">
                        <i class="fas fa-times ml-2"></i>
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        let currentEditId = null;

        // Load banks on page load
        loadBanks();

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#banksTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        // Load banks from API
        async function loadBanks() {
            try {
                const response = await axios.get('/api/banks', {
                    headers: authToken ? { 'Authorization': 'Bearer ' + authToken } : {}
                });

                const banks = response.data.data || [];
                const tbody = document.getElementById('banksTableBody');

                if (banks.length === 0) {
                    tbody.innerHTML = \`
                        <tr>
                            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-university text-6xl text-gray-300 mb-4"></i>
                                <p class="text-lg font-bold">لا توجد بنوك</p>
                                <p class="text-sm">اضغط على "إضافة بنك جديد" للبدء</p>
                            </td>
                        </tr>
                    \`;
                    return;
                }

                tbody.innerHTML = banks.map((bank, index) => \`
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 text-sm font-bold text-gray-900">\${index + 1}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                \${bank.logo_url ? \`<img src="\${bank.logo_url}" class="w-8 h-8 rounded object-cover">\` : \`<i class="fas fa-university text-yellow-600 text-2xl"></i>\`}
                                <span class="text-sm font-bold text-gray-900">\${bank.bank_name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-900 font-mono">\${bank.bank_code}</td>
                        <td class="px-6 py-4">
                            \${bank.is_active ? 
                                '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold"><i class="fas fa-check-circle ml-1"></i>نشط</span>' : 
                                '<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold"><i class="fas fa-times-circle ml-1"></i>غير نشط</span>'
                            }
                        </td>
                        <td class="px-6 py-4">
                            \${bank.tenant_id ? 
                                '<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold"><i class="fas fa-lock ml-1"></i>خاص بالشركة</span>' : 
                                '<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold"><i class="fas fa-globe ml-1"></i>عام (متاح للجميع)</span>'
                            }
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            \${bank.created_at ? new Date(bank.created_at).toLocaleDateString('ar-SA') : '-'}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex gap-2">
                                \${bank.tenant_id ? \`
                                    <button onclick="editBank(\${bank.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-bold transition-all">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteBank(\${bank.id})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs font-bold transition-all">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                \` : \`
                                    <span class="text-xs text-gray-500 italic">بنك عام (للقراءة فقط)</span>
                                \`}
                            </div>
                        </td>
                    </tr>
                \`).join('');

            } catch (error) {
                console.error('Error loading banks:', error);
                document.getElementById('banksTableBody').innerHTML = \`
                    <tr>
                        <td colspan="7" class="px-6 py-8 text-center text-red-500">
                            <i class="fas fa-exclamation-triangle text-4xl mb-2"></i>
                            <p>حدث خطأ أثناء تحميل البيانات</p>
                        </td>
                    </tr>
                \`;
            }
        }

        // Open add bank modal
        window.openAddBankModal = function() {
            currentEditId = null;
            document.getElementById('modalTitle').textContent = 'إضافة بنك جديد';
            document.getElementById('bankForm').reset();
            document.getElementById('bankId').value = '';
            document.getElementById('isActive').checked = true;
            document.getElementById('bankModal').classList.remove('hidden');
        }

        // Edit bank
        window.editBank = async function(id) {
            try {
                const response = await axios.get('/api/banks', {
                    headers: authToken ? { 'Authorization': 'Bearer ' + authToken } : {}
                });
                
                const bank = response.data.data.find(b => b.id === id);
                if (!bank) {
                    alert('❌ لم يتم العثور على البنك');
                    return;
                }

                currentEditId = id;
                document.getElementById('modalTitle').textContent = 'تعديل بنك';
                document.getElementById('bankId').value = id;
                document.getElementById('bankName').value = bank.bank_name;
                document.getElementById('bankCode').value = bank.bank_code;
                document.getElementById('logoUrl').value = bank.logo_url || '';
                document.getElementById('isActive').checked = bank.is_active;
                document.getElementById('bankModal').classList.remove('hidden');
            } catch (error) {
                console.error('Error loading bank:', error);
                alert('❌ حدث خطأ أثناء تحميل بيانات البنك');
            }
        }

        // Close modal
        window.closeBankModal = function() {
            document.getElementById('bankModal').classList.add('hidden');
            currentEditId = null;
        }

        // Submit form
        document.getElementById('bankForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const bankData = {
                bank_name: document.getElementById('bankName').value,
                bank_code: document.getElementById('bankCode').value,
                logo_url: document.getElementById('logoUrl').value || null,
                is_active: document.getElementById('isActive').checked ? 1 : 0
            };

            try {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';

                if (currentEditId) {
                    await axios.put(\`/api/banks/\${currentEditId}\`, bankData, {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    });
                } else {
                    await axios.post('/api/banks', bankData, {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    });
                }

                closeBankModal();
                loadBanks();
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMsg.innerHTML = '<i class="fas fa-check-circle ml-2"></i>تم حفظ البنك بنجاح';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);

            } catch (error) {
                console.error('Error saving bank:', error);
                alert('❌ حدث خطأ أثناء حفظ البنك: ' + (error.response?.data?.error || error.message));
            } finally {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>حفظ البنك';
            }
        });

        // Delete bank
        window.deleteBank = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا البنك؟\\n\\nتنبيه: سيتم حذف جميع نسب التمويل المرتبطة بهذا البنك أيضاً!')) {
                return;
            }

            try {
                await axios.delete(\`/api/banks/\${id}\`, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });

                loadBanks();

                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMsg.innerHTML = '<i class="fas fa-check-circle ml-2"></i>تم حذف البنك بنجاح';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);

            } catch (error) {
                console.error('Error deleting bank:', error);
                alert('❌ حدث خطأ أثناء حذف البنك: ' + (error.response?.data?.error || error.message));
            }
        }
    </script>
</body>
</html>
`;
