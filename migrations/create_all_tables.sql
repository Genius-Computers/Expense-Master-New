-- Create financing_types table
CREATE TABLE IF NOT EXISTS financing_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  tenant_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Insert default financing types
INSERT OR IGNORE INTO financing_types (id, name, description, tenant_id) VALUES
(1, 'تمويل سيارة', 'تمويل لشراء سيارة', 1),
(2, 'تمويل عقاري', 'تمويل لشراء عقار', 1),
(3, 'تمويل شخصي', 'تمويل شخصي للأغراض العامة', 1),
(4, 'تمويل تجاري', 'تمويل للمشاريع التجارية', 1);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT,
  notes TEXT,
  assigned_to INTEGER,
  tenant_id INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Insert sample customers
INSERT OR IGNORE INTO customers (id, name, phone, email, city, assigned_to, tenant_id) VALUES
(1, 'أحمد محمد العلي', '0501234567', 'ahmed@email.com', 'الرياض', 3, 1),
(2, 'فاطمة عبدالله السالم', '0509876543', 'fatima@email.com', 'الرياض', 3, 1),
(3, 'خالد سعيد الغامدي', '0551234567', 'khalid@email.com', 'جدة', 4, 1),
(4, 'نورة حسن الشمري', '0559876543', 'noura@email.com', 'الدمام', 3, 1),
(5, 'محمد عمر القحطاني', '0561234567', 'mohammed@email.com', 'الرياض', 4, 1),
(6, 'سارة علي المطيري', '0569876543', 'sara@email.com', 'جدة', 3, 1),
(7, 'عبدالرحمن ناصر الدوسري', '0571234567', 'abdulrahman@email.com', 'الخبر', 4, 1),
(8, 'مريم يوسف الزهراني', '0579876543', 'mariam@email.com', 'الرياض', 3, 1);

-- Create financing_requests table
CREATE TABLE IF NOT EXISTS financing_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  financing_type_id INTEGER NOT NULL,
  requested_amount REAL NOT NULL,
  approved_amount REAL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  tenant_id INTEGER NOT NULL,
  created_by INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (financing_type_id) REFERENCES financing_types(id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Insert sample financing requests
INSERT OR IGNORE INTO financing_requests (id, customer_id, financing_type_id, requested_amount, approved_amount, status, tenant_id, created_by) VALUES
(1, 1, 1, 150000, 145000, 'approved', 1, 3),
(2, 2, 3, 50000, NULL, 'pending', 1, 3),
(3, 3, 2, 500000, 480000, 'approved', 1, 4),
(4, 4, 1, 120000, NULL, 'pending', 1, 3),
(5, 5, 4, 300000, 280000, 'approved', 1, 4),
(6, 6, 3, 75000, 70000, 'approved', 1, 3),
(7, 7, 1, 180000, NULL, 'under_review', 1, 4),
(8, 8, 2, 600000, NULL, 'pending', 1, 3);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT,
  date TEXT DEFAULT (date('now')),
  tenant_id INTEGER NOT NULL,
  created_by INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Insert sample expenses
INSERT OR IGNORE INTO expenses (id, description, amount, category, tenant_id, created_by) VALUES
(1, 'إيجار المكتب - يناير', 15000, 'إيجار', 1, 2),
(2, 'رواتب الموظفين', 45000, 'رواتب', 1, 2),
(3, 'فواتير الكهرباء والماء', 2500, 'مرافق', 1, 2),
(4, 'صيانة السيارات', 3500, 'صيانة', 1, 4),
(5, 'مصاريف دعاية وتسويق', 8000, 'تسويق', 1, 2),
(6, 'قرطاسية ومستلزمات مكتبية', 1200, 'مستلزمات', 1, 4),
(7, 'اشتراكات برامج وأنظمة', 4500, 'تقنية', 1, 2);
