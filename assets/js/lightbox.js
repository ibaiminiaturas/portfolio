console.log("LIGHTBOX JS CARGADO");

let currentImages = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

function adjustLightboxForHeader() {
  const header = document.getElementById('main-header');
  const headerHeight = header ? header.offsetHeight : 0;
  lightbox.style.setProperty('--header-height', headerHeight + 'px');
  console.log("Ajustando lightbox para header, altura:", headerHeight);
}

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  updateLightboxImage();

  adjustLightboxForHeader(); // actualizar altura cabecera

  lightbox.style.display = 'flex';
  lightbox.style.opacity = 0;
  lightbox.style.transition = 'opacity 0.3s ease';
  requestAnimationFrame(() => lightbox.style.opacity = 1);
}

window.addEventListener('resize', adjustLightboxForHeader);

function closeLightbox() {
  lightbox.style.opacity = 0;
  lightbox.addEventListener('transitionend', () => {
    lightbox.style.display = 'none';
  }, { once: true });
}

function updateLightboxImage() {
  // fade out actual
  lightboxImg.style.transition = 'opacity 0.5s ease';
  lightboxImg.style.opacity = 0;
  if (currentIndex === 0) {
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  }
  setTimeout(() => {
    // cambiar src
    lightboxImg.src = currentImages[currentIndex];
    
    // fade in
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = 1;
          prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentIndex < currentImages.length - 1 ? 'block' : 'none';
    positionButtons();
    };
  }, 200); // duración del fade out
  // Mostrar u ocultar flechas según posición
  
}

function showNext() {
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    updateLightboxImage();
  }
}

function showPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateLightboxImage();
  }
}

function positionButtons() {
  const imgRect = lightboxImg.getBoundingClientRect();
  const containerRect = lightbox.getBoundingClientRect(); // contenedor relativo

  const margin = 20;

  // izquierda
  prevBtn.style.left = (imgRect.left - containerRect.left - prevBtn.offsetWidth - margin) + 'px';
  prevBtn.style.top = (imgRect.top - containerRect.top + imgRect.height / 2 - prevBtn.offsetHeight / 2) + 'px';

  // derecha
  nextBtn.style.left = (imgRect.right - containerRect.left + margin) + 'px';
  nextBtn.style.top = (imgRect.top - containerRect.top + imgRect.height / 2 - nextBtn.offsetHeight / 2) + 'px';
}

// Eventos
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('resize', () => { if (lightbox.style.display === 'flex') positionButtons(); });

// Exponer globalmente
window.openLightbox = openLightbox;
console.log("openLightbox global:", window.openLightbox);