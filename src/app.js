import List from "./models/List";
import Task from "./models/Task";
import Project from "./models/Project";
import loadStaticImages from "./events/imageEvents";
import loadTaskEvents from "./events/taskEvents";
import loadProjectEvents from "./events/projectEvents";
import loadUiEvents from "./events/uiEvents";
import { renderTasks, renderProjects } from "./events/uiEvents";
import { loadList } from "./utils/storage";

function init() {
  let myList;
  if (loadList()) {
    console.log("Loading saved list...");
    myList = loadList();
  } else {
    console.log("Creating new list...");
    myList = new List();
    const exampleProjectOne = new Project("Test Project");
    const exampleTaskOne = new Task("Test Task 1", "Test Project");
    const exampleTaskTwo = new Task("Test Task 2");
    myList.addTask(exampleTaskOne);
    myList.addTask(exampleTaskTwo);
    myList.addProject(exampleProjectOne);
  }

  loadStaticImages();
  loadUiEvents(myList);
  loadTaskEvents(myList);
  loadProjectEvents(myList);
  renderTasks(myList);
  renderProjects(myList);
}

export default init;
