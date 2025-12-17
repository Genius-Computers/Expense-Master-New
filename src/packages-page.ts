export const packagesPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>باقات الاشتراك - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .package-card {
            transition: all 0.3s ease;
        }
        .package-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .feature-item {
            display: flex;
            align-items: start;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .feature-item:last-child {
            border-bottom: none;
        }
        .popular-badge {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="gradient-header text-white py-16">
        <div class="container mx-auto px-4">
            <div class="text-center">
                <h1 class="text-5xl font-bold mb-4">
                    <i class="fas fa-box-open ml-3"></i>
                    باقات الاشتراك
                </h1>
                <p class="text-xl text-purple-100">اختر الباقة المناسبة لاحتياجات شركتك</p>
            </div>
        </div>
    </div>

    <!-- Packages Container -->
    <div class="container mx-auto px-4 py-12">
        <!-- Loading -->
        <div id="loading" class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-6xl text-purple-600"></i>
            <p class="text-gray-600 mt-4 text-xl">جاري تحميل الباقات...</p>
        </div>

        <!-- Packages Grid -->
        <div id="packagesGrid" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <!-- Packages will be loaded here -->
        </div>

        <!-- No Packages -->
        <div id="noPackages" class="hidden text-center py-12">
            <i class="fas fa-inbox text-6xl text-gray-400 mb-4"></i>
            <p class="text-gray-600 text-xl">لا توجد باقات متاحة حالياً</p>
        </div>
    </div>

    <!-- Features Comparison Section -->
    <div class="bg-white py-16 mt-12">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                <i class="fas fa-chart-bar text-purple-600 ml-3"></i>
                مقارنة المميزات
            </h2>
            <div class="max-w-6xl mx-auto overflow-x-auto">
                <table class="w-full border-collapse" id="comparisonTable">
                    <thead>
                        <tr class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <th class="px-6 py-4 text-right">الميزة</th>
                            <!-- Package columns will be added dynamically -->
                        </tr>
                    </thead>
                    <tbody id="comparisonBody">
                        <!-- Rows will be added dynamically -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="gradient-header text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-4">هل لديك أسئلة؟</h2>
            <p class="text-xl mb-8">فريقنا مستعد لمساعدتك في اختيار الباقة المناسبة</p>
            <div class="flex justify-center gap-4">
                <a href="/login" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
                    <i class="fas fa-sign-in-alt ml-2"></i>
                    تسجيل الدخول
                </a>
                <a href="/" class="bg-purple-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-900 transition">
                    <i class="fas fa-home ml-2"></i>
                    الصفحة الرئيسية
                </a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p>© 2025 منصة حاسبة التمويل. جميع الحقوق محفوظة.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        let packages = [];

        async function loadPackages() {
            try {
                const response = await axios.get('/api/packages');
                
                if (response.data.success) {
                    packages = response.data.data.filter(pkg => pkg.is_active === 1);
                    
                    if (packages.length === 0) {
                        document.getElementById('loading').classList.add('hidden');
                        document.getElementById('noPackages').classList.remove('hidden');
                        return;
                    }
                    
                    renderPackages();
                    renderComparison();
                    
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('packagesGrid').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading packages:', error);
                document.getElementById('loading').innerHTML = \`
                    <i class="fas fa-exclamation-circle text-6xl text-red-500"></i>
                    <p class="text-red-600 mt-4 text-xl">حدث خطأ في تحميل الباقات</p>
                \`;
            }
        }

        function renderPackages() {
            const grid = document.getElementById('packagesGrid');
            
            const html = packages.map((pkg, index) => {
                const isPopular = pkg.is_popular === 1;
                const features = JSON.parse(pkg.features || '[]');
                const priceMonthly = parseFloat(pkg.price_monthly || 0);
                const priceYearly = parseFloat(pkg.price_yearly || 0);
                const discount = priceYearly > 0 ? Math.round((1 - (priceYearly / (priceMonthly * 12))) * 100) : 0;
                
                return \`
                    <div class="package-card bg-white rounded-2xl shadow-xl overflow-hidden relative \${isPopular ? 'ring-4 ring-purple-500' : ''}">
                        \${isPopular ? \`
                            <div class="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-bl-2xl popular-badge">
                                <i class="fas fa-star ml-2"></i>
                                الأكثر شعبية
                            </div>
                        \` : ''}
                        
                        <div class="p-8 \${isPopular ? 'pt-16' : ''}">
                            <!-- Package Icon -->
                            <div class="text-center mb-6">
                                <div class="inline-block bg-gradient-to-br from-\${index === 0 ? 'blue' : index === 1 ? 'purple' : 'orange'}-500 to-\${index === 0 ? 'indigo' : index === 1 ? 'pink' : 'red'}-600 text-white rounded-full p-6 mb-4">
                                    <i class="fas fa-\${index === 0 ? 'rocket' : index === 1 ? 'crown' : 'star'} text-4xl"></i>
                                </div>
                                <h3 class="text-3xl font-bold text-gray-800">\${pkg.package_name}</h3>
                                <p class="text-gray-600 mt-2">\${pkg.description || ''}</p>
                            </div>

                            <!-- Pricing -->
                            <div class="text-center mb-8 pb-8 border-b-2 border-gray-200">
                                <div class="mb-4">
                                    <span class="text-5xl font-bold text-gray-800">\${priceMonthly.toLocaleString()}</span>
                                    <span class="text-gray-600"> ريال / شهرياً</span>
                                </div>
                                \${priceYearly > 0 ? \`
                                    <div class="bg-green-50 border-2 border-green-500 rounded-lg p-3 inline-block">
                                        <p class="text-green-800 font-bold">
                                            <i class="fas fa-tag ml-2"></i>
                                            وفّر \${discount}% بالاشتراك السنوي
                                        </p>
                                        <p class="text-green-700">\${priceYearly.toLocaleString()} ريال / سنوياً</p>
                                    </div>
                                \` : ''}
                            </div>

                            <!-- Features -->
                            <div class="mb-8">
                                <h4 class="font-bold text-gray-800 mb-4 text-lg">
                                    <i class="fas fa-check-circle text-green-600 ml-2"></i>
                                    المميزات المتضمنة:
                                </h4>
                                <div class="space-y-3">
                                    \${features.map(feature => \`
                                        <div class="feature-item">
                                            <i class="fas fa-check text-green-500 ml-3 mt-1"></i>
                                            <span class="text-gray-700">\${feature}</span>
                                        </div>
                                    \`).join('')}
                                    
                                    <!-- Package Limits -->
                                    <div class="feature-item">
                                        <i class="fas fa-users text-blue-500 ml-3 mt-1"></i>
                                        <span class="text-gray-700">حتى \${pkg.max_users || 'غير محدود'} مستخدم</span>
                                    </div>
                                    <div class="feature-item">
                                        <i class="fas fa-database text-purple-500 ml-3 mt-1"></i>
                                        <span class="text-gray-700">\${pkg.storage_gb || 'غير محدود'} جيجابايت تخزين</span>
                                    </div>
                                    <div class="feature-item">
                                        <i class="fas fa-headset text-orange-500 ml-3 mt-1"></i>
                                        <span class="text-gray-700">دعم فني \${pkg.support_level || 'أساسي'}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- CTA Button -->
                            <button onclick="subscribePackage(\${pkg.id}, '\${pkg.package_name}')" 
                                    class="w-full bg-gradient-to-r from-\${index === 0 ? 'blue' : index === 1 ? 'purple' : 'orange'}-600 to-\${index === 0 ? 'indigo' : index === 1 ? 'pink' : 'red'}-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105">
                                <i class="fas fa-shopping-cart ml-2"></i>
                                اشترك الآن
                            </button>
                        </div>
                    </div>
                \`;
            }).join('');
            
            grid.innerHTML = html;
        }

        function renderComparison() {
            const thead = document.querySelector('#comparisonTable thead tr');
            const tbody = document.getElementById('comparisonBody');
            
            // Add package columns to header
            packages.forEach((pkg, index) => {
                const th = document.createElement('th');
                th.className = 'px-6 py-4 text-center';
                th.innerHTML = \`
                    <div class="font-bold">\${pkg.package_name}</div>
                    <div class="text-sm font-normal">\${parseFloat(pkg.price_monthly).toLocaleString()} ريال/شهر</div>
                \`;
                thead.appendChild(th);
            });
            
            // Comparison features
            const comparisonFeatures = [
                { label: 'عدد المستخدمين', key: 'max_users' },
                { label: 'مساحة التخزين', key: 'storage_gb', suffix: ' جيجابايت' },
                { label: 'مستوى الدعم', key: 'support_level' },
                { label: 'تقارير متقدمة', key: 'advanced_reports', type: 'bool' },
                { label: 'واجهة برمجية API', key: 'api_access', type: 'bool' }
            ];
            
            comparisonFeatures.forEach(feature => {
                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
                tr.innerHTML = \`<td class="px-6 py-4 font-bold text-gray-700">\${feature.label}</td>\`;
                
                packages.forEach(pkg => {
                    const td = document.createElement('td');
                    td.className = 'px-6 py-4 text-center';
                    
                    let value = pkg[feature.key];
                    if (feature.type === 'bool') {
                        value = value === 1 ? '<i class="fas fa-check text-green-600 text-2xl"></i>' : '<i class="fas fa-times text-red-600 text-2xl"></i>';
                    } else {
                        value = value + (feature.suffix || '');
                    }
                    
                    td.innerHTML = value;
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
            });
        }

        function subscribePackage(packageId, packageName) {
            // Redirect to subscription request page
            window.location.href = \`/subscribe?package=\${packageId}\`;
        }

        // Load packages on page load
        loadPackages();
    </script>
</body>
</html>
`;
