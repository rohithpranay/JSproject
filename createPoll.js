const createPollBtn = document.querySelector("#formBtns button");
const questionInput = document.getElementById("question");
const option1Input = document.getElementById("option1");
const option2Input = document.getElementById("option2");
const newOpt = document.querySelector("#new-option p");

newOpt.addEventListener("click", function () {
  let count = document.querySelectorAll(".poll_input").length + 1;
  if (option1Input.value.trim() !== "" && option2Input.value.trim() !== "") {
    let newOptionHTML = `
      <div class="poll_input"> <!-- Add the poll_input class here -->
        <label for="option${count}">Option ${count}</label>
        <div class="input-container">
          <input
            type="text"
            class="optns"
            id="option${count}"
            placeholder="enter the option"
          />
          <i class="ri-close-fill"></i>
        </div>
      </div>`;

    // Create a temporary container to hold the new option HTML
    let tempContainer = document.createElement("div");
    tempContainer.innerHTML = newOptionHTML;

    // Append the new option HTML to the actual container
    document.getElementById("optnsContainer").appendChild(tempContainer);
  }
});

function areInputsNotEmpty() {
  return (
    questionInput.value.trim() !== "" &&
    option1Input.value.trim() !== "" &&
    option2Input.value.trim() !== ""
  );
}
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

questionInput.addEventListener("input", updateButtons);
option1Input.addEventListener("input", updateButtons);
option2Input.addEventListener("input", updateButtons);

updateButtons();

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const pollType = document.querySelector("#poll-type");
  console.log(pollType);

  const question = document.getElementById("question").value;

  const options = Array.from(document.querySelectorAll(".optns")).map(
    (input) => input.value
  );
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  let id = JSON.parse(localStorage.getItem("polls")) || [];
  let votes = 0;

  const time = `${hours}:${minutes}:${seconds}`;
  const poll = {
    pollType: pollType,
    question: question,
    options: options,
    time: time,
    votes: votes,
    id: id.length + 1,
  };

  const existingPolls = JSON.parse(localStorage.getItem("polls")) || [];

  existingPolls.push(poll);

  localStorage.setItem("polls", JSON.stringify(existingPolls));

  document.querySelector("form").reset();

  alert("Poll created successfully");
}

createPollBtn.addEventListener("click", handleSubmit);
