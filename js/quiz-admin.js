/* ═══════════════════════════════════
   QUIZ ADMIN — Form "Trắc nghiệm", danh sách hiện trong tab "Nội dung đã thêm"
═══════════════════════════════════ */

let _quizManageCache = [];

async function loadQuizManageList(){
  try{
    _quizManageCache = await fbGetQuizzes(null);
    renderQuizManageList();
  }catch(e){
    showToast('Lỗi tải danh sách: '+e.message, false);
  }
}

function renderQuizManageList(){
  const el = document.getElementById('quiz-manage-items');
  if(!el) return;
  const lbl = {easy:'Dễ',hard:'Khó',pro:'Chuyên'};
  const col  = {easy:'var(--teal)',hard:'rgba(217,119,6,1)',pro:'var(--violet)'};
  el.innerHTML = _quizManageCache.length
    ? _quizManageCache.map(q=>`
      <div class="admin-item">
        <div class="admin-item-body">
          <div class="admin-item-meta">
            <span style="color:${col[q.diff]};font-weight:800">${lbl[q.diff]||q.diff}</span>
            <span>Lớp ${q.grade}</span>
            <span>${q.topic||'—'}</span>
            ${q.city?`<span>📍 ${q.city}</span>`:''}
            ${q.year?`<span>📅 ${q.year}</span>`:''}
          </div>
          <div class="admin-item-q">${(q.q||'').replace(/<[^>]+>/g,'').slice(0,100)}${(q.q||'').length>100?'…':''}</div>
          <div style="font-size:.72rem;color:var(--text3);margin-top:3px;font-weight:600">
            Đáp án đúng: <strong style="color:var(--teal)">${['A','B','C','D'][q.ans]}</strong>
          </div>
        </div>
        <button class="admin-item-del" onclick="deleteQuizAdmin('${q.id}')">
          <i class="ti ti-trash" style="font-size:13px"></i> Xóa
        </button>
      </div>`).join('')
    : '<div class="empty-state" style="padding:1.25rem"><i class="ti ti-mood-empty"></i><p>Chưa có câu trắc nghiệm nào</p></div>';
}

async function deleteQuizAdmin(id){
  if(!isAdmin){ showToast('Không có quyền!',false); return; }
  if(!confirm('Xóa câu trắc nghiệm này?')) return;
  try{
    await fbDeleteQuiz(id);
    _quizManageCache = _quizManageCache.filter(q=>q.id!==id);
    renderQuizManageList();
    showToast('Đã xóa câu trắc nghiệm!');
  }catch(e){
    showToast('Lỗi xóa: '+e.message, false);
  }
}

async function submitQuizQuestion(){
  if(!isAdmin){ showToast('Không có quyền!',false); return; }
  const grade   = parseInt(document.getElementById('qz-grade').value);
  const diff    = document.getElementById('qz-diff').value;
  const topic   = document.getElementById('qz-topic').value.trim()||'Tổng hợp';
  const city    = document.getElementById('qz-city').value.trim()||null;
  const year    = document.getElementById('qz-year').value.trim();
  const school  = document.getElementById('qz-school').value.trim()||null;
  const q       = document.getElementById('qz-question').value.trim();
  const optA    = document.getElementById('qz-optA').value.trim();
  const optB    = document.getElementById('qz-optB').value.trim();
  const optC    = document.getElementById('qz-optC').value.trim();
  const optD    = document.getElementById('qz-optD').value.trim();
  const ans     = parseInt(document.getElementById('qz-ans').value);
  const sol     = document.getElementById('qz-sol').value.trim()||null;

  if(!q||!optA||!optB||!optC||!optD){
    showToast('Điền đầy đủ đề bài và 4 đáp án!', false); return;
  }

  const quiz = {
    id: uid(),
    grade, diff, topic,
    city, year: year?parseInt(year):null, school,
    q,
    opts: [optA, optB, optC, optD],
    ans,
    sol
  };

  const btn = document.querySelector('#aform-add-quiz .submit-btn');
  if(btn){ btn.disabled=true; btn.textContent='Đang lưu...'; }
  try{
    await fbSaveQuiz(quiz);
    _quizManageCache.push(quiz);
    renderQuizManageList();
    // Clear form
    ['qz-topic','qz-city','qz-year','qz-school','qz-question','qz-optA','qz-optB','qz-optC','qz-optD','qz-sol']
      .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    document.getElementById('qz-ans').value='0';
    showToast('Đã thêm câu trắc nghiệm!');
  }catch(e){
    showToast('Lỗi lưu: '+e.message, false);
  }finally{
    if(btn){ btn.disabled=false; btn.innerHTML='<i class="ti ti-send"></i> Đăng câu hỏi'; }
  }
}