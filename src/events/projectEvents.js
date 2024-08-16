import Project from "../models/Project"
import { renderProjects } from "../app";

const addProjectBtn = document.getElementById("add-project");
const newProjectContainer = document.getElementById("new-project-container");
const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");

const loadProjectEvents = (myList) => {
  addProjectBtn.addEventListener("click", () => {
    addProjectBtn.classList.add("hidden");
    newProjectContainer.classList.remove("hidden");
    newProjectInput.focus();
  });

  newProjectInput.addEventListener("blur", () => {
    newProjectInput.value = "";
    addProjectBtn.classList.remove("hidden");
    newProjectContainer.classList.add("hidden");
  });

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (newProjectInput.value.trim() !== "") {
      const newProject = new Project(newProjectInput.value);
      myList.addProject(newProject);
      renderProjects();
    }

    newProjectInput.value = "";
    addProjectBtn.classList.remove("hidden");
    newProjectContainer.classList.add("hidden");
  });
};

export default loadProjectEvents;
