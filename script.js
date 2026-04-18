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