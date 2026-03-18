/**
 * ESCRITORIO: Creación de elementos y submenús
 */
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
        arrow.style.fontSize = "14px";
        arrow.style.opacity = "0.5";
        arrow.style.marginLeft = "15px"; 
        a.appendChild(arrow);
    }

    li.appendChild(a);

    if (data.subs && data.subs.length > 0) {
        const subMenu = document.createElement("div");
        subMenu.className = "submenu-flotante absolute top-0 hidden bg-gray-800 py-2 rounded shadow-lg border border-gray-600 z-[110]";
        subMenu.style.minWidth = "220px";
        
        data.subs.forEach(sub => {
            subMenu.appendChild(createMenuItem(sub.name, sub, currentPath));
        });

        li.appendChild(subMenu);

        li.addEventListener("mouseenter", (e) => {
            e.stopPropagation();
            subMenu.style.visibility = "hidden";
            subMenu.classList.remove("hidden");
            const rectLi = li.getBoundingClientRect();
            const anchoSubMenu = subMenu.offsetWidth || 220;
            const anchoVentana = window.innerWidth;

            if (rectLi.right + anchoSubMenu > anchoVentana - 20) {
                subMenu.style.left = "auto";
                subMenu.style.right = "100%";
                subMenu.style.backgroundColor = "#4B5563";
            } else {
                subMenu.style.left = "100%";
                subMenu.style.right = "auto";
            }
            subMenu.style.visibility = "visible";
        });

        li.addEventListener("mouseleave", () => {
            subMenu.classList.add("hidden");
        });
    }
    return li;
}

/**
 * MÓVIL: Creación de la lista en cascada
 */
function createMobileItem(name, data, parentPath = "") {
    const container = document.createElement("div");
    container.className = "w-full border-b border-gray-300 py-1";

    const currentPath = parentPath 
        ? `${parentPath}&sub=${encodeURIComponent(name)}` 
        : `galeria=${encodeURIComponent(name)}`;

    // Contenedor de la fila superior (Nombre + Flecha)
    const row = document.createElement("div");
    row.className = "flex justify-between items-center w-full py-2 cursor-pointer";

    // Enlace al nombre
    const a = document.createElement("a");
    a.href = `${BASE_PATH}/galerias.html?${currentPath}`;
    const isTopLevel = !parentPath;
    a.textContent = data.displayName || name;
    a.className = isTopLevel 
        ? "text-gray-900 text-2xl font-bold flex-grow" 
        : "text-gray-700 text-xl font-medium flex-grow";
    
    row.appendChild(a);

    // Si tiene hijos, añadimos la flecha y la lógica de acordeón
    if (data.subs && data.subs.length > 0) {
        const arrow = document.createElement("span");
        arrow.textContent = "▼";
        arrow.className = "text-gray-400 px-4 transition-transform duration-300 text-sm";
        row.appendChild(arrow);

        const subList = document.createElement("div");
        // EMPIEZA CERRADO: Usamos 'hidden'
        subList.className = "hidden ml-6 border-l-2 border-gray-400 pl-4 mb-2 space-y-1";

        // Al hacer clic en la fila (pero no en el enlace directo)
        row.onclick = (e) => {
            // Si el clic es en la flecha o en el espacio de la fila, toggleamos
            // Si es en el enlace 'a', el navegador navegará (comportamiento normal)
            if (e.target !== a) {
                e.preventDefault();
                const isHidden = subList.classList.contains('hidden');
                subList.classList.toggle('hidden');
                arrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
            }
        };

        // Recursividad para los hijos
        data.subs.forEach(sub => {
            subList.appendChild(createMobileItem(sub.name, sub, currentPath));
        });

        container.appendChild(row);
        container.appendChild(subList);
    } else {
        // Si no tiene hijos, solo añadimos la fila sin flecha
        container.appendChild(row);
    }
    
    return container;
}

/**
 * INICIALIZACIÓN GLOBAL
 */
function initializeMenu() {
    const dropdownDesktop = document.getElementById("dropdown-galerias");
    const containerMobile = document.getElementById("mobile-dropdown-galerias");
    const btnHamburguesa = document.getElementById('btn-hamburguesa');
    const menuMovil = document.getElementById('menu-movil');
    const btnToggleMobile = document.getElementById('btn-toggle-galerias-mobile');
    const menuContainer = document.getElementById("menu-galerias");

    // 1. Lógica del Menú Móvil (Abrir/Cerrar)
if (btnHamburguesa && menuMovil) {
        btnHamburguesa.onclick = () => {
            const isOpening = menuMovil.classList.contains('hidden');
            
            menuMovil.classList.toggle('hidden');
            menuMovil.classList.toggle('flex');

            // Si se abre, bloqueamos el scroll del body. Si se cierra, lo devolvemos.
            if (isOpening) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };
    }

    if (btnToggleMobile && containerMobile) {
        btnToggleMobile.onclick = (e) => {
            e.preventDefault();
            containerMobile.classList.toggle('hidden');
            containerMobile.classList.toggle('flex');
            document.getElementById('arrow-galerias')?.classList.toggle('rotate-180');
        };
    }

    // 2. SOLUCIÓN AL RESIZE (Evitar dos menús a la vez)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) { // Si la pantalla crece a PC (Tailwind lg)
            if (menuMovil && !menuMovil.classList.contains('hidden')) {
                menuMovil.classList.add('hidden');
                menuMovil.classList.remove('flex');
            }
        }
    });

    // 3. Cargar el JSON
    fetch(`${BASE_PATH}/assets/galeries.json`)
        .then(res => res.json())
        .then(data => {
            // Rellenar Escritorio
            if (dropdownDesktop) {
                dropdownDesktop.innerHTML = "";
                data.forEach(section => {
                    dropdownDesktop.appendChild(createMenuItem(section.category, { subs: section.items, displayName: section.displayName }));
                });
            }

            // Rellenar Móvil
            if (containerMobile) {
                containerMobile.innerHTML = "";
                data.forEach(section => {
                    containerMobile.appendChild(createMobileItem(section.category, { subs: section.items, displayName: section.displayName }));
                });
            }

            // 4. SOLUCIÓN AL HITBOX (Puente de 250 milisegundos)
            if (menuContainer && dropdownDesktop) {
                let hoverTimeout;
                
                menuContainer.addEventListener("mouseenter", () => {
                    clearTimeout(hoverTimeout); // Cancela el cierre si vuelves rápido
                    dropdownDesktop.classList.remove("hidden");
                });
                
                menuContainer.addEventListener("mouseleave", () => {
                    // Da 250ms para que cruces el espacio vacío del mt-2
                    hoverTimeout = setTimeout(() => {
                        dropdownDesktop.classList.add("hidden");
                    }, 250);
                });
            }
        })
        .catch(err => console.error("Error loading menu:", err));
}

// Ejecución
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
    initializeMenu();
}