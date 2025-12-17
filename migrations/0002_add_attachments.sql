-- ============================================
-- إضافة أعمدة المرفقات لجدول customers و financing_requests
-- Migration 0002: Add Attachments
-- ============================================

-- إضافة أعمدة جديدة لجدول customers
ALTER TABLE customers ADD COLUMN birthdate DATE;
ALTER TABLE customers ADD COLUMN work_start_date DATE;
ALTER TABLE customers ADD COLUMN city TEXT;

-- إضافة أعمدة المرفقات لجدول financing_requests
ALTER TABLE financing_requests ADD COLUMN monthly_obligations REAL DEFAULT 0;
ALTER TABLE financing_requests ADD COLUMN monthly_payment REAL;
ALTER TABLE financing_requests ADD COLUMN id_attachment_url TEXT;
ALTER TABLE financing_requests ADD COLUMN bank_statement_attachment_url TEXT;
ALTER TABLE financing_requests ADD COLUMN salary_attachment_url TEXT;
ALTER TABLE financing_requests ADD COLUMN additional_attachment_url TEXT;
