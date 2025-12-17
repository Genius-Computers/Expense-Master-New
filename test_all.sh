#!/bin/bash

echo "=== 🔧 اختبار الوظائف الأساسية ==="
echo ""

# 1. Test login
echo "1️⃣ اختبار تسجيل الدخول (admin1):"
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"Admin1@2025"}' | jq -r '.tenant_id, .tenant_name'
echo ""

# 2. Test financing requests list
echo "2️⃣ اختبار صفحة قائمة طلبات التمويل:"
curl -s http://localhost:3000/admin/requests | grep -o "<title>.*</title>" | head -1
echo ""

# 3. Test edit financing request page
echo "3️⃣ اختبار صفحة تعديل الطلب #1:"
curl -s http://localhost:3000/admin/requests/1/edit | grep -o "<title>.*</title>" | head -1
echo ""

# 4. Test reports page
echo "4️⃣ اختبار صفحة التقارير:"
curl -s http://localhost:3000/admin/reports | grep -o "<title>.*</title>" | head -1
echo ""

# 5. Test SaaS settings page
echo "5️⃣ اختبار صفحة إعدادات SaaS:"
curl -s http://localhost:3000/admin/saas-settings | grep -o "<title>.*</title>" | head -1
echo ""

echo "=== ✅ انتهى الاختبار ==="
