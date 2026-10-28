const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

function lerp(a, b, t) { return a + (b - a) * t; }
(function raf() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
})();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '36px'; cursor.style.height = '36px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; });
});

const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const o1 = document.querySelector('.orb-1');
    const o2 = document.querySelector('.orb-2');
    if (o1) o1.style.transform = `translateY(${y * 0.15}px)`;
    if (o2) o2.style.transform = `translateY(${-y * 0.1}px)`;
}, { passive: true });

(function initSpaceScene() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    function resize() {
        const w = canvas.parentElement.offsetWidth;
        const h = canvas.parentElement.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColor = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 50;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
        const t = Math.random();
        if (t < 0.5) { starColor[i * 3] = 0.85; starColor[i * 3 + 1] = 0.9; starColor[i * 3 + 2] = 1.0; }
        else if (t < 0.8) { starColor[i * 3] = 0.49; starColor[i * 3 + 1] = 0.83; starColor[i * 3 + 2] = 0.98; }
        else { starColor[i * 3] = 0.65; starColor[i * 3 + 1] = 0.55; starColor[i * 3 + 2] = 0.98; }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColor, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.85 });
    scene.add(new THREE.Points(starGeo, starMat));

    const dustCount = 400;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * 25;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
        dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
        size: 0.06, color: 0x7dd3fc, transparent: true, opacity: 0.3
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let clock = { t: 0 };
    (function animate() {
        requestAnimationFrame(animate);
        clock.t += 0.006;
        starMat.opacity = 0.75 + Math.sin(clock.t * 0.5) * 0.1;
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    })();
})();

const translations = {
    en: {
        'nav.experience': 'Experience',
        'nav.projects': 'Projects',
        'nav.stack': 'Stack',
        'nav.contact': 'Contact',
        'hero.eyebrow': 'Frontend-focused Developer',
        'hero.title.line1': 'Building <em>ideas</em>',
        'hero.title.line2': 'into real <em>products.</em>',
        'hero.sub': "Final-year Software Engineering student focused on Frontend and Web development. Experienced with Odoo, TypeScript, JavaScript, and React. Proactive, analytical thinker with a strong focus on deliverable quality and performance.",
        'hero.cta.exp': 'View Experience',
        'hero.cta.work': 'View Projects',
        'hero.cta.contact': 'Get In Touch',

        'experience.label': 'Work Experience',
        'experience.title': "Where I've Contributed.",
        'exp.company.badge': 'Internship',
        'exp.company.date': '06/2026 - 09/2026',
        'exp.company.name': 'TIS International School',
        'exp.company.role': 'Frontend Developer Intern',
        'exp.company.summary': 'Contributed to the development and standardization of enterprise survey modules on the Odoo platform, refining UI interactions and user flows.',
        'exp.bullet.1': 'Analyzed business requirements, directly developed and perfected the Survey feature compatible across both Odoo 15 and Odoo 19 versions.',
        'exp.bullet.2': 'Standardized the entire UI/UX and user interaction flow for survey forms, making the experience intuitive and minimizing user input errors.',
        'exp.bullet.3': 'Distributed detailed technical tasks to team members, ensuring feature milestones were delivered on schedule.',
        'exp.bullet.4': 'Conducted cross-testing, proactively refactored and optimized frontend source code throughout the system development lifecycle.',
        'exp.carousel.headline': 'Key Achievements & Highlights',

        'exp.card1.tag': 'Feature Development · Odoo Multi-version',
        'exp.card1.title': 'Odoo 15 & 19 Survey Engine',
        'exp.card1.desc': 'Analyzed business requirements, architected modular survey components, and ensured seamless multi-version compatibility across Odoo 15 and Odoo 19.',
        'exp.card1.m1': 'Odoo 15/19 Compatible',
        'exp.card1.m2': 'Direct Implementation',

        'exp.card2.tag': 'UX/UI Optimization · User Flow',
        'exp.card2.title': 'Interface & Interaction Standardization',
        'exp.card2.desc': 'Revamped the visual presentation and interaction flow for survey completion, significantly improving usability and reducing submission errors.',
        'exp.card2.m1': 'Streamlined User Flow',
        'exp.card2.m2': 'Input Validation',

        'exp.card3.tag': 'Technical Leadership · Collaboration',
        'exp.card3.title': 'Task Breakdown & Team Delivery',
        'exp.card3.desc': 'Proactively broke down complex requirements into granular tasks for teammates, conducted regular reviews, and met all delivery milestones.',
        'exp.card3.m1': 'Milestone Delivery',
        'exp.card3.m2': 'Task Distribution',

        'exp.card4.tag': 'QA & Optimization · Code Refactor',
        'exp.card4.title': 'Cross-Testing & Code Quality',
        'exp.card4.desc': 'Performed thorough cross-testing across components, resolved edge-case bugs, and optimized code maintainability and rendering speed.',
        'exp.card4.m1': 'Code Maintainability',
        'exp.card4.m2': 'Bug Resolution',

        'projects.label': 'Selected Projects',
        'projects.title': "Things I've Built.",
        'projects.somnia.tag': 'Web Game · B1T Jam 5 · 1-Bit Aesthetic',
        'projects.somnia.title': 'Somnia Hotel (B1T Jam 5)',
        'projects.somnia.desc': 'A 1-bit narrative web game crafted for B1T Jam 5 under the theme "Sleep". Players navigate through a surreal dreamlike hotel, solving puzzles and uncovering mysteries with strict 2-color palette visual constraints.',
        'projects.pikachu.tag': 'Mobile · Game Development',
        'projects.pikachu.title': 'Pikachu Game (Android)',
        'projects.pikachu.desc': 'A tile-matching Android game built from scratch in Java. I implemented the tile connection validation logic myself, along with the scoring system, countdown timer, win/lose conditions, and level reset - no game engines used.',
        'projects.research.tag': 'Research · Co-author · Published',
        'projects.research.title': 'Automating SDLC<br/>Documentation (IoT)',
        'projects.research.desc': "Supported a research group on Multi-Agent Systems. Contributed to writing and standardizing technical documentation for the system's implementation phase.",
        'projects.assembly.tag': 'Web Game · Gamedev.js Jam 2026 · Arcade',
        'projects.assembly.title': 'Assembly Panic: Glitched Machine',
        'projects.assembly.desc': 'A 2D web arcade game built solo for Gamedev.js Jam 2026 using Phaser 3. Full game architecture from scratch - GlitchManager that reverses player controls, EventBus for cross-scene communication, combo scoring with progressive difficulty.',
        'projects.costume.tag': 'Web Game · Pixel Art · Adventure',
        'projects.costume.title': 'Costume Caper',
        'projects.costume.desc': 'A 2D pixel-art adventure game set in a haunted mansion. Sneak past monsters, collect keys, use the right disguises, recover the mask, and escape.',

        'skills.label': 'About & Stack',
        'skills.tech.title': 'Technical Stack',
        'skills.cat.lang': 'Languages',
        'skills.cat.fe': 'Frontend & Frameworks',
        'skills.cat.be': 'Backend Basics',
        'skills.cat.tools': 'Tools & Workflow',

        'skills.edu.title': 'Education',
        'skills.edu.school': 'Van Lang University',
        'skills.edu.major': 'Software Engineering',
        'skills.edu.year': '4th Year (Senior) · GPA: 3.4/4.0',
        'skills.edu.period': '2023 - Present',

        'skills.soft.title': 'Soft Skills',
        'skills.soft.english': 'English (Technical documentation reading)',
        'skills.soft.teamwork': 'Teamwork & Cross-functional Collaboration',
        'skills.soft.problem': 'Problem Solving & Analytical Thinking',
        'skills.soft.time': 'Time Management & Accountability',

        'skills.contact.title': 'Contact',
        'footer.text': '© 2026 ĐỖ THIỆU VY - FINAL-YEAR SOFTWARE ENGINEERING STUDENT',
    },
    vi: {
        'nav.experience': 'Kinh Nghiệm',
        'nav.projects': 'Dự Án',
        'nav.stack': 'Kỹ Năng',
        'nav.contact': 'Liên Hệ',
        'hero.eyebrow': 'Lập Trình Viên Hướng Frontend',
        'hero.title.line1': 'Biến <em>ý tưởng</em>',
        'hero.title.line2': 'thành <em>sản phẩm.</em>',
        'hero.sub': 'Sinh viên năm cuối ngành Kỹ thuật Phần mềm, định hướng Frontend và Web. Có kinh nghiệm với Odoo, TypeScript, JavaScript và React. Chủ động, tư duy phân tích tốt và tập trung vào hiệu quả công việc.',
        'hero.cta.exp': 'Xem Kinh Nghiệm',
        'hero.cta.work': 'Xem Dự Án',
        'hero.cta.contact': 'Liên Hệ Ngay',

        'experience.label': 'Kinh Nghiệm Làm Việc',
        'experience.title': 'Hành Trình & Kinh Nghiệm.',
        'exp.company.badge': 'Thực tập',
        'exp.company.date': '06/2026 - 09/2026',
        'exp.company.name': 'Trường Quốc Tế TIS',
        'exp.company.role': 'Thực tập sinh Frontend',
        'exp.company.summary': 'Tham gia phát triển hệ thống khảo sát doanh nghiệp trên nền tảng Odoo, tối ưu hóa giao diện người dùng và chuẩn hóa luồng tương tác thực tế.',
        'exp.bullet.1': 'Phân tích yêu cầu nghiệp vụ, trực tiếp phát triển và hoàn thiện tính năng Survey/Khảo sát tương thích trên cả hai phiên bản Odoo 15 và Odoo 19.',
        'exp.bullet.2': 'Chuẩn hóa toàn bộ giao diện và luồng tương tác người dùng cho tính năng khảo sát, giúp trải nghiệm trực quan và giảm thiểu thao tác lỗi.',
        'exp.bullet.3': 'Phân chia đầu việc kỹ thuật chi tiết cho các thành viên trong nhóm, bảo đảm tiến độ bàn giao chức năng đúng hạn cam kết.',
        'exp.bullet.4': 'Kiểm thử chéo, chủ động xử lý và tối ưu mã nguồn giao diện trong suốt chu kỳ phát triển hệ thống.',
        'exp.carousel.headline': 'Thành Tựu & Dấu Ấn Trọng Tâm',

        'exp.card1.tag': 'Phát triển Tính năng · Đa phiên bản Odoo',
        'exp.card1.title': 'Hệ thống Khảo sát Odoo 15 & 19',
        'exp.card1.desc': 'Phân tích yêu cầu nghiệp vụ và trực tiếp thiết kế, triển khai tính năng Survey đa phiên bản tương thích liền mạch trên Odoo 15 và Odoo 19 với cấu trúc module hóa cao.',
        'exp.card1.m1': 'Tương thích Odoo 15/19',
        'exp.card1.m2': 'Trực tiếp phát triển',

        'exp.card2.tag': 'Tối ưu UI/UX · Luồng tương tác',
        'exp.card2.title': 'Chuẩn hóa Giao diện & Trải nghiệm',
        'exp.card2.desc': 'Chuẩn hóa toàn bộ thiết kế giao diện khảo sát và luồng tương tác người dùng, giúp giao diện trực quan, rõ ràng và giảm thiểu tối đa các thao tác gây lỗi.',
        'exp.card2.m1': 'Luồng tương tác tối ưu',
        'exp.card2.m2': 'Hạn chế lỗi thao tác',

        'exp.card3.tag': 'Quản lý Công việc · Làm việc Nhóm',
        'exp.card3.title': 'Phân chia Đầu việc & Bàn giao',
        'exp.card3.desc': 'Chủ động phân chia đầu việc kỹ thuật cụ thể cho các thành viên trong nhóm, theo dõi tiến độ và cam kết bàn giao các tính năng đúng hạn đề ra.',
        'exp.card3.m1': 'Bàn giao đúng hạn',
        'exp.card3.m2': 'Phân bổ việc hiệu quả',

        'exp.card4.tag': 'Kiểm thử QA · Tối ưu Mã nguồn',
        'exp.card4.title': 'Kiểm thử Chéo & Tối ưu Giao diện',
        'exp.card4.desc': 'Thực hiện kiểm thử chéo chuyên sâu, chủ động phát hiện bug và tối ưu cấu trúc mã nguồn giao diện trong suốt vòng đời phát triển của dự án.',
        'exp.card4.m1': 'Mã nguồn dễ bảo trì',
        'exp.card4.m2': 'Chủ động xử lý bug',

        'projects.label': 'Dự Án Nổi Bật',
        'projects.title': 'Những Thứ Mình Đã Xây.',
        'projects.somnia.tag': 'Web Game · B1T Jam 5 · Phong cách 1-Bit',
        'projects.somnia.title': 'Somnia Hotel (B1T Jam 5)',
        'projects.somnia.desc': 'Tựa game 2D mang phong cách 1-bit được phát triển cho B1T Jam 5 (Chủ đề: Giấc ngủ - Sleep). Người chơi khám phá một khách sạn kỳ bí trong cõi mộng, giải các câu đố và vượt qua thử thách với giới hạn đồ họa 2 màu tối giản đậm chất cổ điển.',
        'projects.pikachu.tag': 'Mobile · Lập trình Game',
        'projects.pikachu.title': 'Game Pikachu (Android)',
        'projects.pikachu.desc': 'Game xếp hình Android viết từ đầu bằng Java. Tự xây dựng logic kiểm tra kết nối ô, hệ thống điểm, đồng hồ đếm ngược, điều kiện thắng/thua và reset màn - không dùng game engine.',
        'projects.research.tag': 'Nghiên cứu · Đồng tác giả · Đã xuất bản',
        'projects.research.title': 'Tự động hóa Tài liệu SDLC (IoT)',
        'projects.research.desc': 'Hỗ trợ nhóm nghiên cứu về Hệ thống Đa tác tử. Đóng góp viết và chuẩn hóa tài liệu kỹ thuật cho giai đoạn triển khai hệ thống.',
        'projects.assembly.tag': 'Web Game · Gamedev.js Jam 2026 · Arcade',
        'projects.assembly.title': 'Assembly Panic: Glitched Machine',
        'projects.assembly.desc': 'Game arcade 2D web xây solo khi tham gia Gamedev.js Jam 2026 bằng Phaser 3. Thiết kế toàn bộ kiến trúc game - GlitchManager đảo chiều điều khiển người chơi, EventBus cho giao tiếp liên scene, hệ thống combo với độ khó tăng dần.',
        'projects.costume.tag': 'Web Game · Pixel Art · Phiêu lưu',
        'projects.costume.title': 'Costume Caper',
        'projects.costume.desc': 'Game phiêu lưu 2D phong cách pixel-art lấy bối cảnh một dinh thự ma ám. Lén vượt qua quái vật, thu thập chìa khóa, sử dụng đúng hóa trang, tìm lại chiếc mặt nạ và trốn thoát.',

        'skills.label': 'Giới thiệu & Kỹ năng',
        'skills.tech.title': 'Kỹ Năng Chuyên Môn',
        'skills.cat.lang': 'Ngôn ngữ lập trình',
        'skills.cat.fe': 'Frontend & Frameworks',
        'skills.cat.be': 'Backend cơ bản',
        'skills.cat.tools': 'Công cụ quản lý & Làm việc',

        'skills.edu.title': 'Học Vấn',
        'skills.edu.school': 'Trường Đại Học Văn Lang',
        'skills.edu.major': 'Kỹ Thuật Phần Mềm',
        'skills.edu.year': 'Năm 4 (Năm cuối) · GPA: 3.4/4.0',
        'skills.edu.period': '2023 - hiện tại',

        'skills.soft.title': 'Kỹ Năng Mềm',
        'skills.soft.english': 'Ngoại ngữ: Tiếng Anh (Đọc hiểu tài liệu kỹ thuật)',
        'skills.soft.teamwork': 'Làm việc nhóm & Giao tiếp kỹ thuật',
        'skills.soft.problem': 'Tư duy phân tích & Giải quyết vấn đề',
        'skills.soft.time': 'Quản lý thời gian & Trách nhiệm công việc',

        'skills.contact.title': 'Liên Hệ',
        'footer.text': '© 2026 ĐỖ THIỆU VY - SINH VIÊN NĂM CUỐI KỸ THUẬT PHẦN MỀM',
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

const HTML_KEYS = new Set([
    'hero.title.line1', 'hero.title.line2',
    'projects.somnia.title', 'projects.research.title',
]);

const TEXT_ONLY_KEYS = new Set(['projects.title', 'experience.title']);

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!t[key]) return;

        if (TEXT_ONLY_KEYS.has(key)) {
            el.textContent = t[key];
        } else if (HTML_KEYS.has(key)) {
            el.innerHTML = t[key];
        } else {
            el.textContent = t[key];
        }
    });

    const langEN = document.getElementById('langEN');
    const langVI = document.getElementById('langVI');
    if (langEN) langEN.classList.toggle('lang-active', lang === 'en');
    if (langVI) langVI.classList.toggle('lang-active', lang === 'vi');

    const mLangEN = document.getElementById('mobileLangEN');
    const mLangVI = document.getElementById('mobileLangVI');
    if (mLangEN) mLangEN.classList.toggle('lang-active', lang === 'en');
    if (mLangVI) mLangVI.classList.toggle('lang-active', lang === 'vi');

    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
}

document.getElementById('langSwitch').addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'vi' : 'en');
});

applyLang('en');
if (currentLang === 'vi') {
    setTimeout(() => applyLang('vi'), 50);
}

// -------------------------------------------------------------
// EXPERIENCE CAROUSEL / CARD SWITCHER LOGIC
// -------------------------------------------------------------
(function initExpCarousel() {
    const cards = document.querySelectorAll('.exp-feature-card');
    const dots = document.querySelectorAll('.exp-dot');
    const prevBtn = document.getElementById('expPrevBtn');
    const nextBtn = document.getElementById('expNextBtn');
    const counterEl = document.getElementById('expCardCounter');
    const stage = document.getElementById('expCardStage');

    if (!cards.length) return;

    let currentIndex = 0;
    const total = cards.length;

    function showCard(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        currentIndex = index;

        cards.forEach((card, i) => {
            if (i === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        if (counterEl) {
            counterEl.textContent = `0${currentIndex + 1} / 0${total}`;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => showCard(currentIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showCard(currentIndex + 1));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showCard(i));
    });

    // Touch swipe support
    if (stage) {
        let touchStartX = 0;
        stage.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (diff > 45) {
                showCard(currentIndex - 1);
            } else if (diff < -45) {
                showCard(currentIndex + 1);
            }
        }, { passive: true });
    }
})();

(function initAnime() {
    if (typeof anime === 'undefined') return;

    const eyebrowEl = document.querySelector('[data-i18n="hero.eyebrow"]');
    if (eyebrowEl) {
        const originalText = translations['en']['hero.eyebrow'];
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

        function scramble(el, finalText, duration = 1600) {
            const totalFrames = duration / 16;
            let frame = 0;
            function tick() {
                frame++;
                const progress = frame / totalFrames;
                const revealCount = Math.floor(progress * finalText.length);
                let result = '';
                for (let i = 0; i < finalText.length; i++) {
                    if (i < revealCount) result += finalText[i];
                    else if (finalText[i] === ' ') result += ' ';
                    else result += chars[Math.floor(Math.random() * chars.length)];
                }
                el.textContent = result;
                if (frame < totalFrames) requestAnimationFrame(tick);
                else el.textContent = finalText;
            }
            requestAnimationFrame(tick);
        }

        setTimeout(() => scramble(eyebrowEl, originalText, 1800), 800);
    }

    const titleLines = document.querySelectorAll('h1.hero-title span[data-i18n]');
    titleLines.forEach((line, li) => {
        line.style.opacity = '1';
        line.style.animation = 'none';

        const rawHTML = line.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${rawHTML}</div>`, 'text/html');
        const container = doc.querySelector('div');

        function wrapWords(node, out) {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    child.textContent.split(/(\s+)/).forEach(word => {
                        if (!word) return;
                        if (/^\s+$/.test(word)) { out.push(document.createTextNode(word)); return; }
                        const s = document.createElement('span');
                        s.className = 'word';
                        s.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom;';
                        const inner = document.createElement('span');
                        inner.style.cssText = 'display:inline-block; transform:translateY(100%);';
                        inner.textContent = word;
                        s.appendChild(inner);
                        out.push(s);
                    });
                } else if (child.nodeName === 'EM') {
                    const em = document.createElement('em');
                    em.style.fontStyle = 'normal';
                    const text = child.textContent.trim();
                    const s = document.createElement('span');
                    s.className = 'word';
                    s.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom;';
                    const inner = document.createElement('span');
                    inner.style.cssText = 'display:inline-block; transform:translateY(100%);';
                    inner.textContent = text;
                    em.appendChild(inner);
                    s.appendChild(em);
                    out.push(s);
                }
            });
        }

        const nodes = [];
        wrapWords(container, nodes);
        line.innerHTML = '';
        nodes.forEach(n => line.appendChild(n));

        const inners = Array.from(line.querySelectorAll('.word > span, .word > em > span'));
        anime({
            targets: inners,
            translateY: ['100%', '0%'],
            opacity: [0, 1],
            easing: 'cubicBezier(0.22, 1, 0.36, 1)',
            duration: 900,
            delay: anime.stagger(80, { start: 400 + li * 200 }),
        });
    });

    const sectionTitles = document.querySelectorAll('h2.section-title');
    sectionTitles.forEach(titleEl => {
        const key = titleEl.getAttribute('data-i18n');
        const chars = '░▒▓█▄▀■□◆◇○●';

        const titleObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                titleObs.disconnect();
                const targetText = (translations[currentLang] && translations[currentLang][key]) ? translations[currentLang][key] : titleEl.textContent;
                let frame = 0;
                const totalFrames = 50;
                function tick() {
                    frame++;
                    const progress = frame / totalFrames;
                    const revealCount = Math.floor(progress * targetText.length);
                    let result = '';
                    for (let i = 0; i < targetText.length; i++) {
                        if (i < revealCount) result += targetText[i];
                        else result += chars[Math.floor(Math.random() * chars.length)];
                    }
                    titleEl.textContent = result;
                    if (frame < totalFrames) requestAnimationFrame(tick);
                    else {
                        titleEl.textContent = targetText;
                        applyLang(currentLang);
                    }
                }
                tick();
            });
        }, { threshold: 0.3 });
        titleObs.observe(titleEl);
    });
})();

(function initMobile() {

    function buildMobileNav() {
        const hamburger = document.getElementById('hamburgerBtn');
        if (!hamburger) return null;

        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);

        const drawer = document.createElement('aside');
        drawer.className = 'mobile-nav-drawer';
        drawer.setAttribute('aria-label', 'Mobile navigation');
        drawer.innerHTML = `
            <div class="mobile-nav-inner">
                <div class="mobile-nav-topbar">
                    <span class="mobile-nav-logo">NyxFeline<sup style="font-size:8px;opacity:0.65;">®</sup></span>
                    <button class="mobile-nav-x" id="mobileNavX" aria-label="Close menu">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <ul class="mobile-nav-links">
                    <li><a href="#experience" data-i18n="nav.experience"><span class="nav-idx">01</span>Experience</a></li>
                    <li><a href="#projects" data-i18n="nav.projects"><span class="nav-idx">02</span>Projects</a></li>
                    <li><a href="#skills" data-i18n="nav.stack"><span class="nav-idx">03</span>Stack</a></li>
                    <li><a href="https://github.com/NyxFeline" target="_blank" rel="noopener">GitHub</a></li>
                </ul>
                <div class="mobile-nav-bottom">
                    <a href="mailto:dothieuvy@gmail.com" class="mobile-nav-cta" data-i18n="nav.contact">Contact</a>
                    <div class="mobile-nav-footer-row">
                        <span class="mobile-lang-label">Language</span>
                        <button class="lang-switch" id="mobileLangSwitch" aria-label="Switch language">
                            <span class="lang-option lang-active" id="mobileLangEN">EN</span>
                            <span class="lang-divider">/</span>
                            <span class="lang-option" id="mobileLangVI">VI</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(drawer);

        applyLang(currentLang);

        return { hamburger, overlay, drawer };
    }

    function initDrawer({ hamburger, overlay, drawer }) {
        let isOpen = false;

        function openDrawer() {
            isOpen = true;
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            overlay.classList.add('open');
            drawer.classList.add('open');
            document.body.style.overflow = 'hidden';

            drawer.querySelectorAll('.mobile-nav-links li').forEach((li, i) => {
                li.style.opacity = '0';
                li.style.transform = 'translateX(-20px)';
                li.style.transition = `opacity 0.28s ease ${0.08 + i * 0.07}s,
                                       transform 0.32s cubic-bezier(0.22,1,0.36,1) ${0.08 + i * 0.07}s`;
                requestAnimationFrame(() => {
                    li.style.opacity = '1';
                    li.style.transform = 'translateX(0)';
                });
            });
        }

        function closeDrawer() {
            isOpen = false;
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('open');
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => isOpen ? closeDrawer() : openDrawer());
        overlay.addEventListener('click', closeDrawer);

        const xBtn = drawer.querySelector('#mobileNavX');
        if (xBtn) xBtn.addEventListener('click', closeDrawer);

        drawer.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', closeDrawer));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeDrawer(); });
        window.addEventListener('resize', () => { if (window.innerWidth > 900 && isOpen) closeDrawer(); }, { passive: true });

        const mobileLangSwitch = drawer.querySelector('#mobileLangSwitch');
        if (mobileLangSwitch) {
            mobileLangSwitch.addEventListener('click', () => {
                applyLang(currentLang === 'en' ? 'vi' : 'en');
            });
        }

        return { closeDrawer };
    }

    function initSwipeClose({ drawer }, { closeDrawer }) {
        let startX = 0, dragging = false;
        drawer.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            dragging = true;
            drawer.style.transition = 'none';
        }, { passive: true });
        drawer.addEventListener('touchmove', e => {
            if (!dragging) return;
            const dx = startX - e.touches[0].clientX;
            if (dx > 0) drawer.style.transform = `translateX(${-Math.min(dx, 250)}px)`;
        }, { passive: true });
        drawer.addEventListener('touchend', e => {
            dragging = false;
            drawer.style.transition = '';
            const dx = startX - e.changedTouches[0].clientX;
            if (dx > 72) closeDrawer();
            else drawer.style.transform = '';
        }, { passive: true });
    }

    const els = buildMobileNav();
    if (els) {
        const controls = initDrawer(els);
        initSwipeClose(els, controls);
    }

})();

function fixViewportHeight() {
    const set = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    set();
    window.addEventListener('resize', set, { passive: true });
}

function patchSmoothScroll() {
    if ('scrollBehavior' in document.documentElement.style) return;
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function optimiseForTouch() {
    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    document.querySelectorAll('.orb').forEach(o => o.style.animationDuration = '24s');
}

fixViewportHeight();
patchSmoothScroll();
optimiseForTouch();