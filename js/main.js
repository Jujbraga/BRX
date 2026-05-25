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
