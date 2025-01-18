// Datos de los productos
const products = [
    {
      type: "image",
      title: "TOP DUNE",
      price: "S/. 396.00",
      discountPrice: "S/. 352.00",
      images: ["/assets/images/lookbook/topdune.webp"]
    },
    {
      type: "image",
      title: "ABRIGO VENUS",
      price: "S/. 571.00",
      images: ["/assets/images/product-gallery/3-1.webp"]
    },
    {
      type: "image",
      title: "FALDA DUNE",
      price: "S/. 527.00",
      discountPrice: "S/. 396.00",
      images: ["/assets/images/lookbook/falda dune.webp"]
    }
  ];
  
  // Elementos HTML
  const markers = document.querySelectorAll('.marker');
  const mainImage = document.getElementById('main-image'); // Imagen fija
  const productImage = document.getElementById('product-image'); // Imagen que se actualiza
  const productTitle = document.getElementById('product-title');
  const productPrice = document.getElementById('product-price');
  const productDiscount = document.getElementById('product-discount');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  
  let currentIndex = 0;
  
  // Función para actualizar los datos del producto en la card de detalles
  function updateProduct(index) {
    const product = products[index];
  
    // La imagen principal (lookbook) no se modifica.
    // Actualizamos la imagen del producto en la card:
    productImage.src = product.images[0];
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
  
    if (product.discountPrice) {
      productDiscount.textContent = `Oferta: ${product.discountPrice}`;
      productDiscount.classList.remove('hidden');
    } else {
      productDiscount.classList.add('hidden');
    }
  }
  
  // Eventos de los markers
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      currentIndex = index;
      updateProduct(currentIndex);
    });
  });
  
  // Eventos de los botones de navegación
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateProduct(currentIndex);
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    updateProduct(currentIndex);
  });
  
  // Inicialización
  updateProduct(currentIndex);
  