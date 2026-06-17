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
];

const LESSONS = {

/* ══════════ LỚP 6 ══════════ */
'so-hoc': `
<div class="cb"><div class="cb-heading">Số nguyên và tập hợp số</div>
<div class="defbox">Tập hợp số: \\(\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}\\).</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Chia hết cho tổng</span><span class="val">Nếu \\(a\\vdots m\\) và \\(b\\vdots m\\) thì \\((a+b)\\vdots m\\)</span></div>
  <div class="frow"><span class="lbl">Số ước của \\(n\\)</span><span class="val">\\(n=p_1^{a_1}\\cdot p_2^{a_2}\\cdots\\) → số ước \\(=(a_1+1)(a_2+1)\\cdots\\)</span></div>
  <div class="frow"><span class="lbl">Quy tắc dấu ngoặc</span><span class="val">\\(a-(b-c)=a-b+c\\)</span></div>
</div>
<div class="note"><strong>Lỗi thường gặp:</strong> Bỏ ngoặc sau dấu trừ phải đổi dấu <em>tất cả</em> hạng tử.</div>
</div>`,

'phan-so': `
<div class="cb"><div class="cb-heading">Phân số và các phép tính</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Rút gọn</span><span class="val">\\(\\dfrac{a}{b}=\\dfrac{a\\div d}{b\\div d}\\), \\(d=\\text{ƯCLN}(a,b)\\)</span></div>
  <div class="frow"><span class="lbl">Cộng / Trừ</span><span class="val">\\(\\dfrac{a}{b}\\pm\\dfrac{c}{d}=\\dfrac{ad\\pm bc}{bd}\\)</span></div>
  <div class="frow"><span class="lbl">Nhân / Chia</span><span class="val">\\(\\dfrac{a}{b}\\times\\dfrac{c}{d}=\\dfrac{ac}{bd}\\); \\(\\dfrac{a}{b}\\div\\dfrac{c}{d}=\\dfrac{ad}{bc}\\)</span></div>
</div></div>`,

'hinh-co-ban': `
<div class="cb"><div class="cb-heading">Tam giác cơ bản</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Tổng 3 góc</span><span class="val">\\(\\widehat{A}+\\widehat{B}+\\widehat{C}=180°\\)</span></div>
  <div class="frow"><span class="lbl">Diện tích</span><span class="val">\\(S=\\dfrac{1}{2}\\times\\text{đáy}\\times h\\)</span></div>
</div></div>`,

/* ══════════ LỚP 7 ══════════ */
'ty-le': `
<div class="cb"><div class="cb-heading">Tỉ lệ thức</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Định nghĩa</span><span class="val">\\(\\dfrac{a}{b}=\\dfrac{c}{d}\\Leftrightarrow a\\cdot d=b\\cdot c\\)</span></div>
  <div class="frow"><span class="lbl">Tính chất dãy tỉ số</span><span class="val">\\(\\dfrac{a}{b}=\\dfrac{c}{d}=\\dfrac{a+c}{b+d}\\)</span></div>
</div></div>
<div class="cb"><div class="cb-heading">Đại lượng tỉ lệ</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Tỉ lệ thuận</span><span class="val">\\(y=kx\\)</span></div>
  <div class="frow"><span class="lbl">Tỉ lệ nghịch</span><span class="val">\\(xy=k\\) (hằng số)</span></div>
</div></div>`,

'ham-so-bac1': `
<div class="cb"><div class="cb-heading">Hàm số bậc nhất \\(y=ax+b\\)</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đồng biến / Nghịch biến</span><span class="val">\\(a>0\\) tăng; \\(a<0\\) giảm</span></div>
  <div class="frow"><span class="lbl">Giao trục \\(Oy\\)</span><span class="val">\\((0,b)\\)</span></div>
  <div class="frow"><span class="lbl">Giao trục \\(Ox\\)</span><span class="val">\\((-b/a,0)\\)</span></div>
</div></div>
<div class="cb"><div class="cb-heading">Vị trí tương đối</div>
${tbl('<table class="kbt"><tr><th>Vị trí</th><th>Điều kiện</th></tr><tr><td>Cắt nhau</td><td>\\(a_1\\neq a_2\\)</td></tr><tr><td>Song song</td><td>\\(a_1=a_2,b_1\\neq b_2\\)</td></tr><tr><td>Trùng nhau</td><td>\\(a_1=a_2,b_1=b_2\\)</td></tr><tr><td>Vuông góc</td><td>\\(a_1 a_2=-1\\)</td></tr></table>')}
</div>`,

'thong-ke': `
<div class="cb"><div class="cb-heading">Số đặc trưng & Xác suất</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Trung bình</span><span class="val">\\(\\bar{x}=(x_1+\\cdots+x_n)/n\\)</span></div>
  <div class="frow"><span class="lbl">Xác suất</span><span class="val">\\(P(A)=\\text{số thuận lợi}/\\text{tổng}\\)</span></div>
</div></div>`,

/* ══════════ LỚP 8 ══════════ */
'hang-dang-thuc': `
<div class="cb"><div class="cb-heading">7 Hằng đẳng thức đáng nhớ</div>
${tbl('<table class="kbt"><tr><th>#</th><th>Tên</th><th>Công thức</th></tr><tr><td>1</td><td>Bình phương tổng</td><td>\\((a+b)^2=a^2+2ab+b^2\\)</td></tr><tr><td>2</td><td>Bình phương hiệu</td><td>\\((a-b)^2=a^2-2ab+b^2\\)</td></tr><tr><td>3</td><td>Hiệu hai bình phương</td><td>\\(a^2-b^2=(a+b)(a-b)\\)</td></tr><tr><td>4</td><td>Lập phương tổng</td><td>\\((a+b)^3=a^3+3a^2b+3ab^2+b^3\\)</td></tr><tr><td>5</td><td>Lập phương hiệu</td><td>\\((a-b)^3=a^3-3a^2b+3ab^2-b^3\\)</td></tr><tr><td>6</td><td>Tổng hai lập phương</td><td>\\(a^3+b^3=(a+b)(a^2-ab+b^2)\\)</td></tr><tr><td>7</td><td>Hiệu hai lập phương</td><td>\\(a^3-b^3=(a-b)(a^2+ab+b^2)\\)</td></tr></table>')}
<div class="note"><strong>Lỗi thường gặp:</strong> \\((a+b)^2\\neq a^2+b^2\\).</div></div>`,

'phan-tich-nttu': `
<div class="cb"><div class="cb-heading">Các phương pháp phân tích</div>
<div class="fbox">
  <div class="frow"><span class="lbl">Đặt nhân tử chung</span><span class="val">\\(ab+ac=a(b+c)\\)</span></div>
  <div class="frow"><span class="lbl">Hằng đẳng thức</span><span class="val">\\(x^2-4=(x+2)(x-2)\\)</span></div>
  <div class="frow"><span class="lbl">Nhóm hạng tử</span><span class="val">\\(ac+bc+ad+bd=(a+b)(c+d)\\)</span></div>
</div>
<div class="note"><strong>Thứ tự:</strong> ① Đặt nhân tử chung → ② HĐT → ③ Nhóm</div></div>`,

'pt-bac1': `
<div class="cb"><div class="cb-heading">Phương trình & Hệ phương trình</div>
<div class="fbox">
  <div class="frow"><span class="lbl">PT bậc nhất</span><span class="val">\\(ax+b=0\\Rightarrow x=-b/a\\)</span></div>
</div></div>
<div class="cb"><div class="cb-heading">Hệ PT 2 ẩn</div>
<div class="fbox green">
  <div class="frow"><span class="lbl">Phương pháp thế</span><span class="val">Biểu diễn \\(x\\) qua \\(y\\), thế vào PT kia</span></div>
  <div class="frow"><span class="lbl">Phương pháp cộng</span><span class="val">Triệt tiêu 1 ẩn bằng cách nhân và cộng</span></div>
</div></div>`,

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