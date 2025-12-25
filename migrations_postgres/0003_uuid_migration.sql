-- UUID Migration Script
-- Converts all INTEGER primary keys and foreign keys to UUID
-- Migrates existing data by generating UUIDs for all rows
-- Ensures tenant_id is never null where required (uses default tenant)
--
-- IMPORTANT: This script assumes the database currently has INTEGER primary keys.
-- If your database was created fresh with 0001_schema.sql (which already uses UUIDs),
-- you may not need this migration. Only run this if you have existing INTEGER data to migrate.

-- ============================================
-- STEP 0: Ensure UUID extension is available
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STEP 1: Add new UUID columns for all primary keys
-- ============================================

-- Core SaaS / Auth tables
ALTER TABLE roles ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE permissions ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE role_permissions ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE subscription_requests ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE users ADD COLUMN IF NOT EXISTS id_new UUID;

-- Banking & Rates
ALTER TABLE banks ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE financing_types ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE bank_financing_rates ADD COLUMN IF NOT EXISTS id_new UUID;

-- Customers & Requests
ALTER TABLE customers ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE financing_requests ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE financing_request_status_history ADD COLUMN IF NOT EXISTS id_new UUID;

-- Assignments
ALTER TABLE customer_assignments ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE assignment_history ADD COLUMN IF NOT EXISTS id_new UUID;

-- Notifications
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS id_new UUID;

-- Workflow
ALTER TABLE workflow_stages ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE workflow_stage_transitions ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE workflow_stage_actions ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE workflow_stage_tasks ADD COLUMN IF NOT EXISTS id_new UUID;

-- Payments
ALTER TABLE payments ADD COLUMN IF NOT EXISTS id_new UUID;

-- Calculator
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS id_new UUID;
ALTER TABLE conversions ADD COLUMN IF NOT EXISTS id_new UUID;

-- Password reset
ALTER TABLE password_change_notifications ADD COLUMN IF NOT EXISTS id_new UUID;

-- ============================================
-- STEP 2: Generate UUIDs for all existing rows
-- ============================================

UPDATE roles SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE permissions SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE role_permissions SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE packages SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE subscriptions SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE subscription_requests SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE tenants SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE users SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE banks SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE financing_types SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE bank_financing_rates SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE customers SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE financing_requests SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE financing_request_status_history SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE customer_assignments SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE assignment_history SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE notifications SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE workflow_stages SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE workflow_stage_transitions SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE workflow_stage_actions SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE workflow_stage_tasks SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE payments SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE calculations SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE conversions SET id_new = gen_random_uuid() WHERE id_new IS NULL;
UPDATE password_change_notifications SET id_new = gen_random_uuid() WHERE id_new IS NULL;

-- ============================================
-- STEP 3: Add new UUID columns for all foreign keys
-- ============================================

-- role_permissions
ALTER TABLE role_permissions ADD COLUMN IF NOT EXISTS role_id_new UUID;
ALTER TABLE role_permissions ADD COLUMN IF NOT EXISTS permission_id_new UUID;

-- subscriptions
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS package_id_new UUID;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS tenant_id_new UUID;

-- subscription_requests
ALTER TABLE subscription_requests ADD COLUMN IF NOT EXISTS package_id_new UUID;
ALTER TABLE subscription_requests ADD COLUMN IF NOT EXISTS tenant_id_new UUID;

-- tenants
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS subscription_id_new UUID;

-- users
ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id_new UUID;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_id_new UUID;
ALTER TABLE users ADD COLUMN IF NOT EXISTS tenant_id_new UUID;

-- banks
ALTER TABLE banks ADD COLUMN IF NOT EXISTS tenant_id_new UUID;

-- financing_types
ALTER TABLE financing_types ADD COLUMN IF NOT EXISTS tenant_id_new UUID;

-- bank_financing_rates
ALTER TABLE bank_financing_rates ADD COLUMN IF NOT EXISTS bank_id_new UUID;
ALTER TABLE bank_financing_rates ADD COLUMN IF NOT EXISTS financing_type_id_new UUID;
ALTER TABLE bank_financing_rates ADD COLUMN IF NOT EXISTS tenant_id_new UUID;

-- customers
ALTER TABLE customers ADD COLUMN IF NOT EXISTS tenant_id_new UUID;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS assigned_to_new UUID;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS financing_type_id_new UUID;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS best_bank_id_new UUID;

-- financing_requests
ALTER TABLE financing_requests ADD COLUMN IF NOT EXISTS customer_id_new UUID;
ALTER TABLE financing_requests ADD COLUMN IF NOT EXISTS financing_type_id_new UUID;
ALTER TABLE financing_requests ADD COLUMN IF NOT EXISTS selected_bank_id_new UUID;
ALTER TABLE financing_requests ADD COLUMN IF NOT EXISTS tenant_id_new UUID;
ALTER TABLE financing_requests ADD COLUMN IF NOT EXISTS current_stage_id_new UUID;

-- financing_request_status_history
ALTER TABLE financing_request_status_history ADD COLUMN IF NOT EXISTS request_id_new UUID;
ALTER TABLE financing_request_status_history ADD COLUMN IF NOT EXISTS changed_by_new UUID;

-- customer_assignments
ALTER TABLE customer_assignments ADD COLUMN IF NOT EXISTS customer_id_new UUID;
ALTER TABLE customer_assignments ADD COLUMN IF NOT EXISTS employee_id_new UUID;
ALTER TABLE customer_assignments ADD COLUMN IF NOT EXISTS assigned_by_new UUID;

-- assignment_history
ALTER TABLE assignment_history ADD COLUMN IF NOT EXISTS customer_id_new UUID;
ALTER TABLE assignment_history ADD COLUMN IF NOT EXISTS old_employee_id_new UUID;
ALTER TABLE assignment_history ADD COLUMN IF NOT EXISTS new_employee_id_new UUID;
ALTER TABLE assignment_history ADD COLUMN IF NOT EXISTS changed_by_new UUID;

-- notifications
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS user_id_new UUID;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS tenant_id_new UUID;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS related_request_id_new UUID;

-- workflow_stage_transitions
ALTER TABLE workflow_stage_transitions ADD COLUMN IF NOT EXISTS request_id_new UUID;
ALTER TABLE workflow_stage_transitions ADD COLUMN IF NOT EXISTS from_stage_id_new UUID;
ALTER TABLE workflow_stage_transitions ADD COLUMN IF NOT EXISTS to_stage_id_new UUID;
ALTER TABLE workflow_stage_transitions ADD COLUMN IF NOT EXISTS transitioned_by_new UUID;

-- workflow_stage_actions
ALTER TABLE workflow_stage_actions ADD COLUMN IF NOT EXISTS request_id_new UUID;
ALTER TABLE workflow_stage_actions ADD COLUMN IF NOT EXISTS stage_id_new UUID;
ALTER TABLE workflow_stage_actions ADD COLUMN IF NOT EXISTS performed_by_new UUID;

-- workflow_stage_tasks
ALTER TABLE workflow_stage_tasks ADD COLUMN IF NOT EXISTS request_id_new UUID;
ALTER TABLE workflow_stage_tasks ADD COLUMN IF NOT EXISTS stage_id_new UUID;
ALTER TABLE workflow_stage_tasks ADD COLUMN IF NOT EXISTS assigned_to_new UUID;
ALTER TABLE workflow_stage_tasks ADD COLUMN IF NOT EXISTS completed_by_new UUID;

-- payments
ALTER TABLE payments ADD COLUMN IF NOT EXISTS financing_request_id_new UUID;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS customer_id_new UUID;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS tenant_id_new UUID;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS employee_id_new UUID;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS created_by_new UUID;

-- calculations
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS user_id_new UUID;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS subscription_id_new UUID;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS financing_type_id_new UUID;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS bank_id_new UUID;

-- password_change_notifications
ALTER TABLE password_change_notifications ADD COLUMN IF NOT EXISTS user_id_new UUID;

-- attachments
ALTER TABLE attachments ADD COLUMN IF NOT EXISTS request_id_new UUID;

-- ============================================
-- STEP 4: Populate foreign key UUID columns
-- ============================================

-- role_permissions
UPDATE role_permissions rp SET role_id_new = r.id_new FROM roles r WHERE rp.role_id = r.id;
UPDATE role_permissions rp SET permission_id_new = p.id_new FROM permissions p WHERE rp.permission_id = p.id;

-- subscriptions
UPDATE subscriptions s SET package_id_new = p.id_new FROM packages p WHERE s.package_id = p.id;
UPDATE subscriptions s SET tenant_id_new = t.id_new FROM tenants t WHERE s.tenant_id = t.id;

-- subscription_requests
UPDATE subscription_requests sr SET package_id_new = p.id_new FROM packages p WHERE sr.package_id = p.id;
UPDATE subscription_requests sr SET tenant_id_new = t.id_new FROM tenants t WHERE sr.tenant_id = t.id;

-- tenants
UPDATE tenants t SET subscription_id_new = s.id_new FROM subscriptions s WHERE t.subscription_id = s.id;

-- users
UPDATE users u SET role_id_new = r.id_new FROM roles r WHERE u.role_id = r.id;
UPDATE users u SET subscription_id_new = s.id_new FROM subscriptions s WHERE u.subscription_id = s.id;
UPDATE users u SET tenant_id_new = t.id_new FROM tenants t WHERE u.tenant_id = t.id;

-- banks
UPDATE banks b SET tenant_id_new = t.id_new FROM tenants t WHERE b.tenant_id = t.id;

-- financing_types
UPDATE financing_types ft SET tenant_id_new = t.id_new FROM tenants t WHERE ft.tenant_id = t.id;

-- bank_financing_rates
UPDATE bank_financing_rates bfr SET bank_id_new = b.id_new FROM banks b WHERE bfr.bank_id = b.id;
UPDATE bank_financing_rates bfr SET financing_type_id_new = ft.id_new FROM financing_types ft WHERE bfr.financing_type_id = ft.id;
UPDATE bank_financing_rates bfr SET tenant_id_new = t.id_new FROM tenants t WHERE bfr.tenant_id = t.id;

-- customers
UPDATE customers c SET tenant_id_new = t.id_new FROM tenants t WHERE c.tenant_id = t.id;
UPDATE customers c SET assigned_to_new = u.id_new FROM users u WHERE c.assigned_to = u.id;
UPDATE customers c SET financing_type_id_new = ft.id_new FROM financing_types ft WHERE c.financing_type_id = ft.id;
UPDATE customers c SET best_bank_id_new = b.id_new FROM banks b WHERE c.best_bank_id = b.id;

-- financing_requests
UPDATE financing_requests fr SET customer_id_new = c.id_new FROM customers c WHERE fr.customer_id = c.id;
UPDATE financing_requests fr SET financing_type_id_new = ft.id_new FROM financing_types ft WHERE fr.financing_type_id = ft.id;
UPDATE financing_requests fr SET selected_bank_id_new = b.id_new FROM banks b WHERE fr.selected_bank_id = b.id;
UPDATE financing_requests fr SET tenant_id_new = t.id_new FROM tenants t WHERE fr.tenant_id = t.id;
UPDATE financing_requests fr SET current_stage_id_new = ws.id_new FROM workflow_stages ws WHERE fr.current_stage_id = ws.id;

-- financing_request_status_history
UPDATE financing_request_status_history frsh SET request_id_new = fr.id_new FROM financing_requests fr WHERE frsh.request_id = fr.id;
UPDATE financing_request_status_history frsh SET changed_by_new = u.id_new FROM users u WHERE frsh.changed_by = u.id;

-- customer_assignments
UPDATE customer_assignments ca SET customer_id_new = c.id_new FROM customers c WHERE ca.customer_id = c.id;
UPDATE customer_assignments ca SET employee_id_new = u.id_new FROM users u WHERE ca.employee_id = u.id;
UPDATE customer_assignments ca SET assigned_by_new = u.id_new FROM users u WHERE ca.assigned_by = u.id;

-- assignment_history
UPDATE assignment_history ah SET customer_id_new = c.id_new FROM customers c WHERE ah.customer_id = c.id;
UPDATE assignment_history ah SET old_employee_id_new = u.id_new FROM users u WHERE ah.old_employee_id = u.id;
UPDATE assignment_history ah SET new_employee_id_new = u.id_new FROM users u WHERE ah.new_employee_id = u.id;
UPDATE assignment_history ah SET changed_by_new = u.id_new FROM users u WHERE ah.changed_by = u.id;

-- notifications
UPDATE notifications n SET user_id_new = u.id_new FROM users u WHERE n.user_id = u.id;
UPDATE notifications n SET tenant_id_new = t.id_new FROM tenants t WHERE n.tenant_id = t.id;
UPDATE notifications n SET related_request_id_new = fr.id_new FROM financing_requests fr WHERE n.related_request_id = fr.id;

-- workflow_stage_transitions
UPDATE workflow_stage_transitions wst SET request_id_new = fr.id_new FROM financing_requests fr WHERE wst.request_id = fr.id;
UPDATE workflow_stage_transitions wst SET from_stage_id_new = ws.id_new FROM workflow_stages ws WHERE wst.from_stage_id = ws.id;
UPDATE workflow_stage_transitions wst SET to_stage_id_new = ws.id_new FROM workflow_stages ws WHERE wst.to_stage_id = ws.id;
UPDATE workflow_stage_transitions wst SET transitioned_by_new = u.id_new FROM users u WHERE wst.transitioned_by = u.id;

-- workflow_stage_actions
UPDATE workflow_stage_actions wsa SET request_id_new = fr.id_new FROM financing_requests fr WHERE wsa.request_id = fr.id;
UPDATE workflow_stage_actions wsa SET stage_id_new = ws.id_new FROM workflow_stages ws WHERE wsa.stage_id = ws.id;
UPDATE workflow_stage_actions wsa SET performed_by_new = u.id_new FROM users u WHERE wsa.performed_by = u.id;

-- workflow_stage_tasks
UPDATE workflow_stage_tasks wst SET request_id_new = fr.id_new FROM financing_requests fr WHERE wst.request_id = fr.id;
UPDATE workflow_stage_tasks wst SET stage_id_new = ws.id_new FROM workflow_stages ws WHERE wst.stage_id = ws.id;
UPDATE workflow_stage_tasks wst SET assigned_to_new = u.id_new FROM users u WHERE wst.assigned_to = u.id;
UPDATE workflow_stage_tasks wst SET completed_by_new = u.id_new FROM users u WHERE wst.completed_by = u.id;

-- payments
UPDATE payments p SET financing_request_id_new = fr.id_new FROM financing_requests fr WHERE p.financing_request_id = fr.id;
UPDATE payments p SET customer_id_new = c.id_new FROM customers c WHERE p.customer_id = c.id;
UPDATE payments p SET tenant_id_new = t.id_new FROM tenants t WHERE p.tenant_id = t.id;
UPDATE payments p SET employee_id_new = u.id_new FROM users u WHERE p.employee_id = u.id;
UPDATE payments p SET created_by_new = u.id_new FROM users u WHERE p.created_by = u.id;

-- calculations
UPDATE calculations calc SET user_id_new = u.id_new FROM users u WHERE calc.user_id = u.id;
UPDATE calculations calc SET subscription_id_new = s.id_new FROM subscriptions s WHERE calc.subscription_id = s.id;
UPDATE calculations calc SET financing_type_id_new = ft.id_new FROM financing_types ft WHERE calc.financing_type_id = ft.id;
UPDATE calculations calc SET bank_id_new = b.id_new FROM banks b WHERE calc.bank_id = b.id;

-- password_change_notifications
UPDATE password_change_notifications pcn SET user_id_new = u.id_new FROM users u WHERE pcn.user_id = u.id;

-- attachments
UPDATE attachments a SET request_id_new = fr.id_new FROM financing_requests fr WHERE a.request_id = fr.id;

-- ============================================
-- STEP 5: Handle tenant_id defaults (set to first active tenant where null)
-- ============================================

-- Get default tenant UUID (first active tenant)
DO $$
DECLARE
  default_tenant_uuid UUID;
BEGIN
  SELECT id_new INTO default_tenant_uuid FROM tenants WHERE status = 'active' ORDER BY created_at LIMIT 1;
  
  IF default_tenant_uuid IS NOT NULL THEN
    -- Update customers (tenant_id is NOT NULL)
    UPDATE customers SET tenant_id_new = default_tenant_uuid WHERE tenant_id_new IS NULL;
    
    -- Update financing_requests (tenant_id is NOT NULL)
    UPDATE financing_requests SET tenant_id_new = default_tenant_uuid WHERE tenant_id_new IS NULL;
    
    -- Update payments (tenant_id is NOT NULL)
    UPDATE payments SET tenant_id_new = default_tenant_uuid WHERE tenant_id_new IS NULL;
  END IF;
END $$;

-- ============================================
-- STEP 6: Drop old constraints and indexes
-- ============================================

-- Drop foreign key constraints
ALTER TABLE role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_id_fkey;
ALTER TABLE role_permissions DROP CONSTRAINT IF EXISTS role_permissions_permission_id_fkey;
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_package_id_fkey;
ALTER TABLE tenants DROP CONSTRAINT IF EXISTS tenants_subscription_id_fkey;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_id_fkey;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_subscription_id_fkey;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_tenant_id_fkey;
ALTER TABLE banks DROP CONSTRAINT IF EXISTS banks_tenant_id_fkey;
ALTER TABLE financing_types DROP CONSTRAINT IF EXISTS financing_types_tenant_id_fkey;
ALTER TABLE bank_financing_rates DROP CONSTRAINT IF EXISTS bank_financing_rates_bank_id_fkey;
ALTER TABLE bank_financing_rates DROP CONSTRAINT IF EXISTS bank_financing_rates_financing_type_id_fkey;
ALTER TABLE bank_financing_rates DROP CONSTRAINT IF EXISTS bank_financing_rates_tenant_id_fkey;
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_tenant_id_fkey;
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_assigned_to_fkey;
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_financing_type_id_fkey;
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_best_bank_id_fkey;
ALTER TABLE financing_requests DROP CONSTRAINT IF EXISTS financing_requests_customer_id_fkey;
ALTER TABLE financing_requests DROP CONSTRAINT IF EXISTS financing_requests_financing_type_id_fkey;
ALTER TABLE financing_requests DROP CONSTRAINT IF EXISTS financing_requests_selected_bank_id_fkey;
ALTER TABLE financing_requests DROP CONSTRAINT IF EXISTS financing_requests_tenant_id_fkey;
ALTER TABLE financing_request_status_history DROP CONSTRAINT IF EXISTS financing_request_status_history_request_id_fkey;
ALTER TABLE financing_request_status_history DROP CONSTRAINT IF EXISTS financing_request_status_history_changed_by_fkey;
ALTER TABLE customer_assignments DROP CONSTRAINT IF EXISTS customer_assignments_customer_id_fkey;
ALTER TABLE customer_assignments DROP CONSTRAINT IF EXISTS customer_assignments_employee_id_fkey;
ALTER TABLE customer_assignments DROP CONSTRAINT IF EXISTS customer_assignments_assigned_by_fkey;
ALTER TABLE assignment_history DROP CONSTRAINT IF EXISTS assignment_history_customer_id_fkey;
ALTER TABLE assignment_history DROP CONSTRAINT IF EXISTS assignment_history_old_employee_id_fkey;
ALTER TABLE assignment_history DROP CONSTRAINT IF EXISTS assignment_history_new_employee_id_fkey;
ALTER TABLE assignment_history DROP CONSTRAINT IF EXISTS assignment_history_changed_by_fkey;
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_user_id_fkey;
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_tenant_id_fkey;
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_related_request_id_fkey;
ALTER TABLE workflow_stage_transitions DROP CONSTRAINT IF EXISTS workflow_stage_transitions_request_id_fkey;
ALTER TABLE workflow_stage_transitions DROP CONSTRAINT IF EXISTS workflow_stage_transitions_from_stage_id_fkey;
ALTER TABLE workflow_stage_transitions DROP CONSTRAINT IF EXISTS workflow_stage_transitions_to_stage_id_fkey;
ALTER TABLE workflow_stage_transitions DROP CONSTRAINT IF EXISTS workflow_stage_transitions_transitioned_by_fkey;
ALTER TABLE workflow_stage_actions DROP CONSTRAINT IF EXISTS workflow_stage_actions_request_id_fkey;
ALTER TABLE workflow_stage_actions DROP CONSTRAINT IF EXISTS workflow_stage_actions_stage_id_fkey;
ALTER TABLE workflow_stage_actions DROP CONSTRAINT IF EXISTS workflow_stage_actions_performed_by_fkey;
ALTER TABLE workflow_stage_tasks DROP CONSTRAINT IF EXISTS workflow_stage_tasks_request_id_fkey;
ALTER TABLE workflow_stage_tasks DROP CONSTRAINT IF EXISTS workflow_stage_tasks_stage_id_fkey;
ALTER TABLE workflow_stage_tasks DROP CONSTRAINT IF EXISTS workflow_stage_tasks_assigned_to_fkey;
ALTER TABLE workflow_stage_tasks DROP CONSTRAINT IF EXISTS workflow_stage_tasks_completed_by_fkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_financing_request_id_fkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_customer_id_fkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_tenant_id_fkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_employee_id_fkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_created_by_fkey;
ALTER TABLE calculations DROP CONSTRAINT IF EXISTS calculations_user_id_fkey;
ALTER TABLE calculations DROP CONSTRAINT IF EXISTS calculations_subscription_id_fkey;
ALTER TABLE calculations DROP CONSTRAINT IF EXISTS calculations_financing_type_id_fkey;
ALTER TABLE calculations DROP CONSTRAINT IF EXISTS calculations_bank_id_fkey;
ALTER TABLE password_change_notifications DROP CONSTRAINT IF EXISTS password_change_notifications_user_id_fkey;
ALTER TABLE attachments DROP CONSTRAINT IF EXISTS attachments_request_id_fkey;

-- Drop primary key constraints
ALTER TABLE roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE permissions DROP CONSTRAINT IF EXISTS permissions_pkey;
ALTER TABLE role_permissions DROP CONSTRAINT IF EXISTS role_permissions_pkey;
ALTER TABLE packages DROP CONSTRAINT IF EXISTS packages_pkey;
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_pkey;
ALTER TABLE subscription_requests DROP CONSTRAINT IF EXISTS subscription_requests_pkey;
ALTER TABLE tenants DROP CONSTRAINT IF EXISTS tenants_pkey;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE banks DROP CONSTRAINT IF EXISTS banks_pkey;
ALTER TABLE financing_types DROP CONSTRAINT IF EXISTS financing_types_pkey;
ALTER TABLE bank_financing_rates DROP CONSTRAINT IF EXISTS bank_financing_rates_pkey;
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_pkey;
ALTER TABLE financing_requests DROP CONSTRAINT IF EXISTS financing_requests_pkey;
ALTER TABLE financing_request_status_history DROP CONSTRAINT IF EXISTS financing_request_status_history_pkey;
ALTER TABLE customer_assignments DROP CONSTRAINT IF EXISTS customer_assignments_pkey;
ALTER TABLE assignment_history DROP CONSTRAINT IF EXISTS assignment_history_pkey;
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_pkey;
ALTER TABLE workflow_stages DROP CONSTRAINT IF EXISTS workflow_stages_pkey;
ALTER TABLE workflow_stage_transitions DROP CONSTRAINT IF EXISTS workflow_stage_transitions_pkey;
ALTER TABLE workflow_stage_actions DROP CONSTRAINT IF EXISTS workflow_stage_actions_pkey;
ALTER TABLE workflow_stage_tasks DROP CONSTRAINT IF EXISTS workflow_stage_tasks_pkey;
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_pkey;
ALTER TABLE calculations DROP CONSTRAINT IF EXISTS calculations_pkey;
ALTER TABLE conversions DROP CONSTRAINT IF EXISTS conversions_pkey;
ALTER TABLE password_change_notifications DROP CONSTRAINT IF EXISTS password_change_notifications_pkey;

-- Drop unique constraints that reference old id columns
ALTER TABLE role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_perm_unique;
ALTER TABLE customer_assignments DROP CONSTRAINT IF EXISTS customer_assignments_customer_unique;

-- ============================================
-- STEP 7: Drop old INTEGER columns
-- ============================================

ALTER TABLE role_permissions DROP COLUMN IF EXISTS role_id;
ALTER TABLE role_permissions DROP COLUMN IF EXISTS permission_id;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS package_id;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE subscription_requests DROP COLUMN IF EXISTS package_id;
ALTER TABLE subscription_requests DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE tenants DROP COLUMN IF EXISTS subscription_id;
ALTER TABLE users DROP COLUMN IF EXISTS role_id;
ALTER TABLE users DROP COLUMN IF EXISTS subscription_id;
ALTER TABLE users DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE banks DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE financing_types DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE bank_financing_rates DROP COLUMN IF EXISTS bank_id;
ALTER TABLE bank_financing_rates DROP COLUMN IF EXISTS financing_type_id;
ALTER TABLE bank_financing_rates DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE customers DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE customers DROP COLUMN IF EXISTS assigned_to;
ALTER TABLE customers DROP COLUMN IF EXISTS financing_type_id;
ALTER TABLE customers DROP COLUMN IF EXISTS best_bank_id;
ALTER TABLE financing_requests DROP COLUMN IF EXISTS customer_id;
ALTER TABLE financing_requests DROP COLUMN IF EXISTS financing_type_id;
ALTER TABLE financing_requests DROP COLUMN IF EXISTS selected_bank_id;
ALTER TABLE financing_requests DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE financing_requests DROP COLUMN IF EXISTS current_stage_id;
ALTER TABLE financing_request_status_history DROP COLUMN IF EXISTS request_id;
ALTER TABLE financing_request_status_history DROP COLUMN IF EXISTS changed_by;
ALTER TABLE customer_assignments DROP COLUMN IF EXISTS customer_id;
ALTER TABLE customer_assignments DROP COLUMN IF EXISTS employee_id;
ALTER TABLE customer_assignments DROP COLUMN IF EXISTS assigned_by;
ALTER TABLE assignment_history DROP COLUMN IF EXISTS customer_id;
ALTER TABLE assignment_history DROP COLUMN IF EXISTS old_employee_id;
ALTER TABLE assignment_history DROP COLUMN IF EXISTS new_employee_id;
ALTER TABLE assignment_history DROP COLUMN IF EXISTS changed_by;
ALTER TABLE notifications DROP COLUMN IF EXISTS user_id;
ALTER TABLE notifications DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE notifications DROP COLUMN IF EXISTS related_request_id;
ALTER TABLE workflow_stage_transitions DROP COLUMN IF EXISTS request_id;
ALTER TABLE workflow_stage_transitions DROP COLUMN IF EXISTS from_stage_id;
ALTER TABLE workflow_stage_transitions DROP COLUMN IF EXISTS to_stage_id;
ALTER TABLE workflow_stage_transitions DROP COLUMN IF EXISTS transitioned_by;
ALTER TABLE workflow_stage_actions DROP COLUMN IF EXISTS request_id;
ALTER TABLE workflow_stage_actions DROP COLUMN IF EXISTS stage_id;
ALTER TABLE workflow_stage_actions DROP COLUMN IF EXISTS performed_by;
ALTER TABLE workflow_stage_tasks DROP COLUMN IF EXISTS request_id;
ALTER TABLE workflow_stage_tasks DROP COLUMN IF EXISTS stage_id;
ALTER TABLE workflow_stage_tasks DROP COLUMN IF EXISTS assigned_to;
ALTER TABLE workflow_stage_tasks DROP COLUMN IF EXISTS completed_by;
ALTER TABLE payments DROP COLUMN IF EXISTS financing_request_id;
ALTER TABLE payments DROP COLUMN IF EXISTS customer_id;
ALTER TABLE payments DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE payments DROP COLUMN IF EXISTS employee_id;
ALTER TABLE payments DROP COLUMN IF EXISTS created_by;
ALTER TABLE calculations DROP COLUMN IF EXISTS user_id;
ALTER TABLE calculations DROP COLUMN IF EXISTS subscription_id;
ALTER TABLE calculations DROP COLUMN IF EXISTS financing_type_id;
ALTER TABLE calculations DROP COLUMN IF EXISTS bank_id;
ALTER TABLE password_change_notifications DROP COLUMN IF EXISTS user_id;
ALTER TABLE attachments DROP COLUMN IF EXISTS request_id;

-- Drop old primary key INTEGER columns
ALTER TABLE roles DROP COLUMN IF EXISTS id;
ALTER TABLE permissions DROP COLUMN IF EXISTS id;
ALTER TABLE role_permissions DROP COLUMN IF EXISTS id;
ALTER TABLE packages DROP COLUMN IF EXISTS id;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS id;
ALTER TABLE subscription_requests DROP COLUMN IF EXISTS id;
ALTER TABLE tenants DROP COLUMN IF EXISTS id;
ALTER TABLE users DROP COLUMN IF EXISTS id;
ALTER TABLE banks DROP COLUMN IF EXISTS id;
ALTER TABLE financing_types DROP COLUMN IF EXISTS id;
ALTER TABLE bank_financing_rates DROP COLUMN IF EXISTS id;
ALTER TABLE customers DROP COLUMN IF EXISTS id;
ALTER TABLE financing_requests DROP COLUMN IF EXISTS id;
ALTER TABLE financing_request_status_history DROP COLUMN IF EXISTS id;
ALTER TABLE customer_assignments DROP COLUMN IF EXISTS id;
ALTER TABLE assignment_history DROP COLUMN IF EXISTS id;
ALTER TABLE notifications DROP COLUMN IF EXISTS id;
ALTER TABLE workflow_stages DROP COLUMN IF EXISTS id;
ALTER TABLE workflow_stage_transitions DROP COLUMN IF EXISTS id;
ALTER TABLE workflow_stage_actions DROP COLUMN IF EXISTS id;
ALTER TABLE workflow_stage_tasks DROP COLUMN IF EXISTS id;
ALTER TABLE payments DROP COLUMN IF EXISTS id;
ALTER TABLE calculations DROP COLUMN IF EXISTS id;
ALTER TABLE conversions DROP COLUMN IF EXISTS id;
ALTER TABLE password_change_notifications DROP COLUMN IF EXISTS id;

-- ============================================
-- STEP 8: Rename UUID columns to replace INTEGER ones
-- ============================================

ALTER TABLE roles RENAME COLUMN id_new TO id;
ALTER TABLE permissions RENAME COLUMN id_new TO id;
ALTER TABLE role_permissions RENAME COLUMN id_new TO id;
ALTER TABLE packages RENAME COLUMN id_new TO id;
ALTER TABLE subscriptions RENAME COLUMN id_new TO id;
ALTER TABLE subscription_requests RENAME COLUMN id_new TO id;
ALTER TABLE tenants RENAME COLUMN id_new TO id;
ALTER TABLE users RENAME COLUMN id_new TO id;
ALTER TABLE banks RENAME COLUMN id_new TO id;
ALTER TABLE financing_types RENAME COLUMN id_new TO id;
ALTER TABLE bank_financing_rates RENAME COLUMN id_new TO id;
ALTER TABLE customers RENAME COLUMN id_new TO id;
ALTER TABLE financing_requests RENAME COLUMN id_new TO id;
ALTER TABLE financing_request_status_history RENAME COLUMN id_new TO id;
ALTER TABLE customer_assignments RENAME COLUMN id_new TO id;
ALTER TABLE assignment_history RENAME COLUMN id_new TO id;
ALTER TABLE notifications RENAME COLUMN id_new TO id;
ALTER TABLE workflow_stages RENAME COLUMN id_new TO id;
ALTER TABLE workflow_stage_transitions RENAME COLUMN id_new TO id;
ALTER TABLE workflow_stage_actions RENAME COLUMN id_new TO id;
ALTER TABLE workflow_stage_tasks RENAME COLUMN id_new TO id;
ALTER TABLE payments RENAME COLUMN id_new TO id;
ALTER TABLE calculations RENAME COLUMN id_new TO id;
ALTER TABLE conversions RENAME COLUMN id_new TO id;
ALTER TABLE password_change_notifications RENAME COLUMN id_new TO id;

-- Foreign keys
ALTER TABLE role_permissions RENAME COLUMN role_id_new TO role_id;
ALTER TABLE role_permissions RENAME COLUMN permission_id_new TO permission_id;
ALTER TABLE subscriptions RENAME COLUMN package_id_new TO package_id;
ALTER TABLE subscriptions RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE subscription_requests RENAME COLUMN package_id_new TO package_id;
ALTER TABLE subscription_requests RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE tenants RENAME COLUMN subscription_id_new TO subscription_id;
ALTER TABLE users RENAME COLUMN role_id_new TO role_id;
ALTER TABLE users RENAME COLUMN subscription_id_new TO subscription_id;
ALTER TABLE users RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE banks RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE financing_types RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE bank_financing_rates RENAME COLUMN bank_id_new TO bank_id;
ALTER TABLE bank_financing_rates RENAME COLUMN financing_type_id_new TO financing_type_id;
ALTER TABLE bank_financing_rates RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE customers RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE customers RENAME COLUMN assigned_to_new TO assigned_to;
ALTER TABLE customers RENAME COLUMN financing_type_id_new TO financing_type_id;
ALTER TABLE customers RENAME COLUMN best_bank_id_new TO best_bank_id;
ALTER TABLE financing_requests RENAME COLUMN customer_id_new TO customer_id;
ALTER TABLE financing_requests RENAME COLUMN financing_type_id_new TO financing_type_id;
ALTER TABLE financing_requests RENAME COLUMN selected_bank_id_new TO selected_bank_id;
ALTER TABLE financing_requests RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE financing_requests RENAME COLUMN current_stage_id_new TO current_stage_id;
ALTER TABLE financing_request_status_history RENAME COLUMN request_id_new TO request_id;
ALTER TABLE financing_request_status_history RENAME COLUMN changed_by_new TO changed_by;
ALTER TABLE customer_assignments RENAME COLUMN customer_id_new TO customer_id;
ALTER TABLE customer_assignments RENAME COLUMN employee_id_new TO employee_id;
ALTER TABLE customer_assignments RENAME COLUMN assigned_by_new TO assigned_by;
ALTER TABLE assignment_history RENAME COLUMN customer_id_new TO customer_id;
ALTER TABLE assignment_history RENAME COLUMN old_employee_id_new TO old_employee_id;
ALTER TABLE assignment_history RENAME COLUMN new_employee_id_new TO new_employee_id;
ALTER TABLE assignment_history RENAME COLUMN changed_by_new TO changed_by;
ALTER TABLE notifications RENAME COLUMN user_id_new TO user_id;
ALTER TABLE notifications RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE notifications RENAME COLUMN related_request_id_new TO related_request_id;
ALTER TABLE workflow_stage_transitions RENAME COLUMN request_id_new TO request_id;
ALTER TABLE workflow_stage_transitions RENAME COLUMN from_stage_id_new TO from_stage_id;
ALTER TABLE workflow_stage_transitions RENAME COLUMN to_stage_id_new TO to_stage_id;
ALTER TABLE workflow_stage_transitions RENAME COLUMN transitioned_by_new TO transitioned_by;
ALTER TABLE workflow_stage_actions RENAME COLUMN request_id_new TO request_id;
ALTER TABLE workflow_stage_actions RENAME COLUMN stage_id_new TO stage_id;
ALTER TABLE workflow_stage_actions RENAME COLUMN performed_by_new TO performed_by;
ALTER TABLE workflow_stage_tasks RENAME COLUMN request_id_new TO request_id;
ALTER TABLE workflow_stage_tasks RENAME COLUMN stage_id_new TO stage_id;
ALTER TABLE workflow_stage_tasks RENAME COLUMN assigned_to_new TO assigned_to;
ALTER TABLE workflow_stage_tasks RENAME COLUMN completed_by_new TO completed_by;
ALTER TABLE payments RENAME COLUMN financing_request_id_new TO financing_request_id;
ALTER TABLE payments RENAME COLUMN customer_id_new TO customer_id;
ALTER TABLE payments RENAME COLUMN tenant_id_new TO tenant_id;
ALTER TABLE payments RENAME COLUMN employee_id_new TO employee_id;
ALTER TABLE payments RENAME COLUMN created_by_new TO created_by;
ALTER TABLE calculations RENAME COLUMN user_id_new TO user_id;
ALTER TABLE calculations RENAME COLUMN subscription_id_new TO subscription_id;
ALTER TABLE calculations RENAME COLUMN financing_type_id_new TO financing_type_id;
ALTER TABLE calculations RENAME COLUMN bank_id_new TO bank_id;
ALTER TABLE password_change_notifications RENAME COLUMN user_id_new TO user_id;
ALTER TABLE attachments RENAME COLUMN request_id_new TO request_id;

-- ============================================
-- STEP 9: Recreate primary key constraints with UUID
-- ============================================

ALTER TABLE roles ADD PRIMARY KEY (id);
ALTER TABLE permissions ADD PRIMARY KEY (id);
ALTER TABLE role_permissions ADD PRIMARY KEY (id);
ALTER TABLE packages ADD PRIMARY KEY (id);
ALTER TABLE subscriptions ADD PRIMARY KEY (id);
ALTER TABLE subscription_requests ADD PRIMARY KEY (id);
ALTER TABLE tenants ADD PRIMARY KEY (id);
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE banks ADD PRIMARY KEY (id);
ALTER TABLE financing_types ADD PRIMARY KEY (id);
ALTER TABLE bank_financing_rates ADD PRIMARY KEY (id);
ALTER TABLE customers ADD PRIMARY KEY (id);
ALTER TABLE financing_requests ADD PRIMARY KEY (id);
ALTER TABLE financing_request_status_history ADD PRIMARY KEY (id);
ALTER TABLE customer_assignments ADD PRIMARY KEY (id);
ALTER TABLE assignment_history ADD PRIMARY KEY (id);
ALTER TABLE notifications ADD PRIMARY KEY (id);
ALTER TABLE workflow_stages ADD PRIMARY KEY (id);
ALTER TABLE workflow_stage_transitions ADD PRIMARY KEY (id);
ALTER TABLE workflow_stage_actions ADD PRIMARY KEY (id);
ALTER TABLE workflow_stage_tasks ADD PRIMARY KEY (id);
ALTER TABLE payments ADD PRIMARY KEY (id);
ALTER TABLE calculations ADD PRIMARY KEY (id);
ALTER TABLE conversions ADD PRIMARY KEY (id);
ALTER TABLE password_change_notifications ADD PRIMARY KEY (id);

-- ============================================
-- STEP 10: Recreate foreign key constraints with UUID
-- ============================================

ALTER TABLE role_permissions ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;
ALTER TABLE role_permissions ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_package_id_fkey FOREIGN KEY (package_id) REFERENCES packages(id);
ALTER TABLE tenants ADD CONSTRAINT tenants_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES subscriptions(id);
ALTER TABLE users ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id);
ALTER TABLE users ADD CONSTRAINT users_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES subscriptions(id);
ALTER TABLE users ADD CONSTRAINT users_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL;
ALTER TABLE banks ADD CONSTRAINT banks_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL;
ALTER TABLE financing_types ADD CONSTRAINT financing_types_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL;
ALTER TABLE bank_financing_rates ADD CONSTRAINT bank_financing_rates_bank_id_fkey FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE CASCADE;
ALTER TABLE bank_financing_rates ADD CONSTRAINT bank_financing_rates_financing_type_id_fkey FOREIGN KEY (financing_type_id) REFERENCES financing_types(id) ON DELETE CASCADE;
ALTER TABLE bank_financing_rates ADD CONSTRAINT bank_financing_rates_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL;
ALTER TABLE customers ADD CONSTRAINT customers_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE customers ADD CONSTRAINT customers_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE customers ADD CONSTRAINT customers_financing_type_id_fkey FOREIGN KEY (financing_type_id) REFERENCES financing_types(id) ON DELETE SET NULL;
ALTER TABLE customers ADD CONSTRAINT customers_best_bank_id_fkey FOREIGN KEY (best_bank_id) REFERENCES banks(id) ON DELETE SET NULL;
ALTER TABLE financing_requests ADD CONSTRAINT financing_requests_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
ALTER TABLE financing_requests ADD CONSTRAINT financing_requests_financing_type_id_fkey FOREIGN KEY (financing_type_id) REFERENCES financing_types(id) ON DELETE SET NULL;
ALTER TABLE financing_requests ADD CONSTRAINT financing_requests_selected_bank_id_fkey FOREIGN KEY (selected_bank_id) REFERENCES banks(id) ON DELETE SET NULL;
ALTER TABLE financing_requests ADD CONSTRAINT financing_requests_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE financing_request_status_history ADD CONSTRAINT financing_request_status_history_request_id_fkey FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;
ALTER TABLE financing_request_status_history ADD CONSTRAINT financing_request_status_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE customer_assignments ADD CONSTRAINT customer_assignments_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
ALTER TABLE customer_assignments ADD CONSTRAINT customer_assignments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE customer_assignments ADD CONSTRAINT customer_assignments_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE assignment_history ADD CONSTRAINT assignment_history_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
ALTER TABLE assignment_history ADD CONSTRAINT assignment_history_old_employee_id_fkey FOREIGN KEY (old_employee_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE assignment_history ADD CONSTRAINT assignment_history_new_employee_id_fkey FOREIGN KEY (new_employee_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE assignment_history ADD CONSTRAINT assignment_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE notifications ADD CONSTRAINT notifications_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE notifications ADD CONSTRAINT notifications_related_request_id_fkey FOREIGN KEY (related_request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;
ALTER TABLE workflow_stage_transitions ADD CONSTRAINT workflow_stage_transitions_request_id_fkey FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;
ALTER TABLE workflow_stage_transitions ADD CONSTRAINT workflow_stage_transitions_from_stage_id_fkey FOREIGN KEY (from_stage_id) REFERENCES workflow_stages(id) ON DELETE SET NULL;
ALTER TABLE workflow_stage_transitions ADD CONSTRAINT workflow_stage_transitions_to_stage_id_fkey FOREIGN KEY (to_stage_id) REFERENCES workflow_stages(id);
ALTER TABLE workflow_stage_transitions ADD CONSTRAINT workflow_stage_transitions_transitioned_by_fkey FOREIGN KEY (transitioned_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE workflow_stage_actions ADD CONSTRAINT workflow_stage_actions_request_id_fkey FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;
ALTER TABLE workflow_stage_actions ADD CONSTRAINT workflow_stage_actions_stage_id_fkey FOREIGN KEY (stage_id) REFERENCES workflow_stages(id);
ALTER TABLE workflow_stage_actions ADD CONSTRAINT workflow_stage_actions_performed_by_fkey FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE workflow_stage_tasks ADD CONSTRAINT workflow_stage_tasks_request_id_fkey FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;
ALTER TABLE workflow_stage_tasks ADD CONSTRAINT workflow_stage_tasks_stage_id_fkey FOREIGN KEY (stage_id) REFERENCES workflow_stages(id);
ALTER TABLE workflow_stage_tasks ADD CONSTRAINT workflow_stage_tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE workflow_stage_tasks ADD CONSTRAINT workflow_stage_tasks_completed_by_fkey FOREIGN KEY (completed_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE payments ADD CONSTRAINT payments_financing_request_id_fkey FOREIGN KEY (financing_request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;
ALTER TABLE payments ADD CONSTRAINT payments_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
ALTER TABLE payments ADD CONSTRAINT payments_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE payments ADD CONSTRAINT payments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE payments ADD CONSTRAINT payments_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE calculations ADD CONSTRAINT calculations_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE calculations ADD CONSTRAINT calculations_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL;
ALTER TABLE calculations ADD CONSTRAINT calculations_financing_type_id_fkey FOREIGN KEY (financing_type_id) REFERENCES financing_types(id) ON DELETE SET NULL;
ALTER TABLE calculations ADD CONSTRAINT calculations_bank_id_fkey FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE SET NULL;
ALTER TABLE password_change_notifications ADD CONSTRAINT password_change_notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE attachments ADD CONSTRAINT attachments_request_id_fkey FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE;

-- ============================================
-- STEP 11: Recreate unique constraints
-- ============================================

ALTER TABLE role_permissions ADD CONSTRAINT role_permissions_role_perm_unique UNIQUE (role_id, permission_id);
ALTER TABLE customer_assignments ADD CONSTRAINT customer_assignments_customer_unique UNIQUE (customer_id);

-- ============================================
-- STEP 12: Recreate indexes with UUID columns
-- ============================================

CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_permissions_category ON permissions(category);
CREATE INDEX IF NOT EXISTS idx_permissions_key ON permissions(permission_key);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_banks_tenant ON banks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_financing_types_tenant ON financing_types(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rates_tenant ON bank_financing_rates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_customers_tenant ON customers(tenant_id);
CREATE INDEX IF NOT EXISTS idx_customers_assigned_to ON customers(assigned_to);
CREATE INDEX IF NOT EXISTS idx_customers_financing_type ON customers(financing_type_id);
CREATE INDEX IF NOT EXISTS idx_customers_best_bank ON customers(best_bank_id);
CREATE INDEX IF NOT EXISTS idx_customers_calculation_date ON customers(calculation_date);
CREATE INDEX IF NOT EXISTS idx_requests_tenant ON financing_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_requests_customer ON financing_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_financing_requests_status_timestamps ON financing_requests(pending_at, under_review_at, processing_at, approved_at, rejected_at);
CREATE INDEX IF NOT EXISTS idx_status_history_request ON financing_request_status_history(request_id);
CREATE INDEX IF NOT EXISTS idx_status_history_status ON financing_request_status_history(new_status);
CREATE INDEX IF NOT EXISTS idx_status_history_date ON financing_request_status_history(created_at);
CREATE INDEX IF NOT EXISTS idx_assignments_customer ON customer_assignments(customer_id);
CREATE INDEX IF NOT EXISTS idx_assignments_employee ON customer_assignments(employee_id);
CREATE INDEX IF NOT EXISTS idx_assignments_date ON customer_assignments(assigned_at);
CREATE INDEX IF NOT EXISTS idx_assignment_history_customer ON assignment_history(customer_id);
CREATE INDEX IF NOT EXISTS idx_assignment_history_employee ON assignment_history(new_employee_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_request ON notifications(related_request_id);
CREATE INDEX IF NOT EXISTS idx_notifications_tenant ON notifications(tenant_id);
CREATE INDEX IF NOT EXISTS idx_transitions_request ON workflow_stage_transitions(request_id);
CREATE INDEX IF NOT EXISTS idx_transitions_stage ON workflow_stage_transitions(to_stage_id);
CREATE INDEX IF NOT EXISTS idx_actions_request ON workflow_stage_actions(request_id);
CREATE INDEX IF NOT EXISTS idx_tasks_request ON workflow_stage_tasks(request_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON workflow_stage_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON workflow_stage_tasks(status);
CREATE INDEX IF NOT EXISTS idx_payments_tenant ON payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payments_request ON payments(financing_request_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_employee ON payments(employee_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_attachments_request ON attachments(request_id);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);

-- ============================================
-- STEP 13: Set default UUID generation for new rows
-- ============================================

-- Add DEFAULT gen_random_uuid() to all primary key columns
ALTER TABLE roles ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE permissions ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE role_permissions ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE packages ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE subscriptions ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE subscription_requests ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE tenants ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE banks ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE financing_types ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE bank_financing_rates ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE customers ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE financing_requests ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE financing_request_status_history ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE customer_assignments ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE assignment_history ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE notifications ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE workflow_stages ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE workflow_stage_transitions ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE workflow_stage_actions ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE workflow_stage_tasks ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE payments ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE calculations ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE conversions ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE password_change_notifications ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- ============================================
-- STEP 14: Verification and cleanup
-- ============================================

-- Verify all primary keys are now UUIDs
DO $$
DECLARE
  table_name TEXT;
  column_type TEXT;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
    AND tablename IN (
      'roles', 'permissions', 'role_permissions', 'packages', 'subscriptions',
      'subscription_requests', 'tenants', 'users', 'banks', 'financing_types',
      'bank_financing_rates', 'customers', 'financing_requests',
      'financing_request_status_history', 'customer_assignments', 'assignment_history',
      'notifications', 'workflow_stages', 'workflow_stage_transitions',
      'workflow_stage_actions', 'workflow_stage_tasks', 'payments',
      'calculations', 'conversions', 'password_change_notifications'
    )
  LOOP
    SELECT data_type INTO column_type
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = table_name AND column_name = 'id';
    
    IF column_type != 'uuid' THEN
      RAISE WARNING 'Table % still has non-UUID id column (type: %)', table_name, column_type;
    END IF;
  END LOOP;
END $$;

-- Migration complete!
-- All INTEGER primary keys and foreign keys have been converted to UUIDs.
-- All tenant_id columns that require NOT NULL have been populated with default tenant.
-- New rows will automatically get UUIDs via DEFAULT gen_random_uuid().

