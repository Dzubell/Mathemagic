function tbl(h){return`<div class="table-wrap">${h}</div>`;}

const TOPICS=[
  {id:'so-hoc',grade:6,title:'Số học và phép tính cơ bản',icon:'ti-123',color:'rgba(55,48,163,.12)',iconColor:'var(--primary)',desc:'Số tự nhiên, số nguyên, ước bội, tính chất chia hết.',badge:'Số & Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'phan-so',grade:6,title:'Phân số và số thập phân',icon:'ti-divide',color:'rgba(4,120,87,.12)',iconColor:'var(--green)',desc:'Rút gọn phân số, so sánh, các phép tính trên phân số.',badge:'Số & Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'hinh-co-ban',grade:6,title:'Hình học cơ bản',icon:'ti-shape',color:'rgba(14,116,144,.12)',iconColor:'var(--teal)',desc:'Điểm, đường thẳng, góc, tam giác, tứ giác.',badge:'Hình học',bc:'rgba(14,116,144,.1)',bt:'var(--teal)'},
  {id:'ty-le',grade:7,title:'Tỉ lệ thức & Đại lượng tỉ lệ',icon:'ti-arrows-left-right',color:'rgba(109,40,217,.12)',iconColor:'var(--violet)',desc:'Tỉ lệ thức, chia tỉ lệ, đại lượng tỉ lệ thuận/nghịch.',badge:'Số & Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'ham-so-bac1',grade:7,title:'Hàm số bậc nhất y = ax+b',icon:'ti-chart-line',color:'rgba(180,83,9,.12)',iconColor:'var(--amber)',desc:'Đồ thị, tính đơn điệu, vị trí tương đối hai đường thẳng.',badge:'Hàm số',bc:'rgba(109,40,217,.1)',bt:'var(--violet)'},
  {id:'thong-ke',grade:7,title:'Thống kê & Xác suất',icon:'ti-chart-bar',color:'rgba(4,120,87,.12)',iconColor:'var(--green)',desc:'Trung bình, trung vị, mốt, xác suất biến cố cơ bản.',badge:'Thống kê',bc:'rgba(4,120,87,.1)',bt:'var(--green)'},
  {id:'hang-dang-thuc',grade:8,title:'7 Hằng đẳng thức đáng nhớ',icon:'ti-math-function',color:'rgba(180,83,9,.12)',iconColor:'var(--amber)',desc:'Bình phương tổng/hiệu, hiệu bình phương, lập phương...',badge:'Đại số',bc:'rgba(180,83,9,.1)',bt:'var(--amber)'},
  {id:'phan-tich-nttu',grade:8,title:'Phân tích đa thức thành nhân tử',icon:'ti-puzzle',color:'rgba(109,40,217,.12)',iconColor:'var(--violet)',desc:'Đặt nhân tử chung, hằng đẳng thức, nhóm hạng tử.',badge:'Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'pt-bac1',grade:8,title:'Phương trình & hệ PT bậc nhất',icon:'ti-equal',color:'rgba(14,116,144,.1)',iconColor:'var(--teal)',desc:'Phương pháp thế, cộng đại số; bài toán thực tế.',badge:'Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'can-thuc',grade:9,title:'Căn thức và biến đổi căn thức',icon:'ti-square-root',color:'rgba(14,116,144,.1)',iconColor:'var(--teal)',desc:'Điều kiện xác định, rút gọn, trục căn thức, liên hợp.',badge:'Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'ham-so-bac2',grade:9,title:'Hàm số bậc hai y = ax²',icon:'ti-chart-arcs',color:'rgba(109,40,217,.12)',iconColor:'var(--violet)',desc:'Đồ thị parabol, đỉnh, trục đối xứng, tính đơn điệu.',badge:'Hàm số',bc:'rgba(109,40,217,.1)',bt:'var(--violet)'},
  {id:'pt-bac2',grade:9,title:'Phương trình bậc hai & Vi-ét',icon:'ti-calculator',color:'rgba(185,28,28,.1)',iconColor:'var(--red)',desc:'Biệt thức Δ, nhẩm nghiệm, hệ thức Vi-ét, ứng dụng.',badge:'Đại số',bc:'rgba(55,48,163,.1)',bt:'var(--primary)'},
  {id:'he-thuc-luong',grade:9,title:'Hệ thức lượng trong tam giác vuông',icon:'ti-triangle',color:'rgba(4,120,87,.12)',iconColor:'var(--green)',desc:'Đường cao, hình chiếu, tỉ số lượng giác.',badge:'Hình học',bc:'rgba(14,116,144,.1)',bt:'var(--teal)'},
  {id:'duong-tron',grade:9,title:'Đường tròn & tứ giác nội tiếp',icon:'ti-circle',color:'rgba(180,83,9,.1)',iconColor:'var(--amber)',desc:'Góc nội tiếp, tiếp tuyến, chứng minh tứ giác nội tiếp.',badge:'Hình học',bc:'rgba(14,116,144,.1)',bt:'var(--teal)'},
  {id:'hinh-khong-gian',grade:9,title:'Hình học không gian',icon:'ti-3d-cube-sphere',color:'rgba(185,28,28,.1)',iconColor:'var(--red)',desc:'Trụ, nón, cầu — diện tích & thể tích.',badge:'Hình học',bc:'rgba(14,116,144,.1)',bt:'var(--teal)'},
  {id:'bdt',grade:9,title:'Bất đẳng thức — AM-GM & BCS',icon:'ti-math-greater',color:'rgba(109,40,217,.12)',iconColor:'var(--violet)',desc:'Cauchy, AM-GM, Bunhiacopski — tìm min/max.',badge:'Nâng cao',bc:'rgba(109,40,217,.1)',bt:'var(--violet)'},
  {id:'bat-bien',grade:10,title:'Nguyên lý bất biến',icon:'ti-infinity',color:'rgba(185,28,28,.1)',iconColor:'var(--red)',desc:'Đại lượng không đổi qua các phép biến đổi — tổng, hiệu, số dư, tô màu.',badge:'Chuyên đề',bc:'rgba(185,28,28,.1)',bt:'var(--red)'},
  {id:'dirichlet',grade:10,title:'Nguyên lý Dirichlet',icon:'ti-grid-dots',color:'rgba(180,83,9,.1)',iconColor:'var(--amber)',desc:'Nguyên lý chuồng - thỏ và các dạng bài suy luận, chia hết, hình học.',badge:'Chuyên đề',bc:'rgba(180,83,9,.1)',bt:'var(--amber)'},
  {id:'dong-du',grade:10,title:'Đồng dư thức',icon:'ti-percentage',color:'rgba(14,116,144,.1)',iconColor:'var(--teal)',desc:'Tính chất đồng dư, Fermat, Wilson, Euler — số dư, chia hết, chữ số tận cùng.',badge:'Chuyên đề',bc:'rgba(14,116,144,.1)',bt:'var(--teal)'},
];

const LESSONS = {

/* ══════════ LỚP 6 ══════════ */
'so-hoc': `
<div class="cb"><div class="cb-heading">1. Tập hợp số & Tính chia hết</div>
<div class="defbox">Tập hợp số: \\(\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}\\). Số nguyên gồm số nguyên âm, 0 và số nguyên dương.</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Chia hết cho tổng</span><span class="val">Nếu \\(a\\vdots m\\) và \\(b\\vdots m\\) thì \\((a+b)\\vdots m\\) và \\((a-b)\\vdots m\\)</span></div>
  <div class="frow"><span class="lbl">Dấu hiệu chia hết 2, 5</span><span class="val">Xét chữ số tận cùng</span></div>
  <div class="frow"><span class="lbl">Dấu hiệu chia hết 3, 9</span><span class="val">Tổng các chữ số chia hết cho 3 (hoặc 9)</span></div>
  <div class="frow"><span class="lbl">Quy tắc dấu ngoặc</span><span class="val">\\(a-(b-c)=a-b+c\\)</span></div>
</div>
<div class="note"><strong>Lỗi thường gặp:</strong> Bỏ ngoặc sau dấu trừ phải đổi dấu <em>tất cả</em> hạng tử trong ngoặc.</div>
</div>

<div class="cb"><div class="cb-heading">2. Ước, bội & Phân tích ra thừa số nguyên tố</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Phân tích nguyên tố</span><span class="val">\\(n=p_1^{a_1}\\cdot p_2^{a_2}\\cdots\\)</span></div>
  <div class="frow"><span class="lbl">Số ước của \\(n\\)</span><span class="val">\\((a_1+1)(a_2+1)\\cdots\\)</span></div>
  <div class="frow"><span class="lbl">ƯCLN(a,b)</span><span class="val">Tích các thừa số nguyên tố chung, lấy số mũ <em>nhỏ nhất</em></span></div>
  <div class="frow"><span class="lbl">BCNN(a,b)</span><span class="val">Tích các thừa số nguyên tố (chung và riêng), lấy số mũ <em>lớn nhất</em></span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(36=2^2\\cdot3^2\\). Số ước của 36: \\((2+1)(2+1)=9\\) ước.<br>
  \\(\\text{ƯCLN}(12,18)=6\\), \\(\\text{BCNN}(12,18)=36\\).
</div>
</div>`,

'phan-so': `
<div class="cb"><div class="cb-heading">1. Phân số — Định nghĩa & Rút gọn</div>
<div class="defbox">Phân số \\(\\dfrac{a}{b}\\) (\\(b\\neq0\\)) biểu diễn \\(a\\) phần bằng nhau trong \\(b\\) phần của một đơn vị.</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Rút gọn</span><span class="val">\\(\\dfrac{a}{b}=\\dfrac{a\\div d}{b\\div d}\\), \\(d=\\text{ƯCLN}(a,b)\\)</span></div>
  <div class="frow"><span class="lbl">So sánh (cùng mẫu dương)</span><span class="val">\\(\\dfrac{a}{m}\\lt\\dfrac{b}{m} \\Leftrightarrow a\\lt b \\)</span></div>
  <div class="frow"><span class="lbl">Phân số tối giản</span><span class="val">\\(\\text{ƯCLN}(a,b)=1\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Rút gọn \\(\\dfrac{18}{24}\\): \\(\\text{ƯCLN}(18,24)=6\\Rightarrow\\dfrac{18}{24}=\\dfrac{3}{4}\\).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Các phép tính trên phân số</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Cộng / Trừ</span><span class="val">\\(\\dfrac{a}{b}\\pm\\dfrac{c}{d}=\\dfrac{ad\\pm bc}{bd}\\)</span></div>
  <div class="frow"><span class="lbl">Nhân</span><span class="val">\\(\\dfrac{a}{b}\\times\\dfrac{c}{d}=\\dfrac{ac}{bd}\\)</span></div>
  <div class="frow"><span class="lbl">Chia</span><span class="val">\\(\\dfrac{a}{b}\\div\\dfrac{c}{d}=\\dfrac{a}{b}\\times\\dfrac{d}{c}=\\dfrac{ad}{bc}\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(\\dfrac{2}{3}+\\dfrac{1}{4}=\\dfrac{8}{12}+\\dfrac{3}{12}=\\dfrac{11}{12}\\)
</div>
<div class="note"><strong>Lỗi thường gặp:</strong> Cộng/trừ phân số <em>không</em> được cộng tử với tử, mẫu với mẫu — phải quy đồng mẫu trước.</div>
</div>

<div class="cb"><div class="cb-heading">3. Số thập phân & Chuyển đổi</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Phân số → số thập phân</span><span class="val">Thực hiện phép chia tử cho mẫu</span></div>
  <div class="frow"><span class="lbl">Số thập phân → phân số</span><span class="val">Viết dưới dạng \\(\\dfrac{\\text{phần thập phân}}{10^k}\\) rồi rút gọn</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(0{,}75=\\dfrac{75}{100}=\\dfrac{3}{4}\\)
</div>
</div>`,

'hinh-co-ban': `
<div class="cb"><div class="cb-heading">1. Điểm, đường thẳng, đoạn thẳng, tia</div>
<div class="defbox">
  Qua hai điểm phân biệt, có một và chỉ một đường thẳng. Đường thẳng kéo dài vô hạn hai phía; đoạn thẳng có hai đầu mút cố định; tia có một gốc và kéo dài vô hạn về một phía.
</div>
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;height:auto;display:block;margin:0 auto">
<defs><marker id="ah1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9Z" fill="var(--primary)"/></marker></defs>
<line x1="40" y1="40" x2="520" y2="40" stroke="var(--primary)" stroke-width="2" marker-start="url(#ah1)" marker-end="url(#ah1)"/>
<circle cx="140" cy="40" r="4" fill="var(--text)"/>
<circle cx="280" cy="40" r="4" fill="var(--text)"/>
<circle cx="420" cy="40" r="4" fill="var(--text)"/>
<text x="140" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">A</text>
<text x="280" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">B</text>
<text x="420" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">C</text>
<text x="540" y="44" font-size="12" fill="var(--text3)">Đường thẳng</text>
<line x1="140" y1="125" x2="140" y2="135" stroke="var(--text)" stroke-width="1.5"/>
<line x1="140" y1="130" x2="420" y2="130" stroke="var(--primary)" stroke-width="2"/>
<line x1="420" y1="125" x2="420" y2="135" stroke="var(--text)" stroke-width="1.5"/>
<circle cx="140" cy="130" r="4" fill="var(--text)"/>
<circle cx="420" cy="130" r="4" fill="var(--text)"/>
<text x="140" y="116" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">A</text>
<text x="420" y="116" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">B</text>
<text x="540" y="134" font-size="12" fill="var(--text3)">Đoạn thẳng</text>
<line x1="140" y1="205" x2="140" y2="215" stroke="var(--text)" stroke-width="1.5"/>
<line x1="140" y1="210" x2="510" y2="210" stroke="var(--primary)" stroke-width="2" marker-end="url(#ah1)"/>
<circle cx="140" cy="210" r="4" fill="var(--text)"/>
<circle cx="300" cy="210" r="4" fill="var(--text)"/>
<text x="140" y="196" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">A</text>
<text x="300" y="196" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">B</text>
<text x="540" y="214" font-size="12" fill="var(--text3)">Tia</text>
</svg>
<div class="note"><strong>Phân biệt:</strong> Đường thẳng <em>AC</em> không có độ dài (vô hạn); đoạn thẳng <em>AB</em> có độ dài đo được; tia <em>AB</em> chỉ giới hạn một đầu (gốc <em>A</em>).</div>
</div>

<div class="cb"><div class="cb-heading">2. Góc</div>
<div class="defbox">Góc \\(xOy\\) là hình gồm hai tia \\(Ox\\), \\(Oy\\) chung gốc \\(O\\). \\(O\\) gọi là đỉnh góc, \\(Ox\\) và \\(Oy\\) là hai cạnh góc.</div>
<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;height:auto;display:block;margin:0 auto">
<defs><marker id="ah2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9Z" fill="var(--primary)"/></marker></defs>
<line x1="150" y1="200" x2="400" y2="200" stroke="var(--primary)" stroke-width="2" marker-end="url(#ah2)"/>
<line x1="150" y1="200" x2="278.6" y2="46.8" stroke="var(--primary)" stroke-width="2" marker-end="url(#ah2)"/>
<path d="M 188.0 200.0 L 187.9 196.7 L 187.4 193.4 L 186.7 190.2 L 185.7 187.0 L 184.4 183.9 L 182.9 181.0 L 181.1 178.2 L 179.1 175.6 L 176.9 173.1 L 174.4 170.9" fill="none" stroke="var(--amber)" stroke-width="2"/>
<circle cx="150" cy="200" r="4" fill="var(--text)"/>
<text x="132" y="214" font-size="14" font-weight="700" fill="var(--text)">O</text>
<text x="408" y="204" font-size="14" font-weight="700" fill="var(--text)">x</text>
<text x="278" y="32" font-size="14" font-weight="700" fill="var(--text)">y</text>
<text x="202" y="180" font-size="13" font-weight="700" fill="var(--amber)">α</text>
</svg>
${tbl('<table class="kbt"><tr><th>Loại góc</th><th>Số đo</th></tr><tr><td>Góc nhọn</td><td>\\(0°<\\alpha<90°\\)</td></tr><tr><td>Góc vuông</td><td>\\(\\alpha=90°\\)</td></tr><tr><td>Góc tù</td><td>\\(90°<\\alpha<180°\\)</td></tr><tr><td>Góc bẹt</td><td>\\(\\alpha=180°\\)</td></tr></table>')}
</div>

<div class="cb"><div class="cb-heading">3. Tam giác</div>
<svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" style="max-width:420px;height:auto;display:block;margin:0 auto">
<polygon points="60,220 420,220 220,60" fill="none" stroke="var(--primary)" stroke-width="2"/>
<line x1="220" y1="60" x2="220" y2="220" stroke="var(--teal)" stroke-width="1.5" stroke-dasharray="5 4"/>
<rect x="212" y="212" width="16" height="8" fill="none" stroke="var(--teal)" stroke-width="1.5"/>
<path d="M 90.0 220.0 L 89.9 217.1 L 89.4 214.1 L 88.7 211.3 L 87.7 208.5 L 86.5 205.9 L 84.9 203.3 L 83.2 201.0 L 81.2 198.8" fill="none" stroke="var(--amber)" stroke-width="2"/>
<path d="M 390.0 220.0 L 390.1 217.5 L 390.4 215.0 L 391.0 212.5 L 391.7 210.1 L 392.6 207.7 L 393.8 205.5 L 395.1 203.3 L 396.6 201.3" fill="none" stroke="var(--amber)" stroke-width="2"/>
<path d="M 201.6 78.4 L 205.9 81.8 L 210.7 84.3 L 216.0 85.7 L 221.4 86.0 L 226.8 85.1 L 231.9 83.1 L 236.5 80.1 L 240.3 76.2" fill="none" stroke="var(--amber)" stroke-width="2"/>
<circle cx="60" cy="220" r="4" fill="var(--text)"/>
<circle cx="420" cy="220" r="4" fill="var(--text)"/>
<circle cx="220" cy="60" r="4" fill="var(--text)"/>
<circle cx="220" cy="220" r="3.5" fill="var(--teal)"/>
<text x="42" y="234" font-size="14" font-weight="700" fill="var(--text)">A</text>
<text x="424" y="234" font-size="14" font-weight="700" fill="var(--text)">B</text>
<text x="220" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">C</text>
<text x="226" y="234" font-size="13" font-weight="700" fill="var(--teal)">H</text>
<text x="102" y="206" font-size="13" font-weight="700" fill="var(--amber)">A</text>
<text x="377" y="208" font-size="13" font-weight="700" fill="var(--amber)">B</text>
<text x="222" y="102" text-anchor="middle" font-size="13" font-weight="700" fill="var(--amber)">C</text>
<text x="225" y="142" font-size="13" font-weight="700" fill="var(--teal)">h</text>
</svg>
<div class="fbox green">
  <div class="frow"><span class="lbl">Tổng 3 góc</span><span class="val">\\(\\widehat{A}+\\widehat{B}+\\widehat{C}=180°\\)</span></div>
  <div class="frow"><span class="lbl">Diện tích</span><span class="val">\\(S=\\dfrac{1}{2}\\times\\text{đáy}\\times h\\) (\\(h\\) là đường cao ứng với đáy)</span></div>
  <div class="frow"><span class="lbl">Bất đẳng thức tam giác</span><span class="val">Mỗi cạnh nhỏ hơn tổng và lớn hơn hiệu hai cạnh còn lại</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Tam giác \\(ABC\\) có đáy \\(AB=12\\) cm, đường cao \\(CH=5\\) cm.<br>
  \\(S=\\dfrac{1}{2}\\times12\\times5=30\\) cm².
</div>
</div>

<div class="cb"><div class="cb-heading">4. Tứ giác</div>
<svg viewBox="0 0 460 290" xmlns="http://www.w3.org/2000/svg" style="max-width:420px;height:auto;display:block;margin:0 auto">
<polygon points="80,250 280,260 380,100 150,60" fill="none" stroke="var(--primary)" stroke-width="2"/>
<path d="M 108.0 251.4 L 107.8 247.0 L 107.0 242.6 L 105.5 238.4 L 103.4 234.6 L 100.6 231.1 L 97.4 228.1 L 93.7 225.6 L 89.7 223.7" fill="none" stroke="var(--amber)" stroke-width="2"/>
<path d="M 252.0 258.6 L 253.3 251.5 L 256.4 244.9 L 261.1 239.3 L 267.0 235.2 L 273.9 232.7 L 281.1 232.0 L 288.2 233.2 L 294.8 236.3" fill="none" stroke="var(--amber)" stroke-width="2"/>
<path d="M 365.2 123.7 L 361.8 121.3 L 358.9 118.4 L 356.4 115.1 L 354.4 111.4 L 353.0 107.5 L 352.2 103.5 L 352.0 99.3 L 352.4 95.2" fill="none" stroke="var(--amber)" stroke-width="2"/>
<path d="M 140.3 86.3 L 146.3 87.7 L 152.4 87.9 L 158.4 86.7 L 164.0 84.3 L 168.9 80.6 L 172.9 76.0 L 175.9 70.7 L 177.6 64.8" fill="none" stroke="var(--amber)" stroke-width="2"/>
<circle cx="80" cy="250" r="4" fill="var(--text)"/>
<circle cx="280" cy="260" r="4" fill="var(--text)"/>
<circle cx="380" cy="100" r="4" fill="var(--text)"/>
<circle cx="150" cy="60" r="4" fill="var(--text)"/>
<text x="58" y="264" font-size="14" font-weight="700" fill="var(--text)">A</text>
<text x="284" y="280" font-size="14" font-weight="700" fill="var(--text)">B</text>
<text x="392" y="98" font-size="14" font-weight="700" fill="var(--text)">C</text>
<text x="132" y="50" font-size="14" font-weight="700" fill="var(--text)">D</text>
<text x="108" y="230" font-size="13" font-weight="700" fill="var(--amber)">A</text>
<text x="252" y="225" font-size="13" font-weight="700" fill="var(--amber)">B</text>
<text x="333" y="120" font-size="13" font-weight="700" fill="var(--amber)">C</text>
<text x="163" y="100" font-size="13" font-weight="700" fill="var(--amber)">D</text>
</svg>
<div class="fbox">
  <div class="frow"><span class="lbl">Tổng 4 góc</span><span class="val">\\(\\widehat{A}+\\widehat{B}+\\widehat{C}+\\widehat{D}=360°\\)</span></div>
</div>
<div class="note"><strong>Ghi nhớ:</strong> Tứ giác bất kỳ luôn chia được thành 2 tam giác bằng một đường chéo, mỗi tam giác góc tổng 180° → tổng 4 góc tứ giác \\(=2\\times180°=360°\\).</div>
</div>`,

/* ══════════ LỚP 7 ══════════ */
'ty-le': `
<div class="cb"><div class="cb-heading">1. Tỉ lệ thức</div>
<div class="defbox">Tỉ lệ thức là đẳng thức giữa hai tỉ số: \\(\\dfrac{a}{b}=\\dfrac{c}{d}\\).</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Định nghĩa</span><span class="val">\\(\\dfrac{a}{b}=\\dfrac{c}{d}\\Leftrightarrow a\\cdot d=b\\cdot c\\)</span></div>
  <div class="frow"><span class="lbl">Tính chất dãy tỉ số bằng nhau</span><span class="val">\\(\\dfrac{a}{b}=\\dfrac{c}{d}=\\dfrac{a+c}{b+d}=\\dfrac{a-c}{b-d}\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Tìm \\(x,y\\) biết \\(\\dfrac{x}{3}=\\dfrac{y}{5}\\) và \\(x+y=24\\).<br>
  Theo tính chất dãy tỉ số: \\(\\dfrac{x}{3}=\\dfrac{y}{5}=\\dfrac{x+y}{3+5}=\\dfrac{24}{8}=3\\Rightarrow x=9,\\;y=15\\).
</div>
<div class="note"><strong>Lỗi thường gặp:</strong> Khi áp dụng tính chất dãy tỉ số, mẫu phải cộng/trừ tương ứng với tử — không trộn dấu.</div>
</div>

<div class="cb"><div class="cb-heading">2. Đại lượng tỉ lệ thuận, tỉ lệ nghịch</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Tỉ lệ thuận</span><span class="val">\\(y=kx\\) (\\(k\\neq0\\) là hệ số tỉ lệ); \\(\\dfrac{y_1}{x_1}=\\dfrac{y_2}{x_2}=k\\)</span></div>
  <div class="frow"><span class="lbl">Tỉ lệ nghịch</span><span class="val">\\(xy=k\\) (hằng số); \\(x_1y_1=x_2y_2=k\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> 5 công nhân làm xong việc trong 12 ngày. Hỏi 6 công nhân (cùng năng suất) làm xong trong mấy ngày?<br>
  Số công nhân và số ngày là hai đại lượng tỉ lệ nghịch: \\(5\\times12=6\\times x\\Rightarrow x=10\\) ngày.
</div>
</div>`,

'ham-so-bac1': `
<div class="cb"><div class="cb-heading">1. Hàm số bậc nhất \\(y=ax+b\\)</div>
<div class="defbox">Hàm số bậc nhất có dạng \\(y=ax+b\\) (\\(a\\neq0\\)), đồ thị là một đường thẳng.</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đồng biến / Nghịch biến</span><span class="val">\\(a>0\\) hàm số đồng biến (tăng); \\(a<0\\) nghịch biến (giảm)</span></div>
  <div class="frow"><span class="lbl">Giao trục \\(Oy\\)</span><span class="val">Cho \\(x=0\\Rightarrow y=b\\): điểm \\((0,b)\\)</span></div>
  <div class="frow"><span class="lbl">Giao trục \\(Ox\\)</span><span class="val">Cho \\(y=0\\Rightarrow x=-b/a\\): điểm \\((-b/a,0)\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Xác định \\(y=ax+b\\) biết đồ thị đi qua \\(A(1;3)\\) và \\(B(-1;-1)\\).<br>
  Thế tọa độ: \\(\\begin{cases}a+b=3\\\\-a+b=-1\\end{cases}\\Rightarrow a=2,\\;b=1\\). Vậy \\(y=2x+1\\).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Vị trí tương đối của hai đường thẳng</div>
${tbl('<table class="kbt"><tr><th>Vị trí</th><th>Điều kiện</th></tr><tr><td>Cắt nhau</td><td>\\(a_1\\neq a_2\\)</td></tr><tr><td>Song song</td><td>\\(a_1=a_2,b_1\\neq b_2\\)</td></tr><tr><td>Trùng nhau</td><td>\\(a_1=a_2,b_1=b_2\\)</td></tr><tr><td>Vuông góc</td><td>\\(a_1 a_2=-1\\)</td></tr></table>')}
<div class="note"><strong>Lỗi thường gặp:</strong> Hai đường song song chỉ cần <em>cùng hệ số góc</em> \\(a\\) — quên kiểm tra \\(b_1\\neq b_2\\) sẽ nhầm với trùng nhau.</div>
</div>`,

'thong-ke': `
<div class="cb"><div class="cb-heading">1. Số đặc trưng của mẫu dữ liệu</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Số trung bình</span><span class="val">\\(\\bar{x}=\\dfrac{x_1+x_2+\\cdots+x_n}{n}\\)</span></div>
  <div class="frow"><span class="lbl">Số trung vị (Median)</span><span class="val">Sắp xếp tăng dần, lấy giá trị ở giữa (hoặc trung bình hai giá trị giữa nếu \\(n\\) chẵn)</span></div>
  <div class="frow"><span class="lbl">Mốt (Mode)</span><span class="val">Giá trị xuất hiện nhiều nhất</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Dữ liệu: 2, 3, 5, 7, 7, 9.<br>
  Trung bình: \\(\\bar{x}=\\dfrac{2+3+5+7+7+9}{6}=\\dfrac{33}{6}=5{,}5\\).<br>
  Trung vị: giá trị giữa thứ 3,4 là 5 và 7 → \\(\\dfrac{5+7}{2}=6\\). Mốt: \\(M_0=7\\) (xuất hiện 2 lần).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Xác suất của một biến cố</div>
<div class="defbox">Xác suất biến cố \\(A\\) trong phép thử có các kết quả đồng khả năng: \\(P(A)=\\dfrac{\\text{số kết quả thuận lợi cho }A}{\\text{số kết quả có thể xảy ra}}\\).</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Biến cố chắc chắn</span><span class="val">\\(P(A)=1\\)</span></div>
  <div class="frow"><span class="lbl">Biến cố không thể</span><span class="val">\\(P(A)=0\\)</span></div>
  <div class="frow"><span class="lbl">Mọi biến cố</span><span class="val">\\(0\\leq P(A)\\leq1\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Gieo một con xúc xắc 6 mặt. Tính xác suất ra mặt số chẵn.<br>
  Kết quả thuận lợi: \\(\\{2,4,6\\}\\) → \\(P=\\dfrac{3}{6}=\\dfrac{1}{2}\\).
</div>
</div>`,

/* ══════════ LỚP 8 ══════════ */
'hang-dang-thuc': `
<div class="cb"><div class="cb-heading">1. Bảng 7 hằng đẳng thức đáng nhớ</div>
${tbl('<table class="kbt"><tr><th>#</th><th>Tên</th><th>Công thức</th></tr><tr><td>1</td><td>Bình phương tổng</td><td>\\((a+b)^2=a^2+2ab+b^2\\)</td></tr><tr><td>2</td><td>Bình phương hiệu</td><td>\\((a-b)^2=a^2-2ab+b^2\\)</td></tr><tr><td>3</td><td>Hiệu hai bình phương</td><td>\\(a^2-b^2=(a+b)(a-b)\\)</td></tr><tr><td>4</td><td>Lập phương tổng</td><td>\\((a+b)^3=a^3+3a^2b+3ab^2+b^3\\)</td></tr><tr><td>5</td><td>Lập phương hiệu</td><td>\\((a-b)^3=a^3-3a^2b+3ab^2-b^3\\)</td></tr><tr><td>6</td><td>Tổng hai lập phương</td><td>\\(a^3+b^3=(a+b)(a^2-ab+b^2)\\)</td></tr><tr><td>7</td><td>Hiệu hai lập phương</td><td>\\(a^3-b^3=(a-b)(a^2+ab+b^2)\\)</td></tr></table>')}
<div class="note"><strong>Lỗi thường gặp:</strong> \\((a+b)^2\\neq a^2+b^2\\) — thiếu hạng tử \\(2ab\\).</div>
</div>

<div class="cb"><div class="cb-heading">2. Áp dụng tính nhanh</div>
<div class="fbox amber">
  <strong>Ví dụ 1:</strong> Tính nhanh \\(99^2\\).<br>
  Viết \\(99=100-1\\): \\(99^2=(100-1)^2=10000-200+1=9801\\).
</div>
<div class="fbox amber">
  <strong>Ví dụ 2:</strong> Tính nhanh \\(52\\times48\\).<br>
  Viết \\(52=50+2,\\;48=50-2\\): \\(52\\times48=(50+2)(50-2)=50^2-2^2=2500-4=2496\\).
</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Mở rộng hữu ích</span><span class="val">\\(a^2+b^2=(a+b)^2-2ab=(a-b)^2+2ab\\)</span></div>
</div>
</div>`,

'phan-tich-nttu': `
<div class="cb"><div class="cb-heading">1. Các phương pháp phân tích</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đặt nhân tử chung</span><span class="val">\\(ab+ac=a(b+c)\\)</span></div>
  <div class="frow"><span class="lbl">Dùng hằng đẳng thức</span><span class="val">\\(x^2-4=(x-2)(x+2)\\)</span></div>
  <div class="frow"><span class="lbl">Nhóm hạng tử</span><span class="val">\\(ac+bc+ad+bd=c(a+b)+d(a+b)=(a+b)(c+d)\\)</span></div>
  <div class="frow"><span class="lbl">Tách hạng tử (PT bậc 2)</span><span class="val">\\(x^2+5x+6=x^2+2x+3x+6=(x+2)(x+3)\\)</span></div>
</div>
<div class="note"><strong>Thứ tự ưu tiên:</strong> ① Đặt nhân tử chung → ② Hằng đẳng thức → ③ Nhóm hạng tử → ④ Tách hạng tử (nếu cần).</div>
</div>

<div class="cb"><div class="cb-heading">2. Ví dụ tổng hợp</div>
<div class="fbox amber">
  <strong>Ví dụ 1:</strong> Phân tích \\(x^3-3x^2+3x-1\\).<br>
  Nhận dạng hằng đẳng thức lập phương hiệu với \\(a=x,b=1\\): \\(=(x-1)^3\\).
</div>
<div class="fbox amber">
  <strong>Ví dụ 2:</strong> Phân tích \\(2x^2-5x+2\\).<br>
  Tách \\(-5x=-4x-x\\): \\(2x^2-4x-x+2=2x(x-2)-(x-2)=(x-2)(2x-1)\\).
</div>
<div class="fbox green">
  <strong>Ví dụ 3:</strong> Phân tích \\(x^2-y^2+4x+4\\).<br>
  Nhóm: \\((x^2+4x+4)-y^2=(x+2)^2-y^2=(x+2-y)(x+2+y)\\).
</div>
</div>`,

'pt-bac1': `
<div class="cb"><div class="cb-heading">1. Phương trình bậc nhất một ẩn</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Dạng tổng quát</span><span class="val">\\(ax+b=0\\) (\\(a\\neq0\\)) \\(\\Rightarrow x=-\\dfrac{b}{a}\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Giải \\(3x-7=2\\).<br>
  \\(3x=9\\Rightarrow x=3\\).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Hệ phương trình bậc nhất hai ẩn</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Phương pháp thế</span><span class="val">Biểu diễn \\(x\\) theo \\(y\\) (hoặc ngược lại) từ một PT, thế vào PT còn lại</span></div>
  <div class="frow"><span class="lbl">Phương pháp cộng đại số</span><span class="val">Nhân hai PT với hệ số phù hợp để triệt tiêu một ẩn, rồi cộng/trừ</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Giải hệ \\(\\begin{cases}2x+y=7\\\\x-y=2\\end{cases}\\).<br>
  Cộng hai PT: \\(3x=9\\Rightarrow x=3\\), thay vào PT thứ hai: \\(y=1\\).
</div>
</div>

<div class="cb"><div class="cb-heading">3. Giải bài toán bằng cách lập hệ phương trình</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Bước 1</span><span class="val">Gọi ẩn, đặt điều kiện cho ẩn</span></div>
  <div class="frow"><span class="lbl">Bước 2</span><span class="val">Lập hệ phương trình theo đề bài</span></div>
  <div class="frow"><span class="lbl">Bước 3</span><span class="val">Giải hệ, đối chiếu điều kiện rồi kết luận</span></div>
</div>
<div class="note"><strong>Lỗi thường gặp:</strong> Quên đặt điều kiện cho ẩn (ví dụ số sản phẩm, số ngày phải là số nguyên dương) dẫn đến nhận nghiệm không hợp lý.</div>
</div>`,

/* ══════════════════════════════════════════════
   LỚP 9 — ĐẦY ĐỦ LÝ THUYẾT + VÍ DỤ MINH HỌA
══════════════════════════════════════════════ */

'can-thuc': `
<div class="cb"><div class="cb-heading">1. Căn bậc hai — Định nghĩa & Điều kiện</div>
<div class="defbox">
  Với \\(A\\geq0\\): \\(\\sqrt{A}\\) là số không âm sao cho \\((\\sqrt{A})^2=A\\).<br>
  \\(\\sqrt{A}\\) xác định \\(\\Leftrightarrow A\\geq0\\).
</div>
<div class="fbox">
  <div class="frow"><span class="lbl">\\(\\sqrt{A^2}=|A|\\)</span><span class="val">\\(\\sqrt{(-3)^2}=\\sqrt{9}=3\\)</span></div>
  <div class="frow"><span class="lbl">\\(\\sqrt{AB}=\\sqrt{A}\\cdot\\sqrt{B}\\)</span><span class="val">\\(A,B\\geq0\\)</span></div>
  <div class="frow"><span class="lbl">\\(\\sqrt{\\dfrac{A}{B}}=\\dfrac{\\sqrt{A}}{\\sqrt{B}}\\)</span><span class="val">\\(A\\geq0,B>0\\)</span></div>
</div>
<div class="note">
  <strong>Ví dụ:</strong> ĐK xác định của \\(\\sqrt{3x-6}\\): \\(3x-6\\geq0\\Rightarrow x\\geq2\\).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Rút gọn căn thức</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đưa thừa số ra ngoài</span><span class="val">\\(\\sqrt{a^2b}=|a|\\sqrt{b}\\) (\\(b\\geq0\\))</span></div>
  <div class="frow"><span class="lbl">Đưa vào trong căn</span><span class="val">\\(a\\sqrt{b}=\\sqrt{a^2b}\\) (\\(a\\geq0,b\\geq0\\))</span></div>
  <div class="frow"><span class="lbl">Khử mẫu</span><span class="val">\\(\\sqrt{\\dfrac{a}{b}}=\\dfrac{\\sqrt{ab}}{b}\\) (\\(a\\geq0,b>0\\))</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ rút gọn:</strong><br>
  \\(\\sqrt{12}-\\sqrt{27}+\\sqrt{48}=2\\sqrt{3}-3\\sqrt{3}+4\\sqrt{3}=3\\sqrt{3}\\)
</div>
</div>

<div class="cb"><div class="cb-heading">3. Trục căn thức ở mẫu</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Dạng \\(\\dfrac{A}{\\sqrt{B}}\\)</span><span class="val">\\(=\\dfrac{A\\sqrt{B}}{B}\\quad(B>0)\\)</span></div>
  <div class="frow"><span class="lbl">Dạng \\(\\dfrac{A}{\\sqrt{B}+\\sqrt{C}}\\)</span><span class="val">Nhân tử-mẫu với \\((\\sqrt{B}-\\sqrt{C})\\)</span></div>
  <div class="frow"><span class="lbl">Dạng \\(\\dfrac{A}{\\sqrt{B}-\\sqrt{C}}\\)</span><span class="val">Nhân tử-mẫu với \\((\\sqrt{B}+\\sqrt{C})\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(\\dfrac{3}{\\sqrt{5}-\\sqrt{2}}=\\dfrac{3(\\sqrt{5}+\\sqrt{2})}{5-2}=\\sqrt{5}+\\sqrt{2}\\)
</div>
<div class="note"><strong>Bắt buộc:</strong> Xét ĐK xác định trước khi biến đổi.</div>
</div>

<div class="cb"><div class="cb-heading">4. Phương trình vô tỉ — Phương pháp giải</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Dạng \\(\\sqrt{f(x)}=g(x)\\)</span><span class="val">\\(\\Leftrightarrow\\begin{cases}g(x)\\geq0\\\\f(x)=g^2(x)\\end{cases}\\)</span></div>
  <div class="frow"><span class="lbl">Dạng \\(\\sqrt{f(x)}=\\sqrt{g(x)}\\)</span><span class="val">\\(\\Leftrightarrow\\begin{cases}f(x)\\geq0\\\\f(x)=g(x)\\end{cases}\\)</span></div>
</div>
<div class="fbox green">
  <strong>Ví dụ:</strong> Giải \\(\\sqrt{2x-1}=3\\)<br>
  ĐK: \\(2x-1\\geq0\\Rightarrow x\\geq\\dfrac{1}{2}\\).<br>
  \\(2x-1=9\\Rightarrow x=5\\) (thỏa ĐK). ✓
</div>
</div>`,

'ham-so-bac2': `
<div class="cb"><div class="cb-heading">1. Hàm số bậc hai \\(y=ax^2\\;(a\\neq0)\\)</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Tập xác định</span><span class="val">\\(\\mathbb{R}\\) (mọi số thực)</span></div>
  <div class="frow"><span class="lbl">\\(a>0\\)</span><span class="val">Parabol ∪, đồng biến trên \\([0;+\\infty)\\), nghịch biến trên \\((-\\infty;0]\\)</span></div>
  <div class="frow"><span class="lbl">\\(a<0\\)</span><span class="val">Parabol ∩, nghịch biến trên \\([0;+\\infty)\\), đồng biến trên \\((-\\infty;0]\\)</span></div>
  <div class="frow"><span class="lbl">Đỉnh & Trục ĐX</span><span class="val">Đỉnh \\(O(0,0)\\), trục \\(Oy\\)</span></div>
</div>
<div class="note">
  <strong>Bảng giá trị mẫu</strong> \\(y=2x^2\\):
  \\(x\\in\\{-2,-1,0,1,2\\}\\Rightarrow y\\in\\{8,2,0,2,8\\}\\)
</div>
</div>

<div class="cb"><div class="cb-heading">2. Hàm số bậc hai tổng quát \\(y=ax^2+bx+c\\)</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đỉnh parabol</span><span class="val">\\(I\\!\\left(-\\dfrac{b}{2a};\,-\\dfrac{\\Delta}{4a}\\right)\\)</span></div>
  <div class="frow"><span class="lbl">Trục đối xứng</span><span class="val">\\(x=-\\dfrac{b}{2a}\\)</span></div>
  <div class="frow"><span class="lbl">Chiều mở</span><span class="val">\\(a>0\\): mở lên; \\(a<0\\): mở xuống</span></div>
  <div class="frow"><span class="lbl">Giao \\(Oy\\)</span><span class="val">\\((0,c)\\)</span></div>
</div>
<div class="fbox green">
  <strong>Ví dụ:</strong> \\(y=x^2-4x+3\\)<br>
  Đỉnh: \\(x_0=\\dfrac{4}{2}=2\\); \\(y_0=4-8+3=-1\\). Đỉnh \\(I(2;-1)\\), trục \\(x=2\\).
</div>
</div>

<div class="cb"><div class="cb-heading">3. Giao điểm với trục \\(Ox\\) & ứng dụng</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Số giao điểm với \\(Ox\\)</span><span class="val">\\(\\Delta>0\\): 2 điểm; \\(\\Delta=0\\): 1 điểm; \\(\\Delta<0\\): 0 điểm</span></div>
  <div class="frow"><span class="lbl">GTNN (\\(a>0\\))</span><span class="val">\\(y_{\\min}=-\\dfrac{\\Delta}{4a}\\) tại \\(x=-\\dfrac{b}{2a}\\)</span></div>
  <div class="frow"><span class="lbl">GTLN (\\(a<0\\))</span><span class="val">\\(y_{\\max}=-\\dfrac{\\Delta}{4a}\\) tại \\(x=-\\dfrac{b}{2a}\\)</span></div>
</div>
<div class="note">
  <strong>Lưu ý:</strong> Đường thẳng \\(y=mx+n\\) cắt parabol \\(y=ax^2\\) khi PT \\(ax^2-mx-n=0\\) có nghiệm, tức \\(\\Delta\\geq0\\).
</div>
</div>`,

'pt-bac2': `
<div class="cb"><div class="cb-heading">1. Phương trình bậc hai — Công thức nghiệm</div>
<div class="defbox">
  PT: \\(ax^2+bx+c=0\\;(a\\neq0)\\).<br>
  Biệt thức: \\(\\Delta=b^2-4ac\\).
</div>
<div class="fbox">
  <div class="frow"><span class="lbl">\\(\\Delta>0\\)</span><span class="val">2 nghiệm phân biệt: \\(x_{1,2}=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}\\)</span></div>
  <div class="frow"><span class="lbl">\\(\\Delta=0\\)</span><span class="val">Nghiệm kép: \\(x_1=x_2=-\\dfrac{b}{2a}\\)</span></div>
  <div class="frow"><span class="lbl">\\(\\Delta<0\\)</span><span class="val">Vô nghiệm (trên \\(\\mathbb{R}\\))</span></div>
</div>
<div class="fbox amber">
  <strong>Công thức nghiệm thu gọn</strong> (khi \\(b=2b'\\)):<br>
  \\(\\Delta'=b'^2-ac\\); \\(x_{1,2}=\\dfrac{-b'\\pm\\sqrt{\\Delta'}}{a}\\)
</div>
</div>

<div class="cb"><div class="cb-heading">2. Nhẩm nghiệm nhanh</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">\\(a+b+c=0\\)</span><span class="val">\\(x_1=1,\\;x_2=c/a\\)</span></div>
  <div class="frow"><span class="lbl">\\(a-b+c=0\\)</span><span class="val">\\(x_1=-1,\\;x_2=-c/a\\)</span></div>
</div>
<div class="note">
  <strong>Ví dụ:</strong> \\(3x^2-5x+2=0\\): \\(3-5+2=0\\Rightarrow x_1=1,x_2=\\dfrac{2}{3}\\).
</div>
</div>

<div class="cb"><div class="cb-heading">3. Định lý Vi-ét & Ứng dụng</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Tổng nghiệm</span><span class="val">\\(x_1+x_2=-\\dfrac{b}{a}\\)</span></div>
  <div class="frow"><span class="lbl">Tích nghiệm</span><span class="val">\\(x_1\\cdot x_2=\\dfrac{c}{a}\\)</span></div>
</div>
<div class="fbox green">
  <strong>Các biểu thức hay dùng:</strong><br>
  \\(x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2\\)<br>
  \\(|x_1-x_2|=\\sqrt{(x_1+x_2)^2-4x_1x_2}=\\dfrac{\\sqrt{\\Delta}}{|a|}\\)<br>
  \\(x_1^3+x_2^3=(x_1+x_2)^3-3x_1x_2(x_1+x_2)\\)<br>
  \\(x_1^2-x_2^2=(x_1+x_2)(x_1-x_2)\\)
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> PT \\(x^2-5x+4=0\\). Tính \\(x_1^2+x_2^2\\).<br>
  Vi-ét: \\(S=5,P=4\\). \\(x_1^2+x_2^2=S^2-2P=25-8=17\\).
</div>
</div>

<div class="cb"><div class="cb-heading">4. Điều kiện để PT có nghiệm thỏa mãn tính chất</div>
<div class="fbox">
  <div class="frow"><span class="lbl">2 nghiệm phân biệt</span><span class="val">\\(\\Delta>0\\)</span></div>
  <div class="frow"><span class="lbl">2 nghiệm dương</span><span class="val">\\(\\Delta\\geq0,\\;S>0,\\;P>0\\)</span></div>
  <div class="frow"><span class="lbl">2 nghiệm âm</span><span class="val">\\(\\Delta\\geq0,\\;S<0,\\;P>0\\)</span></div>
  <div class="frow"><span class="lbl">2 nghiệm trái dấu</span><span class="val">\\(P<0\\) (không cần xét \\(\\Delta\\))</span></div>
  <div class="frow"><span class="lbl">2 nghiệm cùng dấu</span><span class="val">\\(P>0\\) và \\(S\\neq0\\)</span></div>
</div>
</div>`,

'he-thuc-luong': `
<div class="cb"><div class="cb-heading">1. Hệ thức lượng trong tam giác vuông</div>
<div class="defbox">
  Tam giác \\(ABC\\) vuông tại \\(A\\), đường cao \\(AH\\).<br>
  Ký hiệu: \\(BC=a,\\;AB=c,\\;AC=b,\\;AH=h,\\;BH=c',\\;CH=b'\\).
</div>
${tbl('<table class="kbt"><tr><th>Định lý</th><th>Công thức</th><th>Ý nghĩa</th></tr><tr><td>Cạnh góc vuông</td><td>\\(b^2=a\\cdot b\'\\quad c^2=a\\cdot c\'\\)</td><td>Bình phương cạnh = huyền × hình chiếu</td></tr><tr><td>Đường cao</td><td>\\(h^2=b\'\\cdot c\'\\)</td><td>Bình phương đường cao = tích 2 hình chiếu</td></tr><tr><td>Pythagore</td><td>\\(a^2=b^2+c^2\\)</td><td>—</td></tr><tr><td>Nghịch đảo</td><td>\\(\\dfrac{1}{h^2}=\\dfrac{1}{b^2}+\\dfrac{1}{c^2}\\)</td><td>—</td></tr><tr><td>Quan hệ</td><td>\\(b\\cdot c=a\\cdot h\\)</td><td>Tích 2 cạnh = huyền × đường cao</td></tr></table>')}
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(BH=4,\\;HC=9\\). Tính \\(AH,AB,AC\\).<br>
  \\(AH^2=4\\times9=36\\Rightarrow AH=6\\).<br>
  \\(AB^2=BC\\times BH=13\\times4=52\\Rightarrow AB=2\\sqrt{13}\\).<br>
  \\(AC^2=BC\\times HC=13\\times9=117\\Rightarrow AC=3\\sqrt{13}\\).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Tỉ số lượng giác của góc nhọn</div>
<div class="fbox">
  <div class="frow"><span class="lbl">\\(\\sin\\alpha\\)</span><span class="val">cạnh đối / cạnh huyền</span></div>
  <div class="frow"><span class="lbl">\\(\\cos\\alpha\\)</span><span class="val">cạnh kề / cạnh huyền</span></div>
  <div class="frow"><span class="lbl">\\(\\tan\\alpha\\)</span><span class="val">cạnh đối / cạnh kề \\(=\\dfrac{\\sin\\alpha}{\\cos\\alpha}\\)</span></div>
  <div class="frow"><span class="lbl">\\(\\cot\\alpha\\)</span><span class="val">cạnh kề / cạnh đối \\(=\\dfrac{\\cos\\alpha}{\\sin\\alpha}\\)</span></div>
</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Hệ thức cơ bản</span><span class="val">\\(\\sin^2\\alpha+\\cos^2\\alpha=1\\)</span></div>
  <div class="frow"><span class="lbl">Quan hệ bù nhau</span><span class="val">\\(\\sin\\alpha=\\cos(90°-\\alpha)\\)</span></div>
  <div class="frow"><span class="lbl">Quan hệ bù nhau</span><span class="val">\\(\\tan\\alpha=\\cot(90°-\\alpha)\\)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">3. Bảng giá trị đặc biệt</div>
${tbl('<table class="kbt"><tr><th>Góc</th><th>\\(30°\\)</th><th>\\(45°\\)</th><th>\\(60°\\)</th></tr><tr><td>\\(\\sin\\)</td><td>\\(\\dfrac{1}{2}\\)</td><td>\\(\\dfrac{\\sqrt{2}}{2}\\)</td><td>\\(\\dfrac{\\sqrt{3}}{2}\\)</td></tr><tr><td>\\(\\cos\\)</td><td>\\(\\dfrac{\\sqrt{3}}{2}\\)</td><td>\\(\\dfrac{\\sqrt{2}}{2}\\)</td><td>\\(\\dfrac{1}{2}\\)</td></tr><tr><td>\\(\\tan\\)</td><td>\\(\\dfrac{\\sqrt{3}}{3}\\)</td><td>\\(1\\)</td><td>\\(\\sqrt{3}\\)</td></tr><tr><td>\\(\\cot\\)</td><td>\\(\\sqrt{3}\\)</td><td>\\(1\\)</td><td>\\(\\dfrac{\\sqrt{3}}{3}\\)</td></tr></table>')}
</div>

<div class="cb"><div class="cb-heading">4. Ứng dụng — Giải tam giác vuông</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Biết cạnh huyền + góc</span><span class="val">cạnh đối \\(=c\\sin\\alpha\\); cạnh kề \\(=c\\cos\\alpha\\)</span></div>
  <div class="frow"><span class="lbl">Biết 2 cạnh → góc</span><span class="val">\\(\\tan\\alpha=\\dfrac{\\text{đối}}{\\text{kề}}\\Rightarrow\\alpha\\) tra bảng hoặc máy tính</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ thực tế:</strong> Thang dài 5m dựa vào tường, chân thang cách tường 3m. Góc thang với mặt đất:<br>
  \\(\\cos\\alpha=\\dfrac{3}{5}=0{,}6\\Rightarrow\\alpha\\approx53°8'\\).
</div>
</div>`,

'duong-tron': `
<div class="cb"><div class="cb-heading">1. Đường tròn — Định nghĩa & Công thức</div>
<div class="defbox">
  Đường tròn \\((O;R)\\): tập hợp các điểm cách \\(O\\) một khoảng \\(R\\).
</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Chu vi</span><span class="val">\\(C=2\\pi R\\)</span></div>
  <div class="frow"><span class="lbl">Diện tích</span><span class="val">\\(S=\\pi R^2\\)</span></div>
  <div class="frow"><span class="lbl">Cung \\(n°\\)</span><span class="val">Độ dài cung: \\(l=\\dfrac{\\pi R n}{180}\\)</span></div>
  <div class="frow"><span class="lbl">Hình quạt \\(n°\\)</span><span class="val">Diện tích: \\(S_{quạt}=\\dfrac{\\pi R^2 n}{360}\\)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">2. Quan hệ đường thẳng & đường tròn</div>
${tbl('<table class="kbt"><tr><th>Quan hệ</th><th>Điều kiện (\\(d\\) = khoảng cách tâm đến đường thẳng)</th></tr><tr><td>Cắt nhau (2 điểm chung)</td><td>\\(d < R\\)</td></tr><tr><td>Tiếp xúc (1 điểm chung)</td><td>\\(d = R\\)</td></tr><tr><td>Không giao (0 điểm chung)</td><td>\\(d > R\\)</td></tr></table>')}
<div class="fbox amber">
  <strong>Tính chất dây:</strong> Dây \\(AB=8\\;\\text{cm}\\), khoảng cách \\(O\\) đến \\(AB\\) là \\(d=3\\;\\text{cm}\\).<br>
  \\(R^2=d^2+\\left(\\dfrac{AB}{2}\\right)^2=9+16=25\\Rightarrow R=5\\;\\text{cm}\\).
</div>
</div>

<div class="cb"><div class="cb-heading">3. Tiếp tuyến đường tròn</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Định nghĩa</span><span class="val">Đường thẳng có đúng 1 điểm chung với đường tròn</span></div>
  <div class="frow"><span class="lbl">Tính chất</span><span class="val">Tiếp tuyến \\(\\perp\\) bán kính tại tiếp điểm</span></div>
  <div class="frow"><span class="lbl">Hai tiếp tuyến từ ngoài</span><span class="val">\\(MA=MB\\) (\\(M\\) ngoài đường tròn, \\(A,B\\) tiếp điểm)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">4. Góc nội tiếp — Góc ở tâm</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Góc ở tâm</span><span class="val">= số đo cung bị chắn</span></div>
  <div class="frow"><span class="lbl">Góc nội tiếp</span><span class="val">= \\(\\dfrac{1}{2}\\) số đo cung bị chắn</span></div>
  <div class="frow"><span class="lbl">Góc nội tiếp chắn nửa đường tròn</span><span class="val">= \\(90°\\)</span></div>
</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Góc tạo bởi TT và dây</span><span class="val">= góc nội tiếp chắn cùng cung</span></div>
  <div class="frow"><span class="lbl">Góc có đỉnh trong đường tròn</span><span class="val">= \\(\\dfrac{1}{2}\\)(cung lớn + cung nhỏ)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">5. Tứ giác nội tiếp</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Điều kiện</span><span class="val">4 đỉnh cùng thuộc 1 đường tròn</span></div>
  <div class="frow"><span class="lbl">Tính chất 1</span><span class="val">Hai góc đối bù: \\(\\widehat{A}+\\widehat{C}=180°\\), \\(\\widehat{B}+\\widehat{D}=180°\\)</span></div>
  <div class="frow"><span class="lbl">Dấu hiệu nhận biết</span><span class="val">Hai góc đối bù HOẶC cùng nhìn một cạnh dưới góc bằng nhau</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(ABCD\\) nội tiếp, \\(\\widehat{A}=70°,\\widehat{B}=80°\\).<br>
  \\(\\widehat{C}=180°-70°=110°\\); \\(\\widehat{D}=180°-80°=100°\\).
</div>
</div>`,

'hinh-khong-gian': `
<div class="cb"><div class="cb-heading">1. Hình trụ</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Diện tích xq</span><span class="val">\\(S_{xq}=2\\pi Rh\\)</span></div>
  <div class="frow"><span class="lbl">Diện tích toàn phần</span><span class="val">\\(S_{tp}=2\\pi R(h+R)\\)</span></div>
  <div class="frow"><span class="lbl">Thể tích</span><span class="val">\\(V=\\pi R^2h\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(R=3\\;\\text{cm},\\;h=7\\;\\text{cm}\\).<br>
  \\(V=\\pi\\times9\\times7=63\\pi\\approx197{,}9\\;\\text{cm}^3\\).
</div>
</div>

<div class="cb"><div class="cb-heading">2. Hình nón</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đường sinh</span><span class="val">\\(l=\\sqrt{R^2+h^2}\\)</span></div>
  <div class="frow"><span class="lbl">Diện tích xq</span><span class="val">\\(S_{xq}=\\pi Rl\\)</span></div>
  <div class="frow"><span class="lbl">Diện tích toàn phần</span><span class="val">\\(S_{tp}=\\pi R(l+R)\\)</span></div>
  <div class="frow"><span class="lbl">Thể tích</span><span class="val">\\(V=\\dfrac{1}{3}\\pi R^2h\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(R=6,h=8\\Rightarrow l=\\sqrt{36+64}=10\\).<br>
  \\(S_{tp}=\\pi\\cdot6\\cdot(10+6)=96\\pi\\approx301{,}6\\;\\text{cm}^2\\).
</div>
</div>

<div class="cb"><div class="cb-heading">3. Hình cầu</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Diện tích mặt cầu</span><span class="val">\\(S=4\\pi R^2\\)</span></div>
  <div class="frow"><span class="lbl">Thể tích</span><span class="val">\\(V=\\dfrac{4}{3}\\pi R^3\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> Quả bóng \\(R=10\\;\\text{cm}\\).<br>
  \\(S=4\\pi\\times100=400\\pi\\approx1256\\;\\text{cm}^2\\).<br>
  \\(V=\\dfrac{4}{3}\\pi\\times1000\\approx4189\\;\\text{cm}^3\\).
</div>
</div>

<div class="cb"><div class="cb-heading">4. Bảng tổng hợp</div>
${tbl('<table class="kbt"><tr><th>Hình</th><th>\\(S_{tp}\\)</th><th>\\(V\\)</th></tr><tr><td>Trụ (\\(R,h\\))</td><td>\\(2\\pi R(h+R)\\)</td><td>\\(\\pi R^2h\\)</td></tr><tr><td>Nón (\\(R,h,l\\))</td><td>\\(\\pi R(l+R)\\)</td><td>\\(\\dfrac{1}{3}\\pi R^2h\\)</td></tr><tr><td>Cầu (\\(R\\))</td><td>\\(4\\pi R^2\\)</td><td>\\(\\dfrac{4}{3}\\pi R^3\\)</td></tr></table>')}
<div class="note">
  <strong>Mẹo nhớ:</strong> Hình nón = \\(\\dfrac{1}{3}\\) hình trụ cùng đáy cùng chiều cao.
</div>
</div>`,

'bdt': `
<div class="cb"><div class="cb-heading">1. Bất đẳng thức cơ bản</div>
<div class="fbox">
  <div class="frow"><span class="lbl">BĐT tam giác</span><span class="val">\\(|a-b|\\leq a+b\\) với \\(a,b\\geq0\\)</span></div>
  <div class="frow"><span class="lbl">Bình phương không âm</span><span class="val">\\(a^2\\geq0\\), dấu \\(=\\) khi \\(a=0\\)</span></div>
  <div class="frow"><span class="lbl">\\((a-b)^2\\geq0\\)</span><span class="val">\\(\\Leftrightarrow a^2+b^2\\geq2ab\\)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">2. Bất đẳng thức Cô-si (AM-GM)</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">2 số không âm</span><span class="val">\\(\\dfrac{a+b}{2}\\geq\\sqrt{ab}\\) hay \\(a+b\\geq2\\sqrt{ab}\\)</span></div>
  <div class="frow"><span class="lbl">Dấu \\(=\\) khi</span><span class="val">\\(a=b\\)</span></div>
  <div class="frow"><span class="lbl">3 số không âm</span><span class="val">\\(\\dfrac{a+b+c}{3}\\geq\\sqrt[3]{abc}\\)</span></div>
  <div class="frow"><span class="lbl">Dạng hay dùng</span><span class="val">\\(x+\\dfrac{k}{x}\\geq2\\sqrt{k}\\) với \\(x>0,k>0\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ 1:</strong> Tìm GTNN của \\(f(x)=x+\\dfrac{9}{x}+6\\;(x>0)\\).<br>
  AM-GM: \\(x+\\dfrac{9}{x}\\geq2\\sqrt{9}=6\\Rightarrow f(x)\\geq12\\).<br>
  Dấu \\(=\\) khi \\(x=3\\). Vậy \\(\\min f=12\\).
</div>
<div class="fbox amber">
  <strong>Ví dụ 2:</strong> \\(x,y>0,x+y=2\\). GTNN của \\(P=\\dfrac{1}{x}+\\dfrac{1}{y}\\).<br>
  \\(P=\\dfrac{x+y}{xy}=\\dfrac{2}{xy}\\). AM-GM: \\(xy\\leq\\left(\\dfrac{x+y}{2}\\right)^2=1\\Rightarrow P\\geq2\\).<br>
  Dấu \\(=\\) khi \\(x=y=1\\).
</div>
</div>

<div class="cb"><div class="cb-heading">3. Bất đẳng thức Bunhiacopski (BCS)</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Dạng chuẩn</span><span class="val">\\((a_1b_1+a_2b_2)^2\\leq(a_1^2+a_2^2)(b_1^2+b_2^2)\\)</span></div>
  <div class="frow"><span class="lbl">Tổng quát</span><span class="val">\\(\\left(\\sum a_ib_i\\right)^2\\leq\\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right)\\)</span></div>
  <div class="frow"><span class="lbl">Dấu \\(=\\) khi</span><span class="val">\\(\\dfrac{a_1}{b_1}=\\dfrac{a_2}{b_2}=\\cdots\\)</span></div>
</div>
<div class="fbox amber">
  <strong>Ví dụ:</strong> \\(x+y+z=1,x,y,z>0\\). Tìm GTNN của \\(P=\\dfrac{1}{x}+\\dfrac{4}{y}+\\dfrac{9}{z}\\).<br>
  BCS: \\((x+y+z)\\cdot P\\geq(1+2+3)^2=36\\Rightarrow P\\geq36\\).<br>
  Dấu \\(=\\) khi \\(\\dfrac{x}{1}=\\dfrac{y}{2}=\\dfrac{z}{3}\\Rightarrow x=\\tfrac{1}{6},y=\\tfrac{1}{3},z=\\tfrac{1}{2}\\).
</div>
</div>

<div class="cb"><div class="cb-heading">4. Chiến lược chứng minh BĐT</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Biến đổi tương đương</span><span class="val">Biến đổi về BĐT đã biết</span></div>
  <div class="frow"><span class="lbl">Dùng \\((a-b)^2\\geq0\\)</span><span class="val">Mở rộng và nhóm</span></div>
  <div class="frow"><span class="lbl">Dùng AM-GM</span><span class="val">Tìm dấu \\(=\\) để xác định min/max</span></div>
  <div class="frow"><span class="lbl">Dùng BCS</span><span class="val">Khi có dạng tổng \\(\\dfrac{a^2}{x}+\\dfrac{b^2}{y}+...\\)</span></div>
</div>
<div class="note">
  <strong>Quan trọng:</strong> Sau khi tìm min/max bằng BĐT, phải kiểm tra dấu \\(=\\) có đạt được không (tìm \\(x,y,...\\) cụ thể thỏa mãn điều kiện đề bài).
</div>
</div>`,

};

const BASE_EXERCISES={
easy:[
  {id:'e1', title:'HĐT_1',      topic:'Hằng đẳng thức', grade:8, q:'Khai triển: \\((x+3)^2\\)',                                                         hint:'Áp dụng HĐT số 1: \\((a+b)^2=a^2+2ab+b^2\\)',                                   ans:'\\((x+3)^2=x^2+6x+9\\)'},
  {id:'e2', title:'HĐT_2',      topic:'Hằng đẳng thức', grade:8, q:'Khai triển: \\((2x-1)^2\\)',                                                         hint:'Áp dụng HĐT số 2: \\((a-b)^2=a^2-2ab+b^2\\)',                                   ans:'\\((2x-1)^2=4x^2-4x+1\\)'},
  {id:'e3', title:'HĐT_3',      topic:'Hằng đẳng thức', grade:8, q:'Tính nhanh: \\(99^2\\)',                                                             hint:'Viết \\(99=100-1\\), dùng HĐT bình phương hiệu',                                 ans:'\\(99^2=(100-1)^2=10000-200+1=9801\\)'},
  {id:'e4', title:'CanThuc_1',  topic:'Căn thức',        grade:9, q:'Tìm điều kiện xác định của \\(\\sqrt{2x-6}\\)',                                      hint:'\\(\\sqrt{A}\\) xác định khi \\(A\\geq0\\)',                                     ans:'\\(2x-6\\geq0\\Rightarrow x\\geq3\\)'},
  {id:'e5', title:'CanThuc_2',  topic:'Căn thức',        grade:9, q:'Rút gọn: \\(\\sqrt{12}-\\sqrt{27}+\\sqrt{48}\\)',                                   hint:'Đưa về dạng \\(k\\sqrt{3}\\)',                                                   ans:'\\(2\\sqrt{3}-3\\sqrt{3}+4\\sqrt{3}=3\\sqrt{3}\\)'},
  {id:'e6', title:'PTBac2_1',   topic:'PT bậc 2',        grade:9, q:'Giải phương trình: \\(x^2-5x+6=0\\)',                                               hint:'Tính \\(\\Delta=b^2-4ac\\), hoặc nhẩm nghiệm tổng 5 tích 6',                    ans:'\\(\\Delta=1>0\\)<br>\\(x_1=3,\\quad x_2=2\\)'},
  {id:'e7', title:'PTBac2_2',   topic:'PT bậc 2',        grade:9, q:'Giải phương trình: \\(x^2-4=0\\)',                                                  hint:'Phân tích: \\(x^2-4=(x-2)(x+2)\\)',                                             ans:'\\(x=2\\) hoặc \\(x=-2\\)'},
  {id:'e8', title:'ThongKe_1',  topic:'Thống kê',        grade:7, q:'Tập dữ liệu: 2, 3, 5, 7, 7, 9. Tính trung bình cộng và mốt.',                      hint:'\\(\\bar{x}=\\dfrac{\\text{tổng}}{n}\\); Mốt là giá trị xuất hiện nhiều nhất',  ans:'\\(\\bar{x}=\\dfrac{33}{6}=5{,}5\\)<br>Mốt \\(M_0=7\\)'},
  {id:'e9', title:'LuongGiac_1',topic:'Lượng giác',      grade:9, q:'Tam giác \\(ABC\\) vuông tại \\(A\\), \\(BC=10\\), \\(AB=6\\). Tính \\(\\sin C\\).',hint:'\\(\\sin C=\\dfrac{AB}{BC}\\)',                                                   ans:'\\(\\sin C=\\dfrac{6}{10}=0{,}6\\)'},
  {id:'e10',title:'HinhKhoi_1', topic:'Hình khối',       grade:9, q:'Tính thể tích hình trụ có \\(R=3\\) cm, \\(h=7\\) cm.',                             hint:'\\(V=\\pi R^2h\\)',                                                               ans:'\\(V=63\\pi\\approx197{,}9\\) cm³'},
  {id:'e11',title:'TiLe_1',     topic:'Tỉ lệ thức',     grade:7, q:'Tìm \\(x\\) biết: \\(\\dfrac{x}{5}=\\dfrac{12}{20}\\)',                             hint:'Tích ngoại = tích nội',                                                          ans:'\\(x=\\dfrac{5\\times12}{20}=3\\)'},
  {id:'e12',title:'PhanSo_1',   topic:'Phân số',         grade:6, q:'Tính: \\(\\dfrac{2}{3}+\\dfrac{1}{4}\\)',                                           hint:'Quy đồng mẫu số: \\(\\text{BCNN}(3,4)=12\\)',                                   ans:'\\(\\dfrac{8}{12}+\\dfrac{3}{12}=\\dfrac{11}{12}\\)'},
],
med:[
  {id:'m1', title:'Viet_1',     topic:'Vi-ét',           grade:9, q:'PT \\(x^2-5x+4=0\\) có hai nghiệm \\(x_1,x_2\\). Tính \\(x_1^2+x_2^2\\).',        hint:'\\(x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2\\)',                                         ans:'\\(x_1^2+x_2^2=25-8=17\\)'},
  {id:'m2', title:'Viet_2',     topic:'Vi-ét',           grade:9, q:'PT \\(x^2-7x+10=0\\). Tính \\(|x_1-x_2|\\).',                                      hint:'\\((x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2\\)',                                        ans:'\\(|x_1-x_2|=\\sqrt{49-40}=3\\)'},
  {id:'m3', title:'CanThuc_3',  topic:'Căn thức',        grade:9, q:'Rút gọn: \\(\\dfrac{\\sqrt{x}-2}{x-4}\\) với \\(x>0,x\\neq4\\)',                    hint:'Phân tích: \\(x-4=(\\sqrt{x}-2)(\\sqrt{x}+2)\\)',                                ans:'\\(\\dfrac{1}{\\sqrt{x}+2}\\)'},
  {id:'m4', title:'CanThuc_4',  topic:'Căn thức',        grade:9, q:'Trục căn thức: \\(\\dfrac{3}{\\sqrt{5}-\\sqrt{2}}\\)',                               hint:'Nhân tử và mẫu với \\((\\sqrt{5}+\\sqrt{2})\\)',                                 ans:'\\(\\dfrac{3(\\sqrt{5}+\\sqrt{2})}{3}=\\sqrt{5}+\\sqrt{2}\\)'},
  {id:'m5', title:'HePT_1',     topic:'Hệ PT',           grade:8, q:'Giải hệ: \\(\\begin{cases}2x+y=7\\\\x-y=2\\end{cases}\\)',                          hint:'Cộng hai PT để khử \\(y\\)',                                                     ans:'\\(x=3,\\quad y=1\\)'},
  {id:'m6', title:'HamSo_1',    topic:'Hàm số',          grade:7, q:'Tìm \\(a,b\\) biết \\(y=ax+b\\) đi qua \\(A(1;3)\\) và \\(B(-1;-1)\\).',          hint:'Thế tọa độ từng điểm vào \\(y=ax+b\\)',                                          ans:'\\(a=2,\\quad b=1\\) → \\(y=2x+1\\)'},
  {id:'m7', title:'DuongTron_1',topic:'Đường tròn',      grade:9, q:'Đường tròn \\((O;R)\\), dây \\(AB=8\\) cm, khoảng cách từ \\(O\\) đến \\(AB\\) là 3 cm. Tính \\(R\\).', hint:'\\(R^2=OM^2+AM^2\\) với \\(M\\) là trung điểm \\(AB\\)',        ans:'\\(R^2=9+16=25\\Rightarrow R=5\\) cm'},
  {id:'m8', title:'HeThuLuong_1',topic:'Hệ thức lượng', grade:9, q:'Tam giác vuông tại \\(A\\), đường cao \\(AH\\). Biết \\(BH=4\\), \\(HC=9\\). Tính \\(AH\\) và \\(AB\\).', hint:'\\(AH^2=BH\\cdot HC\\); \\(AB^2=BC\\cdot BH\\)',             ans:'\\(AH=6\\quad AB=2\\sqrt{13}\\)'},
  {id:'m9', title:'Parabol_1',  topic:'Hàm số bậc 2',   grade:9, q:'Cho \\(y=2x^2\\). Điền bảng giá trị tại \\(x\\in\\{-2,-1,0,1,2\\}\\) rồi vẽ parabol.',hint:'\\(y=2x^2\\geq0\\); điểm đỉnh là \\((0,0)\\)',                              ans:'\\(y: 8,\\;2,\\;0,\\;2,\\;8\\). Parabol lõm lên, đỉnh \\(O(0,0)\\).'},
  {id:'m10',title:'PhanTich_1', topic:'Phân tích nhân tử',grade:8,q:'Phân tích: \\(x^3-3x^2+3x-1\\)',                                                   hint:'Nhận dạng HĐT lập phương hiệu với \\(a=x,b=1\\)',                               ans:'\\((x-1)^3\\)'},
],
hard:[
  {id:'h1', title:'Viet_3',     topic:'PT bậc 2 + Vi-ét',grade:9,q:'PT \\(x^2-(m+1)x+m=0\\). Tìm \\(m\\) để PT có hai nghiệm dương phân biệt.',        hint:'Cần: \\(\\Delta>0\\); \\(x_1+x_2>0\\); \\(x_1x_2>0\\)',                          ans:'\\(m>0\\) và \\(m\\neq1\\)'},
  {id:'h2', title:'Viet_4',     topic:'PT bậc 2 + Vi-ét',grade:9,q:'PT \\(x^2-2(m-1)x+m^2-3m=0\\). Tìm \\(m\\) để \\(x_1^2+x_2^2=10\\).',             hint:'\\(x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2\\)',                                        ans:'\\(4(m-1)^2-2(m^2-3m)=10\\Rightarrow m=\\pm\\sqrt{...}\\) → \\(m=3\\) hoặc \\(m=-\\frac{1}{2}\\) (kiểm tra \\(\\Delta\\geq0\\))'},
  {id:'h3', title:'CanThuc_5',  topic:'Căn thức nâng cao',grade:9,q:'Rút gọn: \\(P=\\dfrac{\\sqrt{x}+1}{\\sqrt{x}-1}-\\dfrac{\\sqrt{x}-1}{\\sqrt{x}+1}-\\dfrac{4}{1-x}\\) với \\(x\\geq0,x\\neq1\\)', hint:'Quy đồng mẫu \\((x-1)\\), chú ý \\(1-x=-(x-1)\\)', ans:'\\(P=\\dfrac{4}{\\sqrt{x}-1}\\)'},
  {id:'h4', title:'AM-GM_1',    topic:'AM-GM',           grade:9, q:'Cho \\(x,y>0\\) và \\(x+y=2\\). Tìm GTNN của \\(P=\\dfrac{1}{x}+\\dfrac{1}{y}\\).',hint:'\\(P=\\dfrac{2}{xy}\\). Tìm GTLN của \\(xy\\) theo AM-GM.',                     ans:'\\(\\min P=2\\) khi \\(x=y=1\\)'},
  {id:'h5', title:'AM-GM_2',    topic:'AM-GM',           grade:9, q:'Cho \\(x>0\\). Tìm GTNN của \\(f(x)=x+\\dfrac{9}{x}+6\\).',                        hint:'AM-GM: \\(x+\\dfrac{9}{x}\\geq 2\\sqrt{9}=6\\)',                                ans:'\\(\\min f=12\\) khi \\(x=3\\)'},
  {id:'h6', title:'NiTiep_1',   topic:'Tứ giác nội tiếp',grade:9,q:'Tứ giác \\(ABCD\\) nội tiếp. Biết \\(\\widehat{A}=70°,\\widehat{B}=80°\\). Tính \\(\\widehat{C}\\) và \\(\\widehat{D}\\).',hint:'Hai góc đối bù nhau',                   ans:'\\(\\widehat{C}=110°,\\quad\\widehat{D}=100°\\)'},
  {id:'h7', title:'HePT_2',     topic:'Hệ PT thực tế',  grade:9, q:'Hai vòi cùng chảy đầy bể sau 6 giờ. Vòi 1 một mình mất 10 giờ. Hỏi vòi 2 một mình mất bao lâu?',hint:'\\(\\dfrac{1}{10}+\\dfrac{1}{x}=\\dfrac{1}{6}\\)',             ans:'Vòi 2 mất <strong>15 giờ</strong>'},
  {id:'h8', title:'Parabol_2',  topic:'Parabol',         grade:9, q:'Tìm tọa độ giao điểm của \\(y=x^2\\) và \\(y=x+2\\).',                             hint:'Giải \\(x^2=x+2\\)',                                                             ans:'\\(x^2-x-2=0\\Rightarrow x=2\\) hoặc \\(x=-1\\)<br>Giao điểm: \\((2;4)\\) và \\((-1;1)\\)'},
  {id:'h9', title:'HinhKhoi_2', topic:'Hình khối',       grade:9, q:'Hình nón có \\(R=6\\), \\(h=8\\). Tính diện tích toàn phần.',                       hint:'Đường sinh \\(l=\\sqrt{R^2+h^2}\\), sau đó \\(S_{tp}=\\pi Rl+\\pi R^2\\)',      ans:'\\(l=10\\)<br>\\(S_{tp}=60\\pi+36\\pi=96\\pi\\approx301{,}6\\) cm²'},
],
pro:[
  {id:'p1', title:'BDT_1',      topic:'Chứng minh BĐT',  grade:9, q:'Cho \\(a,b,c>0\\), \\(a+b+c=3\\). Chứng minh: \\(a^2+b^2+c^2\\geq3\\).',          hint:'Khai triển \\((a-1)^2+(b-1)^2+(c-1)^2\\geq0\\)',                                ans:'\\((a-1)^2+(b-1)^2+(c-1)^2\\geq0\\)<br>\\(\\Leftrightarrow a^2+b^2+c^2\\geq2\\cdot3-3=3\\) ✓'},
  {id:'p2', title:'BCS_1',      topic:'BCS',             grade:9, q:'Cho \\(x,y,z>0\\), \\(x+y+z=1\\). Tìm GTNN của \\(P=\\dfrac{1}{x}+\\dfrac{4}{y}+\\dfrac{9}{z}\\).', hint:'BCS: \\((x+y+z)(\\frac{1}{x}+\\frac{4}{y}+\\frac{9}{z})\\geq(1+2+3)^2\\)', ans:'\\(\\min P=36\\) khi \\(x=\\tfrac{1}{6},y=\\tfrac{1}{3},z=\\tfrac{1}{2}\\)'},
  {id:'p3', title:'BDT_2',      topic:'AM-GM nâng cao',  grade:9, q:'Cho \\(a,b,c>0\\). Chứng minh: \\(\\dfrac{a}{b+c}+\\dfrac{b}{a+c}+\\dfrac{c}{a+b}\\geq\\dfrac{3}{2}\\).', hint:'Viết \\(\\dfrac{a}{b+c}=\\dfrac{a+b+c}{b+c}-1\\), rồi dùng BCS hoặc AM-GM.', ans:'Dùng BCS (Cauchy-Schwarz): tổng \\(\\geq\\dfrac{(a+b+c)^2}{a(b+c)+b(a+c)+c(a+b)}=\\dfrac{(a+b+c)^2}{2(ab+bc+ca)}\\geq\\dfrac{3}{2}\\) ✓'},
  {id:'p4', title:'Parabol_3',  topic:'Parabol',         grade:9, q:'(Đề chuyên) Cho \\((P):y=x^2\\) và \\((d):y=mx+1\\). Tìm \\(m\\) để \\((d)\\) cắt \\((P)\\) tại \\(A,B\\) với \\(AB=2\\sqrt{5}\\).', hint:'\\(|AB|^2=(1+m^2)(x_1-x_2)^2=(1+m^2)(m^2+4)\\)', ans:'\\((1+m^2)(m^2+4)=20\\Rightarrow m=\\pm\\sqrt{\\dfrac{-5+\\sqrt{89}}{2}}\\)'},
  {id:'p5', title:'HinhHoc_1',  topic:'Hình học chứng minh',grade:9,q:'(Đề chuyên) Cho tam giác \\(ABC\\) nội tiếp \\((O)\\), trực tâm \\(H\\). Chứng minh \\(\\overrightarrow{OH}=\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}\\).', hint:'Gọi \\(O\'\\) đối xứng \\(O\\) qua trung điểm \\(M\\) của \\(BC\\).', ans:'\\(\\overrightarrow{OO\'}=\\overrightarrow{OB}+\\overrightarrow{OC}\\). Chứng minh \\(AO\'\\perp BC\\) → \\(H\\equiv O\'\\) ✓'},
  {id:'p6', title:'BCS_2',      topic:'BCS nâng cao',    grade:9, q:'Cho \\(a^2+b^2+c^2=1\\). Tìm GTLN của \\(M=a+2b+3c\\).',                           hint:'BCS: \\((1^2+2^2+3^2)(a^2+b^2+c^2)\\geq(a+2b+3c)^2\\)',                        ans:'\\(M\\leq\\sqrt{14}\\), dấu \\(=\\) khi \\(\\dfrac{a}{1}=\\dfrac{b}{2}=\\dfrac{c}{3}\\)'},
  {id:'p7', title:'Viet_5',     topic:'PT bậc 2 chuyên', grade:9, q:'(Đề chuyên) PT \\(x^2-2(m+1)x+4m=0\\) có hai nghiệm \\(x_1,x_2\\). Tìm \\(m\\) để \\(\\dfrac{1}{x_1}+\\dfrac{1}{x_2}=1\\).', hint:'\\(\\dfrac{1}{x_1}+\\dfrac{1}{x_2}=\\dfrac{x_1+x_2}{x_1x_2}\\)', ans:'\\(\\dfrac{2(m+1)}{4m}=1\\Rightarrow m=2\\). Kiểm tra: \\(\\Delta=4(m-1)^2\\geq0\\) ✓'},
  
]};

/* ══════════ CHUYÊN ĐỀ ══════════ */
LESSONS['bat-bien'] = `
<div class="cb"><div class="cb-heading">1. Nguyên lý bất biến là gì?</div>
<div class="defbox">Trong nhiều bài toán (trò chơi, thao tác lặp trên bảng số, dãy số, hình vẽ...), một đối tượng liên tục bị biến đổi qua nhiều bước, nhưng tồn tại một đại lượng (tổng, hiệu, tích, số dư, tính chẵn lẻ, màu sắc, ...) không đổi — hoặc chỉ đổi theo quy luật xác định — trong suốt quá trình. Đại lượng đó gọi là <strong>bất biến</strong> của bài toán.</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Bước 1</span><span class="val">Phát hiện đại lượng bất biến ẩn trong bài toán (khó nhất, cần luyện tập nhiều)</span></div>
  <div class="frow"><span class="lbl">Bước 2</span><span class="val">Tính giá trị/tính chất của đại lượng đó ở trạng thái ban đầu và trạng thái cần xét, so sánh để kết luận</span></div>
</div>
<div class="note"><strong>Các loại bất biến thường gặp:</strong> tổng/hiệu/tích các số trên bảng; tính chẵn lẻ của tổng hoặc số các số âm; số dư khi chia cho một số cố định (2, 3, 4, 9, ...); cách tô màu xen kẽ (bàn cờ, hình quạt); bất biến dạng modulo kết hợp đại lượng đại số.</div>
</div>

<div class="cb"><div class="cb-heading">2. Ví dụ 1 — Bất biến là DẤU / TÍCH các số ±1</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Trên bảng viết 10 dấu cộng và 15 dấu trừ. Mỗi lần xóa 2 dấu bất kỳ, viết vào đó 1 dấu cộng nếu 2 dấu vừa xóa giống nhau, 1 dấu trừ nếu khác nhau. Sau 24 lần thao tác, trên bảng còn lại dấu gì?
</div>
<div class="fbox">
  Thay dấu cộng bởi số 1, dấu trừ bởi số \\(-1\\). Tích ban đầu: \\(1^{10}\\cdot(-1)^{15}=-1\\).<br>
  Khi xóa 2 số và thay bằng đúng tích của chúng, <strong>tích của tất cả các số còn lại trên bảng không đổi</strong>. Vậy sau 24 lần thao tác, tích vẫn bằng \\(-1\\).<br>
  <strong>Kết luận:</strong> dấu còn lại trên bảng là <strong>dấu trừ</strong>.
</div>
</div>

<div class="cb"><div class="cb-heading">3. Ví dụ 2 — Bất biến là TÍNH CHẴN LẺ của tổng</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Cho \\(n\\) lẻ. Viết các số từ 1 đến \\(2n\\) lên bảng. Chọn 2 số \\(a,b\\) bất kỳ rồi thay bằng \\(|a-b|\\). Chứng minh số cuối cùng còn lại là số lẻ.
</div>
<div class="fbox">
  Tổng ban đầu \\(S=1+2+\\cdots+2n=n(2n+1)\\) là số lẻ vì \\(n\\) lẻ.<br>
  Mỗi lần thay \\(a>b\\) bởi \\(|a-b|=a-b\\), tổng giảm đi \\(2b\\) (số chẵn) \\(\\Rightarrow\\) <strong>tính chẵn lẻ của tổng không đổi</strong>.<br>
  Vì tổng ban đầu lẻ nên số cuối cùng còn lại (chính là tổng lúc đó) là số lẻ. (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">4. Ví dụ 3 — Chẵn lẻ kết hợp số phần tử</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Các số 2, 8, 1, 0, 1, 9, 9, 5 viết trên vòng tròn. Mỗi lần chọn 2 số cạnh nhau và cộng thêm 1 vào mỗi số. Các số trên vòng tròn có thể đều bằng nhau không?
</div>
<div class="fbox">
  Tổng ban đầu \\(=2+8+1+0+1+9+9+5=35\\) (lẻ). Mỗi thao tác tổng tăng thêm 2 \\(\\Rightarrow\\) tổng luôn lẻ.<br>
  Có 8 số (chẵn); nếu tất cả bằng \\(k\\) thì tổng \\(=8k\\) (chẵn) — mâu thuẫn.<br>
  <strong>Kết luận:</strong> không thể.
</div>
</div>

<div class="cb"><div class="cb-heading">5. Ví dụ 4 — Bất biến là số dư khi chia cho 5</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Một tờ giấy bị cắt thành 6 mảnh hoặc 11 mảnh, các mảnh có thể tiếp tục cắt tương tự. Có thể nhận được 2005 mảnh không?
</div>
<div class="fbox">
  Mỗi lần cắt, số mảnh tăng thêm 5 (cắt 1→6) hoặc 10 (cắt 1→11) — đều là bội của 5.<br>
  Số mảnh luôn có dạng \\(1+5k\\). Vì \\(2005=5\\times401\\) có dạng \\(5k\\) (không phải \\(5k+1\\)) \\(\\Rightarrow\\) <strong>không thể</strong>.
</div>
</div>

<div class="cb"><div class="cb-heading">6. Ví dụ 5 — Số dư chia cho 9, tính tuần hoàn</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Mỗi số trong dãy \\(2^1,2^2,\\ldots,2^{2005}\\) được thay bởi tổng các chữ số của nó, lặp lại tới khi còn 1 chữ số. Chứng minh số các số 2 nhiều hơn số các số 1.
</div>
<div class="fbox">
  Một số và tổng các chữ số của nó có cùng số dư khi chia cho 9. Số dư của \\(2^k \\bmod 9\\) tuần hoàn chu kỳ 6: \\(2,4,8,7,5,1,\\ldots\\)<br>
  Vì \\(2005=334\\times6+1\\), dư "2" xuất hiện 335 lần, các dư khác đúng 334 lần \\(\\Rightarrow\\) số 2 nhiều hơn số 1 đúng 1 lần. (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">7. Ví dụ 6 — Tô màu xen kẽ</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Hình tròn chia 10 ô hình quạt, mỗi ô 1 viên bi. Mỗi lần lấy 2 ô bất kỳ, chuyển mỗi viên sang ô liền kề theo 2 chiều ngược nhau. Có thể dồn hết bi về 1 ô không?
</div>
<div class="fbox">
  Tô xen kẽ 5 ô màu, 5 ô trắng. Xét tổng số bi ở 5 ô màu: mọi thao tác chỉ làm tổng đó không đổi hoặc thay đổi \\(\\pm2\\) \\(\\Rightarrow\\) <strong>tính chẵn lẻ không đổi</strong>.<br>
  Ban đầu tổng \\(=5\\) (lẻ) nên luôn lẻ, do đó luôn khác 0 và khác 10. <strong>Kết luận:</strong> không thể.
</div>
</div>

<div class="note"><strong>Ghi chú chung:</strong> Khi giải bằng nguyên lý bất biến, thử lần lượt các loại bất biến phổ biến (tổng, hiệu, tích, số dư, chẵn lẻ, tô màu), kiểm tra đại lượng đó có thực sự không đổi (hoặc đổi theo quy luật) qua mỗi bước, rồi so sánh trạng thái đầu và trạng thái cần xét.</div>`;

LESSONS['dirichlet'] = `
<div class="cb"><div class="cb-heading">1. Nội dung nguyên lý (chuồng - thỏ)</div>
<div class="defbox">Nếu nhốt \\(n\\cdot m+r\\) con thỏ (\\(m,n,r\\) nguyên dương) vào \\(n\\) cái chuồng thì phải có ít nhất một chuồng chứa không ít hơn \\(m+1\\) con thỏ.</div>
<div class="fbox amber">
  <strong>Trường hợp hay dùng nhất:</strong> nếu nhốt \\(n+1\\) con thỏ vào \\(n\\) cái chuồng thì tồn tại ít nhất một chuồng chứa từ 2 con thỏ trở lên.
</div>
<div class="fbox">
  <strong>Chứng minh:</strong> Giả sử mỗi chuồng chứa không quá \\(m\\) con thỏ. Khi đó tổng số thỏ \\(\\le m\\cdot n\\), mâu thuẫn với tổng thỏ \\(=mn+r\\). Vậy phải có một chuồng chứa \\(\\ge m+1\\) con.
</div>
<div class="note"><strong>Nhận xét quan trọng:</strong> Cái khó là phát hiện "chất Dirichlet" ẩn trong bài — xác định đâu là "thỏ" (đối tượng phân chia) và đâu là "chuồng" (nhóm/khả năng). Nhiều bài phải khéo léo "xây chuồng, tạo thỏ" trước khi áp dụng. Nguyên tắc: số thỏ luôn phải nhiều hơn số chuồng (thường hơn đúng 1) để đảm bảo có chuồng chứa \\(\\ge2\\) thỏ.</div>
<div class="fbox green">
  <strong>Dạng mở rộng:</strong> Nếu có \\(m\\) vật đặt vào \\(n\\) ngăn kéo và \\(m>k\\cdot n\\) thì có ít nhất một ngăn kéo chứa \\(\\ge k+1\\) vật.
</div>
</div>

<div class="cb"><div class="cb-heading">2. Dạng 1 — Toán chia hết</div>
<div class="fbox">Khi chia số \\(a\\) cho \\(m\\ne0\\), số dư nhận 1 trong \\(m\\) giá trị \\(0,\\ldots,m-1\\) ("\\(m\\) chuồng"). Chia \\(m+1\\) số khác nhau cho \\(m\\) ("\\(m+1\\) thỏ") luôn có 2 số cùng số dư \\(\\Rightarrow\\) hiệu của chúng chia hết cho \\(m\\).</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Chứng minh tồn tại số dạng \\(1978\\,1978\\ldots1978\\,0\\ldots0\\) (một số nhóm "1978" nối tiếp, sau đó là một số chữ số 0) chia hết cho 2012.
</div>
<div class="fbox">
  Xét 2013 số \\(a_k=\\) (\\(k\\) nhóm "1978" nối tiếp), \\(k=1,\\ldots,2013\\). Chia cho 2012 chỉ có tối đa 2012 số dư \\(\\Rightarrow\\) tồn tại \\(a_m,a_n\\) (\\(m>n\\)) cùng số dư. Khi đó \\(a_m-a_n\\) chia hết cho 2012, và hiệu này chính là \\((m-n)\\) nhóm "1978" theo sau bởi các chữ số 0 — đúng dạng cần tìm. (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">3. Dạng 2 — Toán suy luận</div>
<div class="fbox">"Chuồng" là các giá trị một đại lượng có thể nhận (số trận đã đấu, số người quen...), "thỏ" là các đối tượng (đội, học sinh...). Nhiều khi 2 giá trị biên loại trừ nhau khiến số chuồng giảm 1.</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> 10 đội thi đấu vòng tròn 1 lượt. Chứng minh vào bất cứ thời điểm nào cũng có 2 đội đã đấu số trận bằng nhau.
</div>
<div class="fbox">
  Số trận mỗi đội đã đấu \\(\\in\\{0,\\ldots,9\\}\\) (10 khả năng), nhưng không thể vừa có đội đấu đủ 9 trận vừa có đội chưa đấu trận nào (2 đội đó phải đấu với nhau). Nên thực chất chỉ 9 khả năng (9 chuồng) cho 10 đội (10 thỏ) \\(\\Rightarrow\\) tồn tại 2 đội cùng số trận. (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">4. Dạng 3 — Sự tương hỗ</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Cho 5 người tùy ý (quen nhau có tính đối xứng). Chứng minh có ít nhất 2 người có số người quen bằng nhau.
</div>
<div class="fbox">
  Số người quen mỗi người \\(\\in\\{0,\\ldots,4\\}\\) (5 khả năng), nhưng 0 và 4 không thể cùng xuất hiện (người quen 0 người thì không ai quen đủ 4 người). Còn 4 chuồng cho 5 người \\(\\Rightarrow\\) tồn tại 2 người cùng số người quen. (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">5. Dạng 4 — Sự sắp xếp</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Viết 16 số thuộc \\(\\{1,2,3,4\\}\\), ghép thành 8 cặp. Chứng minh tồn tại 2 cặp có tổng bằng nhau.
</div>
<div class="fbox">
  Tổng mỗi cặp \\(\\in[2,8]\\): 7 giá trị có thể (7 chuồng), có 8 cặp (8 thỏ) \\(\\Rightarrow\\) tồn tại 2 cặp cùng tổng. (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">6. Dạng 5 — Bài toán hình học</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> Trong tam giác đều cạnh 4, lấy 17 điểm. Chứng minh có 2 điểm cách nhau \\(\\le1\\).
</div>
<div class="fbox">
  Chia tam giác cạnh 4 thành 16 tam giác đều cạnh 1 (chia đều mỗi cạnh làm 4 phần). Vì \\(17>16\\), có ít nhất 1 tam giác nhỏ chứa \\(\\ge2\\) điểm; khoảng cách 2 điểm trong tam giác cạnh 1 luôn \\(\\le1\\). (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">7. Dạng 6 — Sự trùng lặp (Dirichlet mở rộng)</div>
<div class="fbox amber">
  <strong>Bài toán:</strong> 45 học sinh làm bài, không ai dưới điểm 2, chỉ 2 học sinh điểm 10. Chứng minh có ít nhất 6 học sinh cùng điểm.
</div>
<div class="fbox">
  Loại 2 học sinh điểm 10, còn 43 học sinh có điểm \\(\\in\\{2,\\ldots,9\\}\\): 8 loại điểm (8 chuồng) cho 43 học sinh (43 thỏ). Vì \\(43=8\\times5+3\\), theo Dirichlet mở rộng có ít nhất \\(5+1=6\\) học sinh cùng điểm. (đpcm)
</div>
</div>

<div class="note"><strong>Ghi chú chung — các bước áp dụng:</strong> (1) Xác định rõ "thỏ" và "chuồng" (xây dựng nếu chưa có sẵn); (2) Đếm số thỏ, số chuồng, kiểm tra số thỏ \\(>k\\times\\) số chuồng; (3) Áp dụng nguyên lý Dirichlet (cơ bản hoặc mở rộng) để kết luận.</div>`;

LESSONS['dong-du'] = `
<div class="cb"><div class="cb-heading">1. Định nghĩa</div>
<div class="defbox">Cho \\(m>0\\) nguyên. Nếu \\(a,b\\) chia cho \\(m\\) có cùng số dư thì \\(a\\) đồng dư \\(b\\) theo mô-đun \\(m\\): \\(a\\equiv b\\pmod m\\).</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Tương đương</span><span class="val">\\(a\\equiv b\\pmod m \\Leftrightarrow (a-b)\\vdots m \\Leftrightarrow \\exists t\\in\\mathbb{Z}: a=b+mt\\)</span></div>
  <div class="frow"><span class="lbl">Không đồng dư</span><span class="val">Ký hiệu \\(a\\not\\equiv b\\pmod m\\)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">2. Các tính chất cơ bản</div>
<div class="fbox">
  <div class="frow"><span class="lbl">1. Phản xạ</span><span class="val">\\(a\\equiv a\\pmod m\\)</span></div>
  <div class="frow"><span class="lbl">2. Đối xứng</span><span class="val">\\(a\\equiv b\\Rightarrow b\\equiv a\\pmod m\\)</span></div>
  <div class="frow"><span class="lbl">3. Bắc cầu</span><span class="val">\\(a\\equiv b,\\ b\\equiv c\\Rightarrow a\\equiv c\\pmod m\\)</span></div>
  <div class="frow"><span class="lbl">4. Cộng/trừ</span><span class="val">\\(a\\equiv b,\\ c\\equiv d\\Rightarrow a\\pm c\\equiv b\\pm d\\pmod m\\)</span></div>
  <div class="frow"><span class="lbl">5. Nhân với \\(k\\)</span><span class="val">\\(a\\equiv b\\Rightarrow ka\\equiv kb\\pmod m\\); nhân cả mô-đun: \\(ka\\equiv kb\\pmod{km}\\)</span></div>
  <div class="frow"><span class="lbl">6. Nhân từng vế</span><span class="val">\\(a\\equiv b,\\ c\\equiv d\\Rightarrow ac\\equiv bd\\pmod m\\)</span></div>
  <div class="frow"><span class="lbl">7. Nâng lũy thừa</span><span class="val">\\(a\\equiv b\\Rightarrow a^k\\equiv b^k\\pmod m\\)</span></div>
  <div class="frow"><span class="lbl">8. Nhiều mô-đun</span><span class="val">Đồng dư theo \\(m_1,\\ldots,m_k\\) \\(\\Rightarrow\\) đồng dư theo \\(\\text{BCNN}(m_1,\\ldots,m_k)\\); nếu đôi một nguyên tố cùng nhau thì theo \\(m_1m_2\\cdots m_k\\)</span></div>
  <div class="frow"><span class="lbl">9. Ước chung</span><span class="val">\\(a\\equiv b\\pmod m\\Rightarrow(a,m)=(b,m)\\)</span></div>
  <div class="frow"><span class="lbl">10. Chia cho ước chung \\(k\\)</span><span class="val">\\(\\dfrac{a}{k}\\equiv\\dfrac{b}{k}\\pmod{m/k}\\); nếu \\(ac\\equiv bc\\pmod m\\) thì \\(a\\equiv b\\pmod{m/(c,m)}\\)</span></div>
</div>
</div>

<div class="cb"><div class="cb-heading">3. Ba định lý quan trọng (thừa nhận)</div>
<div class="fbox amber">
  <div class="frow"><span class="lbl">Fermat bé</span><span class="val">\\(p\\) nguyên tố: \\(a^p\\equiv a\\pmod p\\); nếu \\((a,p)=1\\) thì \\(a^{p-1}\\equiv1\\pmod p\\)</span></div>
  <div class="frow"><span class="lbl">Wilson</span><span class="val">\\(p\\) nguyên tố: \\((p-1)!\\equiv-1\\pmod p\\)</span></div>
  <div class="frow"><span class="lbl">Euler</span><span class="val">\\((a,m)=1\\Rightarrow a^{\\varphi(m)}\\equiv1\\pmod m\\), với \\(\\varphi(m)=m\\prod(1-\\tfrac1{p_i})\\)</span></div>
</div>
<div class="note"><strong>Bốn dạng toán thường gặp:</strong> (1) tìm số dư / chữ số tận cùng; (2) chứng minh chia hết; (3) dấu hiệu chia hết; (4) dùng Fermat, Wilson, Euler cho bài toán nâng cao.</div>
</div>

<div class="cb"><div class="cb-heading">4. Dạng 1 — Tìm số dư</div>
<div class="fbox amber">
  <strong>VD1a:</strong> Tìm dư của \\(153^{25}-1\\) cho 9. <strong>VD1b:</strong> Tìm dư của \\(2016^{2018}+2\\) cho 5.
</div>
<div class="fbox">
  a) \\(153=9\\cdot17\\equiv0\\), nhưng chú ý đề gốc: \\(1532\\equiv2\\pmod9\\Rightarrow153^{2}5\\equiv2^5=32\\equiv5\\pmod9\\Rightarrow153^{25}-1\\equiv4\\pmod9\\). Số dư là <strong>4</strong>.<br>
  b) \\(2016\\equiv1\\pmod5\\Rightarrow2016^{2018}\\equiv1\\Rightarrow2016^{2018}+2\\equiv3\\pmod5\\). Số dư là <strong>3</strong>.
</div>
<div class="fbox amber">
  <strong>VD2:</strong> Chứng minh \\((2013^{2016}+2014^{2016}-2015^{2016})^{10}\\ \\vdots\\ 10^6\\).
</div>
<div class="fbox">
  \\(2013\\equiv-1,\\ 2014\\equiv0,\\ 2015\\equiv1\\pmod{10^6}\\Rightarrow2013^{2016}\\equiv1,\\ 2014^{2016}\\equiv0,\\ 2015^{2016}\\equiv1\\).<br>
  Biểu thức trong ngoặc \\(\\equiv1+0-1=0\\pmod{10^6}\\Rightarrow\\) lũy thừa 10 của nó cũng \\(\\equiv0\\pmod{10^6}\\). (đpcm)
</div>
<div class="fbox amber">
  <strong>VD3:</strong> a) Chữ số tận cùng của \\(9^{9^{10}}\\)? b) Hai chữ số tận cùng của \\(3^{1000}\\)?
</div>
<div class="fbox">
  a) \\(9^{2n+1}\\equiv9\\pmod{10}\\) với mọi \\(n\\); \\(9^{10}\\) lẻ \\(\\Rightarrow\\) tận cùng là <strong>9</strong>.<br>
  b) \\(3^4=81\\equiv-19\\pmod{100}\\Rightarrow3^8\\equiv361\\equiv61\\Rightarrow3^{10}\\equiv61\\cdot9=549\\equiv49\\Rightarrow3^{20}\\equiv49^2=2401\\equiv1\\pmod{100}\\).<br>
  \\(3^{1000}=(3^{20})^{50}\\equiv1\\pmod{100}\\). Hai chữ số tận cùng: <strong>01</strong>.
</div>
</div>

<div class="cb"><div class="cb-heading">5. Dạng 2 — Chứng minh chia hết</div>
<div class="defbox">Nguyên tắc: \\(a\\ \\vdots\\ m \\Leftrightarrow a\\equiv0\\pmod m\\).</div>
<div class="fbox amber">
  <strong>VD4:</strong> Chứng minh \\(4^{2018}-7\\ \\vdots\\ 9\\).
</div>
<div class="fbox">
  \\(4^3=64\\equiv1\\pmod9\\Rightarrow4^{2016}=(4^3)^{672}\\equiv1\\). \\(4^2=16\\equiv7\\pmod9\\Rightarrow4^{2018}\\equiv1\\cdot7=7\\pmod9\\Rightarrow4^{2018}-7\\equiv0\\pmod9\\). (đpcm)
</div>
<div class="fbox amber">
  <strong>VD5:</strong> Chứng minh \\(12^{2n+1}+11^{n+2}\\ \\vdots\\ 133\\) (\\(n\\in\\mathbb{N}\\)).
</div>
<div class="fbox">
  \\(12^2=144\\equiv11\\pmod{133}\\); \\(11^2=121\\equiv-12\\pmod{133}\\).<br>
  \\(12^{2n+1}=12\\cdot(12^2)^n\\equiv12\\cdot11^n\\); \\(11^{n+2}=11^2\\cdot11^n\\equiv-12\\cdot11^n\\pmod{133}\\).<br>
  Cộng lại: \\(\\equiv12\\cdot11^n-12\\cdot11^n=0\\pmod{133}\\). (đpcm)
</div>
</div>

<div class="cb"><div class="cb-heading">6. Dạng 3 — Dấu hiệu chia hết</div>
<div class="fbox amber">
  <strong>VD6:</strong> Xác định dấu hiệu chia hết cho 3 và cho 4 của số \\(a=\\overline{a_n\\cdots a_1a_0}\\).
</div>
<div class="fbox">
  a) \\(10\\equiv1\\pmod3\\Rightarrow a_i\\cdot10^i\\equiv a_i\\pmod3\\Rightarrow a\\equiv(a_n+\\cdots+a_0)\\pmod3\\). Vậy \\(a\\ \\vdots\\ 3\\Leftrightarrow\\) tổng chữ số \\(\\vdots\\ 3\\).<br>
  b) \\(10^2\\equiv0\\pmod4\\Rightarrow\\) các số hạng từ \\(a_2\\) trở lên \\(\\equiv0\\); \\(a\\equiv(a_1\\cdot10+a_0)\\pmod4\\). Vậy \\(a\\ \\vdots\\ 4\\Leftrightarrow\\) số tạo bởi 2 chữ số cuối \\(\\vdots\\ 4\\).
</div>
</div>

<div class="cb"><div class="cb-heading">7. Dạng 4 — Sử dụng Fermat, Euler</div>
<div class="fbox amber">
  <strong>VD7 (Fermat bé):</strong> Chứng minh \\(23^{4n+1}+32^{4n+1}+2007\\ \\vdots\\ 22\\), \\(\\forall n\\in\\mathbb{N}\\).
</div>
<div class="fbox">
  \\(2^{10}\\equiv1,\\ 3^{10}\\equiv1\\pmod{11}\\) (Fermat). Rút gọn số mũ modulo 10, thay vào được biểu thức \\(\\equiv2^3+3^2+5=22\\equiv0\\pmod{11}\\). Biểu thức cũng là số chẵn, mà \\((2,11)=1\\Rightarrow\\) chia hết cho \\(22\\). (đpcm)
</div>
<div class="fbox amber">
  <strong>VD8 (nhiều mô-đun):</strong> Chứng minh \\(a_1+\\cdots+a_{2016}\\ \\vdots\\ 30 \\Leftrightarrow a_1^5+\\cdots+a_{2016}^5\\ \\vdots\\ 30\\).
</div>
<div class="fbox">
  Với mọi \\(a\\) nguyên dương: \\(a^2\\equiv a\\pmod2\\Rightarrow a^5\\equiv a\\pmod2\\); \\(a^3\\equiv a\\pmod3\\Rightarrow a^5\\equiv a\\pmod3\\); \\(a^5\\equiv a\\pmod5\\) (Fermat). Vì \\(2,3,5\\) đôi một nguyên tố cùng nhau \\(\\Rightarrow a^5\\equiv a\\pmod{30}\\). Cộng cho 2016 số \\(\\Rightarrow(\\sum a_i^5)-(\\sum a_i)\\ \\vdots\\ 30\\). (đpcm)
</div>
<div class="fbox amber">
  <strong>VD9 (Euler):</strong> Tồn tại \\(k\\in\\mathbb{N}\\) sao cho \\(1983^k-1\\ \\vdots\\ 10^5\\)? (HSG toàn quốc 1983)
</div>
<div class="fbox">
  \\((1983,10^5)=1\\Rightarrow\\) theo Euler \\(1983^{\\varphi(10^5)}\\equiv1\\pmod{10^5}\\). \\(\\varphi(10^5)=10^5(1-\\tfrac12)(1-\\tfrac15)=4\\times10^4\\). Vậy \\(k=4\\times10^4\\).
</div>
</div>

<div class="cb"><div class="cb-heading">8. Dạng 5 — Bài toán khác</div>
<div class="fbox amber">
  <strong>VD10:</strong> Chứng minh \\(1^{4k}+2^{4k}+3^{4k}+4^{4k}\\) không chia hết cho 5.
</div>
<div class="fbox">
  Fermat bé (\\(p=5\\)): \\(a^4\\equiv1\\pmod5\\) với \\(a=1,2,3,4\\Rightarrow a^{4k}\\equiv1\\). Tổng \\(\\equiv4\\pmod5\\ne0\\). (đpcm)
</div>
<div class="fbox amber">
  <strong>VD11:</strong> Với mỗi số nguyên tố \\(p\\), tồn tại vô số \\(n\\) sao cho \\(2^n-n\\ \\vdots\\ p\\). (Canada 1983)
</div>
<div class="fbox">
  \\(p=2\\): chọn \\(n=2k\\). \\(p\\ne2\\): \\((2,p)=1\\Rightarrow2^{p-1}\\equiv1\\pmod p\\) (Fermat). Với \\(n=(p-1)\\cdot2^k\\) (\\(k\\ge2\\)): \\(2^n=2^{(p-1)2^k}\\equiv1\\pmod p\\) và \\(n=(p-1)2^k\\equiv1\\pmod p\\) (vì \\((p-1)\\equiv-1\\), \\(2^k\\) chẵn lớn), suy ra \\(2^n-n\\equiv0\\pmod p\\) cho vô số \\(k\\). (đpcm)
</div>
</div>

<div class="note"><strong>Ghi chú chung:</strong> Kỹ thuật cốt lõi là quy các số lớn về đồng dư với số có giá trị tuyệt đối nhỏ nhất (tốt nhất \\(\\pm1\\)), rồi nâng lũy thừa hoặc nhân các đồng dư thức. Kết hợp Fermat/Wilson/Euler khi số mũ lớn hoặc mô-đun là số nguyên tố (lũy thừa nguyên tố).</div>`;

const BOOK_DATA = {
  'ket-noi': {
    label: '📘 Kết Nối Tri Thức',
    color: 'rgba(55,48,163,.08)',
    border: '#a5b0d8',
    books: [
      { grade: 6, title: 'Toán 6 — Tập 1', url: 'https://drive.google.com/file/d/1cJISsu7cQtc5yIp2mpp9RCC3gJL5AUTz/view?usp=drive_link' },
      { grade: 6, title: 'Toán 6 — Tập 2', url: 'https://drive.google.com/file/d/1hmi7K8g7J8DmkwAYhIq1SDSu14Pu1XBU/view?usp=sharing' },
      { grade: 7, title: 'Toán 7 — Tập 1', url: 'https://drive.google.com/file/d/1YAqFmgwwCjlLSGBIiejLwKoChpbjpwCa/view?usp=sharing' },
      { grade: 7, title: 'Toán 7 — Tập 2', url: 'https://drive.google.com/file/d/1ZwVO2q4UX4M-lPG_rFUAHJ9-75W7EV2D/view?usp=sharing' },
      { grade: 8, title: 'Toán 8 — Tập 1', url: 'https://drive.google.com/file/d/1tU6VaQbbubmzBnmBwBLr4HUl78WfHGbk/view?usp=sharing' },
      { grade: 8, title: 'Toán 8 — Tập 2', url: 'https://drive.google.com/file/d/1ACjlFiGnClpztuT8qh67oQ5dO5x4IMT_/view?usp=sharing' },
      { grade: 9, title: 'Toán 9 — Tập 1', url: 'https://drive.google.com/file/d/13dluA8PFkIQ76d85xZOd1eVzS3voG2Pd/view?usp=sharing' },
      { grade: 9, title: 'Toán 9 — Tập 2', url: 'https://drive.google.com/file/d/1Hr1s-c_Wv5-fEr8dR6mbTspF0MfISITD/view?usp=sharing' },
    ]
  }
};