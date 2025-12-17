-- ============================================
-- نظام إدارة التمويل الكامل
-- Database Schema with All Tables
-- ============================================

-- 1. جدول الأدوار (Roles)
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. جدول المستخدمين (Users)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role_id INTEGER DEFAULT 2,
    user_type TEXT DEFAULT 'company',
    subscription_id INTEGER,
    is_active INTEGER DEFAULT 1,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

-- 3. جدول البنوك (Banks)
CREATE TABLE IF NOT EXISTS banks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bank_name TEXT UNIQUE NOT NULL,
    bank_code TEXT UNIQUE,
    logo_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. جدول أنواع التمويل (Financing Types)
CREATE TABLE IF NOT EXISTS financing_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT UNIQUE NOT NULL,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. جدول نسب التمويل (Bank Financing Rates)
CREATE TABLE IF NOT EXISTS bank_financing_rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bank_id INTEGER NOT NULL,
    financing_type_id INTEGER NOT NULL,
    rate REAL NOT NULL,
    min_amount REAL,
    max_amount REAL,
    min_salary REAL,
    max_salary REAL,
    min_duration INTEGER,
    max_duration INTEGER,
    effective_date DATE DEFAULT CURRENT_DATE,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bank_id) REFERENCES banks(id),
    FOREIGN KEY (financing_type_id) REFERENCES financing_types(id)
);

-- 6. جدول الباقات (Packages)
CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_name TEXT UNIQUE NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    duration_months INTEGER NOT NULL,
    max_calculations INTEGER,
    max_users INTEGER,
    features TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. جدول الاشتراكات (Subscriptions)
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    package_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT DEFAULT 'active',
    calculations_used INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- 8. جدول طلبات الاشتراك (Subscription Requests)
CREATE TABLE IF NOT EXISTS subscription_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    package_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- 9. جدول العملاء (Customers)
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    national_id TEXT UNIQUE NOT NULL,
    employer_name TEXT,
    job_title TEXT,
    monthly_salary REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. جدول طلبات التمويل (Financing Requests)
CREATE TABLE IF NOT EXISTS financing_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    financing_type_id INTEGER DEFAULT 1,
    requested_amount REAL NOT NULL,
    duration_months INTEGER NOT NULL,
    salary_at_request REAL NOT NULL,
    selected_bank_id INTEGER,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (financing_type_id) REFERENCES financing_types(id),
    FOREIGN KEY (selected_bank_id) REFERENCES banks(id)
);

-- 11. جدول تاريخ حالة الطلبات (Request Status History)
CREATE TABLE IF NOT EXISTS request_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL,
    old_status TEXT,
    new_status TEXT NOT NULL,
    changed_by INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES financing_requests(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

-- 12. جدول الحسابات (Calculations)
CREATE TABLE IF NOT EXISTS calculations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    subscription_id INTEGER,
    financing_type_id INTEGER NOT NULL,
    bank_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    duration_months INTEGER NOT NULL,
    salary REAL NOT NULL,
    rate REAL NOT NULL,
    monthly_payment REAL NOT NULL,
    total_payment REAL NOT NULL,
    total_interest REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id),
    FOREIGN KEY (financing_type_id) REFERENCES financing_types(id),
    FOREIGN KEY (bank_id) REFERENCES banks(id)
);

-- 13. جدول التحويلات (Conversions)
CREATE TABLE IF NOT EXISTS conversions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_ip TEXT,
    page_url TEXT,
    conversion_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 14. جدول إشعارات تغيير كلمة المرور (Password Change Notifications)
CREATE TABLE IF NOT EXISTS password_change_notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    old_password_hash TEXT NOT NULL,
    new_password_hash TEXT NOT NULL,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================
-- إدخال البيانات الأساسية
-- ============================================

-- الأدوار
INSERT OR IGNORE INTO roles (id, role_name, description) VALUES
(1, 'admin', 'مدير النظام'),
(2, 'company', 'شركة مشتركة'),
(3, 'user', 'مستخدم عادي');

-- المستخدم الإداري
INSERT OR IGNORE INTO users (id, username, password, full_name, email, role_id, user_type) VALUES
(1, 'admin', 'Admin@2025', 'مدير النظام', 'admin@tamweel.sa', 1, 'admin');

-- البنوك
INSERT OR IGNORE INTO banks (id, bank_name, bank_code) VALUES
(1, 'مصرف الراجحي', 'RAJ'),
(2, 'البنك الأهلي السعودي', 'NCB'),
(3, 'بنك الرياض', 'RYD'),
(4, 'البنك السعودي للاستثمار', 'SIB'),
(5, 'بنك ساب', 'SAB');

-- أنواع التمويل
INSERT OR IGNORE INTO financing_types (id, type_name, description) VALUES
(1, 'التمويل الشخصي', 'تمويل شخصي للأفراد'),
(2, 'تمويل السيارات', 'تمويل لشراء السيارات'),
(3, 'تمويل العقار', 'تمويل لشراء أو بناء العقارات');

-- نسب التمويل
INSERT OR IGNORE INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration) VALUES
-- مصرف الراجحي
(1, 1, 4.5, 10000, 500000, 3000, 50000, 12, 60),
(1, 2, 3.8, 20000, 300000, 4000, 50000, 12, 60),
(1, 3, 3.2, 50000, 2000000, 8000, 100000, 60, 300),
-- البنك الأهلي
(2, 1, 4.2, 10000, 500000, 3000, 50000, 12, 60),
(2, 2, 3.5, 20000, 300000, 4000, 50000, 12, 60),
(2, 3, 3.0, 50000, 2000000, 8000, 100000, 60, 300),
-- بنك الرياض
(3, 1, 4.8, 10000, 500000, 3000, 50000, 12, 60),
(3, 2, 4.0, 20000, 300000, 4000, 50000, 12, 60),
(3, 3, 3.5, 50000, 2000000, 8000, 100000, 60, 300);

-- الباقات
INSERT OR IGNORE INTO packages (id, package_name, description, price, duration_months, max_calculations, max_users) VALUES
(1, 'الباقة الأساسية', 'مناسبة للشركات الصغيرة', 299, 1, 100, 3),
(2, 'الباقة المتقدمة', 'مناسبة للشركات المتوسطة', 799, 3, 500, 10),
(3, 'الباقة الاحترافية', 'مناسبة للشركات الكبيرة', 1999, 12, -1, 50);

-- اشتراكات تجريبية
INSERT OR IGNORE INTO subscriptions (id, company_name, package_id, start_date, end_date, status) VALUES
(1, 'شركة التمويل الأولى', 2, '2025-01-01', '2025-04-01', 'active'),
(2, 'شركة الاستثمار الذكي', 3, '2025-01-01', '2026-01-01', 'active');

-- عملاء تجريبيين
INSERT OR IGNORE INTO customers (id, full_name, phone, email, national_id, employer_name, job_title, monthly_salary) VALUES
(1, 'محمد أحمد السعيد', '0512345678', 'mohammed@email.com', '1043104387', 'شركة أرامكو السعودية', 'محاسب', 15000),
(2, 'فاطمة علي السعيد', '0523456789', 'fatima@email.com', '1054205498', 'شركة سابك', 'مهندسة', 18000),
(3, 'أحمد خالد المطيري', '0534567890', 'ahmed@email.com', '1065306509', 'البنك الأهلي', 'مدير', 25000);

-- طلبات تمويل تجريبية
INSERT OR IGNORE INTO financing_requests (customer_id, financing_type_id, requested_amount, duration_months, salary_at_request, selected_bank_id, status) VALUES
(1, 1, 50000, 36, 15000, 1, 'pending'),
(2, 2, 80000, 48, 18000, 2, 'approved'),
(3, 3, 200000, 120, 25000, 3, 'pending');

-- حسابات تجريبية
INSERT OR IGNORE INTO calculations (user_id, subscription_id, financing_type_id, bank_id, amount, duration_months, salary, rate, monthly_payment, total_payment, total_interest) VALUES
(1, 1, 1, 1, 100000, 60, 10000, 4.5, 1869.37, 112162.2, 12162.2),
(1, 1, 2, 2, 80000, 48, 8000, 3.5, 1789.13, 85878.24, 5878.24),
(1, 1, 1, 3, 150000, 60, 15000, 4.8, 2827.98, 169678.8, 19678.8);

-- إنشاء indexes للأداء
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_national_id ON customers(national_id);
CREATE INDEX IF NOT EXISTS idx_financing_requests_customer ON financing_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_financing_requests_status ON financing_requests(status);
CREATE INDEX IF NOT EXISTS idx_calculations_user ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_subscription ON calculations(subscription_id);
