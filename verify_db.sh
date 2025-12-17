#!/bin/bash
echo "=== Database Verification ==="

echo -e "\n1. Latest Customers:"
npx wrangler d1 execute tamweel-production --local --command="SELECT id, full_name, phone, email FROM customers ORDER BY id DESC LIMIT 3"

echo -e "\n2. Latest Financing Requests:"
npx wrangler d1 execute tamweel-production --local --command="SELECT id, customer_id, requested_amount, status FROM financing_requests ORDER BY id DESC LIMIT 3"

echo -e "\n3. Latest Rates:"
npx wrangler d1 execute tamweel-production --local --command="SELECT id, bank_id, financing_type_id, rate FROM bank_financing_rates ORDER BY id DESC LIMIT 3"

echo -e "\n4. Latest Packages:"
npx wrangler d1 execute tamweel-production --local --command="SELECT id, package_name, price FROM packages ORDER BY id DESC LIMIT 3"

echo -e "\n5. Latest Subscriptions:"
npx wrangler d1 execute tamweel-production --local --command="SELECT id, company_name, status FROM subscriptions ORDER BY id DESC LIMIT 3"

echo -e "\n6. Latest Users:"
npx wrangler d1 execute tamweel-production --local --command="SELECT id, username, full_name FROM users ORDER BY id DESC LIMIT 3"

echo -e "\n=== Verification Complete ==="
