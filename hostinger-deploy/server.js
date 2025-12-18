import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection pool
let db;
async function initDatabase() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tamweel',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
}));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== AUTH ROUTES ====================

// Login page
app.get('/login', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'login.html'));
});

// Login API
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'اسم المستخدم وكلمة المرور مطلوبة' });
    }

    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }

    const user = users[0];
    
    // Create session token (simple base64 for now)
    const token = Buffer.from(JSON.stringify({
      id: user.id,
      username: user.username,
      role: user.role,
      tenant_id: user.tenant_id
    })).toString('base64');

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        tenant_id: user.tenant_id
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في تسجيل الدخول' });
  }
});

// Logout API
app.post('/api/logout', (req, res) => {
  res.json({ success: true });
});

// ==================== MIDDLEWARE ====================

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'غير مصرح' });
    }

    const userData = JSON.parse(Buffer.from(token, 'base64').toString());
    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'توكن غير صالح' });
  }
};

// ==================== API ROUTES ====================

// Get all tenants (superadmin only)
app.get('/api/tenants', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ success: false, error: 'غير مصرح' });
    }

    const [tenants] = await db.query('SELECT * FROM tenants ORDER BY name');
    res.json(tenants);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب الشركات' });
  }
});

// Get all banks
app.get('/api/banks', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.query.tenant_id || req.user.tenant_id;
    
    const [banks] = await db.query(
      'SELECT * FROM banks WHERE tenant_id = ? AND is_active = 1 ORDER BY name',
      [tenantId]
    );
    
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب البنوك' });
  }
});

// Get financing types
app.get('/api/financing-types', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.query.tenant_id || req.user.tenant_id;
    
    const [types] = await db.query(
      'SELECT * FROM financing_types WHERE tenant_id = ? AND is_active = 1 ORDER BY name',
      [tenantId]
    );
    
    res.json(types);
  } catch (error) {
    console.error('Error fetching financing types:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب أنواع التمويل' });
  }
});

// Get rates
app.get('/api/rates', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.query.tenant_id || req.user.tenant_id;
    
    const [rates] = await db.query(`
      SELECT r.*, b.name as bank_name, ft.name as financing_type_name
      FROM rates r
      LEFT JOIN banks b ON r.bank_id = b.id
      LEFT JOIN financing_types ft ON r.financing_type_id = ft.id
      WHERE r.tenant_id = ?
      ORDER BY b.name, ft.name
    `, [tenantId]);
    
    res.json(rates);
  } catch (error) {
    console.error('Error fetching rates:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب النسب' });
  }
});

// Add rate
app.post('/api/rates', authMiddleware, async (req, res) => {
  try {
    const { bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration } = req.body;
    const tenantId = req.user.tenant_id;

    const [result] = await db.query(`
      INSERT INTO rates (tenant_id, bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [tenantId, bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration]);

    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding rate:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في إضافة النسبة' });
  }
});

// Update rate
app.put('/api/rates/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration } = req.body;

    await db.query(`
      UPDATE rates 
      SET bank_id = ?, financing_type_id = ?, rate = ?, min_amount = ?, max_amount = ?, min_duration = ?, max_duration = ?
      WHERE id = ? AND tenant_id = ?
    `, [bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration, id, req.user.tenant_id]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating rate:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في تحديث النسبة' });
  }
});

// Delete rate
app.delete('/api/rates/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM rates WHERE id = ? AND tenant_id = ?', [id, req.user.tenant_id]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting rate:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في حذف النسبة' });
  }
});

// Get customers
app.get('/api/customers', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.query.tenant_id || req.user.tenant_id;
    
    const [customers] = await db.query(
      'SELECT * FROM customers WHERE tenant_id = ? ORDER BY created_at DESC',
      [tenantId]
    );
    
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب العملاء' });
  }
});

// Get financing requests
app.get('/api/requests', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.query.tenant_id || req.user.tenant_id;
    
    const [requests] = await db.query(`
      SELECT fr.*, c.full_name as customer_name, b.name as bank_name, u.full_name as employee_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.bank_id = b.id
      LEFT JOIN users u ON fr.assigned_to = u.id
      WHERE fr.tenant_id = ?
      ORDER BY fr.created_at DESC
    `, [tenantId]);
    
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب الطلبات' });
  }
});

// Get payments
app.get('/api/payments', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.query.tenant_id || req.user.tenant_id;
    
    const [payments] = await db.query(`
      SELECT p.*, c.full_name as customer_name, u.full_name as employee_name
      FROM payments p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN users u ON p.assigned_to = u.id
      WHERE p.tenant_id = ?
      ORDER BY p.created_at DESC
    `, [tenantId]);
    
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في جلب المدفوعات' });
  }
});

// ==================== HTML PAGES ====================

// Home page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Admin pages will be served from public folder
app.get('/admin/*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'admin.html'));
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'حدث خطأ في الخادم' 
  });
});

// ==================== START SERVER ====================

async function startServer() {
  await initDatabase();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   🚀 Tamweel Finance System                    ║
║   📡 Server running on port ${PORT}              ║
║   🌐 http://localhost:${PORT}                    ║
║   ✅ Database connected                        ║
╚════════════════════════════════════════════════╝
    `);
  });
}

startServer().catch(console.error);
