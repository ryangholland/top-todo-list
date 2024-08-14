import loadImages from "./images";

class List {
  constructor() {
    this.tasks = [];
    this.projects = [];
  }

  addTask(task) {
    this.tasks.push(task);
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
