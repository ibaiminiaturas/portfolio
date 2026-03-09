function initializeMenu() {
  const dropdown = document.getElementById("dropdown-galerias");
  if(!dropdown) return; // Si el header no está cargado, salir
  dropdown.className = "absolute hidden bg-gray-800 mt-2 rounded shadow-lg w-max text-white";

  // Cargar galerías desde JSON
  fetch('/galeries.json')
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(sectionName => {
        const section = data[sectionName];
        const li = document.createElement("div");
        li.className = "relative";

        // Galería principal
        const aMain = document.createElement("a");
        aMain.href = `/galleries/index.html?galeria=${encodeURIComponent(sectionName)}`;
        aMain.textContent = sectionName;
       aMain.className = "block px-4 py-2 cursor-pointer rounded hover:bg-gray-700 w-max text-white whitespace-nowrap"; // ← aquí
        li.appendChild(aMain);

        // Submenú si hay subgalerías
        if(section.length > 0){
          const subMenu = document.createElement("div");
          subMenu.className = "absolute top-0 left-full hidden bg-gray-700 py-2 rounded shadow-lg min-w-[200px]";

          section.forEach(sub => {
            const aSub = document.createElement("a");
            aSub.href = `/galleries/index.html?galeria=${encodeURIComponent(sectionName)}&sub=${encodeURIComponent(sub.name)}`;
            aSub.textContent = sub.displayName || sub.name; // ← Aquí usamos displayName si existe
  aSub.className = "block px-4 py-2 rounded hover:bg-gray-600 text-white whitespace-nowrap"; // ← aquí
            subMenu.appendChild(aSub);
          });

          li.appendChild(subMenu);

          li.addEventListener("mouseenter", () => subMenu.classList.remove("hidden"));
          li.addEventListener("mouseleave", () => subMenu.classList.add("hidden"));
        }

        dropdown.appendChild(li);
      });

      // Hover persistente del menú principal
      const menu = document.getElementById("menu-galerias");
      let timeout;
      menu.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        dropdown.classList.remove("hidden");
      });
      menu.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
          dropdown.classList.add("hidden");
        }, 100);
      });
    })
    .catch(err => console.error("Error cargando galerías:", err));
}

// Inicializar cuando el DOM esté listo
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
  initializeMenu();
}