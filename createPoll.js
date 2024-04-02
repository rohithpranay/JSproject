// Selecting elements
const createPollBtn = document.querySelector("#formBtns button");
const questionInput = document.getElementById("question");
const option1Input = document.getElementById("option1");
const option2Input = document.getElementById("option2");
const closeBtn = document.querySelectorAll(".close");
const newOpt = document.querySelector("#new-option p");

let count = document.querySelectorAll(".poll_input").length;
// Event listener for closing options
const optnsContainer = document.getElementById("optnsContainer");
optnsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) {
    event.target.parentElement.parentElement.remove();
    updateButtons();
    const optns = document.querySelectorAll(".poll_input");
    optnsCount = 3;
    optns.forEach((element, index) => {
      if (index >= 2) {
        element.setAttribute("id", optnsCount);
        element.children[0].textContent = `Option ${optnsCount}`;
        element.children[0].setAttribute("for", `option${optnsCount}`);
        element.children[1].children[0].setAttribute(
          "id",
          `option${optnsCount}`
        );
        optnsCount++;
      }
    });
  }
});

// Event listener for adding new options
newOpt.addEventListener("click", function () {
  if (areInputsNotEmpty()) {
    count = document.querySelectorAll(".poll_input").length;
    updateButtons();

    if (option1Input.value.trim() !== "" && option2Input.value.trim() !== "") {
      count++;

      // Generating HTML for new option
      let newOptionHTML = `
      <div id="opt-${count}" class="poll_input"> 
      <label for="option${count}">Option ${count}</label>
      <div class="input-container">
      <input
      type="text"
      class="optns"
      id="option${count}"
      placeholder="enter the option"
      />
      <i class="ri-close-fill close"></i>
      </div>
      </div>`;

      let tempContainer = document.createElement("div");
      tempContainer.innerHTML = newOptionHTML;

      document.getElementById("optnsContainer").appendChild(tempContainer);
    }
  }
});

// Function to check if inputs are not empty and update buttons accordingly
function areInputsNotEmpty() {
  if (questionInput.value.trim() === "") {
    return false;
  }

  const optionInputs = document.querySelectorAll(".optns");

  for (let i = 0; i < optionInputs.length; i++) {
    if (optionInputs[i].tagName !== "INPUT") continue;
    const optionValue = optionInputs[i].value.trim();
    if (optionValue === "") {
      return false;
    }
  }

  return true;
}

// Function to update buttons based on input status
function updateButtons() {
  if (areInputsNotEmpty()) {
    createPollBtn.classList.remove("disabled");
    newOpt.classList.add("optns");
    createPollBtn.classList.add("form-btns");
  } else {
    createPollBtn.classList.remove("form-btns");
    newOpt.classList.remove("optns");
    createPollBtn.classList.add("disabled");
  }
}

// Event listeners for input elements
questionInput.addEventListener("input", updateButtons);
option1Input.addEventListener("input", updateButtons);
option2Input.addEventListener("input", updateButtons);

updateButtons();

// Function to generate input IDs based on count
function inputID(count) {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push("option" + i); // Corrected input ID generation
  }
  return arr;
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  if (areInputsNotEmpty()) {
    const question = document.getElementById("question").value;

    // Mapping option inputs to option objects
    const options = Array.from(document.querySelectorAll(".optns")).map(
      (input) => {
        if (input.value !== undefined) {
          let optnvotes = 0;
          let val = input.value;
          return {
            val,
            optnvotes,
          };
        }
      }
    );

    // Generating current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let id = JSON.parse(localStorage.getItem("polls")) || [];
    let votes = 0;

    const time = `${hours}:${minutes}:${seconds}`;

    // Creating poll object
    const poll = {
      question: question,
      options: options,
      time: time,
      votes: votes,
      id: id.length + 1,
      inputId: inputID(count),
    };

    // Retrieving existing polls from local storage
    const existingPolls = JSON.parse(localStorage.getItem("polls")) || [];

    // Adding new poll to existing polls
    existingPolls.push(poll);

    // Saving updated polls to local storage
    localStorage.setItem("polls", JSON.stringify(existingPolls));
    document.querySelector("form").reset();

    alert("Poll created successfully");
  }
}

createPollBtn.addEventListener("click", handleSubmit);
