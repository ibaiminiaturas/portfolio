// mosaico.js
export function crearMosaico(sub, images, openLightbox) {
    const mosaicContainer = document.createElement('div');
    mosaicContainer.style.width = '800px';
    mosaicContainer.style.position = 'relative';
    mosaicContainer.style.height = 'auto';
    mosaicContainer.style.display = 'block'; // necesario para centrar si es inline-block
    mosaicContainer.style.margin = '0 auto'; // centra horizontalmente

    const GAP = 15;
    const CONTAINER_WIDTH = 800;
    let y = 0;

    let row = [];
    let rowWidth = 0;

    for (let i = 0; i < images.length; i++) {
        const imgSize = 200 + Math.floor(Math.random() * 201); // 200-400px
        row.push({ src: images[i], size: imgSize });
        rowWidth += imgSize + (row.length > 1 ? GAP : 0);

        if (rowWidth >= CONTAINER_WIDTH || i === images.length - 1) {
            const totalGap = GAP * (row.length - 1);
            const scale = (CONTAINER_WIDTH - totalGap) / (rowWidth - totalGap);

            let x = 0;
            let maxHeightInRow = 0;

            row.forEach(imgData => {
                const size = Math.floor(imgData.size * scale);
                const img = document.createElement('img');
                img.src = imgData.src;
                img.style.width = size + 'px';
                img.style.height = size + 'px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '8px';
                img.style.cursor = 'pointer';
                img.style.transition = 'transform 0.25s ease-out';
                img.style.position = 'absolute';
                img.style.left = x + 'px';
                img.style.top = y + 'px';

                img.addEventListener('click', () => openLightbox(images, i));
                img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05)'; });
                img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });

                mosaicContainer.appendChild(img);
                x += size + GAP;
                if (size > maxHeightInRow) maxHeightInRow = size;
            });

            y += maxHeightInRow + GAP;
            row = [];
            rowWidth = 0;
        }
    }

    mosaicContainer.style.height = y + 'px';
    return mosaicContainer;
}