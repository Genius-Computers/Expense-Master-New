-- Migration: Add 4 Test Users for Permissions System
-- Date: 2025-12-21
-- Purpose: Create test users for each role to demonstrate permission system

-- Delete existing test users first (optional - for clean slate)
-- DELETE FROM users WHERE username IN ('superadmin', 'companyadmin', 'supervisor', 'employee');

-- Insert 4 test users with clear roles
INSERT INTO users (username, password, full_name, email, phone, role_id, user_type, tenant_id, is_active, created_at) VALUES
-- 1. Super Admin (Role 1) - Full access to all companies + SaaS
('superadmin', 'Super@2025', 'المدير العام للنظام', 'super@tamweel.sa', '0500000001', 1, 'admin', NULL, 1, datetime('now')),

-- 2. Company Admin (Role 4) - Manages company data (no SaaS access)
('companyadmin', 'Company@2025', 'مدير شركة التمويل الأولى', 'company@tamweel.sa', '0500000002', 4, 'company', 1, 1, datetime('now')),

-- 3. Supervisor (Role 5) - Read-only access to all company data
('supervisor', 'Supervisor@2025', 'مشرف موظفين الشركة', 'supervisor@tamweel.sa', '0500000003', 5, 'company', 1, 1, datetime('now')),

-- 4. Employee (Role 3) - Access only to assigned customers
('employee', 'Employee@2025', 'موظف الشركة الأولى', 'employee@tamweel.sa', '0500000004', 3, 'employee', 1, 1, datetime('now'));

-- Verify users were created
SELECT id, username, full_name, role_id, user_type, tenant_id, is_active 
FROM users 
WHERE username IN ('superadmin', 'companyadmin', 'supervisor', 'employee')
ORDER BY role_id;
