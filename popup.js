// Minimalistic Carousel JS atarts here

document.addEventListener("DOMContentLoaded", function() {
  const popupFull = document.getElementById("popup-full");
  const popupCloseBtn = document.getElementById("popup-close-btn");
  const popupMiniBtn = document.getElementById("popup-mini-btn");

  // Show full popup on page load
  popupFull.style.display = "flex";

  // Function to close full popup and show mini button
  function closeFullPopup() {
    popupFull.style.display = "none";
    popupMiniBtn.style.display = "block";
  }

  // Close button click
  popupCloseBtn.addEventListener("click", closeFullPopup);

  // Click outside popup-container closes popup
  popupFull.addEventListener("click", function(e) {
    if(e.target === popupFull) { // only if background clicked
      closeFullPopup();
    }
  });

  // Mini button click opens full popup again
  popupMiniBtn.addEventListener("click", function() {
    popupFull.style.display = "flex";
    popupMiniBtn.style.display = "none";
  });
});
