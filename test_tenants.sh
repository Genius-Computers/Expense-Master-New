#!/bin/bash

echo "=== 🧪 اختبار صفحات إدارة الشركات ==="
echo ""

# 1. Test tenants list page
echo "1️⃣ صفحة قائمة الشركات:"
curl -s http://localhost:3000/admin/tenants | grep -o "<title>.*</title>" | head -1

# 2. Test add tenant page
echo ""
echo "2️⃣ صفحة إضافة شركة جديدة:"
curl -s http://localhost:3000/admin/tenants/add | grep -o "<title>.*</title>" | head -1

# 3. Test edit tenant page (tenant ID 1)
echo ""
echo "3️⃣ صفحة تعديل شركة #1:"
curl -s http://localhost:3000/admin/tenants/1/edit | grep -o "<title>.*</title>" | head -1

# 4. Test view tenant page (tenant ID 1)
echo ""
echo "4️⃣ صفحة عرض تفاصيل شركة #1:"
curl -s http://localhost:3000/admin/tenants/1 | grep -o "<title>.*</title>" | head -1

# 5. Test other pages still working
echo ""
echo "5️⃣ الصفحات الأخرى:"
curl -s http://localhost:3000/admin/reports | grep -o "<title>.*</title>" | head -1
curl -s http://localhost:3000/admin/requests | grep -o "<title>.*</title>" | head -1

echo ""
echo "=== ✅ انتهى الاختبار ==="
