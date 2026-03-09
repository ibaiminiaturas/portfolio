<script type="module">
console.log("¡El script se ejecuta!");
</script>

import { crearMiniCarrusel } from '/assets/js/minicarrusel.js';
import { crearMosaico } from '/assets/js/mosaico.js';

const params = new URLSearchParams(window.location.search);
const galeriaSeleccionada = params.get('galeria');
const subSeleccionada = params.get('sub'); // Si existe, estamos en subgalería directa
console.log("galeriaSeleccionada:", galeriaSeleccionada, "subSeleccionada:", subSeleccionada);
console.log("Subgalerías de Box Arts:", data["Box Arts"].map(s => s.name));
console.log("Galería seleccionada:", galeriaSeleccionada);
console.log("Subgalería seleccionada:", subSeleccionada);

const container = document.getElementById('galeria-container');
const titulo = document.getElementById('titulo-galeria');

fetch('/galeries.json')
  .then(res => res.json())
  .then(data => {
    if (!galeriaSeleccionada || !data[galeriaSeleccionada]) {
      console.log("No se encontró la galería");
      container.innerHTML = "<p class='text-xl'>No se encontró la galería.</p>";
      return;
    }

    let subGalerias = data[galeriaSeleccionada];
    let tituloGrande;

    if (subSeleccionada) {
      // Vista subgalería directa
      const subEncontrada = subGalerias.find(s => s.name === subSeleccionada);
      if (subEncontrada) {
        tituloGrande = subEncontrada.displayName || subEncontrada.name;
        console.log("Subgalería encontrada:", subEncontrada);
        subGalerias = [subEncontrada]; // Solo esa subgalería
      } else {
        tituloGrande = galeriaSeleccionada;
        console.log("Subgalería no encontrada, usamos título de galería");
      }
    } else {
      // Vista general de la galería
      tituloGrande = galeriaSeleccionada;
      console.log("Vista general de la galería:", tituloGrande);
    }

    titulo.textContent = tituloGrande;

    subGalerias.forEach((sub, index) => {
      console.log("Procesando subgalería:", sub.name);

      const images = Array.from({ length: sub.images }, (_, j) =>
        `/galleries/data/${galeriaSeleccionada}/${sub.name}/${j + 1}.jpg`
      );

      const subDiv = document.createElement('div');
      subDiv.style.marginBottom = '120px';

      // SOLO mostramos títulos pequeños si NO estamos en subgalería directa
      if (!subSeleccionada) {
        console.log("Añadiendo título pequeño para:", sub.name);
        const nombreDiv = document.createElement('div');
        nombreDiv.className = 'text-4xl font-bold text-white text-center mb-4';
        nombreDiv.textContent = sub.displayName || sub.name;
        subDiv.appendChild(nombreDiv);
      } else {
        console.log("No añadimos título pequeño porque estamos en subgalería directa");
      }

      // Mostrar contenido según tipo
      if (sub.type === 'mosaic' || subSeleccionada) {
        const mosaicoDiv = crearMosaico(sub, images, openLightbox);
        mosaicoDiv.querySelectorAll('img').forEach((img, i) => {
          img.addEventListener('click', () => openLightbox(images, i));
        });
        subDiv.appendChild(mosaicoDiv);
      } else {
        const carruselWrapper = crearMiniCarrusel(sub, images);
        carruselWrapper.querySelectorAll('img').forEach((img, i) => {
          img.addEventListener('click', () => openLightbox(images, i));
        });
        subDiv.appendChild(carruselWrapper);
      }

      container.appendChild(subDiv);
    });
  })
  .catch(err => {
    console.error('Error cargando galería:', err);
    container.innerHTML = "<p class='text-xl'>Error cargando la galería.</p>";
  });