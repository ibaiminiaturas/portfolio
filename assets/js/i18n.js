let translations = {};
let currentLang = localStorage.getItem("lang") || "es"; // 1. Recuperar idioma guardado de entrada

function getNested(obj, key) {
    return key.split('.').reduce((obj, i) => obj?.[i], obj); // Corregido: usa 'obj' en el reduce, no la global
}

function t(key) {
    const text = getNested(translations, key);
    return text || key;
}

async function loadLanguage(lang) {
    try {
        const res = await fetch(`${BASE_PATH}/assets/i18n/${lang}.json`);
        translations = await res.json();
        currentLang = lang;
        localStorage.setItem("lang", lang);

        translatePage();
        
        // Disparar un evento personalizado por si otros scripts 
        // necesitan saber que el idioma ya está cargado
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
        
    } catch (err) {
        console.error("Error loading language:", err);
    }
}

function translatePage() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const text = getNested(translations, key);
        if (text) {
            // Si es un input con placeholder, traducimos el placeholder
            if (el.placeholder) {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });
}

// 2. AUTO-EJECUCIÓN AL CARGAR LA WEB
// Esto hace que nada más abrir "About", busque el idioma y traduzca.
document.addEventListener("DOMContentLoaded", () => {
    loadLanguage(currentLang);
});