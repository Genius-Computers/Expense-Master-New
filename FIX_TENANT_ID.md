# 🔧 إصلاح tenant_id وإعادة بناء نظام الصلاحيات

## 🚨 المشكلة الرئيسية:

المستخدم **D123456** (مدير شركة) كان يعرض:
- ❌ أيقونات خاطئة في لوحة الوصول السريع
- ❌ بيانات من جميع الشركات بدلاً من شركته فقط
- ❌ tenant_id محفوظ كـ string "null" بدلاً من integer

---

## ✅ الإصلاحات المُطبّقة:

### 1. **تحديث قاعدة البيانات المحلية:**

```sql
-- إصلاح tenant_id للمستخدم D123456
UPDATE users SET tenant_id = 1 WHERE username = 'D123456';

-- التحقق من التحديث
SELECT id, username, full_name, role_id, tenant_id FROM users WHERE username = 'D123456';
```

**النتيجة:**
```
id: 9
username: D123456
full_name: الموعد 3
role_id: 4 (Company Admin)
tenant_id: 1 ✅ (كان "null" ❌)
```

---

### 2. **تحديث واجهة Admin Panel:**

#### **ملف:** `src/full-admin-panel.ts`

**التغييرات:**

#### أ) تغيير من `user_type` إلى `role_id`:

```typescript
// ❌ القديم:
const userRole = user.user_type === 'superadmin' ? 'superadmin' : (user.role || user.user_type);

// ✅ الجديد:
const roleId = user.role_id || 3; // Default to Employee
```

#### ب) تحديث `allowedLinks` mapping:

```typescript
// ❌ القديم - باستخدام strings:
const allowedLinks = {
    'superadmin': [...],
    'admin': [...],
    'manager': [...],
    'employee': [...],
    'company': [...],
    'user': [...]
};

// ✅ الجديد - باستخدام role_id:
const allowedLinks = {
    '1': [ // Super Admin
        '/admin/dashboard', '/admin/customers', '/admin/requests',
        '/admin/banks', '/admin/rates', '/admin/subscriptions',
        '/admin/packages', '/admin/users', '/admin/notifications',
        '/calculator', '/', '/admin/tenants',
        '/admin/tenant-calculators', '/admin/saas-settings',
        '/admin/reports', '/admin/payments'
    ],
    '4': [ // Company Admin
        '/admin/dashboard', '/admin/customers', '/admin/requests',
        '/admin/users', '/admin/reports', '/admin/banks', // Read-only
        '/admin/rates', // Read-only
        '/calculator', '/'
    ],
    '5': [ // Supervisor (Read-only)
        '/admin/dashboard', '/admin/customers', '/admin/requests',
        '/admin/reports', '/admin/banks', '/admin/rates',
        '/calculator', '/'
    ],
    '3': [ // Employee
        '/admin/dashboard', '/admin/customers', '/admin/requests',
        '/calculator', '/'
    ]
};
```

#### ج) تحديث شروط إظهار الإحصائيات:

```typescript
// ❌ القديم:
if (user.user_type === 'superadmin') {
    superadminStats.style.display = 'grid';
}

if (userRole === 'employee') {
    adminOnlyStats.style.display = 'none';
}

// ✅ الجديد:
if (roleId === 1) { // Super Admin only
    superadminStats.style.display = 'grid';
}

if (roleId === 3 || roleId === 5) { // Employee or Supervisor
    adminOnlyStats.style.display = 'none';
}
```

---

### 3. **إصلاحات منطق الفلترة (Backend):**

تم بالفعل في Commits السابقة:
- ✅ `getUserInfo()` - دالة جديدة تُرجع `{ userId, tenantId, roleId }`
- ✅ Dashboard - فلترة حسب role_id
- ✅ Customers - فلترة حسب role_id (tenant_id أو assigned_to)
- ✅ Requests - فلترة حسب role_id
- ✅ إخفاء أزرار التعديل/الحذف للمشرف (Role 5)

---

## 🧪 كيفية الاختبار:

### **1. تسجيل الدخول كـ Company Admin:**

```
URL: https://8080-iwirje2zy3fybezv7hkxu-b32ec7bb.sandbox.novita.ai/login
Username: D123456
Password: (كلمة المرور المعينة)
```

### **2. التحقق من لوحة التحكم:**

- ✅ يجب رؤية 8 أزرار فقط (وليس 13):
  - ✅ لوحة المعلومات
  - ✅ العملاء
  - ✅ طلبات التمويل
  - ✅ التقارير
  - ✅ البنوك (عرض فقط)
  - ✅ المستخدمين
  - ✅ الحاسبة
  - ✅ الصفحة الرئيسية
  
- ❌ يجب عدم رؤية:
  - ❌ الاشتراكات
  - ❌ الباقات
  - ❌ الإشعارات
  - ❌ إدارة الشركات
  - ❌ إعدادات SaaS

### **3. التحقق من الإحصائيات:**

في لوحة المعلومات:
- ✅ يجب رؤية 4 كروت رئيسية:
  - إجمالي العملاء (لشركته فقط)
  - إجمالي الطلبات (لشركته فقط)
  - قيد الانتظار
  - مقبول
  
- ❌ يجب عدم رؤية الكروت الإضافية:
  - البنوك النشطة
  - الشركات النشطة
  - الاشتراكات النشطة
  - المستخدمين النشطين
  - إجمالي الحسابات

### **4. التحقق من الفلترة:**

```bash
# في القاعدة المحلية:
SELECT COUNT(*) FROM customers WHERE tenant_id = 1;
SELECT COUNT(*) FROM financing_requests fr 
  LEFT JOIN customers c ON fr.customer_id = c.id 
  WHERE c.tenant_id = 1;
```

يجب أن يرى `D123456` نفس هذه الأرقام في Dashboard.

---

## 🚀 نشر التحديث على Hostinger:

```bash
# 1. SSH إلى السيرفر
ssh u928834852@tamweel-calc.com -p 65002

# 2. الانتقال للمجلد
cd ~/public_html

# 3. سحب آخر تحديثات
git pull origin genspark_ai_developer

# 4. تثبيت المتطلبات
npm install

# 5. 🔴 إصلاح tenant_id لجميع مستخدمي الشركات
npx wrangler d1 execute tamweel-production --remote --command="UPDATE users SET tenant_id = 1 WHERE role_id = 4 AND (tenant_id IS NULL OR tenant_id = 'null')"

# 6. التحقق من التحديث
npx wrangler d1 execute tamweel-production --remote --command="SELECT username, role_id, tenant_id FROM users WHERE role_id IN (3, 4, 5)"

# 7. بناء المشروع
npm run build

# 8. إعادة تشغيل التطبيق
pm2 restart tamweel-app
pm2 save

# 9. التحقق من Logs
pm2 logs tamweel-app --lines 30
```

---

## 📊 جدول الصلاحيات النهائي:

| **الصفحة/الزر** | **Super Admin (1)** | **Company Admin (4)** | **Supervisor (5)** | **Employee (3)** |
|------------------|---------------------|----------------------|-------------------|------------------|
| **لوحة المعلومات** | ✅ جميع الشركات | ✅ شركته فقط | ✅ شركته فقط | ✅ عملائه فقط |
| **العملاء** | ✅ | ✅ | ✅ (قراءة فقط) | ✅ (المخصصين له) |
| **طلبات التمويل** | ✅ | ✅ | ✅ (قراءة فقط) | ✅ (عملائه) |
| **البنوك** | ✅ (CRUD) | ✅ (عرض فقط) | ✅ (عرض فقط) | ❌ |
| **المستخدمين** | ✅ (الكل) | ✅ (شركته) | ❌ | ❌ |
| **الاشتراكات** | ✅ | ❌ | ❌ | ❌ |
| **الباقات** | ✅ | ❌ | ❌ | ❌ |
| **إدارة الشركات** | ✅ | ❌ | ❌ | ❌ |
| **إعدادات SaaS** | ✅ | ❌ | ❌ | ❌ |
| **التقارير** | ✅ | ✅ | ✅ | ✅ |
| **الحاسبة** | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 ملخص Git Commits:

```
✅ 0a96de8 - feat: Implement complete role-based permissions system
✅ edc9f65 - docs: Add comprehensive permissions guide
✅ bce3612 - fix: Fix admin panel permissions to use role_id (LATEST)
```

**Branch:** `genspark_ai_developer`  
**Repository:** https://github.com/basealsyed2015-source/Expense-Master

---

## 📝 ملاحظات مهمة:

1. **تسجيل الدخول مطلوب:** 
   - لاختبار الصلاحيات، يجب تسجيل الدخول أولاً
   - الصفحة `/admin/panel` تتطلب `userData` في localStorage

2. **Console Logs:**
   - الكود الآن يطبع logs تفصيلية في Console:
     - `role_id`
     - الروابط المتاحة
     - عدد الأزرار الظاهرة/المخفية

3. **قاعدة البيانات المحلية:**
   - التحديثات مطبقة على DB المحلي فقط
   - يجب تطبيق نفس التحديثات على Hostinger (الإنتاج)

4. **Migration 0012:**
   - مطلوب تشغيله على الإنتاج لإضافة Role 5 (Supervisor)
   - يضيف 14 صلاحية للمشرف

---

## 🔗 روابط الاختبار:

- **Login:** https://8080-iwirje2zy3fybezv7hkxu-b32ec7bb.sandbox.novita.ai/login
- **Admin Panel:** https://8080-iwirje2zy3fybezv7hkxu-b32ec7bb.sandbox.novita.ai/admin/panel
- **Dashboard:** https://8080-iwirje2zy3fybezv7hkxu-b32ec7bb.sandbox.novita.ai/admin/dashboard
- **Customers:** https://8080-iwirje2zy3fybezv7hkxu-b32ec7bb.sandbox.novita.ai/admin/customers
- **Requests:** https://8080-iwirje2zy3fybezv7hkxu-b32ec7bb.sandbox.novita.ai/admin/requests

---

**آخر تحديث:** 2025-12-21  
**الإصدار:** 2.1.0 - Fixed Admin Panel Permissions
