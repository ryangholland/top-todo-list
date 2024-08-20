import TaskDisplay from "../components/TaskDisplay";
import ProjectDisplay from "../components/ProjectDisplay";

const addTaskBtn = document.getElementById("add-task");
const addTaskModal = document.getElementById("add-task-modal");
const cancelAddTaskBtn = document.getElementById("cancel-add-task");
const addTaskForm = document.getElementById("add-task-form");
const quickAddTaskBtn = document.getElementById("quick-add-task");
const quickAddTaskContainer = document.getElementById(
  "quick-add-task-container"
);
const quickAddTaskInput = document.getElementById("quick-add-task-input");
const addProjectBtn = document.getElementById("add-project");
const newProjectContainer = document.getElementById("new-project-container");
const newProjectInput = document.getElementById("new-project-input");
const sidebar = document.querySelector(".sidebar");
const screenTitle = document.getElementById("screen-title");
const screenSelectors = document.querySelectorAll(".screen-selector");

const loadUiEvents = (myList) => {
  // Open "Add Task" modal
  addTaskBtn.addEventListener("click", () => {
    addTaskModal.showModal();
  });

  // Cancel "Add Task" modal
  cancelAddTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeAddTaskForm();
  });

  // Open "Quick Add Task" input
  quickAddTaskBtn.addEventListener("click", () => {
    quickAddTaskBtn.classList.add("hidden");
    quickAddTaskContainer.classList.remove("hidden");
    quickAddTaskInput.focus();
  });

  // Cancel "Quick Add Task"
  quickAddTaskInput.addEventListener("blur", () => {
    closeQuickAddTask();
  });

  // Open "Add Project" input
  addProjectBtn.addEventListener("click", () => {
    addProjectBtn.classList.add("hidden");
    newProjectContainer.classList.remove("hidden");
    newProjectInput.focus();
  });

  // Cancel "Add Project"
  newProjectInput.addEventListener("blur", () => {
    closeAddProject();
  });

  // Select screen
  sidebar.addEventListener("click", (e) => {
    if (!e.target.classList.contains("screen-selector")) return;
    screenSelectors.forEach((selector) =>
      selector.classList.remove("screen-selected")
    );
    e.target.classList.add("screen-selected");
    screenTitle.textContent = e.target.textContent;
    changeScreen(myList, e.target.textContent.trim());
  });
};

function closeAddTaskForm() {
  addTaskModal.close();
  addTaskForm.reset();
}

function closeQuickAddTask() {
  quickAddTaskInput.value = "";
  quickAddTaskBtn.classList.remove("hidden");
  quickAddTaskContainer.classList.add("hidden");
}

function closeAddProject() {
  newProjectInput.value = "";
  addProjectBtn.classList.remove("hidden");
  newProjectContainer.classList.add("hidden");
}

function renderTasks(list) {
  const contentDiv = document.getElementById("active-tasks");
  contentDiv.innerHTML = "";

  function renderTask(task) {
    const taskDisplay = new TaskDisplay(task);
    contentDiv.appendChild(taskDisplay.render());
  }

  list.tasks.forEach((task) => {
    if (list.screen == "Inbox") {
      if (task.project == "") renderTask(task);
    } else if (list.screen == "Today") {
      renderTask(task);
    } else if (list.screen == "This Week") {
      renderTask(task);
    } else {
      if (task.project == list.screen) renderTask(task);
    }
  });
}

function renderProjects(list) {
  const projectDiv = document.getElementById("project-list");
  projectDiv.innerHTML = "";
  list.projects.forEach((project) => {
    const projectDisplay = new ProjectDisplay(project);
    projectDiv.append(projectDisplay.render());
  });
}

function changeScreen(list, newScreen) {
  list.updateScreen(newScreen);
  renderTasks(list);
}

export default loadUiEvents;
export {
  closeAddTaskForm,
  closeQuickAddTask,
  closeAddProject,
  renderTasks,
  renderProjects,
};
