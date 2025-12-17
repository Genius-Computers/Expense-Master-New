-- Migration 0009: إضافة جدول تتبع حالات طلبات التمويل
-- تاريخ الإنشاء: 2025-12-17
-- الهدف: تتبع جميع تغييرات حالة الطلب مع الأوقات

-- جدول سجل حالات طلبات التمويل
CREATE TABLE IF NOT EXISTS financing_request_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- إنشاء index للأداء
CREATE INDEX IF NOT EXISTS idx_status_history_request ON financing_request_status_history(request_id);
CREATE INDEX IF NOT EXISTS idx_status_history_status ON financing_request_status_history(new_status);
CREATE INDEX IF NOT EXISTS idx_status_history_date ON financing_request_status_history(created_at);

-- إضافة حقل approved_at و rejected_at في جدول financing_requests
ALTER TABLE financing_requests ADD COLUMN approved_at TIMESTAMP;
ALTER TABLE financing_requests ADD COLUMN rejected_at TIMESTAMP;
ALTER TABLE financing_requests ADD COLUMN reviewed_at TIMESTAMP;

-- إضافة حقل لتتبع وقت إنشاء الطلب من الحاسبة
ALTER TABLE customers ADD COLUMN first_calculation_date TIMESTAMP;

-- ملاحظة: سيتم ملء السجلات القديمة بالحالة الحالية
