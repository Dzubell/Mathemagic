/* ═══════════════════════════════════
   QUIZ — Firebase wrappers
   Collection: quizzes (tách biệt với exercises)
═══════════════════════════════════ */

/* --- Firestore wrappers giờ sống bên firebase.js, gọi trực tiếp window.fb* --- */
async function fbGetQuizzes(diff){
  return await window.fbGetQuizzes(diff);
}

async function fbSaveQuiz(quiz){
  await window.fbSaveQuiz(quiz);
}

async function fbDeleteQuiz(id){
  await window.fbDeleteQuiz(id);
}

/* ═══════════════════════════════════
   QUIZ — State
═══════════════════════════════════ */
const QUIZ_TIME = {
  easy:  { 10: 10*60, 20: 20*60, 40: 40*60 },
  hard:  { 10: 15*60, 20: 30*60, 40: 60*60 },
  pro:   { 10: 20*60, 20: 40*60, 40: 80*60 },
};

const QUIZ_DIFF_LABEL = { easy:'Dễ', hard:'Khó', pro:'Chuyên' };
const QUIZ_DIFF_COLOR = {
  easy: 'var(--teal)',
  hard: 'rgba(217,119,6,1)',
  pro:  'var(--violet)',
};

let _quiz = {
  pool:       [],   // all questions fetched
  questions:  [],   // N picked randomly
  answers:    {},   // {idx: 0|1|2|3}
  diff:       'easy',
  count:      10,
  timeLeft:   0,
  timerRef:   null,
  phase:      'setup', // setup | playing | timeout | result
};

/* ═══════════════════════════════════
   QUIZ — Init entry point
═══════════════════════════════════ */
function initQuizSection(){
  _quiz.phase = 'setup';
  renderQuizSetup();
}

/* ═══════════════════════════════════
   QUIZ — Setup screen
═══════════════════════════════════ */
function renderQuizSetup(){
  _stopTimer();
  const el = document.getElementById('quiz-content');
  if(!el) return;
  el.innerHTML = `
  <div class="quiz-setup-wrap">
    <div class="quiz-setup-card">
      <div class="quiz-setup-icon"><i class="ti ti-list-check"></i></div>
      <h2 class="quiz-setup-title">Trắc nghiệm Toán</h2>
      <p class="quiz-setup-sub">Chọn cấu hình bài thi</p>

      <div class="quiz-setup-section">
        <div class="quiz-setup-label"><i class="ti ti-layers"></i> Độ khó</div>
        <div class="quiz-chip-group" id="qchip-diff">
          ${['easy','hard','pro'].map(d=>`
            <button class="quiz-chip${d==='easy'?' active':''}"
              data-val="${d}" onclick="qSelectDiff(this)">
              ${QUIZ_DIFF_LABEL[d]}
            </button>`).join('')}
        </div>
      </div>

      <div class="quiz-setup-section">
        <div class="quiz-setup-label"><i class="ti ti-hash"></i> Số câu</div>
        <div class="quiz-chip-group" id="qchip-count">
          ${[10,20,40].map(n=>`
            <button class="quiz-chip${n===10?' active':''}"
              data-val="${n}" onclick="qSelectCount(this)">
              ${n} câu
            </button>`).join('')}
        </div>
      </div>

      <div class="quiz-time-preview" id="quiz-time-preview">
        <i class="ti ti-clock"></i> Thời gian: <strong>10 phút</strong>
      </div>

      <button class="quiz-start-btn" onclick="startQuiz()">
        <i class="ti ti-player-play"></i> Bắt đầu thi
      </button>
    </div>
  </div>`;
  _quiz.diff  = 'easy';
  _quiz.count = 10;
  _updateTimePreview();
}

function qSelectDiff(btn){
  document.querySelectorAll('#qchip-diff .quiz-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _quiz.diff = btn.dataset.val;
  _updateTimePreview();
}

function qSelectCount(btn){
  document.querySelectorAll('#qchip-count .quiz-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _quiz.count = parseInt(btn.dataset.val);
  _updateTimePreview();
}

function _updateTimePreview(){
  const secs = QUIZ_TIME[_quiz.diff][_quiz.count];
  const mins = Math.floor(secs/60);
  const el = document.getElementById('quiz-time-preview');
  if(el) el.innerHTML = `<i class="ti ti-clock"></i> Thời gian: <strong>${mins} phút</strong>`;
}

/* ═══════════════════════════════════
   QUIZ — Start
═══════════════════════════════════ */
async function startQuiz(){
  const btn = document.querySelector('.quiz-start-btn');
  if(btn){ btn.disabled=true; btn.innerHTML='<i class="ti ti-loader-2 spin"></i> Đang tải...'; }

  try {
    _quiz.pool = await fbGetQuizzes(_quiz.diff);
  } catch(e){
    showToast('Lỗi tải câu hỏi: '+e.message, false);
    if(btn){ btn.disabled=false; btn.innerHTML='<i class="ti ti-player-play"></i> Bắt đầu thi'; }
    return;
  }

  if(_quiz.pool.length < _quiz.count){
    showToast(`Chỉ có ${_quiz.pool.length} câu ${QUIZ_DIFF_LABEL[_quiz.diff]} trong ngân hàng. Cần ít nhất ${_quiz.count} câu.`, false);
    if(btn){ btn.disabled=false; btn.innerHTML='<i class="ti ti-player-play"></i> Bắt đầu thi'; }
    return;
  }

  // Pick N random, no repeat
  const shuffled = [..._quiz.pool].sort(()=>Math.random()-.5);
  _quiz.questions = shuffled.slice(0, _quiz.count);
  _quiz.answers   = {};
  _quiz.timeLeft  = QUIZ_TIME[_quiz.diff][_quiz.count];
  _quiz.phase     = 'playing';

  renderQuizPlaying();
  _startTimer();
}

/* ═══════════════════════════════════
   QUIZ — Playing screen
═══════════════════════════════════ */
function renderQuizPlaying(){
  const el = document.getElementById('quiz-content');
  if(!el) return;
  const qs = _quiz.questions;
  const diffColor = QUIZ_DIFF_COLOR[_quiz.diff];

  el.innerHTML = `
  <div class="quiz-play-wrap">
    <!-- Header bar -->
    <div class="quiz-play-header">
      <div class="quiz-play-meta">
        <span class="quiz-badge" style="background:${diffColor}20;color:${diffColor}">
          ${QUIZ_DIFF_LABEL[_quiz.diff]}
        </span>
        <span class="quiz-badge" style="background:var(--bg3);color:var(--text2)">
          ${_quiz.count} câu
        </span>
      </div>
      <div class="quiz-timer" id="quiz-timer">
        <i class="ti ti-clock"></i> <span id="quiz-timer-text">${_fmtTime(_quiz.timeLeft)}</span>
      </div>
      <div class="quiz-progress-text" id="quiz-progress-text">
        0 / ${_quiz.count} câu đã chọn
      </div>
    </div>

    <!-- Progress bar -->
    <div class="quiz-progress-bar-wrap">
      <div class="quiz-progress-bar-fill" id="quiz-prog-bar" style="width:0%"></div>
    </div>

    <!-- Questions -->
    <div class="quiz-questions" id="quiz-questions-list">
      ${qs.map((q,i)=>_renderQuestion(q,i)).join('')}
    </div>

    <!-- Submit -->
    <div class="quiz-submit-area">
      <div class="quiz-submit-note" id="quiz-submit-note"></div>
      <button class="quiz-submit-btn" onclick="submitQuiz()">
        <i class="ti ti-send"></i> Nộp bài
      </button>
    </div>
  </div>`;

  // MathJax render
  mjRender(el);
}

function _renderQuestion(q, i){
  const opts = ['A','B','C','D'];
  return `
  <div class="quiz-q-card" id="qcard-${i}">
    <div class="quiz-q-num">Câu ${i+1} <span class="quiz-q-unanswered" id="qbullet-${i}">●</span></div>
    <div class="quiz-q-text">${q.q}</div>
    <div class="quiz-opts">
      ${q.opts.map((opt,j)=>`
        <button class="quiz-opt-btn" id="qopt-${i}-${j}"
          onclick="selectOpt(${i},${j})">
          <span class="quiz-opt-letter">${opts[j]}</span>
          <span class="quiz-opt-text">${opt}</span>
        </button>`).join('')}
    </div>
  </div>`;
}

function selectOpt(qIdx, optIdx){
  if(_quiz.phase !== 'playing') return;
  // Clear previous selection
  [0,1,2,3].forEach(j=>{
    document.getElementById(`qopt-${qIdx}-${j}`)?.classList.remove('selected');
  });
  document.getElementById(`qopt-${qIdx}-${optIdx}`)?.classList.add('selected');
  document.getElementById(`qbullet-${qIdx}`)?.classList.add('answered');
  _quiz.answers[qIdx] = optIdx;
  _updateProgress();
}

function _updateProgress(){
  const answered = Object.keys(_quiz.answers).length;
  const total = _quiz.count;
  document.getElementById('quiz-progress-text').textContent = `${answered} / ${total} câu đã chọn`;
  document.getElementById('quiz-prog-bar').style.width = `${(answered/total)*100}%`;
  const note = document.getElementById('quiz-submit-note');
  const unanswered = total - answered;
  if(note) note.textContent = unanswered > 0 ? `⚠ Còn ${unanswered} câu chưa trả lời` : '✓ Đã trả lời đủ tất cả câu';
}

/* ═══════════════════════════════════
   QUIZ — Timer
═══════════════════════════════════ */
function _startTimer(){
  _stopTimer();
  _quiz.timerRef = setInterval(()=>{
    _quiz.timeLeft--;
    const txt = document.getElementById('quiz-timer-text');
    const wrap = document.getElementById('quiz-timer');
    if(txt) txt.textContent = _fmtTime(_quiz.timeLeft);
    if(_quiz.timeLeft <= 60 && wrap) wrap.classList.add('danger');
    if(_quiz.timeLeft <= 0){
      _stopTimer();
      _quiz.phase = 'timeout';
      _showTimeoutModal();
    }
  }, 1000);
}

function _stopTimer(){
  if(_quiz.timerRef){ clearInterval(_quiz.timerRef); _quiz.timerRef=null; }
}

function _fmtTime(secs){
  const m = Math.floor(secs/60).toString().padStart(2,'0');
  const s = (secs%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

/* ═══════════════════════════════════
   QUIZ — Timeout modal
═══════════════════════════════════ */
function _showTimeoutModal(){
  // Remove existing modal
  document.getElementById('quiz-timeout-modal')?.remove();
  const m = document.createElement('div');
  m.id = 'quiz-timeout-modal';
  m.className = 'quiz-modal-overlay';
  m.innerHTML = `
  <div class="quiz-modal">
    <div class="quiz-modal-icon" style="color:var(--red)"><i class="ti ti-clock-x"></i></div>
    <h3 class="quiz-modal-title">Hết giờ!</h3>
    <p class="quiz-modal-sub">Bạn muốn nộp kết quả hiện tại hay làm lại từ đầu?</p>
    <div class="quiz-modal-btns">
      <button class="quiz-modal-btn secondary" onclick="restartQuiz()">
        <i class="ti ti-refresh"></i> Làm lại
      </button>
      <button class="quiz-modal-btn primary" onclick="submitQuiz(true)">
        <i class="ti ti-send"></i> Nộp bài
      </button>
    </div>
  </div>`;
  document.body.appendChild(m);
}

function restartQuiz(){
  document.getElementById('quiz-timeout-modal')?.remove();
  _stopTimer();
  _quiz.phase = 'setup';
  renderQuizSetup();
}

/* ═══════════════════════════════════
   QUIZ — Submit & Result
═══════════════════════════════════ */
function submitQuiz(fromTimeout=false){
  document.getElementById('quiz-timeout-modal')?.remove();
  _stopTimer();
  _quiz.phase = 'result';

  const qs = _quiz.questions;
  let correct = 0;
  qs.forEach((q,i)=>{
    if(_quiz.answers[i] === q.ans) correct++;
  });
  const total = _quiz.count;
  const pct = Math.round((correct/total)*100);

  const el = document.getElementById('quiz-content');
  const grade = pct>=80?'A':pct>=60?'B':pct>=40?'C':'D';
  const gradeColor = {A:'var(--teal)',B:'var(--primary)',C:'rgba(217,119,6,1)',D:'var(--red)'}[grade];
  const opts = ['A','B','C','D'];

  el.innerHTML = `
  <div class="quiz-result-wrap">
    <div class="quiz-result-summary">
      <div class="quiz-result-grade" style="color:${gradeColor}">${grade}</div>
      <div class="quiz-result-score">${correct} / ${total}</div>
      <div class="quiz-result-pct">${pct}% chính xác</div>
      <div class="quiz-result-chips">
        <span class="quiz-badge" style="background:${QUIZ_DIFF_COLOR[_quiz.diff]}20;color:${QUIZ_DIFF_COLOR[_quiz.diff]}">
          ${QUIZ_DIFF_LABEL[_quiz.diff]}
        </span>
        ${fromTimeout?`<span class="quiz-badge" style="background:rgba(185,28,28,.1);color:var(--red)">Hết giờ</span>`:''}
      </div>
      <div class="quiz-result-actions">
        <button class="quiz-modal-btn secondary" onclick="restartQuiz()">
          <i class="ti ti-refresh"></i> Làm lại
        </button>
        <button class="quiz-modal-btn primary" onclick="initQuizSection()">
          <i class="ti ti-home"></i> Về cài đặt
        </button>
      </div>
    </div>

    <div class="quiz-result-review">
      <div class="quiz-review-title">Chi tiết từng câu</div>
      ${qs.map((q,i)=>{
        const userAns = _quiz.answers[i];
        const isCorrect = userAns === q.ans;
        const skipped = userAns === undefined;
        return `
        <div class="quiz-review-card ${isCorrect?'correct':skipped?'skipped':'wrong'}">
          <div class="quiz-review-header">
            <span class="quiz-review-num">Câu ${i+1}</span>
            <span class="quiz-review-verdict">
              ${isCorrect?'✅ Đúng':skipped?'⬜ Bỏ qua':'❌ Sai'}
            </span>
          </div>
          <div class="quiz-review-q">${q.q}</div>
          <div class="quiz-review-opts">
            ${q.opts.map((opt,j)=>{
              let cls='quiz-review-opt';
              if(j===q.ans) cls+=' correct-opt';
              else if(j===userAns && !isCorrect) cls+=' wrong-opt';
              return `<div class="${cls}">
                <span class="quiz-opt-letter">${opts[j]}</span>
                <span>${opt}</span>
                ${j===q.ans?'<i class="ti ti-check" style="margin-left:auto;color:var(--teal)"></i>':''}
                ${j===userAns&&!isCorrect?'<i class="ti ti-x" style="margin-left:auto;color:var(--red)"></i>':''}
              </div>`;
            }).join('')}
          </div>
          ${q.sol?`<div class="quiz-review-sol"><strong>Giải thích:</strong> ${q.sol}</div>`:''}
        </div>`;
      }).join('')}
    </div>
  </div>`;

  mjRender(el);
  window.scrollTo({top:0,behavior:'smooth'});
}