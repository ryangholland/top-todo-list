import { isToday, isTomorrow, isPast } from "date-fns";

export default class Task {
  constructor(
    title,
    project = "",
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

  getAdjustedDate() {
    let adjustedDate = new Date(this.dueDate);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
    );

    if (isToday(adjustedDate)) {
      return "Today";
    } else if (isTomorrow(adjustedDate)) {
      return "Tomorrow";
    } else if (isPast(adjustedDate)) {
      return "Past Due";
    } else {
      return this.dueDate;
    }
  }
}
