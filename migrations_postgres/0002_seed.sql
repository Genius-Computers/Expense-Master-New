-- Seed data for Postgres (Neon)
-- Safe to re-run: uses ON CONFLICT DO NOTHING

-- Roles (system) - UUIDs will be generated automatically
INSERT INTO roles (role_name, role_name_ar, description, is_system_role)
VALUES
  ('super_admin', 'سوبر أدمن', 'صلاحيات كاملة للنظام + إدارة SaaS', TRUE),
  ('company_admin', 'مدير شركة', 'إدارة كاملة للشركة (عدا SaaS)', TRUE),
  ('supervisor', 'مشرف', 'عرض جميع بيانات الشركة (قراءة فقط)', TRUE),
  ('employee', 'موظف', 'إدارة العملاء والطلبات المخصصة فقط', TRUE)
ON CONFLICT (role_name) DO NOTHING;

-- Minimal permissions set (extend as needed)
INSERT INTO permissions (permission_key, permission_name, permission_name_ar, category)
VALUES
  ('dashboard.view', 'View Dashboard', 'عرض لوحة المعلومات', 'dashboard'),
  ('dashboard.stats', 'View Statistics', 'عرض الإحصائيات', 'dashboard'),
  ('customers.view', 'View Customers', 'عرض العملاء', 'customers'),
  ('customers.create', 'Add Customer', 'إضافة عميل', 'customers'),
  ('customers.edit', 'Edit Customer', 'تعديل عميل', 'customers'),
  ('customers.delete', 'Delete Customer', 'حذف عميل', 'customers'),
  ('requests.view', 'View Requests', 'عرض الطلبات', 'requests'),
  ('requests.create', 'Add Request', 'إضافة طلب', 'requests'),
  ('requests.edit', 'Edit Request', 'تعديل طلب', 'requests'),
  ('requests.delete', 'Delete Request', 'حذف طلب', 'requests'),
  ('banks.view', 'View Banks', 'عرض البنوك', 'banks'),
  ('banks.create', 'Add Bank', 'إضافة بنك', 'banks'),
  ('banks.edit', 'Edit Bank', 'تعديل بنك', 'banks'),
  ('banks.delete', 'Delete Bank', 'حذف بنك', 'banks'),
  ('rates.view', 'View Rates', 'عرض النسب', 'rates'),
  ('rates.create', 'Add Rate', 'إضافة نسبة', 'rates'),
  ('rates.edit', 'Edit Rate', 'تعديل نسبة', 'rates'),
  ('rates.delete', 'Delete Rate', 'حذف نسبة', 'rates'),
  ('users.view', 'View Users', 'عرض المستخدمين', 'users'),
  ('users.create', 'Add User', 'إضافة مستخدم', 'users'),
  ('users.edit', 'Edit User', 'تعديل مستخدم', 'users'),
  ('users.delete', 'Delete User', 'حذف مستخدم', 'users'),
  ('calculator.use', 'Use Calculator', 'استخدام الحاسبة', 'calculator'),
  ('calculator.export', 'Export Calculator', 'تصدير نتائج الحاسبة', 'calculator'),
  ('reports.view', 'View Reports', 'عرض التقارير', 'reports'),
  ('reports.export', 'Export Reports', 'تصدير التقارير', 'reports'),
  ('saas.tenants', 'Manage Tenants', 'إدارة الشركات', 'saas'),
  ('saas.subscriptions', 'Manage Subscriptions', 'إدارة الاشتراكات', 'saas'),
  ('saas.packages', 'Manage Packages', 'إدارة الباقات', 'saas'),
  ('saas.settings', 'SaaS Settings', 'إعدادات SaaS', 'saas')
ON CONFLICT (permission_key) DO NOTHING;

-- Assign permissions to roles (using role names instead of IDs)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.role_name = 'super_admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.role_name = 'company_admin' AND p.category <> 'saas'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Supervisor: read-oriented set
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.role_name = 'supervisor' AND p.permission_key IN (
  'dashboard.view','dashboard.stats',
  'customers.view',
  'requests.view','requests.edit','requests.approve','requests.reject',
  'banks.view','rates.view',
  'reports.view','reports.export',
  'calculator.use'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Employee: basic set
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.role_name = 'employee' AND p.permission_key IN (
  'dashboard.view',
  'customers.view','customers.create','customers.edit','customers.delete',
  'requests.view','requests.create','requests.edit','requests.delete',
  'banks.view','rates.view',
  'calculator.use','calculator.export',
  'reports.view'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Packages (UUIDs will be generated automatically)
INSERT INTO packages (package_name, description, price, duration_months, max_calculations, max_users)
VALUES
  ('الباقة الأساسية', 'مناسبة للشركات الصغيرة', 299, 1, 100, 3),
  ('الباقة المتقدمة', 'مناسبة للشركات المتوسطة', 799, 3, 500, 10),
  ('الباقة الاحترافية', 'مناسبة للشركات الكبيرة', 1999, 12, -1, 50)
ON CONFLICT (package_name) DO NOTHING;

-- Subscriptions (using package names to reference)
INSERT INTO subscriptions (company_name, package_id, start_date, end_date, status)
SELECT 'شركة التمويل الأولى', p.id, DATE '2025-01-01', DATE '2025-04-01', 'active'
FROM packages p WHERE p.package_name = 'الباقة المتقدمة'
ON CONFLICT DO NOTHING;

INSERT INTO subscriptions (company_name, package_id, start_date, end_date, status)
SELECT 'شركة الاستثمار الذكي', p.id, DATE '2025-01-01', DATE '2026-01-01', 'active'
FROM packages p WHERE p.package_name = 'الباقة الاحترافية'
ON CONFLICT DO NOTHING;

-- Tenants (using subscription company names to reference)
INSERT INTO tenants (
  company_name, slug, subdomain,
  primary_color, secondary_color,
  subscription_id, status,
  max_users, max_customers, max_requests,
  contact_email, contact_phone
)
SELECT 'شركة التمويل الأولى', 'tamweel-1', 'tamweel1', '#667eea', '#764ba2', s.id, 'active', 10, 500, 2000, 'info@tamweel1.com', '0501234567'
FROM subscriptions s WHERE s.company_name = 'شركة التمويل الأولى'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tenants (
  company_name, slug, subdomain,
  primary_color, secondary_color,
  subscription_id, status,
  max_users, max_customers, max_requests,
  contact_email, contact_phone
)
SELECT 'شركة الاستثمار الذكي', 'smart-invest', 'smartinvest', '#10b981', '#059669', s.id, 'active', 50, 999999, 999999, 'info@smartinvest.com', '0501234568'
FROM subscriptions s WHERE s.company_name = 'شركة الاستثمار الذكي'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tenants (
  company_name, slug, subdomain,
  primary_color, secondary_color,
  subscription_id, status,
  max_users, max_customers, max_requests,
  contact_email, contact_phone
)
VALUES
  ('شركة التمويل السريع', 'fast-finance', 'fastfinance', '#f59e0b', '#d97706', NULL, 'trial', 3, 50, 200, 'info@fastfinance.com', '0501234569')
ON CONFLICT (slug) DO NOTHING;

-- Banks (global) - UUIDs will be generated automatically
INSERT INTO banks (bank_name, bank_code, tenant_id)
VALUES
  ('مصرف الراجحي', 'RAJ', NULL),
  ('البنك الأهلي السعودي', 'NCB', NULL),
  ('بنك الرياض', 'RYD', NULL),
  ('البنك السعودي للاستثمار', 'SIB', NULL),
  ('بنك ساب', 'SAB', NULL)
ON CONFLICT (bank_name) DO NOTHING;

-- Financing types (global) - UUIDs will be generated automatically
INSERT INTO financing_types (type_name, description, tenant_id)
VALUES
  ('التمويل الشخصي', 'تمويل شخصي للأفراد', NULL),
  ('تمويل السيارات', 'تمويل لشراء السيارات', NULL),
  ('تمويل العقار', 'تمويل لشراء أو بناء العقارات', NULL)
ON CONFLICT (type_name) DO NOTHING;

-- Sample rates (using tenant slug to reference)
INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 4.5, 10000, 500000, 3000, 50000, 12, 60, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'مصرف الراجحي' AND ft.type_name = 'التمويل الشخصي' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 3.8, 20000, 300000, 4000, 50000, 12, 60, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'مصرف الراجحي' AND ft.type_name = 'تمويل السيارات' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 3.2, 50000, 2000000, 8000, 100000, 60, 300, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'مصرف الراجحي' AND ft.type_name = 'تمويل العقار' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 4.2, 10000, 500000, 3000, 50000, 12, 60, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'البنك الأهلي السعودي' AND ft.type_name = 'التمويل الشخصي' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 3.5, 20000, 300000, 4000, 50000, 12, 60, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'البنك الأهلي السعودي' AND ft.type_name = 'تمويل السيارات' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 3.0, 50000, 2000000, 8000, 100000, 60, 300, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'البنك الأهلي السعودي' AND ft.type_name = 'تمويل العقار' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 4.8, 10000, 500000, 3000, 50000, 12, 60, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'بنك الرياض' AND ft.type_name = 'التمويل الشخصي' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 4.0, 20000, 300000, 4000, 50000, 12, 60, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'بنك الرياض' AND ft.type_name = 'تمويل السيارات' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

INSERT INTO bank_financing_rates (bank_id, financing_type_id, rate, min_amount, max_amount, min_salary, max_salary, min_duration, max_duration, tenant_id)
SELECT b.id, ft.id, 3.5, 50000, 2000000, 8000, 100000, 60, 300, t.id
FROM banks b, financing_types ft, tenants t
WHERE b.bank_name = 'بنك الرياض' AND ft.type_name = 'تمويل العقار' AND t.slug = 'tamweel-1'
ON CONFLICT DO NOTHING;

-- Workflow stages
INSERT INTO workflow_stages (stage_name, stage_name_ar, stage_order, stage_color, stage_icon, description)
VALUES
  ('received', 'استقبال الطلب', 1, '#10B981', 'fa-inbox', 'تم استلام الطلب من العميل'),
  ('initial_review', 'المراجعة الأولية', 2, '#3B82F6', 'fa-search', 'مراجعة البيانات الأولية للطلب'),
  ('bank_communication', 'التواصل مع البنك', 3, '#F59E0B', 'fa-building-columns', 'التواصل مع البنك لمعالجة الطلب'),
  ('decision', 'قرار الموافقة/الرفض', 4, '#8B5CF6', 'fa-gavel', 'البنك اتخذ قرار بالموافقة أو الرفض'),
  ('signature', 'التوقيع', 5, '#06B6D4', 'fa-file-signature', 'توقيع العقد من العميل')
ON CONFLICT (stage_name) DO NOTHING;

-- Test users (using role names and tenant slug to reference)
INSERT INTO users (username, password, full_name, email, phone, role_id, user_type, tenant_id, is_active, created_at)
SELECT 'superadmin', 'Super@2025', 'المدير العام للنظام', 'super@tamweel.sa', '0500000001', r.id, 'admin', NULL, 1, NOW()
FROM roles r WHERE r.role_name = 'super_admin'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password, full_name, email, phone, role_id, user_type, tenant_id, is_active, created_at)
SELECT 'companyadmin', 'Company@2025', 'مدير شركة التمويل الأولى', 'company@tamweel.sa', '0500000002', r.id, 'company', t.id, 1, NOW()
FROM roles r, tenants t WHERE r.role_name = 'company_admin' AND t.slug = 'tamweel-1'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password, full_name, email, phone, role_id, user_type, tenant_id, is_active, created_at)
SELECT 'supervisor', 'Supervisor@2025', 'مشرف موظفين الشركة', 'supervisor@tamweel.sa', '0500000003', r.id, 'company', t.id, 1, NOW()
FROM roles r, tenants t WHERE r.role_name = 'supervisor' AND t.slug = 'tamweel-1'
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password, full_name, email, phone, role_id, user_type, tenant_id, is_active, created_at)
SELECT 'employee', 'Employee@2025', 'موظف الشركة الأولى', 'employee@tamweel.sa', '0500000004', r.id, 'employee', t.id, 1, NOW()
FROM roles r, tenants t WHERE r.role_name = 'employee' AND t.slug = 'tamweel-1'
ON CONFLICT (username) DO NOTHING;

-- Sample notifications (using username to reference user)
INSERT INTO notifications (user_id, tenant_id, title, message, type, category, related_request_id)
SELECT u.id, NULL, 'مرحباً في النظام', 'مرحباً بك في نظام إدارة التمويل', 'success', 'system', NULL
FROM users u WHERE u.username = 'superadmin'
ON CONFLICT DO NOTHING;

INSERT INTO notifications (user_id, tenant_id, title, message, type, category, related_request_id)
SELECT u.id, NULL, 'تحديث النظام', 'تم تحديث النظام بنجاح', 'info', 'system', NULL
FROM users u WHERE u.username = 'superadmin'
ON CONFLICT DO NOTHING;


