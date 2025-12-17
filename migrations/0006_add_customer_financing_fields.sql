-- Migration: إضافة حقول التمويل في جدول العملاء
-- Date: 2025-12-16
-- Purpose: إضافة حقول مبلغ التمويل والالتزامات ونوع التمويل في جدول customers

-- Add financing_amount column to customers table
ALTER TABLE customers ADD COLUMN financing_amount REAL DEFAULT 0;

-- Add monthly_obligations column to customers table  
ALTER TABLE customers ADD COLUMN monthly_obligations REAL DEFAULT 0;

-- Add financing_type_id column to customers table
ALTER TABLE customers ADD COLUMN financing_type_id INTEGER;

-- Add foreign key index for financing_type_id
CREATE INDEX IF NOT EXISTS idx_customers_financing_type ON customers(financing_type_id);
