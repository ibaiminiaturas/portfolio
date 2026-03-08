// Estructura de galerías
const galerias = [
  { section: "Box Arts", subs: ["MarvelUnited","SOIF","Other Works"] },
  { section: "Warhammer", subs: [] },
  { section: "Warhammer 40k", subs: [] }
];

function initializeMenu() {
  const dropdown = document.getElementById("dropdown-galerias");
  if(!dropdown) return; // Si el header no está cargado/presente, salir
  
  dropdown.className = "absolute hidden bg-gray-800 mt-2 rounded shadow-lg w-max";

  // Construir el menú
  galerias.forEach(section => {
    const li = document.createElement("div");
    li.className = "relative";

    // Galería principal
    const aMain = document.createElement("a");
    aMain.href = `/galleries/index.html?galeria=${encodeURIComponent(section.section)}`;
    aMain.textContent = section.section;
    aMain.className = "block px-4 py-2 cursor-pointer rounded hover:bg-gray-700 w-full";
    li.appendChild(aMain);

    // Submenú
    if(section.subs.length > 0){
      const subMenu = document.createElement("div");
      subMenu.className = "absolute top-0 left-full hidden bg-gray-700 py-2 rounded shadow-lg min-w-[200px]";

      section.subs.forEach(sub => {
        const aSub = document.createElement("a");
        aSub.href = `/galleries/index.html?galeria=${encodeURIComponent(section.section)}&sub=${encodeURIComponent(sub)}`;
        aSub.textContent = sub;
        aSub.className = "block px-4 py-2 rounded hover:bg-gray-600";
        subMenu.appendChild(aSub);
      });

      li.appendChild(subMenu);

      li.addEventListener("mouseenter", () => subMenu.classList.remove("hidden"));
      li.addEventListener("mouseleave", () => subMenu.classList.add("hidden"));
    }

    dropdown.appendChild(li);
  });

  // Hover persistente
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
}

// Inicializar cuando el DOM esté listo
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
  initializeMenu();
}
