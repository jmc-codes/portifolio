document.addEventListener("DOMContentLoaded", () => {
  // Cache 
  const header     = document.querySelector(".header");
  const navToggle  = document.querySelector(".nav__toggle");
  const navList    = document.querySelector(".nav__list");
  const navLinks   = navList.querySelectorAll('a[href^="#"]');
  const cards      = document.querySelectorAll(".card");
  const sections   = document.querySelectorAll("section[id]");
  const backToTop  = initBackToTopButton();

  // Rolagem suave + fechar menu móvel ao clicar
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      navList.classList.remove("open");
    });
  });

  // navegação móvel
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  // Cabeçalho fixo, botão voltar ao topo e scroll-spy
  window.addEventListener("scroll", throttle(() => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 50);
    backToTop.toggle(y > 300);
    scrollSpy();
  }, 100));

  // aparecer cartas ao rolar
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add("visible");
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));

  // clique para voltar ao topo
  backToTop.btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // link de navegação na janela ativa
  function scrollSpy() {
    const mid = window.scrollY + window.innerHeight / 2;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id     = sec.id;
      const link   = document.querySelector(`.nav__list a[href="#${id}"]`);
      if (link) {
        link.classList.toggle("active", mid >= top && mid < bottom);
      }
    });
  }

  // acelerador
  function throttle(fn, wait) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= wait) {
        fn(...args);
        last = now;
      }
    };
  }

  // criar e gerenciar um botão Voltar ao topo
  function initBackToTopButton() {
    const btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.textContent = "↑";
    Object.assign(btn.style, {
      position:    "fixed",
      bottom:      "2rem",
      right:       "2rem",
      width:       "3rem",
      height:      "3rem",
      border:      "none",
      borderRadius:"50%",
      background:  "var(--color-accent)",
      color:       "var(--color-light)",
      fontSize:    "1.5rem",
      opacity:     "0",
      visibility:  "hidden",
      transition:  "opacity 0.3s, visibility 0.3s",
      cursor:      "pointer",
      zIndex:      "1000"
    });
    document.body.appendChild(btn);
    return {
      btn,
      toggle(show) {
        btn.style.visibility = show ? "visible" : "hidden";
        btn.style.opacity    = show ? "1"       : "0";
      }
    };
  }
});
