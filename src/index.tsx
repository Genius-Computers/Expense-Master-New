import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { homePage } from './home-page'
import { testPage } from './test-page'
import { calculatorPage } from './calculator-page'
import { smartCalculator } from './smart-calculator'
import { loginPage } from './login-page'
import { forgotPasswordPage } from './forgot-password-page'
import { packagesPage } from './packages-page'
import { subscribePage } from './subscribe-page'
import { fullAdminPanel } from './full-admin-panel'
import { tenantsPage } from './tenants-page'
import { tenantCalculatorsPage } from './tenant-calculators-page'
import { saasSettingsPage } from './saas-settings-page'
import { reportsPage } from './reports-page'
import { banksManagementPage } from './banks-management-page'

type Bindings = {
  DB: D1Database;
  ATTACHMENTS: R2Bucket;
}

type Variables = {
  tenant: any;
  tenantId: number | null;
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Enable CORS
app.use('*', cors())

// ===================================
// MULTI-TENANT MIDDLEWARE & HELPERS
// ===================================

// Helper: Get tenant from subdomain or slug
async function getTenant(c: any): Promise<any> {
  // Try to get from subdomain first (e.g., tamweel1.tamweel.app)
  const host = c.req.header('host') || ''
  const subdomain = host.split('.')[0]
  
  // Try to get from URL path (e.g., /c/tamweel-1/calculator)
  const pathMatch = c.req.path.match(/^\/c\/([^\/]+)/)
  const slug = pathMatch ? pathMatch[1] : null
  
  // Search in database
  let tenant = null
  
  if (subdomain && subdomain !== 'localhost' && subdomain !== '3000-ii8t2q2dzwwe7ckmslxss-3844e1b6') {
    tenant = await c.env.DB.prepare(`
      SELECT * FROM tenants 
      WHERE subdomain = ? AND status = 'active'
      LIMIT 1
    `).bind(subdomain).first()
  }
  
  if (!tenant && slug) {
    tenant = await c.env.DB.prepare(`
      SELECT * FROM tenants 
      WHERE slug = ? AND status = 'active'
      LIMIT 1
    `).bind(slug).first()
  }
  
  // Fallback: use tenant_id = 1 (default company) if no tenant found
  if (!tenant) {
    tenant = await c.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = 1 LIMIT 1
    `).bind().first()
  }
  
  return tenant
}

// Middleware: Verify and set tenant
app.use('/c/:tenant/*', async (c, next) => {
  const tenant = await getTenant(c)
  
  if (!tenant) {
    return c.json({ error: 'Tenant not found', message: 'الشركة غير موجودة أو غير نشطة' }, 404)
  }
  
  // Set tenant in context
  c.set('tenant', tenant)
  c.set('tenantId', tenant.id)
  
  await next()
})

// TENANTS (COMPANIES) APIs

// Get all tenants
app.get('/api/tenants', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM tenants ORDER BY created_at DESC
    `).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Create new tenant
app.post('/api/tenants', async (c) => {
  try {
    const data = await c.req.json()
    
    // Validate required fields
    if (!data.company_name || !data.slug) {
      return c.json({ success: false, error: 'اسم الشركة والـ Slug مطلوبان' }, 400)
    }
    
    // Check if slug already exists
    const existing = await c.env.DB.prepare(`
      SELECT id FROM tenants WHERE slug = ?
    `).bind(data.slug).first()
    
    if (existing) {
      return c.json({ success: false, error: 'الـ Slug موجود بالفعل' }, 400)
    }
    
    // Insert new tenant
    const result = await c.env.DB.prepare(`
      INSERT INTO tenants (
        company_name, slug, subdomain, status, max_users, 
        max_customers, max_requests, contact_email, contact_phone,
        primary_color, secondary_color
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.company_name,
      data.slug,
      data.subdomain || data.slug,
      data.status || 'active',
      data.max_users || 10,
      data.max_customers || 500,
      data.max_requests || 2000,
      data.contact_email || '',
      data.contact_phone || '',
      data.primary_color || '#667eea',
      data.secondary_color || '#764ba2'
    ).run()
    
    return c.json({ 
      success: true, 
      data: { id: result.meta.last_row_id, ...data },
      message: 'تم إنشاء الشركة بنجاح'
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update tenant
app.put('/api/tenants/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    // Check if tenant exists
    const tenant = await c.env.DB.prepare(`
      SELECT id FROM tenants WHERE id = ?
    `).bind(id).first()
    
    if (!tenant) {
      return c.json({ success: false, error: 'الشركة غير موجودة' }, 404)
    }
    
    // Update tenant
    await c.env.DB.prepare(`
      UPDATE tenants SET
        company_name = ?,
        slug = ?,
        subdomain = ?,
        status = ?,
        max_users = ?,
        max_customers = ?,
        max_requests = ?,
        contact_email = ?,
        contact_phone = ?,
        primary_color = ?,
        secondary_color = ?
      WHERE id = ?
    `).bind(
      data.company_name,
      data.slug,
      data.subdomain,
      data.status,
      data.max_users,
      data.max_customers,
      data.max_requests,
      data.contact_email,
      data.contact_phone,
      data.primary_color || '#667eea',
      data.secondary_color || '#764ba2',
      id
    ).run()
    
    return c.json({ 
      success: true, 
      data: { id, ...data },
      message: 'تم تحديث الشركة بنجاح'
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete tenant
app.delete('/api/tenants/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Check if tenant has users
    const usersCount = await c.env.DB.prepare(`
      SELECT COUNT(*) as count FROM users WHERE tenant_id = ?
    `).bind(id).first()
    
    if (usersCount && usersCount.count > 0) {
      return c.json({ 
        success: false, 
        error: `لا يمكن حذف الشركة لأنها تحتوي على ${usersCount.count} مستخدم/مستخدمين`
      }, 400)
    }
    
    // Delete tenant
    await c.env.DB.prepare(`
      DELETE FROM tenants WHERE id = ?
    `).bind(id).run()
    
    return c.json({ 
      success: true, 
      message: 'تم حذف الشركة بنجاح'
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// AUTHENTICATION & AUTHORIZATION APIs

// Login API
app.post('/api/auth/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    
    // Get user with tenant information
    const user = await c.env.DB.prepare(`
      SELECT u.*, r.role_name, s.company_name, t.id as tenant_id, t.company_name as tenant_name, t.slug as tenant_slug
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN subscriptions s ON u.subscription_id = s.id
      LEFT JOIN tenants t ON u.tenant_id = t.id
      WHERE u.username = ? AND u.password = ? AND u.is_active = 1
    `).bind(username, password).first()
    
    if (!user) {
      return c.json({ success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }, 401)
    }
    
    // Update last login
    await c.env.DB.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(user.id).run()
    
    // Create token with tenant_id (user_id:tenant_id:timestamp:random)
    const tokenData = `${user.id}:${user.tenant_id || 'null'}:${Date.now()}:${Math.random()}`
    const token = btoa(tokenData)
    
    // Determine redirect URL based on tenant
    let redirect = '/admin'
    if (user.tenant_id && user.tenant_slug) {
      redirect = `/c/${user.tenant_slug}/admin`
    } else if (user.user_type === 'superadmin') {
      redirect = '/admin/tenants' // Super admin goes to tenant management
    }
    
    return c.json({ 
      success: true,
      token: token,
      redirect: redirect,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role_name,
        user_type: user.user_type,
        company_name: user.company_name,
        subscription_id: user.subscription_id,
        tenant_id: user.tenant_id,
        tenant_name: user.tenant_name,
        tenant_slug: user.tenant_slug
      }
    })
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

// Forgot Password - Step 1: Send verification code
app.post('/api/auth/forgot-password', async (c) => {
  try {
    const { email } = await c.req.json()
    
    // Check if user exists
    const user = await c.env.DB.prepare(`
      SELECT id, email, username FROM users WHERE email = ? OR username = ?
    `).bind(email, email).first()
    
    if (!user) {
      return c.json({ success: false, message: 'البريد الإلكتروني أو اسم المستخدم غير موجود' }, 404)
    }
    
    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    
    // Store verification code in password_change_notifications table
    await c.env.DB.prepare(`
      INSERT INTO password_change_notifications (user_id, verification_code, expires_at, is_used)
      VALUES (?, ?, ?, 0)
    `).bind(user.id, code, expiresAt.toISOString()).run()
    
    // TODO: Send email with verification code (for now, just return success)
    // In production, integrate with email service like SendGrid or AWS SES
    
    console.log(`Verification code for ${user.email}: ${code}`)
    
    return c.json({ 
      success: true, 
      message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
      // For development only - remove in production:
      devCode: code
    })
  } catch (error: any) {
    console.error('Forgot password error:', error)
    return c.json({ success: false, message: 'حدث خطأ. الرجاء المحاولة مرة أخرى.' }, 500)
  }
})

// Forgot Password - Step 2: Verify code
app.post('/api/auth/verify-reset-code', async (c) => {
  try {
    const { email, code } = await c.req.json()
    
    // Get user
    const user = await c.env.DB.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(email, email).first()
    
    if (!user) {
      return c.json({ success: false, message: 'المستخدم غير موجود' }, 404)
    }
    
    // Check verification code
    const verification = await c.env.DB.prepare(`
      SELECT id, verification_code, expires_at, is_used
      FROM password_change_notifications
      WHERE user_id = ? AND is_used = 0
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(user.id).first()
    
    if (!verification) {
      return c.json({ success: false, message: 'لم يتم العثور على رمز التحقق' }, 404)
    }
    
    // Check if expired
    if (new Date(verification.expires_at as string) < new Date()) {
      return c.json({ success: false, message: 'انتهت صلاحية رمز التحقق. الرجاء طلب رمز جديد.' }, 400)
    }
    
    // Check if code matches
    if (verification.verification_code !== code) {
      return c.json({ success: false, message: 'رمز التحقق غير صحيح' }, 400)
    }
    
    // Generate reset token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    
    return c.json({ 
      success: true, 
      message: 'تم التحقق بنجاح',
      token: token
    })
  } catch (error: any) {
    console.error('Verify code error:', error)
    return c.json({ success: false, message: 'حدث خطأ. الرجاء المحاولة مرة أخرى.' }, 500)
  }
})

// Forgot Password - Step 3: Reset password
app.post('/api/auth/reset-password', async (c) => {
  try {
    const { email, token, newPassword } = await c.req.json()
    
    if (!newPassword || newPassword.length < 8) {
      return c.json({ success: false, message: 'كلمة السر يجب أن تكون 8 أحرف على الأقل' }, 400)
    }
    
    // Get user
    const user = await c.env.DB.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(email, email).first()
    
    if (!user) {
      return c.json({ success: false, message: 'المستخدم غير موجود' }, 404)
    }
    
    // Update password
    await c.env.DB.prepare(`
      UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(newPassword, user.id).run()
    
    // Mark verification code as used
    await c.env.DB.prepare(`
      UPDATE password_change_notifications SET is_used = 1 WHERE user_id = ? AND is_used = 0
    `).bind(user.id).run()
    
    return c.json({ 
      success: true, 
      message: 'تم تغيير كلمة السر بنجاح'
    })
  } catch (error: any) {
    console.error('Reset password error:', error)
    return c.json({ success: false, message: 'حدث خطأ. الرجاء المحاولة مرة أخرى.' }, 500)
  }
})

// BANKS APIs

// Get all banks (global banks + tenant-specific banks)
app.get('/api/banks', async (c) => {
  try {
    // Get all banks - simplified without tenant_id for now
    const query = `SELECT * FROM banks ORDER BY bank_name`
    const results = (await c.env.DB.prepare(query).all()).results
    
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add bank
app.post('/api/banks', async (c) => {
  try {
    const data = await c.req.json()
    const { bank_name, bank_code, logo_url, is_active } = data
    
    const result = await c.env.DB.prepare(`
      INSERT INTO banks (bank_name, bank_code, logo_url, is_active) 
      VALUES (?, ?, ?, ?)
    `).bind(bank_name, bank_code, logo_url, is_active).run()
    
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update bank (PUT method for API)
app.put('/api/banks/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const data = await c.req.json()
    const { bank_name, bank_code, logo_url, is_active } = data
    
    await c.env.DB.prepare(`
      UPDATE banks SET bank_name = ?, bank_code = ?, logo_url = ?, is_active = ? WHERE id = ?
    `).bind(bank_name, bank_code, logo_url, is_active, id).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update bank (POST method for form submission - legacy)
app.post('/api/banks/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const formData = await c.req.formData()
    const bank_name = formData.get('bank_name') as string
    const bank_code = formData.get('bank_code') as string
    const logo_url = formData.get('logo_url') as string || null
    const is_active = parseInt(formData.get('is_active') as string || '1')
    
    await c.env.DB.prepare(`
      UPDATE banks SET bank_name = ?, bank_code = ?, logo_url = ?, is_active = ? WHERE id = ?
    `).bind(bank_name, bank_code, logo_url, is_active, id).run()
    return c.redirect('/admin/banks')
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete bank
app.delete('/api/banks/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Check if bank exists
    const bank = await c.env.DB.prepare(`
      SELECT id FROM banks WHERE id = ?
    `).bind(id).first()
    
    if (!bank) {
      return c.json({ success: false, error: 'البنك غير موجود' }, 404)
    }
    
    // Delete bank (will also delete related rates due to foreign key)
    await c.env.DB.prepare(`DELETE FROM banks WHERE id = ?`).bind(id).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// FINANCING TYPES APIs

// Get all financing types
app.get('/api/financing-types', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM financing_types ORDER BY type_name
    `).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// BANK FINANCING RATES APIs

// Get all rates with bank and type names
app.get('/api/rates', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Build query with tenant_id filter
    let query = `
      SELECT 
        r.*,
        b.bank_name,
        f.type_name as financing_type_name
      FROM bank_financing_rates r
      JOIN banks b ON r.bank_id = b.id
      JOIN financing_types f ON r.financing_type_id = f.id
    `
    
    if (tenant_id !== null) {
      query += ' WHERE r.tenant_id = ?'
    }
    
    query += ' ORDER BY b.bank_name, f.type_name'
    
    const { results } = tenant_id !== null
      ? await c.env.DB.prepare(query).bind(tenant_id).all()
      : await c.env.DB.prepare(query).all()
      
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add rate
app.post('/api/rates', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    const formData = await c.req.formData()
    const data: any = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    const result = await c.env.DB.prepare(`
      INSERT INTO bank_financing_rates 
      (bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration, is_active, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.bank_id, 
      data.financing_type_id, 
      data.rate,
      data.min_amount || null, 
      data.max_amount || null, 
      data.min_duration || null, 
      data.max_duration || null,
      data.is_active || 1,
      tenant_id
    ).run()
    return c.redirect('/admin/rates')
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update rate
app.put('/api/rates/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    await c.env.DB.prepare(`
      UPDATE bank_financing_rates 
      SET bank_id = ?, financing_type_id = ?, rate = ?, 
          min_amount = ?, max_amount = ?, min_salary = ?, max_salary = ?,
          min_duration = ?, max_duration = ?, is_active = ?
      WHERE id = ?
    `).bind(
      data.bank_id, data.financing_type_id, data.rate,
      data.min_amount, data.max_amount, data.min_salary, data.max_salary,
      data.min_duration, data.max_duration, data.is_active, id
    ).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete rate
app.delete('/api/rates/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM bank_financing_rates WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// PACKAGES APIs

// Get all packages
app.get('/api/packages', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM packages ORDER BY price
    `).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add new package
app.post('/api/packages', async (c) => {
  try {
    const formData = await c.req.formData()
    const package_name = formData.get('package_name')
    const description = formData.get('description')
    const price = formData.get('price')
    const duration_months = formData.get('duration_months')
    const max_calculations = formData.get('max_calculations')
    const max_users = formData.get('max_users')
    const is_active = formData.get('is_active') || '1'
    
    const result = await c.env.DB.prepare(`
      INSERT INTO packages (package_name, description, price, duration_months, max_calculations, max_users, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(package_name, description || null, price, duration_months, max_calculations || null, max_users || null, is_active).run()
    
    return c.redirect('/admin/packages')
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update package
app.put('/api/packages/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { package_name, description, price, duration_months, max_calculations, max_users, is_active } = await c.req.json()
    await c.env.DB.prepare(`
      UPDATE packages 
      SET package_name = ?, description = ?, price = ?, duration_months = ?, 
          max_calculations = ?, max_users = ?, is_active = ?
      WHERE id = ?
    `).bind(package_name, description, price, duration_months, max_calculations, max_users, is_active, id).run()
    return c.json({ success: true, message: 'تم تحديث الباقة بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// SUBSCRIPTIONS APIs

// Get all subscriptions
app.get('/api/subscriptions', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    let query = `
      SELECT 
        s.*,
        p.package_name,
        p.price,
        p.max_calculations
      FROM subscriptions s
      JOIN packages p ON s.package_id = p.id`
    
    if (tenant_id) {
      query += ` WHERE s.tenant_id = ${tenant_id}`
    }
    
    query += ` ORDER BY s.created_at DESC`
    
    const { results } = await c.env.DB.prepare(query).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add subscription
app.post('/api/subscriptions', async (c) => {
  try {
    const formData = await c.req.formData()
    const company_name = formData.get('company_name')
    const package_id = formData.get('package_id')
    const start_date = formData.get('start_date')
    const end_date = formData.get('end_date')
    const status = formData.get('status') || 'active'
    const calculations_used = formData.get('calculations_used') || 0
    
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    const result = await c.env.DB.prepare(`
      INSERT INTO subscriptions (company_name, package_id, start_date, end_date, status, calculations_used, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(company_name, package_id, start_date, end_date, status, calculations_used, tenant_id).run()
    
    return c.redirect('/admin/subscriptions')
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update subscription
app.put('/api/subscriptions/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { company_name, package_id, start_date, end_date, status } = await c.req.json()
    await c.env.DB.prepare(`
      UPDATE subscriptions 
      SET company_name = ?, package_id = ?, start_date = ?, end_date = ?, status = ?
      WHERE id = ?
    `).bind(company_name, package_id, start_date, end_date, status, id).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// SUBSCRIPTION REQUESTS APIs

// Get all subscription requests
app.get('/api/subscription-requests', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name,
        p.price,
        p.duration_months
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      ORDER BY sr.created_at DESC
    `).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get single subscription request
app.get('/api/subscription-requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const request = await c.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name,
        p.price,
        p.duration_months,
        p.max_calculations,
        p.max_users
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      WHERE sr.id = ?
    `).bind(id).first()
    
    if (!request) {
      return c.json({ success: false, message: 'الطلب غير موجود' }, 404)
    }
    
    return c.json({ success: true, data: request })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Create new subscription request
app.post('/api/subscription-requests', async (c) => {
  try {
    const { company_name, contact_name, email, phone, package_id, notes } = await c.req.json()
    
    // Validate required fields
    if (!company_name || !contact_name || !email || !phone || !package_id) {
      return c.json({ 
        success: false, 
        message: 'جميع الحقول مطلوبة' 
      }, 400)
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return c.json({ 
        success: false, 
        message: 'البريد الإلكتروني غير صحيح' 
      }, 400)
    }
    
    // Validate phone format
    const phoneRegex = /^(05|5)[0-9]{8}$/
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      return c.json({ 
        success: false, 
        message: 'رقم الجوال غير صحيح. يجب أن يبدأ بـ 05 ويتكون من 10 أرقام' 
      }, 400)
    }
    
    // Check if package exists
    const packageExists = await c.env.DB.prepare(`
      SELECT id FROM packages WHERE id = ? AND is_active = 1
    `).bind(package_id).first()
    
    if (!packageExists) {
      return c.json({ 
        success: false, 
        message: 'الباقة غير موجودة أو غير متاحة' 
      }, 400)
    }
    
    // Create subscription request
    const result = await c.env.DB.prepare(`
      INSERT INTO subscription_requests 
      (company_name, contact_name, email, phone, package_id, status, notes)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `).bind(company_name, contact_name, email, phone, package_id, notes || null).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إرسال طلبك بنجاح. سنتواصل معك قريباً',
      requestId: result.meta.last_row_id
    })
  } catch (error: any) {
    console.error('Subscription request error:', error)
    return c.json({ 
      success: false, 
      message: 'حدث خطأ. الرجاء المحاولة مرة أخرى.' 
    }, 500)
  }
})

// Update subscription request status
app.put('/api/subscription-requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { status, notes } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE subscription_requests 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(status, notes || null, id).run()
    
    return c.json({ success: true, message: 'تم تحديث الطلب بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete subscription request
app.delete('/api/subscription-requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    await c.env.DB.prepare(`
      DELETE FROM subscription_requests WHERE id = ?
    `).bind(id).run()
    
    return c.json({ success: true, message: 'تم حذف الطلب بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// USERS APIs

// Get all users
app.get('/api/users', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    let query = `
      SELECT u.*, r.role_name, r.description as role_description,
             COUNT(DISTINCT rp.permission_id) as permissions_count
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN role_permissions rp ON r.id = rp.role_id`
    
    if (tenant_id) {
      query += ` WHERE u.tenant_id = ${tenant_id}`
    }
    
    query += `
      GROUP BY u.id
      ORDER BY u.id DESC`
    
    const { results } = await c.env.DB.prepare(query).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add user
app.post('/api/users', async (c) => {
  try {
    const formData = await c.req.formData()
    const username = formData.get('username')
    const password = formData.get('password')
    const full_name = formData.get('full_name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const user_type = formData.get('user_type')
    const role_id = formData.get('role_id')
    const subscription_id = formData.get('subscription_id') || null
    const is_active = formData.get('is_active') || '1'
    
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Check for duplicate username
    const existingUser = await c.env.DB.prepare(`
      SELECT id FROM users WHERE username = ?
    `).bind(username).first()
    
    if (existingUser) {
      return c.json({ 
        success: false, 
        error: 'اسم المستخدم موجود مسبقاً! الرجاء اختيار اسم مستخدم آخر.' 
      }, 400)
    }
    
    // Check for duplicate email if provided
    if (email) {
      const existingEmail = await c.env.DB.prepare(`
        SELECT id FROM users WHERE email = ?
      `).bind(email).first()
      
      if (existingEmail) {
        return c.json({ 
          success: false, 
          error: 'البريد الإلكتروني موجود مسبقاً! الرجاء استخدام بريد إلكتروني آخر.' 
        }, 400)
      }
    }
    
    const result = await c.env.DB.prepare(`
      INSERT INTO users (username, password, full_name, email, phone, user_type, role_id, subscription_id, is_active, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(username, password, full_name, email, phone, user_type, role_id, subscription_id, is_active, tenant_id).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إضافة المستخدم بنجاح',
      userId: result.meta.last_row_id 
    })
  } catch (error: any) {
    console.error('Error adding user:', error)
    return c.json({ 
      success: false, 
      error: error.message || 'حدث خطأ أثناء إضافة المستخدم' 
    }, 500)
  }
})

// Update user
app.put('/api/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { username, full_name, email, phone, role_id, subscription_id, is_active } = await c.req.json()
    await c.env.DB.prepare(`
      UPDATE users 
      SET username = ?, full_name = ?, email = ?, phone = ?, role_id = ?, subscription_id = ?, is_active = ?
      WHERE id = ?
    `).bind(username, full_name, email, phone, role_id, subscription_id, is_active, id).run()
    return c.json({ success: true })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// CUSTOMERS APIs

// Get all customers
app.get('/api/customers', async (c) => {
  try {
    // Get tenant_id from logged-in user token or query param
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Build query with tenant_id filter
    let query = `
      SELECT 
        c.*,
        ft.type_name as financing_type_name,
        COUNT(f.id) as total_requests,
        SUM(CASE WHEN f.status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN f.status = 'approved' THEN 1 ELSE 0 END) as approved_requests
      FROM customers c
      LEFT JOIN financing_requests f ON c.id = f.customer_id
      LEFT JOIN financing_types ft ON c.financing_type_id = ft.id`
    
    if (tenant_id) {
      query += ` WHERE c.tenant_id = ${tenant_id}`
    }
    
    query += `
      GROUP BY c.id
      ORDER BY c.created_at DESC`
    
    const { results } = await c.env.DB.prepare(query).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Add new customer
app.post('/api/customers', async (c) => {
  try {
    const formData = await c.req.formData()
    const full_name = formData.get('full_name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string || null
    const national_id = formData.get('national_id') as string || null
    const date_of_birth = formData.get('date_of_birth') as string || null
    const employer_name = formData.get('employer_name') as string || null
    const job_title = formData.get('job_title') as string || null
    const work_start_date = formData.get('work_start_date') as string || null
    const city = formData.get('city') as string || null
    const monthly_salary = parseFloat(formData.get('monthly_salary') as string || '0')
    
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Check if national_id already exists within the same tenant
    if (national_id) {
      let checkQuery = `SELECT id, full_name FROM customers WHERE national_id = ?`
      let bindParams: any[] = [national_id]
      
      if (tenant_id) {
        checkQuery += ` AND tenant_id = ?`
        bindParams.push(tenant_id)
      }
      
      const existing = await c.env.DB.prepare(checkQuery).bind(...bindParams).first()
      
      if (existing) {
        return c.html(`
          <!DOCTYPE html>
          <html lang="ar" dir="rtl">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>خطأ</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
          </head>
          <body class="bg-gray-50">
            <div class="max-w-2xl mx-auto p-6 mt-20">
              <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
                <div class="flex items-center mb-4">
                  <i class="fas fa-exclamation-circle text-red-500 text-4xl ml-3"></i>
                  <div>
                    <h1 class="text-2xl font-bold text-red-800">رقم الهوية مكرر!</h1>
                    <p class="text-red-600 mt-1">لا يمكن إضافة عميل برقم هوية موجود مسبقاً</p>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 mb-4">
                  <p class="text-gray-700"><strong>الرقم الوطني:</strong> ${national_id}</p>
                  <p class="text-gray-700"><strong>مسجل باسم:</strong> ${existing.full_name}</p>
                  <p class="text-gray-700"><strong>رقم العميل:</strong> #${existing.id}</p>
                </div>
                <div class="flex gap-3">
                  <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للنموذج
                  </a>
                  <a href="/admin/customers/${existing.id}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-eye ml-2"></i>
                    عرض العميل الموجود
                  </a>
                  <a href="/admin/customers" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-list ml-2"></i>
                    قائمة العملاء
                  </a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `)
      }
    }
    
    // Check if phone already exists within the same tenant
    let phoneCheckQuery = `SELECT id, full_name FROM customers WHERE phone = ?`
    let phoneBindParams: any[] = [phone]
    
    if (tenant_id) {
      phoneCheckQuery += ` AND tenant_id = ?`
      phoneBindParams.push(tenant_id)
    }
    
    const existingPhone = await c.env.DB.prepare(phoneCheckQuery).bind(...phoneBindParams).first()
    
    if (existingPhone) {
      return c.html(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>خطأ</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-50">
          <div class="max-w-2xl mx-auto p-6 mt-20">
            <div class="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 shadow-lg">
              <div class="flex items-center mb-4">
                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl ml-3"></i>
                <div>
                  <h1 class="text-2xl font-bold text-yellow-800">رقم الهاتف مكرر!</h1>
                  <p class="text-yellow-600 mt-1">يوجد عميل آخر بنفس رقم الهاتف</p>
                </div>
              </div>
              <div class="bg-white rounded-lg p-4 mb-4">
                <p class="text-gray-700"><strong>رقم الهاتف:</strong> ${phone}</p>
                <p class="text-gray-700"><strong>مسجل باسم:</strong> ${existingPhone.full_name}</p>
                <p class="text-gray-700"><strong>رقم العميل:</strong> #${existingPhone.id}</p>
              </div>
              <div class="flex gap-3">
                <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-arrow-right ml-2"></i>
                  العودة للنموذج
                </a>
                <a href="/admin/customers/${existingPhone.id}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-eye ml-2"></i>
                  عرض العميل الموجود
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `)
    }
    
    const result = await c.env.DB.prepare(`
      INSERT INTO customers (full_name, phone, email, national_id, birthdate, employer_name, job_title, work_start_date, city, monthly_salary, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(full_name, phone, email, national_id, date_of_birth, employer_name, job_title, work_start_date, city, monthly_salary, tenant_id).run()
    return c.redirect('/admin/customers')
  } catch (error: any) {
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>خطأ</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-2xl mx-auto p-6 mt-20">
          <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <i class="fas fa-times-circle text-red-500 text-4xl ml-3"></i>
              <div>
                <h1 class="text-2xl font-bold text-red-800">حدث خطأ!</h1>
                <p class="text-red-600 mt-1">لم نتمكن من إضافة العميل</p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-4 mb-4">
              <p class="text-gray-700 font-mono text-sm">${error.message}</p>
            </div>
            <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all inline-block">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة للنموذج
            </a>
          </div>
        </div>
      </body>
      </html>
    `)
  }
})

// Update customer
app.post('/api/customers/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const formData = await c.req.formData()
    const full_name = formData.get('full_name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string || null
    const national_id = formData.get('national_id') as string || null
    const date_of_birth = formData.get('date_of_birth') as string || null
    const employer_name = formData.get('employer_name') as string || null
    const job_title = formData.get('job_title') as string || null
    const work_start_date = formData.get('work_start_date') as string || null
    const city = formData.get('city') as string || null
    const monthly_salary = parseFloat(formData.get('monthly_salary') as string || '0')
    
    await c.env.DB.prepare(`
      UPDATE customers 
      SET full_name = ?, phone = ?, email = ?, national_id = ?, birthdate = ?,
          employer_name = ?, job_title = ?, work_start_date = ?, city = ?, monthly_salary = ?
      WHERE id = ?
    `).bind(full_name, phone, email, national_id, date_of_birth, employer_name, job_title, work_start_date, city, monthly_salary, id).run()
    return c.redirect('/admin/customers')
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// FINANCING REQUESTS APIs

// Get all financing requests
app.get('/api/financing-requests', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    let query = `
      SELECT 
        f.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        c.national_id,
        c.employer_name,
        c.job_title,
        b.bank_name as selected_bank_name,
        ft.type_name as financing_type_name
      FROM financing_requests f
      JOIN customers c ON f.customer_id = c.id
      LEFT JOIN banks b ON f.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON f.financing_type_id = ft.id`
    
    if (tenant_id) {
      query += ` WHERE f.tenant_id = ${tenant_id}`
    }
    
    query += ` ORDER BY f.created_at DESC`
    
    const { results } = await c.env.DB.prepare(query).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Create new financing request
app.post('/api/requests', async (c) => {
  try {
    const formData = await c.req.formData()
    const customer_id = formData.get('customer_id')
    const financing_type_id = formData.get('financing_type_id')
    const requested_amount = formData.get('requested_amount')
    const duration_months = formData.get('duration_months')
    const salary_at_request = formData.get('salary_at_request')
    const selected_bank_id = formData.get('selected_bank_id') || null
    const status = formData.get('status') || 'pending'
    const notes = formData.get('notes') || ''
    
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Insert financing request directly (customer already exists from dropdown)
    const result = await c.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id, 
        requested_amount, salary_at_request, duration_months, 
        status, notes, tenant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      customer_id,
      financing_type_id,
      selected_bank_id,
      requested_amount,
      salary_at_request,
      duration_months,
      status,
      notes,
      tenant_id
    ).run()
    
    return c.redirect('/admin/requests')
  } catch (error: any) {
    console.error('Error creating request:', error)
    return c.json({ success: false, error: error.message, message: 'حدث خطأ أثناء حفظ الطلب' }, 500)
  }
})

// API for calculator (accepts JSON with new customer data)
// Multi-tenant calculator submit API
app.post('/api/c/:tenant/calculator/submit-request', async (c) => {
  try {
    const tenantSlug = c.req.param('tenant')
    const data = await c.req.json()
    
    // Get tenant_id from slug
    const tenant = await c.env.DB.prepare(`
      SELECT id FROM tenants WHERE slug = ? AND status = 'active'
    `).bind(tenantSlug).first()
    
    if (!tenant) {
      return c.json({ success: false, error: 'شركة غير موجودة' }, 404)
    }
    
    const tenant_id = tenant.id
    
    // Step 1: Check if customer exists (by national_id or phone) within same tenant
    let customer = await c.env.DB.prepare(`
      SELECT id FROM customers WHERE (national_id = ? OR phone = ?) AND tenant_id = ?
    `).bind(data.national_id || '', data.phone || '', tenant_id).first()
    
    let customer_id
    
    if (customer) {
      customer_id = customer.id
      
      // Update customer info
      await c.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, phone = ?, email = ?, 
            birthdate = ?, monthly_salary = ?,
            employer_name = ?, job_title = ?,
            work_start_date = ?, city = ?,
            financing_amount = ?, monthly_obligations = ?, financing_type_id = ?
        WHERE id = ?
      `).bind(
        data.full_name || '',
        data.phone || '',
        data.email || null,
        data.birthdate || null,
        data.monthly_salary || 0,
        data.employer || '',
        data.job_title || '',
        data.work_start_date || null,
        data.city || '',
        data.requested_amount || 0,
        data.monthly_obligations || 0,
        data.financing_type_id || null,
        customer_id
      ).run()
    } else {
      // Create new customer with tenant_id
      try {
        const customerResult = await c.env.DB.prepare(`
          INSERT INTO customers (
            full_name, phone, email, national_id, 
            birthdate, monthly_salary, employer_name, 
            job_title, work_start_date, city, tenant_id,
            financing_amount, monthly_obligations, financing_type_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          data.full_name || '',
          data.phone || '',
          data.email || null,
          data.national_id || '',
          data.birthdate || null,
          data.monthly_salary || 0,
          data.employer || '',
          data.job_title || '',
          data.work_start_date || null,
          data.city || '',
          tenant_id,
          data.requested_amount || 0,
          data.monthly_obligations || 0,
          data.financing_type_id || null
        ).run()
        
        customer_id = customerResult.meta.last_row_id
      } catch (insertError: any) {
        if (insertError.message && insertError.message.includes('UNIQUE')) {
          // Try to find existing customer (might be in a different tenant)
          const existingCustomer = await c.env.DB.prepare(`
            SELECT id FROM customers WHERE (national_id = ? OR phone = ?)
          `).bind(data.national_id || '', data.phone || '').first()
          
          if (existingCustomer) {
            // Customer exists, update their info and use their ID
            customer_id = existingCustomer.id
            
            // Update customer with new tenant_id and info
            await c.env.DB.prepare(`
              UPDATE customers 
              SET full_name = ?, phone = ?, email = ?, 
                  birthdate = ?, monthly_salary = ?,
                  employer_name = ?, job_title = ?,
                  work_start_date = ?, city = ?, tenant_id = ?,
                  financing_amount = ?, monthly_obligations = ?, financing_type_id = ?
              WHERE id = ?
            `).bind(
              data.full_name || '',
              data.phone || '',
              data.email || null,
              data.birthdate || null,
              data.monthly_salary || 0,
              data.employer || '',
              data.job_title || '',
              data.work_start_date || null,
              data.city || '',
              tenant_id,
              data.requested_amount || 0,
              data.monthly_obligations || 0,
              data.financing_type_id || null,
              customer_id
            ).run()
          } else {
            throw insertError
          }
        } else {
          throw insertError
        }
      }
    }
    
    // Step 2: Create financing request with tenant_id
    const requestResult = await c.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id,
        requested_amount, salary_at_request, duration_months,
        monthly_obligations, monthly_payment,
        status, notes, tenant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `).bind(
      customer_id,
      data.financing_type_id || null,
      data.bank_id || data.selected_bank_id || null,
      data.requested_amount || 0,
      data.monthly_salary || 0,
      data.duration || data.duration_months || 0,
      data.monthly_obligations || 0,
      data.monthly_payment || 0,
      data.notes || null,
      tenant_id
    ).run()
    
    const requestId = requestResult.meta.last_row_id
    
    return c.json({ 
      success: true, 
      request_id: requestId,
      message: 'تم إرسال طلبك بنجاح'
    })
  } catch (error: any) {
    console.error('Calculator submit error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      data: error
    })
    return c.json({ 
      success: false, 
      error: 'حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.',
      details: error.message 
    }, 500)
  }
})

// Save customer initial data from calculator (before completing request)
app.post('/api/calculator/save-customer', async (c) => {
  try {
    const data = await c.req.json()
    
    // Extract tenant_id from the request path or default to null
    const tenantSlug = data.tenant_slug || null
    let tenant_id = null
    
    if (tenantSlug) {
      const tenant = await c.env.DB.prepare(`
        SELECT id FROM tenants WHERE slug = ? AND status = 'active'
      `).bind(tenantSlug).first()
      
      if (tenant) {
        tenant_id = tenant.id
      }
    }
    
    // Check if customer already exists
    let customer = await c.env.DB.prepare(`
      SELECT id FROM customers WHERE phone = ?
    `).bind(data.phone).first()
    
    let customer_id
    
    if (customer) {
      // Update existing customer with calculator data
      customer_id = customer.id
      
      await c.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, 
            birthdate = ?, 
            monthly_salary = ?,
            financing_amount = ?,
            monthly_obligations = ?,
            financing_type_id = ?,
            financing_duration_months = ?,
            best_bank_id = ?,
            best_rate = ?,
            monthly_payment = ?,
            total_payment = ?,
            calculation_date = CURRENT_TIMESTAMP,
            tenant_id = COALESCE(?, tenant_id)
        WHERE id = ?
      `).bind(
        data.name,
        data.birthdate,
        data.salary,
        data.amount,
        data.obligations || 0,
        data.financing_type_id,
        data.duration_months || null,
        data.best_bank_id || null,
        data.best_rate || null,
        data.monthly_payment || null,
        data.total_payment || null,
        tenant_id,
        customer_id
      ).run()
    } else {
      // Create new customer with initial calculator data
      // Generate temporary unique national_id to avoid UNIQUE constraint error
      const tempNationalId = `TEMP-${Date.now()}-${Math.random().toString(36).substring(7)}`
      
      const result = await c.env.DB.prepare(`
        INSERT INTO customers (
          full_name, phone, birthdate, monthly_salary,
          financing_amount, monthly_obligations, financing_type_id,
          financing_duration_months, best_bank_id, best_rate,
          monthly_payment, total_payment, calculation_date,
          national_id, tenant_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
      `).bind(
        data.name,
        data.phone,
        data.birthdate,
        data.salary,
        data.amount,
        data.obligations || 0,
        data.financing_type_id,
        data.duration_months || null,
        data.best_bank_id || null,
        data.best_rate || null,
        data.monthly_payment || null,
        data.total_payment || null,
        tempNationalId, // temporary unique national_id
        tenant_id
      ).run()
      
      customer_id = result.meta.last_row_id
    }
    
    return c.json({ 
      success: true, 
      customer_id: customer_id,
      message: 'تم حفظ بيانات العميل بنجاح'
    })
  } catch (error: any) {
    console.error('Save customer error:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

app.post('/api/calculator/submit-request', async (c) => {
  try {
    const data = await c.req.json()
    
    // Step 1: Check if customer exists (by national_id or phone)
    let customer = await c.env.DB.prepare(`
      SELECT id FROM customers WHERE national_id = ? OR phone = ?
    `).bind(data.national_id, data.phone).first()
    
    let customer_id
    
    if (customer) {
      // Customer exists, use existing ID
      customer_id = customer.id
      
      // Update customer info (including all new fields)
      await c.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, phone = ?, email = ?, 
            birthdate = ?, monthly_salary = ?,
            employer_name = ?, job_title = ?,
            work_start_date = ?, city = ?
        WHERE id = ?
      `).bind(
        data.full_name,
        data.phone,
        data.email || null,
        data.birthdate,
        data.monthly_salary,
        data.employer,
        data.job_title,
        data.work_start_date,
        data.city,
        customer_id
      ).run()
    } else {
      // Create new customer - but check one more time to avoid race condition
      try {
        const customerResult = await c.env.DB.prepare(`
          INSERT INTO customers (
            full_name, phone, email, national_id, 
            birthdate, monthly_salary, employer_name, 
            job_title, work_start_date, city
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          data.full_name,
          data.phone,
          data.email || null,
          data.national_id,
          data.birthdate,
          data.monthly_salary,
          data.employer,
          data.job_title,
          data.work_start_date,
          data.city
        ).run()
        
        customer_id = customerResult.meta.last_row_id
      } catch (insertError: any) {
        // If UNIQUE constraint fails, customer was created between check and insert
        // Try to get the customer again
        if (insertError.message && insertError.message.includes('UNIQUE')) {
          const existingCustomer = await c.env.DB.prepare(`
            SELECT id FROM customers WHERE national_id = ? OR phone = ?
          `).bind(data.national_id, data.phone).first()
          
          if (existingCustomer) {
            customer_id = existingCustomer.id
          } else {
            throw insertError
          }
        } else {
          throw insertError
        }
      }
    }
    
    // Step 2: Create financing request
    const requestResult = await c.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id,
        requested_amount, salary_at_request, duration_months,
        monthly_obligations, monthly_payment,
        status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `).bind(
      customer_id,
      data.financing_type_id,
      data.bank_id,
      data.requested_amount,
      data.monthly_salary,
      data.duration,
      data.monthly_obligations,
      data.monthly_payment,
      data.notes
    ).run()
    
    const requestId = requestResult.meta.last_row_id
    
    // Step 3: Create notification for new request
    await c.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      1, // Admin user
      'طلب تمويل جديد',
      `تم استلام طلب تمويل جديد برقم #${requestId} بمبلغ ${data.requested_amount.toLocaleString('ar-SA')} ريال من ${data.full_name}`,
      'info',
      'request',
      requestId
    ).run()
    
    return c.json({ 
      success: true, 
      request_id: requestId,
      customer_id: customer_id,
      message: 'تم إرسال طلبك بنجاح'
    })
  } catch (error: any) {
    console.error('Calculator submit error:', error)
    return c.json({ 
      success: false, 
      error: error.message,
      message: 'حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.'
    }, 500)
  }
})

// Update request status
// Update financing request (full data)
app.put('/api/financing-requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const authHeader = c.req.header('Authorization')
    let tenantId = null
    
    // Extract tenant_id from JWT token
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const parts = token.split('.')
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]))
        tenantId = payload.tenant_id || null
      }
    }
    
    const {
      requested_amount,
      duration_months,
      salary_at_request,
      monthly_obligations,
      status,
      notes,
      id_attachment_url,
      bank_statement_attachment_url,
      salary_attachment_url,
      additional_attachment_url
    } = await c.req.json()
    
    // Build update query with tenant_id check
    let updateFields = [
      'requested_amount = ?',
      'duration_months = ?',
      'salary_at_request = ?',
      'monthly_obligations = ?',
      'status = ?',
      'notes = ?'
    ]
    
    const params = [
      requested_amount,
      duration_months,
      salary_at_request || 0,
      monthly_obligations || 0,
      status || 'pending',
      notes || ''
    ]
    
    // Add attachment URLs if provided
    if (id_attachment_url) {
      updateFields.push('id_attachment_url = ?')
      params.push(id_attachment_url)
    }
    
    if (bank_statement_attachment_url) {
      updateFields.push('bank_statement_attachment_url = ?')
      params.push(bank_statement_attachment_url)
    }
    
    if (salary_attachment_url) {
      updateFields.push('salary_attachment_url = ?')
      params.push(salary_attachment_url)
    }
    
    if (additional_attachment_url) {
      updateFields.push('additional_attachment_url = ?')
      params.push(additional_attachment_url)
    }
    
    params.push(id)
    
    let updateQuery = `
      UPDATE financing_requests 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `
    
    // Add tenant_id filter if not SuperAdmin
    if (tenantId !== null) {
      updateQuery += ' AND tenant_id = ?'
      params.push(tenantId)
    }
    
    await c.env.DB.prepare(updateQuery).bind(...params).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Update financing request error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update financing request status only
app.put('/api/financing-requests/:id/status', async (c) => {
  try {
    const id = c.req.param('id')
    const { status, notes } = await c.req.json()
    
    // Update status
    await c.env.DB.prepare(`
      UPDATE financing_requests SET status = ?, notes = ? WHERE id = ?
    `).bind(status, notes, id).run()
    
    // Get request details
    const request = await c.env.DB.prepare(`
      SELECT requested_amount FROM financing_requests WHERE id = ?
    `).bind(id).first()
    
    // Create notification for status change
    const statusMessages = {
      'pending': 'قيد الانتظار',
      'under_review': 'قيد المراجعة',
      'approved': 'موافق عليه',
      'rejected': 'مرفوض'
    }
    
    const statusTypes = {
      'pending': 'info',
      'under_review': 'warning',
      'approved': 'success',
      'rejected': 'error'
    }
    
    await c.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      1, // Admin user
      'تحديث حالة الطلب',
      `تم تحديث حالة الطلب #${id} إلى: ${statusMessages[status as keyof typeof statusMessages] || status}`,
      statusTypes[status as keyof typeof statusTypes] || 'info',
      'status_change',
      id
    ).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Update status error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ATTACHMENTS APIs

// Upload attachment to R2
app.post('/api/attachments/upload', async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const requestId = formData.get('request_id') as string
    const attachmentType = (formData.get('attachmentType') || formData.get('attachment_type')) as string // 'id', 'salary', 'bank_statement', 'additional'
    
    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400)
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const fileExtension = file.name.split('.').pop()
    const filename = requestId 
      ? `${requestId}/${attachmentType}_${timestamp}.${fileExtension}`
      : `temp/${attachmentType}_${timestamp}_${random}.${fileExtension}`
    
    // Upload to R2
    const arrayBuffer = await file.arrayBuffer()
    await c.env.ATTACHMENTS.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type
      }
    })
    
    const publicUrl = `/api/attachments/view/${filename}`
    
    // Update database only if requestId is provided
    if (requestId) {
      const columnName = `${attachmentType}_attachment_url`
      console.log('📎 Updating attachment:', { requestId, attachmentType, columnName, publicUrl })
      
      const result = await c.env.DB.prepare(`
        UPDATE financing_requests 
        SET ${columnName} = ? 
        WHERE id = ?
      `).bind(publicUrl, requestId).run()
      
      console.log('✅ Update result:', result)
    }
    
    return c.json({ 
      success: true, 
      url: publicUrl,
      filename: filename
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// View/Download attachment from R2
app.get('/api/attachments/view/:path{.+}', async (c) => {
  try {
    const path = c.req.param('path')
    const object = await c.env.ATTACHMENTS.get(path)
    
    if (!object) {
      return c.notFound()
    }
    
    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('etag', object.httpEtag)
    
    return new Response(object.body, { headers })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete attachment from R2
app.delete('/api/attachments/delete/:path{.+}', async (c) => {
  try {
    const path = c.req.param('path')
    
    // Delete from R2
    await c.env.ATTACHMENTS.delete(path)
    
    // Update database to remove the URL
    // Extract request_id and attachment type from path
    // Path format: {request_id}/{type}_{timestamp}.{ext}
    const pathParts = path.split('/')
    if (pathParts.length === 2) {
      const requestId = pathParts[0]
      const filename = pathParts[1]
      
      // Determine attachment type from filename
      let columnName = null
      if (filename.startsWith('id_')) {
        columnName = 'id_attachment_url'
      } else if (filename.startsWith('salary_')) {
        columnName = 'salary_attachment_url'
      } else if (filename.startsWith('bank_statement_')) {
        columnName = 'bank_statement_attachment_url'
      } else if (filename.startsWith('additional_')) {
        columnName = 'additional_attachment_url'
      }
      
      // Update database if we identified the column
      if (columnName) {
        await c.env.DB.prepare(`
          UPDATE financing_requests 
          SET ${columnName} = NULL 
          WHERE id = ?
        `).bind(requestId).run()
      }
    }
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Delete error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// NOTIFICATIONS APIs

// Get all notifications for current user (for now, hardcoded user_id = 1)
app.get('/api/notifications', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    let userId = 1
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      userId = parseInt(parts[0])
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    let query = `
      SELECT 
        n.*,
        fr.requested_amount,
        fr.status as request_status
      FROM notifications n
      LEFT JOIN financing_requests fr ON n.related_request_id = fr.id
      WHERE n.user_id = ?`
    
    if (tenant_id) {
      query += ` AND n.tenant_id = ${tenant_id}`
    }
    
    query += `
      ORDER BY n.created_at DESC
      LIMIT 50`
    
    const { results } = await c.env.DB.prepare(query).bind(userId).all()
    
    return c.json({ success: true, data: results })
  } catch (error: any) {
    console.error('Error fetching notifications:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get unread notifications count
app.get('/api/notifications/unread-count', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    let userId = 1
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      userId = parseInt(parts[0])
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    let query = `SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0`
    
    if (tenant_id) {
      query += ` AND tenant_id = ${tenant_id}`
    }
    
    const result = await c.env.DB.prepare(query).bind(userId).first()
    
    return c.json({ success: true, count: result?.count || 0 })
  } catch (error: any) {
    console.error('Error fetching unread count:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Mark notification as read
app.put('/api/notifications/:id/read', async (c) => {
  try {
    const id = c.req.param('id')
    const userId = 1 // TODO: Get from session/auth
    
    await c.env.DB.prepare(`
      UPDATE notifications
      SET is_read = 1, read_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).bind(id, userId).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Error marking notification as read:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Mark all notifications as read
app.put('/api/notifications/read-all', async (c) => {
  try {
    const userId = 1 // TODO: Get from session/auth
    
    await c.env.DB.prepare(`
      UPDATE notifications
      SET is_read = 1, read_at = CURRENT_TIMESTAMP
      WHERE user_id = ? AND is_read = 0
    `).bind(userId).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Error marking all as read:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete notification
app.delete('/api/notifications/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const userId = 1 // TODO: Get from session/auth
    
    await c.env.DB.prepare(`
      DELETE FROM notifications
      WHERE id = ? AND user_id = ?
    `).bind(id, userId).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting notification:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Create notification (helper function for system use)
app.post('/api/notifications', async (c) => {
  try {
    const { user_id, title, message, type, category, related_request_id } = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(user_id || 1, title, message, type || 'info', category || 'general', related_request_id || null).run()
    
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error: any) {
    console.error('Error creating notification:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// CALCULATIONS APIs

// Get all calculations
app.get('/api/calculations', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT 
        calc.*,
        u.full_name as user_name,
        b.bank_name,
        ft.type_name as financing_type
      FROM calculations calc
      LEFT JOIN users u ON calc.user_id = u.id
      JOIN banks b ON calc.bank_id = b.id
      JOIN financing_types ft ON calc.financing_type_id = ft.id
      ORDER BY calc.created_at DESC
      LIMIT 100
    `).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Calculate financing
app.post('/api/calculate', async (c) => {
  try {
    const { amount, duration_months, salary, bank_id, financing_type_id, user_id, subscription_id } = await c.req.json()
    
    // Get rate for this bank and financing type
    const rate_data = await c.env.DB.prepare(`
      SELECT rate FROM bank_financing_rates 
      WHERE bank_id = ? AND financing_type_id = ? AND is_active = 1
      LIMIT 1
    `).bind(bank_id, financing_type_id).first()
    
    if (!rate_data) {
      return c.json({ success: false, error: 'لا توجد نسبة تمويل متاحة لهذا البنك ونوع التمويل' }, 400)
    }
    
    const rate = rate_data.rate as number
    
    // Calculate
    const monthly_rate = rate / 100 / 12
    const monthly_payment = (amount * monthly_rate * Math.pow(1 + monthly_rate, duration_months)) / 
                           (Math.pow(1 + monthly_rate, duration_months) - 1)
    const total_payment = monthly_payment * duration_months
    const total_interest = total_payment - amount
    
    // Save calculation
    const result = await c.env.DB.prepare(`
      INSERT INTO calculations 
      (user_id, subscription_id, financing_type_id, bank_id, amount, duration_months, salary, rate, monthly_payment, total_payment, total_interest)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      user_id || null, subscription_id || null, financing_type_id, bank_id,
      amount, duration_months, salary, rate, monthly_payment, total_payment, total_interest
    ).run()
    
    return c.json({
      success: true,
      data: {
        id: result.meta.last_row_id,
        amount,
        duration_months,
        rate,
        monthly_payment: Math.round(monthly_payment * 100) / 100,
        total_payment: Math.round(total_payment * 100) / 100,
        total_interest: Math.round(total_interest * 100) / 100
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// DASHBOARD APIs

// Get dashboard statistics
app.get('/api/dashboard/stats', async (c) => {
  try {
    // Get tenant_id from Authorization header
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Build queries with tenant_id filter
    let customers_query = 'SELECT COUNT(*) as count FROM customers'
    let requests_query = 'SELECT COUNT(*) as count FROM financing_requests'
    let pending_query = 'SELECT COUNT(*) as count FROM financing_requests WHERE status = "pending"'
    let approved_query = 'SELECT COUNT(*) as count FROM financing_requests WHERE status = "approved"'
    let subscriptions_query = 'SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"'
    let users_query = 'SELECT COUNT(*) as count FROM users WHERE is_active = 1'
    
    // If tenant_id exists, add WHERE clause to filter by tenant
    if (tenant_id !== null) {
      customers_query += ' WHERE tenant_id = ?'
      requests_query += ' WHERE tenant_id = ?'
      pending_query += ' AND tenant_id = ?'
      approved_query += ' AND tenant_id = ?'
      subscriptions_query += ' AND tenant_id = ?'
      users_query += ' AND tenant_id = ?'
    }
    
    // Execute queries
    const customers_count = tenant_id !== null 
      ? await c.env.DB.prepare(customers_query).bind(tenant_id).first()
      : await c.env.DB.prepare(customers_query).first()
      
    const requests_count = tenant_id !== null
      ? await c.env.DB.prepare(requests_query).bind(tenant_id).first()
      : await c.env.DB.prepare(requests_query).first()
      
    const pending_count = tenant_id !== null
      ? await c.env.DB.prepare(pending_query).bind(tenant_id).first()
      : await c.env.DB.prepare(pending_query).first()
      
    const approved_count = tenant_id !== null
      ? await c.env.DB.prepare(approved_query).bind(tenant_id).first()
      : await c.env.DB.prepare(approved_query).first()
      
    const subscriptions_count = tenant_id !== null
      ? await c.env.DB.prepare(subscriptions_query).bind(tenant_id).first()
      : await c.env.DB.prepare(subscriptions_query).first()
      
    const users_count = tenant_id !== null
      ? await c.env.DB.prepare(users_query).bind(tenant_id).first()
      : await c.env.DB.prepare(users_query).first()
    
    // Banks are not tenant-specific, so no filter needed
    const banks_count = await c.env.DB.prepare('SELECT COUNT(*) as count FROM banks WHERE is_active = 1').first()
    
    // Calculations - no tenant_id column, so count all for now
    const calculations_count = await c.env.DB.prepare('SELECT COUNT(*) as count FROM calculations').first()
    
    return c.json({
      success: true,
      data: {
        total_customers: customers_count?.count || 0,
        total_requests: requests_count?.count || 0,
        pending_requests: pending_count?.count || 0,
        approved_requests: approved_count?.count || 0,
        active_subscriptions: subscriptions_count?.count || 0,
        total_calculations: calculations_count?.count || 0,
        active_banks: banks_count?.count || 0,
        active_users: users_count?.count || 0
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// DELETE APIs

// Delete customer
app.delete('/api/customers/:id', async (c) => {
  try {
    const id = c.req.param('id')
    // Delete related financing requests first
    await c.env.DB.prepare('DELETE FROM financing_requests WHERE customer_id = ?').bind(id).run()
    // Then delete customer
    await c.env.DB.prepare('DELETE FROM customers WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف العميل بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete financing request
app.delete('/api/financing-requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM financing_requests WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف الطلب بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete bank
app.delete('/api/banks/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM banks WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف البنك بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete rate
app.delete('/api/rates/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM bank_financing_rates WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف النسبة بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete subscription
app.delete('/api/subscriptions/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM subscriptions WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف الاشتراك بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete user
app.delete('/api/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف المستخدم بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete package
app.delete('/api/packages/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM packages WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف الباقة بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// SUBSCRIPTION REQUESTS APIs

// Get all subscription requests
app.get('/api/subscription-requests', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      ORDER BY sr.created_at DESC
    `).all()
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update subscription request status
app.put('/api/subscription-requests/:id/status', async (c) => {
  try {
    const id = c.req.param('id')
    const { status, notes } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE subscription_requests 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(status, notes, id).run()
    
    return c.json({ success: true, message: 'تم تحديث حالة الطلب بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Delete subscription request
app.delete('/api/subscription-requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM subscription_requests WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: 'تم حذف طلب الاشتراك بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})


// ============================================
// PERMISSIONS APIs
// ============================================

// Get all permissions
app.get('/api/permissions', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM permissions ORDER BY category, id').all()
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get permissions by category
app.get('/api/permissions/by-category', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM permissions ORDER BY category, id').all()
    const permissions = result.results
    
    // Group by category
    const grouped: any = {}
    permissions.forEach((perm: any) => {
      if (!grouped[perm.category]) {
        grouped[perm.category] = []
      }
      grouped[perm.category].push(perm)
    })
    
    return c.json({ success: true, data: grouped })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get role permissions
app.get('/api/roles/:roleId/permissions', async (c) => {
  try {
    const roleId = c.req.param('roleId')
    const result = await c.env.DB.prepare(`
      SELECT p.* FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
      ORDER BY p.category, p.id
    `).bind(roleId).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get user permissions
app.get('/api/users/:userId/permissions', async (c) => {
  try {
    const userId = c.req.param('userId')
    const result = await c.env.DB.prepare(`
      SELECT p.* FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ?
      ORDER BY p.category, p.id
    `).bind(userId).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update role permissions
app.put('/api/roles/:roleId/permissions', async (c) => {
  try {
    const roleId = c.req.param('roleId')
    const { permission_ids } = await c.req.json()
    
    // Delete existing permissions
    await c.env.DB.prepare('DELETE FROM role_permissions WHERE role_id = ?').bind(roleId).run()
    
    // Insert new permissions
    for (const permId of permission_ids) {
      await c.env.DB.prepare(
        'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)'
      ).bind(roleId, permId).run()
    }
    
    return c.json({ success: true, message: 'تم تحديث صلاحيات الدور بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Check if user has permission
app.post('/api/users/check-permission', async (c) => {
  try {
    const { user_id, permission_key } = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      SELECT COUNT(*) as has_permission FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ? AND p.permission_key = ?
    `).bind(user_id, permission_key).first()
    
    return c.json({ 
      success: true, 
      has_permission: (result as any)?.has_permission > 0 
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Get all roles with permissions count
app.get('/api/roles', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT r.*, 
             COUNT(rp.permission_id) as permissions_count
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      GROUP BY r.id
      ORDER BY r.id
    `).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Update user (including role change)
app.put('/api/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { full_name, email, phone, role_id, is_active } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE users 
      SET full_name = ?, email = ?, phone = ?, role_id = ?, is_active = ?
      WHERE id = ?
    `).bind(full_name, email, phone, role_id, is_active, id).run()
    
    return c.json({ success: true, message: 'تم تحديث بيانات المستخدم بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// PAGES
// ============================================

// Public pages (no authentication required)
app.get('/', (c) => c.html(homePage))
app.get('/calculator', (c) => c.html(smartCalculator))
app.get('/calculator-old', (c) => c.html(calculatorPage))

// Multi-tenant calculator route
app.get('/c/:tenant/calculator', async (c) => {
  const tenantSlug = c.req.param('tenant')
  
  // Get tenant information from database
  const tenant = await c.env.DB.prepare(`
    SELECT * FROM tenants WHERE slug = ? AND status = 'active'
  `).bind(tenantSlug).first()
  
  if (!tenant) {
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>شركة غير موجودة</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
          <i class="fas fa-building text-6xl text-red-500 mb-4"></i>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">الشركة غير موجودة</h1>
          <p class="text-gray-600 mb-6">لم نتمكن من العثور على هذه الشركة</p>
          <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
            <i class="fas fa-home ml-2"></i>
            العودة للصفحة الرئيسية
          </a>
        </div>
      </body>
      </html>
    `)
  }
  
  // Return calculator page with tenant context
  // Add tenant info as JavaScript variable and update messages
  return c.html(smartCalculator
    .replace(/حاسبة التمويل الذكية/g, `حاسبة تمويل ${tenant.company_name}`)
    .replace('/api/calculator/submit-request', `/api/c/${tenantSlug}/calculator/submit-request`)
    .replace('<script>', `<script>\n        // Tenant information for company-specific calculator\n        window.TENANT_NAME = '${tenant.company_name.replace(/'/g, "\\'")}';\n    `)
    .replace('سيتم التواصل معك قريباً من \' + selectedBestOffer.bank.bank_name', `سيتم المراجعة من شركة ${tenant.company_name.replace(/'/g, "\\'")} وسوف يتم التواصل معك قريباً'`)
  )
})

app.get('/login', (c) => c.html(loginPage))
app.get('/forgot-password', (c) => c.html(forgotPasswordPage))
app.get('/packages', (c) => c.html(packagesPage))
app.get('/subscribe', (c) => c.html(subscribePage))

// Protected admin pages (requires login - basic protection with redirect message)
app.get('/admin', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تحميل...</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body>
        <script>
            // Check if user is logged in
            const authToken = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');
            
            if (authToken && userData) {
                // User is logged in, load admin panel
                window.location.replace('/admin/panel');
            } else {
                // User is not logged in, show login required page
                document.body.innerHTML = \`
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
                        <div class="max-w-md w-full mx-4">
                            <div class="bg-white rounded-2xl shadow-2xl p-8 text-center">
                                <div class="mb-6">
                                    <i class="fas fa-lock text-6xl text-blue-600"></i>
                                </div>
                                <h1 class="text-3xl font-bold text-gray-800 mb-4">تسجيل الدخول مطلوب</h1>
                                <p class="text-gray-600 mb-6">
                                    يجب تسجيل الدخول للوصول إلى لوحة الإدارة
                                </p>
                                <div class="space-y-3">
                                    <a href="/login" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                        <i class="fas fa-sign-in-alt ml-2"></i>
                                        تسجيل الدخول
                                    </a>
                                    <a href="/" class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                                        <i class="fas fa-home ml-2"></i>
                                        العودة للرئيسية
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                \`;
            }
        </script>
    </body>
    </html>
  `)
})

// Admin panel (actual panel after login check)
// Reports API
app.get('/api/reports/statistics', async (c) => {
  try {
    const fromDate = c.req.query('from_date')
    const toDate = c.req.query('to_date')
    
    // Get tenant_id from auth token
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    let tenant_id = null
    
    if (token) {
      const decoded = atob(token)
      const parts = decoded.split(':')
      tenant_id = parts[1] !== 'null' ? parseInt(parts[1]) : null
    }
    
    // Build where clause
    let whereClause = '1=1'
    const bindings: any[] = []
    
    if (tenant_id) {
      whereClause += ' AND f.tenant_id = ?'
      bindings.push(tenant_id)
    }
    
    if (fromDate) {
      whereClause += ' AND DATE(f.created_at) >= ?'
      bindings.push(fromDate)
    }
    
    if (toDate) {
      whereClause += ' AND DATE(f.created_at) <= ?'
      bindings.push(toDate)
    }
    
    // Get statistics
    const statsQuery = `
      SELECT 
        COUNT(*) as total_requests,
        SUM(CASE WHEN f.status = 'approved' THEN 1 ELSE 0 END) as approved_requests,
        SUM(CASE WHEN f.status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN f.status = 'rejected' THEN 1 ELSE 0 END) as rejected_requests,
        SUM(f.requested_amount) as total_amount
      FROM financing_requests f
      WHERE ${whereClause}
    `
    
    const stats = await c.env.DB.prepare(statsQuery).bind(...bindings).first()
    
    // Get top customers
    const topCustomersQuery = `
      SELECT 
        c.full_name as customer_name,
        COUNT(f.id) as request_count,
        SUM(f.requested_amount) as total_amount,
        MAX(f.created_at) as last_request_date
      FROM financing_requests f
      JOIN customers c ON f.customer_id = c.id
      WHERE ${whereClause}
      GROUP BY c.id
      ORDER BY request_count DESC, total_amount DESC
      LIMIT 10
    `
    
    const { results: topCustomers } = await c.env.DB.prepare(topCustomersQuery).bind(...bindings).all()
    
    return c.json({
      success: true,
      data: {
        ...stats,
        top_customers: topCustomers
      }
    })
  } catch (error: any) {
    console.error('Reports API error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

app.get('/admin/panel', (c) => c.html(fullAdminPanel))

// Add new tenant page
app.get('/admin/tenants/add', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة شركة جديدة - SaaS Multi-Tenant</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </head>
    <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
            <div class="mb-6">
                <a href="/admin/tenants" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة لقائمة الشركات
                </a>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">
                    <i class="fas fa-plus-circle text-emerald-600 ml-2"></i>
                    إضافة شركة جديدة
                </h1>
                
                <form id="addTenantForm" onsubmit="handleSubmit(event)" class="space-y-6">
                    <!-- Basic Information -->
                    <div class="border-b pb-6">
                        <h2 class="text-xl font-bold text-gray-700 mb-4">
                            <i class="fas fa-info-circle ml-2"></i>
                            المعلومات الأساسية
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    اسم الشركة <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="company_name"
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="مثال: شركة التمويل الأولى"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Slug (معرف فريد) <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="slug"
                                    required
                                    pattern="[a-z0-9-]+"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="tamweel-1"
                                >
                                <p class="text-xs text-gray-500 mt-1">حروف صغيرة وأرقام وشرطات فقط</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Settings -->
                    <div class="border-b pb-6">
                        <h2 class="text-xl font-bold text-gray-700 mb-4">
                            <i class="fas fa-cog ml-2"></i>
                            الإعدادات
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                                <select 
                                    id="status"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="active">نشط</option>
                                    <option value="trial">تجريبي</option>
                                    <option value="suspended">متوقف</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">عدد المستخدمين الأقصى</label>
                                <input 
                                    type="number" 
                                    id="max_users"
                                    value="10"
                                    min="1"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Subdomain (اختياري)</label>
                                <input 
                                    type="text" 
                                    id="subdomain"
                                    pattern="[a-z0-9-]*"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="company1"
                                >
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <div>
                        <h2 class="text-xl font-bold text-gray-700 mb-4">
                            <i class="fas fa-address-card ml-2"></i>
                            معلومات الاتصال (اختياري)
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    id="contact_email"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="info@company.com"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                <input 
                                    type="tel" 
                                    id="contact_phone"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="+966501234567"
                                >
                            </div>
                        </div>
                    </div>
                    
                    <!-- Submit Buttons -->
                    <div class="flex gap-4 pt-4">
                        <button 
                            type="submit"
                            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                        >
                            <i class="fas fa-save ml-2"></i>
                            حفظ الشركة
                        </button>
                        <a 
                            href="/admin/tenants"
                            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all text-center"
                        >
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </a>
                    </div>
                </form>
                
                <div id="message" class="mt-4"></div>
            </div>
        </div>
        
        <script>
            // Auto-generate slug from company name
            document.getElementById('company_name').addEventListener('input', function(e) {
                const slug = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9\\s-]/g, '')
                    .replace(/\\s+/g, '-')
                    .replace(/-+/g, '-')
                    .substring(0, 50);
                document.getElementById('slug').value = slug;
            });
            
            async function handleSubmit(event) {
                event.preventDefault();
                
                const data = {
                    company_name: document.getElementById('company_name').value,
                    slug: document.getElementById('slug').value,
                    status: document.getElementById('status').value,
                    max_users: parseInt(document.getElementById('max_users').value),
                    subdomain: document.getElementById('subdomain').value || null,
                    contact_email: document.getElementById('contact_email').value || null,
                    contact_phone: document.getElementById('contact_phone').value || null
                };
                
                try {
                    const response = await axios.post('/api/tenants', data);
                    
                    if (response.data.success) {
                        document.getElementById('message').innerHTML = \`
                            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <i class="fas fa-check-circle ml-2"></i>
                                تم إضافة الشركة بنجاح!
                            </div>
                        \`;
                        
                        setTimeout(() => {
                            window.location.href = '/admin/tenants';
                        }, 1500);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    document.getElementById('message').innerHTML = \`
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <i class="fas fa-exclamation-circle ml-2"></i>
                            خطأ في الإضافة: \${error.response?.data?.error || error.message}
                        </div>
                    \`;
                }
            }
        </script>
    </body>
    </html>
  `);
})

// Edit tenant page
app.get('/admin/tenants/:id/edit', async (c) => {
  try {
    const id = c.req.param('id')
    
    const tenant = await c.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = ?
    `).bind(id).first()
    
    if (!tenant) {
      return c.html('<h1>الشركة غير موجودة</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>تعديل شركة - ${tenant.company_name}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      </head>
      <body class="bg-gray-50">
          <div class="max-w-4xl mx-auto p-6">
              <div class="mb-6">
                  <a href="/admin/tenants" class="text-blue-600 hover:text-blue-800">
                      <i class="fas fa-arrow-right ml-2"></i>
                      العودة لقائمة الشركات
                  </a>
              </div>
              
              <div class="bg-white rounded-xl shadow-lg p-8">
                  <h1 class="text-3xl font-bold text-gray-800 mb-8">
                      <i class="fas fa-edit text-yellow-600 ml-2"></i>
                      تعديل شركة: ${tenant.company_name}
                  </h1>
                  
                  <form id="editTenantForm" onsubmit="handleSubmit(event)" class="space-y-6">
                      <!-- Basic Information -->
                      <div class="border-b pb-6">
                          <h2 class="text-xl font-bold text-gray-700 mb-4">
                              <i class="fas fa-info-circle ml-2"></i>
                              المعلومات الأساسية
                          </h2>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                      اسم الشركة <span class="text-red-500">*</span>
                                  </label>
                                  <input 
                                      type="text" 
                                      id="company_name"
                                      value="${tenant.company_name}"
                                      required
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                      Slug (معرف فريد) <span class="text-red-500">*</span>
                                  </label>
                                  <input 
                                      type="text" 
                                      id="slug"
                                      value="${tenant.slug}"
                                      required
                                      pattern="[a-z0-9-]+"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                                  <p class="text-xs text-gray-500 mt-1">حروف صغيرة وأرقام وشرطات فقط</p>
                              </div>
                          </div>
                      </div>
                      
                      <!-- Settings -->
                      <div class="border-b pb-6">
                          <h2 class="text-xl font-bold text-gray-700 mb-4">
                              <i class="fas fa-cog ml-2"></i>
                              الإعدادات
                          </h2>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                                  <select 
                                      id="status"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                                      <option value="active" ${tenant.status === 'active' ? 'selected' : ''}>نشط</option>
                                      <option value="trial" ${tenant.status === 'trial' ? 'selected' : ''}>تجريبي</option>
                                      <option value="suspended" ${tenant.status === 'suspended' ? 'selected' : ''}>متوقف</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">عدد المستخدمين الأقصى</label>
                                  <input 
                                      type="number" 
                                      id="max_users"
                                      value="${tenant.max_users || 10}"
                                      min="1"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">Subdomain (اختياري)</label>
                                  <input 
                                      type="text" 
                                      id="subdomain"
                                      value="${tenant.subdomain || ''}"
                                      pattern="[a-z0-9-]*"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                          </div>
                      </div>
                      
                      <!-- Contact Information -->
                      <div>
                          <h2 class="text-xl font-bold text-gray-700 mb-4">
                              <i class="fas fa-address-card ml-2"></i>
                              معلومات الاتصال (اختياري)
                          </h2>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                  <input 
                                      type="email" 
                                      id="contact_email"
                                      value="${tenant.contact_email || ''}"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                  <input 
                                      type="tel" 
                                      id="contact_phone"
                                      value="${tenant.contact_phone || ''}"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                          </div>
                      </div>
                      
                      <!-- Submit Buttons -->
                      <div class="flex gap-4 pt-4">
                          <button 
                              type="submit"
                              class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                          >
                              <i class="fas fa-save ml-2"></i>
                              حفظ التعديلات
                          </button>
                          <a 
                              href="/admin/tenants"
                              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all text-center"
                          >
                              <i class="fas fa-times ml-2"></i>
                              إلغاء
                          </a>
                      </div>
                  </form>
                  
                  <div id="message" class="mt-4"></div>
              </div>
          </div>
          
          <script>
              async function handleSubmit(event) {
                  event.preventDefault();
                  
                  const data = {
                      company_name: document.getElementById('company_name').value,
                      slug: document.getElementById('slug').value,
                      status: document.getElementById('status').value,
                      max_users: parseInt(document.getElementById('max_users').value),
                      subdomain: document.getElementById('subdomain').value || null,
                      contact_email: document.getElementById('contact_email').value || null,
                      contact_phone: document.getElementById('contact_phone').value || null
                  };
                  
                  try {
                      const response = await axios.put('/api/tenants/${id}', data);
                      
                      if (response.data.success) {
                          document.getElementById('message').innerHTML = \`
                              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                  <i class="fas fa-check-circle ml-2"></i>
                                  تم تحديث الشركة بنجاح!
                              </div>
                          \`;
                          
                          setTimeout(() => {
                              window.location.href = '/admin/tenants';
                          }, 1500);
                      }
                  } catch (error) {
                      console.error('Error:', error);
                      document.getElementById('message').innerHTML = \`
                          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                              <i class="fas fa-exclamation-circle ml-2"></i>
                              خطأ في التحديث: \${error.response?.data?.error || error.message}
                          </div>
                      \`;
                  }
              }
          </script>
      </body>
      </html>
    `);
  } catch (error: any) {
    return c.html(`<h1>خطأ في تحميل الصفحة: ${error.message}</h1>`)
  }
})

// View tenant details page
app.get('/admin/tenants/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const tenant = await c.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = ?
    `).bind(id).first()
    
    if (!tenant) {
      return c.html('<h1>الشركة غير موجودة</h1>')
    }
    
    // Get tenant statistics
    const stats = await c.env.DB.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE tenant_id = ?) as total_users,
        (SELECT COUNT(*) FROM customers WHERE tenant_id = ?) as total_customers,
        (SELECT COUNT(*) FROM financing_requests WHERE tenant_id = ?) as total_requests
    `).bind(id, id, id).first()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>عرض شركة - ${tenant.company_name}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
          <div class="max-w-6xl mx-auto p-6">
              <div class="mb-6 flex justify-between items-center">
                  <a href="/admin/tenants" class="text-blue-600 hover:text-blue-800">
                      <i class="fas fa-arrow-right ml-2"></i>
                      العودة لقائمة الشركات
                  </a>
                  <div class="flex gap-3">
                      <a href="/admin/tenants/${id}/edit" class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg">
                          <i class="fas fa-edit ml-2"></i>
                          تعديل
                      </a>
                      <a href="/c/${tenant.slug}/admin" target="_blank" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
                          <i class="fas fa-external-link-alt ml-2"></i>
                          لوحة التحكم
                      </a>
                  </div>
              </div>
              
              <!-- Company Header -->
              <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-xl shadow-lg p-8 mb-6">
                  <div class="flex items-center justify-between">
                      <div>
                          <h1 class="text-3xl font-bold mb-2">
                              <i class="fas fa-building ml-2"></i>
                              ${tenant.company_name}
                          </h1>
                          <p class="text-emerald-100 text-lg">
                              <code class="bg-white/20 px-3 py-1 rounded">${tenant.slug}</code>
                          </p>
                      </div>
                      <div class="text-right">
                          <span class="inline-block px-6 py-2 bg-white/20 rounded-full text-xl font-bold">
                              ${tenant.status === 'active' ? '🟢 نشط' : tenant.status === 'trial' ? '🟡 تجريبي' : '🔴 متوقف'}
                          </span>
                      </div>
                  </div>
              </div>
              
              <!-- Statistics -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">المستخدمين</p>
                              <p class="text-3xl font-bold text-blue-600">${stats?.total_users || 0}</p>
                              <p class="text-gray-500 text-xs mt-1">من ${tenant.max_users} مسموح</p>
                          </div>
                          <i class="fas fa-users text-4xl text-blue-200"></i>
                      </div>
                  </div>
                  
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">العملاء</p>
                              <p class="text-3xl font-bold text-green-600">${stats?.total_customers || 0}</p>
                          </div>
                          <i class="fas fa-user-friends text-4xl text-green-200"></i>
                      </div>
                  </div>
                  
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">طلبات التمويل</p>
                              <p class="text-3xl font-bold text-purple-600">${stats?.total_requests || 0}</p>
                          </div>
                          <i class="fas fa-file-invoice text-4xl text-purple-200"></i>
                      </div>
                  </div>
              </div>
              
              <!-- Company Details -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="p-6 bg-gray-50 border-b">
                      <h2 class="text-xl font-bold text-gray-800">
                          <i class="fas fa-info-circle ml-2"></i>
                          تفاصيل الشركة
                      </h2>
                  </div>
                  <div class="p-6">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">اسم الشركة</label>
                              <p class="text-lg font-semibold text-gray-900">${tenant.company_name}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">Slug</label>
                              <p class="text-lg font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded inline-block">${tenant.slug}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">Subdomain</label>
                              <p class="text-lg font-mono text-gray-900">${tenant.subdomain || '-'}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">الحد الأقصى للمستخدمين</label>
                              <p class="text-lg font-semibold text-gray-900">${tenant.max_users || 10} مستخدم</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">البريد الإلكتروني</label>
                              <p class="text-lg text-gray-900">${tenant.contact_email || '-'}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">رقم الهاتف</label>
                              <p class="text-lg text-gray-900">${tenant.contact_phone || '-'}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">تاريخ الإنشاء</label>
                              <p class="text-lg text-gray-900">${new Date(tenant.created_at).toLocaleDateString('ar-SA')}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">الحالة</label>
                              <span class="inline-flex px-4 py-2 text-sm font-semibold rounded-full 
                                  ${tenant.status === 'active' ? 'bg-green-100 text-green-800' : 
                                    tenant.status === 'trial' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'}">
                                  ${tenant.status === 'active' ? 'نشط' : tenant.status === 'trial' ? 'تجريبي' : 'متوقف'}
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
              
              <!-- Quick Actions -->
              <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <h2 class="text-xl font-bold text-gray-800 mb-4">
                      <i class="fas fa-bolt ml-2"></i>
                      إجراءات سريعة
                  </h2>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <a href="/c/${tenant.slug}/admin" target="_blank" 
                         class="flex flex-col items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all">
                          <i class="fas fa-tachometer-alt text-2xl text-emerald-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">لوحة التحكم</span>
                      </a>
                      <a href="/c/${tenant.slug}/calculator" target="_blank" 
                         class="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all">
                          <i class="fas fa-calculator text-2xl text-blue-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">حاسبة التمويل</span>
                      </a>
                      <a href="/admin/tenants/${id}/edit" 
                         class="flex flex-col items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-all">
                          <i class="fas fa-edit text-2xl text-yellow-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">تعديل البيانات</span>
                      </a>
                      <button onclick="if(confirm('هل أنت متأكد من الحذف؟')) window.location.href='/admin/tenants'" 
                         class="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-all">
                          <i class="fas fa-trash text-2xl text-red-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">حذف الشركة</span>
                      </button>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `);
  } catch (error: any) {
    return c.html(`<h1>خطأ في تحميل الصفحة: ${error.message}</h1>`)
  }
})

app.get('/admin/tenants', (c) => c.html(tenantsPage))
app.get('/admin/tenant-calculators', (c) => c.html(tenantCalculatorsPage))
app.get('/admin/saas-settings', (c) => c.html(saasSettingsPage))
app.get('/admin/reports', (c) => c.html(reportsPage))
app.get('/admin/banks', (c) => c.html(banksManagementPage))

// Tenant-specific admin panel
app.get('/c/:tenant/admin', async (c) => {
  const tenantSlug = c.req.param('tenant')
  
  // Get tenant information from database
  const tenant = await c.env.DB.prepare(`
    SELECT * FROM tenants WHERE slug = ? AND status = 'active'
  `).bind(tenantSlug).first()
  
  if (!tenant) {
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>شركة غير موجودة</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
          <i class="fas fa-building text-6xl text-red-500 mb-4"></i>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">الشركة غير موجودة</h1>
          <p class="text-gray-600 mb-6">لم نتمكن من العثور على هذه الشركة</p>
          <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
            <i class="fas fa-home ml-2"></i>
            العودة للصفحة الرئيسية
          </a>
        </div>
      </body>
      </html>
    `)
  }
  
  // Return admin panel with tenant branding
  // Note: User name and email are loaded dynamically from localStorage by JavaScript
  return c.html(fullAdminPanel
    .replace('لوحة التحكم - نظام حاسبة التمويل', `لوحة التحكم - ${tenant.company_name}`)
  )
})

app.get('/test', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تسجيل الدخول مطلوب</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full mx-4">
            <div class="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div class="mb-6">
                    <i class="fas fa-lock text-6xl text-blue-600"></i>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">تسجيل الدخول مطلوب</h1>
                <p class="text-gray-600 mb-6">
                    يجب تسجيل الدخول للوصول إلى صفحة الاختبار
                </p>
                <div class="space-y-3">
                    <a href="/login" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-sign-in-alt ml-2"></i>
                        تسجيل الدخول
                    </a>
                    <a href="/" class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-home ml-2"></i>
                        العودة للرئيسية
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `)
})

// صفحات منفصلة لكل قسم
app.get('/admin/dashboard', async (c) => {
  try {
    // Comprehensive statistics query
    const stats = await c.env.DB.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM customers) as total_customers,
        (SELECT COUNT(*) FROM financing_requests) as total_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'pending') as pending_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'approved') as approved_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'rejected') as rejected_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'under_review') as under_review_requests,
        (SELECT SUM(requested_amount) FROM financing_requests) as total_requested_amount,
        (SELECT SUM(requested_amount) FROM financing_requests WHERE status = 'approved') as total_approved_amount,
        (SELECT COUNT(*) FROM banks WHERE is_active = 1) as active_banks,
        (SELECT COUNT(*) FROM financing_types) as financing_types_count
    `).first()
    
    // Monthly requests trend (last 6 months)
    const monthlyTrend = await c.env.DB.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count,
        SUM(requested_amount) as total_amount
      FROM financing_requests
      WHERE created_at >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `).all()
    
    // Top banks by requests
    const topBanks = await c.env.DB.prepare(`
      SELECT 
        b.bank_name,
        COUNT(fr.id) as request_count,
        SUM(fr.requested_amount) as total_amount
      FROM banks b
      LEFT JOIN financing_requests fr ON b.id = fr.selected_bank_id
      WHERE fr.id IS NOT NULL
      GROUP BY b.id, b.bank_name
      ORDER BY request_count DESC
      LIMIT 5
    `).all()
    
    // Status distribution
    const statusDistribution = await c.env.DB.prepare(`
      SELECT 
        status,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM financing_requests), 2) as percentage
      FROM financing_requests
      GROUP BY status
    `).all()
    
    const monthlyData = monthlyTrend.results || []
    const topBanksData = topBanks.results || []
    const statusData = statusDistribution.results || []
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>لوحة المعلومات المتقدمة</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <style>
          @media print {
            button, nav, .no-print { display: none; }
            .print-full-width { width: 100%; }
          }
        </style>
      </head>
      <body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div class="max-w-7xl mx-auto p-6">
          <!-- Header -->
          <div class="flex justify-between items-center mb-8 no-print">
            <div>
              <a href="/admin" class="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                <i class="fas fa-arrow-right ml-1"></i>
                العودة للوحة الرئيسية
              </a>
              <h1 class="text-4xl font-bold text-gray-800">
                <i class="fas fa-chart-line text-blue-600 ml-2"></i>
                لوحة المعلومات المتقدمة
              </h1>
              <p class="text-gray-600 mt-2">تحليلات وإحصائيات شاملة لنظام حاسبة التمويل</p>
            </div>
            <div class="flex gap-3">
              <button onclick="window.print()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-print ml-2"></i>
                طباعة التقرير
              </button>
              <button onclick="doLogout()" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                <i class="fas fa-sign-out-alt ml-2"></i>
                تسجيل الخروج
              </button>
            </div>
          </div>

          <!-- Main Statistics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-100 text-sm mb-1">إجمالي العملاء</p>
                  <p class="text-4xl font-bold">${(stats as any)?.total_customers || 0}</p>
                </div>
                <i class="fas fa-users text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-100 text-sm mb-1">إجمالي الطلبات</p>
                  <p class="text-4xl font-bold">${(stats as any)?.total_requests || 0}</p>
                </div>
                <i class="fas fa-file-invoice text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-yellow-100 text-sm mb-1">قيد الانتظار</p>
                  <p class="text-4xl font-bold">${(stats as any)?.pending_requests || 0}</p>
                </div>
                <i class="fas fa-clock text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-purple-100 text-sm mb-1">موافق عليها</p>
                  <p class="text-4xl font-bold">${(stats as any)?.approved_requests || 0}</p>
                </div>
                <i class="fas fa-check-circle text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-red-100 text-sm mb-1">مرفوضة</p>
                  <p class="text-4xl font-bold">${(stats as any)?.rejected_requests || 0}</p>
                </div>
                <i class="fas fa-times-circle text-6xl opacity-20"></i>
              </div>
            </div>
          </div>

          <!-- Financial Summary & KPIs -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-blue-100 rounded-full p-3 ml-4">
                  <i class="fas fa-money-bill-wave text-2xl text-blue-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">إجمالي التمويل المطلوب</p>
                  <p class="text-2xl font-bold text-gray-800">${parseFloat((stats as any)?.total_requested_amount || 0).toLocaleString('ar-SA')} ر.س</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-green-100 rounded-full p-3 ml-4">
                  <i class="fas fa-check-double text-2xl text-green-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">التمويل الموافق عليه</p>
                  <p class="text-2xl font-bold text-gray-800">${parseFloat((stats as any)?.total_approved_amount || 0).toLocaleString('ar-SA')} ر.س</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-purple-100 rounded-full p-3 ml-4">
                  <i class="fas fa-percentage text-2xl text-purple-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">نسبة القبول</p>
                  <p class="text-2xl font-bold text-gray-800">${(((stats as any)?.approved_requests || 0) / Math.max((stats as any)?.total_requests, 1) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-orange-100 rounded-full p-3 ml-4">
                  <i class="fas fa-calculator text-2xl text-orange-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">متوسط المبلغ</p>
                  <p class="text-2xl font-bold text-gray-800">${(parseFloat((stats as any)?.total_requested_amount || 0) / Math.max((stats as any)?.total_requests, 1)).toLocaleString('ar-SA', {maximumFractionDigits: 0})} ر.س</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Insights -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-2">
                  <i class="fas fa-lightbulb ml-2"></i>
                  رؤى سريعة
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">أكثر البنوك طلباً</p>
                    <p class="text-xl font-bold mt-1">${topBanksData[0]?.bank_name || 'لا يوجد'}</p>
                  </div>
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">الطلبات النشطة</p>
                    <p class="text-xl font-bold mt-1">${((stats as any)?.pending_requests || 0) + ((stats as any)?.under_review_requests || 0)}</p>
                  </div>
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">معدل النجاح</p>
                    <p class="text-xl font-bold mt-1">${(((stats as any)?.approved_requests || 0) / Math.max(((stats as any)?.approved_requests || 0) + ((stats as any)?.rejected_requests || 0), 1) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Monthly Trend Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-line text-blue-600 ml-2"></i>
                الطلبات الشهرية (آخر 6 أشهر)
              </h3>
              <canvas id="monthlyTrendChart"></canvas>
            </div>
            
            <!-- Status Distribution Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-pie text-purple-600 ml-2"></i>
                توزيع حالات الطلبات
              </h3>
              <canvas id="statusChart"></canvas>
            </div>
          </div>

          <!-- Top Banks Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Top Banks Table -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-trophy text-yellow-500 ml-2"></i>
                أكثر البنوك نشاطاً
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-right">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-3 text-gray-700 font-bold">الترتيب</th>
                      <th class="px-4 py-3 text-gray-700 font-bold">البنك</th>
                      <th class="px-4 py-3 text-gray-700 font-bold">الطلبات</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${topBanksData.map((bank: any, index: number) => {
                      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1).toString()
                      return `
                      <tr class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">
                          <span class="text-2xl">${medal}</span>
                        </td>
                        <td class="px-4 py-3 font-bold text-gray-800">${bank.bank_name}</td>
                        <td class="px-4 py-3 text-blue-600 font-bold">${bank.request_count}</td>
                      </tr>
                      `
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Top Banks Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-bar text-green-600 ml-2"></i>
                توزيع الطلبات حسب البنوك
              </h3>
              <canvas id="banksChart"></canvas>
            </div>
          </div>

          <!-- Status Details -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
              <i class="fas fa-info-circle text-blue-600 ml-2"></i>
              تفاصيل حالات الطلبات
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              ${statusData.map((item: any) => {
                const statusInfo = {
                  'pending': { color: 'yellow', icon: 'clock', label: 'قيد الانتظار' },
                  'under_review': { color: 'blue', icon: 'search', label: 'قيد المراجعة' },
                  'approved': { color: 'green', icon: 'check-circle', label: 'موافق' },
                  'rejected': { color: 'red', icon: 'times-circle', label: 'مرفوض' }
                }[item.status] || { color: 'gray', icon: 'question', label: item.status }
                
                return `
                  <div class="bg-${statusInfo.color}-50 border-2 border-${statusInfo.color}-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <i class="fas fa-${statusInfo.icon} text-2xl text-${statusInfo.color}-600"></i>
                      <span class="text-3xl font-bold text-${statusInfo.color}-600">${item.count}</span>
                    </div>
                    <p class="text-sm text-gray-700 font-bold">${statusInfo.label}</p>
                    <p class="text-xs text-gray-600">${item.percentage}% من الإجمالي</p>
                  </div>
                `
              }).join('')}
            </div>
          </div>

        </div>

        <script>
          // Monthly Trend Chart
          const monthlyCtx = document.getElementById('monthlyTrendChart').getContext('2d');
          const monthlyData = ${JSON.stringify(monthlyData)};
          
          new Chart(monthlyCtx, {
            type: 'line',
            data: {
              labels: monthlyData.map(d => d.month),
              datasets: [{
                label: 'عدد الطلبات',
                data: monthlyData.map(d => d.count),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }
          });
          
          // Status Distribution Chart
          const statusCtx = document.getElementById('statusChart').getContext('2d');
          const statusData = ${JSON.stringify(statusData)};
          
          const statusColors = {
            'pending': '#EAB308',
            'under_review': '#3B82F6',
            'approved': '#10B981',
            'rejected': '#EF4444'
          };
          
          const statusLabels = {
            'pending': 'قيد الانتظار',
            'under_review': 'قيد المراجعة',
            'approved': 'موافق',
            'rejected': 'مرفوض'
          };
          
          new Chart(statusCtx, {
            type: 'doughnut',
            data: {
              labels: statusData.map(d => statusLabels[d.status] || d.status),
              datasets: [{
                data: statusData.map(d => d.count),
                backgroundColor: statusData.map(d => statusColors[d.status] || '#6B7280'),
                borderWidth: 2,
                borderColor: '#fff'
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'right' }
              }
            }
          });
          
          // Banks Distribution Chart
          const banksCtx = document.getElementById('banksChart').getContext('2d');
          const topBanksData = ${JSON.stringify(topBanksData)};
          
          new Chart(banksCtx, {
            type: 'bar',
            data: {
              labels: topBanksData.map(b => b.bank_name),
              datasets: [{
                label: 'عدد الطلبات',
                data: topBanksData.map(b => b.request_count),
                backgroundColor: [
                  'rgba(234, 179, 8, 0.8)',
                  'rgba(192, 192, 192, 0.8)',
                  'rgba(205, 127, 50, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: [
                  'rgb(234, 179, 8)',
                  'rgb(192, 192, 192)',
                  'rgb(205, 127, 50)',
                  'rgb(59, 130, 246)',
                  'rgb(16, 185, 129)'
                ],
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  ticks: { stepSize: 1 }
                }
              }
            }
          });
          
          // دالة تسجيل الخروج
          function doLogout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
              console.log('🚪 تسجيل الخروج من لوحة المعلومات...');
              localStorage.removeItem('user');
              localStorage.removeItem('userData');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// صفحة إضافة عميل جديد - يجب أن تكون قبل /:id
app.get('/admin/customers/add', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة عميل جديد</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/customers" class="text-blue-600 hover:text-blue-800">← العودة لقائمة العملاء</a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">
            <i class="fas fa-user-plus text-green-600 ml-2"></i>
            إضافة عميل جديد
          </h1>
          
          <form method="POST" action="/api/customers" enctype="application/x-www-form-urlencoded" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-user text-blue-600 ml-1"></i>
                  الاسم الكامل *
                </label>
                <input type="text" name="full_name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: أحمد محمد السعيد">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-phone text-green-600 ml-1"></i>
                  رقم الهاتف *
                </label>
                <input type="tel" name="phone" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="05xxxxxxxx">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-envelope text-red-600 ml-1"></i>
                  البريد الإلكتروني
                </label>
                <input type="email" name="email" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="example@domain.com">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-id-card text-purple-600 ml-1"></i>
                  الرقم الوطني *
                </label>
                <input type="text" name="national_id" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="1xxxxxxxxx">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar text-orange-600 ml-1"></i>
                  تاريخ الميلاد
                </label>
                <input type="date" name="date_of_birth" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-building text-indigo-600 ml-1"></i>
                  اسم جهة العمل
                </label>
                <input type="text" name="employer_name" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: شركة أرامكو">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-briefcase text-teal-600 ml-1"></i>
                  المسمى الوظيفي
                </label>
                <input type="text" name="job_title" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: مهندس">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar-check text-pink-600 ml-1"></i>
                  تاريخ بدء العمل
                </label>
                <input type="date" name="work_start_date" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-map-marker-alt text-red-600 ml-1"></i>
                  المدينة
                </label>
                <input type="text" name="city" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: الرياض">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill text-green-600 ml-1"></i>
                  الراتب الشهري *
                </label>
                <input type="number" name="monthly_salary" step="0.01" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="10000.00">
              </div>
            </div>
            
            <div class="flex gap-4">
              <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-plus ml-2"></i>
                إضافة العميل
              </button>
              <a href="/admin/customers" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `)
})

app.get('/admin/customers', async (c) => {
  try {
    const customers = await c.env.DB.prepare('SELECT * FROM customers ORDER BY created_at DESC').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>العملاء</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-users text-green-600 ml-2"></i>
                العملاء (<span id="totalCount">${customers.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
                <a href="/admin/customers/add" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة عميل جديد
                </a>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="name">الاسم فقط</option>
                    <option value="phone">الهاتف فقط</option>
                    <option value="email">البريد فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="min-w-full" id="dataTable">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">#</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الهاتف</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التسجيل</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="tableBody">
                ${customers.results.map((customer: any) => `
                  <tr class="hover:bg-gray-50" data-name="${customer.full_name || ''}" data-phone="${customer.phone || ''}" data-email="${customer.email || ''}">
                    <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-900">${customer.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-medium">${customer.full_name || '-'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${customer.phone || '-'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${customer.email || '-'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${new Date(customer.created_at).toLocaleDateString('ar-SA')}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <div class="flex items-center justify-center gap-2">
                        <a href="/admin/customers/${customer.id}/report" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm" title="تقرير العميل الكامل">
                          <i class="fas fa-file-alt"></i> تقرير
                        </a>
                        <a href="/admin/customers/${customer.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/customers/${customer.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/customers/${customer.id}/delete" onclick="return confirm('هل أنت متأكد من حذف هذا العميل؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const name = row.getAttribute('data-name') || ''
              const phone = row.getAttribute('data-phone') || ''
              const email = row.getAttribute('data-email') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'name':
                    shouldShow = name.toLowerCase().includes(searchInput)
                    break
                  case 'phone':
                    shouldShow = phone.toLowerCase().includes(searchInput)
                    break
                  case 'email':
                    shouldShow = email.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = name.toLowerCase().includes(searchInput) || 
                                phone.toLowerCase().includes(searchInput) || 
                                email.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          // إعادة تعيين الفلاتر
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          // التصدير إلى CSV
          function exportToCSV() {
            const data = [
              ['#', 'الاسم', 'الهاتف', 'البريد الإلكتروني', 'الرقم الوطني', 'تاريخ التسجيل'],
              ${customers.results.map((customer: any) => `['${customer.id}', '${customer.full_name || '-'}', '${customer.phone || '-'}', '${customer.email || '-'}', '${customer.national_id || '-'}', '${new Date(customer.created_at).toLocaleDateString('ar-SA')}']`).join(',\n              ')}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'العملاء_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة مركز الإشعارات ====================
app.get('/admin/notifications', async (c) => {
  try {
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>مركز الإشعارات</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .notification-card {
            transition: all 0.3s ease;
          }
          .notification-card:hover {
            transform: translateX(-5px);
          }
          .notification-unread {
            background: linear-gradient(to right, #EFF6FF, #FFFFFF);
            border-right: 4px solid #3B82F6;
          }
          .notification-read {
            background: #FFFFFF;
            opacity: 0.85;
          }
          .badge-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="container mx-auto px-4 py-8">
          <!-- Header -->
          <div class="flex justify-between items-center mb-8">
            <div>
              <h1 class="text-4xl font-bold text-gray-800 flex items-center gap-3">
                <i class="fas fa-bell text-blue-600"></i>
                مركز الإشعارات
              </h1>
              <p class="text-gray-600 mt-2">إدارة جميع إشعارات النظام</p>
            </div>
            <div class="flex gap-3">
              <button onclick="markAllAsRead()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-bold">
                <i class="fas fa-check-double ml-2"></i>
                تحديد الكل كمقروء
              </button>
              <a href="/admin" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition font-bold">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة
              </a>
            </div>
          </div>

          <!-- Statistics -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-100 text-sm mb-1">إجمالي الإشعارات</p>
                  <p class="text-4xl font-bold" id="totalCount">0</p>
                </div>
                <i class="fas fa-bell text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-100 text-sm mb-1">غير مقروءة</p>
                  <p class="text-4xl font-bold badge-pulse" id="unreadCount">0</p>
                </div>
                <i class="fas fa-envelope text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-purple-100 text-sm mb-1">مقروءة</p>
                  <p class="text-4xl font-bold" id="readCount">0</p>
                </div>
                <i class="fas fa-envelope-open text-6xl opacity-20"></i>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <div class="flex flex-wrap gap-3">
              <button onclick="filterNotifications('all')" class="filter-btn active px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-list ml-2"></i>
                الكل
              </button>
              <button onclick="filterNotifications('unread')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-envelope ml-2"></i>
                غير مقروءة
              </button>
              <button onclick="filterNotifications('read')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-envelope-open ml-2"></i>
                مقروءة
              </button>
              <button onclick="filterNotifications('request')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-file-invoice ml-2"></i>
                طلبات جديدة
              </button>
              <button onclick="filterNotifications('status_change')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-sync ml-2"></i>
                تحديثات الحالة
              </button>
            </div>
          </div>

          <!-- Notifications List -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div id="notificationsList" class="space-y-4">
              <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">جاري تحميل الإشعارات...</p>
              </div>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          let allNotifications = [];
          let currentFilter = 'all';

          async function loadNotifications() {
            try {
              const response = await axios.get('/api/notifications');
              if (response.data.success) {
                allNotifications = response.data.data;
                updateStats();
                renderNotifications();
              }
            } catch (error) {
              console.error('Error loading notifications:', error);
              document.getElementById('notificationsList').innerHTML = \`
                <div class="text-center py-12">
                  <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                  <p class="text-red-600">حدث خطأ في تحميل الإشعارات</p>
                </div>
              \`;
            }
          }

          function updateStats() {
            const total = allNotifications.length;
            const unread = allNotifications.filter(n => n.is_read === 0).length;
            const read = total - unread;

            document.getElementById('totalCount').textContent = total;
            document.getElementById('unreadCount').textContent = unread;
            document.getElementById('readCount').textContent = read;
          }

          function filterNotifications(filter) {
            currentFilter = filter;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
              btn.classList.remove('active', 'bg-blue-600', 'text-white');
              btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            });
            event.target.closest('button').classList.add('active', 'bg-blue-600', 'text-white');
            event.target.closest('button').classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            
            renderNotifications();
          }

          function renderNotifications() {
            let filtered = allNotifications;

            if (currentFilter === 'unread') {
              filtered = allNotifications.filter(n => n.is_read === 0);
            } else if (currentFilter === 'read') {
              filtered = allNotifications.filter(n => n.is_read === 1);
            } else if (currentFilter === 'request' || currentFilter === 'status_change') {
              filtered = allNotifications.filter(n => n.category === currentFilter);
            }

            if (filtered.length === 0) {
              document.getElementById('notificationsList').innerHTML = \`
                <div class="text-center py-12">
                  <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                  <p class="text-gray-600">لا توجد إشعارات</p>
                </div>
              \`;
              return;
            }

            const html = filtered.map(notification => {
              const typeIcons = {
                info: 'fa-info-circle text-blue-600',
                success: 'fa-check-circle text-green-600',
                warning: 'fa-exclamation-triangle text-yellow-600',
                error: 'fa-times-circle text-red-600'
              };

              const categoryIcons = {
                request: 'fa-file-invoice',
                status_change: 'fa-sync',
                system: 'fa-cog',
                general: 'fa-bell'
              };

              const typeIcon = typeIcons[notification.type] || typeIcons.info;
              const categoryIcon = categoryIcons[notification.category] || categoryIcons.general;
              
              return \`
                <div class="notification-card \${notification.is_read === 0 ? 'notification-unread' : 'notification-read'} rounded-lg p-4 shadow-sm">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <i class="fas \${typeIcon} text-3xl"></i>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between mb-2">
                        <h3 class="text-lg font-bold text-gray-800">\${notification.title}</h3>
                        <div class="flex gap-2">
                          \${notification.is_read === 0 ? \`
                            <button onclick="markAsRead(\${notification.id})" class="text-blue-600 hover:text-blue-800 transition" title="تحديد كمقروء">
                              <i class="fas fa-check"></i>
                            </button>
                          \` : ''}
                          <button onclick="deleteNotification(\${notification.id})" class="text-red-600 hover:text-red-800 transition" title="حذف">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p class="text-gray-700 mb-3">\${notification.message}</p>
                      <div class="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <i class="fas \${categoryIcon} ml-1"></i>
                          \${notification.category === 'request' ? 'طلب جديد' : 
                            notification.category === 'status_change' ? 'تحديث حالة' : 
                            notification.category === 'system' ? 'نظام' : 'عام'}
                        </span>
                        <span>
                          <i class="fas fa-clock ml-1"></i>
                          \${new Date(notification.created_at).toLocaleString('ar-SA')}
                        </span>
                        \${notification.related_request_id ? \`
                          <a href="/admin/requests/\${notification.related_request_id}" class="text-blue-600 hover:text-blue-800 font-bold">
                            <i class="fas fa-external-link-alt ml-1"></i>
                            عرض الطلب #\${notification.related_request_id}
                          </a>
                        \` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');

            document.getElementById('notificationsList').innerHTML = html;
          }

          async function markAsRead(id) {
            try {
              await axios.put(\`/api/notifications/\${id}/read\`);
              await loadNotifications();
            } catch (error) {
              console.error('Error marking as read:', error);
              alert('حدث خطأ في تحديد الإشعار كمقروء');
            }
          }

          async function markAllAsRead() {
            try {
              await axios.put('/api/notifications/read-all');
              await loadNotifications();
              alert('✓ تم تحديد جميع الإشعارات كمقروءة');
            } catch (error) {
              console.error('Error marking all as read:', error);
              alert('حدث خطأ في تحديد الإشعارات');
            }
          }

          async function deleteNotification(id) {
            if (!confirm('هل أنت متأكد من حذف هذا الإشعار؟')) return;
            
            try {
              await axios.delete(\`/api/notifications/\${id}\`);
              await loadNotifications();
            } catch (error) {
              console.error('Error deleting notification:', error);
              alert('حدث خطأ في حذف الإشعار');
            }
          }

          // Load notifications on page load
          loadNotifications();
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// Edit financing request page
app.get('/admin/requests/:id/edit', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Get request details
    const request = await c.env.DB.prepare(`
      SELECT 
        fr.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        b.bank_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      WHERE fr.id = ?
    `).bind(id).first()
    
    if (!request) {
      return c.html('<h1>الطلب غير موجود</h1>')
    }
    
    // Get all banks for dropdown
    const banks = await c.env.DB.prepare(`
      SELECT id, bank_name FROM banks ORDER BY bank_name
    `).all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تعديل طلب التمويل #${id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">← العودة للطلبات</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">
              <i class="fas fa-edit text-yellow-600 ml-2"></i>
              تعديل طلب التمويل #${id}
            </h1>
            
            <form id="editForm" onsubmit="handleSubmit(event)" class="space-y-6">
              <!-- Customer Information (Read Only) -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-user ml-2"></i>
                  معلومات العميل (للعرض فقط)
                </h2>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-gray-700"><strong>اسم العميل:</strong> ${request.customer_name || 'غير محدد'}</p>
                  <p class="text-gray-700"><strong>رقم الجوال:</strong> ${request.customer_phone || 'غير محدد'}</p>
                  <p class="text-gray-700"><strong>البنك:</strong> ${request.bank_name || 'غير محدد'}</p>
                </div>
              </div>
              
              <!-- Financing Information -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-money-bill-wave ml-2"></i>
                  معلومات التمويل
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">المبلغ المطلوب</label>
                    <input 
                      type="number" 
                      id="requested_amount"
                      value="${request.requested_amount || 0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">مدة التمويل (بالأشهر)</label>
                    <input 
                      type="number" 
                      id="duration_months"
                      value="${request.duration_months || 0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                  </div>
                </div>
              </div>
              
              <!-- Financial Details -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-chart-line ml-2"></i>
                  التفاصيل المالية
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الراتب وقت الطلب</label>
                    <input 
                      type="number" 
                      id="salary_at_request"
                      value="${request.salary_at_request || 0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الالتزامات الشهرية</label>
                    <input 
                      type="number" 
                      id="monthly_obligations"
                      value="${request.monthly_obligations || 0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                </div>
              </div>
              
              <!-- Attachments Section -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-paperclip ml-2"></i>
                  المرفقات
                </h2>
                
                <!-- Current Attachments -->
                <div class="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold text-gray-700 mb-3">المرفقات الحالية:</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="border-r pr-4">
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-id-card ml-1"></i> صورة الهوية:</p>
                      ${request.id_attachment_url ? `
                        <a href="${request.id_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      ` : '<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div>
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-file-invoice ml-1"></i> كشف الحساب:</p>
                      ${request.bank_statement_attachment_url ? `
                        <a href="${request.bank_statement_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      ` : '<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div class="border-r pr-4">
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-money-check ml-1"></i> تعريف الراتب:</p>
                      ${request.salary_attachment_url ? `
                        <a href="${request.salary_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      ` : '<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div>
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-file-alt ml-1"></i> مرفقات إضافية:</p>
                      ${request.additional_attachment_url ? `
                        <a href="${request.additional_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      ` : '<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                  </div>
                </div>
                
                <!-- Upload New Attachments -->
                <div class="space-y-4">
                  <h3 class="font-bold text-gray-700 mb-3">رفع مرفقات جديدة (اختياري):</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- ID Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-id-card ml-1"></i> صورة الهوية
                      </label>
                      <input 
                        type="file"
                        id="id_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('id_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="id_attachment_preview" class="mt-2"></div>
                    </div>
                    
                    <!-- Bank Statement Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-file-invoice ml-1"></i> كشف الحساب البنكي
                      </label>
                      <input 
                        type="file"
                        id="bank_statement_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('bank_statement_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="bank_statement_attachment_preview" class="mt-2"></div>
                    </div>
                    
                    <!-- Salary Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-money-check ml-1"></i> تعريف الراتب
                      </label>
                      <input 
                        type="file"
                        id="salary_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('salary_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="salary_attachment_preview" class="mt-2"></div>
                    </div>
                    
                    <!-- Additional Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-file-alt ml-1"></i> مرفقات إضافية
                      </label>
                      <input 
                        type="file"
                        id="additional_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('additional_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="additional_attachment_preview" class="mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Status and Notes -->
              <div>
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-clipboard ml-2"></i>
                  الحالة والملاحظات
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                    <select 
                      id="status"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="pending" ${request.status === 'pending' ? 'selected' : ''}>قيد الانتظار</option>
                      <option value="under_review" ${request.status === 'under_review' ? 'selected' : ''}>قيد المراجعة</option>
                      <option value="approved" ${request.status === 'approved' ? 'selected' : ''}>موافق عليه</option>
                      <option value="rejected" ${request.status === 'rejected' ? 'selected' : ''}>مرفوض</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">الملاحظات</label>
                    <textarea 
                      id="notes"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="أضف ملاحظات..."
                    >${request.notes || ''}</textarea>
                  </div>
                </div>
              </div>
              
              <!-- Submit Buttons -->
              <div class="flex gap-4">
                <button 
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-save ml-2"></i>
                  حفظ التعديلات
                </button>
                <a 
                  href="/admin/requests"
                  class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all text-center"
                >
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
            
            <div id="message" class="mt-4"></div>
          </div>
        </div>
        
        <script>
          const attachmentFiles = {
            id_attachment: null,
            bank_statement_attachment: null,
            salary_attachment: null,
            additional_attachment: null
          }
          
          function handleFileSelect(fieldName) {
            const fileInput = document.getElementById(fieldName)
            const file = fileInput.files[0]
            const previewDiv = document.getElementById(fieldName + '_preview')
            
            if (!file) {
              previewDiv.innerHTML = ''
              attachmentFiles[fieldName] = null
              return
            }
            
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
              previewDiv.innerHTML = '<span class="text-red-500 text-sm">الملف كبير جداً. الحد الأقصى 5MB</span>'
              fileInput.value = ''
              attachmentFiles[fieldName] = null
              return
            }
            
            attachmentFiles[fieldName] = file
            previewDiv.innerHTML = \`
              <div class="text-sm text-green-600">
                <i class="fas fa-check-circle ml-1"></i>
                تم اختيار: \${file.name} (\${(file.size / 1024).toFixed(1)} KB)
              </div>
            \`
          }
          
          async function uploadAttachment(file, attachmentType) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('attachmentType', attachmentType)
            
            try {
              const response = await axios.post('/api/attachments/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              
              return response.data.url
            } catch (error) {
              console.error('Upload error:', error)
              throw error
            }
          }
          
          async function handleSubmit(event) {
            event.preventDefault()
            
            // Show loading message
            document.getElementById('message').innerHTML = \`
              <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <i class="fas fa-spinner fa-spin ml-2"></i>
                جاري حفظ التعديلات...
              </div>
            \`
            
            const data = {
              requested_amount: parseFloat(document.getElementById('requested_amount').value),
              duration_months: parseInt(document.getElementById('duration_months').value),
              salary_at_request: parseFloat(document.getElementById('salary_at_request').value) || 0,
              monthly_obligations: parseFloat(document.getElementById('monthly_obligations').value) || 0,
              status: document.getElementById('status').value,
              notes: document.getElementById('notes').value
            }
            
            try {
              // Upload attachments if selected
              if (attachmentFiles.id_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع صورة الهوية...
                  </div>
                \`
                data.id_attachment_url = await uploadAttachment(attachmentFiles.id_attachment, 'id')
              }
              
              if (attachmentFiles.bank_statement_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع كشف الحساب...
                  </div>
                \`
                data.bank_statement_attachment_url = await uploadAttachment(attachmentFiles.bank_statement_attachment, 'bank_statement')
              }
              
              if (attachmentFiles.salary_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع تعريف الراتب...
                  </div>
                \`
                data.salary_attachment_url = await uploadAttachment(attachmentFiles.salary_attachment, 'salary')
              }
              
              if (attachmentFiles.additional_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع المرفقات الإضافية...
                  </div>
                \`
                data.additional_attachment_url = await uploadAttachment(attachmentFiles.additional_attachment, 'additional')
              }
              
              // Update financing request
              document.getElementById('message').innerHTML = \`
                <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                  <i class="fas fa-spinner fa-spin ml-2"></i>
                  جاري حفظ التعديلات النهائية...
                </div>
              \`
              
              const response = await axios.put('/api/financing-requests/${id}', data)
              
              if (response.data.success) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <i class="fas fa-check-circle ml-2"></i>
                    تم تحديث الطلب والمرفقات بنجاح!
                  </div>
                \`
                
                setTimeout(() => {
                  window.location.href = '/admin/requests'
                }, 2000)
              }
            } catch (error) {
              console.error('Error:', error)
              document.getElementById('message').innerHTML = \`
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <i class="fas fa-exclamation-circle ml-2"></i>
                  خطأ في التحديث: \${error.response?.data?.error || error.message}
                </div>
              \`
            }
          }
        </script>
      </body>
      </html>
    `)
  } catch (error: any) {
    console.error('Edit request page error:', error)
    return c.html(`<h1>خطأ في تحميل الصفحة: ${error.message}</h1>`)
  }
})

app.get('/admin/requests', async (c) => {
  try {
    const requests = await c.env.DB.prepare(`
      SELECT 
        fr.id,
        fr.customer_id,
        fr.selected_bank_id,
        fr.requested_amount,
        fr.duration_months,
        fr.status,
        fr.created_at,
        c.full_name as customer_name,
        b.bank_name as bank_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      ORDER BY fr.created_at DESC
    `).all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>طلبات التمويل</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-file-invoice text-purple-600 ml-2"></i>
                طلبات التمويل (<span id="totalCount">${requests.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/requests/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="customer">اسم العميل فقط</option>
                    <option value="bank">البنك فقط</option>
                    <option value="status">الحالة فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="min-w-full" id="dataTable">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البنك</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدة</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="tableBody">
                ${requests.results.map((req: any) => {
                  const statusAr = req.status === 'approved' ? 'مقبول' : req.status === 'pending' ? 'قيد المراجعة' : 'مرفوض';
                  return `
                  <tr class="hover:bg-gray-50" 
                      data-customer="${req.customer_name || ''}" 
                      data-bank="${req.bank_name || ''}" 
                      data-status="${statusAr}">
                    <td class="px-6 py-4 whitespace-nowrap font-medium">${req.customer_name || 'عميل #' + req.customer_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${req.bank_name || 'بنك #' + (req.selected_bank_id || '-')}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${req.requested_amount?.toLocaleString('ar-SA')} ريال</td>
                    <td class="px-6 py-4 whitespace-nowrap">${req.duration_months} شهر</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs rounded-full ${req.status === 'approved' ? 'bg-green-100 text-green-800' : req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                        ${statusAr}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${new Date(req.created_at).toLocaleDateString('ar-SA')}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex gap-2 justify-center">
                        <a href="/admin/requests/${req.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/requests/${req.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/requests/${req.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `}).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const customer = row.getAttribute('data-customer') || ''
              const bank = row.getAttribute('data-bank') || ''
              const status = row.getAttribute('data-status') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'customer':
                    shouldShow = customer.toLowerCase().includes(searchInput)
                    break
                  case 'bank':
                    shouldShow = bank.toLowerCase().includes(searchInput)
                    break
                  case 'status':
                    shouldShow = status.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = customer.toLowerCase().includes(searchInput) || 
                                bank.toLowerCase().includes(searchInput) || 
                                status.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['العميل', 'البنك', 'المبلغ المطلوب', 'المدة (شهور)', 'الحالة', 'التاريخ'],
              ${requests.results.map((req: any) => {
                const statusAr = req.status === 'approved' ? 'مقبول' : req.status === 'pending' ? 'قيد المراجعة' : 'مرفوض';
                const customer = req.customer_name || `عميل #${req.customer_id}`;
                const bank = req.bank_name || `بنك #${req.selected_bank_id || '-'}`;
                return `['${customer}', '${bank}', '${req.requested_amount || 0}', '${req.duration_months}', '${statusAr}', '${new Date(req.created_at).toLocaleDateString('ar-SA')}']`;
              }).join(',\n              ')}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'طلبات_التمويل_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة عرض طلب تمويل واحد ====================
app.get('/admin/requests/new', async (c) => {
  try {
    // Get customers and banks for dropdowns
    const customers = await c.env.DB.prepare('SELECT id, full_name, phone FROM customers ORDER BY full_name').all()
    const banks = await c.env.DB.prepare('SELECT id, bank_name FROM banks WHERE is_active = 1 ORDER BY bank_name').all()
    const financingTypes = await c.env.DB.prepare('SELECT id, type_name FROM financing_types ORDER BY type_name').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة طلب تمويل جديد</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة طلبات التمويل
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-purple-600 ml-2"></i>
              إضافة طلب تمويل جديد
            </h1>
            
            <form action="/api/requests" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- اختيار العميل -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-user text-blue-600 ml-1"></i>
                    العميل *
                  </label>
                  <select name="customer_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر العميل --</option>
                    ${customers.results.map((cust: any) => `
                      <option value="${cust.id}">${cust.full_name} - ${cust.phone}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- نوع التمويل -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-file-invoice text-purple-600 ml-1"></i>
                    نوع التمويل *
                  </label>
                  <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر نوع التمويل --</option>
                    ${financingTypes.results.map((type: any) => `
                      <option value="${type.id}">${type.type_name}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- المبلغ المطلوب -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-money-bill-wave text-green-600 ml-1"></i>
                    المبلغ المطلوب (ريال) *
                  </label>
                  <input type="number" name="requested_amount" required min="1000" step="1000" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                         placeholder="مثال: 50000">
                </div>
                
                <!-- مدة التمويل -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar text-orange-600 ml-1"></i>
                    مدة التمويل (شهور) *
                  </label>
                  <select name="duration_months" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر المدة --</option>
                    <option value="12">12 شهر (سنة)</option>
                    <option value="24">24 شهر (سنتين)</option>
                    <option value="36">36 شهر (3 سنوات)</option>
                    <option value="48">48 شهر (4 سنوات)</option>
                    <option value="60">60 شهر (5 سنوات)</option>
                    <option value="84">84 شهر (7 سنوات)</option>
                    <option value="120">120 شهر (10 سنوات)</option>
                  </select>
                </div>
                
                <!-- الراتب عند الطلب -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-coins text-yellow-600 ml-1"></i>
                    الراتب عند الطلب (ريال) *
                  </label>
                  <input type="number" name="salary_at_request" required min="1000" step="100" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                         placeholder="مثال: 15000">
                </div>
                
                <!-- البنك المختار -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-university text-yellow-600 ml-1"></i>
                    البنك المختار
                  </label>
                  <select name="selected_bank_id" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر البنك (اختياري) --</option>
                    ${banks.results.map((bank: any) => `
                      <option value="${bank.id}">${bank.bank_name}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- الحالة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-flag text-blue-600 ml-1"></i>
                    الحالة *
                  </label>
                  <select name="status" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="pending">قيد المراجعة</option>
                    <option value="approved">مقبول</option>
                    <option value="rejected">مرفوض</option>
                  </select>
                </div>
                
                <!-- ملاحظات -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-comment text-gray-600 ml-1"></i>
                    ملاحظات
                  </label>
                  <textarea name="notes" rows="3" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="أي ملاحظات إضافية..."></textarea>
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ الطلب
                </button>
                <a href="/admin/requests" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل الصفحة</h1>')
  }
})
app.get('/admin/requests/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const request = await c.env.DB.prepare(`
      SELECT fr.*, 
             c.full_name as customer_name, c.phone as customer_phone, c.email as customer_email,
             b.bank_name, ft.type_name as financing_type_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(id).first()
    
    if (!request) {
      return c.html('<h1>الطلب غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض طلب التمويل #${id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الطلبات
            </a>
            <div class="flex gap-2">
              <a href="/admin/requests/${id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/requests/${id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-file-invoice text-purple-600 ml-3"></i>
              طلب التمويل #${id}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- معلومات العميل -->
              <div class="md:col-span-2 border-b pb-4">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-user text-blue-600 ml-2"></i>
                  معلومات العميل
                </h2>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الاسم الكامل</label>
                <p class="text-lg text-gray-900">${request.customer_name || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">رقم الجوال</label>
                <p class="text-lg text-gray-900">${request.customer_phone || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                <p class="text-lg text-gray-900">${request.customer_email || '-'}</p>
              </div>
              
              <!-- معلومات التمويل -->
              <div class="md:col-span-2 border-b pb-4 mt-4">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-money-bill-wave text-green-600 ml-2"></i>
                  معلومات التمويل
                </h2>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نوع التمويل</label>
                <p class="text-lg text-gray-900">${request.financing_type_name || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">المبلغ المطلوب</label>
                <p class="text-lg font-bold text-green-600">${request.requested_amount?.toLocaleString() || '0'} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">مدة التمويل</label>
                <p class="text-lg text-gray-900">${request.duration_months || '0'} شهر</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الراتب عند الطلب</label>
                <p class="text-lg text-gray-900">${request.salary_at_request?.toLocaleString() || '0'} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البنك المختار</label>
                <p class="text-lg text-gray-900">${request.bank_name || 'غير محدد'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }">
                    ${request.status === 'approved' ? 'مقبول' : request.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                  </span>
                </p>
              </div>
              
              ${request.notes ? `
                <div class="md:col-span-2 mt-4">
                  <label class="block text-sm font-bold text-gray-600 mb-1">ملاحظات</label>
                  <p class="text-gray-900 bg-gray-50 p-4 rounded">${request.notes}</p>
                </div>
              ` : ''}
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(request.created_at).toLocaleString('ar-SA')}</p>
              </div>
            </div>
          </div>
          
          <!-- قسم المرفقات -->
          <div class="bg-white rounded-xl shadow-lg p-8 mt-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-paperclip text-blue-600 ml-3"></i>
              المرفقات
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${request.id_attachment_url ? `
                <div class="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-id-card text-2xl text-blue-600 ml-3"></i>
                      <span class="font-bold text-gray-800">صورة الهوية</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${request.id_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${request.id_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${request.id_attachment_url}', 'id')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              ` : `
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-id-card text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">صورة الهوية</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
              
              ${request.salary_attachment_url ? `
                <div class="border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-money-check-alt text-2xl text-green-600 ml-3"></i>
                      <span class="font-bold text-gray-800">كشف الراتب</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${request.salary_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${request.salary_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${request.salary_attachment_url}', 'salary')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              ` : `
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-money-check-alt text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">كشف الراتب</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
              
              ${request.bank_statement_attachment_url ? `
                <div class="border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-file-invoice-dollar text-2xl text-purple-600 ml-3"></i>
                      <span class="font-bold text-gray-800">كشف الحساب البنكي</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${request.bank_statement_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${request.bank_statement_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${request.bank_statement_attachment_url}', 'bank_statement')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              ` : `
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-file-invoice-dollar text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">كشف الحساب البنكي</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
              
              ${request.additional_attachment_url ? `
                <div class="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-file-alt text-2xl text-orange-600 ml-3"></i>
                      <span class="font-bold text-gray-800">مرفق إضافي</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${request.additional_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${request.additional_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${request.additional_attachment_url}', 'additional')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              ` : `
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-file-alt text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">مرفق إضافي</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
            </div>
            
            ${!request.id_attachment_url && !request.salary_attachment_url && !request.bank_statement_attachment_url && !request.additional_attachment_url ? `
              <div class="text-center mt-6 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-2"></i>
                <p>لا توجد مرفقات لهذا الطلب</p>
              </div>
            ` : ''}
          </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          async function deleteAttachment(attachmentUrl, type) {
            if (!confirm('هل أنت متأكد من حذف هذا المرفق؟ لا يمكن التراجع عن هذا الإجراء.')) {
              return;
            }
            
            try {
              // Extract path from URL (remove /api/attachments/view/ prefix)
              const path = attachmentUrl.replace('/api/attachments/view/', '');
              
              const response = await axios.delete(\`/api/attachments/delete/\${path}\`);
              
              if (response.data.success) {
                alert('✓ تم حذف المرفق بنجاح');
                location.reload(); // Reload page to reflect changes
              } else {
                alert('✗ فشل حذف المرفق: ' + (response.data.error || 'خطأ غير معروف'));
              }
            } catch (error) {
              console.error('Error deleting attachment:', error);
              alert('✗ حدث خطأ أثناء حذف المرفق');
            }
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== نموذج إضافة طلب تمويل جديد ====================

// صفحة عرض عميل واحد
app.get('/admin/customers/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const customer = await c.env.DB.prepare('SELECT * FROM customers WHERE id = ?').bind(id).first()
    
    if (!customer) {
      return c.html('<h1>العميل غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض العميل</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/customers" class="text-blue-600 hover:text-blue-800">← العودة لقائمة العملاء</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-user text-green-600 ml-2"></i>
              بيانات العميل
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border-r-4 border-blue-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم العميل</p>
                <p class="text-xl font-bold text-gray-800">#${(customer as any).id}</p>
              </div>
              
              <div class="border-r-4 border-green-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الاسم الكامل</p>
                <p class="text-xl font-bold text-gray-800">${(customer as any).name}</p>
              </div>
              
              <div class="border-r-4 border-yellow-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم الهاتف</p>
                <p class="text-xl font-bold text-gray-800">${(customer as any).phone || 'غير متوفر'}</p>
              </div>
              
              <div class="border-r-4 border-purple-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                <p class="text-xl font-bold text-gray-800">${(customer as any).email || 'غير متوفر'}</p>
              </div>
              
              <div class="border-r-4 border-red-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الرقم الوطني</p>
                <p class="text-xl font-bold text-gray-800">${(customer as any).national_id || 'غير متوفر'}</p>
              </div>
              
              <div class="border-r-4 border-indigo-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">تاريخ التسجيل</p>
                <p class="text-xl font-bold text-gray-800">${new Date((customer as any).created_at).toLocaleDateString('ar-SA')}</p>
              </div>
            </div>
            
            <div class="mt-8 flex gap-4">
              <a href="/admin/customers/${id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-edit ml-2"></i>
                تعديل البيانات
              </a>
              <a href="/admin/customers/${id}/delete" onclick="return confirm('هل أنت متأكد من حذف هذا العميل؟')" class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-trash ml-2"></i>
                حذف العميل
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// صفحة تعديل عميل
app.get('/admin/customers/:id/edit', async (c) => {
  try {
    const id = c.req.param('id')
    const customer = await c.env.DB.prepare('SELECT * FROM customers WHERE id = ?').bind(id).first()
    
    if (!customer) {
      return c.html('<h1>العميل غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تعديل العميل</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/customers/${id}" class="text-blue-600 hover:text-blue-800">← العودة لبيانات العميل</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-edit text-yellow-600 ml-2"></i>
              تعديل بيانات العميل #${id}
            </h1>
            
            <form method="POST" action="/api/customers/${id}" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                <input type="text" name="name" value="${(customer as any).name}" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                <input type="tel" name="phone" value="${(customer as any).phone || ''}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                <input type="email" name="email" value="${(customer as any).email || ''}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الرقم الوطني</label>
                <input type="text" name="national_id" value="${(customer as any).national_id || ''}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div class="flex gap-4">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-save ml-2"></i>
                  حفظ التعديلات
                </button>
                <a href="/admin/customers/${id}" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// حذف عميل
app.get('/admin/customers/:id/delete', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM customers WHERE id = ?').bind(id).run()
    return c.redirect('/admin/customers')
  } catch (error) {
    return c.html('<h1>خطأ في حذف العميل</h1>')
  }
})

// ==================== صفحات البنوك الكاملة ====================

// إضافة بنك جديد - الصفحة
app.get('/admin/banks/add', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة بنك جديد</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/banks" class="text-blue-600 hover:text-blue-800">← العودة لقائمة البنوك</a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">
            <i class="fas fa-plus-circle text-green-600 ml-2"></i>
            إضافة بنك جديد
          </h1>
          
          <form action="/api/banks" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">اسم البنك</label>
              <input type="text" name="bank_name" required 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
            </div>
            
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
              <textarea name="description" rows="3"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"></textarea>
            </div>
            
            <div class="flex gap-4">
              <button type="submit" 
                      class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-save ml-2"></i>
                حفظ البنك
              </button>
              <a href="/admin/banks" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `)
})

// تقرير العميل الكامل - يعرض جميع بيانات الحاسبة
app.get('/admin/customers/:id/report', async (c) => {
  try {
    const id = c.req.param('id')
    
    // جلب بيانات العميل مع بيانات الحاسبة
    const customer = await c.env.DB.prepare(`
      SELECT 
        c.*,
        ft.type_name as financing_type_name,
        b.bank_name as best_bank_name
      FROM customers c
      LEFT JOIN financing_types ft ON c.financing_type_id = ft.id
      LEFT JOIN banks b ON c.best_bank_id = b.id
      WHERE c.id = ?
    `).bind(id).first()
    
    if (!customer) {
      return c.html('<h1>العميل غير موجود</h1>')
    }
    
    const cust = customer as any
    
    // تنسيق التواريخ
    const formatDate = (date: string) => {
      if (!date) return 'غير محدد'
      return new Date(date).toLocaleDateString('ar-SA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    // تنسيق الأرقام
    const formatNumber = (num: number) => {
      if (!num) return 'غير محدد'
      return num.toLocaleString('ar-SA')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير العميل - ${cust.full_name}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
          }
          .report-section {
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-5xl mx-auto p-6">
          <!-- أزرار التحكم -->
          <div class="mb-6 no-print flex justify-between items-center">
            <a href="/admin/customers" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة العملاء
            </a>
            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
              <i class="fas fa-print ml-2"></i>
              طباعة التقرير
            </button>
          </div>
          
          <!-- رأس التقرير -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-6 report-section">
            <div class="text-center">
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-file-contract ml-3"></i>
                تقرير العميل الشامل
              </h1>
              <p class="text-xl opacity-90">نظام تمويل - Tamweel Finance</p>
              <p class="text-sm opacity-75 mt-2">تاريخ التقرير: ${formatDate(new Date().toISOString())}</p>
            </div>
          </div>
          
          <!-- القسم 1: المعلومات الشخصية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">
              <i class="fas fa-user text-blue-600 ml-2"></i>
              المعلومات الشخصية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-id-card text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم العميل</p>
                  <p class="text-xl font-bold text-gray-800">#${cust.id}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-user text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الاسم الكامل</p>
                  <p class="text-xl font-bold text-gray-800">${cust.full_name || 'غير محدد'}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <i class="fas fa-phone text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهاتف</p>
                  <p class="text-xl font-bold text-gray-800" dir="ltr">${cust.phone || 'غير محدد'}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p class="text-xl font-bold text-gray-800">${cust.email || 'غير محدد'}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-calendar text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ الميلاد</p>
                  <p class="text-xl font-bold text-gray-800">${formatDate(cust.birthdate)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-lg">
                  <i class="fas fa-id-badge text-indigo-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهوية</p>
                  <p class="text-xl font-bold text-gray-800">${cust.national_id || 'غير محدد'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- القسم 2: بيانات الحاسبة المالية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">
              <i class="fas fa-calculator text-green-600 ml-2"></i>
              بيانات الحاسبة المالية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-money-bill-wave text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الراتب الشهري</p>
                  <p class="text-2xl font-bold text-green-600">${formatNumber(cust.monthly_salary)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-hand-holding-usd text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">مبلغ التمويل المطلوب</p>
                  <p class="text-2xl font-bold text-blue-600">${formatNumber(cust.financing_amount)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-receipt text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الالتزامات الشهرية</p>
                  <p class="text-2xl font-bold text-red-600">${formatNumber(cust.monthly_obligations)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-tag text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">نوع التمويل</p>
                  <p class="text-xl font-bold text-purple-600">${cust.financing_type_name || 'غير محدد'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- القسم 3: نتائج التمويل (أفضل عرض) -->
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6 report-section border-2 border-green-400">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">
              <i class="fas fa-star text-green-600 ml-2"></i>
              أفضل عرض تمويلي
            </h2>
            
            ${cust.best_bank_id ? `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-green-100 p-3 rounded-lg">
                      <i class="fas fa-university text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">البنك المختار</p>
                      <p class="text-2xl font-bold text-green-600">${cust.best_bank_name || 'غير محدد'}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-blue-100 p-3 rounded-lg">
                      <i class="fas fa-clock text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">مدة التمويل</p>
                      <p class="text-2xl font-bold text-blue-600">${cust.financing_duration_months || 'غير محدد'} شهر</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                      <i class="fas fa-percentage text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">معدل الفائدة</p>
                      <p class="text-2xl font-bold text-yellow-600">${cust.best_rate ? cust.best_rate + '%' : 'غير محدد'}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-purple-100 p-3 rounded-lg">
                      <i class="fas fa-calendar-check text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">القسط الشهري</p>
                      <p class="text-2xl font-bold text-purple-600">${formatNumber(cust.monthly_payment)} ريال</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow md:col-span-2">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-indigo-100 p-3 rounded-lg">
                      <i class="fas fa-coins text-indigo-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">إجمالي المبلغ المستحق</p>
                      <p class="text-3xl font-bold text-indigo-600">${formatNumber(cust.total_payment)} ريال</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-green-50 rounded-lg p-4 shadow md:col-span-2 border-2 border-green-300">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-green-100 p-3 rounded-lg">
                      <i class="fas fa-calendar-alt text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">تاريخ الحساب</p>
                      <p class="text-xl font-bold text-green-600">${formatDate(cust.calculation_date)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ` : `
              <div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-triangle text-yellow-600 text-4xl mb-3"></i>
                <p class="text-xl font-bold text-yellow-700">لم يتم حساب عرض تمويلي بعد</p>
                <p class="text-gray-600 mt-2">العميل لم يستخدم الحاسبة لحساب أفضل عرض تمويلي</p>
              </div>
            `}
          </div>
          
          <!-- القسم 4: معلومات إضافية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-500 pb-2">
              <i class="fas fa-info-circle text-gray-600 ml-2"></i>
              معلومات إضافية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-calendar-plus text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ التسجيل</p>
                  <p class="text-lg font-bold text-gray-800">${formatDate(cust.created_at)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-edit text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">آخر تحديث</p>
                  <p class="text-lg font-bold text-gray-800">${formatDate(cust.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- تذييل التقرير -->
          <div class="bg-gray-100 rounded-xl p-6 text-center report-section">
            <p class="text-gray-600">
              <i class="fas fa-shield-alt ml-2"></i>
              هذا التقرير سري ومخصص للاستخدام الداخلي فقط
            </p>
            <p class="text-sm text-gray-500 mt-2">
              تم إنشاء هذا التقرير بواسطة نظام تمويل - Tamweel Finance Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error: any) {
    console.error('خطأ في عرض تقرير العميل:', error)
    return c.html(`<h1>حدث خطأ: ${error.message}</h1>`)
  }
})

// API - إضافة بنك جديد
app.post('/api/banks', async (c) => {
  try {
    const body = await c.req.parseBody()
    await c.env.DB.prepare(`
      INSERT INTO banks (bank_name, description, is_active, created_at)
      VALUES (?, ?, 1, datetime('now'))
    `).bind(body.bank_name, body.description || '').run()
    
    return c.redirect('/admin/banks')
  } catch (error) {
    return c.json({ error: 'فشل إضافة البنك' }, 500)
  }
})

// عرض بنك واحد
app.get('/admin/banks/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const bank = await c.env.DB.prepare('SELECT * FROM banks WHERE id = ?').bind(id).first()
    
    if (!bank) {
      return c.html('<h1>البنك غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض البنك</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/banks" class="text-blue-600 hover:text-blue-800">← العودة لقائمة البنوك</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-university text-yellow-600 ml-2"></i>
              بيانات البنك
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border-r-4 border-blue-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم البنك</p>
                <p class="text-xl font-bold text-gray-800">#${(bank as any).id}</p>
              </div>
              
              <div class="border-r-4 border-green-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">اسم البنك</p>
                <p class="text-xl font-bold text-gray-800">${(bank as any).bank_name}</p>
              </div>
              
              <div class="border-r-4 border-yellow-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الوصف</p>
                <p class="text-xl font-bold text-gray-800">${(bank as any).description || 'لا يوجد'}</p>
              </div>
              
              <div class="border-r-4 border-purple-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الحالة</p>
                <p class="text-xl font-bold ${(bank as any).is_active ? 'text-green-600' : 'text-red-600'}">
                  ${(bank as any).is_active ? 'نشط' : 'غير نشط'}
                </p>
              </div>
            </div>
            
            <div class="mt-8 flex gap-4">
              <a href="/admin/banks/${(bank as any).id}/edit" 
                 class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-edit ml-2"></i>
                تعديل
              </a>
              <a href="/admin/banks/${(bank as any).id}/delete" 
                 class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold"
                 onclick="return confirm('هل أنت متأكد من حذف هذا البنك؟')">
                <i class="fas fa-trash ml-2"></i>
                حذف
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// تعديل بنك - الصفحة
app.get('/admin/banks/:id/edit', async (c) => {
  try {
    const id = c.req.param('id')
    const bank = await c.env.DB.prepare('SELECT * FROM banks WHERE id = ?').bind(id).first()
    
    if (!bank) {
      return c.html('<h1>البنك غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تعديل البنك</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/banks" class="text-blue-600 hover:text-blue-800">← العودة لقائمة البنوك</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-edit text-blue-600 ml-2"></i>
              تعديل البنك
            </h1>
            
            <form action="/api/banks/${(bank as any).id}" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">اسم البنك</label>
                <input type="text" name="bank_name" value="${(bank as any).bank_name}" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
                <textarea name="description" rows="3"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">${(bank as any).description || ''}</textarea>
              </div>
              
              <div class="flex gap-4">
                <button type="submit" 
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-save ml-2"></i>
                  حفظ التغييرات
                </button>
                <a href="/admin/banks" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// API - تعديل بنك
app.post('/api/banks/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.parseBody()
    
    await c.env.DB.prepare(`
      UPDATE banks 
      SET bank_name = ?, description = ?
      WHERE id = ?
    `).bind(body.bank_name, body.description || '', id).run()
    
    return c.redirect('/admin/banks')
  } catch (error) {
    return c.json({ error: 'فشل تعديل البنك' }, 500)
  }
})

// حذف بنك
app.get('/admin/banks/:id/delete', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM banks WHERE id = ?').bind(id).run()
    return c.redirect('/admin/banks')
  } catch (error) {
    return c.html('<h1>خطأ في حذف البنك</h1>')
  }
})

// تحديث صفحة البنوك مع أزرار الإجراءات
app.get('/admin/banks', async (c) => {
  try {
    const banks = await c.env.DB.prepare('SELECT * FROM banks ORDER BY bank_name').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>البنوك</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-university text-yellow-600 ml-2"></i>
                البنوك (<span id="totalCount">${banks.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
                <a href="/admin/banks/add" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة بنك جديد
                </a>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="name">اسم البنك فقط</option>
                    <option value="code">كود البنك فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم البنك</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الوصف</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                ${banks.results.map((bank: any) => `
                  <tr class="hover:bg-gray-50" data-name="${bank.bank_name || ''}" data-code="${bank.bank_code || ''}">
                    <td class="px-6 py-4 text-sm text-gray-900">${bank.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-university text-yellow-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${bank.bank_name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${bank.description || 'لا يوجد'}</td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${bank.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${bank.is_active ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-center gap-2">
                        <a href="/admin/banks/${bank.id}" 
                           class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/banks/${bank.id}/edit" 
                           class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/banks/${bank.id}/delete" 
                           onclick="return confirm('هل أنت متأكد من حذف هذا البنك؟')"
                           class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const name = row.getAttribute('data-name') || ''
              const code = row.getAttribute('data-code') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'name':
                    shouldShow = name.toLowerCase().includes(searchInput)
                    break
                  case 'code':
                    shouldShow = code.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = name.toLowerCase().includes(searchInput) || 
                                code.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم البنك', 'الوصف', 'الحالة'],
              ${banks.results.map((bank: any) => `['${bank.id}', '${bank.bank_name}', '${bank.description || ''}', '${bank.is_active ? 'نشط' : 'غير نشط'}']`).join(',\n              ')}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'البنوك_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة نسب التمويل (Rates) ====================

app.get('/admin/rates', async (c) => {
  try {
    const rates = await c.env.DB.prepare(`
      SELECT fr.*, b.bank_name, ft.type_name
      FROM bank_financing_rates fr
      LEFT JOIN banks b ON fr.bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      ORDER BY b.bank_name, ft.type_name
    `).all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>نسب التمويل</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-percentage text-orange-600 ml-2"></i>
                نسب التمويل (<span id="totalCount">${rates.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/rates/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="bank">البنك فقط</option>
                    <option value="type">نوع التمويل فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">البنك</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">نوع التمويل</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">نسبة الفائدة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحد الأدنى</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحد الأقصى</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                ${rates.results.map((rate: any) => `
                  <tr class="hover:bg-gray-50" data-bank="${rate.bank_name || ''}" data-type="${rate.type_name || ''}">
                    <td class="px-6 py-4 text-sm text-gray-900">${rate.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-university text-yellow-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${rate.bank_name || 'غير محدد'}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${rate.type_name || 'غير محدد'}</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-orange-600">${rate.rate || 0}%</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${rate.min_amount ? rate.min_amount.toLocaleString() : '0'} ريال</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${rate.max_amount ? rate.max_amount.toLocaleString() : '0'} ريال</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2 justify-center">
                        <a href="/admin/rates/${rate.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/rates/${rate.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/rates/${rate.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const bank = row.getAttribute('data-bank') || ''
              const type = row.getAttribute('data-type') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'bank':
                    shouldShow = bank.toLowerCase().includes(searchInput)
                    break
                  case 'type':
                    shouldShow = type.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = bank.toLowerCase().includes(searchInput) || 
                                type.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'البنك', 'نوع التمويل', 'نسبة الفائدة', 'الحد الأدنى', 'الحد الأقصى'],
              ${rates.results.map((rate: any) => `['${rate.id}', '${rate.bank_name || 'غير محدد'}', '${rate.type_name || 'غير محدد'}', '${rate.rate || 0}%', '${rate.min_amount || 0}', '${rate.max_amount || 0}']`).join(',\n              ')}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'نسب_التمويل_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة عرض نسبة تمويل واحدة ====================
app.get('/admin/rates/new', async (c) => {
  try {
    const banks = await c.env.DB.prepare('SELECT id, bank_name FROM banks WHERE is_active = 1 ORDER BY bank_name').all()
    const financingTypes = await c.env.DB.prepare('SELECT id, type_name FROM financing_types ORDER BY type_name').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة نسبة تمويل جديدة</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/rates" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة نسب التمويل
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-orange-600 ml-2"></i>
              إضافة نسبة تمويل جديدة
            </h1>
            
            <form action="/api/rates" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- البنك -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-university text-yellow-600 ml-1"></i>
                    البنك *
                  </label>
                  <select name="bank_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">-- اختر البنك --</option>
                    ${banks.results.map((bank: any) => `
                      <option value="${bank.id}">${bank.bank_name}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- نوع التمويل -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-file-invoice text-purple-600 ml-1"></i>
                    نوع التمويل *
                  </label>
                  <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">-- اختر نوع التمويل --</option>
                    ${financingTypes.results.map((type: any) => `
                      <option value="${type.id}">${type.type_name}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- نسبة الفائدة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-percentage text-orange-600 ml-1"></i>
                    نسبة الفائدة (%) *
                  </label>
                  <input type="number" name="rate" required min="0" max="100" step="0.01" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 4.5">
                </div>
                
                <!-- الحد الأدنى للمبلغ -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-arrow-down text-green-600 ml-1"></i>
                    الحد الأدنى للمبلغ (ريال)
                  </label>
                  <input type="number" name="min_amount" min="0" step="1000" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 10000">
                </div>
                
                <!-- الحد الأقصى للمبلغ -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-arrow-up text-red-600 ml-1"></i>
                    الحد الأقصى للمبلغ (ريال)
                  </label>
                  <input type="number" name="max_amount" min="0" step="1000" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 500000">
                </div>
                
                <!-- الحد الأدنى للمدة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar text-blue-600 ml-1"></i>
                    الحد الأدنى للمدة (شهور)
                  </label>
                  <input type="number" name="min_duration" min="1" max="360" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 12">
                </div>
                
                <!-- الحد الأقصى للمدة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar-alt text-purple-600 ml-1"></i>
                    الحد الأقصى للمدة (شهور)
                  </label>
                  <input type="number" name="max_duration" min="1" max="360" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 60">
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ النسبة
                </button>
                <a href="/admin/rates" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل الصفحة</h1>')
  }
})
app.get('/admin/rates/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const rate = await c.env.DB.prepare(`
      SELECT fr.*, b.bank_name, ft.type_name
      FROM bank_financing_rates fr
      LEFT JOIN banks b ON fr.bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(id).first()
    
    if (!rate) {
      return c.html('<h1>النسبة غير موجودة</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض نسبة التمويل #${id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/rates" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة النسب
            </a>
            <div class="flex gap-2">
              <a href="/admin/rates/${id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/rates/${id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-percentage text-orange-600 ml-3"></i>
              نسبة التمويل #${id}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البنك</label>
                <p class="text-lg text-gray-900">${rate.bank_name || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نوع التمويل</label>
                <p class="text-lg text-gray-900">${rate.type_name || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نسبة الفائدة</label>
                <p class="text-3xl font-bold text-orange-600">${rate.rate || 0}%</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${rate.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${rate.is_active ? 'نشط' : 'غير نشط'}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأدنى للمبلغ</label>
                <p class="text-lg text-gray-900">${rate.min_amount ? rate.min_amount.toLocaleString() : 'غير محدد'} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأقصى للمبلغ</label>
                <p class="text-lg text-gray-900">${rate.max_amount ? rate.max_amount.toLocaleString() : 'غير محدد'} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأدنى للمدة</label>
                <p class="text-lg text-gray-900">${rate.min_duration || 'غير محدد'} شهر</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأقصى للمدة</label>
                <p class="text-lg text-gray-900">${rate.max_duration || 'غير محدد'} شهر</p>
              </div>
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(rate.created_at).toLocaleString('ar-SA')}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== نموذج إضافة نسبة تمويل جديدة ====================

// ==================== صفحة الاشتراكات (Subscriptions) ====================

app.get('/admin/subscriptions', async (c) => {
  try {
    const subscriptions = await c.env.DB.prepare(`
      SELECT s.*, p.package_name, p.price
      FROM subscriptions s
      LEFT JOIN packages p ON s.package_id = p.id
      ORDER BY s.created_at DESC
    `).all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الاشتراكات</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-id-card text-teal-600 ml-2"></i>
                الاشتراكات (<span id="totalCount">${subscriptions.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/subscriptions/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="company">الشركة فقط</option>
                    <option value="package">الباقة فقط</option>
                    <option value="status">الحالة فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم الشركة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الباقة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">تاريخ البداية</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">تاريخ الانتهاء</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحسابات المستخدمة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                ${subscriptions.results.map((sub: any) => {
                  const statusAr = sub.status === 'active' ? 'نشط' : sub.status === 'expired' ? 'منتهي' : 'معلق';
                  return `
                  <tr class="hover:bg-gray-50" 
                      data-company="${sub.company_name || ''}" 
                      data-package="${sub.package_name || ''}" 
                      data-status="${statusAr}">
                    <td class="px-6 py-4 text-sm text-gray-900">${sub.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-building text-teal-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${sub.company_name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${sub.package_name || 'غير محدد'}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${sub.start_date || '-'}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${sub.end_date || '-'}</td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${
                        sub.status === 'active' ? 'bg-green-100 text-green-800' : 
                        sub.status === 'expired' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }">
                        ${statusAr}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${sub.calculations_used || 0}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2 justify-center">
                        <a href="/admin/subscriptions/${sub.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/subscriptions/${sub.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/subscriptions/${sub.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `}).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const company = row.getAttribute('data-company') || ''
              const package_name = row.getAttribute('data-package') || ''
              const status = row.getAttribute('data-status') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'company':
                    shouldShow = company.toLowerCase().includes(searchInput)
                    break
                  case 'package':
                    shouldShow = package_name.toLowerCase().includes(searchInput)
                    break
                  case 'status':
                    shouldShow = status.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = company.toLowerCase().includes(searchInput) || 
                                package_name.toLowerCase().includes(searchInput) || 
                                status.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم الشركة', 'الباقة', 'تاريخ البداية', 'تاريخ الانتهاء', 'الحالة', 'الحسابات المستخدمة'],
              ${subscriptions.results.map((sub: any) => {
                const statusAr = sub.status === 'active' ? 'نشط' : sub.status === 'expired' ? 'منتهي' : 'معلق';
                return `['${sub.id}', '${sub.company_name}', '${sub.package_name || 'غير محدد'}', '${sub.start_date || '-'}', '${sub.end_date || '-'}', '${statusAr}', '${sub.calculations_used || 0}']`;
              }).join(',\n              ')}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'الاشتراكات_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة عرض اشتراك واحد ====================
app.get('/admin/subscriptions/new', async (c) => {
  try {
    const packages = await c.env.DB.prepare('SELECT id, package_name, price, duration_months FROM packages WHERE is_active = 1 ORDER BY price').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة اشتراك جديد</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/subscriptions" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الاشتراكات
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-teal-600 ml-2"></i>
              إضافة اشتراك جديد
            </h1>
            
            <form action="/api/subscriptions" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- اسم الشركة -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-building text-teal-600 ml-1"></i>
                    اسم الشركة *
                  </label>
                  <input type="text" name="company_name" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                         placeholder="مثال: شركة التمويل السريع">
                </div>
                
                <!-- الباقة -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-box text-purple-600 ml-1"></i>
                    الباقة *
                  </label>
                  <select name="package_id" id="packageSelect" required onchange="updateDates()" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="">-- اختر الباقة --</option>
                    ${packages.results.map((pkg: any) => `
                      <option value="${pkg.id}" data-duration="${pkg.duration_months}">
                        ${pkg.package_name} - ${pkg.price} ريال - ${pkg.duration_months} شهر
                      </option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- تاريخ البداية -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar-check text-green-600 ml-1"></i>
                    تاريخ البداية *
                  </label>
                  <input type="date" name="start_date" id="startDate" required onchange="updateEndDate()" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                </div>
                
                <!-- تاريخ الانتهاء -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar-times text-red-600 ml-1"></i>
                    تاريخ الانتهاء *
                  </label>
                  <input type="date" name="end_date" id="endDate" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                         readonly>
                </div>
                
                <!-- الحالة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-flag text-blue-600 ml-1"></i>
                    الحالة *
                  </label>
                  <select name="status" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="active">نشط</option>
                    <option value="pending">معلق</option>
                    <option value="expired">منتهي</option>
                  </select>
                </div>
                
                <!-- عدد الحسابات المستخدمة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calculator text-orange-600 ml-1"></i>
                    عدد الحسابات المستخدمة
                  </label>
                  <input type="number" name="calculations_used" min="0" value="0" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ الاشتراك
                </button>
                <a href="/admin/subscriptions" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
        
        <script>
          // Set today as default start date
          document.getElementById('startDate').valueAsDate = new Date();
          
          function updateEndDate() {
            const packageSelect = document.getElementById('packageSelect');
            const startDate = document.getElementById('startDate').value;
            const endDateInput = document.getElementById('endDate');
            
            if (packageSelect.value && startDate) {
              const selectedOption = packageSelect.options[packageSelect.selectedIndex];
              const durationMonths = parseInt(selectedOption.dataset.duration);
              
              const start = new Date(startDate);
              const end = new Date(start);
              end.setMonth(end.getMonth() + durationMonths);
              
              endDateInput.value = end.toISOString().split('T')[0];
            }
          }
          
          function updateDates() {
            updateEndDate();
          }
          
          // Auto-update end date when package changes
          document.getElementById('packageSelect').addEventListener('change', updateDates);
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل الصفحة</h1>')
  }
})
app.get('/admin/subscriptions/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const subscription = await c.env.DB.prepare(`
      SELECT s.*, p.package_name, p.price
      FROM subscriptions s
      LEFT JOIN packages p ON s.package_id = p.id
      WHERE s.id = ?
    `).bind(id).first()
    
    if (!subscription) {
      return c.html('<h1>الاشتراك غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض الاشتراك #${id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/subscriptions" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الاشتراكات
            </a>
            <div class="flex gap-2">
              <a href="/admin/subscriptions/${id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/subscriptions/${id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-id-card text-teal-600 ml-3"></i>
              الاشتراك #${id}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-600 mb-1">اسم الشركة</label>
                <p class="text-2xl font-bold text-gray-900">${subscription.company_name}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الباقة</label>
                <p class="text-lg text-gray-900">${subscription.package_name || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">السعر</label>
                <p class="text-lg font-bold text-green-600">${subscription.price ? subscription.price.toLocaleString() : '0'} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ البداية</label>
                <p class="text-lg text-gray-900">${subscription.start_date || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الانتهاء</label>
                <p class="text-lg text-gray-900">${subscription.end_date || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${
                    subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                    subscription.status === 'expired' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }">
                    ${subscription.status === 'active' ? 'نشط' : subscription.status === 'expired' ? 'منتهي' : 'معلق'}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحسابات المستخدمة</label>
                <p class="text-lg text-gray-900">${subscription.calculations_used || 0}</p>
              </div>
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(subscription.created_at).toLocaleString('ar-SA')}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== نموذج إضافة اشتراك جديد ====================

// ==================== صفحة الباقات (Packages) ====================

app.get('/admin/packages', async (c) => {
  try {
    const packages = await c.env.DB.prepare(`
      SELECT * FROM packages ORDER BY price
    `).all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الباقات</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-box text-purple-600 ml-2"></i>
                الباقات (<span id="totalCount">${packages.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/packages/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onkeyup="filterPackages()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onchange="filterPackages()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="name">اسم الباقة فقط</option>
                    <option value="price">السعر فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="packagesGrid">
            ${packages.results.map((pkg: any) => `
              <div class="package-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 ${
                pkg.package_name.includes('الذهبية') ? 'border-yellow-500' :
                pkg.package_name.includes('الاحترافية') ? 'border-purple-500' :
                'border-blue-500'
              }" data-name="${pkg.package_name || ''}" data-price="${pkg.price || 0}">
                <div class="text-center mb-4">
                  <i class="fas fa-box text-5xl ${
                    pkg.package_name.includes('الذهبية') ? 'text-yellow-500' :
                    pkg.package_name.includes('الاحترافية') ? 'text-purple-500' :
                    'text-blue-500'
                  } mb-3"></i>
                  <h3 class="text-2xl font-bold text-gray-800">${pkg.package_name}</h3>
                  <p class="text-sm text-gray-600 mt-2">${pkg.description || ''}</p>
                </div>
                
                <div class="border-t border-b border-gray-200 py-4 my-4">
                  <div class="text-center">
                    <span class="text-4xl font-bold text-gray-800">${pkg.price}</span>
                    <span class="text-gray-600"> ريال</span>
                    <p class="text-sm text-gray-500 mt-1">لمدة ${pkg.duration_months} شهر</p>
                  </div>
                </div>
                
                <div class="space-y-3 mb-4">
                  <div class="flex items-center text-sm">
                    <i class="fas fa-check-circle text-green-500 ml-2"></i>
                    <span><strong>${pkg.max_calculations}</strong> حساب</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <i class="fas fa-users text-blue-500 ml-2"></i>
                    <span>حتى <strong>${pkg.max_users}</strong> مستخدمين</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <i class="fas fa-${pkg.is_active ? 'check' : 'times'}-circle ${pkg.is_active ? 'text-green-500' : 'text-red-500'} ml-2"></i>
                    <span>${pkg.is_active ? 'نشط' : 'غير نشط'}</span>
                  </div>
                </div>
                
                <div class="pt-4 border-t border-gray-200 flex gap-2 justify-center">
                  <a href="/admin/packages/${pkg.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-eye"></i> عرض
                  </a>
                  <a href="/admin/packages/${pkg.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-edit"></i> تعديل
                  </a>
                  <a href="/admin/packages/${pkg.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-trash"></i> حذف
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterPackages() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const grid = document.getElementById('packagesGrid')
            const cards = grid.getElementsByClassName('package-card')
            let visibleCount = 0
            
            for (let i = 0; i < cards.length; i++) {
              const card = cards[i]
              const name = card.getAttribute('data-name') || ''
              const price = card.getAttribute('data-price') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'name':
                    shouldShow = name.toLowerCase().includes(searchInput)
                    break
                  case 'price':
                    shouldShow = price.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = name.toLowerCase().includes(searchInput) || 
                                price.toLowerCase().includes(searchInput)
                }
              }
              
              card.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterPackages()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم الباقة', 'الوصف', 'السعر', 'المدة (شهور)', 'الحسابات', 'المستخدمين', 'الحالة'],
              ${packages.results.map((pkg: any) => `['${pkg.id}', '${pkg.package_name}', '${pkg.description || ''}', '${pkg.price}', '${pkg.duration_months}', '${pkg.max_calculations}', '${pkg.max_users}', '${pkg.is_active ? 'نشط' : 'غير نشط'}']`).join(',\n              ')}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'الباقات_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة عرض باقة واحدة ====================
app.get('/admin/packages/new', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة باقة جديدة</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/packages" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة لقائمة الباقات
          </a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-plus-circle text-pink-600 ml-2"></i>
            إضافة باقة جديدة
          </h1>
          
          <form action="/api/packages" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- اسم الباقة -->
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-box text-purple-600 ml-1"></i>
                  اسم الباقة *
                </label>
                <input type="text" name="package_name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: الباقة الذهبية">
              </div>
              
              <!-- السعر -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill-wave text-green-600 ml-1"></i>
                  السعر (ريال) *
                </label>
                <input type="number" name="price" required min="0" step="0.01" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: 5000">
              </div>
              
              <!-- المدة بالأشهر -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar text-blue-600 ml-1"></i>
                  المدة (شهور) *
                </label>
                <select name="duration_months" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">-- اختر المدة --</option>
                  <option value="1">شهر واحد</option>
                  <option value="3">3 أشهر</option>
                  <option value="6">6 أشهر</option>
                  <option value="12">سنة واحدة (12 شهر)</option>
                  <option value="24">سنتين (24 شهر)</option>
                  <option value="36">3 سنوات (36 شهر)</option>
                </select>
              </div>
              
              <!-- عدد الحسابات -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calculator text-orange-600 ml-1"></i>
                  عدد الحسابات المسموحة *
                </label>
                <input type="number" name="max_calculations" required min="1" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: 1000">
              </div>
              
              <!-- عدد المستخدمين -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-users text-indigo-600 ml-1"></i>
                  عدد المستخدمين المسموح *
                </label>
                <input type="number" name="max_users" required min="1" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: 5">
              </div>
              
              <!-- الحالة -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-toggle-on text-green-600 ml-1"></i>
                  الحالة *
                </label>
                <select name="is_active" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="1">نشط</option>
                  <option value="0">غير نشط</option>
                </select>
              </div>
              
              <!-- الوصف -->
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-align-right text-gray-600 ml-1"></i>
                  الوصف
                </label>
                <textarea name="description" rows="3" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="وصف مختصر للباقة..."></textarea>
              </div>
            </div>
            
            <div class="flex gap-4 pt-6 border-t">
              <button type="submit" class="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                <i class="fas fa-save ml-2"></i>
                حفظ الباقة
              </button>
              <a href="/admin/packages" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `)
})
app.get('/admin/packages/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const pkg = await c.env.DB.prepare('SELECT * FROM packages WHERE id = ?').bind(id).first()
    
    if (!pkg) {
      return c.html('<h1>الباقة غير موجودة</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض الباقة #${id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/packages" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الباقات
            </a>
            <div class="flex gap-2">
              <a href="/admin/packages/${id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/packages/${id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8 border-t-4 ${
            pkg.package_name.includes('الذهبية') ? 'border-yellow-500' :
            pkg.package_name.includes('الاحترافية') ? 'border-purple-500' :
            'border-blue-500'
          }">
            <div class="text-center mb-8">
              <i class="fas fa-box text-6xl ${
                pkg.package_name.includes('الذهبية') ? 'text-yellow-500' :
                pkg.package_name.includes('الاحترافية') ? 'text-purple-500' :
                'text-blue-500'
              } mb-4"></i>
              <h1 class="text-4xl font-bold text-gray-800">${pkg.package_name}</h1>
              ${pkg.description ? `<p class="text-gray-600 mt-2">${pkg.description}</p>` : ''}
            </div>
            
            <div class="border-t border-b border-gray-200 py-6 my-6">
              <div class="text-center">
                <span class="text-5xl font-bold text-gray-800">${pkg.price}</span>
                <span class="text-2xl text-gray-600"> ريال</span>
                <p class="text-gray-500 mt-2">لمدة ${pkg.duration_months} شهر</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="flex items-center">
                <i class="fas fa-calculator text-orange-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">عدد الحسابات</p>
                  <p class="text-2xl font-bold text-gray-800">${pkg.max_calculations || 'غير محدود'}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-users text-blue-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">عدد المستخدمين</p>
                  <p class="text-2xl font-bold text-gray-800">${pkg.max_users || 'غير محدود'}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-${pkg.is_active ? 'check' : 'times'}-circle text-2xl ml-3 ${pkg.is_active ? 'text-green-600' : 'text-red-600'}"></i>
                <div>
                  <p class="text-sm text-gray-600">الحالة</p>
                  <p class="text-xl font-bold ${pkg.is_active ? 'text-green-600' : 'text-red-600'}">
                    ${pkg.is_active ? 'نشط' : 'غير نشط'}
                  </p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-calendar text-purple-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">تاريخ الإنشاء</p>
                  <p class="text-sm text-gray-800">${new Date(pkg.created_at).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== نموذج إضافة باقة جديدة ====================

// ==================== صفحة المستخدمين (Users) ====================

app.get('/admin/users', async (c) => {
  try {
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>المستخدمين</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6 flex items-center justify-between">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
            <div class="flex items-center gap-3">
              <i class="fas fa-user-circle text-2xl text-gray-600"></i>
              <div class="text-right">
                <div class="text-sm font-bold text-gray-800" id="currentUserName">جاري التحميل...</div>
                <div class="text-xs text-gray-500" id="currentUserRole">-</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-users text-indigo-600 ml-2"></i>
                المستخدمين (<span id="totalCount">0</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/users/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="username">اسم المستخدم فقط</option>
                    <option value="fullname">الاسم الكامل فقط</option>
                    <option value="email">البريد فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم المستخدم</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الاسم الكامل</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">البريد الإلكتروني</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الدور</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الشركة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                <tr>
                  <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                    <div>جاري تحميل البيانات...</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          let allUsers = []; // تخزين جميع المستخدمين
          
          // تحميل بيانات المستخدم الحالي
          function loadCurrentUser() {
            const userData = localStorage.getItem('userData') || localStorage.getItem('user');
            if (userData) {
              const user = JSON.parse(userData);
              document.getElementById('currentUserName').textContent = user.full_name || user.username || 'مستخدم';
              document.getElementById('currentUserRole').textContent = user.role === 'company' ? 'مدير شركة' : (user.role === 'admin' ? 'مدير نظام' : 'مستخدم');
            }
          }
          
          // تحميل المستخدمين من API
          async function loadUsers() {
            try {
              const authToken = localStorage.getItem('authToken');
              if (!authToken) {
                console.error('⚠️ لا يوجد authToken - إعادة التوجيه لصفحة تسجيل الدخول');
                window.location.href = '/login';
                return;
              }
              
              console.log('🔄 جاري تحميل المستخدمين من API...');
              const response = await axios.get('/api/users', {
                headers: { 'Authorization': \`Bearer \${authToken}\` }
              });
              
              if (response.data.success) {
                allUsers = response.data.data;
                console.log(\`✅ تم تحميل \${allUsers.length} مستخدم\`);
                renderUsers(allUsers);
              } else {
                throw new Error(response.data.error || 'فشل تحميل المستخدمين');
              }
            } catch (error) {
              console.error('❌ خطأ في تحميل المستخدمين:', error);
              document.getElementById('tableBody').innerHTML = \`
                <tr>
                  <td colspan="8" class="px-6 py-8 text-center text-red-500">
                    <i class="fas fa-exclamation-triangle text-3xl mb-2"></i>
                    <div>فشل تحميل البيانات: \${error.message}</div>
                  </td>
                </tr>
              \`;
            }
          }
          
          // عرض المستخدمين في الجدول
          function renderUsers(users) {
            const tbody = document.getElementById('tableBody');
            
            if (!users || users.length === 0) {
              tbody.innerHTML = \`
                <tr>
                  <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <div>لا توجد بيانات مستخدمين</div>
                  </td>
                </tr>
              \`;
              document.getElementById('totalCount').textContent = '0';
              return;
            }
            
            tbody.innerHTML = users.map(user => {
              const roleClass = user.user_type === 'admin' ? 'bg-red-100 text-red-800' : 
                                user.user_type === 'company' ? 'bg-blue-100 text-blue-800' : 
                                'bg-gray-100 text-gray-800';
              const statusClass = user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
              const statusText = user.is_active ? 'نشط' : 'غير نشط';
              
              return \`
                <tr class="hover:bg-gray-50" 
                    data-username="\${user.username || ''}" 
                    data-fullname="\${user.full_name || ''}" 
                    data-email="\${user.email || ''}">
                  <td class="px-6 py-4 text-sm text-gray-900">\${user.id}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <i class="fas fa-user text-indigo-600 ml-2"></i>
                      <span class="text-sm font-bold text-gray-900">\${user.username}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">\${user.full_name || '-'}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">\${user.email || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold \${roleClass}">
                      \${user.role_name || user.user_type || 'غير محدد'}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">\${user.company_name || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold \${statusClass}">
                      \${statusText}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2 justify-center">
                      <a href="/admin/users/\${user.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                        <i class="fas fa-eye"></i> عرض
                      </a>
                      <a href="/admin/users/\${user.id}/permissions" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-xs transition-all" title="إدارة الصلاحيات">
                        <i class="fas fa-user-shield"></i> صلاحيات
                      </a>
                      <a href="/admin/users/\${user.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                        <i class="fas fa-edit"></i> تعديل
                      </a>
                      <a href="/admin/users/\${user.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                        <i class="fas fa-trash"></i> حذف
                      </a>
                    </div>
                  </td>
                </tr>
              \`;
            }).join('');
            
            document.getElementById('totalCount').textContent = users.length;
          }
          
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
            const filterField = document.getElementById('filterField').value;
            
            if (searchInput === '') {
              renderUsers(allUsers);
              return;
            }
            
            const filtered = allUsers.filter(user => {
              const username = (user.username || '').toLowerCase();
              const fullname = (user.full_name || '').toLowerCase();
              const email = (user.email || '').toLowerCase();
              
              switch(filterField) {
                case 'username':
                  return username.includes(searchInput);
                case 'fullname':
                  return fullname.includes(searchInput);
                case 'email':
                  return email.includes(searchInput);
                default:
                  return username.includes(searchInput) || 
                         fullname.includes(searchInput) || 
                         email.includes(searchInput);
              }
            });
            
            renderUsers(filtered);
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('filterField').value = 'all';
            renderUsers(allUsers);
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم المستخدم', 'الاسم الكامل', 'البريد الإلكتروني', 'الدور', 'الشركة', 'الحالة']
            ];
            
            allUsers.forEach(user => {
              data.push([
                user.id,
                user.username,
                user.full_name || '-',
                user.email || '-',
                user.role_name || user.user_type || 'غير محدد',
                user.company_name || '-',
                user.is_active ? 'نشط' : 'غير نشط'
              ]);
            });
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'المستخدمين_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
          
          // تحميل البيانات عند تحميل الصفحة
          document.addEventListener('DOMContentLoaded', () => {
            loadCurrentUser();
            loadUsers();
          });
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== صفحة عرض مستخدم ====================
app.get('/admin/users/new', async (c) => {
  try {
    const roles = await c.env.DB.prepare('SELECT id, role_name FROM roles ORDER BY id').all()
    const subscriptions = await c.env.DB.prepare('SELECT id, company_name FROM subscriptions WHERE status = "active" ORDER BY company_name').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة مستخدم جديد</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <!-- Header مع زر تسجيل الخروج -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg mb-6">
          <div class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center space-x-reverse space-x-4">
              <button onclick="doLogout()" class="p-2 hover:bg-red-500 rounded-lg transition-colors" title="تسجيل الخروج">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
            <div class="flex items-center space-x-reverse space-x-3">
              <div class="text-right">
                <div class="font-bold" id="userDisplayName">مدير النظام</div>
                <div class="text-xs text-blue-200" id="userEmail">admin@tamweel.sa</div>
              </div>
              <i class="fas fa-user-circle text-3xl"></i>
            </div>
          </div>
        </div>
        
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/users" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة المستخدمين
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-indigo-600 ml-2"></i>
              إضافة مستخدم جديد
            </h1>
            
            <form id="addUserForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- اسم المستخدم -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-user text-indigo-600 ml-1"></i>
                    اسم المستخدم *
                  </label>
                  <input type="text" name="username" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: ahmed123">
                </div>
                
                <!-- كلمة المرور -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-lock text-red-600 ml-1"></i>
                    كلمة المرور *
                  </label>
                  <input type="password" name="password" required minlength="6" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="••••••••">
                </div>
                
                <!-- الاسم الكامل -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-id-card text-blue-600 ml-1"></i>
                    الاسم الكامل *
                  </label>
                  <input type="text" name="full_name" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: أحمد محمد السعيد">
                </div>
                
                <!-- البريد الإلكتروني -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-envelope text-purple-600 ml-1"></i>
                    البريد الإلكتروني
                  </label>
                  <input type="email" name="email" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: ahmed@example.com">
                </div>
                
                <!-- رقم الجوال -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-phone text-green-600 ml-1"></i>
                    رقم الجوال
                  </label>
                  <input type="tel" name="phone" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: 0512345678">
                </div>
                
                <!-- نوع المستخدم -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-user-tag text-orange-600 ml-1"></i>
                    نوع المستخدم *
                  </label>
                  <select name="user_type" required id="userType" onchange="toggleSubscription()" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">-- اختر نوع المستخدم --</option>
                    <option value="admin">مدير النظام</option>
                    <option value="company">شركة</option>
                    <option value="employee">موظف</option>
                  </select>
                </div>
                
                <!-- الدور -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-shield-alt text-red-600 ml-1"></i>
                    الدور *
                  </label>
                  <select name="role_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">-- اختر الدور --</option>
                    ${roles.results.map((role: any) => `
                      <option value="${role.id}">${role.role_name}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- الاشتراك -->
                <div id="subscriptionDiv" class="md:col-span-2" style="display: none;">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-building text-teal-600 ml-1"></i>
                    الاشتراك (للشركات فقط)
                  </label>
                  <select name="subscription_id" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">-- اختر الاشتراك --</option>
                    ${subscriptions.results.map((sub: any) => `
                      <option value="${sub.id}">${sub.company_name}</option>
                    `).join('')}
                  </select>
                </div>
                
                <!-- الحالة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-toggle-on text-green-600 ml-1"></i>
                    الحالة *
                  </label>
                  <select name="is_active" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="1">نشط</option>
                    <option value="0">غير نشط</option>
                  </select>
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ المستخدم
                </button>
                <a href="/admin/users" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          // دالة تسجيل الخروج
          function doLogout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
              console.log('🚪 تسجيل الخروج...');
              localStorage.removeItem('user');
              localStorage.removeItem('userData');
              localStorage.removeItem('authToken');
              localStorage.removeItem('token');
              console.log('✅ تم حذف بيانات المستخدم والتوكن');
              window.location.href = '/login';
            }
          }
          
          // تحميل بيانات المستخدم
          function loadUserData() {
            try {
              let userStr = localStorage.getItem('userData') || localStorage.getItem('user');
              if (userStr) {
                const user = JSON.parse(userStr);
                const displayNameEl = document.getElementById('userDisplayName');
                const emailEl = document.getElementById('userEmail');
                
                if (displayNameEl) {
                  let displayName = user.full_name || user.username || 'مستخدم';
                  if (user.tenant_name) {
                    displayName = 'مدير ' + user.tenant_name;
                  } else if (user.role === 'admin') {
                    displayName += ' (مدير النظام)';
                  }
                  displayNameEl.textContent = displayName;
                }
                
                if (emailEl && user.email) {
                  emailEl.textContent = user.email;
                }
              }
            } catch (error) {
              console.error('خطأ في تحميل بيانات المستخدم:', error);
            }
          }
          
          // تحميل البيانات عند تحميل الصفحة
          loadUserData();
          document.addEventListener('DOMContentLoaded', loadUserData);
          
          function toggleSubscription() {
            const userType = document.getElementById('userType').value;
            const subscriptionDiv = document.getElementById('subscriptionDiv');
            
            if (userType === 'company') {
              subscriptionDiv.style.display = 'block';
            } else {
              subscriptionDiv.style.display = 'none';
            }
          }
          
          // Handle form submission with token
          document.getElementById('addUserForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const token = localStorage.getItem('authToken');
            
            if (!token) {
              alert('لم يتم العثور على رمز التوثيق. الرجاء تسجيل الدخول مرة أخرى.');
              window.location.href = '/login';
              return;
            }
            
            console.log('📤 إرسال بيانات المستخدم...');
            
            try {
              const response = await axios.post('/api/users', formData, {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                }
              });
              
              console.log('✅ تم إضافة المستخدم بنجاح:', response.data);
              alert('✓ تم إضافة المستخدم بنجاح!');
              
              // Redirect to users page on success
              window.location.href = '/admin/users';
            } catch (error) {
              console.error('❌ خطأ في إضافة المستخدم:', error);
              alert(error.response?.data?.error || 'حدث خطأ أثناء إضافة المستخدم');
            }
          });
        </script>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل الصفحة</h1>')
  }
})
app.get('/admin/users/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const user = await c.env.DB.prepare(`
      SELECT u.*, r.role_name, s.company_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN subscriptions s ON u.subscription_id = s.id
      WHERE u.id = ?
    `).bind(id).first()
    
    if (!user) {
      return c.html('<h1>المستخدم غير موجود</h1>')
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض المستخدم #${id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/users" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة المستخدمين
            </a>
            <div class="flex gap-2">
              <a href="/admin/users/${id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/users/${id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold ml-4">
                ${user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-800">${user.full_name || 'غير محدد'}</h1>
                <p class="text-gray-600">@${user.username}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">اسم المستخدم</label>
                <p class="text-lg text-gray-900">${user.username}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الاسم الكامل</label>
                <p class="text-lg text-gray-900">${user.full_name || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                <p class="text-lg text-gray-900">${user.email || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">رقم الجوال</label>
                <p class="text-lg text-gray-900">${user.phone || '-'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الدور</label>
                <p class="text-lg text-gray-900">
                  <span class="px-3 py-1 rounded-full ${
                    user.role_name === 'مدير' ? 'bg-red-100 text-red-800' :
                    user.role_name === 'محاسب' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }">
                    ${user.role_name || '-'}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الشركة</label>
                <p class="text-lg text-gray-900">${user.company_name || 'غير مرتبط'}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${user.is_active ? 'نشط' : 'غير نشط'}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(user.created_at).toLocaleString('ar-SA')}</p>
              </div>
              
              ${user.last_login ? `
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-600 mb-1">آخر تسجيل دخول</label>
                  <p class="text-gray-900">${new Date(user.last_login).toLocaleString('ar-SA')}</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.html('<h1>خطأ في تحميل البيانات</h1>')
  }
})

// ==================== نموذج إضافة مستخدم جديد ====================

// ==================== صفحة إدارة صلاحيات المستخدم ====================
app.get('/admin/users/:id/permissions', async (c) => {
  try {
    const userId = c.req.param('id')
    
    // جلب بيانات المستخدم
    const user = await c.env.DB.prepare(`
      SELECT u.*, r.role_name 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `).bind(userId).first()
    
    if (!user) {
      return c.html('<h1>المستخدم غير موجود</h1>')
    }
    
    // جلب جميع الصلاحيات مع التصنيف
    const allPermissions = await c.env.DB.prepare(`
      SELECT * FROM permissions ORDER BY category, id
    `).all()
    
    // جلب صلاحيات المستخدم الحالية عبر الدور (role)
    const userPermissions = await c.env.DB.prepare(`
      SELECT p.id, p.permission_key
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
    `).bind(user.role_id).all()
    
    const userPermissionIds = userPermissions.results.map((p: any) => p.id)
    
    // تجميع الصلاحيات حسب الفئة
    const groupedPermissions: any = {}
    allPermissions.results.forEach((perm: any) => {
      if (!groupedPermissions[perm.category]) {
        groupedPermissions[perm.category] = []
      }
      groupedPermissions[perm.category].push({
        ...perm,
        hasPermission: userPermissionIds.includes(perm.id)
      })
    })
    
    const categoryNames: any = {
      'dashboard': 'لوحة التحكم',
      'customers': 'العملاء',
      'requests': 'طلبات التمويل',
      'banks': 'البنوك',
      'rates': 'النسب التمويلية',
      'packages': 'الباقات',
      'subscriptions': 'الاشتراكات',
      'users': 'المستخدمين',
      'calculator': 'الحاسبة',
      'reports': 'التقارير'
    }
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إدارة صلاحيات ${user.full_name}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="container mx-auto px-4 py-8">
          <!-- العنوان -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                  <i class="fas fa-user-shield text-indigo-600 ml-2"></i>
                  إدارة صلاحيات المستخدم
                </h1>
                <div class="flex items-center gap-4 text-gray-600">
                  <span><i class="fas fa-user ml-1"></i> ${user.full_name}</span>
                  <span><i class="fas fa-envelope ml-1"></i> ${user.email}</span>
                  <span><i class="fas fa-shield-alt ml-1"></i> ${user.role_name}</span>
                </div>
              </div>
              <a href="/admin/users" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <i class="fas fa-arrow-right ml-2"></i>
                رجوع للمستخدمين
              </a>
            </div>
          </div>

          <!-- نموذج الصلاحيات -->
          <form id="permissionsForm" class="space-y-6">
            <input type="hidden" name="user_id" value="${userId}">
            <input type="hidden" name="role_id" value="${user.role_id}">
            
            ${Object.keys(groupedPermissions).map(category => `
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-600 pb-2">
                  <i class="fas fa-folder text-indigo-600 ml-2"></i>
                  ${categoryNames[category] || category}
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${groupedPermissions[category].map((perm: any) => `
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <input 
                        type="checkbox" 
                        id="perm_${perm.id}" 
                        name="permissions[]" 
                        value="${perm.id}"
                        ${perm.hasPermission ? 'checked' : ''}
                        class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      >
                      <label for="perm_${perm.id}" class="mr-3 flex-1 cursor-pointer">
                        <div class="font-semibold text-gray-800">${perm.permission_name}</div>
                        ${perm.description ? `<div class="text-xs text-gray-500">${perm.description}</div>` : ''}
                      </label>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
            
            <!-- أزرار الحفظ -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex gap-4 justify-center">
                <button type="button" onclick="selectAll()" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-check-double ml-2"></i>
                  تحديد الكل
                </button>
                <button type="button" onclick="deselectAll()" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-times-circle ml-2"></i>
                  إلغاء تحديد الكل
                </button>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ الصلاحيات
                </button>
              </div>
            </div>
          </form>
        </div>

        <script>
          function selectAll() {
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true)
          }
          
          function deselectAll() {
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false)
          }
          
          document.getElementById('permissionsForm').addEventListener('submit', async (e) => {
            e.preventDefault()
            
            const formData = new FormData(e.target)
            const userId = formData.get('user_id')
            const roleId = formData.get('role_id')
            const permissions = formData.getAll('permissions[]')
            
            try {
              const response = await fetch(\`/api/users/\${userId}/permissions\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_id: roleId, permission_ids: permissions })
              })
              
              const result = await response.json()
              
              if (result.success) {
                alert('✅ تم حفظ الصلاحيات بنجاح!')
                window.location.href = '/admin/users'
              } else {
                alert('❌ خطأ: ' + result.error)
              }
            } catch (error) {
              alert('❌ حدث خطأ أثناء الحفظ')
              console.error(error)
            }
          })
        </script>
      </body>
      </html>
    `)
  } catch (error: any) {
    return c.html('<h1>خطأ في تحميل البيانات: ' + error.message + '</h1>')
  }
})

// API لحفظ صلاحيات المستخدم
app.post('/api/users/:id/permissions', async (c) => {
  try {
    const userId = c.req.param('id')
    const { role_id, permission_ids } = await c.req.json()
    
    // حذف جميع صلاحيات الدور الحالية
    await c.env.DB.prepare(`
      DELETE FROM role_permissions WHERE role_id = ?
    `).bind(role_id).run()
    
    // إضافة الصلاحيات الجديدة
    if (permission_ids && permission_ids.length > 0) {
      for (const permId of permission_ids) {
        await c.env.DB.prepare(`
          INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
          VALUES (?, ?)
        `).bind(role_id, permId).run()
      }
    }
    
    return c.json({ success: true, message: 'تم تحديث الصلاحيات بنجاح' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default app
