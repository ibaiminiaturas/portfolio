// assets/js/utils.js
function loadHeader(extra) {
      const base = (location.hostname.includes("github.io") ? "/portfolio/" : "") + extra;
      document.getElementById('header-logo').src = `${base}assets/images/ibai-miniaturas-circle.png`;
      document.getElementById('flag-es').src = `${base}assets/images/flag-es.svg`;
      document.getElementById('flag-uk').src = `${base}assets/images/flag-uk.png`;
      document.getElementById('ig-icon').src = `${base}assets/images/instagram.png`;
    }

    function loadFooter(extra) {
      const base = (location.hostname.includes("github.io") ? "/portfolio/" : "") + extra;
      document.getElementById('footer-logo').src = `${base}assets/images/ibai-miniaturas-circle.png`;
      document.getElementById('footer-ig-icon').src = `${base}assets/images/instagram.png`;
    }
