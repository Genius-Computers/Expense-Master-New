export const forgotPasswordPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إعادة تعيين كلمة السر - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .input-focus:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
        }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <div class="container max-w-md">
        <!-- Reset Password Card -->
        <div class="glass-effect rounded-2xl shadow-2xl p-8 animate-fade-in">
            <!-- Step 1: Email Input -->
            <div id="step1">
                <div class="text-center mb-8">
                    <div class="inline-block bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full p-4 mb-4">
                        <i class="fas fa-key text-4xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">نسيت كلمة السر؟</h1>
                    <p class="text-gray-600">لا تقلق، سنساعدك على استعادتها</p>
                </div>

                <div id="alertMessage" class="hidden mb-4 p-4 rounded-lg"></div>

                <form id="emailForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-envelope text-orange-600 ml-2"></i>
                            البريد الإلكتروني أو اسم المستخدم
                        </label>
                        <input type="text" id="email" required
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                               placeholder="أدخل بريدك الإلكتروني">
                        <p class="text-sm text-gray-500 mt-2">
                            <i class="fas fa-info-circle ml-1"></i>
                            سنرسل لك رمز التحقق عبر البريد الإلكتروني
                        </p>
                    </div>

                    <button type="submit" id="sendCodeBtn"
                            class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-bold hover:from-orange-700 hover:to-red-700 transition transform hover:scale-105">
                        <i class="fas fa-paper-plane ml-2"></i>
                        إرسال رمز التحقق
                    </button>
                </form>
            </div>

            <!-- Step 2: Verification Code -->
            <div id="step2" class="hidden">
                <div class="text-center mb-8">
                    <div class="inline-block bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full p-4 mb-4">
                        <i class="fas fa-shield-alt text-4xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">رمز التحقق</h1>
                    <p class="text-gray-600">أدخل الرمز المرسل إلى بريدك الإلكتروني</p>
                    <p class="text-sm text-gray-500 mt-2" id="emailDisplay"></p>
                </div>

                <div id="alertMessage2" class="hidden mb-4 p-4 rounded-lg"></div>

                <form id="verifyForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2 text-center">
                            <i class="fas fa-hashtag text-blue-600 ml-2"></i>
                            رمز التحقق
                        </label>
                        <input type="text" id="verificationCode" required maxlength="6"
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition text-center text-2xl tracking-widest"
                               placeholder="000000">
                    </div>

                    <button type="submit" id="verifyBtn"
                            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105">
                        <i class="fas fa-check-circle ml-2"></i>
                        تحقق من الرمز
                    </button>

                    <button type="button" onclick="resendCode()" id="resendBtn"
                            class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
                        <i class="fas fa-redo ml-2"></i>
                        إعادة إرسال الرمز
                    </button>
                </form>
            </div>

            <!-- Step 3: New Password -->
            <div id="step3" class="hidden">
                <div class="text-center mb-8">
                    <div class="inline-block bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-full p-4 mb-4">
                        <i class="fas fa-lock text-4xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">كلمة سر جديدة</h1>
                    <p class="text-gray-600">أدخل كلمة السر الجديدة</p>
                </div>

                <div id="alertMessage3" class="hidden mb-4 p-4 rounded-lg"></div>

                <form id="resetForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-lock text-green-600 ml-2"></i>
                            كلمة السر الجديدة
                        </label>
                        <div class="relative">
                            <input type="password" id="newPassword" required minlength="8"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                                   placeholder="أدخل كلمة السر الجديدة">
                            <button type="button" onclick="togglePassword('newPassword', 'icon1')" 
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i id="icon1" class="fas fa-eye"></i>
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">يجب أن تكون 8 أحرف على الأقل</p>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-check-double text-green-600 ml-2"></i>
                            تأكيد كلمة السر
                        </label>
                        <div class="relative">
                            <input type="password" id="confirmPassword" required minlength="8"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                                   placeholder="أعد إدخال كلمة السر">
                            <button type="button" onclick="togglePassword('confirmPassword', 'icon2')" 
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i id="icon2" class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" id="resetBtn"
                            class="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105">
                        <i class="fas fa-save ml-2"></i>
                        حفظ كلمة السر الجديدة
                    </button>
                </form>
            </div>

            <!-- Back to Login -->
            <div class="text-center mt-6">
                <a href="/login" class="text-purple-600 hover:text-purple-800 font-bold">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة لتسجيل الدخول
                </a>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        let userEmail = '';
        let resetToken = '';

        function showAlert(step, message, type = 'error') {
            const alertDiv = document.getElementById(\`alertMessage\${step > 1 ? step : ''}\`);
            alertDiv.className = \`mb-4 p-4 rounded-lg \${type === 'error' ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}\`;
            alertDiv.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'error' ? 'exclamation-circle' : 'check-circle'} text-2xl ml-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            alertDiv.classList.remove('hidden');
        }

        function goToStep(step) {
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.add('hidden');
            document.getElementById(\`step\${step}\`).classList.remove('hidden');
        }

        function togglePassword(inputId, iconId) {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Step 1: Send verification code
        document.getElementById('emailForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const btn = document.getElementById('sendCodeBtn');
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            
            try {
                const response = await axios.post('/api/auth/forgot-password', { email });
                
                if (response.data.success) {
                    userEmail = email;
                    document.getElementById('emailDisplay').textContent = email;
                    showAlert(1, '✓ تم إرسال رمز التحقق إلى بريدك الإلكتروني', 'success');
                    setTimeout(() => goToStep(2), 1500);
                } else {
                    showAlert(1, response.data.message || 'فشل إرسال رمز التحقق');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال رمز التحقق';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(1, error.response?.data?.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال رمز التحقق';
            }
        });

        // Step 2: Verify code
        document.getElementById('verifyForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const code = document.getElementById('verificationCode').value;
            const btn = document.getElementById('verifyBtn');
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري التحقق...';
            
            try {
                const response = await axios.post('/api/auth/verify-reset-code', {
                    email: userEmail,
                    code: code
                });
                
                if (response.data.success) {
                    resetToken = response.data.token;
                    showAlert(2, '✓ تم التحقق بنجاح!', 'success');
                    setTimeout(() => goToStep(3), 1000);
                } else {
                    showAlert(2, response.data.message || 'رمز التحقق غير صحيح');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-check-circle ml-2"></i> تحقق من الرمز';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(2, error.response?.data?.message || 'رمز التحقق غير صحيح');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check-circle ml-2"></i> تحقق من الرمز';
            }
        });

        // Step 3: Reset password
        document.getElementById('resetForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const btn = document.getElementById('resetBtn');
            
            if (newPassword !== confirmPassword) {
                showAlert(3, 'كلمتا السر غير متطابقتين');
                return;
            }
            
            if (newPassword.length < 8) {
                showAlert(3, 'كلمة السر يجب أن تكون 8 أحرف على الأقل');
                return;
            }
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
            
            try {
                const response = await axios.post('/api/auth/reset-password', {
                    email: userEmail,
                    token: resetToken,
                    newPassword: newPassword
                });
                
                if (response.data.success) {
                    showAlert(3, '✓ تم تغيير كلمة السر بنجاح! جاري التحويل...', 'success');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                } else {
                    showAlert(3, response.data.message || 'فشل تغيير كلمة السر');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-save ml-2"></i> حفظ كلمة السر الجديدة';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(3, error.response?.data?.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-save ml-2"></i> حفظ كلمة السر الجديدة';
            }
        });

        async function resendCode() {
            const btn = document.getElementById('resendBtn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            
            try {
                await axios.post('/api/auth/forgot-password', { email: userEmail });
                showAlert(2, '✓ تم إعادة إرسال رمز التحقق', 'success');
            } catch (error) {
                showAlert(2, 'فشل إعادة إرسال الرمز');
            }
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-redo ml-2"></i> إعادة إرسال الرمز';
        }
    </script>
</body>
</html>
`;
