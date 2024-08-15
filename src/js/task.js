class Task {
  constructor(
    list,
    title,
    project = "inbox",
    dueDate = null,
    priority = "low",
    description = null
  ) {
    (this.list = list), (this.title = title);
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = false;
  }

  render() {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const topRow = document.createElement("div");
    topRow.classList.add("flex-row");
    topRow.classList.add("task-row");

    const topLeft = document.createElement("div");
    topLeft.classList.add("flex-row");

    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("custom-checkbox");
    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    const checkboxSpan = document.createElement("span");
    checkboxSpan.classList.add("filled");

    checkboxInput.addEventListener("change", () => {
      if (checkboxInput.checked) {
        taskContainer.classList.add("task-completed");
        this.completed = true;
      } else {
        taskContainer.classList.remove("task-completed");
        this.completed = false;
      }
    });

    checkboxLabel.append(checkboxInput);
    checkboxLabel.append(checkboxSpan);

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = this.title;

    topLeft.append(checkboxLabel);
    topLeft.append(taskTitle);

    if (this.priority !== "low") {
      const prioImg = document.createElement("img");
      const prioClass =
        this.priority == "medium" ? "medPrioImg" : "highPrioImg";
      prioImg.classList.add(prioClass);
      topLeft.append(prioImg);
    }

    topRow.append(topLeft);

    const topRight = document.createElement("div");
    const trashImg = document.createElement("img");
    trashImg.classList.add("trashImg");

    trashImg.addEventListener("click", () => {
      this.list.deleteTask(this);
      taskContainer.remove();
    });

    topRight.append(trashImg);
    topRow.append(topRight);
    taskContainer.append(topRow);

    if (this.dueDate || this.project || this.description) {
      const bottomRow = document.createElement("div");
      bottomRow.classList.add("flex-row");
      bottomRow.classList.add("task-details-row");

      if (this.dueDate) {
        const dueP = document.createElement("p");
        const dueImg = document.createElement("img");
        dueImg.classList.add("clockImg");
        const dueSpan = document.createElement("span");
        dueSpan.textContent = this.dueDate;
        dueP.append(dueImg);
        dueP.append(dueSpan);
        bottomRow.append(dueP);
      }

      if (this.project !== "inbox") {
        const projectP = document.createElement("p");
        const projectImg = document.createElement("img");
        projectImg.classList.add("projectImg");
        const projectSpan = document.createElement("span");
        projectSpan.textContent = this.project;
        projectP.append(projectImg);
        projectP.append(projectSpan);
        bottomRow.append(projectP);
      }

      if (this.description) {
        const descriptionImg = document.createElement("img");
        descriptionImg.classList.add("noteImg");
        bottomRow.append(descriptionImg);
      }

      taskContainer.append(bottomRow);
    }

    return taskContainer;
  }
}

export default Task;
