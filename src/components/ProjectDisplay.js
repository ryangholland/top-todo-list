import projectImg from "../assets/list-box-outline.svg";
import { addSelectScreenEventListener } from "../events/screenEvents";

export default class ProjectDisplay {
  constructor(project) {
    this.project = project;
  }

  render() {
    const button = document.createElement("button");
    button.classList.add("screen-selector")
    const img = document.createElement("img");
    img.classList.add("projectImg");
    img.src = projectImg;
    const p = document.createElement("p");
    p.textContent = this.project.title;

    button.append(img);
    button.append(p);
    addSelectScreenEventListener(button);
    return button;
  }
}
