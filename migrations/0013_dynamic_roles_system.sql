-- Migration: Dynamic Roles & Permissions System
-- تاريخ: 2025-12-21
-- الوصف: نظام ديناميكي لإدارة الأدوار والصلاحيات

-- ═══════════════════════════════════════
-- 1. جدول الأدوار (Roles)
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL UNIQUE,
  role_name_ar TEXT NOT NULL,
  description TEXT,
  is_system_role BOOLEAN DEFAULT 0,  -- الأدوار النظامية لا يمكن حذفها
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════
-- 2. جدول الصلاحيات (Permissions)
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS permissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  permission_key TEXT NOT NULL UNIQUE,
  permission_name TEXT NOT NULL,
  permission_name_ar TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,  -- dashboard, customers, requests, etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════
-- 3. جدول ربط الأدوار بالصلاحيات
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS role_permissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE(role_id, permission_id)
);

-- ═══════════════════════════════════════
-- 4. حذف البيانات القديمة وإدراج الجديدة
-- ═══════════════════════════════════════
DELETE FROM role_permissions;
DELETE FROM permissions;
DELETE FROM roles;

INSERT INTO roles (id, role_name, role_name_ar, description, is_system_role) VALUES
(1, 'super_admin', 'سوبر أدمن', 'صلاحيات كاملة للنظام + إدارة SaaS', 1),
(2, 'company_admin', 'مدير شركة', 'إدارة كاملة للشركة (عدا SaaS)', 1),
(3, 'supervisor', 'مشرف', 'عرض جميع بيانات الشركة (قراءة فقط)', 1),
(4, 'employee', 'موظف', 'إدارة العملاء والطلبات المخصصة فقط', 1);

-- ═══════════════════════════════════════
-- 5. إدراج الصلاحيات (Permissions)
-- ═══════════════════════════════════════

-- Dashboard Permissions
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('dashboard.view', 'View Dashboard', 'عرض لوحة المعلومات', 'View main dashboard and statistics', 'dashboard'),
('dashboard.stats', 'View Statistics', 'عرض الإحصائيات', 'View detailed statistics', 'dashboard');

-- Customers Permissions
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('customers.view', 'View Customers', 'عرض العملاء', 'View customers list', 'customers'),
('customers.view_all', 'View All Company Customers', 'عرض جميع عملاء الشركة', 'View all company customers', 'customers'),
('customers.view_assigned', 'View Assigned Customers', 'عرض العملاء المخصصين', 'View only assigned customers', 'customers'),
('customers.create', 'Add Customer', 'إضافة عميل', 'Create new customer', 'customers'),
('customers.edit', 'Edit Customer', 'تعديل عميل', 'Edit customer information', 'customers'),
('customers.delete', 'Delete Customer', 'حذف عميل', 'Delete customer', 'customers'),
('customers.assign', 'Assign Customers', 'توزيع العملاء', 'Assign customers to employees', 'customers'),
('customers.export', 'Export Customers', 'تصدير العملاء', 'Export customers to Excel', 'customers');

-- Requests Permissions
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('requests.view', 'View Requests', 'عرض الطلبات', 'View financing requests', 'requests'),
('requests.view_all', 'View All Company Requests', 'عرض جميع طلبات الشركة', 'View all company requests', 'requests'),
('requests.view_assigned', 'View Assigned Requests', 'عرض الطلبات المخصصة', 'View only assigned customer requests', 'requests'),
('requests.create', 'Add Request', 'إضافة طلب', 'Create new financing request', 'requests'),
('requests.edit', 'Edit Request', 'تعديل طلب', 'Edit request information', 'requests'),
('requests.delete', 'Delete Request', 'حذف طلب', 'Delete request', 'requests'),
('requests.approve', 'Approve Requests', 'قبول الطلبات', 'Approve financing requests', 'requests'),
('requests.reject', 'Reject Requests', 'رفض الطلبات', 'Reject financing requests', 'requests'),
('requests.export', 'Export Requests', 'تصدير الطلبات', 'Export requests to Excel', 'requests');

-- Banks Permissions
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('banks.view', 'View Banks', 'عرض البنوك', 'View banks list', 'banks'),
('banks.create', 'Add Bank', 'إضافة بنك', 'Add new bank', 'banks'),
('banks.edit', 'Edit Bank', 'تعديل بنك', 'Edit bank information', 'banks'),
('banks.delete', 'Delete Bank', 'حذف بنك', 'Delete bank', 'banks');

-- Users Permissions
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('users.view', 'View Users', 'عرض المستخدمين', 'View users list', 'users'),
('users.view_all', 'View All Users', 'عرض جميع المستخدمين', 'View all system users', 'users'),
('users.view_company', 'View Company Users', 'عرض مستخدمي الشركة', 'View company users only', 'users'),
('users.create', 'Add User', 'إضافة مستخدم', 'Create new user', 'users'),
('users.edit', 'Edit User', 'تعديل مستخدم', 'Edit user information', 'users'),
('users.delete', 'Delete User', 'حذف مستخدم', 'Delete user', 'users'),
('users.manage_permissions', 'Manage Permissions', 'إدارة الصلاحيات', 'Manage user permissions', 'users');

-- Roles Permissions (إدارة الأدوار)
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('roles.view', 'View Roles', 'عرض الأدوار', 'View roles list', 'roles'),
('roles.create', 'Add Role', 'إضافة دور', 'Create new role', 'roles'),
('roles.edit', 'Edit Role', 'تعديل دور', 'Edit role information', 'roles'),
('roles.delete', 'Delete Role', 'حذف دور', 'Delete role', 'roles'),
('roles.manage_permissions', 'Manage Role Permissions', 'إدارة صلاحيات الأدوار', 'Assign permissions to roles', 'roles');

-- Reports & Calculator Permissions
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('reports.view', 'View Reports', 'عرض التقارير', 'View reports', 'reports'),
('reports.export', 'Export Reports', 'تصدير التقارير', 'Export reports', 'reports'),
('calculator.use', 'Use Calculator', 'استخدام الحاسبة', 'Use financing calculator', 'calculator'),
('calculator.export', 'Export Calculator', 'تصدير نتائج الحاسبة', 'Export calculator results', 'calculator');

-- SaaS Management Permissions (Super Admin only)
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, description, category) VALUES
('saas.tenants', 'Manage Tenants', 'إدارة الشركات', 'Manage tenant companies', 'saas'),
('saas.subscriptions', 'Manage Subscriptions', 'إدارة الاشتراكات', 'Manage subscriptions', 'saas'),
('saas.packages', 'Manage Packages', 'إدارة الباقات', 'Manage subscription packages', 'saas'),
('saas.settings', 'SaaS Settings', 'إعدادات SaaS', 'Manage SaaS settings', 'saas');

-- ═══════════════════════════════════════
-- 6. تعيين الصلاحيات للأدوار
-- ═══════════════════════════════════════

-- Super Admin (Role 1) - جميع الصلاحيات
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

-- Company Admin (Role 2) - كل شيء عدا SaaS
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions WHERE category != 'saas';

-- Supervisor (Role 3) - قراءة فقط
INSERT INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions WHERE permission_key IN (
  'dashboard.view', 'dashboard.stats',
  'customers.view', 'customers.view_all', 'customers.export',
  'requests.view', 'requests.view_all', 'requests.export',
  'banks.view',
  'reports.view', 'reports.export',
  'calculator.use'
);

-- Employee (Role 4) - العملاء والطلبات المخصصة فقط
INSERT INTO role_permissions (role_id, permission_id)
SELECT 4, id FROM permissions WHERE permission_key IN (
  'dashboard.view',
  'customers.view', 'customers.view_assigned', 'customers.create', 'customers.edit', 'customers.delete',
  'requests.view', 'requests.view_assigned', 'requests.create', 'requests.edit', 'requests.delete',
  'calculator.use', 'calculator.export'
);

-- ═══════════════════════════════════════
-- 7. Indexes لتحسين الأداء
-- ═══════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_permissions_category ON permissions(category);
CREATE INDEX IF NOT EXISTS idx_permissions_key ON permissions(permission_key);
