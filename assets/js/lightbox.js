let currentImages = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

// Eliminada la función adjustLightboxForHeader para usar todo el espacio real

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  
  // Escondemos flechas antes de mostrar el lightbox
  prevBtn.style.opacity = 0;
  nextBtn.style.opacity = 0;
  prevBtn.style.pointerEvents = 'none';
  nextBtn.style.pointerEvents = 'none';

  updateLightboxImage();

  // Aseguramos que el z-index sea altísimo para tapar el header
  lightbox.style.zIndex = "9999";
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
  lightboxImg.style.transition = 'opacity 0.2s ease';
  lightboxImg.style.opacity = 0;

  prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
  nextBtn.style.visibility = currentIndex < currentImages.length - 1 ? 'visible' : 'hidden';

  setTimeout(() => {
    lightboxImg.src = currentImages[currentIndex];
    
    lightboxImg.onload = () => {
      positionButtons(); 
      lightboxImg.style.opacity = 1;

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
    
    // Si la imagen no está cargada, no calculamos
    if (imgRect.width === 0) return;

    const margin = 20; // Espacio entre imagen y botón
    const viewportWidth = window.innerWidth;

    // --- BOTÓN IZQUIERDO ---
    // Calculamos la posición: el borde izquierdo de la imagen menos el ancho del botón
    let leftPos = imgRect.left - prevBtn.offsetWidth - margin;
    
    // Si no hay espacio a la izquierda, lo pegamos al borde de la pantalla
    if (leftPos < margin) {
        prevBtn.style.left = margin + 'px';
    } else {
        prevBtn.style.left = leftPos + 'px';
    }

    // --- BOTÓN DERECHO ---
    // En lugar de calcular 'left', calculamos la distancia desde la DERECHA de la pantalla
    // Distancia = (Ancho total pantalla - Borde derecho de imagen) - Ancho botón - margen
    let spaceOnRight = viewportWidth - imgRect.right;
    let rightPos = spaceOnRight - nextBtn.offsetWidth - margin;

    // Limpiamos el 'left' previo para que no haya conflictos
    nextBtn.style.left = 'auto';

    // Si no hay espacio a la derecha, lo pegamos al borde derecho de la pantalla
    if (rightPos < margin) {
        nextBtn.style.right = margin + 'px';
    } else {
        nextBtn.style.right = rightPos + 'px';
    }

    // --- CENTRADO VERTICAL ---
    const topPos = (imgRect.top + (imgRect.height / 2) - (prevBtn.offsetHeight / 2)) + 'px';
    prevBtn.style.top = topPos;
    nextBtn.style.top = topPos;
}
// Eventos
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('resize', () => { if (lightbox.style.display === 'flex') positionButtons(); });

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'Escape') closeLightbox();
  }
});

window.openLightbox = openLightbox;