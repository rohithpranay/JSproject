let sideMenu = document.getElementById("side-bar");
let overlay = document.getElementById("overlay");
let menu = document.querySelector("#menu");
let acc = document.querySelectorAll(".accordion");
let xIcon = document.querySelector("#side-bar i");
let textarea = document.getElementById("question");
let legend = document.querySelector("#questn fieldset legend");
let options = document.querySelectorAll(".optns");
let label = document.querySelector(".poll__input label");

for (let i of options) {
  i.addEventListener("focus", function () {
    label.classList.remove("hidden");
    i.placeholder = "";
  });

  i.addEventListener("blur", function () {
    if (!i.value.trim()) {
      label.classList.add("hidden");
      i.placeholder = "option1";
    }
  });
}

menu.addEventListener("click", function () {
  sideMenu.style.display = "block";
  overlay.style.display = "block";
});

xIcon.addEventListener("click", function () {
  sideMenu.style.display = "none";
  overlay.style.display = "none";
});
