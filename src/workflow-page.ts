// ============================================
// Workflow Timeline Page - صفحة مراحل سير العمل
// ============================================

export function generateWorkflowTimelinePage(requestId: number, request: any, stages: any[], timeline: any) {
  const { transitions = [], actions = [], tasks = [] } = timeline

  // Calculate duration between stages
  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days} يوم`
    return `${hours} ساعة`
  }

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مراحل الطلب - ${request.customer_name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* Timeline Styles */
    .timeline-container {
      position: relative;
      padding-right: 2rem;
    }
    
    .timeline-line {
      position: absolute;
      right: 0.75rem;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%);
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
      padding-right: 3rem;
    }
    
    .timeline-dot {
      position: absolute;
      right: -0.5rem;
      top: 0.5rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      box-shadow: 0 0 0 4px white, 0 0 0 6px currentColor;
      z-index: 10;
    }
    
    .timeline-dot.current {
      animation: pulse 2s infinite;
      box-shadow: 0 0 0 4px white, 0 0 0 6px currentColor, 0 0 20px currentColor;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .stage-card {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-right: 4px solid;
      transition: all 0.3s;
    }
    
    .stage-card:hover {
      transform: translateX(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .action-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    
    .task-item {
      background: #F9FAFB;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      border-right: 3px solid;
    }
    
    .task-item.pending {
      border-right-color: #F59E0B;
    }
    
    .task-item.completed {
      border-right-color: #10B981;
      opacity: 0.7;
    }
    
    @media print {
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body class="bg-gray-50">
  
  <!-- Header -->
  <div class="bg-gradient-to-l from-blue-600 to-purple-600 text-white py-6 no-print">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold mb-2">
            <i class="fas fa-route ml-2"></i>
            مراحل سير عمل الطلب
          </h1>
          <p class="text-blue-100">الطلب رقم: ${requestId} | العميل: ${request.customer_name}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="window.print()" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <i class="fas fa-print ml-2"></i>
            طباعة
          </button>
          <a href="/admin/requests/${requestId}/report" class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة للتقرير
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Request Summary -->
  <div class="max-w-6xl mx-auto px-4 py-6">
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div class="text-gray-500 text-sm mb-1">المبلغ المطلوب</div>
          <div class="text-2xl font-bold text-blue-600">${Number(request.requested_amount).toLocaleString()} ريال</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">المرحلة الحالية</div>
          <div class="text-lg font-bold" style="color: ${request.stage_color || '#3B82F6'}">
            <i class="fas ${request.stage_icon || 'fa-circle'} ml-2"></i>
            ${request.stage_name_ar || 'غير محدد'}
          </div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">الحالة</div>
          <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              request.status === 'approved' ? 'bg-green-100 text-green-800' : 
              request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
              'bg-gray-100 text-gray-800'}">
            ${request.status === 'pending' ? 'قيد الانتظار' : 
              request.status === 'approved' ? 'موافق عليه' : 
              request.status === 'rejected' ? 'مرفوض' : 
              request.status}
          </div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">تاريخ الطلب</div>
          <div class="text-lg font-bold text-gray-700">
            ${new Date(request.created_at).toLocaleDateString('ar-SA')}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Timeline -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        <i class="fas fa-timeline ml-2 text-blue-600"></i>
        المسار الزمني للطلب
      </h2>
      
      <div class="timeline-container">
        <div class="timeline-line"></div>
        
        ${transitions.length === 0 ? `
          <div class="text-center py-12 text-gray-500">
            <i class="fas fa-inbox fa-3x mb-4 text-gray-300"></i>
            <p class="text-lg">لم يتم تسجيل أي مراحل بعد</p>
          </div>
        ` : ''}
        
        ${transitions.map((transition: any, index: number) => {
          const isLast = index === transitions.length - 1
          const duration = index > 0 ? calculateDuration(transitions[index - 1].created_at, transition.created_at) : null
          
          // Get actions for this stage
          const stageActions = actions.filter((a: any) => a.stage_id === transition.to_stage_id)
          const stageTasks = tasks.filter((t: any) => t.stage_id === transition.to_stage_id)
          
          return `
            <div class="timeline-item">
              <div class="timeline-dot ${isLast ? 'current' : ''}" style="background-color: ${transition.to_stage_color}">
                <i class="fas ${transition.to_stage_icon}"></i>
              </div>
              
              <div class="stage-card" style="border-right-color: ${transition.to_stage_color}">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-1">
                      ${index + 1}. ${transition.to_stage_name}
                    </h3>
                    <p class="text-sm text-gray-500">
                      <i class="fas fa-clock ml-1"></i>
                      ${new Date(transition.created_at).toLocaleString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  ${duration ? `
                    <div class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                      <i class="fas fa-hourglass-half ml-1"></i>
                      استغرق ${duration}
                    </div>
                  ` : ''}
                </div>
                
                ${transition.transitioned_by_name ? `
                  <div class="text-sm text-gray-600 mb-3">
                    <i class="fas fa-user ml-1 text-gray-400"></i>
                    بواسطة: <span class="font-medium">${transition.transitioned_by_name}</span>
                  </div>
                ` : ''}
                
                ${transition.notes ? `
                  <div class="bg-yellow-50 border-r-3 border-yellow-400 p-3 rounded mb-3">
                    <p class="text-sm text-gray-700">
                      <i class="fas fa-sticky-note ml-1 text-yellow-600"></i>
                      ${transition.notes}
                    </p>
                  </div>
                ` : ''}
                
                ${stageActions.length > 0 ? `
                  <div class="mb-3">
                    <h4 class="text-sm font-bold text-gray-700 mb-2">
                      <i class="fas fa-tasks ml-1"></i>
                      الإجراءات المتخذة:
                    </h4>
                    ${stageActions.map((action: any) => `
                      <div class="action-badge bg-green-50 text-green-700 border border-green-200">
                        <i class="fas fa-check-circle"></i>
                        <span>${action.action_data || action.action_type}</span>
                        ${action.performed_by_name ? `<span class="text-xs text-green-600">- ${action.performed_by_name}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                
                ${stageTasks.length > 0 ? `
                  <div>
                    <h4 class="text-sm font-bold text-gray-700 mb-2">
                      <i class="fas fa-list-check ml-1"></i>
                      المهام:
                    </h4>
                    ${stageTasks.map((task: any) => `
                      <div class="task-item ${task.status}">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <div class="font-medium text-gray-800">${task.task_title}</div>
                            ${task.task_description ? `<div class="text-sm text-gray-600 mt-1">${task.task_description}</div>` : ''}
                            ${task.assigned_to_name ? `
                              <div class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-user ml-1"></i>
                                ${task.assigned_to_name}
                              </div>
                            ` : ''}
                          </div>
                          <div class="text-sm">
                            ${task.status === 'completed' ? `
                              <span class="text-green-600">
                                <i class="fas fa-check-circle ml-1"></i>
                                مكتمل
                              </span>
                            ` : `
                              <span class="text-yellow-600">
                                <i class="fas fa-clock ml-1"></i>
                                معلق
                              </span>
                            `}
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `
        }).join('')}
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="mt-6 flex gap-3 no-print">
      <button onclick="updateStage()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        <i class="fas fa-arrow-left ml-2"></i>
        تحديث المرحلة
      </button>
      <button onclick="addAction()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
        <i class="fas fa-plus ml-2"></i>
        إضافة إجراء
      </button>
      <button onclick="createTask()" class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
        <i class="fas fa-tasks ml-2"></i>
        إنشاء مهمة
      </button>
    </div>
  </div>
  
  <script>
    const stages = ${JSON.stringify(stages)};
    const currentRequestId = ${requestId};
    const currentStageId = ${request.current_stage_id || 'null'};
    
    // Close modal utility function
    function closeModal() {
      const modal = document.body.querySelector('.fixed');
      if (modal) modal.remove();
    }
    
    function updateStage() {
      // Create modal for stage selection
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = \`
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold mb-4">تحديث مرحلة الطلب</h3>
          <select id="newStageId" class="w-full border rounded-lg p-2 mb-3">
            \${stages.map(s => \`
              <option value="\${s.id}" \${s.id === currentStageId ? 'selected' : ''}>
                \${s.stage_name_ar}
              </option>
            \`).join('')}
          </select>
          <textarea id="stageNotes" placeholder="ملاحظات (اختياري)" class="w-full border rounded-lg p-2 mb-3" rows="3"></textarea>
          <div class="flex gap-2">
            <button onclick="confirmStageUpdate()" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">تحديث</button>
            <button onclick="closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
          </div>
        </div>
      \`;
      document.body.appendChild(modal);
    }
    
    async function confirmStageUpdate() {
      const newStageId = document.getElementById('newStageId').value;
      const notes = document.getElementById('stageNotes').value;
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      const response = await fetch('/api/workflow/update-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: currentRequestId,
          newStageId: parseInt(newStageId),
          notes: notes,
          userId: userData.id
        })
      });
      
      if (response.ok) {
        closeModal();
        location.reload();
      } else {
        alert('فشل تحديث المرحلة');
        closeModal();
      }
    }
    
    async function confirmAddAction() {
      const actionType = document.getElementById('actionType').value;
      const notes = document.getElementById('actionNotes').value;
      const actionDataText = document.getElementById('actionData').value;
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      let actionData = null;
      if (actionDataText.trim()) {
        try {
          actionData = JSON.parse(actionDataText);
        } catch (e) {
          alert('بيانات JSON غير صحيحة');
          return;
        }
      }
      
      const response = await fetch('/api/workflow/add-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: currentRequestId,
          stageId: currentStageId,
          actionType: actionType,
          actionData: actionData ? JSON.stringify(actionData) : null,
          notes: notes,
          performedBy: userData.id
        })
      });
      
      if (response.ok) {
        closeModal();
        location.reload();
      } else {
        alert('فشل إضافة الإجراء');
        closeModal();
      }
    }
    
    async function confirmCreateTask() {
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;
      const dueDate = document.getElementById('taskDueDate').value;
      const priority = document.getElementById('taskPriority').value;
      const assignedTo = document.getElementById('taskAssignedTo').value;
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      if (!title.trim()) {
        alert('الرجاء إدخال عنوان المهمة');
        return;
      }
      
      const response = await fetch('/api/workflow/create-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: currentRequestId,
          stageId: currentStageId,
          taskTitle: title,
          taskDescription: description,
          dueDate: dueDate || null,
          priority: priority,
          assignedTo: assignedTo ? parseInt(assignedTo) : null
        })
      });
      
      if (response.ok) {
        closeModal();
        location.reload();
      } else {
        alert('فشل إنشاء المهمة');
        closeModal();
      }
    }
    
    function addAction() {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = '<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">' +
        '<h3 class="text-xl font-bold mb-4">إضافة إجراء جديد</h3>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">نوع الإجراء</label>' +
        '<select id="actionType" class="w-full border rounded-lg p-2">' +
        '<option value="call">اتصال هاتفي</option>' +
        '<option value="email">بريد إلكتروني</option>' +
        '<option value="meeting">اجتماع</option>' +
        '<option value="document">مستند</option>' +
        '<option value="approval">موافقة</option>' +
        '<option value="rejection">رفض</option>' +
        '<option value="followup">متابعة</option>' +
        '<option value="other">أخرى</option>' +
        '</select></div>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">ملاحظات الإجراء</label>' +
        '<textarea id="actionNotes" placeholder="تفاصيل الإجراء..." class="w-full border rounded-lg p-2" rows="4"></textarea></div>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">بيانات إضافية (JSON - اختياري)</label>' +
        '<textarea id="actionData" class="w-full border rounded-lg p-2" rows="2"></textarea></div>' +
        '<div class="flex gap-2">' +
        '<button onclick="confirmAddAction()" class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">إضافة</button>' +
        '<button onclick="closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>' +
        '</div></div>';
      document.body.appendChild(modal);
    }
    }
    
    function createTask() {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = '<div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">' +
        '<h3 class="text-xl font-bold mb-4">إنشاء مهمة جديدة</h3>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">عنوان المهمة</label>' +
        '<input type="text" id="taskTitle" placeholder="عنوان المهمة..." class="w-full border rounded-lg p-2"></div>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">وصف المهمة</label>' +
        '<textarea id="taskDescription" placeholder="وصف تفصيلي للمهمة..." class="w-full border rounded-lg p-2" rows="3"></textarea></div>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">تاريخ الاستحقاق</label>' +
        '<input type="date" id="taskDueDate" class="w-full border rounded-lg p-2"></div>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">الأولوية</label>' +
        '<select id="taskPriority" class="w-full border rounded-lg p-2">' +
        '<option value="low">منخفضة</option>' +
        '<option value="medium" selected>متوسطة</option>' +
        '<option value="high">عالية</option>' +
        '<option value="urgent">عاجلة</option>' +
        '</select></div>' +
        '<div class="mb-3"><label class="block text-sm font-medium mb-1">المسؤول عن المهمة</label>' +
        '<input type="text" id="taskAssignedTo" placeholder="معرف المستخدم (اختياري)" class="w-full border rounded-lg p-2">' +
        '<small class="text-gray-500">اترك فارغاً للتعيين لاحقاً</small></div>' +
        '<div class="flex gap-2">' +
        '<button onclick="confirmCreateTask()" class="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">إنشاء</button>' +
        '<button onclick="closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>' +
        '</div></div>';
      document.body.appendChild(modal);
    }
  </script>
  
</body>
</html>
  `
}
