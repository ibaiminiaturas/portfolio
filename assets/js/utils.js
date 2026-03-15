function loadHeader() {
    // Le damos un respiro al DOM para que reconozca los nuevos elementos
    setTimeout(() => {
        const images = [
            { id: 'header-logo', path: 'assets/images/ibai-miniaturas-circle.webp' },
            { id: 'header-logo-mobile', path: 'assets/images/ibai-miniaturas-circle.webp' },
            { id: 'flag-es', path: 'assets/images/flag-es.svg' },
            { id: 'flag-uk', path: 'assets/images/flag-uk.svg' },
            { id: 'flag-es-mobile', path: 'assets/images/flag-es.svg' },
            { id: 'flag-en-mobile', path: 'assets/images/flag-uk.svg' }, // Asegúrate de que es .svg
            { id: 'ig-icon', path: 'assets/images/instagram.png' },
            { id: 'ig-icon-mobile', path: 'assets/images/instagram.png' }
        ];

        images.forEach(img => {
            const el = document.getElementById(img.id);
            if (el) {
                el.src = `${BASE_PATH}/${img.path}`.replace(/\/+/g, '/'); 
                console.log(`✅ Cargada: ${img.id}`); // Si ves esto en consola, la ruta se puso
            } else {
                console.warn(`⚠️ No se encontró: ${img.id}`);
            }
        });
    }, 50); // 50ms son suficientes para que el DOM se entere
}