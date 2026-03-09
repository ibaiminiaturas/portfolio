import { crearMiniCarrusel } from '/assets/js/minicarrusel.js';
import { crearMosaico } from '/assets/js/mosaico.js';

const params = new URLSearchParams(window.location.search);
const galeriaSeleccionada = params.get('galeria');
const subSeleccionada = params.get('sub');

const container = document.getElementById('galeria-container');
const titulo = document.querySelector('h1');

fetch('/galeries.json')
.then(res => res.json())
.then(data => {
  if (!galeriaSeleccionada || !data[galeriaSeleccionada]) {
      container.innerHTML = "<p class='text-xl'>No se encontró la galería.</p>";
      return;
  }

  titulo.textContent = galeriaSeleccionada + (subSeleccionada ? " → " + subSeleccionada : "");

  let subGalerias = data[galeriaSeleccionada];
  if(subSeleccionada){
      subGalerias = subGalerias.filter(s => s.name === subSeleccionada);
  }

  subGalerias.forEach((sub, index) => {
      const images = Array.from({length: sub.images}, (_, j) =>
          `/galleries/data/${galeriaSeleccionada}/${sub.name}/${j+1}.jpg`
      );

      const subDiv = document.createElement('div');
      subDiv.classList.add('mb-[120px]'); // margen inferior dinámico

      const esUltima = index === subGalerias.length - 1;
      if (sub.type === 'mosaic' || esUltima) {
          const bloqueDiv = document.createElement('div');
          bloqueDiv.classList.add('flex', 'flex-col', 'items-center', 'mb-[120px]');

          const nombreDiv = document.createElement('div');
          nombreDiv.className = 'text-4xl font-bold text-gray-800 text-center mb-4';
          nombreDiv.textContent = sub.displayName || sub.name;
          bloqueDiv.appendChild(nombreDiv);

          const mosaicoDiv = crearMosaico(sub, images, openLightbox);
          bloqueDiv.appendChild(mosaicoDiv);

          container.appendChild(bloqueDiv);
          return;
      }

      const titleSection = document.createElement('div');
      titleSection.classList.add('flex', 'gap-5', 'items-start', 'mb-5');

      const nombreDiv = document.createElement('div');
      nombreDiv.className = 'flex items-center justify-center h-[200px] w-[200px] text-4xl font-bold text-gray-800 break-words text-center shrink-0';
      nombreDiv.textContent = sub.displayName || sub.name;
      titleSection.appendChild(nombreDiv);

      // Padding dinámico según índice
      if(index % 2 === 0){
          subDiv.classList.add('pl-[15%]', 'pr-[5%]');
      } else {
          subDiv.classList.add('pl-[10%]', 'pr-[10%]');
      }

      const carruselWrapper = crearMiniCarrusel(sub, images, openLightbox);
      titleSection.appendChild(carruselWrapper);

      subDiv.appendChild(titleSection);
      container.appendChild(subDiv);
  });
})
.catch(err=>{
  console.error('Error cargando galería:', err);
  container.innerHTML="<p class='text-xl'>Error cargando la galería.</p>";
});