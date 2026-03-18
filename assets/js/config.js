// assets/js/config.js
// Define BASE_PATH dinámicamente
const BASE_PATH = (function() {

  const isGithub = location.hostname.includes("github.io");
  if (isGithub) {
    // Ajusta 'portfolio' al nombre de tu repo en GitHub
    return "/portfolio";
  } else {
    return ""; // local
  }
})();

// Objeto global accesible desde cualquier sitio
window.AppConfig = {
    _data: null,
    _loaded: false,

    // Función para cargar el JSON (se llama una vez al inicio)
init: async function() {
    try {
        const response = await fetch('/assets/config.json');
        

        const text = await response.text(); 

        this._data = JSON.parse(text); // Ahora parseamos el texto manualmente
        this._loaded = true;
        document.dispatchEvent(new CustomEvent('configReady'));
    } catch (e) {
        console.error("Error loading config", e);
    }
},

    // La función que tú quieres: "Dame el valor de esta clave"
    get: function(key, defaultValue = "") {
        if (!this._data) return defaultValue;
        
        // Esto permite buscar claves anidadas tipo "contacto.url"
        return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), this._data) || defaultValue;
    }
};

// Arrancamos la carga
window.AppConfig.init();