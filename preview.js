let mainContent = document.querySelector("#main-content");
let content = document.createElement("div");
const id = localStorage.getItem("ID");
console.log(id);
const polls = JSON.parse(localStorage.getItem("polls")) || [];
console.log(polls);
const find = polls.find((elem) => elem.id == id);
console.log(find);
if (find) {
  // Check if the object is found
  let time = find.time.split(":");
  content.setAttribute("id", "container");
  let html = `
        <div id="ques">
            <h2>${find.question}</h2>
        </div>
        <div class="opts">
            <div class="opts-label">
                <div class="radio-input">
                    <input type="radio" id="" value="" />
                </div>
                <div class="label">
                    <label for="kjbj">${find.options[0]}</label>
                </div>
            </div>
            <div class="progress-bar">
                <span
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></span>
                <span>${find.votes} people voted</span>
            </div>
        </div>
        <div class="opts">
            <div class="opts-label">
                <div class="radio-input">
                    <input type="radio" id="" value="" />
                </div>
                <div class="label">
                    <label for="kjbj">${find.options[1]}</label>
                </div>
            </div>
            <div class="progress-bar">
                <span
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></span>
                <span>${find.votes} people voted</span>
            </div>
        </div>
        <div id="desctime">
            <p><i class="ri-team-fill"></i> ${find.votes} people voted</p>
            <p><i class="ri-time-fill"></i> ${time[0]} hours ${time[1]} mins ${time[2]} secs</p>
        </div>
    `;
  content.innerHTML = html;
  mainContent.appendChild(content);
} else {
  console.log("Poll with ID", id, "not found.");
}
