/* ═══════════════════════════════════
   PARTICLES
═══════════════════════════════════ */
(function(){
  const canvas=document.getElementById('canvas-bg');
  const ctx=canvas.getContext('2d');
  const syms=['∑','∫','π','√','∞','θ','Δ','α','β','∂','∇','±','≤','≥','λ','φ','ω','∀','∃','≠'];
  const cols=['rgba(55,48,163,','rgba(109,40,217,','rgba(14,116,144,','rgba(49,46,129,'];
  let W,H,pts=[];
  function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
  resize();addEventListener('resize',resize);
  function P(){
    this.r=function(){this.x=Math.random()*W;this.y=H+50;this.s=syms[~~(Math.random()*syms.length)];this.sz=28+Math.random()*28;this.sp=.3+Math.random()*.5;this.o=.16+Math.random()*.16;this.d=(Math.random()-.5)*.45;this.c=cols[~~(Math.random()*cols.length)]};
    this.r();this.y=Math.random()*H;
  }
  for(let i=0;i<55;i++){const p=new P();pts.push(p);}
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{ctx.globalAlpha=p.o;ctx.fillStyle=p.c+'1)';ctx.font=`700 ${p.sz}px 'JetBrains Mono',monospace`;ctx.fillText(p.s,p.x,p.y);p.y-=p.sp;p.x+=p.d;if(p.y<-50)p.r();if(p.x<-30)p.x=W+30;if(p.x>W+30)p.x=-30;});
    ctx.globalAlpha=1;requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════
   HELPERS
═══════════════════════════════════ */
function mjRender(el){if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([el]);}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function showToast(msg,ok=true){
  const t=document.getElementById('toast');
  t.textContent=(ok?'✅ ':'❌ ')+msg;
  t.style.background=ok?'var(--primary)':'var(--red)';
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}

/* ═══════════════════════════════════
   AUTH STATE
═══════════════════════════════════ */
let isAdmin=false;
let currentUser=null;

function isAdminUser(user){
  if(!user)return false;
  return user.publicMetadata?.role==='admin';
}

function updateNavForUser(user){
  currentUser=user;
  isAdmin=isAdminUser(user);
  if(isAdmin)document.body.classList.add('admin-mode');
  else document.body.classList.remove('admin-mode');
  renderNavBtn(user);
  if(document.getElementById('section-account').classList.contains('active')) renderAccountPage();
  if(document.getElementById('section-admin').classList.contains('active')) renderAdminContent();
}

function renderProfileMenuItems(user){
  if(!user){
    return `<button class="profile-menu-item" onclick="clerkSignIn();closeProfileMenus()"><i class="ti ti-login"></i> Đăng nhập</button>`;
  }
  return `
    <button class="profile-menu-item" onclick="showSection('account');closeProfileMenus()"><i class="ti ti-user-circle"></i> Tài khoản</button>
    <button class="profile-menu-item" onclick="openPlayground();closeProfileMenus()"><i class="ti ti-vector-triangle"></i> Sân chơi hình học</button>
    ${isAdmin?`<button class="profile-menu-item" onclick="showSection('admin');closeProfileMenus()"><i class="ti ti-shield-check"></i> Quản trị</button>`:''}
    <button class="profile-menu-item danger" onclick="doSignOut();closeProfileMenus()"><i class="ti ti-logout"></i> Đăng xuất</button>`;
}

function renderNavBtn(user){
  const area=document.getElementById('nav-right-area');
  const mobileMenu=document.getElementById('mobile-profile-dropdown');
  if(!user){
    area.innerHTML=`<button class="clerk-nav-btn" onclick="clerkSignIn()">
      <i class="ti ti-login" style="font-size:15px"></i> Đăng nhập
    </button>`;
  }else{
    const name=user.firstName||(user.emailAddresses?.[0]?.emailAddress?.split('@')[0])||'User';
    const avatar=user.imageUrl;
    area.innerHTML=`<div class="profile-menu" id="desktop-profile-menu">
      <button class="profile-trigger" type="button" aria-haspopup="true" aria-expanded="false">
        ${avatar?`<img src="${avatar}" class="user-avatar-sm" alt="avatar">`:`<i class="ti ti-user-circle" style="font-size:18px"></i>`}
        <span>${name}${isAdmin?' Admin':''}</span>
        <i class="ti ti-chevron-down"></i>
      </button>
      <div class="profile-dropdown">${renderProfileMenuItems(user)}</div>
    </div>`;
  }
  if(mobileMenu)mobileMenu.innerHTML=renderProfileMenuItems(user);
}

function toggleMobileProfileMenu(ev){
  ev?.stopPropagation();
  const wrap=document.getElementById('mobile-profile-wrap');
  if(wrap)wrap.classList.toggle('open');
}
function closeProfileMenus(){
  document.getElementById('mobile-profile-wrap')?.classList.remove('open');
}
document.addEventListener('click',e=>{
  const wrap=document.getElementById('mobile-profile-wrap');
  if(wrap && !wrap.contains(e.target))wrap.classList.remove('open');
});

async function clerkSignIn(){
  await window.Clerk.openSignIn({});
}

/* ═══════════════════════════════════
   CLERK INIT
═══════════════════════════════════ */
window.addEventListener('load',async()=>{
  await window.Clerk.load();
  updateNavForUser(window.Clerk.user||null);
  window.Clerk.addListener(({user})=>{
    updateNavForUser(user||null);
    if(!isAdminUser(user) && document.getElementById('section-admin').classList.contains('active')){
      showSection('home');
    }
  });
});

/* ═══════════════════════════════════
   ACCOUNT PAGE
═══════════════════════════════════ */
const UN_COOLDOWN_MS=5*24*60*60*1000;
function getUnCooldown(){
  try{return JSON.parse(localStorage.getItem('mm_un_cd')||'{}');}catch{return{};}
}
function setUnCooldown(uid){
  const d=getUnCooldown();d[uid]=Date.now();
  localStorage.setItem('mm_un_cd',JSON.stringify(d));
}
function canChangeUsername(uid){
  if(isAdmin)return{ok:true,msg:''};
  const d=getUnCooldown();
  if(!d[uid])return{ok:true,msg:''};
  const diff=Date.now()-d[uid];
  if(diff>=UN_COOLDOWN_MS)return{ok:true,msg:''};
  const rem=UN_COOLDOWN_MS-diff;
  const days=Math.floor(rem/86400000);
  const hrs=Math.floor((rem%86400000)/3600000);
  const mins=Math.floor((rem%3600000)/60000);
  let msg=`Còn ${days>0?days+'n ':''} ${hrs>0?hrs+'g ':''} ${mins}p nữa`;
  return{ok:false,msg:msg.trim()};
}

function renderAccountPage(){
  const el=document.getElementById('account-content');
  const user=window.Clerk?.user;
  if(!user){
    el.innerHTML=`
      <div class="account-card">
        <div class="account-signed-out">
          <i class="ti ti-user-off"></i>
          <h3>Bạn chưa đăng nhập</h3>
          <p>Đăng nhập để lưu tiến trình và truy cập đầy đủ tính năng của Mathemagic.</p>
          <button class="btn-primary" onclick="clerkSignIn()">
            <i class="ti ti-login" style="font-size:15px;margin-right:6px"></i>Đăng nhập ngay
          </button>
        </div>
      </div>`;
    return;
  }
  const uid=user.id;
  const firstName=user.firstName||'';
  const lastName=user.lastName||'';
  const fullName=(firstName+' '+lastName).trim()||'—';
  const username=user.username||'—';
  const email=user.emailAddresses?.[0]?.emailAddress||'—';
  const avatar=user.imageUrl;
  const joined=user.createdAt?new Date(user.createdAt).toLocaleDateString('vi-VN'):'—';
  const role=isAdmin?'admin':'user';
  const {ok:canUN,msg:unMsg}=canChangeUsername(uid);

  el.innerHTML=`
    <div class="account-card">
      <div class="account-hero">
        ${avatar
          ?`<img src="${avatar}" class="account-avatar" alt="avatar">`
          :`<div class="account-avatar-fallback">${(firstName||email||'U')[0].toUpperCase()}</div>`
        }
        <div class="account-info">
          <div class="account-name">${fullName}</div>
          <div class="account-email">${email}</div>
          <span class="role-badge ${role}">
            ${role==='admin'
              ?'<i class="ti ti-shield-check" style="font-size:13px"></i> Quản trị viên'
              :'<i class="ti ti-user" style="font-size:13px"></i> Học sinh'
            }
          </span>
        </div>
      </div>
      <div class="account-field" style="flex-direction:column;align-items:flex-start;gap:.6rem;padding:1rem 0">
        <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
          <span class="account-field-label">Họ và tên</span>
          <button onclick="toggleRealNameEdit()" id="realname-edit-btn"
            style="padding:4px 12px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg);color:var(--primary);font-family:'Nunito',sans-serif;font-size:.78rem;font-weight:700;cursor:pointer">
            <i class="ti ti-pencil" style="font-size:12px"></i> Sửa
          </button>
        </div>
        <div id="realname-display" style="font-weight:600;color:var(--text);font-size:.9rem">${fullName}</div>
        <div id="realname-edit" style="display:none;width:100%;gap:.5rem;flex-direction:column">
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            <input id="inp-firstname" type="text" value="${firstName}" placeholder="Họ & tên đệm"
              style="flex:1;min-width:120px;padding:9px 12px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:.88rem;font-family:'Nunito',sans-serif;font-weight:600;background:var(--bg);color:var(--text);outline:none">
            <input id="inp-lastname" type="text" value="${lastName}" placeholder="Tên"
              style="flex:1;min-width:100px;padding:9px 12px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:.88rem;font-family:'Nunito',sans-serif;font-weight:600;background:var(--bg);color:var(--text);outline:none">
          </div>
          <div style="display:flex;gap:.5rem">
            <button onclick="saveRealName()"
              style="padding:8px 18px;background:linear-gradient(135deg,var(--primary),var(--violet));color:#fff;border:none;border-radius:var(--radius-sm);font-family:'Nunito',sans-serif;font-size:.84rem;font-weight:700;cursor:pointer">
              Lưu
            </button>
            <button onclick="toggleRealNameEdit()"
              style="padding:8px 16px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:var(--bg);font-family:'Nunito',sans-serif;font-size:.84rem;font-weight:700;cursor:pointer;color:var(--text2)">
              Hủy
            </button>
          </div>
          <div id="realname-err" style="font-size:.78rem;color:var(--red);font-weight:700;display:none"></div>
        </div>
      </div>
      <div class="account-field" style="flex-direction:column;align-items:flex-start;gap:.6rem;padding:1rem 0">
        <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
          <span class="account-field-label">Tên hiển thị</span>
          ${canUN
            ?`<button onclick="toggleUsernameEdit()" id="username-edit-btn"
                style="padding:4px 12px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg);color:var(--primary);font-family:'Nunito',sans-serif;font-size:.78rem;font-weight:700;cursor:pointer">
                <i class="ti ti-pencil" style="font-size:12px"></i> Sửa
              </button>`
            :`<span style="font-size:.72rem;color:var(--text3);font-weight:700;background:var(--bg3);padding:4px 10px;border-radius:8px">
                🕐 ${unMsg}
              </span>`
          }
        </div>
        <div id="username-display" style="font-weight:600;color:var(--text);font-size:.9rem;font-family:'JetBrains Mono',monospace">@${username}</div>
        <div id="username-edit" style="display:none;width:100%;gap:.5rem;flex-direction:column">
          <div style="display:flex;gap:.5rem;align-items:center">
            <span style="color:var(--text3);font-weight:700;font-size:.9rem">@</span>
            <input id="inp-username" type="text" value="${username==='—'?'':username}" placeholder="tên_hiển_thị"
              style="flex:1;padding:9px 12px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:.88rem;font-family:'JetBrains Mono',monospace;font-weight:600;background:var(--bg);color:var(--text);outline:none">
          </div>
          <div style="font-size:.74rem;color:var(--text3);font-weight:600">
            Chỉ dùng chữ cái, số, dấu gạch dưới (_).
            ${isAdmin?'Admin không giới hạn thay đổi.':'Có thể thay đổi mỗi <strong>5 ngày</strong> một lần.'}
          </div>
          <div style="display:flex;gap:.5rem">
            <button onclick="saveUsername()"
              style="padding:8px 18px;background:linear-gradient(135deg,var(--primary),var(--violet));color:#fff;border:none;border-radius:var(--radius-sm);font-family:'Nunito',sans-serif;font-size:.84rem;font-weight:700;cursor:pointer">
              Lưu
            </button>
            <button onclick="toggleUsernameEdit()"
              style="padding:8px 16px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:var(--bg);font-family:'Nunito',sans-serif;font-size:.84rem;font-weight:700;cursor:pointer;color:var(--text2)">
              Hủy
            </button>
          </div>
          <div id="username-err" style="font-size:.78rem;color:var(--red);font-weight:700;display:none"></div>
        </div>
      </div>
      <div class="account-field">
        <span class="account-field-label">Email</span>
        <span class="account-field-val">${email}</span>
      </div>
      <div class="account-field">
        <span class="account-field-label">Ngày tham gia</span>
        <span class="account-field-val">${joined}</span>
      </div>
      <div class="account-field">
        <span class="account-field-label">Quyền truy cập</span>
        <span class="account-field-val">${role==='admin'?'👑 Admin — Toàn quyền':'📖 Học sinh — Xem nội dung'}</span>
      </div>
    </div>
    <div class="account-card">
      <div class="account-actions">
        ${isAdmin?`<button class="account-action-btn admin-go" onclick="showSection('admin')">
          <i class="ti ti-shield-check"></i> Vào trang Quản trị
        </button>`:''}
        <button class="account-action-btn signout" onclick="doSignOut()">
          <i class="ti ti-logout"></i> Đăng xuất
        </button>
      </div>
    </div>`;
}

function toggleRealNameEdit(){
  const ed=document.getElementById('realname-edit');
  const ds=document.getElementById('realname-display');
  const btn=document.getElementById('realname-edit-btn');
  const showing=ed.style.display==='flex';
  ed.style.display=showing?'none':'flex';
  ds.style.display=showing?'block':'none';
  btn.style.display=showing?'inline-flex':'none';
}
async function saveRealName(){
  const fn=document.getElementById('inp-firstname').value.trim();
  const ln=document.getElementById('inp-lastname').value.trim();
  const errEl=document.getElementById('realname-err');
  if(!fn&&!ln){errEl.textContent='Vui lòng nhập ít nhất họ hoặc tên.';errEl.style.display='block';return;}
  errEl.style.display='none';
  try{
    await window.Clerk.user.update({firstName:fn,lastName:ln});
    showToast('Đã cập nhật họ và tên!');
    renderAccountPage();
  }catch(e){
    errEl.textContent='Lỗi: '+(e.message||'Không thể lưu.');errEl.style.display='block';
  }
}

function toggleUsernameEdit(){
  const ed=document.getElementById('username-edit');
  const ds=document.getElementById('username-display');
  const btn=document.getElementById('username-edit-btn');
  if(!btn)return;
  const showing=ed.style.display==='flex';
  ed.style.display=showing?'none':'flex';
  ds.style.display=showing?'block':'none';
  btn.style.display=showing?'inline-flex':'none';
}
async function saveUsername(){
  const val=document.getElementById('inp-username').value.trim();
  const errEl=document.getElementById('username-err');
  if(!val){errEl.textContent='Tên hiển thị không được để trống.';errEl.style.display='block';return;}
  if(!/^[a-zA-Z0-9_]{3,30}$/.test(val)){
    errEl.textContent='Chỉ dùng chữ cái, số, dấu _ (3–30 ký tự).';errEl.style.display='block';return;
  }
  errEl.style.display='none';
  const uid=window.Clerk.user.id;
  const {ok,msg}=canChangeUsername(uid);
  if(!ok){errEl.textContent='Chưa đến hạn đổi tên: '+msg;errEl.style.display='block';return;}
  try{
    await window.Clerk.user.update({username:val});
    if(!isAdmin)setUnCooldown(uid);
    showToast('Đã cập nhật tên hiển thị!');
    renderAccountPage();
  }catch(e){
    const msg2=e.errors?.[0]?.longMessage||e.message||'Không thể lưu.';
    errEl.textContent='Lỗi: '+msg2;errEl.style.display='block';
  }
}

async function doSignOut(){
  await window.Clerk.signOut();
  showSection('home');
  showToast('Đã đăng xuất thành công!');
}

/* ═══════════════════════════════════
   FIREBASE CACHE & WRAPPERS
═══════════════════════════════════ */
let _exCache = null;
let _thCache  = null;
let _fbReady  = false;

window.addEventListener('firebase-ready', ()=>{
  _fbReady = true;
  loadAllData().then(()=>{
    renderExercises();
    renderTopics();
    window._setupRealtimeListeners();
    restoreFromHash();
  });
});

async function loadAllData(){
  try{
    [_exCache, _thCache] = await Promise.all([
      window.fbGetExercises(),
      window.fbGetTheories()
    ]);
  }catch(e){
    console.error('Firebase load error:',e);
    showToast('Lỗi kết nối Firebase. Kiểm tra cấu hình!', false);
    _exCache = {easy:[],med:[],hard:[],pro:[]};
    _thCache = [];
  }
}

function getExCache(){ return _exCache || {easy:[],med:[],hard:[],pro:[]}; }
function getThCache(){ return _thCache || []; }

async function saveExercises_fb(exercise){
  try{
    await window.fbSaveExercise(exercise);
  }catch(e){ showToast('Lỗi lưu Firebase: '+e.message, false); throw e; }
}

async function deleteExercise_fb(id){
  try{
    await window.fbDeleteExercise(id);
    if(_exCache){ for(const d of Object.keys(_exCache)) _exCache[d]=_exCache[d].filter(e=>e.id!==id); }
  }catch(e){ showToast('Lỗi xóa Firebase: '+e.message, false); throw e; }
}

async function saveTheory_fb(theory){
  try{
    await window.fbSaveTheory(theory);
  }catch(e){ showToast('Lỗi lưu Firebase: '+e.message, false); throw e; }
}

async function deleteTheory_fb(id){
  try{
    await window.fbDeleteTheory(id);
    if(_thCache) _thCache=_thCache.filter(t=>t.id!==id);
  }catch(e){ showToast('Lỗi xóa Firebase: '+e.message, false); throw e; }
}

function getAllTopics(){
  const th=getThCache();
  const extra=th.map(t=>({
    id:'th-'+t.id,grade:parseInt(t.grade),title:t.title,
    icon:'ti-file-text',color:'rgba(55,48,163,.1)',iconColor:'var(--primary)',
    desc:t.desc,badge:t.badge,bc:'rgba(55,48,163,.09)',bt:'var(--primary)',
    _custom:true,_content:t.content
  }));
  return [...TOPICS,...extra];
}

/* ═══════════════════════════════════
   NAVIGATION
═══════════════════════════════════ */
let currentGrade=6;

function showSection(n){
  window.location.hash = n;
  closeProfileMenus();
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.bnav-tab').forEach(t=>t.classList.remove('active'));
  const dt=document.getElementById('tab-'+n);if(dt)dt.classList.add('active');
  const bt=document.getElementById('btab-'+n);if(bt)bt.classList.add('active');
  document.getElementById('section-'+n).classList.add('active');
  if(n==='knowledge'){renderTopics();showKnowledgeList();}
  if(n==='exercises'){showExerciseList();renderExercises();}
  if(n==='admin')renderAdminContent();
  if(n==='account')renderAccountPage();
  if(n==='playground'){setTimeout(()=>pgInit(),80);}
  window.scrollTo({top:0,behavior:'smooth'});
}

function openPlayground(){showSection('playground');}

/* ═══════════════════════════════════
   HASH ROUTING
═══════════════════════════════════ */
function restoreFromHash(){
  const hash=window.location.hash.slice(1);
  if(!hash)return;
  const [part1,part2]=hash.split('/');
  if(part1==='exercise'&&part2){
    showSection('exercises');
    const all=getAllExercisesFlat();
    const ex=all.find(e=>e.id===part2);
    if(ex)openExercise(ex.id,ex.diff);
  }else if(part1==='knowledge'&&part2){
    showSection('knowledge');
    openLesson(part2);
  }else{
    showSection(part1);
  }
}

/* ═══════════════════════════════════
   KNOWLEDGE
═══════════════════════════════════ */
function setGrade(g,el){currentGrade=g;document.querySelectorAll('.grade-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');renderTopics();}

function renderTopics(f=''){
  const grid=document.getElementById('topics-grid');
  if(!grid)return;
  const all=getAllTopics();
  let list=all.filter(t=>(currentGrade===0||t.grade===currentGrade)&&(!f||(t.title+t.desc).toLowerCase().includes(f.toLowerCase())));
  grid.innerHTML=list.length?list.map(t=>`<div class="topic-card" onclick="openLesson('${t.id}')"><div class="tc-icon" style="background:${t.color};color:${t.iconColor}"><i class="ti ${t.icon}"></i></div><h3>${t.title}</h3><p>${t.desc}</p><span class="tc-badge" style="background:${t.bc};color:${t.bt}">Lớp ${t.grade} · ${t.badge}</span></div>`).join(''):'<div class="empty-state"><i class="ti ti-search-off"></i><p>Không tìm thấy kết quả</p></div>';
}

function filterTopics(v){renderTopics(v);}

function openLesson(id){
  window.location.hash=`knowledge/${id}`;
  const all=getAllTopics();
  const t=all.find(x=>x.id===id);if(!t)return;
  let content='';
  if(t._custom){
    content=`<div class="cb"><div class="cb-heading">${t.title}</div><div class="fbox" style="white-space:pre-wrap;line-height:1.85;font-size:.9rem;font-weight:500;color:var(--text)">${t._content}</div></div>`;
  }else{
    content=LESSONS[id]||'<p style="color:var(--text3);font-weight:600;padding:1rem">Nội dung đang được cập nhật...</p>';
  }
  document.getElementById('knowledge-list').style.display='none';
  const lv=document.getElementById('knowledge-lesson');lv.style.display='block';
  lv.innerHTML=`<div class="lesson-view"><div class="lesson-header"><button class="back-btn" onclick="showKnowledgeList()"><i class="ti ti-arrow-left"></i> Quay lại</button><div><div class="lesson-title">${t.title}</div><div class="lesson-subtitle">Lớp ${t.grade} · ${t.badge}</div></div></div>${content}</div>`;
  document.getElementById('section-knowledge').classList.add('active');
  document.getElementById('section-home').classList.remove('active');
  mjRender(lv);window.scrollTo({top:0,behavior:'smooth'});
}

function showKnowledgeList(){
  document.getElementById('knowledge-list').style.display='block';
  document.getElementById('knowledge-lesson').style.display='none';
  renderTopics();
}

let currentBookTab='theory';

function setBookTab(tab,el){
  currentBookTab=tab;
  document.querySelectorAll('#book-tabs .grade-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const pdfViewer=document.getElementById('book-pdf-viewer');
  const searchBar=document.querySelector('#knowledge-list .search-bar');
  const gradeTabs=document.querySelector('#knowledge-list .grade-tabs');
  if(tab==='theory'){
    pdfViewer.style.display='none';
    searchBar.style.display='';
    gradeTabs.style.display='';
    document.getElementById('topics-grid').style.display='';
    renderTopics();
  }else{
    searchBar.style.display='none';
    gradeTabs.style.display='none';
    document.getElementById('topics-grid').style.display='none';
    pdfViewer.style.display='block';
    renderBookPanel(tab);
  }
}

function renderBookPanel(tab){
  const data=BOOK_DATA[tab];
  if(!data)return;
  const header=document.getElementById('pdf-header');
  const list=document.getElementById('pdf-list');
  header.innerHTML=`<div style="font-size:1rem;font-weight:800;color:var(--text);margin-bottom:.25rem">${data.label}</div>
    <div style="font-size:.82rem;color:var(--text3);font-weight:600">Nhấn vào sách để đọc ngay trong trang.</div>`;
  list.innerHTML=[6,7,8,9].map(g=>{
    const gradeBooks=data.books.filter(b=>b.grade===g);
    return `<div style="background:var(--bg);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:1rem;box-shadow:var(--shadow)">
      <div style="font-size:.7rem;font-weight:800;color:var(--primary);letter-spacing:.5px;text-transform:uppercase;margin-bottom:.6rem">LỚP ${g}</div>
      ${gradeBooks.map(b=>`
        <div onclick="${b.url?`openPdfEmbed('${b.url}','${b.title.replace(/'/g,"\\'")}')`:``}"
          style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background .18s;margin-bottom:4px;background:var(--bg2);border:1px solid var(--border)"
          onmouseover="this.style.background='rgba(55,48,163,.08)'" onmouseout="this.style.background='var(--bg2)'">
          <i class="ti ti-file-type-pdf" style="font-size:20px;color:#dc2626;flex-shrink:0"></i>
          <span style="font-size:.84rem;font-weight:700;color:var(--text)">${b.title}</span>
          ${b.url?'<i class="ti ti-book-open" style="font-size:13px;color:var(--text3);margin-left:auto"></i>':'<span style="font-size:.68rem;color:var(--text3);margin-left:auto;font-weight:600">Sắp có</span>'}
        </div>`).join('')}
    </div>`;
  }).join('');
}

function openPdfEmbed(url,title){
  document.getElementById('pdf-panel').style.display='none';
  const embedPanel=document.getElementById('pdf-embed-panel');
  document.getElementById('pdf-embed-title').textContent=title;
  document.getElementById('pdf-embed-open').href=url;
  const embedUrl=url.replace(/\/file\/d\/([^/]+)\/view[^"]*/, '/file/d/$1/preview');
  document.getElementById('pdf-embed-frame').src=embedUrl;
  embedPanel.style.display='block';
  embedPanel.scrollIntoView({behavior:'smooth',block:'start'});
}

function closePdfEmbed(){
  document.getElementById('pdf-embed-panel').style.display='none';
  document.getElementById('pdf-embed-frame').src='';
  document.getElementById('pdf-panel').style.display='block';
}

/* ═══════════════════════════════════
   EXERCISES
═══════════════════════════════════ */
let exFilterDiff=new Set(['easy','med','hard','pro']);

function toggleDiffFilter(d,el){
  if(exFilterDiff.has(d)){
    if(exFilterDiff.size===1){showToast('Phải chọn ít nhất một cấp độ!',false);return;}
    exFilterDiff.delete(d);el.classList.remove('active');
  }else{
    exFilterDiff.add(d);el.classList.add('active');
  }
  renderExercises();
}

function clearFilters(){
  exFilterDiff=new Set(['easy','med','hard','pro']);
  document.querySelectorAll('.fchip').forEach(c=>c.classList.add('active'));
  document.getElementById('filter-city').value='';
  document.getElementById('filter-year').value='';
  document.getElementById('filter-school').value='';
  document.getElementById('ex-sort').value='default';
  document.getElementById('ex-search-input').value='';
  renderExercises();
}

function getAllExercisesFlat(){
  const ex=getExCache();
  const diffs=['easy','med','hard','pro'];
  let all=[];
  diffs.forEach(d=>{
    (BASE_EXERCISES[d]||[]).forEach(e=>all.push({...e,diff:d,_custom:false}));
    (ex[d]||[]).forEach(e=>all.push({...e,diff:d,_custom:true}));
  });
  return all;
}

function rebuildTagDropdowns(allExercises){
  const cities=[...new Set(allExercises.map(e=>e.city).filter(Boolean))].sort();
  const years=[...new Set(allExercises.map(e=>e.year).filter(Boolean))].sort((a,b)=>b-a);
  const schools=[...new Set(allExercises.map(e=>e.school).filter(Boolean))].sort();
  const cityEl=document.getElementById('filter-city');
  const yearEl=document.getElementById('filter-year');
  const schoolEl=document.getElementById('filter-school');
  if(!cityEl)return;
  const cv=cityEl.value,yv=yearEl.value,sv=schoolEl.value;
  cityEl.innerHTML=`<option value="">🏙 Tất cả tỉnh/thành</option>`+cities.map(c=>`<option value="${c}">${c}</option>`).join('');
  yearEl.innerHTML=`<option value="">📅 Tất cả năm</option>`+years.map(y=>`<option value="${y}">${y}</option>`).join('');
  schoolEl.innerHTML=`<option value="">🏫 Tất cả trường</option>`+schools.map(s=>`<option value="${s}">${s}</option>`).join('');
  cityEl.value=cv;yearEl.value=yv;schoolEl.value=sv;
}

const DIFF_ORDER={easy:0,med:1,hard:2,pro:3};

function renderExercises(){
  const el=document.getElementById('exercise-list');
  const rb=document.getElementById('ex-results-bar');
  if(!el)return;
  const f=(document.getElementById('ex-search-input')?.value||'').toLowerCase();
  const cityF=document.getElementById('filter-city')?.value||'';
  const yearF=document.getElementById('filter-year')?.value||'';
  const schoolF=document.getElementById('filter-school')?.value||'';
  const sortV=document.getElementById('ex-sort')?.value||'default';
  let all=getAllExercisesFlat();
  rebuildTagDropdowns(all);
  let exs=all.filter(e=>{
    if(!exFilterDiff.has(e.diff))return false;
    if(cityF&&e.city!==cityF)return false;
    if(yearF&&String(e.year)!==yearF)return false;
    if(schoolF&&e.school!==schoolF)return false;
    if(f&&!((e.title||'')+e.q+(e.topic||'')+(e.city||'')+(e.school||'')).toLowerCase().includes(f))return false;
    return true;
  });
  if(sortV==='year-desc') exs.sort((a,b)=>(b.year||0)-(a.year||0));
  else if(sortV==='year-asc') exs.sort((a,b)=>(a.year||0)-(b.year||0));
  else if(sortV==='diff-asc') exs.sort((a,b)=>DIFF_ORDER[a.diff]-DIFF_ORDER[b.diff]);
  else if(sortV==='diff-desc') exs.sort((a,b)=>DIFF_ORDER[b.diff]-DIFF_ORDER[a.diff]);
  const lbl={easy:'Dễ',med:'Trung bình',hard:'Khó',pro:'Chuyên'};
  if(rb) rb.innerHTML=`Hiển thị <span>${exs.length} bài tập</span>`;
  el.innerHTML=exs.length?exs.map(e=>`
    <div class="exercise-card" onclick="openExercise('${e.id}','${e.diff}')">
      <div class="ex-card-inner">
        <div class="ex-card-body">
          <div class="ex-meta">
            ${e.title?`<span class="ex-title">${e.title}</span>`:''}
            <span class="badge ${e.diff}">${lbl[e.diff]}</span>
            <span class="badge topic">${e.topic||'—'} · L${e.grade}</span>
            ${e.city?`<span class="badge" style="background:rgba(14,116,144,.1);color:var(--teal)">📍 ${e.city}</span>`:''}
            ${e.year?`<span class="badge" style="background:rgba(55,48,163,.09);color:var(--primary)">📅 ${e.year}</span>`:''}
            ${e.school?`<span class="badge" style="background:rgba(109,40,217,.09);color:var(--violet)">🏫 ${e.school}</span>`:''}
            ${e._custom?'<span class="badge" style="background:rgba(55,48,163,.12);color:var(--primary)">Mới</span>':''}
          </div>
          <div class="ex-preview">${e.q}</div>
        </div>
        <i class="ti ti-chevron-right ex-chevron"></i>
      </div>
    </div>`).join(''):'<div class="empty-state"><i class="ti ti-mood-empty"></i><p>Không có bài tập phù hợp</p></div>';
  mjRender(el);
}

function openExercise(id,diff){
  window.location.hash=`exercise/${id}`;
  const allExs=getAllExercisesFlat();
  const e=allExs.find(x=>x.id===id&&x.diff===diff);
  if(!e)return;
  const lbl={easy:'Dễ',med:'Trung bình',hard:'Khó',pro:'Chuyên'};
  document.getElementById('exercise-browse').style.display='none';
  const dv=document.getElementById('exercise-detail');
  dv.style.display='block';
  dv.innerHTML=`<div class="ex-detail-view">
    <div class="ex-detail-header">
      <button class="back-btn" onclick="showExerciseList()"><i class="ti ti-arrow-left"></i> Quay lại</button>
      <div class="ex-detail-meta">
        <div class="ex-detail-title">${e.title||'Bài tập'}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">
          <span class="badge ${diff}">${lbl[diff]}</span>
          <span class="badge topic">${e.topic||'—'} · L${e.grade}</span>
          ${e.city?`<span class="badge" style="background:rgba(14,116,144,.1);color:var(--teal)">📍 ${e.city}</span>`:''}
          ${e.year?`<span class="badge" style="background:rgba(55,48,163,.09);color:var(--primary)">📅 ${e.year}</span>`:''}
          ${e.school?`<span class="badge" style="background:rgba(109,40,217,.09);color:var(--violet)">🏫 ${e.school}</span>`:''}
          ${e._custom?'<span class="badge" style="background:rgba(55,48,163,.12);color:var(--primary)">Mới</span>':''}
        </div>
      </div>
      ${e._custom?`<button class="del-btn" onclick="deleteExercise('${e.id}','${diff}')"><i class="ti ti-trash" style="font-size:13px"></i> Xóa</button>`:''}
    </div>
    <div class="ex-detail-question">${e.q}</div>
    <div class="ex-detail-btns">
      <button class="show-hint-btn" onclick="toggleBox('hint-${e.id}',this,'Ẩn gợi ý','💡 Gợi ý')">💡 Gợi ý</button>
      <button class="show-ans-btn" onclick="toggleBox('ans-${e.id}',this,'Ẩn đáp án','✅ Đáp án')">✅ Đáp án</button>
      ${e.sol?`<button class="show-sol-btn" onclick="toggleBox('sol-${e.id}',this,'Ẩn lời giải','📝 Lời giải')">📝 Lời giải</button>`:''}
    </div>
    <div class="hint-box" id="hint-${e.id}"><strong>Gợi ý:</strong> ${e.hint||'Không có gợi ý.'}</div>
    <div class="ans-box" id="ans-${e.id}"><strong>Đáp án:</strong> ${e.ans}</div>
    ${e.sol?`<div class="sol-box" id="sol-${e.id}"><strong>Lời giải:</strong><br>${e.sol}</div>`:''}
  </div>`;
  mjRender(dv);
  window.scrollTo({top:0,behavior:'smooth'});
}

function showExerciseList(){
  document.getElementById('exercise-browse').style.display='';
  document.getElementById('exercise-detail').style.display='none';
  window.scrollTo({top:0,behavior:'smooth'});
}

function toggleBox(id,btn,h,s){const b=document.getElementById(id);const v=b.classList.toggle('visible');btn.textContent=v?h:s;if(v)mjRender(b);}

async function deleteExercise(id,diff){
  if(!isAdmin){showToast('Bạn không có quyền xóa!',false);return;}
  if(!confirm('Xóa bài tập này?'))return;
  await deleteExercise_fb(id);
  renderExercises();renderManageList();
  showExerciseList();
  showToast('Đã xóa bài tập!');
}

/* ═══════════════════════════════════
   ADMIN
═══════════════════════════════════ */
function renderAdminContent(){
  const el=document.getElementById('admin-content');
  if(!isAdmin){
    el.innerHTML=`<div class="access-denied">
      <i class="ti ti-shield-off"></i>
      <h3>Không có quyền truy cập</h3>
      <p>${window.Clerk?.user
        ?'Tài khoản của bạn không có quyền Admin.'
        :'Vui lòng đăng nhập với tài khoản Admin.'
      }</p>
    </div>`;
    return;
  }
  el.innerHTML=`
  <div class="admin-panel">
    <div class="admin-panel-header">
      <div class="admin-panel-title"><i class="ti ti-shield-check"></i>Bảng quản trị nội dung</div>
      <button onclick="doSignOut()" style="padding:7px 16px;border-radius:var(--radius-sm);border:1.5px solid rgba(185,28,28,.3);background:rgba(185,28,28,.06);color:var(--red);font-family:'Nunito',sans-serif;font-size:.82rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px">
        <i class="ti ti-logout"></i> Đăng xuất
      </button>
    </div>
    <div class="admin-tabs">
      <div class="admin-tab active" onclick="setAdminTab('add-ex')" id="atab-add-ex"><i class="ti ti-plus"></i> Thêm bài tập</div>
      <div class="admin-tab" onclick="setAdminTab('add-theory')" id="atab-add-theory"><i class="ti ti-book-2"></i> Thêm lý thuyết</div>
      <div class="admin-tab" onclick="setAdminTab('manage')" id="atab-manage"><i class="ti ti-list"></i> Quản lý nội dung</div>
      <div class="admin-tab" onclick="setAdminTab('import')" id="atab-import"><i class="ti ti-file-upload"></i> Nhập hàng loạt</div>
    </div>
    <div class="admin-form active" id="aform-add-ex">
      <div class="form-row trio">
        <div class="form-field"><label><i class="ti ti-school" style="font-size:13px"></i> Lớp</label>
          <select id="ex-grade"><option value="6">Lớp 6</option><option value="7">Lớp 7</option><option value="8">Lớp 8</option><option value="9" selected>Lớp 9</option></select></div>
        <div class="form-field"><label><i class="ti ti-layers" style="font-size:13px"></i> Cấp độ</label>
          <select id="ex-diff"><option value="easy">Dễ</option><option value="med" selected>Trung bình</option><option value="hard">Khó</option><option value="pro">Chuyên</option></select></div>
        <div class="form-field"><label><i class="ti ti-tag" style="font-size:13px"></i> Chủ đề</label>
          <input type="text" id="ex-topic" placeholder="VD: Căn thức, Vi-ét..."></div>
      </div>
      <div class="form-row trio">
        <div class="form-field"><label><i class="ti ti-map-pin" style="font-size:13px"></i> Tỉnh/Thành phố</label>
          <input type="text" id="ex-city" placeholder="VD: TP. Hồ Chí Minh, Hà Nội..."></div>
        <div class="form-field"><label><i class="ti ti-calendar" style="font-size:13px"></i> Năm thi</label>
          <input type="number" id="ex-year" placeholder="VD: 2025" min="2000" max="2099"></div>
        <div class="form-field"><label><i class="ti ti-building-school" style="font-size:13px"></i> Trường</label>
          <input type="text" id="ex-school" placeholder="VD: THPT Chuyên Lê Hồng Phong..."></div>
      </div>
      <div class="form-field" style="margin-bottom:1rem">
        <label><i class="ti ti-heading" style="font-size:13px"></i> Tiêu đề bài <span style="color:var(--red)">*</span></label>
        <input type="text" id="ex-title" placeholder="VD: CTVG-LA2025-B1, Viet_1...">
      </div>
      <div class="form-field" style="margin-bottom:1rem">
        <label><i class="ti ti-question-mark" style="font-size:13px"></i> Đề bài <span style="color:var(--red)">*</span></label>
        <textarea id="ex-question" class="tall" placeholder="Nhập đề bài...&#10;LaTeX: \\( x^2+1=0 \\) hoặc \\[ \\Delta=b^2-4ac \\]"></textarea>
        <div class="form-hint">💡 Hỗ trợ LaTeX: dùng \\( ... \\) inline, \\[ ... \\] dòng riêng</div>
      </div>
      <div class="form-row">
        <div class="form-field"><label><i class="ti ti-bulb" style="font-size:13px"></i> Gợi ý</label><textarea id="ex-hint" placeholder="Gợi ý hướng giải..."></textarea></div>
        <div class="form-field"><label><i class="ti ti-check" style="font-size:13px"></i> Đáp án <span style="color:var(--red)">*</span></label><textarea id="ex-answer" placeholder="Đáp án cuối cùng..."></textarea></div>
      </div>
      <div class="form-field" style="margin-bottom:0">
        <label><i class="ti ti-writing" style="font-size:13px"></i> Lời giải chi tiết</label>
        <textarea id="ex-solution" class="tall" placeholder="Lời giải từng bước (tùy chọn)..."></textarea>
      </div>
      <button class="submit-btn" onclick="submitExercise()"><i class="ti ti-send"></i> Đăng bài tập</button>
    </div>
    <div class="admin-form" id="aform-add-theory">
      <div class="form-row">
        <div class="form-field"><label><i class="ti ti-school" style="font-size:13px"></i> Lớp</label>
          <select id="th-grade"><option value="6">Lớp 6</option><option value="7">Lớp 7</option><option value="8">Lớp 8</option><option value="9" selected>Lớp 9</option></select></div>
        <div class="form-field"><label><i class="ti ti-folder" style="font-size:13px"></i> Nhóm chủ đề</label>
          <select id="th-badge"><option>Số & Đại số</option><option>Đại số</option><option>Hình học</option><option>Hàm số</option><option>Thống kê</option><option>Nâng cao</option></select></div>
      </div>
      <div class="form-row">
        <div class="form-field"><label><i class="ti ti-heading" style="font-size:13px"></i> Tiêu đề <span style="color:var(--red)">*</span></label><input type="text" id="th-title" placeholder="VD: Định lý Pythagore"></div>
        <div class="form-field"><label><i class="ti ti-text-size" style="font-size:13px"></i> Mô tả ngắn <span style="color:var(--red)">*</span></label><input type="text" id="th-desc" placeholder="VD: Định lý, hệ quả và ứng dụng"></div>
      </div>
      <div class="form-field" style="margin-bottom:0">
        <label><i class="ti ti-file-text" style="font-size:13px"></i> Nội dung lý thuyết <span style="color:var(--red)">*</span></label>
        <textarea id="th-content" style="min-height:180px;resize:vertical" placeholder="Nhập nội dung lý thuyết...&#10;Hỗ trợ LaTeX: \\( công thức \\)"></textarea>
        <div class="form-hint">💡 Nội dung sẽ hiển thị với công thức LaTeX</div>
      </div>
      <button class="submit-btn" onclick="submitTheory()"><i class="ti ti-send"></i> Đăng lý thuyết</button>
    </div>
    <div class="admin-form" id="aform-manage">
      <div class="admin-list" id="manage-ex-list">
        <div class="admin-list-title"><i class="ti ti-list-check"></i> Bài tập đã thêm (từ Admin)</div>
        <div id="manage-ex-items"></div>
      </div>
      <div class="admin-list" style="margin-top:1.5rem">
        <div class="admin-list-title"><i class="ti ti-books"></i> Lý thuyết đã thêm (từ Admin)</div>
        <div id="manage-th-items"></div>
      </div>
    </div>
    <div class="admin-form" id="aform-import">
      <div class="import-drop-zone" id="import-drop-zone">
        <input type="file" id="import-file-input" accept=".json" onchange="handleImportFile(this.files[0])">
        <i class="ti ti-file-type-js"></i>
        <p>Kéo thả file JSON hoặc nhấn để chọn</p>
        <small>Chấp nhận file <code>.json</code> — mảng bài tập hoặc gói đề thi</small>
      </div>
      <div class="import-schema-hint">
        <strong>📋 Định dạng JSON hỗ trợ:</strong><br>
        Mảng bài tập đơn giản: <code>[{"title":"...", "q":"...", "ans":"...", ...}, ...]</code><br>
        Gói đề thi (metadata tự điền): <code>{"meta":{"city":"TP. HCM","year":2025,"school":"..."}, "exercises":[...]}</code><br><br>
        <strong>Các trường của bài tập:</strong>
        <code>title</code> · <code>q</code> <em>(đề bài, bắt buộc)</em> · <code>ans</code> <em>(đáp án, bắt buộc)</em> · <code>hint</code> · <code>sol</code> · <code>topic</code> · <code>grade</code> · <code>diff</code> <em>(easy/med/hard/pro)</em> · <code>city</code> · <code>year</code> · <code>school</code>
      </div>
      <div id="import-queue-wrap" style="display:none">
        <div class="import-queue-header">
          <div class="import-queue-title">
            <i class="ti ti-list-check" style="color:var(--primary);font-size:18px"></i>
            Hàng chờ kiểm duyệt
            <span class="import-count-badge green" id="iq-approved-count">0 duyệt</span>
            <span class="import-count-badge red" id="iq-rejected-count">0 bỏ</span>
          </div>
          <div class="import-queue-actions">
            <button class="import-queue-btn select-all" onclick="iqSelectAll()"><i class="ti ti-check-all" style="font-size:14px"></i> Duyệt tất cả</button>
            <button class="import-queue-btn reject-all" onclick="iqRejectAll()"><i class="ti ti-x" style="font-size:14px"></i> Bỏ tất cả</button>
            <button class="import-queue-btn commit" id="iq-commit-btn" onclick="iqCommit()"><i class="ti ti-database-import" style="font-size:14px"></i> Đăng các bài đã duyệt</button>
            <button class="import-queue-btn clear" onclick="iqClear()"><i class="ti ti-trash" style="font-size:14px"></i> Xóa queue</button>
          </div>
        </div>
        <div id="import-queue-list"></div>
        <div class="import-progress" id="import-progress">
          <div class="import-progress-text" id="import-progress-text">Đang đăng bài tập...</div>
          <div class="import-progress-bar-wrap"><div class="import-progress-bar" id="import-progress-bar"></div></div>
        </div>
      </div>
    </div>
  </div>`;
}

function setAdminTab(name){
  document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.admin-form').forEach(f=>f.classList.remove('active'));
  document.getElementById('atab-'+name).classList.add('active');
  document.getElementById('aform-'+name).classList.add('active');
  if(name==='manage')renderManageList();
  if(name==='import')setTimeout(initImportDragDrop,50);
}

async function submitExercise(){
  if(!isAdmin){showToast('Bạn không có quyền!',false);return;}
  const grade=document.getElementById('ex-grade').value;
  const diff=document.getElementById('ex-diff').value;
  const topic=document.getElementById('ex-topic').value.trim()||'Tổng hợp';
  const title=document.getElementById('ex-title').value.trim();
  const city=document.getElementById('ex-city').value.trim();
  const year=document.getElementById('ex-year').value.trim();
  const school=document.getElementById('ex-school').value.trim();
  const q=document.getElementById('ex-question').value.trim();
  const hint=document.getElementById('ex-hint').value.trim();
  const ans=document.getElementById('ex-answer').value.trim();
  const sol=document.getElementById('ex-solution').value.trim();
  if(!title||!q||!ans){showToast('Vui lòng điền tiêu đề, đề bài và đáp án!',false);return;}
  const exercise={id:uid(),title,topic,grade:parseInt(grade),diff,
    city:city||null,year:year?parseInt(year):null,school:school||null,
    q,hint,ans,sol};
  const btn=document.querySelector('#aform-add-ex .submit-btn');
  if(btn){btn.disabled=true;btn.textContent='Đang lưu...';}
  try{
    await saveExercises_fb(exercise);
    if(!_exCache[diff])_exCache[diff]=[];
    _exCache[diff].push(exercise);
    ['ex-topic','ex-title','ex-city','ex-year','ex-school','ex-question','ex-hint','ex-answer','ex-solution'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    showToast('Đã thêm bài tập thành công!');
    renderExercises();renderManageList();
  }finally{
    if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-send"></i> Đăng bài tập';}
  }
}

async function submitTheory(){
  if(!isAdmin){showToast('Bạn không có quyền!',false);return;}
  const grade=document.getElementById('th-grade').value;
  const badge=document.getElementById('th-badge').value;
  const title=document.getElementById('th-title').value.trim();
  const desc=document.getElementById('th-desc').value.trim();
  const content=document.getElementById('th-content').value.trim();
  if(!title||!desc||!content){showToast('Vui lòng điền đầy đủ thông tin!',false);return;}
  const theory={id:uid(),grade:parseInt(grade),badge,title,desc,content};
  const btn=document.querySelector('#aform-add-theory .submit-btn');
  if(btn){btn.disabled=true;btn.textContent='Đang lưu...';}
  try{
    await saveTheory_fb(theory);
    if(!_thCache)_thCache=[];
    _thCache.push(theory);
    ['th-title','th-desc','th-content'].forEach(id=>document.getElementById(id).value='');
    showToast('Đã thêm lý thuyết thành công!');
    renderManageList();renderTopics();
  }finally{
    if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-send"></i> Đăng lý thuyết';}
  }
}

async function deleteTheory(id){
  if(!isAdmin){showToast('Bạn không có quyền!',false);return;}
  if(!confirm('Xóa lý thuyết này?'))return;
  await deleteTheory_fb(id);
  renderManageList();renderTopics();
  showToast('Đã xóa lý thuyết!');
}

function renderManageList(){
  const ex=getExCache();
  const th=getThCache();
  const lbl={easy:'Dễ',med:'Trung bình',hard:'Khó',pro:'Chuyên'};
  const exEl=document.getElementById('manage-ex-items');
  const thEl=document.getElementById('manage-th-items');
  if(!exEl||!thEl)return;
  const allCustomEx=[
    ...((ex.easy||[]).map(e=>({...e,diff:'easy'}))),
    ...((ex.med||[]).map(e=>({...e,diff:'med'}))),
    ...((ex.hard||[]).map(e=>({...e,diff:'hard'}))),
    ...((ex.pro||[]).map(e=>({...e,diff:'pro'})))
  ];
  exEl.innerHTML=allCustomEx.length?allCustomEx.map(e=>`
    <div class="admin-item">
      <div class="admin-item-body">
        <div class="admin-item-meta"><span>Lớp ${e.grade}</span><span>${lbl[e.diff]}</span><span>${e.topic}</span>${e.city?`<span>📍 ${e.city}</span>`:''}${e.year?`<span>📅 ${e.year}</span>`:''}${e.school?`<span>🏫 ${e.school}</span>`:''}</div>
        <div class="admin-item-q" title="${(e.title||e.q).replace(/"/g,'&quot;')}">${e.title?`${e.title} - `:''}${e.q.replace(/<[^>]+>/g,'').slice(0,80)}${e.q.length>80?'…':''}</div>
      </div>
      <button class="admin-item-del" onclick="deleteExercise('${e.id}','${e.diff}')"><i class="ti ti-trash" style="font-size:13px"></i> Xóa</button>
    </div>`).join(''):'<div class="empty-state" style="padding:1.25rem"><i class="ti ti-mood-empty"></i><p>Chưa có bài tập nào được thêm</p></div>';
  thEl.innerHTML=th.length?th.map(t=>`
    <div class="admin-item">
      <div class="admin-item-body">
        <div class="admin-item-meta"><span>Lớp ${t.grade}</span><span>${t.badge}</span></div>
        <div class="admin-item-q">${t.title}</div>
      </div>
      <button class="admin-item-del" onclick="deleteTheory('${t.id}')"><i class="ti ti-trash" style="font-size:13px"></i> Xóa</button>
    </div>`).join(''):'<div class="empty-state" style="padding:1.25rem"><i class="ti ti-mood-empty"></i><p>Chưa có lý thuyết nào được thêm</p></div>';
}

/* ═══════════════════════════════════
   PLAYGROUND (GeoGebra)
═══════════════════════════════════ */
let _pgApplet=null;
let _pgInitDone=false;
let _pgAppletReady=false;

window.pgGgbReady=function(){
  _pgApplet=window.ggbApplet;
  _pgAppletReady=true;
  try{
    _pgApplet.setCoordSystem(-10,10,-10,10);
    _pgApplet.setAxesVisible(true,true);
    _pgApplet.setGridVisible(true);
  }catch(e){console.warn('GeoGebra init warning',e);}
};

function pgInit(){
  if(_pgInitDone)return;
  const wrap=document.getElementById('ggbbox');
  if(!wrap)return;
  if(typeof GGBApplet==='undefined'){
    showToast('Không tải được GeoGebra API. Kiểm tra kết nối mạng.',false);
    return;
  }
  const params={
    appName:'geometry',id:'ggbApplet',
    width:wrap.clientWidth||900,height:wrap.clientHeight||620,
    showToolBar:true,showToolBarHelp:true,showAlgebraInput:true,
    showMenuBar:true,showResetIcon:true,showZoomButtons:true,
    showFullscreenButton:true,allowStyleBar:true,enableLabelDrags:true,
    enableShiftDragZoom:true,enableRightClick:true,
    appletOnLoad:'pgGgbReady',borderColor:'#ffffff',
    language:'vi',useBrowserForJS:false
  };
  new GGBApplet(params,true).inject('ggbbox');
  _pgInitDone=true;
  window.addEventListener('resize',pgResizeApplet);
}

function pgResizeApplet(){
  const wrap=document.getElementById('ggbbox');
  if(!_pgAppletReady||!wrap)return;
  try{_pgApplet.setSize(wrap.clientWidth,wrap.clientHeight);}catch(e){}
}

/* ═══════════════════════════════════
   INIT
═══════════════════════════════════ */
renderTopics();
renderExercises();