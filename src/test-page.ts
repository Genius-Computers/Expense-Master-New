export const testPage = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اختبار APIs</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">اختبار APIs</h1>
        
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <button onclick="testAll()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                اختبار جميع APIs
            </button>
        </div>
        
        <div id="results" class="space-y-4"></div>
    </div>

    <script>
        async function testAll() {
            const results = document.getElementById('results');
            results.innerHTML = '<div class="text-center">جاري الاختبار...</div>';
            
            const tests = [
                { name: 'احصائيات', url: '/api/stats' },
                { name: 'العملاء', url: '/api/customers' },
                { name: 'الطلبات', url: '/api/requests' }
            ];
            
            let html = '';
            for (const test of tests) {
                try {
                    const response = await axios.get(test.url);
                    html += \`
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-xl font-bold mb-3 text-green-600">✓ \${test.name}</h3>
                            <pre class="bg-gray-100 p-4 rounded overflow-auto">\${JSON.stringify(response.data, null, 2)}</pre>
                        </div>
                    \`;
                } catch (error) {
                    html += \`
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-xl font-bold mb-3 text-red-600">✗ \${test.name}</h3>
                            <pre class="bg-red-100 p-4 rounded overflow-auto">\${error.message}</pre>
                        </div>
                    \`;
                }
            }
            
            results.innerHTML = html;
        }
    </script>
</body>
</html>
`;
