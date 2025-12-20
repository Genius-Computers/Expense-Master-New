-- ============================================
-- Migration 0010: نظام سير عمل الطلبات (Workflow System)
-- تاريخ الإنشاء: 2025-12-20
-- الهدف: إضافة نظام متكامل لإدارة مراحل طلبات التمويل
-- ============================================

-- 1. جدول مراحل سير العمل (Workflow Stages)
CREATE TABLE IF NOT EXISTS workflow_stages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stage_name TEXT UNIQUE NOT NULL,
  stage_name_ar TEXT NOT NULL,
  stage_order INTEGER NOT NULL,
  stage_color TEXT DEFAULT '#3B82F6',
  stage_icon TEXT DEFAULT 'fa-circle',
  description TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. جدول انتقالات مراحل سير العمل (Workflow Stage Transitions)
CREATE TABLE IF NOT EXISTS workflow_stage_transitions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL,
  from_stage_id INTEGER,
  to_stage_id INTEGER NOT NULL,
  transitioned_by INTEGER,
  notes TEXT,
  duration_minutes INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (from_stage_id) REFERENCES workflow_stages(id),
  FOREIGN KEY (to_stage_id) REFERENCES workflow_stages(id),
  FOREIGN KEY (transitioned_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. جدول إجراءات كل مرحلة (Stage Actions)
CREATE TABLE IF NOT EXISTS workflow_stage_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL,
  stage_id INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  action_data TEXT,
  performed_by INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (stage_id) REFERENCES workflow_stages(id),
  FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. جدول تذكيرات ومهام كل مرحلة (Stage Tasks)
CREATE TABLE IF NOT EXISTS workflow_stage_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL,
  stage_id INTEGER NOT NULL,
  task_title TEXT NOT NULL,
  task_description TEXT,
  assigned_to INTEGER,
  due_date TIMESTAMP,
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMP,
  completed_by INTEGER,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES financing_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (stage_id) REFERENCES workflow_stages(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (completed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- إضافة حقل current_stage_id في جدول financing_requests
ALTER TABLE financing_requests ADD COLUMN current_stage_id INTEGER;
ALTER TABLE financing_requests ADD COLUMN stage_entered_at TIMESTAMP;

-- Indexes للأداء
CREATE INDEX IF NOT EXISTS idx_transitions_request ON workflow_stage_transitions(request_id);
CREATE INDEX IF NOT EXISTS idx_transitions_stage ON workflow_stage_transitions(to_stage_id);
CREATE INDEX IF NOT EXISTS idx_actions_request ON workflow_stage_actions(request_id);
CREATE INDEX IF NOT EXISTS idx_tasks_request ON workflow_stage_tasks(request_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON workflow_stage_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON workflow_stage_tasks(status);

-- ============================================
-- إدراج المراحل الأساسية (5 مراحل)
-- ============================================

INSERT INTO workflow_stages (stage_name, stage_name_ar, stage_order, stage_color, stage_icon, description) VALUES
('received', 'استقبال الطلب', 1, '#10B981', 'fa-inbox', 'تم استلام الطلب من العميل'),
('initial_review', 'المراجعة الأولية', 2, '#3B82F6', 'fa-search', 'مراجعة البيانات الأولية للطلب'),
('bank_communication', 'التواصل مع البنك', 3, '#F59E0B', 'fa-building-columns', 'التواصل مع البنك لمعالجة الطلب'),
('decision', 'قرار الموافقة/الرفض', 4, '#8B5CF6', 'fa-gavel', 'البنك اتخذ قرار بالموافقة أو الرفض'),
('signature', 'التوقيع', 5, '#06B6D4', 'fa-file-signature', 'توقيع العقد من العميل');

-- ============================================
-- إنشاء triggers تلقائية
-- ============================================

-- Trigger: تسجيل انتقال تلقائي عند تغيير current_stage_id
CREATE TRIGGER IF NOT EXISTS after_stage_change
AFTER UPDATE OF current_stage_id ON financing_requests
WHEN NEW.current_stage_id IS NOT NULL AND (OLD.current_stage_id IS NULL OR OLD.current_stage_id != NEW.current_stage_id)
BEGIN
  INSERT INTO workflow_stage_transitions (request_id, from_stage_id, to_stage_id, created_at)
  VALUES (NEW.id, OLD.current_stage_id, NEW.current_stage_id, CURRENT_TIMESTAMP);
END;

-- ============================================
-- Views مفيدة
-- ============================================

-- View: عرض الطلبات مع معلومات المرحلة الحالية
CREATE VIEW IF NOT EXISTS v_requests_with_stage AS
SELECT 
  fr.id,
  fr.customer_id,
  fr.requested_amount,
  fr.status,
  fr.current_stage_id,
  ws.stage_name,
  ws.stage_name_ar,
  ws.stage_color,
  ws.stage_icon,
  fr.stage_entered_at,
  fr.created_at
FROM financing_requests fr
LEFT JOIN workflow_stages ws ON fr.current_stage_id = ws.id;

-- View: عرض آخر إجراء لكل طلب
CREATE VIEW IF NOT EXISTS v_latest_stage_actions AS
SELECT 
  wsa.*,
  ws.stage_name_ar,
  u.full_name as performed_by_name
FROM workflow_stage_actions wsa
INNER JOIN (
  SELECT request_id, MAX(created_at) as max_date
  FROM workflow_stage_actions
  GROUP BY request_id
) latest ON wsa.request_id = latest.request_id AND wsa.created_at = latest.max_date
LEFT JOIN workflow_stages ws ON wsa.stage_id = ws.id
LEFT JOIN users u ON wsa.performed_by = u.id;

-- ============================================
-- تعليق: كيفية استخدام النظام
-- ============================================

-- لإنشاء طلب جديد وتعيين المرحلة الأولى:
-- INSERT INTO financing_requests (..., current_stage_id, stage_entered_at) 
-- VALUES (..., 1, CURRENT_TIMESTAMP);

-- لتحديث المرحلة الحالية (يتم تسجيل الانتقال تلقائياً):
-- UPDATE financing_requests 
-- SET current_stage_id = 2, stage_entered_at = CURRENT_TIMESTAMP
-- WHERE id = ?;

-- لإضافة إجراء في مرحلة معينة:
-- INSERT INTO workflow_stage_actions (request_id, stage_id, action_type, action_data, performed_by)
-- VALUES (?, ?, 'call_customer', 'تم الاتصال بالعميل وتأكيد البيانات', ?);

-- لإنشاء مهمة:
-- INSERT INTO workflow_stage_tasks (request_id, stage_id, task_title, assigned_to, due_date)
-- VALUES (?, ?, 'الاتصال بالبنك للتأكيد', ?, DATETIME('now', '+2 days'));
