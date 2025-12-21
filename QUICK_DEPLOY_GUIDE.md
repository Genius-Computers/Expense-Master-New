# 🚀 دليل النشر السريع - خطوة بخطوة

## 📌 المشكلة الحالية
التوكن: `X4QXT_iu4ZyoeIivBCF0-teJL6RX61P6tIq-_Z-q` ينقصه الصلاحيات للنشر التلقائي.

---

## ✅ الحل السريع (5 دقائق)

### **الطريقة 1: GitHub + Cloudflare Pages (موصى بها)**

#### 📋 الخطوات:

### 1️⃣ افتح Cloudflare Dashboard
🔗 https://dash.cloudflare.com/

### 2️⃣ إنشاء Workers & Pages Application
```
1. من القائمة اليسرى: Workers & Pages
2. اضغط "Create application"
3. اختر "Pages" tab
4. اضغط "Connect to Git"
```

### 3️⃣ ربط GitHub Repository
```
5. اختر "GitHub" 
6. إذا طُلب منك، سجل دخول GitHub وامنح الصلاحيات
7. اختر Repository: basealsyed2015-source/Expense-Master
8. اختر Branch: genspark_ai_developer
```

### 4️⃣ ضبط Build Settings
```
Project name: tamweel-calc
Build command: npm run build
Build output directory: dist
Root directory: /
```

### 5️⃣ Environment Variables (اتركها فارغة الآن)
```
اضغط "Save and Deploy"
```

### 6️⃣ انتظر Build (2-3 دقائق)
```
سيظهر لك:
✅ Deploying...
✅ Success! 
🔗 Your site is live at: https://tamweel-calc.pages.dev
```

---

## 🗄️ إعداد D1 Database

### 7️⃣ إنشاء Database
```
1. من القائمة: Workers & Pages > D1
2. اضغط "Create database"
3. الاسم: tamweel-production
4. اضغط "Create"
5. 📋 انسخ Database ID
```

### 8️⃣ رفع الجداول
```
1. افتح Database: tamweel-production
2. اذهب إلى تبويب "Console"
3. انسخ والصق الكود التالي:
```

```sql
-- إنشاء جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    role_id INTEGER DEFAULT 2,
    user_type TEXT DEFAULT 'company',
    subscription_id INTEGER,
    is_active INTEGER DEFAULT 1,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    tenant_id INTEGER,
    role TEXT DEFAULT 'employee'
);

CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (id, role_name, display_name, description) VALUES
(1, 'admin', 'مدير النظام', 'مدير النظام الكامل'),
(2, 'company', 'شركة مشتركة', 'حساب شركة'),
(3, 'user', 'موظف', 'مستخدم عادي'),
(4, 'company_admin', 'مدير شركة', 'مدير شركة مشتركة'),
(5, 'supervisor', 'مشرف موظفين', 'مشرف على الموظفين');

CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tenants (id, company_name, slug, status) VALUES
(1, 'شركة التمويل الأولى', 'tamweel-1', 'active');

CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    plan_type TEXT DEFAULT 'free',
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO subscriptions (id, company_name, email, status) VALUES
(1, 'شركة التمويل الأولى', 'info@tamweel-1.sa', 'active');

INSERT INTO users (username, password, full_name, email, role_id, user_type, tenant_id, role) VALUES
('superadmin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'المدير العام للنظام', 'super@tamweel.sa', 1, 'superadmin', NULL, 'admin'),
('companyadmin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'مدير الشركة', 'admin@tamweel-1.sa', 4, 'company', 1, 'company_admin'),
('supervisor', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'مشرف موظفين الشركة', 'supervisor@tamweel.sa', 5, 'company', 1, 'supervisor'),
('employee', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'موظف الشركة', 'employee@tamweel.sa', 3, 'company', 1, 'employee');
```

```
4. اضغط "Execute"
5. انتظر "Success" ✅
```

---

## 📦 إنشاء R2 Bucket

### 9️⃣ إنشاء Bucket
```
1. من القائمة: R2
2. اضغط "Create bucket"
3. الاسم: tamweel-attachments-production
4. Region: Automatic
5. اضغط "Create bucket"
```

---

## 🔗 ربط الموارد

### 🔟 ربط D1 و R2 بالتطبيق
```
1. ارجع إلى: Workers & Pages
2. افتح: tamweel-calc
3. اذهب إلى: Settings > Functions
4. في قسم "Bindings":
```

**أضف D1 Database:**
```
- اضغط "Add binding"
- Type: D1 database
- Variable name: DB
- D1 database: tamweel-production
- اضغط "Save"
```

**أضف R2 Bucket:**
```
- اضغط "Add binding"
- Type: R2 bucket
- Variable name: ATTACHMENTS
- R2 bucket: tamweel-attachments-production
- اضغط "Save"
```

### 1️⃣1️⃣ إعادة النشر
```
1. اذهب إلى: Deployments
2. اختر آخر deployment
3. اضغط "..." > "Retry deployment"
4. انتظر 1-2 دقيقة
```

---

## 🎉 جاهز! اختبر الآن

### 🔗 رابط التطبيق:
```
https://tamweel-calc.pages.dev
```

### 🔐 صفحة تسجيل الدخول:
```
https://tamweel-calc.pages.dev/login
```

### 🧪 حسابات الاختبار:

| Username | Password | الدور |
|----------|----------|-------|
| superadmin | Super@2025 | مدير نظام |
| companyadmin | Company@2025 | مدير شركة |
| supervisor | Supervisor@2025 | مشرف |
| employee | Employee@2025 | موظف |

---

## 🆘 إذا واجهت مشكلة

### Problem: "Build failed"
**الحل:**
```
1. تأكد من Branch: genspark_ai_developer
2. تأكد من Build command: npm run build
3. تأكد من Output: dist
```

### Problem: "Database not found"
**الحل:**
```
1. تأكد من ربط D1 في Bindings
2. Variable name يجب أن يكون: DB (بحروف كبيرة)
3. أعد Deployment
```

### Problem: "Login fails"
**الحل:**
```
1. تأكد من تنفيذ SQL في D1 Console
2. افتح D1 > Console > جرّب:
   SELECT * FROM users LIMIT 5;
3. يجب أن ترى 4 مستخدمين
```

---

## 📊 خطوات سريعة (TL;DR)

```
1. Dashboard > Workers & Pages > Create > Pages
2. Connect to Git > GitHub > Expense-Master
3. Branch: genspark_ai_developer
4. Build: npm run build, Output: dist
5. D1 > Create: tamweel-production > Console > Execute SQL
6. R2 > Create: tamweel-attachments-production
7. tamweel-calc > Settings > Functions > Bindings
   - Add D1: DB → tamweel-production
   - Add R2: ATTACHMENTS → tamweel-attachments-production
8. Deployments > Retry deployment
9. 🎉 Done! https://tamweel-calc.pages.dev/login
```

---

**⏱️ الوقت الكلي: 5-10 دقائق**
**💰 التكلفة: مجاني 100%!**

🚀 **ابدأ الآن!**
