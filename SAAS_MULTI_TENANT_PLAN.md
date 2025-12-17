# 🏢 خطة تحويل النظام إلى SaaS Multi-Tenant

**آخر تحديث:** 16 ديسمبر 2025

---

## 🎯 الهدف الرئيسي

تحويل نظام حاسبة التمويل إلى **SaaS Multi-Tenant** حيث:
- ✅ كل شركة لها بيانات منفصلة تماماً
- ✅ كل شركة لها رابط حاسبة خاص (subdomain أو slug)
- ✅ عزل كامل للبيانات (Data Isolation)
- ✅ إدارة مركزية للاشتراكات
- ✅ كل شركة تدير مستخدميها وعملائها

---

## 🏗️ معمارية النظام (Architecture)

### النموذج المقترح: **Shared Database with Tenant ID**

```
┌─────────────────────────────────────────────────────────┐
│                    Super Admin                          │
│              (إدارة جميع الشركات)                       │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Company 1   │  │  Company 2   │  │  Company 3   │
│  tenant_id=1 │  │  tenant_id=2 │  │  tenant_id=3 │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
  ┌─────────┐        ┌─────────┐        ┌─────────┐
  │ Users   │        │ Users   │        │ Users   │
  │Customers│        │Customers│        │Customers│
  │Requests │        │Requests │        │Requests │
  └─────────┘        └─────────┘        └─────────┘
```

### الميزات:
- ✅ **سهل التطبيق** - تغييرات بسيطة في قاعدة البيانات
- ✅ **فعال من حيث التكلفة** - قاعدة بيانات واحدة
- ✅ **عزل جيد للبيانات** - عبر tenant_id
- ✅ **سهل الصيانة** - نسخ احتياطية واحدة

---

## 🔗 أنظمة الروابط المقترحة

### الخيار 1: Subdomain (موصى به)
```
https://company1.tamweel.app/calculator
https://company2.tamweel.app/calculator
https://company3.tamweel.app/calculator
```

**الميزات:**
- ✅ احترافي جداً
- ✅ سهل التذكر
- ✅ يعطي كل شركة هوية مستقلة
- ⚠️ يحتاج إعداد DNS

### الخيار 2: Slug/Path
```
https://tamweel.app/c/company1/calculator
https://tamweel.app/c/company2/calculator
https://tamweel.app/c/company3/calculator
```

**الميزات:**
- ✅ سهل التطبيق
- ✅ لا يحتاج DNS
- ✅ مناسب للبداية
- ⚠️ أقل احترافية

### الخيار 3: Custom Domain (متقدم)
```
https://calculator.company1.com
https://calculator.company2.com
```

**الميزات:**
- ✅ الأكثر احترافية
- ✅ كل شركة تستخدم نطاقها
- ⚠️ معقد في الإعداد

---

## 📊 تعديلات قاعدة البيانات

### 1. إضافة حقل tenant_id لجميع الجداول

```sql
-- إضافة حقل tenant_id لجدول subscriptions
ALTER TABLE subscriptions ADD COLUMN tenant_id INTEGER;

-- إضافة حقل tenant_id لجدول users
ALTER TABLE users ADD COLUMN tenant_id INTEGER;

-- إضافة حقل tenant_id لجدول customers
ALTER TABLE customers ADD COLUMN tenant_id INTEGER;

-- إضافة حقل tenant_id لجدول financing_requests
ALTER TABLE financing_requests ADD COLUMN tenant_id INTEGER;

-- إضافة حقل tenant_id لجدول notifications
ALTER TABLE notifications ADD COLUMN tenant_id INTEGER;

-- إضافة حقل tenant_id لجدول attachments
ALTER TABLE attachments ADD COLUMN tenant_id INTEGER;
```

### 2. جدول الشركات (Tenants)

```sql
CREATE TABLE IF NOT EXISTS tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,           -- للـ URL: company1, company2
  subdomain TEXT UNIQUE,                -- للـ Subdomain: company1.tamweel.app
  logo_url TEXT,                        -- شعار الشركة
  primary_color TEXT DEFAULT '#667eea', -- اللون الأساسي
  subscription_id INTEGER,              -- ربط مع جدول subscriptions
  status TEXT DEFAULT 'active',         -- active, suspended, cancelled
  max_users INTEGER DEFAULT 5,          -- الحد الأقصى للمستخدمين
  max_customers INTEGER DEFAULT 100,    -- الحد الأقصى للعملاء
  max_requests INTEGER DEFAULT 1000,    -- الحد الأقصى للطلبات
  settings_json TEXT,                   -- إعدادات إضافية (JSON)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,                  -- تاريخ انتهاء الاشتراك
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);
```

### 3. إضافة Indexes للأداء

```sql
-- Indexes لتسريع الاستعلامات
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_customers_tenant ON customers(tenant_id);
CREATE INDEX idx_requests_tenant ON financing_requests(tenant_id);
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
```

---

## 🔐 نظام المصادقة المحدث

### مستويات المستخدمين:

1. **Super Admin** (tenant_id = NULL)
   - إدارة جميع الشركات
   - إضافة/تعديل/حذف الشركات
   - عرض إحصائيات النظام الكامل
   - إدارة الاشتراكات

2. **Company Admin** (tenant_id = X, role = admin)
   - إدارة شركته فقط
   - إضافة/تعديل المستخدمين
   - إدارة العملاء والطلبات
   - عرض إحصائيات شركته

3. **Company User** (tenant_id = X, role = user)
   - الوصول للحاسبة
   - إدارة العملاء المسندين له
   - إضافة طلبات تمويل

---

## 🛠️ التعديلات المطلوبة على الكود

### 1. Middleware للتحقق من الشركة

```typescript
// src/middleware/tenant.ts
export const tenantMiddleware = async (c, next) => {
  // استخراج tenant من URL
  const slug = c.req.param('tenant')
  const subdomain = c.req.header('host')?.split('.')[0]
  
  // البحث عن الشركة في قاعدة البيانات
  const tenant = await c.env.DB.prepare(`
    SELECT * FROM tenants 
    WHERE slug = ? OR subdomain = ?
    AND status = 'active'
  `).bind(slug, subdomain).first()
  
  if (!tenant) {
    return c.json({ error: 'Tenant not found' }, 404)
  }
  
  // حفظ tenant في context
  c.set('tenant', tenant)
  c.set('tenantId', tenant.id)
  
  await next()
}
```

### 2. تحديث جميع الاستعلامات

**قبل:**
```typescript
const customers = await c.env.DB.prepare(`
  SELECT * FROM customers
`).all()
```

**بعد:**
```typescript
const tenantId = c.get('tenantId')
const customers = await c.env.DB.prepare(`
  SELECT * FROM customers WHERE tenant_id = ?
`).bind(tenantId).all()
```

### 3. تحديث الحاسبة

```typescript
// Route الحاسبة مع tenant
app.get('/c/:tenant/calculator', tenantMiddleware, async (c) => {
  const tenant = c.get('tenant')
  
  // تخصيص الحاسبة بألوان وشعار الشركة
  return c.html(getCustomizedCalculator(tenant))
})

// أو مع subdomain
app.get('/calculator', tenantMiddleware, async (c) => {
  const tenant = c.get('tenant')
  return c.html(getCustomizedCalculator(tenant))
})
```

---

## 📋 خطة التنفيذ (Implementation Plan)

### المرحلة 1: إعداد قاعدة البيانات (يوم 1)
1. ✅ إنشاء جدول `tenants`
2. ✅ إضافة حقل `tenant_id` لجميع الجداول
3. ✅ إنشاء Indexes
4. ✅ إنشاء Migration file
5. ✅ تطبيق Migration على قاعدة البيانات المحلية

### المرحلة 2: Middleware والمصادقة (يوم 1-2)
1. ✅ إنشاء Tenant Middleware
2. ✅ تحديث نظام المصادقة
3. ✅ إضافة tenant_id للتوكن
4. ✅ التحقق من tenant_id في كل request

### المرحلة 3: تحديث APIs (يوم 2-3)
1. ✅ تحديث جميع استعلامات SELECT بـ tenant_id
2. ✅ تحديث جميع استعلامات INSERT بـ tenant_id
3. ✅ تحديث جميع استعلامات UPDATE بـ tenant_id
4. ✅ تحديث جميع استعلامات DELETE بـ tenant_id

### المرحلة 4: تحديث الصفحات (يوم 3-4)
1. ✅ تحديث الحاسبة لدعم tenant
2. ✅ إضافة التخصيص (لوقو، ألوان)
3. ✅ تحديث لوحة التحكم
4. ✅ إضافة صفحة إدارة الشركات (Super Admin)

### المرحلة 5: الاختبار (يوم 4-5)
1. ✅ اختبار عزل البيانات
2. ✅ اختبار الروابط
3. ✅ اختبار الأداء
4. ✅ اختبار الأمان

### المرحلة 6: النشر (يوم 5)
1. ✅ نشر التحديثات
2. ✅ إعداد DNS (إن لزم)
3. ✅ التوثيق

---

## 🎨 التخصيص لكل شركة

### 1. الألوان والشعار
```typescript
interface TenantCustomization {
  logo_url: string
  primary_color: string      // #667eea
  secondary_color: string    // #764ba2
  company_name: string
}
```

### 2. الإعدادات
```json
{
  "features": {
    "attachments": true,
    "notifications": true,
    "reports": false
  },
  "limits": {
    "max_file_size": 5242880,
    "max_requests_per_month": 1000
  },
  "branding": {
    "show_powered_by": false,
    "footer_text": "شركة التمويل الأولى"
  }
}
```

---

## 📊 مثال عملي

### شركة 1: شركة التمويل الأولى
```
الرابط: https://tamweel.app/c/tamweel-1/calculator
أو: https://tamweel-1.tamweel.app/calculator

tenant_id: 1
company_name: شركة التمويل الأولى
slug: tamweel-1
subscription_id: 1 (الباقة المتقدمة)
max_users: 10
max_customers: 500
```

### شركة 2: شركة الاستثمار الذكي
```
الرابط: https://tamweel.app/c/smart-invest/calculator
أو: https://smart-invest.tamweel.app/calculator

tenant_id: 2
company_name: شركة الاستثمار الذكي
slug: smart-invest
subscription_id: 2 (الباقة الاحترافية)
max_users: 50
max_customers: unlimited
```

---

## 🔒 الأمان وعزل البيانات

### القواعد الأساسية:
1. **دائماً** أضف `tenant_id` في WHERE clause
2. **دائماً** تحقق من tenant_id في Token
3. **دائماً** استخدم Middleware للتحقق
4. **أبداً** لا تعتمد على Frontend فقط

### مثال آمن:
```typescript
// ✅ صحيح
const customer = await c.env.DB.prepare(`
  SELECT * FROM customers 
  WHERE id = ? AND tenant_id = ?
`).bind(customerId, c.get('tenantId')).first()

// ❌ خطأ - يمكن الوصول لبيانات شركات أخرى
const customer = await c.env.DB.prepare(`
  SELECT * FROM customers WHERE id = ?
`).bind(customerId).first()
```

---

## 💰 نموذج الأعمال (Business Model)

### الباقات المقترحة:

#### 1. الباقة الأساسية (299 ريال/شهر)
- 5 مستخدمين
- 100 عميل
- 500 طلب/شهر
- دعم بريد إلكتروني

#### 2. الباقة المتقدمة (799 ريال/شهر)
- 10 مستخدمين
- 500 عميل
- 2000 طلب/شهر
- دعم أولوية

#### 3. الباقة الاحترافية (1999 ريال/شهر)
- مستخدمين غير محدود
- عملاء غير محدود
- طلبات غير محدودة
- دعم 24/7
- تخصيص كامل

#### 4. المؤسسات (سعر خاص)
- كل شيء في الاحترافية +
- Custom domain
- API access
- تدريب
- مدير حساب مخصص

---

## 🚀 الخطوة الأولى: هل تريد البدء؟

سأبدأ بـ:
1. ✅ إنشاء Migration file لقاعدة البيانات
2. ✅ إنشاء جدول tenants
3. ✅ إضافة tenant_id لجميع الجداول
4. ✅ إنشاء Tenant Middleware
5. ✅ تحديث الحاسبة لدعم multi-tenant

**هل توافق على هذه الخطة؟ وما هو نظام الروابط المفضل لديك؟**
- الخيار 1: Subdomain (company1.tamweel.app) ⭐ موصى به
- الخيار 2: Slug (/c/company1/calculator)
- الخيار 3: كلاهما

---

**آخر تحديث:** 16 ديسمبر 2025  
**الحالة:** 📋 جاهز للتنفيذ - في انتظار الموافقة
