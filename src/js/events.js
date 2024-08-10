import Task from "./task";
import Project from "./project";

const addProjectBtn = document.getElementById("add-project");
const newProjectContainer = document.getElementById("new-project-container");
const newProjectInput = document.getElementById("new-project-input");
const newProjectForm = document.getElementById("new-project-form");
const addTaskBtn = document.getElementById("add-task");
const addTaskModal = document.getElementById("add-task-modal");
const cancelAddTaskBtn = document.getElementById("cancel-add-task");
const addTaskForm = document.getElementById("add-task-form");

const loadEventListeners = (myList) => {
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
      myList.renderProjects();
    }

    newProjectInput.value = "";
    addProjectBtn.classList.remove("hidden");
    newProjectContainer.classList.add("hidden");
  });

  addTaskBtn.addEventListener("click", () => {
    addTaskModal.showModal();
  });

  addTaskModal.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitleInput = document.getElementById("taskTitle");
    const taskProjectInput = document.getElementById("taskProject");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const descriptionInput = document.getElementById("description");

    if (taskTitleInput.value.trim() !== "") {
      const newTask = new Task(
        taskTitleInput.value,
        taskProjectInput.value,
        dueDateInput.value,
        priorityInput.value,
        descriptionInput.value
      );
      myList.addTask(newTask);
      myList.renderTasks();
    }

    addTaskModal.close();
    addTaskForm.reset();
  });

  cancelAddTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTaskModal.close();
    addTaskForm.reset();
  });
};

export default loadEventListeners;
