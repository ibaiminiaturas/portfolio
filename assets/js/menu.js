function createMenuItem(name, data, parentPath = "") {
    const li = document.createElement("div");
    li.className = "relative menu-item-nivel";
    li.style.width = "100%";

    const currentPath = parentPath 
        ? `${parentPath}&sub=${encodeURIComponent(name)}` 
        : `galeria=${encodeURIComponent(name)}`;

    const a = document.createElement("a");
    a.href = `${BASE_PATH}/galerias.html?${currentPath}`;
    
    a.style.display = "flex";
    a.style.alignItems = "center";
    a.style.width = "100%";
    a.style.padding = "8px 16px";
    a.style.color = "white";
    a.style.textDecoration = "none";
    a.style.whiteSpace = "nowrap"; 
    
    a.className = "hover:bg-gray-700 transition-colors duration-200";

    const textSpan = document.createElement("span");
    const claveI18n = `galeries.${name}`;
    textSpan.setAttribute('data-i18n', claveI18n);

    const textoTraducido = (typeof t === 'function') ? t(claveI18n) : null;
    textSpan.textContent = (textoTraducido && textoTraducido !== claveI18n) 
                    ? textoTraducido 
                    : (data.displayName || name);
    
    textSpan.style.flexGrow = "1";
    textSpan.style.textAlign = "left";
    a.appendChild(textSpan);

    if (data.subs && data.subs.length > 0) {
        const arrow = document.createElement("span");
        arrow.textContent = "❯";
        arrow.style.fontSize = "20px";
        arrow.style.opacity = "0.5";
        arrow.style.marginLeft = "15px"; 
        arrow.style.flexShrink = "0";
        a.appendChild(arrow);
    }

    li.appendChild(a);

    if (data.subs && data.subs.length > 0) {
        const subMenu = document.createElement("div");
        // Quitamos clases de posicionamiento fijo de Tailwind
        subMenu.className = "submenu-flotante absolute top-0 hidden bg-gray-800 py-2 rounded shadow-lg border border-gray-600 z-[110]";
        subMenu.style.minWidth = "220px"; // Un poco más de margen para nombres largos
        
        data.subs.forEach(sub => {
            subMenu.appendChild(createMenuItem(sub.name, sub, currentPath));
        });

        li.appendChild(subMenu);

        li.addEventListener("mouseenter", (e) => {
            e.stopPropagation();
            
            // 1. Lo hacemos visible pero invisible al ojo para que el navegador lo calcule
            subMenu.style.visibility = "hidden";
            subMenu.classList.remove("hidden");

            // 2. Medimos
            const rectLi = li.getBoundingClientRect();
            const anchoSubMenu = subMenu.offsetWidth || 220; // Si falla el cálculo, usamos el min-width
            const anchoVentana = window.innerWidth;

            // 3. ¿Cae fuera de la pantalla si abrimos a la derecha?
            // Dejamos un margen de seguridad de 20px
            if (rectLi.right + anchoSubMenu > anchoVentana - 20) {
                // A LA IZQUIERDA
                subMenu.style.left = "auto";
                subMenu.style.right = "100%";
            } else {
                // A LA DERECHA
                subMenu.style.left = "100%";
                subMenu.style.right = "auto";
            }

            // 4. Lo mostramos de verdad
            subMenu.style.visibility = "visible";
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