import List from "./models/List";
import Task from "./models/Task";
import Project from "./models/Project";
import TaskDisplay from "./components/TaskDisplay";
import ProjectDisplay from "./components/ProjectDisplay";
import loadStaticImages from "./events/staticImages";
import loadTaskEvents from "./events/taskEvents";
import loadProjectEvents from "./events/projectEvents";
import loadScreenEvents from "./events/screenEvents";
import loadUiEvents from "./events/uiEvents";

const myList = new List();
const exampleProjectOne = new Project("Test Project");
const exampleTaskOne = new Task("Test Task 1", "Test Project");
const exampleTaskTwo = new Task("Test Task 2");
myList.addTask(exampleTaskOne);
myList.addTask(exampleTaskTwo);
myList.addProject(exampleProjectOne);

// UI event?
function renderTasks() {
  const contentDiv = document.getElementById("active-tasks");
  contentDiv.innerHTML = "";

  function renderTask(task) {
    const taskDisplay = new TaskDisplay(
      task,
    );

    contentDiv.appendChild(taskDisplay.render());
  }

  myList.tasks.forEach((task) => {
    if (myList.screen == "Inbox") {
      if (task.project == "") renderTask(task);
    } else if (myList.screen == "Today") {
      renderTask(task);
    } else if (myList.screen == "This Week") {
      renderTask(task);
    } else {
      if (task.project == myList.screen) renderTask(task);
    }
  });
}

// UI event?
function renderProjects() {
  const projectDiv = document.getElementById("project-list");
  projectDiv.innerHTML = "";
  myList.projects.forEach((project) => {
    const projectDisplay = new ProjectDisplay(project);
    projectDiv.append(projectDisplay.render());
  });
}

// UI event
function changeScreen(newScreen) {
  myList.updateScreen(newScreen);
  renderTasks();
}

function init() {
  loadStaticImages();
  loadUiEvents();
  loadTaskEvents(myList);
  loadProjectEvents(myList);
  loadScreenEvents(myList);
  renderTasks();
  renderProjects();
}

export default init;
export { renderTasks, renderProjects, changeScreen };
