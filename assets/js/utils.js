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
            { id: 'ig-icon-mobile', path: 'assets/images/instagram.png' },
            { id: 'fiverr-icon', path: '/assets/images/fiverr.svg' },
            { id: 'fiverr-icon-mobile', path: '/assets/images/fiverr.png' }
        ];

        images.forEach(img => {
            const el = document.getElementById(img.id);
            if (el) {
                el.src = `${BASE_PATH}/${img.path}`.replace(/\/+/g, '/'); 
            }
        });
    }, 50); // 50ms son suficientes para que el DOM se entere
}

async function loadLinks() {
  try {
    // Usamos BASE_PATH por si llamas a esto desde subcarpetas
    const response = await fetch(`${BASE_PATH}/assets/config.json`);
    const data = await response.json();
    
    // Función auxiliar para inyectar enlaces de forma segura sin romper el JS
    const setLink = (id, url) => {
        const el = document.getElementById(id);
        if (el) el.href = url;
    };

    // --- REDES SOCIALES (Header, Mobile y Footer) ---
    if (data.socialMedia) {
        setLink('insta-link', data.socialMedia.instagram);         // Header Desktop
        setLink('insta-link-mobile', data.socialMedia.instagram);  // Header Mobile
        setLink('insta-link-2', data.socialMedia.instagram);       // Footer
        
        setLink('fiverr-link', data.socialMedia.fiverr);           // Header Desktop
        setLink('fiverr-link-mobile', data.socialMedia.fiverr);    // Header Mobile
    }

    // --- CORREO ELECTRÓNICO (Footer) ---
    const emailTag = document.getElementById('contact-email');
    if (emailTag && data.contact && data.contact.email) {
        emailTag.href = `mailto:${data.contact.email}`;
        emailTag.textContent = data.contact.email;
    }
    
  } catch (error) {
    console.error("Error cargando el JSON de configuración:", error);
  }
}