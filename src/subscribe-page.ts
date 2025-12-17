export const subscribePage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلب اشتراك - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .step-indicator {
            transition: all 0.3s ease;
        }
        .step-indicator.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .step-indicator.completed {
            background: #10b981;
            color: white;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="gradient-header text-white py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-bold mb-4">
                    <i class="fas fa-clipboard-list ml-3"></i>
                    طلب اشتراك جديد
                </h1>
                <p class="text-purple-100 text-lg">املأ البيانات التالية لإتمام طلب الاشتراك</p>
            </div>
        </div>
    </div>

    <!-- Progress Steps -->
    <div class="bg-white shadow-md py-6">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center">
                    <div class="flex items-center flex-1">
                        <div id="step1-indicator" class="step-indicator active w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg">1</div>
                        <div class="flex-1 h-1 bg-gray-300 mx-2"></div>
                    </div>
                    <div class="flex items-center flex-1">
                        <div id="step2-indicator" class="step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold bg-gray-300 border-4 border-white shadow-lg">2</div>
                        <div class="flex-1 h-1 bg-gray-300 mx-2"></div>
                    </div>
                    <div class="flex items-center flex-1">
                        <div id="step3-indicator" class="step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold bg-gray-300 border-4 border-white shadow-lg">3</div>
                    </div>
                </div>
                <div class="flex justify-between mt-2 text-sm">
                    <span class="flex-1 text-center font-bold">معلومات الشركة</span>
                    <span class="flex-1 text-center">معلومات المسؤول</span>
                    <span class="flex-1 text-center">مراجعة وإرسال</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
            <!-- Alert Messages -->
            <div id="alertMessage" class="hidden mb-6 p-4 rounded-lg"></div>

            <!-- Step 1: Company Information -->
            <div id="step1" class="bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-building text-purple-600 ml-3 text-4xl"></i>
                    معلومات الشركة
                </h2>

                <form id="companyForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-building text-blue-600 ml-2"></i>
                                اسم الشركة *
                            </label>
                            <input type="text" id="company_name" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-id-card text-green-600 ml-2"></i>
                                السجل التجاري *
                            </label>
                            <input type="text" id="commercial_register" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-envelope text-purple-600 ml-2"></i>
                                البريد الإلكتروني للشركة *
                            </label>
                            <input type="email" id="company_email" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-phone text-orange-600 ml-2"></i>
                                هاتف الشركة *
                            </label>
                            <input type="tel" id="company_phone" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                                   placeholder="05xxxxxxxx">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-map-marker-alt text-red-600 ml-2"></i>
                                عنوان الشركة *
                            </label>
                            <textarea id="company_address" required rows="3"
                                      class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"></textarea>
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-city text-indigo-600 ml-2"></i>
                                المدينة *
                            </label>
                            <input type="text" id="city" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-briefcase text-teal-600 ml-2"></i>
                                نوع النشاط *
                            </label>
                            <select id="business_type" required
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                                <option value="">اختر نوع النشاط</option>
                                <option value="finance">مالي</option>
                                <option value="banking">بنكي</option>
                                <option value="insurance">تأمين</option>
                                <option value="real_estate">عقاري</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" 
                            class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                        <span>التالي</span>
                        <i class="fas fa-arrow-left mr-2"></i>
                    </button>
                </form>
            </div>

            <!-- Step 2: Admin Information -->
            <div id="step2" class="hidden bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-user-tie text-indigo-600 ml-3 text-4xl"></i>
                    معلومات المسؤول
                </h2>

                <form id="adminForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-user text-blue-600 ml-2"></i>
                                الاسم الكامل *
                            </label>
                            <input type="text" id="admin_name" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-envelope text-purple-600 ml-2"></i>
                                البريد الإلكتروني *
                            </label>
                            <input type="email" id="admin_email" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-phone text-green-600 ml-2"></i>
                                رقم الجوال *
                            </label>
                            <input type="tel" id="admin_phone" required pattern="05[0-9]{8}"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                                   placeholder="05xxxxxxxx">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-briefcase text-orange-600 ml-2"></i>
                                المسمى الوظيفي *
                            </label>
                            <input type="text" id="admin_position" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-user-circle text-indigo-600 ml-2"></i>
                                اسم المستخدم *
                            </label>
                            <input type="text" id="username" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-lock text-red-600 ml-2"></i>
                                كلمة السر *
                            </label>
                            <input type="password" id="password" required minlength="8"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                            <p class="text-xs text-gray-500 mt-1">8 أحرف على الأقل</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button type="button" onclick="goToStep(1)" 
                                class="flex-1 bg-gray-300 text-gray-800 py-4 rounded-lg font-bold text-lg hover:bg-gray-400 transition">
                            <i class="fas fa-arrow-right ml-2"></i>
                            السابق
                        </button>
                        <button type="submit" 
                                class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                            <span>التالي</span>
                            <i class="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Step 3: Review & Submit -->
            <div id="step3" class="hidden bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-check-circle text-green-600 ml-3 text-4xl"></i>
                    مراجعة البيانات
                </h2>

                <div class="space-y-6">
                    <!-- Selected Package -->
                    <div class="bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-500 rounded-lg p-6">
                        <h3 class="text-xl font-bold text-purple-800 mb-4">الباقة المختارة</h3>
                        <div id="packageInfo"></div>
                    </div>

                    <!-- Company Info Summary -->
                    <div class="border-2 border-gray-200 rounded-lg p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">معلومات الشركة</h3>
                        <div id="companyInfo" class="grid grid-cols-2 gap-4"></div>
                    </div>

                    <!-- Admin Info Summary -->
                    <div class="border-2 border-gray-200 rounded-lg p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">معلومات المسؤول</h3>
                        <div id="adminInfo" class="grid grid-cols-2 gap-4"></div>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                        <label class="flex items-start">
                            <input type="checkbox" id="acceptTerms" class="mt-1 ml-3 w-5 h-5 text-purple-600">
                            <span class="text-gray-800">
                                أوافق على <a href="#" class="text-purple-600 font-bold hover:text-purple-800">الشروط والأحكام</a> 
                                و <a href="#" class="text-purple-600 font-bold hover:text-purple-800">سياسة الخصوصية</a>
                            </span>
                        </label>
                    </div>

                    <div class="flex gap-4">
                        <button type="button" onclick="goToStep(2)" 
                                class="flex-1 bg-gray-300 text-gray-800 py-4 rounded-lg font-bold text-lg hover:bg-gray-400 transition">
                            <i class="fas fa-arrow-right ml-2"></i>
                            السابق
                        </button>
                        <button type="button" onclick="submitSubscription()" id="submitBtn"
                                class="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105">
                            <i class="fas fa-paper-plane ml-2"></i>
                            إرسال الطلب
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        let currentStep = 1;
        let formData = {
            package_id: null,
            company: {},
            admin: {}
        };
        let selectedPackage = null;

        // Get package ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        formData.package_id = urlParams.get('package');

        async function loadPackageInfo() {
            if (!formData.package_id) {
                window.location.href = '/packages';
                return;
            }

            try {
                const response = await axios.get('/api/packages');
                selectedPackage = response.data.data.find(p => p.id == formData.package_id);
                
                if (!selectedPackage) {
                    window.location.href = '/packages';
                }
            } catch (error) {
                console.error('Error loading package:', error);
            }
        }

        function showAlert(message, type = 'error') {
            const alertDiv = document.getElementById('alertMessage');
            alertDiv.className = \`mb-6 p-4 rounded-lg \${type === 'error' ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}\`;
            alertDiv.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'error' ? 'exclamation-circle' : 'check-circle'} text-2xl ml-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            alertDiv.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function goToStep(step) {
            // Hide all steps
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.add('hidden');
            
            // Show target step
            document.getElementById(\`step\${step}\`).classList.remove('hidden');
            
            // Update step indicators
            for (let i = 1; i <= 3; i++) {
                const indicator = document.getElementById(\`step\${i}-indicator\`);
                if (i < step) {
                    indicator.className = 'step-indicator completed w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg';
                } else if (i === step) {
                    indicator.className = 'step-indicator active w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg';
                } else {
                    indicator.className = 'step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold bg-gray-300 border-4 border-white shadow-lg';
                }
            }
            
            currentStep = step;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Step 1: Company Form
        document.getElementById('companyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            formData.company = {
                company_name: document.getElementById('company_name').value,
                commercial_register: document.getElementById('commercial_register').value,
                company_email: document.getElementById('company_email').value,
                company_phone: document.getElementById('company_phone').value,
                company_address: document.getElementById('company_address').value,
                city: document.getElementById('city').value,
                business_type: document.getElementById('business_type').value
            };
            
            goToStep(2);
        });

        // Step 2: Admin Form
        document.getElementById('adminForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            formData.admin = {
                admin_name: document.getElementById('admin_name').value,
                admin_email: document.getElementById('admin_email').value,
                admin_phone: document.getElementById('admin_phone').value,
                admin_position: document.getElementById('admin_position').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };
            
            showReview();
            goToStep(3);
        });

        function showReview() {
            // Package Info
            if (selectedPackage) {
                document.getElementById('packageInfo').innerHTML = \`
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-2xl font-bold text-purple-800">\${selectedPackage.package_name}</p>
                            <p class="text-gray-600">\${selectedPackage.description || ''}</p>
                        </div>
                        <div class="text-left">
                            <p class="text-3xl font-bold text-purple-800">\${parseFloat(selectedPackage.price_monthly).toLocaleString()} ريال</p>
                            <p class="text-gray-600">شهرياً</p>
                        </div>
                    </div>
                \`;
            }
            
            // Company Info
            const companyHtml = Object.entries(formData.company).map(([key, value]) => \`
                <div>
                    <p class="text-sm text-gray-600">\${getFieldLabel(key)}</p>
                    <p class="font-bold text-gray-800">\${value}</p>
                </div>
            \`).join('');
            document.getElementById('companyInfo').innerHTML = companyHtml;
            
            // Admin Info (hide password)
            const adminHtml = Object.entries(formData.admin).filter(([key]) => key !== 'password').map(([key, value]) => \`
                <div>
                    <p class="text-sm text-gray-600">\${getFieldLabel(key)}</p>
                    <p class="font-bold text-gray-800">\${value}</p>
                </div>
            \`).join('');
            document.getElementById('adminInfo').innerHTML = adminHtml;
        }

        function getFieldLabel(key) {
            const labels = {
                company_name: 'اسم الشركة',
                commercial_register: 'السجل التجاري',
                company_email: 'البريد الإلكتروني',
                company_phone: 'الهاتف',
                company_address: 'العنوان',
                city: 'المدينة',
                business_type: 'نوع النشاط',
                admin_name: 'الاسم الكامل',
                admin_email: 'البريد الإلكتروني',
                admin_phone: 'رقم الجوال',
                admin_position: 'المسمى الوظيفي',
                username: 'اسم المستخدم'
            };
            return labels[key] || key;
        }

        async function submitSubscription() {
            if (!document.getElementById('acceptTerms').checked) {
                showAlert('يجب الموافقة على الشروط والأحكام');
                return;
            }
            
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            
            try {
                const response = await axios.post('/api/subscription-requests', formData);
                
                if (response.data.success) {
                    showAlert('✓ تم إرسال طلب الاشتراك بنجاح! سيتم التواصل معك قريباً', 'success');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 3000);
                } else {
                    showAlert(response.data.message || 'فشل إرسال الطلب');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال الطلب';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(error.response?.data?.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال الطلب';
            }
        }

        // Load package info on page load
        loadPackageInfo();
    </script>
</body>
</html>
`;
