/* ═══════════════════════════════════
   COMMENTS — Discussion panel dưới mỗi bài tập
   Collection Firestore: comments
═══════════════════════════════════ */

let _cmtUnsub = null;          // realtime listener cleanup
let _cmtCurrentEx = null;      // exerciseId hiện tại đang xem
let _cmtAllComments = [];      // cache snapshot mới nhất (để sort/expand không cần refetch)
let _cmtSort = 'new';          // 'new' | 'old' | 'top'
const _CMT_PAGE = 5;           // số bình luận hiện ban đầu
let _cmtVisible = _CMT_PAGE;   // số bình luận đang hiện

/* ═══════════════════════════════════
   Render panel — gọi từ openExercise()
═══════════════════════════════════ */
function renderCommentPanel(exercise){
  _cmtCurrentEx = exercise.id;
  _cmtSort = 'new';
  _cmtVisible = _CMT_PAGE;

  const user = window.Clerk?.user;
  const signedIn = !!user;

  const name = signedIn
    ? (user.username || user.firstName || (user.emailAddresses?.[0]?.emailAddress?.split('@')[0]) || 'User')
    : '';

  return `
  <div class="cmt-panel" id="cmt-panel">
    <div class="cmt-panel-head">
      <div class="cmt-panel-title"><i class="ti ti-message-circle-2"></i> Thảo luận <span id="cmt-count"></span></div>
      <select class="cmt-sort-select" id="cmt-sort-select" onchange="setCommentSort(this.value)">
        <option value="new">Mới nhất</option>
        <option value="old">Cũ nhất</option>
        <option value="top">Điểm cao nhất</option>
      </select>
    </div>

    ${signedIn ? `
      <div class="cmt-compose">
        <div class="cmt-avatar">${name[0]?.toUpperCase()||'U'}</div>
        <div class="cmt-compose-body">
          <textarea id="cmt-input" placeholder="Đặt câu hỏi hoặc chia sẻ cách giải... (hỗ trợ LaTeX: \\(x^2\\))" rows="2"></textarea>
          <button class="cmt-submit-btn" onclick="postComment()"><i class="ti ti-send"></i> Đăng bình luận</button>
        </div>
      </div>
    ` : `
      <div class="cmt-locked">
        <i class="ti ti-lock"></i>
        <span>Đăng nhập để tham gia thảo luận</span>
        <button class="cmt-signin-btn" onclick="window.Clerk.openSignIn({})">Đăng nhập</button>
      </div>
    `}

    <div class="cmt-list" id="cmt-list">
      <div class="cmt-loading"><i class="ti ti-loader-2 spin"></i> Đang tải bình luận...</div>
    </div>
    <div id="cmt-loadmore-wrap"></div>
  </div>`;
}

/* ═══════════════════════════════════
   Realtime subscribe — gọi sau khi panel đã render trong DOM
═══════════════════════════════════ */
function initCommentListener(exerciseId){
  cleanupCommentListener();
  if(typeof window.fbListenComments !== 'function') return;
  _cmtUnsub = window.fbListenComments(exerciseId, comments=>{
    _cmtAllComments = comments;
    renderCommentList();
  });
}

function cleanupCommentListener(){
  if(_cmtUnsub){ _cmtUnsub(); _cmtUnsub=null; }
}

/* ═══════════════════════════════════
   Sort + collapse controls
═══════════════════════════════════ */
function setCommentSort(mode){
  _cmtSort = mode;
  _cmtVisible = _CMT_PAGE; // reset trang khi đổi cách sắp xếp
  renderCommentList();
}

function _cmtScore(c){
  return Object.values(c.votes||{}).reduce((a,b)=>a+b,0);
}

function _cmtSortComments(comments){
  const arr = [...comments];
  if(_cmtSort==='old')      arr.sort((a,b)=>a.createdAt-b.createdAt);
  else if(_cmtSort==='top') arr.sort((a,b)=>_cmtScore(b)-_cmtScore(a) || b.createdAt-a.createdAt);
  else                      arr.sort((a,b)=>b.createdAt-a.createdAt); // 'new'
  return arr;
}

function showMoreComments(){
  _cmtVisible += _CMT_PAGE;
  renderCommentList();
}

/* ═══════════════════════════════════
   Render list
═══════════════════════════════════ */
function renderCommentList(){
  const list = document.getElementById('cmt-list');
  const countEl = document.getElementById('cmt-count');
  const moreWrap = document.getElementById('cmt-loadmore-wrap');
  if(!list) return; // user đã rời trang bài tập

  const comments = _cmtAllComments;
  if(countEl) countEl.textContent = comments.length ? `(${comments.length})` : '';

  if(!comments.length){
    list.innerHTML = `<div class="cmt-empty"><i class="ti ti-message-off"></i> Chưa có bình luận nào. Hãy là người đầu tiên!</div>`;
    if(moreWrap) moreWrap.innerHTML = '';
    return;
  }

  const sorted = _cmtSortComments(comments);
  const visible = sorted.slice(0, _cmtVisible);
  const myId = window.Clerk?.user?.id;

  list.innerHTML = visible.map(c=>{
    const canDelete = isAdmin || c.userId===myId;
    const votes = c.votes||{};
    const score = Object.values(votes).reduce((a,b)=>a+b,0);
    const myVote = myId ? (votes[myId]||0) : 0;
    return `
    <div class="cmt-item" id="cmt-${c.id}">
      <div class="cmt-avatar">${(c.userName||'U')[0].toUpperCase()}</div>
      <div class="cmt-body">
        <div class="cmt-head">
          <span class="cmt-name">${c.userName}</span>
          <span class="cmt-time">${_cmtRelTime(c.createdAt)}</span>
        </div>
        <div class="cmt-text">${_cmtEscape(c.text)}</div>
        <div class="cmt-vote-pill">
          <button class="cmt-vote-btn up ${myVote===1?'active':''}" onclick="voteComment('${c.id}',1)"><i class="ti ti-arrow-big-up-filled"></i></button>
          <span class="cmt-vote-score">${score}</span>
          <button class="cmt-vote-btn down ${myVote===-1?'active':''}" onclick="voteComment('${c.id}',-1)"><i class="ti ti-arrow-big-down-filled"></i></button>
        </div>
      </div>
      ${canDelete?`<button class="cmt-del-btn" onclick="deleteComment('${c.id}')"><i class="ti ti-trash" style="font-size:13px"></i></button>`:''}
    </div>`;
  }).join('');

  if(moreWrap){
    const remaining = sorted.length - visible.length;
    moreWrap.innerHTML = remaining > 0
      ? `<button class="cmt-loadmore-btn" onclick="showMoreComments()"><i class="ti ti-chevron-down"></i> Xem thêm (${remaining})</button>`
      : '';
  }

  _cmtTypeset();
}

/* Re-run MathJax over comment list — debounced so rapid realtime updates don't queue duplicate typesets */
let _cmtTypesetPending = false;
function _cmtTypeset(){
  if(typeof window.MathJax?.typesetPromise !== 'function') return;
  if(_cmtTypesetPending) return;
  _cmtTypesetPending = true;
  requestAnimationFrame(()=>{
    const list = document.getElementById('cmt-list');
    _cmtTypesetPending = false;
    if(!list) return;
    window.MathJax.typesetPromise([list]).catch(err=>console.error('MathJax cmt typeset error:', err));
  });
}

function _cmtEscape(s){
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML.replace(/\n/g,'<br>');
}

function _cmtRelTime(ts){
  const diff = Math.floor((Date.now()-ts)/1000);
  if(diff<60) return 'vừa xong';
  if(diff<3600) return `${Math.floor(diff/60)} phút trước`;
  if(diff<86400) return `${Math.floor(diff/3600)} giờ trước`;
  if(diff<604800) return `${Math.floor(diff/86400)} ngày trước`;
  return new Date(ts).toLocaleDateString('vi-VN');
}

/* ═══════════════════════════════════
   Post / delete / vote
═══════════════════════════════════ */
async function postComment(){
  const user = window.Clerk?.user;
  if(!user){ showToast('Bạn cần đăng nhập!', false); return; }

  const input = document.getElementById('cmt-input');
  const text = input.value.trim();
  if(!text){ showToast('Nhập nội dung bình luận!', false); return; }
  if(text.length>1000){ showToast('Bình luận quá dài (tối đa 1000 ký tự)!', false); return; }

  const name = user.username || user.firstName || (user.emailAddresses?.[0]?.emailAddress?.split('@')[0]) || 'User';

  const comment = {
    id: uid(),
    exerciseId: _cmtCurrentEx,
    userId: user.id,
    userName: name,
    text,
    createdAt: Date.now()
  };

  const btn = document.querySelector('.cmt-submit-btn');
  if(btn){ btn.disabled=true; btn.innerHTML='<i class="ti ti-loader-2 spin"></i> Đang đăng...'; }

  try{
    await window.fbPostComment(comment);
    input.value='';
    _cmtSort = 'new';
    _cmtVisible = _CMT_PAGE; // bình luận mới luôn nằm trong trang đầu
    const sel = document.getElementById('cmt-sort-select');
    if(sel) sel.value = 'new';
  }catch(e){
    showToast('Lỗi đăng bình luận: '+e.message, false);
  }finally{
    if(btn){ btn.disabled=false; btn.innerHTML='<i class="ti ti-send"></i> Đăng bình luận'; }
  }
}

async function deleteComment(id){
  if(!confirm('Xóa bình luận này?')) return;
  try{
    await window.fbDeleteComment(id);
    showToast('Đã xóa bình luận!');
  }catch(e){
    showToast('Lỗi xóa: '+e.message, false);
  }
}

async function voteComment(id, value){
  const user = window.Clerk?.user;
  if(!user){ showToast('Bạn cần đăng nhập!', false); return; }
  try{
    await window.fbVoteComment(id, user.id, value);
  }catch(e){
    showToast('Lỗi vote: '+e.message, false);
  }
}