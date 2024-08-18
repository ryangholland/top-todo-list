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
    this.updateProjectChoices(newProject)
  }

  updateProjectChoices(newProject) {
    const selectElement = document.getElementById("taskProject");
    const newOption = document.createElement("option");
    newOption.value = newProject.title;
    newOption.text = newProject.title;
    selectElement.add(newOption);
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
