class Task {
  constructor(
    title,
    project = null,
    dueDate = null,
    priority = "low",
    description = ""
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  render() {
    const container = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = this.title;
    container.append(title);

    return container;
  }
}

export default Task;
