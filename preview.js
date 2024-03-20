const mainContent = document.querySelector("#main-content");
const id = localStorage.getItem("ID");
const polls = JSON.parse(localStorage.getItem("polls")) || [];
const find = polls.find((elem) => elem.id == id);

if (find) {
  const time = find.time.split(":");

  // Create the container div
  const containerDiv = document.createElement("div");
  containerDiv.id = "container";

  // Create a div for the question
  const questionDiv = document.createElement("div");
  questionDiv.id = "ques";
  questionDiv.innerHTML = `<h2>${find.question}</h2>`;
  containerDiv.appendChild(questionDiv);

  // Create divs for each option
  find.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("opts");

    // Create div for option label and radio input
    const optsLabelDiv = document.createElement("div");
    optsLabelDiv.classList.add("opts-label");

    if (option) {
      optsLabelDiv.innerHTML = `
                <div class="radio-input">
                    <input type="radio" id="${find.inputId[index]}" name="vote${
        index + 1
      }" value="" />
                </div>
                <div class="label">
                    <label for="${find.inputId[index]}">${option.val}</label>
                </div>
            `;
    }

    optionDiv.appendChild(optsLabelDiv);

    // Create progress bar
    const progressBarDiv = document.createElement("div");
    progressBarDiv.classList.add("progress-bar");

    if (option) {
      progressBarDiv.innerHTML = `
                <span role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <span class="dynProgress${index + 1}"></span>
                </span>
                <span class="voteCounter">${
                  option.optnvotes
                } people voted</span>
            `;
    }
    optionDiv.appendChild(progressBarDiv);

    containerDiv.appendChild(optionDiv);
  });

  // Create div for description and time
  const desctimeDiv = document.createElement("div");
  desctimeDiv.id = "desctime";

  desctimeDiv.innerHTML = `
        <p class="voteCounter"><i class="ri-team-fill"></i> ${find.votes} people voted</p>
        <p><i class="ri-time-fill"></i> ${time[0]} hours ${time[1]} mins ${time[2]} secs</p>
    `;

  containerDiv.appendChild(desctimeDiv);

  // Append container div to main content
  mainContent.appendChild(containerDiv);

  // Now, select the dynamically added elements
  let inputs = find.inputId;

  function inputFalse() {
    for (let inp of inputs) {
      document.getElementById(inp).checked = false;
    }
  }
  let radioInputs = document.querySelectorAll('input[type = "radio"]');

  function inputActv() {
    for (let inp of radioInputs) {
      if (inp.checked) {
        return inp;
      }
    }
  }

  for (let i of inputs) {
    let e = document.querySelector(`#${i}`);
    e.addEventListener("click", function () {
      if (e.checked) {
        modal.style.display = "block";
      }
    });
  }

  let totalVotesElem = document.querySelector("#desctime p.voteCounter");
  let progressBarElements = document.querySelectorAll(".progress-bar");

  let modal = document.getElementById("confirmationModal");
  let closeBtn = document.querySelector(".modal-content .close");

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    inputFalse();
  });

  document.getElementById("confirmVote").addEventListener("click", function () {
    modal.style.display = "none";

    const clickedInput = inputActv();
    if (clickedInput) {
      let selectedOptionIndex = clickedInput.getAttribute("id");
      selectedOptionIndex = Number(selectedOptionIndex.at(-1)) - 1;

      inputFalse();

      // Increment the votes for the selected option
      find.options[selectedOptionIndex].optnvotes += 1;

      // Update the total votes count
      find.votes += 1;
      totalVotesElem.innerHTML = `<i class="ri-team-fill"></i> ${find.votes} people voted`;

      // Update the vote count displayed on the page for each option
      let voteElem = document.querySelectorAll(".voteCounter");
      if (voteElem) {
        voteElem.forEach(function (element, index) {
          const option = find.options[index];
          if (option) {
            console.log("Votes for option", index + 1, ":", option.optnvotes);
            element.innerHTML = `${option.optnvotes} people voted`;
          }
        });
      }

      // Update the progress bar width and color for each option
      const totalVotes = find.votes;
      console.log("Total votes:", totalVotes);
      progressBarElements.forEach((progressBar, index) => {
        const option = find.options[index];
        if (option) {
          const optionVotes = option.optnvotes || 0;
          console.log("Votes for option", index + 1, ":", optionVotes);
          const percentage =
            totalVotes !== 0 ? (optionVotes / totalVotes) * 100 : 0;
          console.log("Percentage for option", index + 1, ":", percentage);
          const progressBarInner = progressBar.querySelector(
            `.dynProgress${index + 1}`
          );
          progressBarInner.style.width = `${percentage}%`;
          // Add .dynProgress class
          progressBarInner.classList.add("dynProgress");
        }
      });
    }
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      inputFalse();
    }
  });
} else {
  console.log("Poll with ID", id, "not found.");
}
