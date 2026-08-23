document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = contactForm.querySelector("button[type='submit']");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Completa todos los campos antes de enviar.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formStatus.textContent = "Ingresa un correo válido.";
    return;
  }

  submitButton.disabled = true;
  formStatus.textContent = "Enviando...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(contactForm)
    });

    if (response.ok) {
      formStatus.textContent = "Gracias, " + name + ". Tu mensaje fue enviado.";
      contactForm.reset();
    } else {
      formStatus.textContent = "No se pudo enviar. Intenta de nuevo más tarde.";
    }
  } catch (error) {
    formStatus.textContent = "Error de conexión. Verifica tu internet e intenta de nuevo.";
  } finally {
    submitButton.disabled = false;
  }
});
