// js/hero.js

function initHero() {
  console.log("initHero() llamado, configurando slider...");

  // Busca los elementos del hero
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".indicator");
  const hero = document.querySelector(".hero");

  // Si no hay slides, salimos
  if (!slides.length || !indicators.length) {
    console.warn("No se encontraron slides o indicadores para el hero.");
    return;
  }

  let currentSlide = 0;

  function updateSlider(index) {
    if (index < 0 || index >= slides.length) return;

    // Quita la clase 'active' del slide actual, y la añade al nuevo
    document.querySelector(".hero-slide.active")?.classList.remove("active");
    slides[index].classList.add("active");

    // Quita la clase 'active' del indicador actual, y la añade al nuevo
    document.querySelector(".indicator.active")?.classList.remove("active");
    indicators[index].classList.add("active");

    currentSlide = index;
  }

  function showNextSlide() {
    const nextSlide = (currentSlide + 1) % slides.length;
    updateSlider(nextSlide);
  }

  function showPreviousSlide() {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider(prevSlide);
  }

  // Slider automático: cambia de slide cada 5 segundos
  setInterval(showNextSlide, 5000);

  // Navegación con el mouse
  hero.addEventListener("mousemove", (e) => {
    const heroRect = hero.getBoundingClientRect();
    const relativeX = e.clientX - heroRect.left;
    const heroWidth = hero.offsetWidth;
    hero.style.cursor = relativeX < heroWidth / 2 ? "w-resize" : "e-resize";
  });

  hero.addEventListener("click", (e) => {
    const heroRect = hero.getBoundingClientRect();
    const relativeX = e.clientX - heroRect.left;
    const heroWidth = hero.offsetWidth;
    if (relativeX < heroWidth / 2) {
      showPreviousSlide();
    } else {
      showNextSlide();
    }
  });

  // Clic en los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      e.stopPropagation(); // evita el click en el hero
      updateSlider(index);
    });
  });

  console.log("initHero() completado: slider configurado.");
}
