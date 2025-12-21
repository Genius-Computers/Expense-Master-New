# دليل النشر على Cloudflare Pages + Workers

## 📋 نظرة عامة

هذا الدليل يشرح كيفية نشر **منصة حاسبة التمويل** على Cloudflare باستخدام:
- **Cloudflare Pages** للاستضافة
- **Cloudflare D1** لقاعدة البيانات
- **Cloudflare R2** لتخزين الملفات
- **Cloudflare Workers** للـ backend

---

## 🔧 المتطلبات الأساسية

### 1. **حساب Cloudflare**
- قم بالتسجيل على: https://dash.cloudflare.com/sign-up
- تأكد من تفعيل البريد الإلكتروني

### 2. **تثبيت Wrangler CLI**
```bash
npm install -g wrangler

# تسجيل الدخول
wrangler login
```

---

## 🚀 خطوات النشر

### **المرحلة 1: إنشاء قاعدة بيانات D1**

#### 1. إنشاء قاعدة البيانات
```bash
cd /home/user/webapp

# إنشاء D1 database
wrangler d1 create tamweel-production
```

**سيظهر لك output مثل**:
```
✅ Successfully created DB 'tamweel-production'
📋 Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### 2. تحديث wrangler.toml
افتح `wrangler.toml` واستبدل `database_id`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "tamweel-production"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ← استخدم الـ ID من الخطوة السابقة
```

#### 3. تطبيق Migrations
```bash
# Migration 1: النظام الأساسي
wrangler d1 execute tamweel-production --remote --file=./migrations/0001_full_system.sql

# Migration 2: المرفقات
wrangler d1 execute tamweel-production --remote --file=./migrations/0002_add_attachments.sql

# Migration 3: نظام الصلاحيات
wrangler d1 execute tamweel-production --remote --file=./migrations/0003_permissions_system.sql

# Migration 4: الإشعارات
wrangler d1 execute tamweel-production --remote --file=./migrations/0004_create_notifications.sql

# Migration 5: الشركات المتعددة
wrangler d1 execute tamweel-production --remote --file=./migrations/0005_add_multi_tenant_support.sql

# Migration 12: إعادة هيكلة الصلاحيات
wrangler d1 execute tamweel-production --remote --file=./migrations/0012_restructure_permissions.sql

# Migration 13: الأدوار الديناميكية
wrangler d1 execute tamweel-production --remote --file=./migrations/0013_dynamic_roles_system.sql

# Migration 14: المستخدمين الاختباريين
wrangler d1 execute tamweel-production --remote --file=./migrations/0014_add_test_users.sql
```

#### 4. التحقق من قاعدة البيانات
```bash
wrangler d1 execute tamweel-production --remote \
  --command="SELECT id, username, role_id FROM users"
```

**يجب أن ترى 4 مستخدمين**:
```
- superadmin (role_id: 1)
- companyadmin (role_id: 4)
- supervisor (role_id: 5)
- employee (role_id: 3)
```

---

### **المرحلة 2: إنشاء R2 Bucket**

```bash
# إنشاء R2 bucket للمرفقات
wrangler r2 bucket create tamweel-attachments-production

# التحقق
wrangler r2 bucket list
```

**تحديث wrangler.toml**:
```toml
[[r2_buckets]]
binding = "ATTACHMENTS"
bucket_name = "tamweel-attachments-production"
```

---

### **المرحلة 3: نشر Worker على Cloudflare**

#### 1. بناء التطبيق
```bash
npm install
npm run build
```

#### 2. نشر Worker
```bash
wrangler deploy
```

**سيظهر لك**:
```
✨ Built successfully
🚀 Deployed to Cloudflare!
🌐 https://tamweel-calc.YOUR-SUBDOMAIN.workers.dev
```

---

### **المرحلة 4: ربط Domain مخصص**

#### الطريقة 1: استخدام Cloudflare Pages

1. اذهب إلى: https://dash.cloudflare.com/
2. اختر **Pages** → **Create a project**
3. اختر **Connect to Git** → اختر GitHub repo: `Expense-Master`
4. **Build settings**:
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```
5. **Environment variables**:
   - (لا حاجة لها - كل شيء في wrangler.toml)
6. انقر **Save and Deploy**

#### الطريقة 2: استخدام Custom Domain

1. في Cloudflare Dashboard → **Workers & Pages**
2. اختر `tamweel-calc` worker
3. **Settings** → **Triggers** → **Custom Domains**
4. انقر **Add Custom Domain**
5. أدخل: `tamweel.sa` (أو أي domain تملكه)
6. انقر **Add Domain**

---

### **المرحلة 5: إعداد SSL/TLS**

1. في Cloudflare Dashboard → اختر domain
2. **SSL/TLS** → اختر **Full (strict)**
3. **Edge Certificates** → تأكد من تفعيل:
   - ✅ Always Use HTTPS
   - ✅ Automatic HTTPS Rewrites
   - ✅ Minimum TLS Version: 1.2

---

## 🧪 الاختبار

### 1. اختبار Worker مباشرة
```bash
curl https://tamweel-calc.YOUR-SUBDOMAIN.workers.dev/login
```

### 2. اختبار تسجيل الدخول
```bash
curl -X POST https://tamweel-calc.YOUR-SUBDOMAIN.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"supervisor","password":"Supervisor@2025"}'
```

**يجب أن ترى**:
```json
{
  "success": true,
  "token": "...",
  "redirect": "/admin/panel",
  "user": {
    "username": "supervisor",
    "role_id": 5,
    "role_name": "supervisor"
  }
}
```

---

## 📊 حسابات الاختبار

بعد تطبيق migrations، يمكنك تسجيل الدخول بـ:

| المستخدم | كلمة المرور | الدور | الصلاحيات |
|----------|-------------|-------|-----------|
| **superadmin** | `Super@2025` | Super Admin | كل شيء + SaaS |
| **companyadmin** | `Company@2025` | Company Admin | إدارة الشركة |
| **supervisor** | `Supervisor@2025` | Supervisor | قراءة فقط |
| **employee** | `Employee@2025` | Employee | عملاؤه المخصصون |

---

## 🔍 استكشاف الأخطاء

### مشكلة: "D1_ERROR: no such table"
**الحل**: تأكد من تطبيق جميع migrations:
```bash
wrangler d1 execute tamweel-production --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### مشكلة: "Authentication failed"
**الحل**: سجّل دخول مرة أخرى:
```bash
wrangler logout
wrangler login
```

### مشكلة: "Deployment failed"
**الحل**: تحقق من logs:
```bash
wrangler tail
```

---

## 📈 المراقبة والـ Logs

### عرض Logs مباشرة
```bash
wrangler tail
```

### عرض Analytics
1. اذهب إلى: https://dash.cloudflare.com/
2. **Workers & Pages** → `tamweel-calc`
3. **Metrics** tab

---

## 🔄 التحديثات المستقبلية

عند إجراء تعديلات على الكود:

```bash
# 1. Commit changes
git add .
git commit -m "feat: your changes"
git push origin genspark_ai_developer

# 2. Deploy to Cloudflare
wrangler deploy

# 3. إذا كان هناك migrations جديدة
wrangler d1 execute tamweel-production --remote \
  --file=./migrations/NEW_MIGRATION.sql
```

---

## 💰 التكلفة المتوقعة

### **Free Tier** (مجاني)
- ✅ 10 مليون طلب / شهر
- ✅ 5 GB تخزين D1
- ✅ 10 GB R2 storage
- ✅ 1 مليون قراءة/كتابة R2

### **Paid Plans** (إذا تجاوزت Free tier)
- Workers: $5/شهر للـ 10 ملايين طلب إضافي
- D1: $0.001 لكل GB مخزن إضافي
- R2: $0.015 لكل GB مخزن

**لتطبيق صغير-متوسط**: غالباً Free tier كافي! 🎉

---

## 🔐 الأمان

### 1. Environment Secrets (اختياري)
إذا أردت تخزين secrets:
```bash
wrangler secret put API_KEY
# أدخل قيمة السر
```

### 2. Rate Limiting
يمكن إضافة rate limiting في `index.tsx`:
```typescript
// مثال بسيط
const rateLimiter = new Map();
app.use('/api/*', async (c, next) => {
  const ip = c.req.header('CF-Connecting-IP');
  // تطبيق rate limiting logic
  await next();
});
```

---

## ✅ الخلاصة

بعد اتباع هذه الخطوات، ستحصل على:

- ✅ تطبيق مُستضاف على Cloudflare Workers
- ✅ قاعدة بيانات D1 تعمل
- ✅ تخزين ملفات R2
- ✅ SSL/TLS مُفعّل
- ✅ 4 مستخدمين اختبار جاهزين
- ✅ نظام صلاحيات كامل

**رابط التطبيق**: `https://tamweel-calc.YOUR-SUBDOMAIN.workers.dev`

أو مع custom domain: `https://tamweel.sa`

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع Cloudflare Docs: https://developers.cloudflare.com/
2. فحص Logs: `wrangler tail`
3. تحقق من GitHub Issues: https://github.com/basealsyed2015-source/Expense-Master/issues

---

📅 **تاريخ الإنشاء**: 2025-12-21  
🔧 **الإصدار**: v2.2 - Cloudflare Ready  
👨‍💻 **المطور**: GenSpark AI Developer
