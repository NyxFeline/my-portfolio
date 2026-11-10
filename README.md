# NyxFeline — Portfolio Website

> Personal portfolio website of **Đỗ Thiệu Vy** — Fullstack Developer based in Ho Chi Minh City.

---

## 🚀 Live Demo

👉 [https://nyxfeline-dothieuvy.netlify.app/](https://nyxfeline-dothieuvy.netlify.app/)

---

## 🧠 Overview

A minimalist, performance-focused portfolio built with pure HTML, CSS, and JavaScript. The current design uses a modern dark theme, cyan accent system, responsive layout, and bento-style project cards.

---

## 🧰 Tech Stack

| Technology    | Details                       |
| ------------- | ----------------------------- |
| HTML5         | Semantic markup               |
| CSS3          | Custom properties, animations |
| JavaScript    | Vanilla, no bundlers          |
| No frameworks | Zero external dependencies    |

---

## ✨ Features

- 📜 Scroll reveal animation
- 🌑 Modern dark theme with cyan accents
- 🧩 Bento-style project cards
- 🌐 English/Vietnamese language switcher
- 📱 Responsive layout
- ⚡ Clean, lightweight structure

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Main page
├── style.css        # Styling & variables
├── script.js        # Interactions & effects
├── assets/
│   └── logo.png     # Browser favicon
└── README.md
```

---

## ⚙️ How To Run

Run locally with **Live Server** (Ritwick Dey):

1. Install the Live Server extension in VS Code
2. Right-click `index.html` in the file explorer
3. Select **Open with Live Server**

Or simply open `index.html` directly in your browser.

---

## 🎨 Customization

### Change Font

```html
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

```css
--font-display: "Plus Jakarta Sans", sans-serif;
--font-body: "Inter", sans-serif;
```

### Change Colors

```css
:root {
  --bg: #0f1115;
  --bg-surface: #1e2024;
  --sky: #00e5ff;
  --text: #d4d4d8;
  --muted: #a1a1aa;
}
```

### Add Project Card

Duplicate the `.project-card` block in `index.html`.

---

## 📌 Design Philosophy

- **Minimal dependencies** — easier long-term maintenance
- **Visual identity** driven by a charcoal background and cyan accent
- **Recruiter-first layout** — clear experience, projects, skills, and contact details

---

## 👤 Author

**Đỗ Thiệu Vy** — Fullstack Developer · Ho Chi Minh City

- 📧 Email: [dothieuvy@gmail.com](mailto:dothieuvy@gmail.com)
- 🐙 GitHub: [github.com/NyxFeline](https://github.com/NyxFeline)
- 📞 Phone: 0981 324 463
