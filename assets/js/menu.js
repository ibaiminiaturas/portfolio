// Inicialización del menú de galerías desde el JSON
function initializeMenu() {
  const dropdown = document.getElementById("dropdown-galerias");
  if (!dropdown) return;

  // Estilos base del dropdown
  dropdown.className = "absolute hidden bg-gray-800 mt-2 rounded shadow-lg text-white";

  // Cargar galerías desde el JSON
  fetch('/galeries.json')
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(sectionName => {
        const sectionSubs = data[sectionName];

        const li = document.createElement("div");
        li.className = "relative";

        // Link principal de la galería
        const aMain = document.createElement("a");
        aMain.href = `/galleries/index.html?galeria=${encodeURIComponent(sectionName)}`;
        aMain.textContent = sectionName;
        aMain.className = "block px-4 py-2 cursor-pointer rounded hover:bg-gray-700 w-full text-left text-white whitespace-nowrap";
        li.appendChild(aMain);

        // Submenú si hay subgalerías
        if (sectionSubs.length > 0) {
          const subMenu = document.createElement("div");
          subMenu.className = "absolute top-0 left-full hidden bg-gray-700 py-2 rounded shadow-lg";
          subMenu.style.whiteSpace = "nowrap"; // evitar saltos de línea
          subMenu.style.minWidth = "max-content"; // ancho adaptativo al contenido

  // 🔹 Aseguramos que el padre directo sea relative
  li.classList.add("relative");

          sectionSubs.forEach(sub => {
            const aSub = document.createElement("a");

            aSub.href = `/galleries/index.html?galeria=${encodeURIComponent(sectionName)}&sub=${encodeURIComponent(sub.name)}`;
            aSub.textContent = sub.displayName || sub.name;
            aSub.className = "block px-4 py-2 rounded text-white bg-gray-700 hover:bg-gray-500 transition-colors duration-200";
            aSub.classList.add("transition-colors", "duration-200"); 
            subMenu.appendChild(aSub);
          });

          li.appendChild(subMenu);

          // Mostrar/ocultar submenú
          li.addEventListener("mouseenter", () => subMenu.classList.remove("hidden"));
          li.addEventListener("mouseleave", () => subMenu.classList.add("hidden"));
        }

        dropdown.appendChild(li);
      });

      // Hover persistente del dropdown principal
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
    .catch(err => console.error('Error cargando galerías:', err));
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
  initializeMenu();
}