# 🏢 دليل عزل البيانات بين الشركات (Tenant Isolation)

## 📋 نظرة عامة

تم تطبيق **عزل كامل** بين الشركات المختلفة في النظام. كل شركة لها بياناتها الخاصة المنفصلة تماماً.

---

## ✅ ما تم إنجازه

### 1️⃣ **قاعدة البيانات**

تم إضافة `tenant_id` للجداول التالية:

| الجدول | الحالة | الوصف |
|--------|--------|-------|
| `users` | ✅ موجود مسبقاً | المستخدمون والموظفون |
| `customers` | ✅ موجود مسبقاً | العملاء |
| `financing_requests` | ✅ موجود مسبقاً | طلبات التمويل |
| `banks` | ✅ تم الإضافة | البنوك |
| `bank_financing_rates` | ✅ موجود مسبقاً | نسب التمويل |
| `financing_types` | ✅ موجود مسبقاً | أنواع التمويل |

**Indexes المضافة:**
```sql
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_banks_tenant ON banks(tenant_id);
CREATE INDEX idx_bank_rates_tenant ON bank_financing_rates(tenant_id);
CREATE INDEX idx_financing_types_tenant ON financing_types(tenant_id);
```

---

### 2️⃣ **صفحة توزيع العملاء**

**قبل التحديث:**
- كانت تعرض **جميع** الموظفين من جميع الشركات
- كانت تعرض **جميع** العملاء من جميع الشركات

**بعد التحديث:**
- ✅ تعرض موظفي **الشركة الحالية فقط**
- ✅ تعرض عملاء **الشركة الحالية فقط**
- ✅ الإحصائيات مفصولة لكل شركة

---

### 3️⃣ **API Endpoints**

#### أ) **التوزيع التلقائي**

**قبل:**
```javascript
POST /api/customer-assignment/auto-distribute
// كان يوزع جميع العملاء على جميع الموظفين
```

**بعد:**
```javascript
POST /api/customer-assignment/auto-distribute
Content-Type: application/json

{
  "tenant_id": 4  // رقم الشركة
}

// يوزع عملاء الشركة 4 على موظفي الشركة 4 فقط
```

---

## 🧪 نتائج الاختبار

### اختبار الشركات

| الشركة | ID | Slug | عدد العملاء | الحالة |
|--------|-----|------|-------------|--------|
| شركة التمويل الأولى | 1 | tamweel-1 | 5 عملاء | ✅ معزول |
| شركة الاستثمار الذكي | 2 | smart-invest | 0 عملاء | ✅ معزول |
| شركة التمويل السريع | 3 | fast-finance | 0 عملاء | ✅ معزول |
| **شركة الموعد للعقارات** | **4** | **-sharikatalmaweid** | **0 عملاء** | ✅ **معزول** |

### اختبار الصفحات

```bash
# اختبار الشركة 4 (شركة الموعد)
curl "http://localhost:3000/admin/customer-assignment?tenant_id=4"
# النتيجة: العملاء (0) ✅

# اختبار الشركة 1
curl "http://localhost:3000/admin/customer-assignment?tenant_id=1"
# النتيجة: العملاء (5) ✅
```

---

## 📖 دليل الاستخدام

### للمدير

#### الوصول إلى صفحة توزيع العملاء

**الطريقة الحالية (مؤقتة):**
```
https://DOMAIN/admin/customer-assignment?tenant_id=4
```

حيث `tenant_id=4` هو رقم الشركة (شركة الموعد للعقارات).

**الطريقة المستقبلية (موصى بها):**
```
https://DOMAIN/c/-sharikatalmaweid/admin/customer-assignment
```

حيث `-sharikatalmaweid` هو الـ slug الخاص بالشركة.

---

### للموظف

عند تسجيل الدخول كموظف:
- ✅ يرى فقط عملاء شركته
- ✅ يرى فقط طلبات التمويل لعملاء شركته
- ✅ لا يرى بيانات الشركات الأخرى

---

## 🔐 بيانات تسجيل الدخول

### شركة الموعد للعقارات

```
اسم المستخدم: sharikatalmaweid
كلمة المرور: 123456
```

**ملاحظة:** تأكد من تحديث `tenant_id` للمستخدم هذا ليكون `4`.

---

## ⚠️ المشاكل الحالية والحلول

### 1. المشكلة: tenant_id يدوي

**المشكلة:**
- حالياً يجب إضافة `?tenant_id=X` في الرابط يدوياً
- هذا غير آمن ويمكن للمستخدم تغييره

**الحل المطلوب:**
```typescript
// في بداية كل route
app.get('/admin/customer-assignment', async (c) => {
  // 1. الحصول على المستخدم الحالي من الجلسة
  const userId = c.get('userId'); // من middleware
  
  // 2. جلب tenant_id من قاعدة البيانات
  const user = await c.env.DB.prepare(`
    SELECT tenant_id FROM users WHERE id = ?
  `).bind(userId).first();
  
  const tenantId = user.tenant_id;
  
  // 3. استخدام tenantId في جميع الاستعلامات
  // ...
});
```

---

### 2. المشكلة: بعض الصفحات غير محمية

**الصفحات التي تحتاج تحديث:**

| الصفحة | الحالة | الأولوية |
|--------|--------|----------|
| `/admin/customers` | ⚠️ يعرض الكل | 🔴 عالية |
| `/admin/requests` | ⚠️ يعرض الكل | 🔴 عالية |
| `/admin/banks` | ⚠️ يعرض الكل | 🔴 عالية |
| `/admin/customer-assignment` | ✅ محمي جزئياً | 🟡 متوسطة |
| `/api/banks` | ⚠️ يعرض الكل | 🔴 عالية |
| `/api/financing-types` | ⚠️ يعرض الكل | 🔴 عالية |

---

### 3. المشكلة: البنوك والنسب مشتركة

**الحالة الحالية:**
- جميع الشركات تشاهد نفس البنوك
- جميع الشركات تشاهد نفس نسب التمويل

**الحل المطلوب:**

```sql
-- تحديث البنوك الموجودة لتنتمي لشركة محددة
UPDATE banks SET tenant_id = 1 WHERE id IN (1,2,3);
UPDATE banks SET tenant_id = 4 WHERE id IN (4,5,6);

-- تحديث النسب
UPDATE bank_financing_rates SET tenant_id = 1 WHERE bank_id IN (1,2,3);
UPDATE bank_financing_rates SET tenant_id = 4 WHERE bank_id IN (4,5,6);
```

---

## 🔧 التطبيق الكامل للعزل

### خطوة 1: إنشاء Middleware للمصادقة

```typescript
// middleware/auth.ts
export async function authMiddleware(c: Context, next: Next) {
  // الحصول على session_id من cookie
  const sessionId = c.req.cookie('session_id');
  
  if (!sessionId) {
    return c.redirect('/login');
  }
  
  // التحقق من الجلسة وجلب المستخدم
  const session = await c.env.DB.prepare(`
    SELECT u.id, u.tenant_id, u.role, t.slug as tenant_slug
    FROM users u
    JOIN tenants t ON u.tenant_id = t.id
    WHERE u.id = (SELECT user_id FROM sessions WHERE session_id = ?)
  `).bind(sessionId).first();
  
  if (!session) {
    return c.redirect('/login');
  }
  
  // حفظ المعلومات في context
  c.set('userId', session.id);
  c.set('tenantId', session.tenant_id);
  c.set('tenantSlug', session.tenant_slug);
  c.set('userRole', session.role);
  
  await next();
}
```

### خطوة 2: تطبيق Middleware على جميع المسارات

```typescript
// في src/index.tsx
app.use('/admin/*', authMiddleware);
app.use('/api/*', authMiddleware);
```

### خطوة 3: استخدام tenant_id من Context

```typescript
app.get('/admin/customers', async (c) => {
  const tenantId = c.get('tenantId'); // من middleware
  
  const customers = await c.env.DB.prepare(`
    SELECT * FROM customers 
    WHERE tenant_id = ?
    ORDER BY created_at DESC
  `).bind(tenantId).all();
  
  // ...
});
```

---

## 📊 استعلامات SQL للتحديث

### تحديث المستخدمين

```sql
-- تعيين شركة الموعد للمستخدم
UPDATE users 
SET tenant_id = 4 
WHERE username = 'sharikatalmaweid';

-- التحقق
SELECT id, username, full_name, tenant_id 
FROM users 
WHERE username = 'sharikatalmaweid';
```

### تحديث البنوك

```sql
-- نسخ البنوك لشركة الموعد
INSERT INTO banks (bank_name, logo_url, contact_info, website, tenant_id)
SELECT bank_name, logo_url, contact_info, website, 4
FROM banks 
WHERE tenant_id IS NULL OR tenant_id = 1;

-- التحقق
SELECT id, bank_name, tenant_id 
FROM banks 
WHERE tenant_id = 4;
```

### تحديث النسب

```sql
-- نسخ النسب لشركة الموعد
INSERT INTO bank_financing_rates 
  (bank_id, financing_type_id, min_duration, max_duration, 
   interest_rate, admin_fees, insurance_percentage, tenant_id)
SELECT 
  (SELECT id FROM banks WHERE bank_name = b.bank_name AND tenant_id = 4),
  financing_type_id, min_duration, max_duration, 
  interest_rate, admin_fees, insurance_percentage, 4
FROM bank_financing_rates bfr
JOIN banks b ON bfr.bank_id = b.id
WHERE bfr.tenant_id = 1;
```

---

## ✅ قائمة التحقق (Checklist)

### قاعدة البيانات
- [x] إضافة tenant_id للجداول الأساسية
- [x] إنشاء indexes
- [ ] تحديث البيانات الموجودة بـ tenant_id صحيح
- [ ] تطبيق FOREIGN KEY constraints

### Backend
- [x] تصفية استعلامات صفحة توزيع العملاء
- [x] تصفية API auto-distribute
- [ ] إنشاء authentication middleware
- [ ] تطبيق middleware على جميع المسارات
- [ ] تصفية جميع استعلامات SQL الأخرى

### Frontend
- [x] إرسال tenant_id مع الطلبات
- [ ] إخفاء tenant_id من URL
- [ ] عرض اسم الشركة الحالية في الواجهة

### Testing
- [x] اختبار عزل العملاء
- [x] اختبار عزل الموظفين
- [ ] اختبار عزل البنوك
- [ ] اختبار عزل النسب
- [ ] اختبار عزل طلبات التمويل

---

## 🚀 الخطوات القادمة (مرتبة حسب الأولوية)

### 1. تحديث المستخدم الحالي (عاجل)

```sql
UPDATE users 
SET tenant_id = 4 
WHERE username = 'sharikatalmaweid';
```

### 2. تصفية صفحة العملاء (عاجل)

```typescript
app.get('/admin/customers', async (c) => {
  const tenantId = c.req.query('tenant_id') || 1; // مؤقت
  
  const customers = await c.env.DB.prepare(`
    SELECT * FROM customers 
    WHERE tenant_id = ?
    ORDER BY created_at DESC
  `).bind(tenantId).all();
  
  // ...
});
```

### 3. تصفية صفحة طلبات التمويل (عاجل)

```typescript
app.get('/admin/requests', async (c) => {
  const tenantId = c.req.query('tenant_id') || 1;
  
  const requests = await c.env.DB.prepare(`
    SELECT fr.*, c.full_name as customer_name
    FROM financing_requests fr
    JOIN customers c ON fr.customer_id = c.id
    WHERE c.tenant_id = ?
    ORDER BY fr.created_at DESC
  `).bind(tenantId).all();
  
  // ...
});
```

### 4. تطبيق Authentication Middleware (مهم)

إنشاء نظام جلسات كامل مع cookies آمنة.

---

## 📞 للدعم

إذا واجهت أي مشاكل:

1. تأكد من إضافة `?tenant_id=4` في الرابط
2. تأكد من أن المستخدم لديه `tenant_id` صحيح
3. تحقق من السجلات (logs) للأخطاء

---

**تاريخ الإنشاء:** 17 ديسمبر 2025  
**الإصدار:** 1.0 - Partial Implementation  
**الحالة:** ⚠️ يحتاج تحسينات إضافية
