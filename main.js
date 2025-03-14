import Progress from "./progress.js";

const progressValueInput = document.querySelector("#progressValue");
const animateToggleCheckbox = document.querySelector("#animateToggle");
const hideToggleCheckbox = document.querySelector("#hideToggle");

const progressContainer = document.querySelector("#progressBar");
const progress = new Progress(progressContainer);

progressValueInput.addEventListener("keydown", (event) => {
  if (
    event.key === "Backspace" ||
    event.key === "Delete" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "Enter"
  )
    return;

  if (isNaN(Number(event.key))) {
    event.preventDefault();
    return;
  }

  const { selectionStart, selectionEnd } = event.target;
  const currentValue = event.target.value;

  const newValue =
    currentValue.slice(0, selectionStart) +
    event.key +
    currentValue.slice(selectionEnd);

  if (Number(newValue) > 100 || Number(newValue) < 0) {
    event.preventDefault();
  }
});

progressValueInput.addEventListener("change", (event) => {
  progress.setProgress(event.target.value);
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
