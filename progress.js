export default class Progress {
  constructor(
    parentNode = document.body,
    {
      size = Math.min(parentNode.offsetWidth, parentNode.offsetHeight),
      strokeWidth = 10,
      bgColor = "#EAF0F6",
      progressColor = "#005cff",
      animationSpeed = 2,
    } = {}
  ) {
    if (
      typeof size !== "number" ||
      typeof strokeWidth !== "number" ||
      typeof bgColor !== "string" ||
      typeof progressColor !== "string" ||
      typeof animationSpeed !== "number" ||
      !parentNode
    ) {
      throw new Error(
        "Invalid constructor arguments. Use {parentNode: HTMLElement, options: {size?: number, strokeWidth?: number, bgColor?: string, progressColor?: string, animationSpeed?: number}}"
      );
    }

    this.parentNode = parentNode;

    this.size = size;
    this.strokeWidth = strokeWidth;
    this.radius = this.size / 2 - this.strokeWidth;
    this.circumference = 2 * Math.PI * this.radius;
    this.animationSpeed = animationSpeed;
    this.animationFrameId = null;
    this.colors = { bg: bgColor, progress: progressColor };

    this.init();
  }

  init() {
    this.container = this.createContainer();
    this.bgCircle = this.createCircle("background", this.colors.bg);
    this.progressCircle = this.createCircle("progress", this.colors.progress);

    this.container.appendChild(this.bgCircle);
    this.container.appendChild(this.progressCircle);
    this.parentNode.appendChild(this.container);
  }

  createContainer() {
    const container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    container.setAttribute("class", "progress-ring");
    container.setAttribute("width", this.size);
    container.setAttribute("height", this.size);

    return container;
  }

  createCircle(type, color) {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("class", `progress-ring__${type}`);
    circle.setAttribute("cx", this.size / 2);
    circle.setAttribute("cy", this.size / 2);
    circle.setAttribute("r", this.radius);
    circle.setAttribute("stroke", color);
    circle.setAttribute("stroke-width", this.strokeWidth);
    circle.setAttribute("fill", "transparent");

    if (type === "progress") {
      circle.setAttribute(
        "stroke-dasharray",
        `${this.circumference} ${this.circumference}`
      );
      circle.setAttribute("stroke-dashoffset", this.circumference);
      circle.style.transition = "stroke-dashoffset 0.5s ease-in-out";
      circle.style.transformOrigin = "center";
      circle.style.transform = "rotate(-90deg)";
    }

    return circle;
  }

  setProgress(percent) {
    if (percent > 100 || percent < 0 || isNaN(Number(percent))) return;
    const offset = this.circumference - (percent / 100) * this.circumference;
    this.progressCircle.style.strokeDashoffset = offset;
  }

  show() {
    this.container.style.display = "block";
  }

  hide() {
    this.container.style.display = "none";
  }

  enableAnimation() {
    let rotation = 0;
    const rotateStep = this.animationSpeed;

    const rotate = () => {
      rotation += rotateStep;
      this.progressCircle.style.transform = `rotate(${rotation - 90}deg)`;

      this.animationFrameId = requestAnimationFrame(rotate);
    };

    this.animationFrameId = requestAnimationFrame(rotate);
  }

  disableAnimation() {
    cancelAnimationFrame(this.animationFrameId);
    this.progressCircle.style.transform = "rotate(-90deg)";
  }
}
