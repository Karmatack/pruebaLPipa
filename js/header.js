// header.js

function initHeader() {
    console.log("initHeader() -> inicializando la lógica del carrito");
  
    // 1. Seleccionar el ícono del carrito en el header
    const cartIcon = document.querySelector(".icon-cart");
    if (!cartIcon) {
      console.error("No se encontró el ícono del carrito (.icon-cart).");
      return;
    }
  
    // 2. Agregar un span dentro del ícono para mostrar la cantidad
    const cartCountElement = document.createElement("span");
    cartCountElement.classList.add("cart-count");
    cartIcon.appendChild(cartCountElement);
  
    // 3. Función para actualizar el contador de items
    function updateCartCount() {
      const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
      cartCountElement.textContent = storedBasket.length; 
    }
  
    // Llamamos la primera vez
    updateCartCount();
  
    // 4. Cada vez que se haga clic en el ícono del carrito, mostramos un panel o modal
    cartIcon.addEventListener("click", () => {
      toggleCartPanel();
    });
  
    // 5. Crear o referenciar un contenedor/panel para mostrar los productos 
    //    (Opcional: puedes inyectar dinámicamente o simplemente manejar un modal).
    let cartPanel = document.querySelector(".cart-panel");
    if (!cartPanel) {
      // Si no existe, lo creamos de forma sencilla (puedes adaptarlo a tu gusto)
      cartPanel = document.createElement("div");
      cartPanel.classList.add("cart-panel", "hidden"); 
      document.body.appendChild(cartPanel);
    }
  
    function toggleCartPanel() {
      // Alterna clase .hidden para mostrar/ocultar
      cartPanel.classList.toggle("hidden");
      renderCartItems();
    }
  
    // 6. Renderizamos los items cuando se abra el panel
    function renderCartItems() {
      const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
      // Limpia el contenido actual
      cartPanel.innerHTML = `
        <div class="cart-panel__header">
          <h2>Tu Carrito</h2>
        </div>
      `;
  
      if (storedBasket.length === 0) {
        cartPanel.innerHTML += `<p>No hay productos en el carrito.</p>`;
        return;
      }
  
      // Crear una lista
      const list = document.createElement("ul");
      list.classList.add("cart-item-list");
  
      storedBasket.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
          <span>${item.product} - Talla: ${item.size}</span>
          <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        list.appendChild(li);
      });
  
      cartPanel.appendChild(list);
  
      // Añadimos funcionalidad para eliminar items
      const removeButtons = cartPanel.querySelectorAll(".remove-item");
      removeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = parseInt(e.target.dataset.index, 10);
          removeItem(idx);
        });
      });
    }
  
    function removeItem(index) {
      const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
      storedBasket.splice(index, 1);
      localStorage.setItem("basket", JSON.stringify(storedBasket));
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Asegurarnos de que se ejecute initHeader() después de que el header se inyecte
  document.addEventListener("DOMContentLoaded", () => {
    // Aquí puedes asegurarte de llamar a initHeader() 
    // SOLO después de que tu header se haya cargado dinámicamente con loadComponent.
    initHeader();
  });
  