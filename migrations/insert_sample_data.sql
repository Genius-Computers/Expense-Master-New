-- Clear existing sample data first
DELETE FROM customers WHERE id <= 10;
DELETE FROM financing_types WHERE id <= 10;

-- Create financing_types table if not exists
CREATE TABLE IF NOT EXISTS financing_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  tenant_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Insert financing types
INSERT INTO financing_types (id, name, description, tenant_id) VALUES
(1, 'تمويل سيارة', 'تمويل لشراء سيارة', 1),
(2, 'تمويل عقاري', 'تمويل لشراء عقار', 1),
(3, 'تمويل شخصي', 'تمويل شخصي للأغراض العامة', 1),
(4, 'تمويل تجاري', 'تمويل للمشاريع التجارية', 1);

-- Insert sample customers with correct column names
INSERT INTO customers (id, customer_name, national_id, phone, email, city, salary, employer, credit_score, tenant_id, assigned_to, status) VALUES
(1, 'أحمد محمد العلي', '1023456789', '0501234567', 'ahmed@email.com', 'الرياض', 15000, 'شركة الرياض', 720, 1, 3, 'active'),
(2, 'فاطمة عبدالله السالم', '1034567890', '0509876543', 'fatima@email.com', 'الرياض', 12000, 'مستشفى النور', 690, 1, 3, 'active'),
(3, 'خالد سعيد الغامدي', '1045678901', '0551234567', 'khalid@email.com', 'جدة', 18000, 'البنك السعودي', 750, 1, 4, 'active'),
(4, 'نورة حسن الشمري', '1056789012', '0559876543', 'noura@email.com', 'الدمام', 11000, 'أرامكو', 680, 1, 3, 'active'),
(5, 'محمد عمر القحطاني', '1067890123', '0561234567', 'mohammed@email.com', 'الرياض', 20000, 'سابك', 780, 1, 4, 'active'),
(6, 'سارة علي المطيري', '1078901234', '0569876543', 'sara@email.com', 'جدة', 13000, 'شركة الاتصالات', 700, 1, 3, 'active'),
(7, 'عبدالرحمن ناصر الدوسري', '1089012345', '0571234567', 'abdulrahman@email.com', 'الخبر', 16000, 'معادن', 710, 1, 4, 'active'),
(8, 'مريم يوسف الزهراني', '1090123456', '0579876543', 'mariam@email.com', 'الرياض', 14000, 'الهيئة الملكية', 695, 1, 3, 'active');
