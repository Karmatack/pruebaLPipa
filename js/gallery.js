// js/gallery.js

function initGallery() {
  console.log("initGallery() llamado, configurando galería...");

  const gridContainer = document.getElementById("grid-container");
  if (!gridContainer) {
    console.error("No se encontró el contenedor de la galería (#grid-container).");
    return;
  }

  let basket = [];

  fetch("/json/galery.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        let container;

        if (card.type === "image") {
          container = document.createElement("div");
          container.classList.add("image-container");

          const img = document.createElement("img");
          img.src = card.images[0];
          // Deshabilitamos el arrastre nativo para evitar comportamientos por defecto
          img.setAttribute("draggable", false);
          container.appendChild(img);

          // Botones de navegación
          const navButtons = document.createElement("div");
          navButtons.classList.add("navigation-buttons");

          const prevButton = document.createElement("button");
          prevButton.classList.add("prev");
          prevButton.textContent = "<";
          prevButton.disabled = true;

          const nextButton = document.createElement("button");
          nextButton.classList.add("next");
          nextButton.textContent = ">";

          navButtons.appendChild(prevButton);
          navButtons.appendChild(nextButton);
          container.appendChild(navButtons);

          // Lógica de navegación con botones
          let index = 0;
          const updateButtons = () => {
            prevButton.disabled = (index === 0);
            nextButton.disabled = (index === card.images.length - 1);
          };

          prevButton.addEventListener("click", () => {
            if (index > 0) {
              index--;
              img.src = card.images[index];
              updateButtons();
            }
          });

          nextButton.addEventListener("click", () => {
            if (index < card.images.length - 1) {
              index++;
              img.src = card.images[index];
              updateButtons();
            }
          });

          // ------------------------------------------------------
          // DRAG CON EL MOUSE
          // ------------------------------------------------------
          let isDragging = false;
          let startX = 0;
          let endX = 0;
          const threshold = 50; // Distancia mínima para reconocer un swipe

          container.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX;
            endX = 0;
          });

          container.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            endX = e.clientX;
            e.preventDefault();
          });

          container.addEventListener("mouseup", (e) => {
            isDragging = false;
            endX = e.clientX;
            const distance = endX - startX;
            
            if (Math.abs(distance) > threshold) {
              if (distance < 0) { 
                // Swipe a la izquierda -> siguiente imagen
                if (index < card.images.length - 1) {
                  index++;
                  img.src = card.images[index];
                }
              } else {
                // Swipe a la derecha -> imagen anterior
                if (index > 0) {
                  index--;
                  img.src = card.images[index];
                }
              }
            }
            updateButtons();
          });

          container.addEventListener("mouseleave", () => {
            isDragging = false;
          });

          // ------------------------------------------------------
          // SWIPE CON TOUCH (móviles, tablets)
          // ------------------------------------------------------
          let isTouching = false;
          let startTouchX = 0;
          let endTouchX = 0;

          container.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            isTouching = true;
            startTouchX = touch.clientX;
            endTouchX = 0;
          });

          container.addEventListener("touchmove", (e) => {
            if (!isTouching) return;
            const touch = e.touches[0];
            endTouchX = touch.clientX;
            e.preventDefault();
          });

          container.addEventListener("touchend", () => {
            isTouching = false;
            const distance = endTouchX - startTouchX;
            if (Math.abs(distance) > threshold) {
              if (distance < 0) {
                if (index < card.images.length - 1) {
                  index++;
                  img.src = card.images[index];
                }
              } else {
                if (index > 0) {
                  index--;
                  img.src = card.images[index];
                }
              }
            }
            updateButtons();
          });
        } else if (card.type === "video") {
          container = document.createElement("div");
          container.classList.add("video-container");

          const video = document.createElement("video");
          video.src = card.video;
          video.loop = true;
          video.autoplay = true;
          video.muted = true;
          video.playsInline = true;
          video.controls = false;
          container.appendChild(video);
        }

        // Agregar la capa de tallas
        const sizeOverlay = document.createElement("div");
        sizeOverlay.classList.add("size-overlay");
        const overlayTitle = document.createElement("h4");
        overlayTitle.textContent = "Añadir talla";
        sizeOverlay.appendChild(overlayTitle);

        const sizeGrid = document.createElement("div");
        sizeGrid.classList.add("size-grid");

        const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
        sizes.forEach((size) => {
          const sizeSpan = document.createElement("span");
          sizeSpan.textContent = size;
          sizeSpan.addEventListener("click", () => {
            basket.push({ product: card.title, size: size });
            console.log(basket);
            alert(`Se añadió la talla ${size} de ${card.title} a la cesta.`);
          });
          sizeGrid.appendChild(sizeSpan);
        });

        sizeOverlay.appendChild(sizeGrid);
        container.appendChild(sizeOverlay);
        cardElement.appendChild(container);

        // Título y precio
        const title = document.createElement("h3");
        title.textContent = card.title;
        cardElement.appendChild(title);

        if (card.discountPrice) {
          const price = document.createElement("p");
          price.innerHTML = `
            <span style="color:red;font-weight:bold;">${card.discountPrice}</span>
            <span style="text-decoration:line-through;color:grey;">${card.price}</span>`;
          cardElement.appendChild(price);
        } else {
          const price = document.createElement("p");
          price.textContent = card.price;
          cardElement.appendChild(price);
        }

        gridContainer.appendChild(cardElement);
      });
      console.log("initGallery() completado: galería configurada.");
    })
    .catch(error => console.error("Error al cargar el JSON:", error));
}
