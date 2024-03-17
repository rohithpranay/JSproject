let sideMenu = document.getElementById("side-bar");
let overlay = document.getElementById("overlay");
let menu = document.querySelector("#menu");
let acc = document.querySelectorAll(".accordion");
let xIcon = document.querySelector("#side-bar i");

menu.addEventListener("click", function () {
  sideMenu.style.display = "block";
  overlay.style.display = "block";
});

xIcon.addEventListener("click", function () {
  sideMenu.style.display = "none";
  overlay.style.display = "none";
});
