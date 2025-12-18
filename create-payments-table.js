// Simple script to create payments table
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find the database file
const wranglerDir = join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');

if (!existsSync(wranglerDir)) {
  console.error('❌ Wrangler directory not found');
  process.exit(1);
}

const dbFiles = readdirSync(wranglerDir).filter(f => f.endsWith('.sqlite'));

if (dbFiles.length === 0) {
  console.error('❌ No database file found');
  process.exit(1);
}

const dbPath = join(wranglerDir, dbFiles[0]);
console.log('📁 Found database:', dbPath);

try {
  const db = new Database(dbPath);
  
  // Create payments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      financing_request_id INTEGER NOT NULL,
      customer_id INTEGER NOT NULL,
      tenant_id INTEGER NOT NULL,
      employee_id INTEGER,
      amount REAL NOT NULL,
      payment_date TEXT NOT NULL,
      payment_method TEXT DEFAULT 'cash',
      receipt_number TEXT,
      notes TEXT,
      created_by INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log('✅ Payments table created');
  
  // Create indexes
  db.exec('CREATE INDEX IF NOT EXISTS idx_payments_tenant ON payments(tenant_id)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_payments_request ON payments(financing_request_id)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_payments_employee ON payments(employee_id)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date)');
  
  console.log('✅ Indexes created');
  
  // Verify table exists
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='payments'").all();
  
  if (tables.length > 0) {
    console.log('✅ Table verified: payments');
  } else {
    console.error('❌ Table creation failed');
  }
  
  db.close();
  console.log('✅ Database closed');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
