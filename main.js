import Progress from "./progress.js";

const progressValueInput = document.querySelector("#progressValue");
const animateToggleCheckbox = document.querySelector("#animateToggle");
const hideToggleCheckbox = document.querySelector("#hideToggle");

const progressContainer = document.querySelector("#progressBar");
const progress = new Progress(progressContainer);

let previousValidValue = "";

progressValueInput.addEventListener("input", (event) => {
  const input = event.target;
  const value = input.value.replace(/[^0-9]/g, "");

  if (value >= 0 && value <= 100 && !isNaN(value)) {
    input.value = value;
    previousValidValue = value;
    progress.setProgress(value);
  } else {
    input.value = previousValidValue;
  }
});

progressValueInput.addEventListener("keydown", (event) => {
  const input = event.target;
  let value = parseInt(input.value);

  if (event.key === "ArrowUp") {
    value = Math.min(value + 1, 100);
  } else if (event.key === "ArrowDown") {
    value = Math.max(value - 1, 0);
  }

  input.value = value;
  previousValidValue = value;
  progress.setProgress(value);
});

progressValueInput.addEventListener("wheel", (event) => {
  const input = event.target;
  let value = parseInt(input.value);

  if (event.deltaY < 0) {
    value = Math.min(value + 1, 100);
  } else if (event.deltaY > 0) {
    value = Math.max(value - 1, 0);
  }

  event.preventDefault();

  input.value = value;
  previousValidValue = value;
  progress.setProgress(value);
});

animateToggleCheckbox.addEventListener("change", function () {
  if (this.checked) {
    progress.enableAnimation();
  } else {
    progress.disableAnimation();
  }
});

hideToggleCheckbox.addEventListener("change", function () {
  if (this.checked) {
    progress.hide();
  } else {
    progress.show();
  }
});
