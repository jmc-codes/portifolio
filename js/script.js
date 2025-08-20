// 🌟 Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 🎬 Animações de entrada
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section, .card').forEach(el => observer.observe(el));

// 📩 Validação de formulário (se houver)
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    const email = form.querySelector('input[type="email"]');
    const name = form.querySelector('input[name="name"]');
    if (!email.value || !name.value) {
      e.preventDefault();
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });
}

// 🌙 Alternância de tema claro/escuro
const toggleTheme = document.createElement('button');
toggleTheme.textContent = '🌙';
toggleTheme.className = 'theme-toggle';
document.body.appendChild(toggleTheme);

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// 📱 Menu responsivo
const nav = document.querySelector('.nav');
const mobileToggle = document.createElement('button');
mobileToggle.className = 'mobile-toggle';
mobileToggle.textContent = '☰';
document.querySelector('.header').appendChild(mobileToggle);

mobileToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
