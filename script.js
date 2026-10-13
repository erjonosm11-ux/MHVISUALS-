document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryPhotos = document.querySelectorAll(".gallery-photo");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const isActive = btn === button;

        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      galleryPhotos.forEach((photo) => {
        const category = photo.dataset.category;

        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        photo.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
});

/* ==================================
   MOBILES HAMBURGER MENÜ
================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (!menuToggle || !nav) return;

  function closeMenu() {
    menuToggle.classList.remove("active");
    nav.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menü öffnen");
  }

  // Menü öffnen und schliessen
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Menü schliessen" : "Menü öffnen",
    );
  });

  // Menü schliessen, wenn ein Link angeklickt wird
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Menü mit Escape schliessen
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Menü beim Wechsel auf Desktop schliessen
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });
});
// ==================================
// BUCHUNGSFORMULAR
// ==================================

const bookingForm = document.querySelector("#booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#booking-name").value;
    const email = document.querySelector("#booking-email").value;
    const shooting = document.querySelector(
      'input[name="shooting"]:checked',
    ).value;
    const date = document.querySelector("#booking-date").value;
    const message = document.querySelector("#booking-message").value;

    const empfaenger = "DEINEEMAIL@EMAIL.CH";

    const betreff = "Buchungsanfrage MHVISUALS";

    const nachricht =
      `Name: ${name}\n` +
      `E-Mail: ${email}\n` +
      `Shooting: ${shooting}\n` +
      `Datum: ${date || "Noch offen"}\n\n` +
      `Nachricht:\n${message}`;

    const mailtoLink =
      `mailto:${empfaenger}` +
      `?subject=${encodeURIComponent(betreff)}` +
      `&body=${encodeURIComponent(nachricht)}`;

    window.location.href = mailtoLink;
  });
}
