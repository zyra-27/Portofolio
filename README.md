# Alex Ramadhan — Personal Portfolio 🚀

Modern, responsive, dark-themed personal portfolio for an Informatics student specializing in Cybersecurity, Web Development, and Software Engineering.

---

## 📁 Struktur Folder

```
portfolio/
├── index.html              ← Halaman utama (semua section)
├── css/
│   └── style.css           ← Seluruh styling, CSS Variables, responsive
├── js/
│   └── script.js           ← Semua interaktivitas JS
├── assets/
│   ├── images/
│   │   ├── profile.jpg     ← ⚠ Ganti dengan foto profil kamu
│   │   ├── project-1.jpg   ← Screenshot project 1
│   │   ├── project-2.jpg   ← Screenshot project 2
│   │   ├── project-3.jpg   ← Screenshot project 3
│   │   └── project-4.jpg   ← Screenshot project 4
│   └── resume/
│       └── cv-alex-ramadhan.pdf  ← ⚠ Ganti dengan CV kamu
└── README.md
```

---

## 🚀 Cara Menjalankan

### Option A – Buka langsung (paling mudah)
```
Double-click index.html → terbuka di browser
```
> ⚠ Beberapa fitur (font Google, icon FA, AOS, Typed.js) butuh koneksi internet karena pakai CDN.

### Option B – Live Server (disarankan untuk development)
1. Install extension **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Buka `http://127.0.0.1:5500`

### Option C – Python HTTP server
```bash
cd portfolio
python -m http.server 8080
# buka http://localhost:8080
```

---

## ✏️ Kustomisasi

### Ganti Informasi Pribadi
Cari dan ganti teks berikut di `index.html`:

| Placeholder          | Ganti dengan             |
|----------------------|--------------------------|
| `Alex Ramadhan`      | Nama lengkap kamu        |
| `alex@email.com`     | Email kamu               |
| `alexramadhan`       | Username GitHub/IG kamu  |
| `Universitas Negeri` | Nama universitasmu       |
| `3.82`               | IPK kamu                 |

### Foto Profil
```html
<!-- Di hero section, ganti src: -->
<img src="assets/images/profile.jpg" alt="Nama kamu" />
```

### Warna Utama
Edit CSS Variables di `css/style.css` bagian `:root`:
```css
:root {
  --primary:  #8b5cf6;   /* ubah warna utama */
  --accent:   #06b6d4;   /* ubah warna aksen */
}
```

### Tambah/Hapus Project
Copy satu blok `<article class="project-card">` di section `#projects`, lalu edit isinya.

### Tambah Skill
Copy satu `<div class="tech-badge">` di section skills, edit ikon dan teks.

---

## 🎨 Fitur Lengkap

| Fitur | Status |
|-------|--------|
| Dark / Light Mode Toggle | ✅ |
| Preferensi disimpan localStorage | ✅ |
| Sticky Navbar + active link | ✅ |
| Mobile Hamburger Menu | ✅ |
| Loading Screen | ✅ |
| Scroll Progress Bar | ✅ |
| Particle Background | ✅ |
| Custom Cursor (desktop) | ✅ |
| Typing Effect (Typed.js) | ✅ |
| Scroll Reveal (AOS) | ✅ |
| Animated Counter Stats | ✅ |
| Animated Skill Progress Bars | ✅ |
| Glassmorphism Cards | ✅ |
| Project Cards + Hover Overlay | ✅ |
| Floating Social Media Bar | ✅ |
| Contact Form + JS Validation | ✅ |
| Back to Top Button | ✅ |
| Fully Responsive (mobile/tablet/desktop) | ✅ |
| SEO Meta Tags | ✅ |
| Semantic HTML5 | ✅ |
| Accessible (ARIA labels) | ✅ |

---

## 📦 Dependencies (via CDN, tidak perlu install)

| Library | Versi | Kegunaan |
|---------|-------|---------|
| Font Awesome | 6.5.0 | Icons |
| Google Fonts (Syne, DM Sans, JetBrains Mono) | latest | Typography |
| AOS | 2.3.4 | Scroll animations |
| Typed.js | 2.0.12 | Typing effect |

---

## 🚢 Deploy ke Internet (gratis)

### Netlify (paling mudah)
1. Daftar di [netlify.com](https://netlify.com)
2. Drag & drop folder `portfolio/` ke Netlify dashboard
3. Selesai! Dapat domain `.netlify.app`

### GitHub Pages
1. Push semua file ke repo GitHub
2. Settings → Pages → Branch: `main` → `/root`
3. Akses di `https://username.github.io/repo-name`

### Vercel
```bash
npm i -g vercel
cd portfolio
vercel
```

---

## 📄 Lisensi
Free to use & customize for personal portfolio purposes.

---

*Built with ❤️ using vanilla HTML, CSS & JavaScript — 2026*
