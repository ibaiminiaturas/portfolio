// Inicialización del menú de galerías desde el JSON
function createMenuItem(name, data, parentPath = "") {
    const li = document.createElement("div");
    // Usamos 'relative' y una clase propia 'menu-item-nivel'
    li.className = "relative menu-item-nivel"; 

    // Construcción de la URL: 
    // Si no hay parentPath, es nivel raíz (galeria=)
    // Si hay parentPath, es un subnivel (&sub=)
    const currentPath = parentPath 
        ? `${parentPath}&sub=${encodeURIComponent(name)}` 
        : `galeria=${encodeURIComponent(name)}`;

    const a = document.createElement("a");
    a.href = `${BASE_PATH}/galerias.html?${currentPath}`;
    
    // --- 1. CLAVE PARA TRADUCCIÓN DINÁMICA ---
    // Añadimos data-i18n para que translatePage() pueda actualizarlo luego
    const claveI18n = `galeries.${name}`;
    a.setAttribute('data-i18n', claveI18n);

    // --- 2. LÓGICA DE TEXTO INICIAL ---
    const textoTraducido = (typeof t === 'function') ? t(claveI18n) : null;
    // Si t() devuelve la clave (no encontró traducción), usamos el displayName o name original
    a.textContent = (textoTraducido && textoTraducido !== claveI18n) 
                    ? textoTraducido 
                    : (data.displayName || name);
    
    a.className = "block px-4 py-2 cursor-pointer hover:bg-gray-700 w-full text-left text-white whitespace-nowrap flex justify-between items-center transition-colors duration-200";

    if (data.subs && data.subs.length > 0) {
        const arrow = document.createElement("span");
        arrow.textContent = "❯";
        arrow.className = "ml-3 text-[10px] opacity-50";
        a.appendChild(arrow);
    }

    li.appendChild(a);

    if (data.subs && data.subs.length > 0) {
        const subMenu = document.createElement("div");
        // Estilos para el submenú flotante a la derecha
        subMenu.className = "submenu-flotante absolute left-full top-0 hidden bg-gray-800 py-2 rounded shadow-lg min-w-max border-l border-gray-600";
        
        data.subs.forEach(sub => {
            subMenu.appendChild(createMenuItem(sub.name, sub, currentPath));
        });

        li.appendChild(subMenu);

        // Lógica de mostrar/ocultar solo el HIJO DIRECTO
        li.addEventListener("mouseenter", (e) => {
            e.stopPropagation(); // Evita que el evento suba a los padres
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