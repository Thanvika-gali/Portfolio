// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 60);
});

// Theme toggle
const toggle = document.getElementById('themeToggle');
const label = document.getElementById('themeLabel');
toggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
  label.textContent = isLight ? 'DARK' : 'LIGHT';
});

// Hamburger
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
ham.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
function closeMobile() { mobileNav.classList.remove('open'); }

// Scroll progress
const prog = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  prog.style.width = pct + '%';
  backTop.classList.toggle('visible', window.scrollY > 400);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars when visible
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// Hover effects on cursor
document.querySelectorAll('a, button, .skill-tag, .project-card, .cert-card, .ach-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'var(--accent)';
  });
});

// Typing effect for terminal (optional reinforce)
const cmds = ['cat profile.json', 'ls ./projects/', 'git log --oneline'];
let ci = 0;
// subtle terminal cycling could go here if desired
