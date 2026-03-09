// mosaico.js
export function crearMosaico(sub, images, openLightbox) {
    const subDiv = document.createElement('div');
    subDiv.style.marginBottom = '120px';
    subDiv.style.display = 'flex';
    subDiv.style.justifyContent = 'center'; // centramos el bloque completo
    subDiv.style.width = '100%';

    // contenedor para nombre + mosaico
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'flex-start';
    container.style.gap = '15px';
    container.style.position = 'relative';

    // nombre a la izquierda
    const nameContainer = document.createElement('div');
    const nombreDiv = document.createElement('div');
    nombreDiv.className = 'flex items-center justify-center h-[200px] w-[200px] text-4xl font-bold text-gray-800 text-center';
    nombreDiv.style.flexShrink = '0';
    nombreDiv.textContent = sub.displayName || sub.name;
    nameContainer.appendChild(nombreDiv);

    container.appendChild(nameContainer);

    // contenedor del mosaico (exactamente 800px)
    const mosaicContainer = document.createElement('div');
    mosaicContainer.style.position = 'relative';
    mosaicContainer.style.width = '800px';
    mosaicContainer.style.height = 'auto';

    // posición para colocar imágenes fila por fila
    let x = 0;
    let y = 0;
    let maxRowHeight = 0;
    const GAP = 15;
    const CONTAINER_WIDTH = 800; // solo el mosaico, sin contar nombre

    images.forEach((src, i) => {
        const size = 200 + Math.floor(Math.random() * 201); // 200–400px

        if (x + size > CONTAINER_WIDTH) {
            x = 0;
            y += maxRowHeight + GAP;
            maxRowHeight = 0;
        }

        const img = document.createElement('img');
        img.src = src;
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        img.style.cursor = 'pointer';
        img.style.transition = 'transform 0.25s ease-out';

        img.style.position = 'absolute';
        img.style.left = x + 'px'; // dentro del mosaico de 800px
        img.style.top = y + 'px';

        img.addEventListener('click', () => openLightbox(images, i));
        img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05)'; });
        img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });

        mosaicContainer.appendChild(img);

        x += size + GAP;
        if (size > maxRowHeight) maxRowHeight = size;
    });

    mosaicContainer.style.height = (y + maxRowHeight) + 'px';

    container.appendChild(mosaicContainer);
    subDiv.appendChild(container);

    return subDiv;
}