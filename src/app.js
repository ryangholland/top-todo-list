import List from "./models/List";
import Task from "./models/Task";
import Project from "./models/Project";
import TaskDisplay from "./components/TaskDisplay";
import ProjectDisplay from "./components/ProjectDisplay";
import loadStaticImages from "./events/staticImages";
import loadTaskEvents from "./events/taskEvents";
import loadProjectEvents from "./events/projectEvents";
import loadScreenEvents from "./events/screenEvents";

const myList = new List();
const exampleProjectOne = new Project("Test Project")
const exampleTaskOne = new Task("Test Task 1", "Test Project")
const exampleTaskTwo = new Task("Test Task 2")
myList.addTask(exampleTaskOne)
myList.addTask(exampleTaskTwo)
myList.addProject(exampleProjectOne)

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
  loadScreenEvents();
  renderTasks();
  renderProjects();
}

export default init;
export { renderTasks, renderProjects };
