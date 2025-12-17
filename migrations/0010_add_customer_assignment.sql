-- Migration 0010: نظام توزيع وتخصيص العملاء للموظفين
-- تاريخ الإنشاء: 2025-12-17
-- الهدف: السماح للمدير بتوزيع العملاء على الموظفين

-- إضافة حقل role (الدور) في جدول users
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'employee' CHECK(role IN ('admin', 'manager', 'employee'));

-- جدول تخصيص العملاء للموظفين
CREATE TABLE IF NOT EXISTS customer_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  employee_id INTEGER NOT NULL,
  assigned_by INTEGER NOT NULL,           -- من قام بالتخصيص (المدير)
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE(customer_id)  -- كل عميل يمكن تخصيصه لموظف واحد فقط
);

-- إنشاء indexes للأداء
CREATE INDEX IF NOT EXISTS idx_assignments_customer ON customer_assignments(customer_id);
CREATE INDEX IF NOT EXISTS idx_assignments_employee ON customer_assignments(employee_id);
CREATE INDEX IF NOT EXISTS idx_assignments_date ON customer_assignments(assigned_at);

-- جدول سجل تغييرات التخصيص
CREATE TABLE IF NOT EXISTS assignment_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  old_employee_id INTEGER,
  new_employee_id INTEGER NOT NULL,
  changed_by INTEGER NOT NULL,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (old_employee_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (new_employee_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_assignment_history_customer ON assignment_history(customer_id);
CREATE INDEX IF NOT EXISTS idx_assignment_history_employee ON assignment_history(new_employee_id);
