-- Migration 0011: عزل كامل بين الشركات (Tenant Isolation)
-- تاريخ الإنشاء: 2025-12-17
-- الهدف: فصل بيانات كل شركة عن الأخرى

-- إضافة tenant_id لجدول المستخدمين
ALTER TABLE users ADD COLUMN tenant_id INTEGER;

-- إضافة tenant_id لجدول البنوك
ALTER TABLE banks ADD COLUMN tenant_id INTEGER;

-- إضافة tenant_id لجدول النسب
ALTER TABLE rates ADD COLUMN tenant_id INTEGER;

-- إضافة tenant_id لجدول أنواع التمويل
ALTER TABLE financing_types ADD COLUMN tenant_id INTEGER;

-- إنشاء indexes للأداء
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_banks_tenant ON banks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rates_tenant ON rates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_financing_types_tenant ON financing_types(tenant_id);

-- ملاحظة: 
-- جداول customers و financing_requests لديها tenant_id بالفعل
-- لا حاجة لإضافتها مرة أخرى
