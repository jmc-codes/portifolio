document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});

//Menu 
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

const toggleBtn = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
toggleBtn.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Scroll simples 
const cards = document.querySelectorAll('.card');
const revealOnScroll = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
};
const observer = new IntersectionObserver(revealOnScroll, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));
