import Progress from "./progress.js";

const progressValueInput = document.querySelector("#progressValue");
const animateToggleCheckbox = document.querySelector("#animateToggle");
const hideToggleCheckbox = document.querySelector("#hideToggle");

const progressContainer = document.querySelector("#progressBar");
const progress = new Progress(progressContainer);

progressValueInput.addEventListener("change", (event) => {
  if (!event.target.oldValue) {
    event.target.oldValue = event.target.defaultValue;
  }

  if (Number(event.target.value) < 0 || Number(event.target.value) > 100) {
    event.target.value = event.target.oldValue;
    return;
  }

  event.target.oldValue = event.target.value;

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
