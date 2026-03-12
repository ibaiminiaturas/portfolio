let translations = {};
let currentLang = "es";

function getNested(obj, key) {
 return key.split('.').reduce((obj, i) => obj?.[i], translations);
}
// Función para obtener una traducción manualmente desde JS
function t(key) {
    const text = getNested(translations, key);
    return text || key; // Si no existe la traducción, devuelve la clave (ej: "menu.home")
}

async function loadLanguage(lang) {

  try {

    const res = await fetch(`${BASE_PATH}/assets/i18n/${lang}.json`);
    translations = await res.json();

    currentLang = lang;

    localStorage.setItem("lang", lang);

    translatePage();
  } catch (err) {

    console.error("Error cargando idioma:", err);

  }
}

function translatePage() {

  document.querySelectorAll("[data-i18n]").forEach(el => {

    const key = el.dataset.i18n;
    const text = getNested(translations, key);

    if (text) {
      el.textContent = text;
    }

  });



}

