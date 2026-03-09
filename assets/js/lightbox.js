console.log("LIGHTBOX JS CARGADO");

let currentImages = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  updateLightboxImage();

  // Mostrar lightbox
  lightbox.style.display = 'flex';
  lightbox.style.opacity = 0;
  lightbox.style.transition = 'opacity 0.3s ease';
  requestAnimationFrame(() => lightbox.style.opacity = 1);
}

function closeLightbox() {
  lightbox.style.opacity = 0;
  lightbox.addEventListener('transitionend', () => {
    lightbox.style.display = 'none';
  }, { once: true });
}

function updateLightboxImage() {
  lightboxImg.style.opacity = 0;
  lightboxImg.src = currentImages[currentIndex];
  lightboxImg.onload = () => {
    lightboxImg.style.opacity = 1;
    positionButtons();
  };

  // Mostrar u ocultar flechas según posición
  prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
  nextBtn.style.display = currentIndex < currentImages.length - 1 ? 'block' : 'none';
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