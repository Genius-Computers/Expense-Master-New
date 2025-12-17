#!/bin/bash

echo "🔍 اختبار أنظمة البحث في جميع الصفحات:"
echo "=========================================="

# 1. Customers
echo "1️⃣ صفحة العملاء (Customers):"
curl -s http://localhost:3000/admin/customers | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

# 2. Requests
echo "2️⃣ صفحة الطلبات (Requests):"
curl -s http://localhost:3000/admin/requests | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

# 3. Banks
echo "3️⃣ صفحة البنوك (Banks):"
curl -s http://localhost:3000/admin/banks | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

# 4. Rates
echo "4️⃣ صفحة النسب (Rates):"
curl -s http://localhost:3000/admin/rates | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

# 5. Subscriptions
echo "5️⃣ صفحة الاشتراكات (Subscriptions):"
curl -s http://localhost:3000/admin/subscriptions | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

# 6. Packages
echo "6️⃣ صفحة الباقات (Packages):"
curl -s http://localhost:3000/admin/packages | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

# 7. Users
echo "7️⃣ صفحة المستخدمين (Users):"
curl -s http://localhost:3000/admin/users | grep -q 'searchInput' && echo "   ✅ نظام البحث موجود" || echo "   ❌ نظام البحث غير موجود"

echo ""
echo "=========================================="
echo "✅ تم الانتهاء من الاختبار!"
