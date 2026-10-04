const bilder = document.querySelectorAll(".gallery img");

bilder.forEach(function (bild) {
  bild.addEventListener("click", function () {
    if (bild.style.transform === "scale(1.05)") {
      bild.style.transform = "scale(1)";
    } else {
      bild.style.transform = "scale(1.05)";
    }
  });
});
