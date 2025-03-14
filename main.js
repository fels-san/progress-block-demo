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
