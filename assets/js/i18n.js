let translations = {};
let currentLang = "es";

function getNested(obj, key) {
  return key.split('.').reduce((o, i) => o ? o[i] : null, obj);
}

async function loadLanguage(lang) {

  try {

    const res = await fetch(`assets/i18n/${lang}.json`);
    translations = await res.json();

    currentLang = lang;

    localStorage.setItem("lang", lang);

    translatePage();
console.log("pasa");
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