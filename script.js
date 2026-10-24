/* ==========================================
   MHVISUALS – KOMPLETTE SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. PORTFOLIO FILTER
  ========================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryPhotos = document.querySelectorAll(".gallery-photo");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const active = btn === button;

        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", String(active));
      });

      galleryPhotos.forEach((photo) => {
        const show =
          selectedFilter === "all" || photo.dataset.category === selectedFilter;

        photo.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ==========================================
     2. HAMBURGER MENÜ
  ========================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (menuToggle && nav) {
    function closeMenu() {
      menuToggle.classList.remove("active");
      nav.classList.remove("menu-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menü öffnen");
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("menu-open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menü schliessen" : "Menü öffnen",
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  /* ==========================================
     3. BUCHUNGSSYSTEM
  ========================================== */

  const form = document.querySelector("#booking-form");

  if (!form) return;

  const steps = [...form.querySelectorAll(".booking-step")];
  const progressSteps = [...document.querySelectorAll(".progress-step")];

  const nextBtn = document.querySelector("#booking-next");
  const backBtn = document.querySelector("#booking-back");
  const submitBtn = document.querySelector("#booking-submit");
  const gmailBtn = document.querySelector("#booking-gmail");

  const dateInput = document.querySelector("#booking-date");
  const startInput = document.querySelector("#booking-start");
  const endInput = document.querySelector("#booking-end");

  const summary = document.querySelector("#booking-summary");

  const recipientEmail = "mejdin.halimi27@gmail.com";

  let currentStep = 0;

  if (steps.length !== 5 || !nextBtn || !backBtn || !submitBtn) {
    console.error("MHVISUALS: Buchungsschritte oder Buttons fehlen.");
    return;
  }

  /* ==========================================
     4. HILFSFUNKTIONEN
  ========================================== */

  function getValue(id) {
    return document.getElementById(id)?.value.trim() || "";
  }

  function getSelectedValue(name) {
    return form.querySelector(`input[name="${name}"]:checked`)?.value || "";
  }

  function getTodayLocal() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatDate(value) {
    if (!value) return "Nicht angegeben";

    const [year, month, day] = value.split("-");

    return `${day}.${month}.${year}`;
  }

  dateInput.min = getTodayLocal();

  /* ==========================================
     5. SPIELBEGINN UND SPIELENDE PRÜFEN
  ========================================== */

  function validateGameTimes() {
    endInput.setCustomValidity("");

    if (
      startInput.value &&
      endInput.value &&
      endInput.value <= startInput.value
    ) {
      endInput.setCustomValidity(
        "Das Spielende muss nach dem Spielbeginn liegen.",
      );

      return false;
    }

    return true;
  }

  startInput.addEventListener("input", validateGameTimes);
  endInput.addEventListener("input", validateGameTimes);

  /* ==========================================
     6. BUCHUNGSDATEN SAMMELN
  ========================================== */

  function getBookingData() {
    return {
      shooting: getSelectedValue("shooting"),
      date: getValue("booking-date"),
      start: getValue("booking-start"),
      end: getValue("booking-end"),
      location: getValue("booking-location"),
      players: getValue("booking-players"),
      duration: getValue("booking-duration"),
      wishes: getValue("booking-wishes") || "Keine",
      name: getValue("booking-name"),
      email: getValue("booking-email"),
    };
  }

  /* ==========================================
     7. BUCHUNGSÜBERSICHT
  ========================================== */

  function renderSummary() {
    if (!summary) return;

    const data = getBookingData();

    const rows = [
      ["SHOOTING", data.shooting],
      ["SPIELDATUM", formatDate(data.date)],
      ["SPIELBEGINN", data.start + " Uhr"],
      ["SPIELENDE", data.end + " Uhr"],
      ["ORT", data.location],
      ["SPIELER", data.players],
      ["DAUER", data.duration],
      ["WÜNSCHE", data.wishes],
      ["NAME", data.name],
      ["E-MAIL", data.email],
    ];

    summary.replaceChildren();

    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "booking-summary-row";

      const labelElement = document.createElement("span");
      labelElement.textContent = label;

      const valueElement = document.createElement("strong");
      valueElement.textContent = value || "Nicht angegeben";

      row.append(labelElement, valueElement);
      summary.appendChild(row);
    });
  }

  /* ==========================================
     8. SCHRITTE ANZEIGEN
  ========================================== */

  function showStep(index) {
    if (index < 0 || index >= steps.length) return;

    currentStep = index;

    steps.forEach((step, i) => {
      const active = i === index;

      step.classList.toggle("active", active);
      step.hidden = !active;
      step.style.display = active ? "block" : "none";
    });

    progressSteps.forEach((item, i) => {
      item.classList.toggle("active", i === index);
      item.classList.toggle("completed", i < index);
    });

    const firstStep = index === 0;
    const lastStep = index === steps.length - 1;

    backBtn.hidden = firstStep;
    nextBtn.hidden = lastStep;
    submitBtn.hidden = !lastStep;

    if (gmailBtn) {
      gmailBtn.hidden = !lastStep;
    }

    // Vorherige CSS-Testregeln für den WEITER-Button
    // dürfen das hidden-Attribut nicht überschreiben.
    nextBtn.style.removeProperty("display");
    backBtn.style.removeProperty("display");
    submitBtn.style.removeProperty("display");

    if (gmailBtn) {
      gmailBtn.style.removeProperty("display");
    }

    if (lastStep) {
      renderSummary();
    }

    document.querySelector(".booking-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  /* ==========================================
     9. EINGABEN PRÜFEN
  ========================================== */

  function validateStep() {
    // SCHRITT 1 – SHOOTING
    if (currentStep === 0) {
      return true;
    }

    // SCHRITT 2 – DATUM UND SPIELZEITEN
    if (currentStep === 1) {
      if (!dateInput.reportValidity()) {
        return false;
      }

      if (dateInput.value < getTodayLocal()) {
        alert("Bitte wähle ein gültiges zukünftiges Datum.");
        dateInput.focus();
        return false;
      }

      if (!startInput.reportValidity()) {
        return false;
      }

      validateGameTimes();

      if (!endInput.reportValidity()) {
        return false;
      }
    }

    // SCHRITT 3 – ORT
    if (currentStep === 2) {
      const location = document.querySelector("#booking-location");

      if (!location || !location.value.trim()) {
        alert("Bitte gib den Shooting-Ort ein.");
        location?.focus();
        return false;
      }
    }

    // SCHRITT 4 – KONTAKT
    if (currentStep === 3) {
      const name = document.querySelector("#booking-name");
      const email = document.querySelector("#booking-email");

      if (!name || !name.reportValidity()) {
        return false;
      }

      if (!email || !email.reportValidity()) {
        return false;
      }
    }

    return true;
  }

  /* ==========================================
     10. WEITER
  ========================================== */

  nextBtn.addEventListener("click", () => {
    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
    }
  });

  /* ==========================================
     11. ZURÜCK
  ========================================== */

  backBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });

  /* ==========================================
     12. E-MAIL VORBEREITEN
  ========================================== */

  function prepareEmail() {
    const data = getBookingData();

    if (
      !data.shooting ||
      !data.date ||
      !data.start ||
      !data.end ||
      !data.location ||
      !data.name ||
      !data.email
    ) {
      alert("Bitte vervollständige alle Pflichtangaben.");
      return null;
    }

    if (!validateGameTimes()) {
      alert("Das Spielende muss nach dem Spielbeginn liegen.");
      return null;
    }

    const subject = `Buchungsanfrage MHVISUALS – ${data.shooting}`;

    const body = [
      "NEUE BUCHUNGSANFRAGE – MHVISUALS",
      "",
      `Shooting: ${data.shooting}`,
      `Spieldatum: ${formatDate(data.date)}`,
      `Spielbeginn: ${data.start} Uhr`,
      `Spielende: ${data.end} Uhr`,
      `Ort: ${data.location}`,
      `Spieler: ${data.players}`,
      `Dauer: ${data.duration}`,
      "",
      `Besondere Wünsche: ${data.wishes}`,
      "",
      "KONTAKTDATEN",
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
    ].join("\n");

    return { subject, body };
  }

  /* ==========================================
     13. MIT MAIL-APP SENDEN
  ========================================== */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (currentStep !== 4) return;

    const email = prepareEmail();
    if (!email) return;

    const mailtoURL =
      `mailto:${recipientEmail}` +
      `?subject=${encodeURIComponent(email.subject)}` +
      `&body=${encodeURIComponent(email.body)}`;

    window.location.href = mailtoURL;
  });

  /* ==========================================
     14. MIT GMAIL SENDEN
  ========================================== */

  gmailBtn?.addEventListener("click", () => {
    if (currentStep !== 4) return;

    const email = prepareEmail();
    if (!email) return;

    const gmailURL =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(recipientEmail)}` +
      `&su=${encodeURIComponent(email.subject)}` +
      `&body=${encodeURIComponent(email.body)}`;

    window.open(gmailURL, "_blank", "noopener,noreferrer");
  });

  /* ==========================================
     15. START
  ========================================== */

  showStep(0);
});
