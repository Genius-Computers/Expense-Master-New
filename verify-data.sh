#!/bin/bash

echo "=== اختبار البيانات النهائي ===" 
echo ""

# تسجيل الدخول كمشرف
TOKEN=$(curl -s -X POST http://localhost:8088/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"supervisor","password":"Supervisor@2025"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ فشل تسجيل الدخول"
  exit 1
fi

echo "✓ تسجيل الدخول ناجح"
echo ""

# جلب العملاء
CUSTOMERS_JSON=$(curl -s http://localhost:8088/api/customers \
  -H "Authorization: Bearer $TOKEN")

# عدد العملاء
COUNT=$(echo "$CUSTOMERS_JSON" | grep -o '"id":[0-9]*' | wc -l)
echo "📊 إجمالي العملاء: $COUNT"
echo ""

if [ "$COUNT" -gt 0 ]; then
  echo "✅ البيانات تعمل بنجاح!"
  echo ""
  echo "🎯 عينة من العملاء:"
  echo "$CUSTOMERS_JSON" | grep -o '"customer_name":"[^"]*' | head -3 | sed 's/"customer_name":"/  • /' | sed 's/"$//'
else
  echo "⚠️ لا توجد بيانات - سأتحقق من السبب..."
  echo "Response: $CUSTOMERS_JSON"
fi
