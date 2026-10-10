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
