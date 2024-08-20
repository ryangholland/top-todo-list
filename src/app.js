import List from "./models/List";
import Task from "./models/Task";
import Project from "./models/Project";
import TaskDisplay from "./components/TaskDisplay";
import ProjectDisplay from "./components/ProjectDisplay";
import loadStaticImages from "./events/staticImages";
import loadTaskEvents from "./events/taskEvents";
import loadProjectEvents from "./events/projectEvents";
import loadUiEvents from "./events/uiEvents";
import { renderTasks } from "./events/uiEvents";

const myList = new List();
const exampleProjectOne = new Project("Test Project");
const exampleTaskOne = new Task("Test Task 1", "Test Project");
const exampleTaskTwo = new Task("Test Task 2");
myList.addTask(exampleTaskOne);
myList.addTask(exampleTaskTwo);
myList.addProject(exampleProjectOne);

// UI event?
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
  loadUiEvents(myList);
  loadTaskEvents(myList);
  loadProjectEvents(myList);
  renderTasks(myList);
  renderProjects();
}

export default init;
export { renderProjects };
