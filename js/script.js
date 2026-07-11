/* ═══════════════════════════════════════════════════════
   PORTFOLIO – SCRIPT.JS
   Shofiyatur Rahmatin Nazilah | 2026
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. LOADER ─── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loaderBar');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    bar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => loader.classList.add('hidden'), 400);
    }
  }, 120);
});

/* ─── 2. AOS (Scroll Reveal) ─── */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

/* ─── 3. TYPED.JS (Tagline) ─── */
new Typed('#typedTagline', {
  strings: [
    'Cybersecurity Enthusiast',
    'Web Developer',
    'Software Engineer',
    'Informatics Student',
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  showCursor: true,
  cursorChar: '_',
});

/* ─── 4. NAVBAR ─── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.navbar__link');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const link = document.querySelector(`.navbar__link[href="#${section.id}"]`);
      if (!link) return;
      const top = section.offsetTop;
      const bot = top + section.offsetHeight;
      link.classList.toggle('active', scrollY >= top && scrollY < bot);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
})();

/* ─── 5. SCROLL PROGRESS ─── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(window.scrollY / total) * 100}%`;
  }, { passive: true });
})();

/* ─── 6. CUSTOM CURSOR ───
   Removed along with the CSS — the cursor/follower elements are
   permanently hidden now, so this loop would just run for nothing. */

/* ─── 7. DARK / LIGHT THEME TOGGLE ─── */
(function initTheme() {
  const btn   = document.getElementById('themeToggle');
  const icon  = document.getElementById('themeIcon');
  const saved = localStorage.getItem('theme') || 'dark';

  const apply = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  };

  apply(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark');
  });
})();

/* ─── 8. ANIMATED COUNTER ─── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = el => {
    const target   = parseInt(el.dataset.target, 10);
    const decimal  = el.dataset.decimal === 'true';
    const duration = 1800;
    let start;

    const step = timestamp => {
      if (!start) start = timestamp;
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);

      el.textContent = decimal
        ? (value / 100).toFixed(2)
        : value.toLocaleString();

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimal ? (target / 100).toFixed(2) : target.toLocaleString();
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ─── 9. SKILL PROGRESS BARS ─── */
(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = `${bar.dataset.width}%`;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ─── 10. BACK TO TOP ─── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─── 11. CONTACT FORM VALIDATION ─── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name:  { el: document.getElementById('contactName'),  err: document.getElementById('nameError') },
    email: { el: document.getElementById('contactEmail'), err: document.getElementById('emailError') },
    msg:   { el: document.getElementById('contactMsg'),   err: document.getElementById('msgError') },
  };
  const success   = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  const validate = () => {
    let valid = true;
    const { name, email, msg } = fields;

    if (!name.el.value.trim() || name.el.value.trim().length < 2) {
      name.err.textContent = '⚠ Name must be at least 2 characters.';
      valid = false;
    } else { name.err.textContent = ''; }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.el.value.trim())) {
      email.err.textContent = '⚠ Please enter a valid email address.';
      valid = false;
    } else { email.err.textContent = ''; }

    if (!msg.el.value.trim() || msg.el.value.trim().length < 10) {
      msg.err.textContent = '⚠ Message must be at least 10 characters.';
      valid = false;
    } else { msg.err.textContent = ''; }

    return valid;
  };

  Object.values(fields).forEach(({ el }) => {
    el.addEventListener('input', validate);
  });

 form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.send(
      'service_9tyvns9',   // ← ganti
      'template_dxk3cw5',  // ← ganti
      {
        name:  fields.name.el.value.trim(),
        email: fields.email.el.value.trim(),
        message:    fields.msg.el.value.trim(),
        time: new Date().toLocaleString('id-ID'),
      }
    )
    .then(() => {
      success.textContent = 'Message sent! I\'ll get back to you within 24 hours.';
      success.classList.add('show');
      form.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      success.textContent = 'Failed to send. Please try again.';
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });
  });
  })();

/* ─── 12. PARTICLE CANVAS ───
   Removed along with the CSS. The canvas is hidden now, but this loop
   was still simulating ~80 particles and their connections every
   frame for nothing — no reason to keep paying that cost. */

/* ─── 13. SMOOTH SCROLL for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─────────────────────────────────────────────
// DATA — Edit bagian ini untuk mengisi konten
// ─────────────────────────────────────────────
const COURSES = {
  training: {
    category: 'Overview',
    title: 'Training',
    desc: [],
  },
  google: {
    category: 'Cybersecurity',
    title: 'Google Cybersecurity',
    desc: 'Currently pursuing the Google Cybersecurity Professional Certificate. Building practical skills in cybersecurity fundamentals, risk management, network security, Linux, SQL, and Python automation through hands-on labs and real-world scenarios.',
    tags: ['Google', 'Cybersecurity', 'Linux', 'SQL', 'Python', 'Network Security', 'Risk Management'],

  },
  data: {
    category: 'Data',
    title: 'Data Analyst',
    desc: 'Completed a comprehensive Data Analysis bootcamp focused on SQL, Python, statistics, data visualization, and business analytics. Gained hands-on experience in data cleaning, exploratory data analysis (EDA), and creating insights to support data-driven decision making.',
    tags: ['Data Analyst', 'Python', 'SQL', 'Statistics', 'Data Visualization', 'EDA', 'Business Analyst'],
    cert: 'assets/sertif myskill/data analyst.jpg',
  },
  fga: {
    category: 'Cybersecurity',
    title: 'Cybersecurity FGA',
    desc: 'Program Digitalent FGA di bidang keamanan siber, mencakup level Fundamental dan Intermediate.',
    tags: ['FGA', 'Digitalent', 'Cybersecurity'],
  },
  g1: {
    category: 'Google Cybersecurity',
    title: 'Foundations of Cybersecurity',
    desc: 'Completed the introductory cybersecurity course by Google, learning core concepts including cybersecurity principles, threat landscapes, security frameworks, risk management, and organizational security practices.',
    tags: ['Cybersecurity', 'Information Security', 'Security Fundamentals'],
    cert: 'assets/sertif coursera/Foundations of Cybersecurity.jpg',
  },
  g2: {
    category: 'Google Cybersecurity',
    title: 'Play It Safe: Manage Security Risk',
    desc: 'Completed the Play It Safe: Manage Security Risks course by Google, gaining knowledge in risk assessment, security governance, compliance, security controls, and best practices for protecting organizational assets.',
    tags: ['Cybersecurity', 'Risk Management', 'Security Controls'],
    cert: 'assets/sertif coursera/Play It Safe Manage Security Risks.jpg',
  },
  g3: {
    category: 'Google Cybersecurity',
    title: 'Connect & Protect: Networks and Network Security',
    desc: 'Completed the Connect and Protect: Networks and Network Security course by Google, developing skills in network architecture, TCP/IP, common network protocols, firewalls, intrusion detection, and network security best practices.',
    tags: ['Cybersecurity', 'Network Security', 'TCP/IP', 'Firewalls'],
    cert: 'assets/sertif coursera/Connect and Protect Networks and Network Security.jpg',
  },
  g4: {
    category: 'Google Cybersecurity',
    title: 'Tools of the Trade: Linux & SQL',
    desc: 'Completed the Tools of the Trade: Linux and SQL course by Google, gaining hands-on experience with Linux commands, SQL databases, file permissions, database querying, and essential tools used in cybersecurity environments.',
    tags: ['Cybersecurity', 'Linux', 'SQL', 'Security Operations'],
    cert: 'assets/sertif coursera/Tools of the Trade Linux and SQL.jpg',
  },
  g5: {
    category: 'Google Cybersecurity',
    title: 'Automate Tasks with Python',
    desc: 'Completed Googles Automate Cybersecurity Tasks with Python course, developing practical skills in Python programming for cybersecurity automation, including file handling, scripting, regular expressions, data processing, and automating repetitive security tasks.',
    tags: ['Cybersecurity', 'Python', 'Automation',],
    cert: 'assets/sertif coursera/Automate Cybersecurity Tasks with Python.jpg',
  },
  f1: {
    category: 'Cybersecurity FGA',
    title: 'Intermediate Cybesecurity',
    desc: 'Completed the Intermediate Cybersecurity program offered by the Fresh Graduate Academy (FGA) Digital Talent Scholarship 2025. Gained hands-on experience in cybersecurity principles, risk management, network security, Linux, SQL, vulnerability management, and responsible AI, supported by 108 hours of technical training.',
    tags: ['Cybersecurity', 'Linux', 'SQL', 'AI Essentials',],
    cert: 'assets/sertif digitalent/intermidiate sertif_page-0001.jpg',
  },
  f2: {
    category: 'Cybersecurity FGA',
    title: 'Fundamental Cybersecurity',
    desc: 'Completed the Fundamental Cybersecurity program by Fresh Graduate Academy (FGA), covering cybersecurity fundamentals, the evolution of cyber threats, risk and vulnerability management, and essential security tools and programming concepts.',
    tags: ['Cybersecurity', 'Security Fundamentals', 'Vulnerability Management',],
    cert: 'assets/sertif digitalent/fundamental sertif_page-0001.jpg',
  },
};

// ─────────────────────────────────────────────
// LAYOUT — posisi tiap node (xr = 0..1, yr = 0..1)
// ─────────────────────────────────────────────
const LAYOUT = {
  'n-training': { xr: 0.50, yr: 0.50 },

  'n-google':   { xr: 0.28, yr: 0.50 },
  'n-data':     { xr: 0.50, yr: 0.10 },
  'n-fga':      { xr: 0.72, yr: 0.50 },

  // L3 kiri — xr lebih besar agar tidak kepotong
  'n-g1':       { xr: 0.10, yr: 0.14 },
  'n-g2':       { xr: 0.10, yr: 0.30 },
  'n-g3':       { xr: 0.42, yr: 0.72 },
  'n-g4':       { xr: 0.10, yr: 0.70 },
  'n-g5':       { xr: 0.10, yr: 0.86 },

  // L3 kanan — xr lebih kecil agar tidak kepotong
  'n-f1':       { xr: 0.90, yr: 0.38 },
  'n-f2':       { xr: 0.90, yr: 0.62 },
};

// ─────────────────────────────────────────────
// EDGES
// ─────────────────────────────────────────────
const EDGES = [
  ['n-training', 'n-google',  '#1e5cb8'],
  ['n-training', 'n-data',    '#1e5cb8'],
  ['n-training', 'n-fga',     '#1e5cb8'],
  ['n-google',   'n-g1',      '#0f3a7a'],
  ['n-google',   'n-g2',      '#0f3a7a'],
  ['n-google',   'n-g3',      '#0f3a7a'],
  ['n-google',   'n-g4',      '#0f3a7a'],
  ['n-google',   'n-g5',      '#0f3a7a'],
  ['n-fga',      'n-f1',      '#0f3a7a'],
  ['n-fga',      'n-f2',      '#0f3a7a'],
];

// ─────────────────────────────────────────────
// MINDMAP ENGINE
// ─────────────────────────────────────────────
const wrap = document.querySelector('.map-panel');
const cv   = document.getElementById('cv');
const ctx  = cv.getContext('2d');

function getRect(id) {
  const el = document.getElementById(id);
  const wr = wrap.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return { x: er.left - wr.left, y: er.top - wr.top, w: er.width, h: er.height };
}

function edgePoint(rect, tx, ty) {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  const dx = tx - cx, dy = ty - cy;
  const sx = rect.w / 2, sy = rect.h / 2;
  const scaleX = dx !== 0 ? Math.abs(sx / dx) : Infinity;
  const scaleY = dy !== 0 ? Math.abs(sy / dy) : Infinity;
  const s = Math.min(scaleX, scaleY);
  return { x: cx + dx * s, y: cy + dy * s };
}

function place() {
  const w = wrap.clientWidth, h = wrap.clientHeight;
  cv.width = w; cv.height = h;

  // First pass: position all nodes by fraction
  for (const [id, pos] of Object.entries(LAYOUT)) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.style.left = (pos.xr * w - el.offsetWidth  / 2) + 'px';
    el.style.top  = (pos.yr * h - el.offsetHeight / 2) + 'px';
  }

  // Second pass: clamp so no node is clipped by the panel edges
  const PAD = 8;
  document.querySelectorAll('.node').forEach(el => {
    let left = parseFloat(el.style.left);
    let top  = parseFloat(el.style.top);
    left = Math.max(PAD, Math.min(left, w - el.offsetWidth  - PAD));
    top  = Math.max(PAD, Math.min(top,  h - el.offsetHeight - PAD));
    el.style.left = left + 'px';
    el.style.top  = top  + 'px';
  });
}

function drawEdges() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const [a, b, color] of EDGES) {
    const ra = getRect(a), rb = getRect(b);
    const cax = ra.x + ra.w/2, cay = ra.y + ra.h/2;
    const cbx = rb.x + rb.w/2, cby = rb.y + rb.h/2;
    const pa  = edgePoint(ra, cbx, cby);
    const pb  = edgePoint(rb, cax, cay);
    const mx  = (pa.x + pb.x) / 2;

    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.bezierCurveTo(mx, pa.y, mx, pb.y, pb.x, pb.y);
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    [pa, pb].forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }
}

function render() { place(); drawEdges(); }

// ─────────────────────────────────────────────
// DETAIL PANEL
// ─────────────────────────────────────────────
let activeCert = null;

function showDetail(courseId) {
  const data = COURSES[courseId];
  if (!data) return;

  // Highlight active node
  document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-id="${courseId}"]`)?.classList.add('active');

  // Fill detail
  document.getElementById('detail-empty').style.display   = 'none';
  document.getElementById('detail-content').style.display = 'flex';
  document.getElementById('detail-content').style.flexDirection = 'column';

  document.getElementById('d-category').textContent = data.category;
  document.getElementById('d-title').textContent    = data.title;
  document.getElementById('d-desc').textContent     = data.desc;

  const tagsEl = document.getElementById('d-tags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const btn = document.getElementById('btn-cert');
  if (data.cert) {
    btn.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'View Certificate';
    activeCert = data.cert;
  } else {
    btn.disabled = true;
  btn.style.display = 'none';
  activeCert = null;}
}

// Attach click to all nodes
document.querySelectorAll('.node').forEach(el => {
  el.addEventListener('click', () => showDetail(el.dataset.id));
});

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────
function openCert() {
  if (!activeCert) return;
  document.getElementById('cert-frame').src = activeCert;
  document.getElementById('modal').classList.add('active');
}

function closeModal(e) {
  if (e.target.id === 'modal') {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('cert-frame').src = '';
  }
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
window.addEventListener('resize', render);
setTimeout(render, 60);

