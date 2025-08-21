// =============================================================================================
// Mobile Menu Toggle
// =============================================================================================
const mobileToggle = document.querySelector(".mobile-toggle");
const nav = document.querySelector(".nav");

mobileToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Fecha o menu
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// =============================================================================================
// Dark Mode - Todo o body
// =============================================================================================
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Elementos necessarios
const elementsToToggle = [

  document.querySelector("header"),
  document.querySelector("nav"),
  document.querySelector("footer"),
  ...document.querySelectorAll(".card"),
  ...document.querySelectorAll(".section"),
  ...document.querySelectorAll(".btn"),
];

// Aplicar ou remover Dark mode
function applyDarkMode(isDark) {
  if (isDark) {
    body.classList.add("dark");
    elementsToToggle.forEach(el => el?.classList.add("dark"));
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    elementsToToggle.forEach(el => el?.classList.remove("dark"));
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

// Tema salvo?
const savedTheme = localStorage.getItem("theme");
applyDarkMode(savedTheme === "dark");

// Ativar tema 
themeToggle.addEventListener("click", () => {
  const isDark = !body.classList.contains("dark");
  applyDarkMode(isDark);
});


// =============================================================================================
// Scroll Animations (Intersection Observer)
// =============================================================================================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
  
    // Observador para animar seções (fade-up)
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  
  });
  

  document.addEventListener("DOMContentLoaded", () => {

    // 1. Seletor dos containers, não das barras diretamente
    const containers = document.querySelectorAll(".progress");
  
    if (containers.length === 0) {
      console.error("Nenhum elemento .progress encontrado. Verifique o HTML.");
      return;
    }
  
    // 2. Opções do Observer: threshold baixo para disparar logo que apareça
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
  
    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        console.log("Progress entry:", entry.target, " visível?", entry.isIntersecting);
  
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".progress-bar");
          if (!bar) {
            console.error("Container sem .progress-bar interno:", entry.target);
            observer.unobserve(entry.target);
            return;
          }
  
          const desired = bar.getAttribute("data-width");
          console.log("Valor em data-width:", desired);
  
          if (!desired) {
            console.error("data-width não definido no elemento:", bar);
            observer.unobserve(entry.target);
            return;
          }
  
          // 3. Aplicar transição caso não tenha sido definida no CSS
          bar.style.transition = "width 2s ease-out";
  
          // 4. Animação
          bar.style.width = desired + "%";
  
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    containers.forEach(container => {
      progressObserver.observe(container);
    });
  
  });
  
