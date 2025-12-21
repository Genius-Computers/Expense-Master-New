#!/bin/bash
echo "Testing data availability..."

# Login as supervisor
TOKEN=$(curl -s -X POST http://localhost:8087/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"supervisor","password":"Supervisor@2025"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token received: ${TOKEN:0:20}..."

# Test customers
CUSTOMERS=$(curl -s http://localhost:8087/api/customers \
  -H "Authorization: Bearer $TOKEN")

echo "Customers response:"
echo "$CUSTOMERS" | head -c 500
echo ""

# Count customers
COUNT=$(echo "$CUSTOMERS" | grep -o '"id"' | wc -l)
echo "Total customers found: $COUNT"
