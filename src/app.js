import List from "./models/List";
import TaskDisplay from "./components/TaskDisplay";
import ProjectDisplay from "./components/ProjectDisplay";
import loadStaticImages from "./events/staticImages";
import loadTaskEvents from "./events/taskEvents";
import loadProjectEvents from "./events/projectEvents";

const myList = new List();

function handleDeleteTask(taskId) {
  myList.deleteTask(taskId);
  renderTasks();
}

function handleToggleCompleted(taskId) {
  const task = myList.getTaskById(taskId);
  task.toggleCompleted();
  renderTasks();
}

function renderTasks() {
  const contentDiv = document.getElementById("active-tasks");
  contentDiv.innerHTML = "";

  myList.tasks.forEach((task) => {
    const taskDisplay = new TaskDisplay(
      task,
      handleDeleteTask,
      handleToggleCompleted
    );
    contentDiv.appendChild(taskDisplay.render());
  });
}

function renderProjects() {
  const projectDiv = document.getElementById("project-list");
  projectDiv.innerHTML = "";
  myList.projects.forEach((project) => {
    const projectDisplay = new ProjectDisplay(project);
    projectDiv.append(projectDisplay.render());
  });
}

function init() {
  loadStaticImages();
  loadTaskEvents(myList);
  loadProjectEvents(myList);
  renderTasks();
  renderProjects();
}

export default init;
export { renderTasks, renderProjects };
