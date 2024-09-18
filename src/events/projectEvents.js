import Project from "../models/Project";
import { renderProjects } from "./uiEvents";
import { closeAddProject } from "./uiEvents";
import { saveList } from "../utils/storage";

const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");
const editProjectModal = document.getElementById("edit-project-modal");

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
      (project) => project.title === myList.screen
    );

    const projectTitleInput = document.getElementById("projectTitle");
    currentProject.title = projectTitleInput.value;

    const screenTitle = document.getElementById("screen-title");
    screenTitle.textContent = currentProject.title;

    renderProjects(myList);
    saveList(myList);
    editProjectModal.close();
  });
};

export default loadProjectEvents;
