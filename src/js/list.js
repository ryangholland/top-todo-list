import loadImages from "./images";

class List {
  constructor() {
    this.todos = [];
    this.projects = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  addProject(project) {
    this.projects.push(project);
  }

  renderTodos() {
    const contentDiv = document.getElementById("active-todos");
    contentDiv.innerHTML = "";
    this.todos.forEach((todo) => {
      const todoElement = todo.render();
      contentDiv.append(todoElement);
    });
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
