/* ═══════════════════════════════════
   IMPORT — Nhập hàng loạt (Bài tập + Trắc nghiệm)
   Flow: chọn file JSON → parse → hàng chờ duyệt → đăng Firestore
═══════════════════════════════════ */

let _impMode = 'exercise'; // 'exercise' | 'quiz'
let _impQueue = []; // [{data, status:'pending'|'approved'|'rejected', _editing:false}]

/* ═══════════════════════════════════
   Sub-tab switch (Bài tập / Trắc nghiệm)
═══════════════════════════════════ */
function impSetMode(mode){
  _impMode = mode;
  document.querySelectorAll('.imp-mode-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('imp-mode-'+mode)?.classList.add('active');
  document.getElementById('imp-hint-exercise').style.display = mode==='exercise'?'block':'none';
  document.getElementById('imp-hint-quiz').style.display = mode==='quiz'?'block':'none';
  iqClear();
}

/* ═══════════════════════════════════
   Drag & drop init
═══════════════════════════════════ */
function initImportDragDrop(){
  const zone = document.getElementById('import-drop-zone');
  if(!zone || zone._impInit) return;
  zone._impInit = true;
  zone.addEventListener('dragover', e=>{ e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', ()=>zone.classList.remove('dragover'));
  zone.addEventListener('drop', e=>{
    e.preventDefault(); zone.classList.remove('dragover');
    const f = e.dataTransfer.files[0];
    if(f) handleImportFile(f);
  });
  zone.addEventListener('click', e=>{
    if(e.target.tagName!=='INPUT') document.getElementById('import-file-input').click();
  });
}

/* ═══════════════════════════════════
   File parsing
═══════════════════════════════════ */
function handleImportFile(file){
  if(!file) return;
  if(!file.name.endsWith('.json')){ showToast('Chỉ nhận file .json!', false); return; }
  const reader = new FileReader();
  reader.onload = e=>{
    let json;
    try{ json = JSON.parse(e.target.result); }
    catch(err){ showToast('File JSON không hợp lệ: '+err.message, false); return; }
    if(_impMode==='exercise') parseExerciseImport(json);
    else parseQuizImport(json);
  };
  reader.onerror = ()=>showToast('Không đọc được file!', false);
  reader.readAsText(file);
}

/* ── Exercise schema parsing (giữ nguyên format cũ) ── */
function parseExerciseImport(json){
  let list, meta = {};
  if(Array.isArray(json)){
    list = json;
  } else if(json && Array.isArray(json.exercises)){
    list = json.exercises;
    meta = json.meta || {};
  } else {
    showToast('Cấu trúc JSON không đúng định dạng bài tập!', false); return;
  }
  if(!list.length){ showToast('File không có bài tập nào!', false); return; }

  const parsed = list.map(item=>{
    if(!item.q || !item.ans) return null; // bắt buộc
    const diff = ['easy','med','hard'].includes(item.diff) ? item.diff : (item.diff==='pro'?'hard':'med');
    const chuyen = item.chuyen===true || item.diff==='pro' || meta.chuyen===true || false;
    const city = item.city || meta.city || null;
    const origin = item.origin || meta.origin || (city ? `Sở GD&ĐT ${city}` : null);
    return {
      id: uid(),
      title: item.title || '',
      q: item.q,
      ans: item.ans,
      hint: item.hint || '',
      sol: item.sol || '',
      topic: item.topic || meta.topic || 'Tổng hợp',
      grade: parseInt(item.grade || meta.grade || 9),
      diff,
      chuyen,
      city,
      year: item.year ? parseInt(item.year) : (meta.year ? parseInt(meta.year) : null),
      school: item.school || meta.school || null,
      origin,
      createdBy: typeof _currentAuthorName==='function' ? _currentAuthorName() : 'Admin',
      createdAt: Date.now(),
    };
  }).filter(Boolean);

  if(!parsed.length){ showToast('Không có bài tập hợp lệ (thiếu đề bài hoặc đáp án)!', false); return; }

  _impQueue = parsed.map(data=>({ data, status:'approved' }));
  renderImportQueue();
  showToast(`Đã nạp ${parsed.length} bài tập vào hàng chờ!`);
}

/* ── Quiz schema parsing ── */
function parseQuizImport(json){
  let list, meta = {};
  if(Array.isArray(json)){
    list = json;
  } else if(json && Array.isArray(json.quizzes)){
    list = json.quizzes;
    meta = json.meta || {};
  } else {
    showToast('Cấu trúc JSON không đúng định dạng trắc nghiệm!', false); return;
  }
  if(!list.length){ showToast('File không có câu trắc nghiệm nào!', false); return; }

  const parsed = list.map(item=>{
    if(!item.q || !Array.isArray(item.opts) || item.opts.length!==4) return null;
    if(typeof item.ans !== 'number' || item.ans<0 || item.ans>3) return null;
    return {
      id: uid(),
      q: item.q,
      opts: item.opts,
      ans: item.ans,
      sol: item.sol || null,
      topic: item.topic || meta.topic || 'Tổng hợp',
      grade: parseInt(item.grade || meta.grade || 9),
      diff: ['easy','hard','pro'].includes(item.diff) ? item.diff : 'easy',
      city: item.city || meta.city || null,
      year: item.year ? parseInt(item.year) : (meta.year ? parseInt(meta.year) : null),
      school: item.school || meta.school || null,
    };
  }).filter(Boolean);

  if(!parsed.length){ showToast('Không có câu hợp lệ! Cần q, opts (4 phần tử), ans (0-3)!', false); return; }

  _impQueue = parsed.map(data=>({ data, status:'approved' }));
  renderImportQueue();
  showToast(`Đã nạp ${parsed.length} câu trắc nghiệm vào hàng chờ!`);
}

/* ═══════════════════════════════════
   Queue rendering
═══════════════════════════════════ */
function renderImportQueue(){
  const wrap = document.getElementById('import-queue-wrap');
  const list = document.getElementById('import-queue-list');
  if(!wrap || !list) return;

  if(!_impQueue.length){ wrap.style.display='none'; return; }
  wrap.style.display = 'block';

  const lblEx = {easy:'Dễ',med:'TB',hard:'Khó'};
  const lblQz = {easy:'Dễ',hard:'Khó',pro:'Chuyên'};

  list.innerHTML = _impQueue.map((item,i)=>{
    const d = item.data;
    const isQuiz = _impMode==='quiz';
    const lbl = isQuiz ? lblQz : lblEx;
    return `
    <div class="import-item ${item.status}" id="imp-item-${i}">
      <div class="import-item-header">
        <span class="import-item-idx">#${i+1}</span>
        <span class="import-item-badge ${d.diff}">${lbl[d.diff]||d.diff}</span>
        ${(!isQuiz&&d.chuyen)?'<span class="import-item-badge">⭐ Chuyên</span>':''}
        <span class="import-item-badge">Lớp ${d.grade}</span>
        <span class="import-item-badge">${d.topic}</span>
        ${d.city?`<span class="import-item-badge">📍 ${d.city}</span>`:''}
        ${d.year?`<span class="import-item-badge">📅 ${d.year}</span>`:''}
        ${(!isQuiz&&d.origin)?`<span class="import-item-badge">🏛️ ${d.origin}</span>`:''}
        ${(!isQuiz&&d.createdBy)?`<span class="import-item-badge">✍️ ${d.createdBy}</span>`:''}
        <span class="import-item-status ${item.status}">
          ${item.status==='approved'?'✅ Duyệt':item.status==='rejected'?'❌ Bỏ':'⏳ Chờ'}
        </span>
      </div>
      <div class="import-item-q">${(d.q||'').replace(/<[^>]+>/g,'').slice(0,140)}${(d.q||'').length>140?'…':''}</div>
      ${isQuiz ? `
        <div class="import-item-opts">
          ${d.opts.map((o,j)=>`<span class="import-opt ${j===d.ans?'correct':''}">${['A','B','C','D'][j]}. ${o.slice(0,40)}</span>`).join('')}
        </div>` : `
        <div class="import-item-ans"><strong>Đáp án:</strong> ${(d.ans||'').toString().slice(0,80)}</div>`
      }
      <div class="import-item-actions">
        <button class="imp-act-btn approve" onclick="iqSetStatus(${i},'approved')"><i class="ti ti-check"></i></button>
        <button class="imp-act-btn reject" onclick="iqSetStatus(${i},'rejected')"><i class="ti ti-x"></i></button>
        <button class="imp-act-btn del" onclick="iqRemove(${i})"><i class="ti ti-trash"></i></button>
      </div>
    </div>`;
  }).join('');

  mjRender(list);
  _updateImportCounts();
}

function _updateImportCounts(){
  const approved = _impQueue.filter(i=>i.status==='approved').length;
  const rejected = _impQueue.filter(i=>i.status==='rejected').length;
  const aEl = document.getElementById('iq-approved-count');
  const rEl = document.getElementById('iq-rejected-count');
  if(aEl) aEl.textContent = `${approved} duyệt`;
  if(rEl) rEl.textContent = `${rejected} bỏ`;
  const commitBtn = document.getElementById('iq-commit-btn');
  if(commitBtn) commitBtn.disabled = approved===0;
}

/* ═══════════════════════════════════
   Queue actions
═══════════════════════════════════ */
function iqSetStatus(idx, status){
  if(!_impQueue[idx]) return;
  _impQueue[idx].status = status;
  renderImportQueue();
}

function iqRemove(idx){
  _impQueue.splice(idx,1);
  renderImportQueue();
}

function iqSelectAll(){
  _impQueue.forEach(i=>i.status='approved');
  renderImportQueue();
}

function iqRejectAll(){
  _impQueue.forEach(i=>i.status='rejected');
  renderImportQueue();
}

function iqClear(){
  _impQueue = [];
  renderImportQueue();
  const input = document.getElementById('import-file-input');
  if(input) input.value = '';
}

/* ═══════════════════════════════════
   Commit to Firestore
═══════════════════════════════════ */
async function iqCommit(){
  if(!isAdmin){ showToast('Bạn không có quyền!', false); return; }
  const approved = _impQueue.filter(i=>i.status==='approved');
  if(!approved.length){ showToast('Không có mục nào được duyệt!', false); return; }

  const progress = document.getElementById('import-progress');
  const progressBar = document.getElementById('import-progress-bar');
  const progressText = document.getElementById('import-progress-text');
  const commitBtn = document.getElementById('iq-commit-btn');
  if(progress) progress.style.display='block';
  if(commitBtn) commitBtn.disabled = true;

  let done = 0;
  const isQuiz = _impMode==='quiz';

  for(const item of approved){
    try{
      if(isQuiz){
        await window.fbSaveQuiz(item.data);
      } else {
        await window.fbSaveExercise(item.data);
        if(!_exCache[item.data.diff]) _exCache[item.data.diff]=[];
        _exCache[item.data.diff].push(item.data);
      }
      item.status = 'done';
    }catch(e){
      console.error('Import commit error:', e);
      item.status = 'error';
    }
    done++;
    if(progressBar) progressBar.style.width = `${(done/approved.length)*100}%`;
    if(progressText) progressText.textContent = `Đang đăng... ${done}/${approved.length}`;
  }

  const failed = approved.filter(i=>i.status==='error').length;
  if(failed===0){
    showToast(`Đã đăng thành công ${done} ${isQuiz?'câu trắc nghiệm':'bài tập'}!`);
    iqClear();
  } else {
    showToast(`Đăng xong ${done-failed}/${done}, ${failed} lỗi. Kiểm tra console.`, false);
    renderImportQueue();
  }

  if(!isQuiz) renderExercises();
  if(isQuiz && typeof loadQuizManageList==='function') loadQuizManageList();
  if(progress) progress.style.display='none';
  if(commitBtn) commitBtn.disabled = false;
}