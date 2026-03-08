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

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  lightbox.style.opacity = 0;
  lightbox.style.transition = 'opacity 0.8s ease';
  requestAnimationFrame(() => lightbox.style.opacity = 1);
}

function closeLightbox() {
  lightbox.style.opacity = 0;
  lightbox.addEventListener('transitionend', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  }, { once: true });
}

function updateLightboxImage() {
  lightboxImg.style.opacity = 0;
  lightboxImg.style.transition = 'opacity 0.8s ease';

  setTimeout(() => {
    lightboxImg.src = currentImages[currentIndex];
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = 1;
      positionButtons(); // reposiciona flechas con cada imagen
    };
  }, 50);

  updateButtons();
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

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentImages.length - 1;

  prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
  nextBtn.style.opacity = currentIndex === currentImages.length - 1 ? '0.3' : '1';
}

function positionButtons() {
  const imgRect = lightboxImg.getBoundingClientRect();
  const containerRect = lightboxImg.parentElement.getBoundingClientRect(); // contenedor relativo

  const margin = 20; // distancia desde el borde de la imagen

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
window.addEventListener('resize', () => { if (!lightbox.classList.contains('hidden')) positionButtons(); });