-- إنشاء جدول الصلاحيات (Permissions)
CREATE TABLE IF NOT EXISTS permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    permission_key TEXT UNIQUE NOT NULL,
    permission_name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- إنشاء جدول ربط الأدوار بالصلاحيات (Role_Permissions)
CREATE TABLE IF NOT EXISTS role_permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE(role_id, permission_id)
);

-- إدراج الصلاحيات الأساسية

-- صلاحيات لوحة التحكم (Dashboard)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('dashboard.view', 'عرض لوحة التحكم', 'الوصول إلى لوحة التحكم وعرض الإحصائيات', 'dashboard'),
('dashboard.stats', 'عرض الإحصائيات', 'عرض إحصائيات النظام الكاملة', 'dashboard');

-- صلاحيات العملاء (Customers)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('customers.view', 'عرض العملاء', 'عرض قائمة العملاء', 'customers'),
('customers.create', 'إضافة عميل', 'إضافة عملاء جدد', 'customers'),
('customers.edit', 'تعديل عميل', 'تعديل بيانات العملاء', 'customers'),
('customers.delete', 'حذف عميل', 'حذف العملاء من النظام', 'customers');

-- صلاحيات طلبات التمويل (Financing Requests)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('requests.view', 'عرض طلبات التمويل', 'عرض قائمة طلبات التمويل', 'requests'),
('requests.create', 'إضافة طلب تمويل', 'إضافة طلبات تمويل جديدة', 'requests'),
('requests.edit', 'تعديل طلب تمويل', 'تعديل حالة وبيانات الطلبات', 'requests'),
('requests.delete', 'حذف طلب تمويل', 'حذف طلبات التمويل', 'requests'),
('requests.approve', 'قبول طلبات التمويل', 'الموافقة على طلبات التمويل', 'requests'),
('requests.reject', 'رفض طلبات التمويل', 'رفض طلبات التمويل', 'requests');

-- صلاحيات البنوك (Banks)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('banks.view', 'عرض البنوك', 'عرض قائمة البنوك', 'banks'),
('banks.create', 'إضافة بنك', 'إضافة بنوك جديدة', 'banks'),
('banks.edit', 'تعديل بنك', 'تعديل بيانات البنوك', 'banks'),
('banks.delete', 'حذف بنك', 'حذف البنوك من النظام', 'banks');

-- صلاحيات النسب التمويلية (Rates)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('rates.view', 'عرض النسب', 'عرض نسب التمويل', 'rates'),
('rates.create', 'إضافة نسبة', 'إضافة نسب تمويل جديدة', 'rates'),
('rates.edit', 'تعديل نسبة', 'تعديل النسب التمويلية', 'rates'),
('rates.delete', 'حذف نسبة', 'حذف النسب التمويلية', 'rates');

-- صلاحيات الباقات (Packages)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('packages.view', 'عرض الباقات', 'عرض قائمة الباقات', 'packages'),
('packages.create', 'إضافة باقة', 'إضافة باقات جديدة', 'packages'),
('packages.edit', 'تعديل باقة', 'تعديل بيانات الباقات', 'packages'),
('packages.delete', 'حذف باقة', 'حذف الباقات من النظام', 'packages');

-- صلاحيات الاشتراكات (Subscriptions)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('subscriptions.view', 'عرض الاشتراكات', 'عرض قائمة الاشتراكات', 'subscriptions'),
('subscriptions.create', 'إضافة اشتراك', 'إضافة اشتراكات جديدة', 'subscriptions'),
('subscriptions.edit', 'تعديل اشتراك', 'تعديل بيانات الاشتراكات', 'subscriptions'),
('subscriptions.delete', 'حذف اشتراك', 'حذف الاشتراكات', 'subscriptions'),
('subscriptions.approve', 'قبول طلبات الاشتراك', 'الموافقة على طلبات الاشتراك', 'subscriptions'),
('subscriptions.reject', 'رفض طلبات الاشتراك', 'رفض طلبات الاشتراك', 'subscriptions');

-- صلاحيات المستخدمين (Users)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('users.view', 'عرض المستخدمين', 'عرض قائمة المستخدمين', 'users'),
('users.create', 'إضافة مستخدم', 'إضافة مستخدمين جدد', 'users'),
('users.edit', 'تعديل مستخدم', 'تعديل بيانات المستخدمين', 'users'),
('users.delete', 'حذف مستخدم', 'حذف المستخدمين', 'users'),
('users.permissions', 'إدارة صلاحيات المستخدمين', 'تعديل صلاحيات المستخدمين', 'users');

-- صلاحيات الحاسبة (Calculator)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('calculator.use', 'استخدام الحاسبة', 'استخدام حاسبة التمويل', 'calculator'),
('calculator.export', 'تصدير النتائج', 'تصدير نتائج الحاسبة', 'calculator');

-- صلاحيات التقارير (Reports)
INSERT OR IGNORE INTO permissions (permission_key, permission_name, description, category) VALUES
('reports.view', 'عرض التقارير', 'عرض جميع التقارير', 'reports'),
('reports.export', 'تصدير التقارير', 'تصدير التقارير إلى Excel', 'reports');

-- منح صلاحيات كاملة للمسؤول (Admin - Role ID: 1)
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

-- منح صلاحيات محدودة للشركات (Company - Role ID: 2)
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions WHERE permission_key IN (
    'dashboard.view',
    'customers.view', 'customers.create', 'customers.edit',
    'requests.view', 'requests.create', 'requests.edit',
    'banks.view',
    'rates.view',
    'packages.view',
    'subscriptions.view',
    'calculator.use', 'calculator.export'
);

-- منح صلاحيات أساسية للمستخدمين العاديين (User - Role ID: 3)
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions WHERE permission_key IN (
    'dashboard.view',
    'calculator.use',
    'requests.view'
);

-- إضافة فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_permissions_category ON permissions(category);
CREATE INDEX IF NOT EXISTS idx_permissions_key ON permissions(permission_key);
