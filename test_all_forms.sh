#!/bin/bash
echo "=== Testing All Forms ==="

# Test 1: Add Customer Form
echo -e "\n1. Testing Customer Form..."
curl -s -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "full_name=Test Customer $(date +%s)" \
  -d "phone=0500000000" \
  -d "email=test_$(date +%s)@example.com" \
  -d "national_id=1234567890" \
  -w "\nStatus: %{http_code}\n" | head -2

# Test 2: Add Request Form
echo -e "\n2. Testing Request Form..."
curl -s -X POST http://localhost:3000/api/requests \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "customer_id=1" \
  -d "financing_type_id=1" \
  -d "requested_amount=100000" \
  -d "duration_months=24" \
  -d "salary_at_request=10000" \
  -d "selected_bank_id=1" \
  -d "status=pending" \
  -d "notes=Test request" \
  -w "\nStatus: %{http_code}\n" | head -2

# Test 3: Add Rate Form
echo -e "\n3. Testing Rate Form..."
curl -s -X POST http://localhost:3000/api/rates \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "bank_id=1" \
  -d "financing_type_id=1" \
  -d "rate=3.5" \
  -d "min_amount=50000" \
  -d "max_amount=500000" \
  -d "min_duration=12" \
  -d "max_duration=60" \
  -w "\nStatus: %{http_code}\n" | head -2

# Test 4: Add Package Form
echo -e "\n4. Testing Package Form..."
curl -s -X POST http://localhost:3000/api/packages \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "package_name=Test Package $(date +%s)" \
  -d "description=Test Description" \
  -d "price=1000" \
  -d "duration_months=12" \
  -d "max_calculations=100" \
  -d "max_users=5" \
  -d "is_active=1" \
  -w "\nStatus: %{http_code}\n" | head -2

# Test 5: Add Subscription Form
echo -e "\n5. Testing Subscription Form..."
curl -s -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "company_name=Test Company $(date +%s)" \
  -d "package_id=1" \
  -d "start_date=2025-01-01" \
  -d "end_date=2025-12-31" \
  -d "status=active" \
  -d "calculations_used=0" \
  -w "\nStatus: %{http_code}\n" | head -2

# Test 6: Add User Form (with unique username)
echo -e "\n6. Testing User Form..."
USERNAME="user_test_$(date +%s)"
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$USERNAME" \
  -d "password=Test123456" \
  -d "full_name=Test User" \
  -d "email=test_$(date +%s)@example.com" \
  -d "phone=0500000000" \
  -d "user_type=employee" \
  -d "role_id=1" \
  -d "subscription_id=1" \
  -d "is_active=1" \
  -w "\nStatus: %{http_code}\n" | head -2

echo -e "\n=== All Tests Complete ==="
