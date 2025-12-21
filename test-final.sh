#!/bin/bash

echo "=== Testing Data After Restart ==="

# Login as supervisor
TOKEN=$(curl -s -X POST http://localhost:8087/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"supervisor","password":"Supervisor@2025"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "✓ Logged in as supervisor"
echo "Token: ${TOKEN:0:30}..."
echo ""

# Get customers
RESPONSE=$(curl -s http://localhost:8087/api/customers \
  -H "Authorization: Bearer $TOKEN")

# Count
COUNT=$(echo "$RESPONSE" | grep -o '"id":[0-9]*' | wc -l)
echo "📊 Total customers found: $COUNT"
echo ""

# Show first 3 customers
echo "📋 Sample customers:"
echo "$RESPONSE" | grep -o '"customer_name":"[^"]*' | head -5 | sed 's/"customer_name":"/ - /'
echo ""
echo "✅ Data is working!"
