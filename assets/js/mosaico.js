// mosaico.js
export function crearMosaico(sub, images, openLightbox) {
    const subDiv = document.createElement('div');
    subDiv.style.marginBottom = '120px';

    const mosaicLayout = document.createElement('div');
    mosaicLayout.style.display = 'grid';
    mosaicLayout.style.gridTemplateColumns = '20% 60% 20%';
    mosaicLayout.style.width = '100%';
    mosaicLayout.style.alignItems = 'start';

    const nameContainer = document.createElement('div');
    const nombreDiv = document.createElement('div');
    nombreDiv.className = 'flex items-center justify-center h-[200px] w-[200px] text-4xl font-bold text-gray-800 break-words text-center';
    nombreDiv.style.flexShrink = '0';
    nombreDiv.textContent = sub.displayName || sub.name;
    nameContainer.appendChild(nombreDiv);

    const mosaicContainer = document.createElement('div');
    mosaicContainer.style.display = 'grid';
    mosaicContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px,1fr))';
    mosaicContainer.style.gridAutoFlow = 'dense';
    mosaicContainer.style.gap = '20px';

    for (let i = 0; i < sub.images; i++) {
        const img = document.createElement('img');
        img.src = images[i];

        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '8px';
        img.style.cursor = 'pointer';
        img.style.transition = 'transform 0.25s ease-out';

        const r = Math.random();
        if (r < 0.65) {
            img.style.gridColumn = 'span 1';
            img.style.aspectRatio = '1/1';
        } else if (r < 0.9) {
            img.style.gridColumn = 'span 2';
            img.style.aspectRatio = '2/1';
        } else {
            img.style.gridColumn = 'span 2';
            img.style.aspectRatio = '1/2';
        }

        img.addEventListener('click', () => openLightbox(images, i));
        img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05)'; });
        img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });

        mosaicContainer.appendChild(img);
    }

    mosaicLayout.appendChild(nameContainer);
    mosaicLayout.appendChild(mosaicContainer);
    mosaicLayout.appendChild(document.createElement('div')); // columna vacía

    subDiv.appendChild(mosaicLayout);

    return subDiv;
}