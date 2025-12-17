-- Migration 0005: Add Multi-Tenant Support
-- تحويل النظام إلى SaaS Multi-Tenant
-- كل شركة لها بيانات منفصلة تماماً

-- ===================================
-- 1. إنشاء جدول الشركات (Tenants)
-- ===================================

CREATE TABLE IF NOT EXISTS tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL UNIQUE,        -- اسم الشركة (فريد)
  slug TEXT NOT NULL UNIQUE,                -- للـ URL: /c/company-1
  subdomain TEXT UNIQUE,                    -- للـ Subdomain: company1.tamweel.app
  logo_url TEXT,                            -- رابط شعار الشركة
  primary_color TEXT DEFAULT '#667eea',     -- اللون الأساسي
  secondary_color TEXT DEFAULT '#764ba2',   -- اللون الثانوي
  
  -- ربط مع الاشتراك
  subscription_id INTEGER,
  
  -- الحالة والحدود
  status TEXT DEFAULT 'active',             -- active, suspended, cancelled, trial
  max_users INTEGER DEFAULT 5,              -- الحد الأقصى للمستخدمين
  max_customers INTEGER DEFAULT 100,        -- الحد الأقصى للعملاء
  max_requests INTEGER DEFAULT 1000,        -- الحد الأقصى لطلبات التمويل
  
  -- الميزات
  features_json TEXT,                       -- ميزات مفعلة (JSON): {"attachments":true,"reports":false}
  settings_json TEXT,                       -- إعدادات إضافية (JSON)
  
  -- التواريخ
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  trial_ends_at DATETIME,                   -- تاريخ انتهاء التجربة المجانية
  subscription_ends_at DATETIME,            -- تاريخ انتهاء الاشتراك
  
  -- معلومات الاتصال
  contact_email TEXT,
  contact_phone TEXT,
  
  -- إحصائيات
  total_users INTEGER DEFAULT 0,
  total_customers INTEGER DEFAULT 0,
  total_requests INTEGER DEFAULT 0,
  
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

-- ===================================
-- 2. إضافة tenant_id لجميع الجداول
-- ===================================

-- جدول المستخدمين
ALTER TABLE users ADD COLUMN tenant_id INTEGER;

-- جدول العملاء
ALTER TABLE customers ADD COLUMN tenant_id INTEGER;

-- جدول طلبات التمويل
ALTER TABLE financing_requests ADD COLUMN tenant_id INTEGER;

-- جدول البنوك (مشتركة بين جميع الشركات - اختياري)
-- ALTER TABLE banks ADD COLUMN tenant_id INTEGER;

-- جدول نسب التمويل
ALTER TABLE bank_financing_rates ADD COLUMN tenant_id INTEGER;

-- جدول الاشتراكات
ALTER TABLE subscriptions ADD COLUMN tenant_id INTEGER;

-- جدول الإشعارات
ALTER TABLE notifications ADD COLUMN tenant_id INTEGER;

-- جدول طلبات الاشتراك الجديدة
ALTER TABLE subscription_requests ADD COLUMN tenant_id INTEGER;

-- ===================================
-- 3. إنشاء Indexes للأداء
-- ===================================

CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_customers_tenant ON customers(tenant_id);
CREATE INDEX IF NOT EXISTS idx_requests_tenant ON financing_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rates_tenant ON bank_financing_rates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_notifications_tenant ON notifications(tenant_id);

-- Indexes للبحث السريع عن الشركات
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);

-- ===================================
-- 4. إدراج بيانات تجريبية (Demo Data)
-- ===================================

-- إدراج 3 شركات تجريبية
INSERT INTO tenants (
  company_name, slug, subdomain, 
  logo_url, primary_color, secondary_color,
  subscription_id, status, 
  max_users, max_customers, max_requests,
  contact_email, contact_phone
) VALUES 
(
  'شركة التمويل الأولى',
  'tamweel-1',
  'tamweel1',
  NULL,
  '#667eea',
  '#764ba2',
  1,
  'active',
  10,
  500,
  2000,
  'info@tamweel1.com',
  '0501234567'
),
(
  'شركة الاستثمار الذكي',
  'smart-invest',
  'smartinvest',
  NULL,
  '#10b981',
  '#059669',
  2,
  'active',
  50,
  999999,
  999999,
  'info@smartinvest.com',
  '0501234568'
),
(
  'شركة التمويل السريع',
  'fast-finance',
  'fastfinance',
  NULL,
  '#f59e0b',
  '#d97706',
  NULL,
  'trial',
  3,
  50,
  200,
  'info@fastfinance.com',
  '0501234569'
);

-- ===================================
-- 5. تحديث البيانات الموجودة
-- ===================================

-- ربط المستخدمين الحاليين بالشركة الأولى
UPDATE users SET tenant_id = 1 WHERE tenant_id IS NULL;

-- ربط العملاء الحاليين بالشركة الأولى
UPDATE customers SET tenant_id = 1 WHERE tenant_id IS NULL;

-- ربط طلبات التمويل الحالية بالشركة الأولى
UPDATE financing_requests SET tenant_id = 1 WHERE tenant_id IS NULL;

-- ربط نسب التمويل الحالية بالشركة الأولى
UPDATE bank_financing_rates SET tenant_id = 1 WHERE tenant_id IS NULL;

-- ربط الاشتراكات الحالية بالشركة الأولى
UPDATE subscriptions SET tenant_id = 1 WHERE tenant_id IS NULL;

-- ربط الإشعارات الحالية بالشركة الأولى
UPDATE notifications SET tenant_id = 1 WHERE tenant_id IS NULL;

-- ===================================
-- 6. تحديث إحصائيات الشركات
-- ===================================

UPDATE tenants SET 
  total_users = (SELECT COUNT(*) FROM users WHERE tenant_id = tenants.id),
  total_customers = (SELECT COUNT(*) FROM customers WHERE tenant_id = tenants.id),
  total_requests = (SELECT COUNT(*) FROM financing_requests WHERE tenant_id = tenants.id)
WHERE id IN (1, 2, 3);

-- ===================================
-- 7. إضافة مستخدم Super Admin
-- ===================================

-- Super Admin (tenant_id = NULL) لإدارة جميع الشركات
INSERT OR IGNORE INTO users (
  username, password, full_name, email, phone,
  user_type, role_id, tenant_id, is_active
) VALUES (
  'superadmin',
  'SuperAdmin@2025',
  'المدير العام للنظام',
  'superadmin@tamweel.sa',
  '0500000000',
  'superadmin',
  1,
  NULL,
  1
);

-- إضافة مدير لكل شركة
INSERT OR IGNORE INTO users (
  username, password, full_name, email, phone,
  user_type, role_id, tenant_id, is_active
) VALUES 
(
  'admin1',
  'Admin1@2025',
  'مدير شركة التمويل الأولى',
  'admin@tamweel1.com',
  '0501234567',
  'admin',
  1,
  1,
  1
),
(
  'admin2',
  'Admin2@2025',
  'مدير شركة الاستثمار الذكي',
  'admin@smartinvest.com',
  '0501234568',
  'admin',
  1,
  2,
  1
),
(
  'admin3',
  'Admin3@2025',
  'مدير شركة التمويل السريع',
  'admin@fastfinance.com',
  '0501234569',
  'admin',
  1,
  3,
  1
);
