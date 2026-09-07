document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");
  const formMessage = document.getElementById("formMessage");
  const toast = document.getElementById("toastMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    formMessage.style.display = "block";
    formMessage.textContent = "Thanks! Your estimate request is ready for the contractor to receive. Connect this form to your email/CRM before launch.";
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 4200);
    form.reset();
    form.classList.remove("was-validated");
  });

  // Smooth-scroll and close mobile nav after clicking a section link.
  document.querySelectorAll('#mainNav a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
