// Inicialización del menú de galerías desde el JSON
// Inicialización del menú de galerías desde el JSON
function createMenuItem(name, data, parentPath = "") {
    const li = document.createElement("div");
    // Usamos 'relative' y una clase propia 'menu-item-nivel'
    li.className = "relative menu-item-nivel"; 

    const currentPath = parentPath 
        ? `${parentPath}&sub=${encodeURIComponent(name)}` 
        : `galeria=${encodeURIComponent(name)}`;

    const a = document.createElement("a");
    a.href = `${BASE_PATH}/galerias.html?${currentPath}`;
                const textoTraducido = t(`galeries.${name}`);
                a.textContent = textoTraducido || name;
    // a.textContent = (typeof translations !== 'undefined' && translations.galleries?.[name]) 
    //                 || data.displayName 
    //                 || name;
    
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
        // IMPORTANTE: Quitamos 'group-hover:block' y usamos una clase que controlaremos por CSS o JS
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
            dropdown.innerHTML = ""; // Limpiamos

            Object.keys(data).forEach(sectionName => {
                // El primer nivel del JSON son arrays, los normalizamos para la función
                const sectionData = { 
                    subs: data[sectionName], 
                    displayName: sectionName 
                };
                
                const menuElement = createMenuItem(sectionName, sectionData);
                dropdown.appendChild(menuElement);
            });

            // Lógica de hover del menú principal (tu código original)
            const menuContainer = document.getElementById("menu-galerias");
            let timeout;
            
            menuContainer.addEventListener("mouseenter", () => {
                clearTimeout(timeout);
                dropdown.classList.remove("hidden");
            });

            menuContainer.addEventListener("mouseleave", () => {
                timeout = setTimeout(() => {
                    dropdown.classList.add("hidden");
                }, 150);
            });
        })
        .catch(err => console.error('Error cargando el menú:', err));
}
// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
  initializeMenu();
}