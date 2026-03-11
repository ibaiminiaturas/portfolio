let translations = {};
let currentLang = "es";

function getNested(obj, key) {
 return key.split('.').reduce((obj, i) => obj?.[i], translations);
}

async function loadLanguage(lang) {

  try {

    const res = await fetch(`/portfolio/assets/i18n/${lang}.json`);
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

