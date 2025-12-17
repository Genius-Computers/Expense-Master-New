-- 🧹 تنظيف قاعدة البيانات النهائي
-- تاريخ: 2025-12-16
-- الهدف: حذف جميع البيانات والاحتفاظ بالبنوك والنسب والمستخدم الرئيسي فقط

-- تعطيل فحص Foreign Keys مؤقتاً
PRAGMA foreign_keys = OFF;

-- 1. حذف الحسابات
DELETE FROM calculations;

-- 2. حذف التحويلات
DELETE FROM conversions;

-- 3. حذف سجلات حالة الطلبات
DELETE FROM request_status_history;

-- 4. حذف طلبات التمويل
DELETE FROM financing_requests;

-- 5. حذف العملاء
DELETE FROM customers;

-- 6. حذف الإشعارات
DELETE FROM notifications;

-- 7. حذف إشعارات تغيير كلمة المرور
DELETE FROM password_change_notifications;

-- 8. حذف طلبات الاشتراك
DELETE FROM subscription_requests;

-- 9. حذف الاشتراكات
DELETE FROM subscriptions;

-- 10. حذف الشركات
DELETE FROM tenants;

-- 11. حذف المستخدمين - الاحتفاظ بـ SuperAdmin فقط
DELETE FROM users WHERE username != 'superadmin';

-- 12. إعادة تعيين AUTO_INCREMENT للجداول
DELETE FROM sqlite_sequence WHERE name IN (
  'calculations',
  'conversions',
  'request_status_history',
  'financing_requests',
  'customers',
  'notifications',
  'password_change_notifications',
  'subscription_requests',
  'subscriptions',
  'tenants'
);

-- 13. تحديث seq للمستخدمين
UPDATE sqlite_sequence SET seq = 2 WHERE name = 'users';

-- إعادة تفعيل Foreign Keys
PRAGMA foreign_keys = ON;
