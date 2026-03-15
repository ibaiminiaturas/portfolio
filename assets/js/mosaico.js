// mosaico.js
export function crearMosaico(sub, images, openLightbox) {
    // Contenedor principal centrado
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center'; // centro horizontal
    container.style.marginBottom = '120px';

    // Contenedor del grid fijo
    const grid = document.createElement('div');
    grid.className = 'masonry-grid';
    const GRID_WIDTH = 800; // ancho fijo del mosaico
    const GUTTER = 15;
    grid.style.width = GRID_WIDTH + 'px';
    grid.style.position = 'relative';

    container.appendChild(grid);

    // Agregamos cada imagen con tamaño random y cuadrada
    images.forEach((src, i) => {
        const size = 200 + Math.floor(Math.random() * 201); // 200-400px

        const item = document.createElement('div');
        item.className = 'grid-item';
        item.style.width = size + 'px';
        item.style.height = size + 'px';
        item.style.marginBottom = GUTTER + 'px';

        const img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        img.style.cursor = 'pointer';
        img.style.transition = 'transform 0.25s ease-out';

        img.addEventListener('click', () => openLightbox(images, i));
        img.addEventListener('mouseenter', () => { img.style.transform = 'scale(0.95)'; });
        img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });

        item.appendChild(img);
        grid.appendChild(item);
    });

    // Inicializamos Macy después de que carguen las imágenes
    imagesLoaded(grid, () => {
        new Macy({
            container: grid,
            trueOrder: false,
            waitForImages: false,
            margin: 10,
            //columns: Math.floor((GRID_WIDTH + GUTTER) / (200 + GUTTER)), // columnas según tamaño mínimo
            breakAt: {
1024: 2,  // A menos de 1024px, 2 columnas
        640: 1    // A menos de 640px (móvil), ¡1 SOLA COLUMNA!

            }, // sin responsive por ahora
        });
    });

    return container;
}