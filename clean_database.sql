-- 🧹 تنظيف قاعدة البيانات - الاحتفاظ بالبنوك والنسب والمستخدم الرئيسي فقط
-- تاريخ: 2025-12-16

-- 1. حذف الحسابات (Calculations)
DELETE FROM calculations;
SELECT 'تم حذف' || COUNT(*) || ' سجل من جدول calculations' FROM calculations;

-- 2. حذف العملاء (Customers)
DELETE FROM customers;
SELECT 'تم حذف' || COUNT(*) || ' عميل' FROM customers;

-- 3. حذف طلبات التمويل (Financing Requests)
DELETE FROM financing_requests;
SELECT 'تم حذف' || COUNT(*) || ' طلب تمويل' FROM financing_requests;

-- 4. حذف المرفقات (Attachments)
DELETE FROM attachments;
SELECT 'تم حذف' || COUNT(*) || ' مرفق' FROM attachments;

-- 5. حذف الإشعارات (Notifications)
DELETE FROM notifications;
SELECT 'تم حذف' || COUNT(*) || ' إشعار' FROM notifications;

-- 6. حذف طلبات الاشتراك (Subscription Requests)
DELETE FROM subscription_requests;
SELECT 'تم حذف' || COUNT(*) || ' طلب اشتراك' FROM subscription_requests;

-- 7. حذف الاشتراكات (Subscriptions)
DELETE FROM subscriptions;
SELECT 'تم حذف' || COUNT(*) || ' اشتراك' FROM subscriptions;

-- 8. حذف الشركات (Tenants) - ماعدا الافتراضية
DELETE FROM tenants WHERE id > 1;
SELECT 'تم حذف' || COUNT(*) || ' شركة (تم الحفاظ على الشركة الافتراضية)' FROM tenants;

-- 9. حذف المستخدمين - الاحتفاظ بـ SuperAdmin فقط
DELETE FROM users WHERE username != 'superadmin';
SELECT 'تم حذف المستخدمين. المتبقي: ' || COUNT(*) FROM users;

-- 10. حذف إشعارات تغيير كلمة المرور
DELETE FROM password_change_notifications;
SELECT 'تم حذف' || COUNT(*) || ' إشعار تغيير كلمة مرور' FROM password_change_notifications;

-- 11. إعادة تعيين AUTO_INCREMENT للجداول
-- SQLite لا يدعم ALTER TABLE AUTO_INCREMENT مباشرة
-- ولكن يمكن حذف السجلات من sqlite_sequence لإعادة تعيين العدادات

DELETE FROM sqlite_sequence WHERE name IN (
  'calculations',
  'customers', 
  'financing_requests',
  'attachments',
  'notifications',
  'subscription_requests',
  'subscriptions',
  'tenants',
  'users',
  'password_change_notifications'
);

-- 12. إدراج المستخدم الرئيسي إذا لم يكن موجوداً
INSERT OR IGNORE INTO users (id, username, password, full_name, email, role_id, user_type, is_active, tenant_id)
VALUES (2, 'superadmin', 'SuperAdmin@2025', 'المدير العام للنظام', 'superadmin@tamweel.sa', 1, 'superadmin', 1, NULL);

-- 13. التأكد من وجود sqlite_sequence للمستخدم الرئيسي
INSERT OR REPLACE INTO sqlite_sequence (name, seq) VALUES ('users', 2);

-- ✅ ملخص النتائج النهائية
SELECT '========================================' as separator;
SELECT '📊 ملخص قاعدة البيانات بعد التنظيف:' as title;
SELECT '========================================' as separator;

SELECT 'البنوك: ' || COUNT(*) as result FROM banks;
SELECT 'نسب التمويل: ' || COUNT(*) as result FROM bank_financing_rates;
SELECT 'المستخدمين: ' || COUNT(*) || ' (SuperAdmin فقط)' as result FROM users;
SELECT 'أنواع التمويل: ' || COUNT(*) as result FROM financing_types;
SELECT 'الأدوار: ' || COUNT(*) as result FROM roles;
SELECT 'الصلاحيات: ' || COUNT(*) as result FROM permissions;
SELECT 'الباقات: ' || COUNT(*) as result FROM packages;

SELECT '========================================' as separator;
SELECT '✅ تم التنظيف بنجاح!' as status;
SELECT '========================================' as separator;
