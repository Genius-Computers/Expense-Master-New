-- Migration: Add tenant_id to banks and financing_rates tables
-- This allows each tenant to manage their own banks and rates

-- Add tenant_id to banks table
ALTER TABLE banks ADD COLUMN tenant_id INTEGER REFERENCES tenants(id);

-- Add tenant_id to bank_financing_rates table  
ALTER TABLE bank_financing_rates ADD COLUMN tenant_id INTEGER REFERENCES tenants(id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_banks_tenant_id ON banks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bank_financing_rates_tenant_id ON bank_financing_rates(tenant_id);

-- Update existing banks to be global (null tenant_id means available to all)
-- Existing banks will remain accessible to all tenants
