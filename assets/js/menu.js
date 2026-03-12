function createMenuItem(name, data, parentPath = "") {
    const li = document.createElement("div");
    li.className = "relative menu-item-nivel";
    li.style.width = "100%";

    const currentPath = parentPath 
        ? `${parentPath}&sub=${encodeURIComponent(name)}` 
        : `galeria=${encodeURIComponent(name)}`;

    const a = document.createElement("a");
    a.href = `${BASE_PATH}/galerias.html?${currentPath}`;
    
    // FORZADO POR ESTILO DIRECTO
    a.style.display = "flex";
    a.style.alignItems = "center";
    a.style.justifyContent = "between"; // Esto lo manejaremos con el span
    a.style.width = "100%";
    a.style.padding = "8px 16px";
    a.style.color = "white";
    a.style.textDecoration = "none";
    a.style.whiteSpace = "nowrap"; // PROHIBIDO SALTAR DE LÍNEA
    
    a.className = "hover:bg-gray-700 transition-colors duration-200";

    // Contenedor del texto
    const textSpan = document.createElement("span");
    const claveI18n = `galeries.${name}`;
    textSpan.setAttribute('data-i18n', claveI18n);

    const textoTraducido = (typeof t === 'function') ? t(claveI18n) : null;
    textSpan.textContent = (textoTraducido && textoTraducido !== claveI18n) 
                    ? textoTraducido 
                    : (data.displayName || name);
    
    // Este span empujará a la flecha gracias al flex-grow
    textSpan.style.flexGrow = "1";
    textSpan.style.textAlign = "left";
    
    a.appendChild(textSpan);

    if (data.subs && data.subs.length > 0) {
        const arrow = document.createElement("span");
        arrow.textContent = "❯";
        arrow.style.fontSize = "20px";
        arrow.style.opacity = "0.5";
        arrow.style.marginLeft = "15px"; // Espacio mínimo con el texto
        arrow.style.flexShrink = "0";    // Que no se aplaste
        a.appendChild(arrow);
    }

    li.appendChild(a);

    if (data.subs && data.subs.length > 0) {
        const subMenu = document.createElement("div");
        subMenu.className = "submenu-flotante absolute left-full top-0 hidden bg-gray-800 py-2 rounded shadow-lg border-l border-gray-600 z-[110]";
        subMenu.style.minWidth = "200px";
        
        data.subs.forEach(sub => {
            subMenu.appendChild(createMenuItem(sub.name, sub, currentPath));
        });

        li.appendChild(subMenu);

        li.addEventListener("mouseenter", (e) => {
            e.stopPropagation();
            subMenu.classList.remove("hidden");
        });
        li.addEventListener("mouseleave", (e) => {
            e.stopPropagation();
            subMenu.classList.add("hidden");
        });
    }

    return li;
}

function initializeMenu() {
    const dropdown = document.getElementById("dropdown-galerias");
    if (!dropdown) return;

    // Estilos base de tu dropdown principal
    dropdown.className = "absolute hidden bg-gray-800 mt-2 rounded shadow-lg text-white z-[100] min-w-[200px]";

    fetch(`${BASE_PATH}/assets/galeries.json`)
        .then(res => res.json())
        .then(data => {
dropdown.innerHTML = ""; 

        // data ahora es un ARRAY: [{category: "Box Arts", ...}, {category: "Art-W", ...}]
        data.forEach(section => {
            const sectionName = section.category;
            
            // Adaptamos los datos para la función recursiva createMenuItem
            const sectionData = { 
                subs: section.items || null, // Si tiene items internos (como Big Child)
                displayName: section.displayName || sectionName,
                images: section.images || 0 // Por si es una galería directa
            };
            
            const menuElement = createMenuItem(sectionName, sectionData, "");
            dropdown.appendChild(menuElement);
        });
            // Lógica de hover del menú principal
            const menuContainer = document.getElementById("menu-galerias");
            let timeout;
            
            if (menuContainer) {
                menuContainer.addEventListener("mouseenter", () => {
                    clearTimeout(timeout);
                    dropdown.classList.remove("hidden");
                });

                menuContainer.addEventListener("mouseleave", () => {
                    timeout = setTimeout(() => {
                        dropdown.classList.add("hidden");
                    }, 150);
                });
            }
        })
        .catch(err => console.error('Error cargando el menú:', err));
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
    initializeMenu();
}