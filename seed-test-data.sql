-- إضافة بيانات تجريبية للاختبار والتقارير

-- إضافة عملاء تجريبيين لـ tenant_id = 1
INSERT OR IGNORE INTO customers (id, full_name, phone, email, national_id, birthdate, employer_name, job_title, work_start_date, city, monthly_salary, tenant_id, created_at)
VALUES 
  (1, 'محمد أحمد السعيد', '0501234567', 'mohammed@example.com', '1234567890', '1985-05-15', 'شركة الاتصالات', 'مهندس شبكات', '2015-01-01', 'الرياض', 15000, 1, '2024-01-15 10:00:00'),
  (2, 'فاطمة علي الزهراني', '0502345678', 'fatima@example.com', '2234567890', '1990-08-22', 'مستشفى الملك فيصل', 'طبيبة عامة', '2018-03-01', 'جدة', 20000, 1, '2024-02-20 11:30:00'),
  (3, 'عبدالله محمد القحطاني', '0503456789', 'abdullah@example.com', '3234567890', '1982-12-10', 'شركة أرامكو', 'محاسب أول', '2010-06-01', 'الدمام', 18000, 1, '2024-03-10 14:20:00'),
  (4, 'نورة سعد المطيري', '0504567890', 'nora@example.com', '4234567890', '1988-03-18', 'وزارة التعليم', 'معلمة', '2012-09-01', 'الرياض', 12000, 1, '2024-04-05 09:15:00'),
  (5, 'خالد عبدالرحمن الشمري', '0505678901', 'khaled@example.com', '5234567890', '1983-07-25', 'البنك الأهلي', 'مدير فرع', '2008-02-01', 'جدة', 25000, 1, '2024-05-12 16:45:00');

-- إضافة طلبات تمويل تجريبية لـ tenant_id = 1
INSERT OR IGNORE INTO financing_requests (id, customer_id, bank_id, financing_type_id, financing_amount, duration_months, monthly_installment, total_amount, profit_amount, administrative_fees, status, notes, tenant_id, created_at)
VALUES
  (1, 1, 1, 1, 150000, 60, 3125, 187500, 37500, 750, 'approved', 'تمويل شخصي موافق عليه', 1, '2024-06-01 10:00:00'),
  (2, 2, 2, 2, 300000, 180, 2222, 400000, 100000, 1500, 'approved', 'تمويل عقاري موافق عليه', 1, '2024-06-05 11:30:00'),
  (3, 3, 1, 1, 80000, 48, 2083, 100000, 20000, 400, 'pending', 'قيد المراجعة', 1, '2024-06-10 14:20:00'),
  (4, 4, 3, 3, 50000, 36, 1667, 60000, 10000, 250, 'pending', 'قيد المراجعة', 1, '2024-06-15 09:15:00'),
  (5, 5, 2, 2, 400000, 240, 2333, 560000, 160000, 2000, 'rejected', 'الراتب لا يكفي', 1, '2024-06-20 16:45:00'),
  (6, 1, 1, 3, 30000, 24, 1458, 35000, 5000, 150, 'approved', 'تمويل سيارة موافق عليه', 1, '2024-06-25 10:30:00'),
  (7, 3, 2, 1, 60000, 36, 2000, 72000, 12000, 300, 'pending', 'بانتظار الموافقة', 1, '2024-06-28 13:00:00');

-- إضافة عملاء تجريبيين لـ tenant_id = 2
INSERT OR IGNORE INTO customers (id, full_name, phone, email, national_id, birthdate, employer_name, job_title, work_start_date, city, monthly_salary, tenant_id, created_at)
VALUES 
  (6, 'سارة أحمد العتيبي', '0506789012', 'sara@example.com', '6234567890', '1992-06-12', 'شركة سابك', 'محللة مالية', '2019-04-01', 'الرياض', 16000, 2, '2024-05-01 10:00:00'),
  (7, 'عمر فهد الدوسري', '0507890123', 'omar@example.com', '7234567890', '1987-09-30', 'شركة الكهرباء', 'مهندس كهرباء', '2014-07-01', 'جدة', 19000, 2, '2024-05-15 11:30:00');

-- إضافة طلبات تمويل تجريبية لـ tenant_id = 2  
INSERT OR IGNORE INTO financing_requests (id, customer_id, bank_id, financing_type_id, financing_amount, duration_months, monthly_installment, total_amount, profit_amount, administrative_fees, status, notes, tenant_id, created_at)
VALUES
  (8, 6, 1, 1, 100000, 60, 2083, 125000, 25000, 500, 'approved', 'موافق عليه', 2, '2024-06-18 10:00:00'),
  (9, 7, 2, 2, 350000, 200, 2333, 466666, 116666, 1750, 'pending', 'قيد الدراسة', 2, '2024-06-22 14:30:00');

-- تحديث إحصائيات العملاء
UPDATE customers SET created_at = datetime('now', '-' || (id * 3) || ' days') WHERE id <= 7;
UPDATE financing_requests SET created_at = datetime('now', '-' || (id * 2) || ' days') WHERE id <= 9;
