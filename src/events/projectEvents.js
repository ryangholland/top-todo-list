import Project from "../models/Project";
import { renderProjects } from "./uiEvents";
import { closeAddProject } from "./uiEvents";
import { shadeScreenName } from "./uiEvents";
import { changeScreen } from "./uiEvents";
import { saveList } from "../utils/storage";

const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");
const editProjectModal = document.getElementById("edit-project-modal");
const deleteProjectModal = document.getElementById("delete-project-modal");

const loadProjectEvents = (myList) => {
  // Add Project
  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (newProjectInput.value.trim() !== "") {
      const newProject = new Project(newProjectInput.value);
      myList.addProject(newProject);
      renderProjects(myList);
      saveList(myList);
    }

    closeAddProject();
  });

  // Edit Project
  editProjectModal.addEventListener("submit", (e) => {
    e.preventDefault();

    let currentProject = myList.projects.find(
      (project) => project.title === myList.openProject
    );

    const projectTitleInput = document.getElementById("projectTitle");
    currentProject.title = projectTitleInput.value;

    const screenTitle = document.getElementById("screen-title");
    screenTitle.textContent = currentProject.title;

    myList.updateScreen(currentProject.title);
    renderProjects(myList);
    shadeScreenName(currentProject.title);
    saveList(myList);
    editProjectModal.close();
  });

  // Delete Project
  deleteProjectModal.addEventListener("submit", (e) => {
    e.preventDefault();
    const deleteProjectTasksCheckbox = document.getElementById(
      "delete-project-tasks"
    );

    myList.projects = myList.projects.filter(
      (project) => project.title !== myList.openProject
    );

    // If box checked, delete all applicable tasks
    // If box unchecked, change applicable tasks to "Inbox"
    if (deleteProjectTasksCheckbox.checked) {
      myList.tasks = myList.tasks.filter(
        (task) => task.project !== myList.openProject
      );
    } else {
      myList.tasks.forEach((task) => {
        if (task.project == myList.openProject) task.project = "";
      });
    }

    myList.openProject = null;
    myList.updateScreen("Inbox");
    changeScreen(myList, "Inbox");
    shadeScreenName("Inbox");
    renderProjects(myList);
    saveList(myList);
    deleteProjectModal.close();
    deleteProjectTasksCheckbox.checked = true;
  });
};

export default loadProjectEvents;
