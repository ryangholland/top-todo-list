import "../css/style.css";
import loadImages from "./images";

import Todo from "./todo";
import Project from "./project";
import List from "./list";

const myList = new List();
loadImages();

const addProjectBtn = document.getElementById("add-project");
const newProjectContainer = document.getElementById("new-project-container");
const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");

addProjectBtn.addEventListener("click", () => {
  addProjectBtn.classList.add("hidden");
  newProjectContainer.classList.remove("hidden");
  newProjectInput.focus();
});

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (newProjectInput.value.trim() !== "") {
    const newProject = new Project(newProjectInput.value);
    myList.addProject(newProject);
    myList.renderProjects();
  }

  newProjectInput.value = "";
  addProjectBtn.classList.remove("hidden");
  newProjectContainer.classList.add("hidden");
});
