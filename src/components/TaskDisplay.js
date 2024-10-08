import project from "../assets/list-box-outline.svg";
import highPrio from "../assets/high-prio.svg";
import medPrio from "../assets/med-prio.svg";
import note from "../assets/note-text.svg";
import clock from "../assets/calendar-clock.svg";
import trash from "../assets/delete.svg";
import pencil from "../assets/pencil.svg";

import { isToday, isTomorrow, isPast } from "date-fns";

export default class TaskDisplay {
  constructor(task) {
    this.task = task;
  }

  render() {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    //Top Row
    const topRow = document.createElement("div");
    topRow.classList.add("flex-row");
    topRow.classList.add("task-row");

    // Top Left
    const topLeft = document.createElement("div");
    topLeft.classList.add("flex-row");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    toggleButton.dataset.id = this.task.id;

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = this.task.title;

    topLeft.append(toggleButton);
    topLeft.append(taskTitle);

    if (this.task.priority !== "low") {
      const prioImg = document.createElement("img");
      prioImg.classList.add("prioImg");
      prioImg.src = this.task.priority === "high" ? highPrio : medPrio;
      topLeft.append(prioImg);
    }

    topRow.append(topLeft);

    // Top Right
    const topRight = document.createElement("div");

    const trashButton = document.createElement("button");
    const trashImg = document.createElement("img");
    trashButton.dataset.id = this.task.id;
    trashButton.classList.add("trash-btn");
    trashImg.classList.add("trashImg");
    trashImg.src = trash;
    trashButton.append(trashImg);

    const pencilButton = document.createElement("button");
    const pencilImg = document.createElement("img");
    pencilButton.dataset.id = this.task.id;
    pencilButton.classList.add("pencil-btn");
    pencilImg.classList.add("pencilImg");
    pencilImg.src = pencil;
    pencilButton.append(pencilImg);

    topRight.append(pencilButton);
    topRight.append(trashButton);
    topRow.append(topRight);
    taskContainer.append(topRow);

    // Bottom Row
    if (this.task.dueDate || this.task.project || this.task.description) {
      const bottomRow = document.createElement("div");
      bottomRow.classList.add("flex-row");
      bottomRow.classList.add("task-details-row");

      if (this.task.dueDate) {
        const dueP = document.createElement("p");
        const dueImg = document.createElement("img");
        dueImg.classList.add("clockImg");
        dueImg.src = clock;
        const dueSpan = document.createElement("span");

        let dueText;
        let adjustedDate = new Date(this.task.dueDate);
        adjustedDate.setMinutes(
          adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
        );

        if (isToday(adjustedDate)) {
          dueText = "Today";
        } else if (isTomorrow(adjustedDate)) {
          dueText = "Tomorrow";
        } else if (isPast(adjustedDate)) {
          dueText = "Past Due";
          dueP.style.color = "firebrick";
        } else {
          dueText = this.task.dueDate;
        }

        dueSpan.textContent = dueText;

        dueP.append(dueImg);
        dueP.append(dueSpan);
        bottomRow.append(dueP);
      }

      if (this.task.project) {
        const projectP = document.createElement("p");
        const projectImg = document.createElement("img");
        projectImg.classList.add("projectImg");
        projectImg.src = project;
        const projectSpan = document.createElement("span");
        projectSpan.textContent = this.task.project;
        projectP.append(projectImg);
        projectP.append(projectSpan);
        bottomRow.append(projectP);
      }

      if (this.task.description) {
        const descriptionImg = document.createElement("img");
        descriptionImg.classList.add("noteImg");
        descriptionImg.src = note;
        descriptionImg.dataset.id = this.task.id;
        bottomRow.append(descriptionImg);
      }

      taskContainer.append(bottomRow);
    }

    if (this.task.completed) {
      taskContainer.classList.add("task-completed");
      toggleButton.textContent = "X";
    } else {
      taskContainer.classList.remove("task-completed");
    }

    return taskContainer;
  }
}
