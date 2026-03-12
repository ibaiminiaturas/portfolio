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
  
  // Escondemos flechas antes de mostrar el lightbox
  prevBtn.style.opacity = 0;
  nextBtn.style.opacity = 0;
  prevBtn.style.pointerEvents = 'none';
  nextBtn.style.pointerEvents = 'none';

  updateLightboxImage();

  adjustLightboxForHeader();

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
  lightboxImg.style.transition = 'opacity 0.2s ease';
  lightboxImg.style.opacity = 0;

  // No tocamos la opacidad de las flechas aquí si ya se están mostrando,
  // solo manejamos la visibilidad lógica (flecha izq en foto 1, etc)
  prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
  nextBtn.style.visibility = currentIndex < currentImages.length - 1 ? 'visible' : 'hidden';

  setTimeout(() => {
    lightboxImg.src = currentImages[currentIndex];
    
    lightboxImg.onload = () => {
      // 1. Calculamos posición (aquí es donde se "teletransportan" internamente)
      positionButtons(); 
      
      // 2. Mostramos imagen
      lightboxImg.style.opacity = 1;

      // 3. REVELACIÓN FINAL: Si las flechas estaban en opacity 0 (primera apertura), 
      // las mostramos suavemente YA en su sitio.
      requestAnimationFrame(() => {
        prevBtn.style.opacity = 1;
        nextBtn.style.opacity = 1;
        prevBtn.style.pointerEvents = 'auto';
        nextBtn.style.pointerEvents = 'auto';
      });
    };
  }, 150);
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

// Manejo de teclado para navegar y cerrar
document.addEventListener('keydown', (e) => {
  // Solo actuar si el lightbox está visible
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  }
});

// Exponer globalmente
window.openLightbox = openLightbox;
console.log("openLightbox global:", window.openLightbox);