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
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '36px'; cursor.style.height = '36px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
    });
});

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── PARALLAX ORBS ON SCROLL ── */
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelector('.orb-1').style.transform = `translateY(${y * 0.15}px)`;
    document.querySelector('.orb-2').style.transform = `translateY(${-y * 0.1}px)`;
});

/* ── i18n ── */
const translations = {
    en: {
        'nav.projects': 'Projects',
        'nav.stack': 'Stack',
        'nav.contact': 'Contact',

        'hero.eyebrow': 'Frontend-focused Developer',
        'hero.title.line1': 'Building <em>ideas</em>',
        'hero.title.line2': 'into real <em>products.</em>',
        'hero.sub': "I'm Thiệu Vy — a third-year Software Engineering student who enjoys building interfaces that are clean and easy to use. I work across the stack, with a growing focus on the frontend.",
        'hero.cta.work': 'View My Work',
        'hero.cta.contact': 'Get In Touch',

        'projects.label': 'Selected Projects',
        'projects.title': "Things<br/>I've Built.",

        'projects.flow.tag': 'Fullstack · Real-time · In Development',
        'projects.flow.title': 'FLOW<br/>Pet Rescue Platform',
        'projects.flow.desc': 'A platform that connects pet rescuers and adopters in real time. Users can send SOS alerts, coordinate rescues, and communicate live. Built with a NestJS backend, PostGIS for location queries, and Socket.io for real-time updates.',

        'projects.pikachu.tag': 'Mobile · Game Development',
        'projects.pikachu.title': 'Pikachu Game (Android)',
        'projects.pikachu.desc': 'A tile-matching Android game built from scratch in Java. I implemented the tile connection validation logic myself, along with the scoring system, countdown timer, win/lose conditions, and level reset — no game engines used.',

        'projects.research.tag': 'Research · Co-author · Published',
        'projects.research.title': 'Automating SDLC<br/>Documentation (IoT)',
        'projects.research.desc': "Supported a research group on Multi-Agent Systems. Contributed to writing and standardizing technical documentation for the system's implementation phase.",

        'skills.label': 'About & Stack',
        'skills.tech.title': 'Technical Stack',
        'skills.edu.title': 'Education',
        'skills.edu.major': 'Software Engineering',
        'skills.edu.year': '3rd Year — 76% complete',
        'skills.edu.location': 'Ho Chi Minh City, Vietnam',
        'skills.activities.title': 'Activities',
        'skills.activities.workshops': 'Tech workshops & seminars',
        'skills.activities.oss': 'Open source contributions',
        'skills.contact.title': 'Contact',

        'footer.text': '© 2025 ĐỖ THIỆU VY — SOFTWARE ENGINEERING STUDENT',
    },

    vi: {
        'nav.projects': 'Dự án',
        'nav.stack': 'Kỹ năng',
        'nav.contact': 'Liên hệ',

        'hero.eyebrow': 'Lập trình viên · Fullstack',
        'hero.title.line1': 'Biến <em>ý tưởng</em> thành',
        'hero.title.line2': '<em>sản phẩm thật.</em>',
        'hero.sub': 'Mình là Thiệu Vy — sinh viên năm 3 ngành Kỹ thuật Phần mềm, thích xây dựng giao diện gọn gàng và dễ dùng. Làm việc được cả frontend lẫn backend, hiện tập trung nhiều hơn vào phía frontend.',
        'hero.cta.work': 'Xem dự án',
        'hero.cta.contact': 'Liên hệ ngay',

        'projects.label': 'Dự án nổi bật',
        'projects.title': 'Những thứ<br/>mình đã làm.',

        'projects.flow.tag': 'Fullstack · Thời gian thực · Đang phát triển',
        'projects.flow.title': 'FLOW<br/>Nền tảng cứu trợ thú cưng',
        'projects.flow.desc': 'Nền tảng kết nối người cứu hộ và nhận nuôi thú cưng theo thời gian thực. Người dùng có thể gửi tín hiệu SOS, phối hợp cứu hộ và liên lạc trực tiếp. Backend NestJS, PostGIS cho truy vấn vị trí, Socket.io cho cập nhật realtime.',

        'projects.pikachu.tag': 'Mobile · Lập trình game',
        'projects.pikachu.title': 'Game Pikachu (Android)',
        'projects.pikachu.desc': 'Game ghép ô Pikachu viết từ đầu bằng Java. Tự xây dựng thuật toán kiểm tra đường nối, hệ thống tính điểm, đếm ngược, điều kiện thắng/thua và reset màn — không dùng game engine.',

        'projects.research.tag': 'Nghiên cứu · Đồng tác giả · Đã xuất bản',
        'projects.research.title': 'Tự động hóa tài liệu SDLC<br/>(IoT)',
        'projects.research.desc': 'Hỗ trợ nhóm nghiên cứu về Hệ thống Đa tác nhân. Đóng góp vào việc viết và chuẩn hóa tài liệu kỹ thuật cho giai đoạn triển khai hệ thống.',

        'skills.label': 'Giới thiệu & Kỹ năng',
        'skills.tech.title': 'Công nghệ sử dụng',
        'skills.edu.title': 'Học vấn',
        'skills.edu.major': 'Kỹ thuật Phần mềm',
        'skills.edu.year': 'Năm 3 — hoàn thành 76%',
        'skills.edu.location': 'TP. Hồ Chí Minh, Việt Nam',
        'skills.activities.title': 'Hoạt động',
        'skills.activities.workshops': 'Workshop & hội thảo công nghệ',
        'skills.activities.oss': 'Đóng góp mã nguồn mở',
        'skills.contact.title': 'Liên hệ',

        'footer.text': '© 2025 ĐỖ THIỆU VY — SINH VIÊN KỸ THUẬT PHẦN MỀM',
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

    // Update active state on switcher
    document.getElementById('langEN').classList.toggle('lang-active', lang === 'en');
    document.getElementById('langVI').classList.toggle('lang-active', lang === 'vi');

    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
}

document.getElementById('langSwitch').addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'vi' : 'en');
});

// Init on load
applyLang(currentLang);