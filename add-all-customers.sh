#!/bin/bash

# Add remaining customers
npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('فاطمة عبدالله السالم', '1034567890', '0509876543', 'fatima@email.com', 'الرياض', 12000, 'مستشفى النور', 690, 1, 3, 'active')"

npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('خالد سعيد الغامدي', '1045678901', '0551234567', 'khalid@email.com', 'جدة', 18000, 'البنك السعودي', 750, 1, 4, 'active')"

npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('نورة حسن الشمري', '1056789012', '0559876543', 'noura@email.com', 'الدمام', 11000, 'أرامكو', 680, 1, 3, 'active')"

npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('محمد عمر القحطاني', '1067890123', '0561234567', 'mohammed@email.com', 'الرياض', 20000, 'سابك', 780, 1, 4, 'active')"

npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('سارة علي المطيري', '1078901234', '0569876543', 'sara@email.com', 'جدة', 13000, 'شركة الاتصالات', 700, 1, 3, 'active')"

npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('عبدالرحمن ناصر الدوسري', '1089012345', '0571234567', 'abdulrahman@email.com', 'الخبر', 16000, 'معادن', 710, 1, 4, 'active')"

npx wrangler d1 execute tamweel-production --local --command="INSERT INTO customers (customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES ('مريم يوسف الزهراني', '1090123456', '0579876543', 'mariam@email.com', 'الرياض', 14000, 'الهيئة الملكية', 695, 1, 3, 'active')"

echo "All customers added successfully!"
