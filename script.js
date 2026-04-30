/* ══════════════════════════════════════════════════
   NyxFeline Portfolio - script.js (Redesigned)
   - Three.js: 3D space + Pokemon constellation scene
   - anime.js: splitText hero title, scrambleText eyebrow
   - Cursor, scroll reveal, nav pill, i18n
══════════════════════════════════════════════════ */

/* ── CURSOR ── */
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

/* ── NAV SCROLL ── */
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── PARALLAX ORBS ── */
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const o1 = document.querySelector('.orb-1');
    const o2 = document.querySelector('.orb-2');
    if (o1) o1.style.transform = `translateY(${y * 0.15}px)`;
    if (o2) o2.style.transform = `translateY(${-y * 0.1}px)`;
}, { passive: true });

/* ══════════════════════════════════════════════════
   THREE.JS: SPACE SCENE with POKEMON CONSTELLATIONS
   Particles + Stars + SVG Pokemon drawn with lines
══════════════════════════════════════════════════ */
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

    /* ── STARFIELD ── */
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColor = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 50;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
        // Random: white, sky-blue, or lavender tint
        const t = Math.random();
        if (t < 0.5) { starColor[i * 3] = 0.85; starColor[i * 3 + 1] = 0.9; starColor[i * 3 + 2] = 1.0; }
        else if (t < 0.8) { starColor[i * 3] = 0.49; starColor[i * 3 + 1] = 0.83; starColor[i * 3 + 2] = 0.98; }
        else { starColor[i * 3] = 0.65; starColor[i * 3 + 1] = 0.55; starColor[i * 3 + 2] = 0.98; }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColor, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.85 });
    scene.add(new THREE.Points(starGeo, starMat));

    /* ── FLOATING DUST PARTICLES ── */
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

    /* ── MOUSE PARALLAX ── */
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── RENDER LOOP ── */
    let clock = { t: 0 };
    (function animate() {
        requestAnimationFrame(animate);
        clock.t += 0.006;

        // Starfield gentle drift
        starMat.opacity = 0.75 + Math.sin(clock.t * 0.5) * 0.1;

        // Camera parallax from mouse
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    })();
})();

/* ══════════════════════════════════════════════════
   ANIME.JS: splitText hero title + scrambleText eyebrow
══════════════════════════════════════════════════ */
(function initAnime() {
    if (typeof anime === 'undefined') return;

    /* ── 1. SCRAMBLE TEXT on eyebrow badge ── */
    const eyebrowEl = document.querySelector('[data-i18n="hero.eyebrow"]');
    if (eyebrowEl) {
        const originalText = eyebrowEl.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

        function scramble(el, finalText, duration = 1600) {
            let startTime = null;
            const totalFrames = duration / 16;
            let frame = 0;
            function tick() {
                frame++;
                const progress = frame / totalFrames;
                const revealCount = Math.floor(progress * finalText.length);
                let result = '';
                for (let i = 0; i < finalText.length; i++) {
                    if (i < revealCount) {
                        result += finalText[i];
                    } else if (finalText[i] === ' ') {
                        result += ' ';
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                el.textContent = result;
                if (frame < totalFrames) requestAnimationFrame(tick);
                else el.textContent = finalText;
            }
            requestAnimationFrame(tick);
        }

        // Trigger scramble after initial CSS animation settles
        setTimeout(() => scramble(eyebrowEl, originalText, 1800), 800);
    }

    /* ── 2. SPLIT TEXT on hero title (word-by-word rise) ── */
    const titleLines = document.querySelectorAll('h1.hero-title span[data-i18n]');
    titleLines.forEach((line, li) => {
        // Cancel CSS animation so anime controls it
        line.style.opacity = '1';
        line.style.animation = 'none';

        // Parse text + em tags into words
        const rawHTML = line.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${rawHTML}</div>`, 'text/html');
        const container = doc.querySelector('div');

        // Wrap every word in a span
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

        // Animate all inner spans
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

    /* ── 3. SCRAMBLE on project section title ── */
    const projectTitle = document.querySelector('h2.section-title');
    if (projectTitle) {
        const chars = '░▒▓█▄▀■□◆◇○●';
        const finalText = projectTitle.textContent.replace(/\s+/g, ' ').trim();
        const titleObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                titleObs.disconnect();
                let frame = 0;
                const totalFrames = 60;
                function tick() {
                    frame++;
                    const progress = frame / totalFrames;
                    const revealCount = Math.floor(progress * finalText.length);
                    let result = '';
                    for (let i = 0; i < finalText.length; i++) {
                        if (i < revealCount || finalText[i] === '\n') result += finalText[i];
                        else result += chars[Math.floor(Math.random() * chars.length)];
                    }
                    projectTitle.textContent = result;
                    if (frame < totalFrames) requestAnimationFrame(tick);
                    else projectTitle.innerHTML = "Things<br/>I've Built.";
                }
                tick();
            });
        }, { threshold: 0.3 });
        titleObs.observe(projectTitle);
    }
})();

/* ══════════════════════════════════════════════════
   i18n
══════════════════════════════════════════════════ */
const translations = {
    en: {
        'nav.projects': 'Projects',
        'nav.stack': 'Stack',
        'nav.contact': 'Contact',
        'hero.eyebrow': 'Frontend-focused Developer',
        'hero.title.line1': 'Building <em>ideas</em>',
        'hero.title.line2': 'into real <em>products.</em>',
        'hero.sub': "I'm Thiệu Vy - a third-year Software Engineering student who enjoys building interfaces that are clean and easy to use. I work across the stack, with a growing focus on the frontend.",
        'hero.cta.work': 'View My Work',
        'hero.cta.contact': 'Get In Touch',
        'projects.label': 'Selected Projects',
        'projects.title': "Things I've Built.",
        'projects.flow.tag': 'Fullstack · Real-time · In Development',
        'projects.flow.title': 'FLOW<br/>Pet Rescue Platform',
        'projects.flow.desc': 'A platform that connects pet rescuers and adopters in real time. Users can send SOS alerts, coordinate rescues, and communicate live. Built with a NestJS backend, PostGIS for location queries, and Socket.io for real-time updates.',
        'projects.pikachu.tag': 'Mobile · Game Development',
        'projects.pikachu.title': 'Pikachu Game (Android)',
        'projects.pikachu.desc': 'A tile-matching Android game built from scratch in Java. I implemented the tile connection validation logic myself, along with the scoring system, countdown timer, win/lose conditions, and level reset - no game engines used.',
        'projects.research.tag': 'Research · Co-author · Published',
        'projects.research.title': 'Automating SDLC<br/>Documentation (IoT)',
        'projects.research.desc': 'Supported a research group on Multi-Agent Systems. Contributed to writing and standardizing technical documentation for the system\'s implementation phase.',
        'projects.assembly.tag': 'Web · Game Development',
        'projects.assembly.title': 'Assembly Panic: Glitched Machine',
        'projects.assembly.desc': 'A 2D web arcade game built solo for a Game Jam using Phaser 3. Full game architecture from scratch - GlitchManager that reverses player controls, EventBus for cross-scene communication, combo scoring with progressive difficulty.',
        'skills.label': 'About & Stack',
        'skills.tech.title': 'Technical Stack',
        'skills.edu.title': 'Education',
        'skills.edu.major': 'Software Engineering',
        'skills.edu.year': '3rd Year - GPA: 3.4/4.0',
        'skills.edu.location': 'Ho Chi Minh City, Vietnam',
        'skills.activities.title': 'Activities',
        'skills.activities.workshops': 'Tech workshops & seminars',
        'skills.activities.oss': 'Open source contributions',
        'skills.contact.title': 'Contact',
        'footer.text': '© 2025 ĐỖ THIỆU VY - SOFTWARE ENGINEERING STUDENT',
    },
    vi: {
        'nav.projects': 'Dự Án',
        'nav.stack': 'Kỹ Năng',
        'nav.contact': 'Liên Hệ',
        'hero.eyebrow': 'Lập Trình Viên Hướng Frontend',
        'hero.title.line1': 'Biến <em>ý tưởng</em>',
        'hero.title.line2': 'thành <em>sản phẩm.</em>',
        'hero.sub': 'Mình là Thiệu Vy - sinh viên Kỹ thuật Phần mềm năm 3, thích xây dựng giao diện gọn gàng và dễ dùng. Mình làm fullstack nhưng đang tập trung nhiều hơn vào frontend.',
        'hero.cta.work': 'Xem Dự Án',
        'hero.cta.contact': 'Liên Hệ Ngay',
        'projects.label': 'Dự Án Nổi Bật',
        'projects.title': 'Những Thứ Mình Đã Xây.',
        'projects.flow.tag': 'Fullstack · Thời gian thực · Đang phát triển',
        'projects.flow.title': 'FLOW<br/>Nền tảng Cứu hộ Thú cưng',
        'projects.flow.desc': 'Nền tảng kết nối người cứu hộ và nhận nuôi thú cưng theo thời gian thực. Người dùng có thể gửi cảnh báo SOS, phối hợp cứu hộ và liên lạc trực tiếp. Backend NestJS, PostGIS cho truy vấn vị trí, Socket.io cho cập nhật thời gian thực.',
        'projects.pikachu.tag': 'Mobile · Lập trình Game',
        'projects.pikachu.title': 'Game Pikachu (Android)',
        'projects.pikachu.desc': 'Game xếp hình Android viết từ đầu bằng Java. Tự xây dựng logic kiểm tra kết nối ô, hệ thống điểm, đồng hồ đếm ngược, điều kiện thắng/thua và reset màn - không dùng game engine.',
        'projects.research.tag': 'Nghiên cứu · Đồng tác giả · Đã xuất bản',
        'projects.research.title': 'Tự động hóa Tài liệu SDLC (IoT)',
        'projects.research.desc': 'Hỗ trợ nhóm nghiên cứu về Hệ thống Đa tác tử. Đóng góp viết và chuẩn hóa tài liệu kỹ thuật cho giai đoạn triển khai hệ thống.',
        'projects.assembly.tag': 'Web · Lập trình Game',
        'projects.assembly.title': 'Assembly Panic: Glitched Machine',
        'projects.assembly.desc': 'Game arcade 2D web xây solo cho Game Jam bằng Phaser 3. Thiết kế toàn bộ kiến trúc game - GlitchManager đảo chiều điều khiển người chơi, EventBus cho giao tiếp liên scene, hệ thống combo với độ khó tăng dần.',
        'skills.label': 'Giới thiệu & Kỹ năng',
        'skills.tech.title': 'Công nghệ sử dụng',
        'skills.edu.title': 'Học vấn',
        'skills.edu.major': 'Kỹ thuật Phần mềm',
        'skills.edu.year': 'Năm 3 - GPA: 3.4/4.0',
        'skills.edu.location': 'TP. Hồ Chí Minh, Việt Nam',
        'skills.activities.title': 'Hoạt động',
        'skills.activities.workshops': 'Workshop & hội thảo công nghệ',
        'skills.activities.oss': 'Đóng góp mã nguồn mở',
        'skills.contact.title': 'Liên hệ',
        'footer.text': '© 2025 ĐỖ THIỆU VY - SINH VIÊN KỸ THUẬT PHẦN MỀM',
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!t[key]) return;
        el.innerHTML = t[key];
    });
    document.getElementById('langEN').classList.toggle('lang-active', lang === 'en');
    document.getElementById('langVI').classList.toggle('lang-active', lang === 'vi');
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
}

document.getElementById('langSwitch').addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'vi' : 'en');
});
applyLang(currentLang);