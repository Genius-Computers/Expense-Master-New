-- Migration: Create notifications table
-- Date: 2025-12-15
-- Description: Notification system for financing requests and status updates

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  category TEXT DEFAULT 'general', -- 'request', 'status_change', 'system', 'general'
  related_request_id INTEGER,
  is_read INTEGER DEFAULT 0, -- 0 = unread, 1 = read
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  read_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (related_request_id) REFERENCES financing_requests(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_request ON notifications(related_request_id);

-- Insert sample notifications for testing (without foreign key constraints)
INSERT INTO notifications (user_id, title, message, type, category, related_request_id) VALUES
  (1, 'مرحباً في النظام', 'مرحباً بك في نظام إدارة التمويل', 'success', 'system', NULL),
  (1, 'تحديث النظام', 'تم تحديث النظام بنجاح', 'info', 'system', NULL);
