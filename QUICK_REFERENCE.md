# ⚡ دليل المرجع السريع - Quick Reference Guide

**آخر تحديث:** 16 ديسمبر 2025

---

## 🚀 بدء التشغيل السريع

### تشغيل الخادم
```bash
cd /home/user/webapp
pm2 start ecosystem.config.cjs
```

### إيقاف الخادم
```bash
pm2 stop tamweel-calc
```

### إعادة التشغيل
```bash
fuser -k 3000/tcp
pm2 restart tamweel-calc
```

### البناء
```bash
cd /home/user/webapp
npm run build
```

---

## 🔗 الروابط الأساسية

### الرئيسية
```
https://3000-ii8t2q2dzwwe7ckmslxss-3844e1b6.sandbox.novita.ai/
```

### الحاسبة
```
https://3000-ii8t2q2dzwwe7ckmslxss-3844e1b6.sandbox.novita.ai/calculator
```

### تسجيل الدخول
```
https://3000-ii8t2q2dzwwe7ckmslxss-3844e1b6.sandbox.novita.ai/login
```

### لوحة التحكم
```
https://3000-ii8t2q2dzwwe7ckmslxss-3844e1b6.sandbox.novita.ai/admin
```

---

## 📊 قاعدة البيانات

### تطبيق الهجرات (Local)
```bash
npx wrangler d1 migrations apply tamweel-production --local
```

### استعلام مباشر (Local)
```bash
npx wrangler d1 execute tamweel-production --local --command="SELECT * FROM users"
```

### تطبيق الهجرات (Production)
```bash
npx wrangler d1 migrations apply tamweel-production
```

---

## 🔧 أوامر Git المهمة

### حالة المشروع
```bash
git status
```

### عمل commit
```bash
git add .
git commit -m "رسالة التعديل"
```

### عرض آخر commits
```bash
git log --oneline -10
```

### Push إلى GitHub
```bash
git push origin main
```

---

## 📁 الملفات المهمة

| الملف | الوصف |
|------|-------|
| `src/index.tsx` | الملف الرئيسي (Routes & APIs) |
| `src/full-admin-panel.ts` | لوحة التحكم الرئيسية |
| `src/smart-calculator.ts` | الحاسبة الذكية |
| `src/login-page.ts` | صفحة تسجيل الدخول |
| `wrangler.jsonc` | إعدادات Cloudflare |
| `ecosystem.config.cjs` | إعدادات PM2 |

---

## 🗄️ الجداول الرئيسية

1. `users` - المستخدمين
2. `customers` - العملاء
3. `financing_requests` - طلبات التمويل
4. `banks` - البنوك
5. `bank_financing_rates` - نسب التمويل
6. `subscriptions` - الاشتراكات
7. `packages` - الباقات
8. `roles` - الأدوار
9. `attachments` - المرفقات
10. `notifications` - الإشعارات

---

## 🔌 APIs الأساسية

### المصادقة
- `POST /api/auth/login` - تسجيل دخول
- `POST /api/auth/forgot-password` - نسيت كلمة السر
- `POST /api/auth/verify-reset-code` - التحقق من الرمز
- `POST /api/auth/reset-password` - إعادة تعيين كلمة السر

### العملاء
- `GET /api/customers` - جميع العملاء
- `POST /api/customers` - إضافة عميل
- `PUT /api/customers/:id` - تعديل عميل
- `DELETE /api/customers/:id` - حذف عميل

### طلبات التمويل
- `GET /api/requests` - جميع الطلبات
- `POST /api/requests` - إضافة طلب
- `PUT /api/requests/:id` - تعديل طلب
- `DELETE /api/requests/:id` - حذف طلب

### البنوك
- `GET /api/banks` - جميع البنوك
- `POST /api/banks` - إضافة بنك
- `PUT /api/banks/:id` - تعديل بنك

### الباقات
- `GET /api/packages` - جميع الباقات
- `POST /api/packages` - إضافة باقة

### طلبات الاشتراك
- `GET /api/subscription-requests` - جميع الطلبات
- `POST /api/subscription-requests` - إضافة طلب

---

## 🎯 المراحل المكتملة

- ✅ المرحلة 1: الحاسبة وإدارة البيانات
- ✅ المرحلة 2: لوحة التحكم والإحصائيات
- ✅ المرحلة 3: نظام المرفقات (R2)
- ✅ المرحلة 4: نظام الإشعارات
- ✅ المرحلة 5: نظام المصادقة والاشتراكات

---

## 📝 ملفات التوثيق

- `README.md` - الوثيقة الرئيسية
- `PROJECT_STATUS.md` - حالة المشروع الشاملة
- `ISSUES_TODO.md` - قائمة المهام والمشاكل
- `PHASE_5_AUTHENTICATION_SUBSCRIPTION.md` - تقرير المرحلة 5
- `PHASE_4_NOTIFICATIONS_COMPLETE.md` - تقرير المرحلة 4
- `PHASE_3_ATTACHMENTS_COMPLETE.md` - تقرير المرحلة 3

---

## 🔥 أوامر مفيدة

### تنظيف المنفذ 3000
```bash
fuser -k 3000/tcp
```

### عرض حالة PM2
```bash
pm2 list
pm2 logs --nostream
pm2 monit
```

### اختبار الخادم
```bash
curl http://localhost:3000
curl http://localhost:3000/api/packages
```

### حذف من PM2
```bash
pm2 delete tamweel-calc
```

---

## 💾 النسخ الاحتياطي

### إنشاء نسخة احتياطية
```bash
cd /home/user
tar -czf webapp_backup_$(date +%Y%m%d).tar.gz webapp/
```

### استعادة نسخة احتياطية
```bash
cd /home/user
tar -xzf webapp_backup_20251216.tar.gz
```

---

## 🚨 حل المشاكل الشائعة

### المشكلة: الخادم لا يعمل
```bash
# الحل 1: إعادة التشغيل
pm2 restart tamweel-calc

# الحل 2: تنظيف المنفذ
fuser -k 3000/tcp
pm2 start ecosystem.config.cjs

# الحل 3: إعادة البناء
npm run build
pm2 restart tamweel-calc
```

### المشكلة: خطأ في قاعدة البيانات
```bash
# إعادة تطبيق الهجرات
rm -rf .wrangler/state/v3/d1
npx wrangler d1 migrations apply tamweel-production --local
```

### المشكلة: صفحة 404
- تأكد من البناء: `npm run build`
- تأكد من الخادم يعمل: `pm2 list`
- افحص اللوجات: `pm2 logs --nostream`

---

## 🎉 معلومات المشروع

- **اسم المشروع:** نظام حاسبة التمويل
- **النسخة:** 1.0.0
- **Framework:** Hono.js
- **Database:** Cloudflare D1
- **Storage:** Cloudflare R2
- **Styling:** Tailwind CSS
- **Process Manager:** PM2

---

**🔗 الرابط المباشر:**
```
https://3000-ii8t2q2dzwwe7ckmslxss-3844e1b6.sandbox.novita.ai/
```

---

**آخر فحص:** 16 ديسمبر 2025  
**الحالة:** ✅ يعمل بشكل كامل
