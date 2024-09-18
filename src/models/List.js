export default class List {
  constructor() {
    this.tasks = [];
    this.projects = [];
    this.screen = "Inbox";
    this.openTask = null;
    this.openProject = null;
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  addProject(newProject) {
    this.projects.push(newProject);
    this.updateProjectChoices(newProject);
  }

  updateProjectChoices(newProject) {
    const selectElement = document.getElementById("taskProject");
    const newOption = document.createElement("option");
    newOption.value = newProject.title;
    newOption.text = newProject.title;
    selectElement.add(newOption);
  }

  updateScreen(newScreen) {
    this.screen = newScreen;
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
