// Rates Add/Edit Forms

export function generateAddRatePage(tenantId: string, banks: any[], financingTypes: any[]) {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة نسبة جديدة</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-3xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/rates?tenant_id=${tenantId}" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة للنسب
          </a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-plus-circle text-green-600 ml-2"></i>
            إضافة نسبة تمويل جديدة
          </h1>
          
          <form id="addRateForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-university ml-1"></i>
                  البنك *
                </label>
                <select name="bank_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">اختر البنك</option>
                  ${banks.map(bank => `<option value="${bank.id}">${bank.bank_name}</option>`).join('')}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-tag ml-1"></i>
                  نوع التمويل *
                </label>
                <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">اختر نوع التمويل</option>
                  ${financingTypes.map(type => `<option value="${type.id}">${type.type_name}</option>`).join('')}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-percent ml-1"></i>
                  النسبة % *
                </label>
                <input type="number" name="rate" step="0.01" min="0" max="100" required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 5.5">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill ml-1"></i>
                  الحد الأدنى للمبلغ (ريال)
                </label>
                <input type="number" name="min_amount" min="0" step="1000"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 10000">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill-wave ml-1"></i>
                  الحد الأقصى للمبلغ (ريال)
                </label>
                <input type="number" name="max_amount" min="0" step="1000"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 500000">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar ml-1"></i>
                  الحد الأدنى للمدة (شهر)
                </label>
                <input type="number" name="min_duration" min="1" max="360"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 12">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar-alt ml-1"></i>
                  الحد الأقصى للمدة (شهر)
                </label>
                <input type="number" name="max_duration" min="1" max="360"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 60">
              </div>
            </div>
            
            <div class="flex gap-4 mt-8">
              <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md">
                <i class="fas fa-check ml-2"></i>
                حفظ النسبة
              </button>
              <a href="/admin/rates?tenant_id=${tenantId}" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md text-center">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
      
      <script>
        document.getElementById('addRateForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            bank_id: parseInt(formData.get('bank_id')),
            financing_type_id: parseInt(formData.get('financing_type_id')),
            rate: parseFloat(formData.get('rate')),
            min_amount: formData.get('min_amount') ? parseFloat(formData.get('min_amount')) : null,
            max_amount: formData.get('max_amount') ? parseFloat(formData.get('max_amount')) : null,
            min_duration: formData.get('min_duration') ? parseInt(formData.get('min_duration')) : null,
            max_duration: formData.get('max_duration') ? parseInt(formData.get('max_duration')) : null,
            tenant_id: ${tenantId}
          };
          
          try {
            const response = await fetch('/api/rates', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              alert('✅ تم إضافة النسبة بنجاح!');
              window.location.href = '/admin/rates?tenant_id=${tenantId}';
            } else {
              alert('❌ خطأ: ' + result.message);
            }
          } catch (error) {
            alert('❌ حدث خطأ: ' + error.message);
          }
        });
      </script>
    </body>
    </html>
  `;
}

export function generateEditRatePage(tenantId: string, rate: any, banks: any[], financingTypes: any[]) {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تعديل النسبة</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-3xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/rates?tenant_id=${tenantId}" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة للنسب
          </a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-edit text-blue-600 ml-2"></i>
            تعديل نسبة التمويل
          </h1>
          
          <form id="editRateForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-university ml-1"></i>
                  البنك *
                </label>
                <select name="bank_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">اختر البنك</option>
                  ${banks.map(bank => `<option value="${bank.id}" ${bank.id == rate.bank_id ? 'selected' : ''}>${bank.bank_name}</option>`).join('')}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-tag ml-1"></i>
                  نوع التمويل *
                </label>
                <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">اختر نوع التمويل</option>
                  ${financingTypes.map(type => `<option value="${type.id}" ${type.id == rate.financing_type_id ? 'selected' : ''}>${type.type_name}</option>`).join('')}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-percent ml-1"></i>
                  النسبة % *
                </label>
                <input type="number" name="rate" step="0.01" min="0" max="100" required value="${rate.rate}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill ml-1"></i>
                  الحد الأدنى للمبلغ (ريال)
                </label>
                <input type="number" name="min_amount" min="0" step="1000" value="${rate.min_amount || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill-wave ml-1"></i>
                  الحد الأقصى للمبلغ (ريال)
                </label>
                <input type="number" name="max_amount" min="0" step="1000" value="${rate.max_amount || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar ml-1"></i>
                  الحد الأدنى للمدة (شهر)
                </label>
                <input type="number" name="min_duration" min="1" max="360" value="${rate.min_duration || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar-alt ml-1"></i>
                  الحد الأقصى للمدة (شهر)
                </label>
                <input type="number" name="max_duration" min="1" max="360" value="${rate.max_duration || ''}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
            </div>
            
            <div class="flex gap-4 mt-8">
              <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md">
                <i class="fas fa-save ml-2"></i>
                حفظ التعديلات
              </button>
              <a href="/admin/rates?tenant_id=${tenantId}" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md text-center">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
      
      <script>
        document.getElementById('editRateForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            bank_id: parseInt(formData.get('bank_id')),
            financing_type_id: parseInt(formData.get('financing_type_id')),
            rate: parseFloat(formData.get('rate')),
            min_amount: formData.get('min_amount') ? parseFloat(formData.get('min_amount')) : null,
            max_amount: formData.get('max_amount') ? parseFloat(formData.get('max_amount')) : null,
            min_duration: formData.get('min_duration') ? parseInt(formData.get('min_duration')) : null,
            max_duration: formData.get('max_duration') ? parseInt(formData.get('max_duration')) : null
          };
          
          try {
            const response = await fetch('/api/rates/${rate.id}', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              alert('✅ تم تحديث النسبة بنجاح!');
              window.location.href = '/admin/rates?tenant_id=${tenantId}';
            } else {
              alert('❌ خطأ: ' + result.message);
            }
          } catch (error) {
            alert('❌ حدث خطأ: ' + error.message);
          }
        });
      </script>
    </body>
    </html>
  `;
}
