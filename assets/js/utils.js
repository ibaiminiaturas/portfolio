// assets/js/utils.js
function loadHeader(extra) {
    
      const base = (location.hostname.includes("github.io") ? "/portfolio/" : "") + extra;
    const flagEs = document.getElementById('flag-es');
    const flagEn = document.getElementById('flag-en');
    const logo = document.getElementById('header-logo');
    const logo_mobile = document.getElementById('header-logo-mobile');

    // Usamos el "Optional Chaining" o un simple IF
    if (flagEs) flagEs.src = `${BASE_PATH}/assets/images/flag-es.svg`;
    if (flagEn) flagEn.src = `${BASE_PATH}/assets/images/flag-en.png`;
    if (logo)   logo.src   = `${BASE_PATH}/assets/images/ibai-miniaturas-circle.webp`;
if(logo_mobile) logo_mobile.src =  `${BASE_PATH}/assets/images/ibai-miniaturas-circle.webp`;
      document.getElementById('ig-icon').src = `${base}assets/images/instagram.png`;
      // document.getElementById('flag-es-mobile').src = `${base}assets/images/flag-es.svg`;
      // document.getElementById('flag-uk-mobile').src = `${base}assets/images/flag-uk.png`;
      // document.getElementById('ig-icon-mobile').src = `${base}assets/images/instagram.png`;
    }
