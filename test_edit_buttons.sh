#!/bin/bash

echo "=== اختبار ظهور أزرار التعديل ==="
echo ""

# اختبار صفحة العملاء
echo "1️⃣ صفحة العملاء (/admin/customers):"
if curl -s http://localhost:3000/admin/customers 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة الطلبات
echo ""
echo "2️⃣ صفحة الطلبات (/admin/requests):"
if curl -s http://localhost:3000/admin/requests 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة البنوك
echo ""
echo "3️⃣ صفحة البنوك (/admin/banks):"
if curl -s http://localhost:3000/admin/banks 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة نسب التمويل
echo ""
echo "4️⃣ صفحة نسب التمويل (/admin/financing-ratios):"
if curl -s http://localhost:3000/admin/financing-ratios 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة الاشتراكات
echo ""
echo "5️⃣ صفحة الاشتراكات (/admin/subscriptions):"
if curl -s http://localhost:3000/admin/subscriptions 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة الباقات
echo ""
echo "6️⃣ صفحة الباقات (/admin/packages):"
if curl -s http://localhost:3000/admin/packages 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة المستخدمين
echo ""
echo "7️⃣ صفحة المستخدمين (/admin/users):"
if curl -s http://localhost:3000/admin/users 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

# اختبار صفحة الشركات
echo ""
echo "8️⃣ صفحة الشركات (/admin/tenants):"
if curl -s http://localhost:3000/admin/tenants 2>/dev/null | grep -q "تعديل"; then
    echo "✅ زر التعديل موجود"
else
    echo "❌ زر التعديل غير موجود"
fi

echo ""
echo "=== اكتمل الاختبار ==="
