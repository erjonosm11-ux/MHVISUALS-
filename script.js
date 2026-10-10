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

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");

  if (!menuButton || !navigation) {
    console.error("Hamburger-Menü nicht gefunden!");
    return;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("menu-open");

    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Menü schliessen" : "Menü öffnen"
    );
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("menu-open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Menü öffnen");
    });
  });
});
