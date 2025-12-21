-- Quick Database Setup for Cloudflare D1
-- Run this after creating your D1 database

-- ========================================
-- 1. CORE TABLES
-- ========================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role_id INTEGER DEFAULT 2,
  user_type TEXT DEFAULT 'company',
  subscription_id INTEGER,
  is_active INTEGER DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  tenant_id INTEGER,
  role TEXT DEFAULT 'employee'
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY,
  role_name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Tenants (Companies) Table
CREATE TABLE IF NOT EXISTS tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  slug TEXT UNIQUE,
  subdomain TEXT UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#667eea',
  secondary_color TEXT DEFAULT '#764ba2',
  subscription_id INTEGER,
  status TEXT DEFAULT 'active',
  max_users INTEGER DEFAULT 10,
  max_customers INTEGER DEFAULT 1000,
  max_requests INTEGER DEFAULT 5000,
  features_json TEXT,
  settings_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  trial_ends_at DATETIME,
  subscription_ends_at DATETIME,
  contact_email TEXT,
  contact_phone TEXT,
  total_customers INTEGER DEFAULT 0,
  total_requests INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT,
  status TEXT DEFAULT 'active',
  plan_type TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- 2. INSERT DEFAULT ROLES
-- ========================================

INSERT OR IGNORE INTO roles (id, role_name, description) VALUES
(1, 'admin', 'مدير النظام الكامل - يرى جميع الشركات وبيانات SaaS'),
(2, 'company', 'شركة مشتركة - صلاحيات محدودة'),
(3, 'user', 'مستخدم عادي - موظف يرى العملاء المخصصين له فقط'),
(4, 'company_admin', 'مدير الشركة - يرى جميع بيانات شركته (عدا SaaS)'),
(5, 'supervisor', 'مشرف موظفين - يرى جميع عملاء وطلبات الشركة (قراءة فقط)');

-- ========================================
-- 3. INSERT TEST TENANT
-- ========================================

INSERT OR IGNORE INTO tenants (id, company_name, slug, subdomain, status, max_users, max_customers) VALUES
(1, 'شركة التمويل الأولى', 'tamweel-1', 'tamweel1', 'active', 50, 5000);

-- ========================================
-- 4. INSERT TEST USERS
-- ========================================

INSERT OR IGNORE INTO users (username, password, full_name, email, phone, role_id, user_type, tenant_id, is_active, created_at) VALUES
-- Super Admin (Full access + SaaS)
('superadmin', 'Super@2025', 'المدير العام للنظام', 'super@tamweel.sa', '0500000001', 1, 'admin', NULL, 1, datetime('now')),

-- Company Admin (Company management, no SaaS)
('companyadmin', 'Company@2025', 'مدير شركة التمويل الأولى', 'company@tamweel.sa', '0500000002', 4, 'company', 1, 1, datetime('now')),

-- Supervisor (Read-only company data)
('supervisor', 'Supervisor@2025', 'مشرف موظفين الشركة', 'supervisor@tamweel.sa', '0500000003', 5, 'company', 1, 1, datetime('now')),

-- Employee (Assigned customers only)
('employee', 'Employee@2025', 'موظف الشركة الأولى', 'employee@tamweel.sa', '0500000004', 3, 'employee', 1, 1, datetime('now'));

-- ========================================
-- 5. VERIFICATION QUERIES
-- ========================================

-- Check roles
SELECT 'Roles:' as info;
SELECT id, role_name, description FROM roles ORDER BY id;

-- Check tenants
SELECT 'Tenants:' as info;
SELECT id, company_name, slug, status FROM tenants;

-- Check users
SELECT 'Users:' as info;
SELECT id, username, full_name, role_id, tenant_id FROM users ORDER BY role_id;

-- ========================================
-- NOTES:
-- ========================================
-- 
-- After running this, you should have:
-- ✅ 5 roles (admin, company, user, company_admin, supervisor)
-- ✅ 1 tenant (شركة التمويل الأولى)
-- ✅ 4 test users with passwords:
--    - superadmin / Super@2025
--    - companyadmin / Company@2025
--    - supervisor / Supervisor@2025
--    - employee / Employee@2025
--
-- To run on Cloudflare:
-- wrangler d1 execute tamweel-production --remote --file=./migrations/quick_cloudflare_setup.sql
