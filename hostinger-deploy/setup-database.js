import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔄 Connecting to MySQL server...');
    
    // Connect to MySQL server (without database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL server');

    const dbName = process.env.DB_NAME || 'tamweel';

    // Create database if not exists
    console.log(`🔄 Creating database ${dbName}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database ${dbName} created`);

    // Use the database
    await connection.query(`USE \`${dbName}\``);

    // Create tables
    console.log('🔄 Creating tables...');

    // Tenants table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS tenants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tenants table created');

    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role ENUM('superadmin', 'admin', 'employee') DEFAULT 'employee',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Users table created');

    // Banks table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS banks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Banks table created');

    // Financing types table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS financing_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Financing types table created');

    // Rates table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS rates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        bank_id INT NOT NULL,
        financing_type_id INT NOT NULL,
        rate DECIMAL(5,2) NOT NULL,
        min_amount DECIMAL(12,2) DEFAULT 0,
        max_amount DECIMAL(12,2) DEFAULT 0,
        min_duration INT DEFAULT 0,
        max_duration INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE CASCADE,
        FOREIGN KEY (financing_type_id) REFERENCES financing_types(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Rates table created');

    // Customers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255),
        national_id VARCHAR(50),
        employment_type VARCHAR(100),
        monthly_salary DECIMAL(12,2),
        monthly_obligations DECIMAL(12,2),
        assigned_to INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Customers table created');

    // Financing requests table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS financing_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        customer_id INT NOT NULL,
        bank_id INT,
        financing_type_id INT,
        amount DECIMAL(12,2) NOT NULL,
        duration INT NOT NULL,
        status ENUM('pending', 'under_review', 'approved', 'rejected', 'completed') DEFAULT 'pending',
        assigned_to INT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE SET NULL,
        FOREIGN KEY (financing_type_id) REFERENCES financing_types(id) ON DELETE SET NULL,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Financing requests table created');

    // Payments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        customer_id INT NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        payment_date DATE NOT NULL,
        payment_method VARCHAR(100),
        receipt_number VARCHAR(100),
        notes TEXT,
        assigned_to INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Payments table created');

    // Insert sample data
    console.log('🔄 Inserting sample data...');

    // Check if data already exists
    const [tenants] = await connection.query('SELECT COUNT(*) as count FROM tenants');
    
    if (tenants[0].count === 0) {
      // Insert tenant
      await connection.query(`
        INSERT INTO tenants (name, is_active) VALUES 
        ('شركة التمويل الأولى', TRUE)
      `);

      // Insert users
      await connection.query(`
        INSERT INTO users (tenant_id, username, password, full_name, role) VALUES 
        (1, 'superadmin', 'SuperAdmin@2025', 'المدير العام', 'superadmin'),
        (1, 'admin', 'Admin@2025', 'مدير النظام', 'admin'),
        (1, 'admin1', 'Admin1@2025', 'موظف 1', 'employee')
      `);

      // Insert sample banks
      await connection.query(`
        INSERT INTO banks (tenant_id, name) VALUES 
        (1, 'بنك الراجحي'),
        (1, 'البنك الأهلي'),
        (1, 'بنك الرياض'),
        (1, 'بنك ساب')
      `);

      // Insert financing types
      await connection.query(`
        INSERT INTO financing_types (tenant_id, name) VALUES 
        (1, 'تمويل شخصي'),
        (1, 'تمويل عقاري'),
        (1, 'تمويل سيارات')
      `);

      // Insert sample rates
      await connection.query(`
        INSERT INTO rates (tenant_id, bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration) VALUES 
        (1, 1, 1, 5.50, 10000, 500000, 12, 60),
        (1, 2, 1, 5.75, 10000, 500000, 12, 60),
        (1, 1, 2, 4.50, 100000, 2000000, 60, 300),
        (1, 3, 3, 6.00, 20000, 300000, 12, 84)
      `);

      console.log('✅ Sample data inserted');
    } else {
      console.log('ℹ️  Sample data already exists, skipping...');
    }

    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║  ✅ Database setup completed successfully!     ║');
    console.log('╚════════════════════════════════════════════════╝\n');
    console.log('📝 Default accounts:');
    console.log('   Superadmin: superadmin / SuperAdmin@2025');
    console.log('   Admin:      admin / Admin@2025');
    console.log('   Employee:   admin1 / Admin1@2025\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
