-- 🧹 تنظيف قاعدة البيانات - بطريقة آمنة مع Foreign Keys
-- تاريخ: 2025-12-16

-- تعطيل فحص Foreign Keys مؤقتاً
PRAGMA foreign_keys = OFF;

-- 1. حذف الحسابات (Calculations)
DELETE FROM calculations;

-- 2. حذف المرفقات (Attachments)
DELETE FROM attachments;

-- 3. حذف طلبات التمويل (Financing Requests)
DELETE FROM financing_requests;

-- 4. حذف العملاء (Customers)
DELETE FROM customers;

-- 5. حذف الإشعارات (Notifications)
DELETE FROM notifications;

-- 6. حذف إشعارات تغيير كلمة المرور
DELETE FROM password_change_notifications;

-- 7. حذف الاشتراكات (Subscriptions)
DELETE FROM subscriptions;

-- 8. حذف طلبات الاشتراك (Subscription Requests)
DELETE FROM subscription_requests;

-- 9. حذف الشركات (Tenants) - ماعدا الافتراضية إن وجدت
DELETE FROM tenants;

-- 10. حذف المستخدمين - الاحتفاظ بـ SuperAdmin فقط
DELETE FROM users WHERE username != 'superadmin';

-- 11. إعادة تعيين AUTO_INCREMENT للجداول
DELETE FROM sqlite_sequence WHERE name IN (
  'calculations',
  'customers', 
  'financing_requests',
  'attachments',
  'notifications',
  'subscription_requests',
  'subscriptions',
  'tenants',
  'password_change_notifications'
);

-- 12. تحديث seq للمستخدمين (الاحتفاظ بـ SuperAdmin في id=2)
DELETE FROM sqlite_sequence WHERE name = 'users';
INSERT INTO sqlite_sequence (name, seq) VALUES ('users', 2);

-- إعادة تفعيل Foreign Keys
PRAGMA foreign_keys = ON;
