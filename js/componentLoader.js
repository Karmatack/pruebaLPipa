// js/componentLoader.js

document.addEventListener("DOMContentLoaded", async () => {
  try {

    await loadComponent("#header", "/components/layout/header.html");
    
    await loadComponent("#hero", "/components/sections/hero.html");
    initHero();

    await loadComponent("#gallery", "/components/sections/product-gallery.html");
    initGallery();

    await loadComponent("#editorial", "/components/sections/editorial.html");

  } catch (error) {
    console.error("Error cargando componentes:", error);
  }
});

// Versión async de la función para cargar e inyectar un HTML
async function loadComponent(selector, file) {
  const response = await fetch(file);
  if (!response.ok) {
    throw new Error(`Error al cargar ${file}: ${response.status}`);
  }
  const html = await response.text();
  const container = document.querySelector(selector);
  if (!container) {
    throw new Error(`No se encontró el contenedor con el selector: ${selector}`);
  }
  container.insertAdjacentHTML("beforeend", html);
  console.log(`Componente ${file} inyectado en ${selector}`);
}
