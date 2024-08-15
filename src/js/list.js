import loadImages from "./images";

class List {
  constructor() {
    this.tasks = [];
    this.projects = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  addProject(project) {
    this.projects.push(project);
  }

  renderTasks() {
    const contentDiv = document.getElementById("active-tasks");
    contentDiv.innerHTML = "";
    this.tasks.forEach((task) => {
      const taskElement = task.render();
      contentDiv.append(taskElement);
    });
    loadImages();
  }

  renderProjects() {
    const projectDiv = document.getElementById("project-list")
    projectDiv.innerHTML = "";
    this.projects.forEach((project) => {
      const projectElement = project.render();
      projectDiv.append(projectElement)
    })
    loadImages();
  }
}

export default List;
