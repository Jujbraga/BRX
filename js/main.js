const loadGoogleAnalytics = () => {
  if (window.__brxAnalyticsLoaded) {
    return;
  }

  window.__brxAnalyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-FSFPS72T0J";
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", "G-FSFPS72T0J");
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(loadGoogleAnalytics, { timeout: 3000 });
} else {
  window.addEventListener("load", loadGoogleAnalytics, { once: true });
}

// Navbar collapse toggle
const navbarToggle = document.getElementById("navbarToggle");
const navbarCollapse = document.getElementById("navbarCollapse");

if (navbarToggle && navbarCollapse) {
  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarCollapse.classList.toggle("show");
    navbarToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

//Back to top button
const backToTopBtn = document.getElementById("btn-back-to-top");

if (backToTopBtn) {
  const toggleBackToTop = () => {
    const scrolled =
      document.body.scrollTop > 40 || document.documentElement.scrollTop > 40;
    backToTopBtn.style.display = scrolled ? "block" : "none";
  };

  window.addEventListener("scroll", toggleBackToTop);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

//Auto-update copyright year
const currentYear = document.getElementById("current-year");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
