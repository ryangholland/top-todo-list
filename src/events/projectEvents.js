import Project from "../models/Project";
import { renderProjects } from "./uiEvents";
import { closeAddProject } from "./uiEvents";

const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");

const loadProjectEvents = (myList) => {
  // Add Project
  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (newProjectInput.value.trim() !== "") {
      const newProject = new Project(newProjectInput.value);
      myList.addProject(newProject);
      renderProjects(myList);
    }

    closeAddProject();
  });
};

export default loadProjectEvents;
