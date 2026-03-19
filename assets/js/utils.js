function loadHeader() {
    // Le damos un respiro al DOM para que reconozca los nuevos elementos
    setTimeout(() => {
        const images = [
            { id: 'header-logo', path: 'assets/images/ibai-miniaturas-circle.webp' },
            { id: 'header-logo-mobile', path: 'assets/images/ibai-miniaturas-circle.webp' },
            { id: 'flag-es', path: 'assets/images/flag-es.svg' },
            { id: 'flag-uk', path: 'assets/images/flag-uk.svg' },
            { id: 'flag-es-mobile', path: '/assets/images/flag-es.png' },
            { id: 'flag-en-mobile', path: '/assets/images/flag-uk.png' }, 
            { id: 'ig-icon', path: 'assets/images/instagram.png' },
            { id: 'ig-icon-mobile', path: 'assets/images/instagram.png' }
        ];

        images.forEach(img => {
            const el = document.getElementById(img.id);
            if (el) {
                el.src = `${BASE_PATH}/${img.path}`.replace(/\/+/g, '/'); 
            }
        });
    }, 50); // 50ms son suficientes para que el DOM se entere
}