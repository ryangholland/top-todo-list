export default class List {
  constructor() {
    this.tasks = [];
    this.projects = [];
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  addProject(newProject) {
    this.projects.push(newProject);
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
