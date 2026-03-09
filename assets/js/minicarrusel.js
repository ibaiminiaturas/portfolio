// minicarrusel.js

export function crearMiniCarrusel(sub, images) {
    const openLightbox = window.openLightbox;
    const carruselWrapper = document.createElement('div');
    carruselWrapper.className = 'relative flex items-center';
    carruselWrapper.style.flex = '1';
    carruselWrapper.style.height = '200px';

    const carruselDiv = document.createElement('div');
    carruselDiv.className = 'flex h-[200px] overflow-x-auto scrollbar-hide';
    carruselDiv.style.flex = '1';
    carruselDiv.style.scrollBehavior = 'smooth';
    carruselDiv.style.gap = '20px';

    const imgs = [];

    for (let i = 0; i < sub.images; i++) {
        const img = document.createElement('img');
        img.src = images[i];
        img.className = 'w-[200px] h-[200px] object-cover rounded flex-shrink-0 cursor-pointer';

        carruselDiv.appendChild(img);
        imgs.push(img);

        img.addEventListener('click', () => openLightbox(images, i));

        img.addEventListener('mouseenter', () => {
            img.style.animation = 'zoomIn 0.25s ease-out forwards';
        });

        img.addEventListener('mouseleave', () => {
            img.style.animation = 'zoomOut 0.25s ease-out forwards';
        });
    }

    const SCROLL_AMOUNT = 220;

    const leftArrow = document.createElement('div');
    leftArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-800 hover:text-yellow-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>`;
    leftArrow.style.position = 'absolute';
    leftArrow.style.left = '0';
    leftArrow.style.top = '50%';
    leftArrow.style.transform = 'translateY(-50%)';
    leftArrow.style.zIndex = '10';
    leftArrow.style.display = 'none';

    const rightArrow = document.createElement('div');
    rightArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-800 hover:text-yellow-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;
    rightArrow.style.position = 'absolute';
    rightArrow.style.right = '0';
    rightArrow.style.top = '50%';
    rightArrow.style.transform = 'translateY(-50%)';
    rightArrow.style.zIndex = '10';
    rightArrow.style.display = 'none';

    function updateCarruselArrows() {
        const hasScroll = carruselDiv.scrollWidth > carruselDiv.clientWidth;
        const scrollLeft = carruselDiv.scrollLeft;
        const scrollRight = carruselDiv.scrollWidth - carruselDiv.clientWidth - scrollLeft;

        leftArrow.style.display = (hasScroll && scrollLeft > 0) ? 'flex' : 'none';
        rightArrow.style.display = (hasScroll && scrollRight > 1) ? 'flex' : 'none';
    }

    carruselDiv.addEventListener('scroll', updateCarruselArrows);
    imgs.forEach(img => img.addEventListener('load', updateCarruselArrows));

    setTimeout(updateCarruselArrows, 100);

    leftArrow.addEventListener('click', () => carruselDiv.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }));
    rightArrow.addEventListener('click', () => carruselDiv.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' }));

    carruselWrapper.appendChild(leftArrow);
    carruselWrapper.appendChild(rightArrow);
    carruselWrapper.appendChild(carruselDiv);

    return carruselWrapper;
}