-- إصلاح صلاحيات مدير الشركة (Company Admin)
-- تاريخ الإنشاء: 2025-12-21

-- 1. إضافة دور جديد: مدير الشركة (Company Admin) - Role ID 4
INSERT OR IGNORE INTO roles (id, role_name, description) VALUES
(4, 'مدير شركة', 'مدير الشركة مع صلاحيات كاملة لإدارة الشركة والموظفين');

-- 2. منح صلاحيات كاملة لمدير الشركة (Company Admin - Role ID: 4)
-- نفس صلاحيات الـ Admin ولكن مقيدة بالـ tenant_id الخاص بالشركة
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 4, id FROM permissions WHERE permission_key IN (
    -- صلاحيات لوحة التحكم
    'dashboard.view',
    'dashboard.stats',
    
    -- صلاحيات العملاء (كاملة)
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.delete',
    
    -- صلاحيات طلبات التمويل (كاملة)
    'requests.view',
    'requests.create',
    'requests.edit',
    'requests.delete',
    'requests.approve',
    'requests.reject',
    
    -- صلاحيات البنوك (قراءة فقط)
    'banks.view',
    
    -- صلاحيات النسب (قراءة فقط)
    'rates.view',
    
    -- صلاحيات الباقات (قراءة فقط)
    'packages.view',
    
    -- صلاحيات الاشتراكات (قراءة فقط)
    'subscriptions.view',
    
    -- صلاحيات المستخدمين (كاملة لمستخدمي الشركة)
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'users.permissions',
    
    -- صلاحيات الحاسبة
    'calculator.use',
    'calculator.export',
    
    -- صلاحيات التقارير
    'reports.view',
    'reports.export'
);

-- 3. تحديث الأدوار الحالية
-- تحديث وصف Role 2 (Company) ليكون للشركة فقط
UPDATE roles SET 
    role_name = 'حساب شركة',
    description = 'حساب شركة عادي بصلاحيات محدودة'
WHERE id = 2;

-- تحديث Role 3 (User/Employee)
UPDATE roles SET 
    role_name = 'موظف',
    description = 'موظف في الشركة بصلاحيات محدودة'
WHERE id = 3;

-- 4. إضافة صلاحيات إضافية للموظفين
-- الموظفون يمكنهم عرض البنوك والنسب والتقارير
INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions WHERE permission_key IN (
    'banks.view',
    'rates.view',
    'reports.view'
);
