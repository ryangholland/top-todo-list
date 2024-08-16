import project from "../assets/list-box-outline.svg";
import highPrio from "../assets/high-prio.svg";
import medPrio from "../assets/med-prio.svg";
import note from "../assets/note-text.svg";
import clock from "../assets/calendar-clock.svg";
import trash from "../assets/delete.svg";

export default class TaskDisplay {
  constructor(task, handleDelete, handleToggle) {
    this.task = task;
    this.handleDelete = handleDelete;
    this.handleToggle = handleToggle;
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

    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox");
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    const checkboxSpan = document.createElement("span");
    checkboxSpan.classList.add("filled");

    checkboxLabel.append(checkboxInput);
    checkboxLabel.append(checkboxSpan);

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = this.task.title;

    topLeft.append(checkboxLabel);
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
    const trashImg = document.createElement("img");
    trashImg.classList.add("trashImg");
    trashImg.src = trash;

    topRight.append(trashImg);
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
        dueSpan.textContent = this.task.dueDate;
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
        bottomRow.append(descriptionImg);
      }

      taskContainer.append(bottomRow);
    }

    // Event Listeners
    checkboxInput.addEventListener("change", () => {
      if (checkboxInput.checked) {
        taskContainer.classList.add("task-completed");
      } else {
        taskContainer.classList.remove("task-completed");
      }
      this.handleToggle(this.task.id);
    });

    trashImg.addEventListener("click", () => {
      this.handleDelete(this.task.id);
    });

    return taskContainer;
  }
}
