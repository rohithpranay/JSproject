let mainContent = document.querySelector("#main-content");
let content = document.createElement("div");
const id = localStorage.getItem("ID");
const polls = JSON.parse(localStorage.getItem("polls")) || [];
const find = polls.find((elem) => elem.id == id);
if (find) {
  let time = find.time.split(":");
  content.setAttribute("id", "container");
  let html = `
    <div id="ques">
    <h2>${find.question}</h2>
    </div>
    <div class="opts">
    <div class="opts-label">
    <div class="radio-input">
    <input type="radio" id=${find.inputId[0]} name='vote1' value="" />
    </div>
    <div class="label">
    <label for="vote1">${find.options[0].val}</label>
    </div>
    </div>
    <div class="progress-bar">
    <span
    role="progressbar"
    aria-valuenow="0"
    aria-valuemin="0"
    aria-valuemax="100"
    >
    <span class='dynProgress1'></span>
    </span>
    <span class='voteCounter'>${find.options[0].optnvotes} people voted</span>
    </div>
    </div>
    <div class="opts">
    <div class="opts-label">
    <div class="radio-input">
    <input type="radio" id=${find.inputId[1]} name='vote2' value="" />
    </div>
    <div class="label">
    <label for="vote2">${find.options[1].val}</label>
    </div>
    </div>
    <div class="progress-bar">
    <span
    role="progressbar"
    aria-valuenow="0"
    aria-valuemin="0"
    aria-valuemax="100"
    ><span class='dynProgress2'></span>
    </span>
    <span class='voteCounter'>${find.options[1].optnvotes} people voted</span>
    </div>
    </div>
    <div id="desctime">
    <p class='voteCounter'><i class="ri-team-fill"></i> ${find.votes} people voted</p>
    <p><i class="ri-time-fill"></i> ${time[0]} hours ${time[1]} mins ${time[2]} secs</p>
    </div>
    `;
  content.innerHTML = html;
  mainContent.appendChild(content);
} else {
  console.log("Poll with ID", id, "not found.");
}

let input1 = document.getElementById("input01");
console.log(input1);
let pVotes = document.querySelector("#desctime p.voteCounter");
console.log(pVotes);
let input2 = document.getElementById("input02");
console.log(input2);
let modal = document.getElementById("confirmationModal");
let closeBtn = document.querySelector(".modal-content .close");

input1.addEventListener("click", function () {
  if (input1.checked) {
    modal.style.display = "block";
  }
});
input2.addEventListener("click", function () {
  if (input2.checked) {
    modal.style.display = "block";
  }
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  input1.checked = false;
  input2.checked = false;
});

document.getElementById("confirmVote").addEventListener("click", function () {
  modal.style.display = "none";

  // Find the clicked option
  const clickedInput = document.querySelector('input[name="vote1"]:checked');
  const selectedOptionIndex = clickedInput ? 0 : 1;
  console.log(selectedOptionIndex);
  input1.checked = false;
  input2.checked = false;

  // Increment the votes for the selected option
  find.options[selectedOptionIndex].optnvotes += 1;

  // Update the total votes count
  find.votes += 1;
  pVotes.innerHTML = `<i class="ri-team-fill"></i> ${find.votes} people voted`;
  console.log(find.votes); // Check if find.votes is correctly updated

  // Update the vote count displayed on the page for each option
  let voteElem = document.querySelectorAll(".voteCounter");
  voteElem.forEach(function (element, index) {
    element.innerHTML = `${find.options[index].optnvotes} people voted`;
  });

  // Update the progress bar width for each option
  const totalVotes = find.votes;
  let progressBar1 = document.querySelector(".dynProgress1");
  let progressBar2 = document.querySelector(".dynProgress2");
  progressBar1.style.width = `${
    (find.options[0].optnvotes / totalVotes) * 100
  }%`;
  progressBar2.style.width = `${
    (find.options[1].optnvotes / totalVotes) * 100
  }%`;
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    input1.checked = false;
    input2.checked = false;
  }
});
