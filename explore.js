const pollArr = JSON.parse(localStorage.getItem("polls")) || [];
const mainDiv = document.querySelector("#main-content");
let timeArr = [
  new Date().getHours(),
  new Date().getMinutes(),
  new Date().getSeconds(),
];

for (let i of pollArr) {
  let t = i.time.split(":");
  let elem = document.createElement("div");
  let time = timeArr[0] * 60 + timeArr[1] - (t[0] * 60 + t[1]);
  let label = time >= 90 ? "Expired" : "Ongoing";
  let html = `
    <a href="preview.html">
        <div class="label"><span>${label}</span></div>
        <div class="content">
            <p>${i.question}</p>
        </div>
        <div class="description">
            <i class="ri-team-fill"></i>
            <p>${i.votes} People voted</p>
        </div>
    </a>
`;

  elem.innerHTML = html;
  elem.classList.add("card");
  elem.setAttribute("id", i.id);
  elem.addEventListener("click", (e) => {
    const cardId = e.currentTarget.id;
    localStorage.setItem("ID", cardId);
  });

  mainDiv.appendChild(elem);
}
