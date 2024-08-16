export default class Task {
  constructor(
    title,
    project = null,
    dueDate = null,
    priority = "low",
    description = null
  ) {
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }

  updateDueDate(newDate) {
    this.dueDate = newDate;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateProject(newProject) {
    this.project = newProject;
  }
}
