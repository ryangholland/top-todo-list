import TaskDisplay from "../components/TaskDisplay";
import ProjectDisplay from "../components/ProjectDisplay";
import { differenceInCalendarDays } from "date-fns";
import { saveList } from "../utils/storage";
import { getAdjustedDate } from "../utils/dates";

const addTaskBtn = document.getElementById("add-task");
const addTaskModal = document.getElementById("add-task-modal");
const addTaskModalHeading = document.getElementById("add-task-modal-heading");
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
const editDeleteProjContainer = document.getElementById(
  "edit-delete-project-container"
);
const activeTasks = document.getElementById("active-tasks");
const editProjectBtn = document.getElementById("edit-project-btn");
const editProjectModal = document.getElementById("edit-project-modal");
const cancelEditProjectBtn = document.getElementById("cancel-edit-project");
const deleteProjectBtn = document.getElementById("delete-project-btn");
const deleteProjectModal = document.getElementById("delete-project-modal");
const cancelDeleteProjectBtn = document.getElementById("cancel-delete-project");

const loadUiEvents = (myList) => {
  // Open "Add Task" modal
  addTaskBtn.addEventListener("click", () => {
    addTaskModalHeading.textContent = "Add Task:";
    addTaskModal.showModal();
  });

  // Open "Add Task" modal in edit mode
  activeTasks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("pencil-btn")) return;

    myList.openTask = myList.getTaskById(e.target.dataset.id);

    const taskTitleInput = document.getElementById("taskTitle");
    const taskProjectInput = document.getElementById("taskProject");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const descriptionInput = document.getElementById("description");

    taskTitleInput.value = myList.openTask.title;
    taskProjectInput.value = myList.openTask.project;
    dueDateInput.value = myList.openTask.dueDate;
    priorityInput.value = myList.openTask.priority;
    descriptionInput.value = myList.openTask.description;

    addTaskModalHeading.textContent = "Edit Task:";

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
    shadeScreenName(e.target.textContent.trim());

    // if screen ISN'T Inbox/Today/This Week, edit/delete buttons visible
    if (
      e.target.textContent.trim() == "Inbox" ||
      e.target.textContent.trim() == "Today" ||
      e.target.textContent.trim() == "This Week"
    ) {
      editDeleteProjContainer.classList.add("hidden");
    } else {
      editDeleteProjContainer.classList.remove("hidden");
    }

    changeScreen(myList, e.target.textContent.trim());
  });

  // Open "Edit Project" modal
  editProjectBtn.addEventListener("click", () => {
    const projectTitleInput = document.getElementById("projectTitle");
    projectTitleInput.value = myList.screen;
    myList.openProject = projectTitleInput.value;
    editProjectModal.showModal();
  });

  // Cancel "Edit Project" modal
  cancelEditProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editProjectModal.close();
  });

  // Open "Delete Project" modal
  deleteProjectBtn.addEventListener("click", () => {
    const deleteProjectSpan = document.getElementById("delete-project-name");
    deleteProjectSpan.textContent = myList.screen;
    myList.openProject = myList.screen;
    deleteProjectModal.showModal();
  });

  // Cancel "Delete Project" modal
  cancelDeleteProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteProjectModal.close();
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
      if (
        getAdjustedDate(task.dueDate) === "Today" ||
        getAdjustedDate(task.dueDate) === "Past Due"
      ) {
        renderTask(task);
      }
    } else if (list.screen == "This Week") {
      const today = new Date();
      const diffInDays = differenceInCalendarDays(task.dueDate, today);
      if (diffInDays <= 7) renderTask(task);
    } else {
      if (task.project == list.screen) renderTask(task);
    }
  });

  if (contentDiv.innerHTML == "") {
    const nothingHereP = document.createElement("p");
    nothingHereP.classList.add("nothing-here");
    nothingHereP.textContent = "No Tasks to Display";
    contentDiv.appendChild(nothingHereP);
  }
}

function renderProjects(list) {
  const projectDiv = document.getElementById("project-list");
  projectDiv.innerHTML = "";
  list.projects.forEach((project) => {
    const projectDisplay = new ProjectDisplay(project);
    projectDiv.append(projectDisplay.render());
  });

  resetProjectDropdown(list);
}

function resetProjectDropdown(list) {
  const selectElement = document.getElementById("taskProject");
  selectElement.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "N/A (Inbox)";
  selectElement.add(defaultOption);
  list.projects.forEach((project) => {
    const newOption = document.createElement("option");
    newOption.value = project.title;
    newOption.text = project.title;
    selectElement.add(newOption);
  });
}

function changeScreen(list, newScreen) {
  list.updateScreen(newScreen);
  screenTitle.textContent = newScreen;
  renderTasks(list);
  saveList(list);
}

function shadeScreenName(title) {
  const screenSelectors = document.querySelectorAll(".screen-selector");
  screenSelectors.forEach((selector) => {
    selector.classList.remove("screen-selected");
    if (selector.textContent.trim() == title) {
      selector.classList.add("screen-selected");
    }
  });
}

export default loadUiEvents;
export {
  closeAddTaskForm,
  closeQuickAddTask,
  closeAddProject,
  renderTasks,
  renderProjects,
  shadeScreenName,
  changeScreen,
};
