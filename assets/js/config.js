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