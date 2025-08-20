// ===============================
// Mobile Menu Toggle
// ===============================
const mobileToggle = document.querySelector(".mobile-toggle");
const nav = document.querySelector(".nav");

mobileToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Fecha o menu ao clicar em link no mobile
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// ===============================
// Dark Mode Toggle
// ===============================
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Aplica tema escuro se já estiver salvo
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// ===============================
// Scroll Animations (Intersection Observer)
// ===============================
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});
