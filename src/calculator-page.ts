export const calculatorPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <!-- Header -->
    <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">
                    <i class="fas fa-calculator ml-2"></i>
                    حاسبة التمويل
                </a>
                <div class="space-x-reverse space-x-4">
                    <a href="/" class="text-gray-700 hover:text-blue-600">
                        <i class="fas fa-home ml-1"></i>الرئيسية
                    </a>
                    <a href="/admin" class="text-gray-700 hover:text-blue-600">
                        <i class="fas fa-user-shield ml-1"></i>الإدارة
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
            <!-- Calculator Form -->
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-calculator text-blue-600 ml-2"></i>
                    احسب التمويل المناسب لك
                </h2>
                
                <form id="calculatorForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- نوع التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">نوع التمويل</label>
                        <select id="financingType" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">اختر نوع التمويل</option>
                        </select>
                    </div>
                    
                    <!-- البنك -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">البنك</label>
                        <select id="bank" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">اختر البنك</option>
                        </select>
                    </div>
                    
                    <!-- مبلغ التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">مبلغ التمويل (ريال)</label>
                        <input type="number" id="amount" required min="10000" step="1000" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="مثال: 100000">
                    </div>
                    
                    <!-- مدة التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">مدة التمويل (شهر)</label>
                        <input type="number" id="duration" required min="12" max="360" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="مثال: 60">
                    </div>
                    
                    <!-- الراتب الشهري -->
                    <div class="md:col-span-2">
                        <label class="block text-gray-700 font-bold mb-2">الراتب الشهري (ريال)</label>
                        <input type="number" id="salary" required min="3000" step="100"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="مثال: 10000">
                    </div>
                    
                    <!-- زر الحساب -->
                    <div class="md:col-span-2">
                        <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105">
                            <i class="fas fa-calculator ml-2"></i>
                            احسب الآن
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Results -->
            <div id="results" class="hidden">
                <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8">
                    <h3 class="text-2xl font-bold mb-6 text-gray-800">
                        <i class="fas fa-check-circle text-green-600 ml-2"></i>
                        نتيجة الحساب
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <div class="text-gray-600 text-sm mb-1">القسط الشهري</div>
                            <div class="text-3xl font-bold text-blue-600" id="monthlyPayment">0</div>
                            <div class="text-gray-500 text-sm mt-1">ريال</div>
                        </div>
                        
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <div class="text-gray-600 text-sm mb-1">إجمالي المبلغ</div>
                            <div class="text-3xl font-bold text-purple-600" id="totalPayment">0</div>
                            <div class="text-gray-500 text-sm mt-1">ريال</div>
                        </div>
                        
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <div class="text-gray-600 text-sm mb-1">إجمالي الفائدة</div>
                            <div class="text-3xl font-bold text-orange-600" id="totalInterest">0</div>
                            <div class="text-gray-500 text-sm mt-1">ريال</div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <h4 class="font-bold text-lg mb-3">تفاصيل الحساب</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-600">مبلغ التمويل:</span>
                                <span class="font-bold mr-2" id="detailAmount">0</span> ريال
                            </div>
                            <div>
                                <span class="text-gray-600">مدة التمويل:</span>
                                <span class="font-bold mr-2" id="detailDuration">0</span> شهر
                            </div>
                            <div>
                                <span class="text-gray-600">نسبة الفائدة:</span>
                                <span class="font-bold mr-2" id="detailRate">0</span>%
                            </div>
                            <div>
                                <span class="text-gray-600">الراتب الشهري:</span>
                                <span class="font-bold mr-2" id="detailSalary">0</span> ريال
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let banks = [];
        let financingTypes = [];
        
        // Load data
        async function loadData() {
            try {
                const [banksRes, typesRes] = await Promise.all([
                    axios.get('/api/banks'),
                    axios.get('/api/financing-types')
                ]);
                
                banks = banksRes.data.data;
                financingTypes = typesRes.data.data;
                
                // Populate selects
                const bankSelect = document.getElementById('bank');
                banks.forEach(bank => {
                    const option = document.createElement('option');
                    option.value = bank.id;
                    option.textContent = bank.bank_name;
                    bankSelect.appendChild(option);
                });
                
                const typeSelect = document.getElementById('financingType');
                financingTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.id;
                    option.textContent = type.type_name;
                    typeSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error loading data:', error);
                alert('خطأ في تحميل البيانات');
            }
        }
        
        // Calculate
        document.getElementById('calculatorForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const amount = parseFloat(document.getElementById('amount').value);
            const duration = parseInt(document.getElementById('duration').value);
            const salary = parseFloat(document.getElementById('salary').value);
            const bankId = parseInt(document.getElementById('bank').value);
            const financingTypeId = parseInt(document.getElementById('financingType').value);
            
            try {
                const response = await axios.post('/api/calculate', {
                    amount,
                    duration_months: duration,
                    salary,
                    bank_id: bankId,
                    financing_type_id: financingTypeId
                });
                
                if (response.data.success) {
                    const result = response.data.data;
                    
                    // Display results
                    document.getElementById('monthlyPayment').textContent = result.monthly_payment.toLocaleString('ar-SA');
                    document.getElementById('totalPayment').textContent = result.total_payment.toLocaleString('ar-SA');
                    document.getElementById('totalInterest').textContent = result.total_interest.toLocaleString('ar-SA');
                    document.getElementById('detailAmount').textContent = amount.toLocaleString('ar-SA');
                    document.getElementById('detailDuration').textContent = duration;
                    document.getElementById('detailRate').textContent = result.rate;
                    document.getElementById('detailSalary').textContent = salary.toLocaleString('ar-SA');
                    
                    document.getElementById('results').classList.remove('hidden');
                    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert(response.data.error || 'خطأ في الحساب');
                }
            } catch (error) {
                console.error('Calculation error:', error);
                alert('خطأ في الحساب. يرجى التحقق من البيانات المدخلة.');
            }
        });
        
        // Load data on page load
        loadData();
    </script>
</body>
</html>
`;
