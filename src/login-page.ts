export const loginPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول - منصة حاسبة التمويل</title>
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
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-slide-in {
            animation: slideIn 0.5s ease-out;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .glass-effect {
                padding: 1.5rem !important;
            }
            h1 {
                font-size: 1.75rem !important;
            }
            button {
                font-size: 1rem !important;
            }
        }
        @media (max-width: 480px) {
            .glass-effect {
                padding: 1rem !important;
            }
            h1 {
                font-size: 1.5rem !important;
            }
        }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <div class="container max-w-md">
        <!-- Login Card -->
        <div class="glass-effect rounded-2xl shadow-2xl p-8 animate-slide-in">
            <!-- Logo and Title -->
            <div class="text-center mb-8">
                <div class="inline-block bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full p-4 mb-4">
                    <i class="fas fa-calculator text-4xl"></i>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
                <p class="text-gray-600">مرحباً بك في منصة حاسبة التمويل</p>
            </div>

            <!-- Alert Messages -->
            <div id="alertMessage" class="hidden mb-4 p-4 rounded-lg"></div>

            <!-- Login Form -->
            <form id="loginForm" class="space-y-6">
                <!-- Username -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-user text-purple-600 ml-2"></i>
                        اسم المستخدم أو البريد الإلكتروني
                    </label>
                    <input type="text" id="username" required
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                           placeholder="أدخل اسم المستخدم">
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-lock text-purple-600 ml-2"></i>
                        كلمة السر
                    </label>
                    <div class="relative">
                        <input type="password" id="password" required
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                               placeholder="أدخل كلمة السر">
                        <button type="button" onclick="togglePassword()" 
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <i id="passwordIcon" class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox" id="rememberMe" class="ml-2 w-4 h-4 text-purple-600">
                        <span class="text-gray-700">تذكرني</span>
                    </label>
                    <a href="/forgot-password" class="text-purple-600 hover:text-purple-800 font-bold">
                        نسيت كلمة السر؟
                    </a>
                </div>

                <!-- Submit Button -->
                <button type="submit" id="loginBtn"
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                    <i class="fas fa-sign-in-alt ml-2"></i>
                    تسجيل الدخول
                </button>
            </form>

            <!-- Divider -->
            <div class="flex items-center my-6">
                <div class="flex-1 border-t border-gray-300"></div>
                <span class="px-4 text-gray-500">أو</span>
                <div class="flex-1 border-t border-gray-300"></div>
            </div>

            <!-- Links -->
            <div class="text-center space-y-3">
                <p class="text-gray-600">
                    ليس لديك حساب؟
                    <a href="/packages" class="text-purple-600 hover:text-purple-800 font-bold">
                        اشترك الآن
                    </a>
                </p>
                <a href="/" class="block text-gray-600 hover:text-gray-800">
                    <i class="fas fa-home ml-2"></i>
                    العودة للصفحة الرئيسية
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-6 text-white">
            <p class="text-sm">© 2025 منصة حاسبة التمويل. جميع الحقوق محفوظة.</p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordIcon = document.getElementById('passwordIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        }

        function showAlert(message, type = 'error') {
            const alertDiv = document.getElementById('alertMessage');
            alertDiv.className = \`mb-4 p-4 rounded-lg \${type === 'error' ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}\`;
            alertDiv.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'error' ? 'exclamation-circle' : 'check-circle'} text-2xl ml-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            alertDiv.classList.remove('hidden');
            
            if (type === 'success') {
                setTimeout(() => {
                    alertDiv.classList.add('hidden');
                }, 3000);
            }
        }

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            const loginBtn = document.getElementById('loginBtn');
            
            // Disable button
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري التحقق...';
            
            try {
                const response = await axios.post('/api/auth/login', {
                    username,
                    password,
                    rememberMe
                });
                
                if (response.data.success) {
                    showAlert('✓ تم تسجيل الدخول بنجاح! جاري التحويل...', 'success');
                    
                    // Save token in cookie and localStorage
                    const token = response.data.token;
                    const maxAge = 7 * 24 * 60 * 60;
                    document.cookie = 'authToken=' + token + '; path=/; max-age=' + maxAge + '; SameSite=Lax';
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                    console.log('✅ تم حفظ بيانات المستخدم:', response.data.user);
                    console.log('🍪 Cookie saved:', document.cookie.includes('authToken') ? 'YES' : 'NO');
                    
                    // Redirect based on user type
                    setTimeout(() => {
                        window.location.href = response.data.redirect || '/admin';
                    }, 1000);
                } else {
                    showAlert(response.data.error || response.data.message || 'فشل تسجيل الدخول');
                    loginBtn.disabled = false;
                    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt ml-2"></i> تسجيل الدخول';
                }
            } catch (error) {
                console.error('❌ Login error:', error);
                const errorMsg = error.response?.data?.error || error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.';
                showAlert(errorMsg);
                loginBtn.disabled = false;
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt ml-2"></i> تسجيل الدخول';
            }
        });
    </script>
</body>
</html>
`;
