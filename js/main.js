// Configuración editable
const CONFIG = {
  whatsapp: "34602605878",
  email: "" // Pon aquí el correo real (ej. "info@tudominio.es") para activar el botón "Enviar por correo"
};

// Menú móvil
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const abierto = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", abierto);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));
}

// Mapa: se carga solo tras aceptar (RGPD / LSSI)
const loadMap = document.getElementById("loadMap");
if (loadMap) {
  loadMap.addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = "https://www.google.com/maps?q=Calle%20Alcal%C3%A1%2072%2C%2004738%20V%C3%ADcar%2C%20Almer%C3%ADa&output=embed";
    f.title = "Ubicación de Firmes y Construcciones Hispánica en Vícar";
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    document.getElementById("mapBox").replaceChildren(f);
  });
}

// Formulario: prepara el mensaje y lo envía por WhatsApp o correo
const form = document.getElementById("contactForm");
if (form) {
  const msg = document.getElementById("formMessage");
  const btnEmail = document.getElementById("btnEmail");
  if (CONFIG.email && btnEmail) btnEmail.hidden = false;

  form.querySelectorAll("[data-canal]").forEach(btn => btn.addEventListener("click", () => {
    if (!form.reportValidity()) {
      msg.className = "form-message error";
      msg.textContent = "Completa los campos obligatorios y acepta la política de privacidad.";
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const texto = `Hola, soy ${d.nombre.trim()} (tel. ${d.telefono.trim()}).\nServicio: ${d.servicio}\n\n${d.mensaje.trim()}`;
    if (btn.dataset.canal === "whatsapp") {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    } else {
      location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Consulta web: " + d.servicio)}&body=${encodeURIComponent(texto)}`;
    }
    msg.className = "form-message success";
    msg.textContent = "Se ha abierto tu aplicación con el mensaje preparado. Pulsa enviar para completar la consulta.";
  }));
}
