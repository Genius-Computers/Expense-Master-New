export const tenantCalculatorsPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبات الشركات - SaaS Multi-Tenant</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-50">
    <div class="bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-calculator ml-3"></i>
                    حاسبات الشركات
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للوحة التحكم
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <div class="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold mb-3"><i class="fas fa-info-circle ml-2"></i>حاسبات مخصصة لكل شركة</h2>
            <p class="text-violet-100">كل شركة لديها رابط حاسبة خاص بها. يمكن مشاركة هذا الرابط مع العملاء.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="calculators-grid"></div>
    </div>

    <script>
        async function loadCalculators() {
            try {
                const response = await axios.get('/api/tenants');
                const tenants = response.data.data.filter(t => t.status === 'active');
                
                const grid = document.getElementById('calculators-grid');
                grid.innerHTML = tenants.map(tenant => {
                    const calculatorUrl = '/c/' + tenant.slug + '/calculator';
                    const fullUrl = window.location.origin + calculatorUrl;
                    
                    return '<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">' +
                        '<div class="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6">' +
                        '<h3 class="text-xl font-bold mb-2">' + tenant.company_name + '</h3>' +
                        '<p class="text-sm text-violet-100">' + tenant.slug + '</p>' +
                        '</div>' +
                        '<div class="p-6">' +
                        '<div class="mb-4">' +
                        '<label class="block text-sm font-bold text-gray-700 mb-2">رابط الحاسبة</label>' +
                        '<input type="text" value="' + fullUrl + '" readonly class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm">' +
                        '</div>' +
                        '<a href="' + calculatorUrl + '" target="_blank" class="block text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg font-bold">' +
                        '<i class="fas fa-external-link-alt ml-2"></i>فتح الحاسبة</a>' +
                        '</div></div>';
                }).join('');
            } catch (error) {
                alert('حدث خطأ في تحميل البيانات');
            }
        }
        loadCalculators();
    </script>
</body>
</html>
`;
