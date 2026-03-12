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
  // 1. Solo la IMAGEN hace el fade out
  lightboxImg.style.transition = 'opacity 0.2s ease';
  lightboxImg.style.opacity = 0;

  // 2. Las flechas se actualizan de inmediato (sin desaparecer)
  // Decidimos si deben existir o no antes de que cargue la foto
  prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
  nextBtn.style.visibility = currentIndex < currentImages.length - 1 ? 'visible' : 'hidden';
  
  // Las flechas NO se ocultan, solo se bloquean un momento para evitar spam
  prevBtn.style.pointerEvents = 'none';
  nextBtn.style.pointerEvents = 'none';

  setTimeout(() => {
    lightboxImg.src = currentImages[currentIndex];
    
    lightboxImg.onload = () => {
      // 3. Cuando la imagen carga, las flechas se deslizan a su nueva posición
      // pero como ya eran visibles, solo verás que "viajan" suavemente si la foto cambia de tamaño
      positionButtons(); 
      
      lightboxImg.style.opacity = 1;
      
      // Rehabilitamos el click
      prevBtn.style.pointerEvents = 'auto';
      nextBtn.style.pointerEvents = 'auto';
    };
  }, 150); // Un pelín más rápido para que sea fluido
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