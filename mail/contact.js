//Contact form
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

if (contactForm) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getField = (id) => document.getElementById(id)?.value.trim() ?? "";

  const validate = () => {
    const fname = getField("fname");
    const email = getField("email");
    const enquiry = getField("enquiry");
    const message = getField("message");
    const gdpr = document.getElementById("gdpr")?.checked;

    if (!fname || !email || !enquiry || !message) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!gdpr) {
      alert("Please accept the GDPR consent to send your message.");
      return false;
    }
    return true;
  };

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        contactForm.style.display = "none";
        formSuccess?.classList.remove("d-none");
        formSuccess?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        throw new Error("Server error");
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        'Send message <i class="fas fa-paper-plane ml-2"></i>';
      alert(
        "Something went wrong. Please try again or email us at info@brxconsulting.se",
      );
    }
  });
}
