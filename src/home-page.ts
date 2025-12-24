export const homePage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <i class="fas fa-calculator text-6xl text-blue-600 mb-4"></i>
                <h1 class="text-5xl font-bold text-gray-800 mb-4">منصة حاسبة التمويل</h1>
                <p class="text-xl text-gray-600">نظام شامل لإدارة التمويل والعملاء والبنوك</p>
            </div>
            
            <!-- Main Links -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
                <a href="/calculator" class="block bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
                    <i class="fas fa-calculator text-5xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">الحاسبة</h2>
                    <p class="text-blue-100">احسب التمويل المناسب لك</p>
                </a>
                
                <a href="/login" class="block bg-gradient-to-br from-green-500 to-green-700 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
                    <i class="fas fa-sign-in-alt text-5xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">تسجيل الدخول</h2>
                    <p class="text-green-100">دخول الموظفين</p>
                </a>
            </div>
            
            <!-- Features -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
                <h3 class="text-2xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-star text-yellow-500 ml-2"></i>
                    مميزات النظام
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-start">
                        <i class="fas fa-calculator text-blue-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">حاسبة تمويل متقدمة</h4>
                            <p class="text-gray-600">حساب دقيق لجميع أنواع التمويل</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-university text-green-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">إدارة البنوك والنسب</h4>
                            <p class="text-gray-600">تحديث نسب التمويل لجميع البنوك</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-users text-purple-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">إدارة المستخدمين</h4>
                            <p class="text-gray-600">نظام صلاحيات كامل</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-file-invoice-dollar text-orange-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">إدارة الاشتراكات</h4>
                            <p class="text-gray-600">باقات مرنة للشركات</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        // Load unread notifications count
        async function loadUnreadCount() {
            try {
                const response = await axios.get('/api/notifications/unread-count');
                if (response.data.success && response.data.count > 0) {
                    const badge = document.getElementById('notif-badge');
                    if (badge) {
                        badge.textContent = response.data.count;
                        badge.classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error('Error loading unread count:', error);
            }
        }
        
        loadUnreadCount();
    </script>
</body>
</html>
`;
