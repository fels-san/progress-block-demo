import "./style.css";
import Progress from "./progress.js";

const progressValueInput = document.querySelector("#progressValue");
const animateToggleCheckbox = document.querySelector("#animateToggle");
const hideToggleCheckbox = document.querySelector("#hideToggle");

const progressContainer = document.querySelector("#progressBar");
const progress = new Progress(progressContainer);

progressValueInput.addEventListener("change", (event) => {
  if (+event.target.value > 100 || +event.target.value < 0) return;
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
