import Task from "./task";
import Project from "./project";

const addProjectBtn = document.getElementById("add-project");
const newProjectContainer = document.getElementById("new-project-container");
const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");
const addTaskBtn = document.getElementById("add-task");
const addTaskModal = document.getElementById("add-task-modal");

const loadEventListeners = (myList) => {
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

  addTaskBtn.addEventListener("click", () => {
    addTaskModal.showModal();
  });
};

export default loadEventListeners;