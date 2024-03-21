let sideMenu = document.getElementById("side-bar");
let overlay = document.getElementById("overlay");
let menu = document.querySelector("#menu");
let acc = document.querySelectorAll(".accordion");
let xIcon = document.querySelector("#side-bar i");

// Event listener to open the side menu
menu.addEventListener("click", function () {
  sideMenu.style.display = "block";
  overlay.style.display = "block";
});

// Event listener to close the side menu
xIcon.addEventListener("click", function () {
  sideMenu.style.display = "none";
  overlay.style.display = "none";
});

// Event listeners to toggle accordion panels
acc.forEach(function (accordion) {
  accordion.addEventListener("click", function () {
    // Toggle the active class to expand/collapse the panel
    this.classList.toggle("active");
    // Get the sibling panel and toggle its visibility
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});
