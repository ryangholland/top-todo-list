import TaskDisplay from "../components/TaskDisplay";
import ProjectDisplay from "../components/ProjectDisplay";
import { differenceInCalendarDays } from "date-fns";
import { saveList } from "../utils/storage";
import { getAdjustedDate } from "../utils/dates";

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

const activeTasks = document.getElementById("active-tasks");

const loadUiEvents = (myList) => {
  // Open "Add Task" modal
  addTaskBtn.addEventListener("click", () => {
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
    const screenSelectors = document.querySelectorAll(".screen-selector");
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
      console.log("beep");
      if (
        getAdjustedDate(task.dueDate) === "Today" ||
        getAdjustedDate(task.dueDate) === "Past Due"
      ) {
        console.log("boop");
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
}

function renderProjects(list) {
  const projectDiv = document.getElementById("project-list");
  projectDiv.innerHTML = "";
  list.projects.forEach((project) => {
    const projectDisplay = new ProjectDisplay(project);
    projectDiv.append(projectDisplay.render());
  });

  const selectElement = document.getElementById("taskProject");
  list.projects.forEach((project) => {
    const newOption = document.createElement("option");
    newOption.value = project.title;
    newOption.text = project.title;
    selectElement.add(newOption);
  });
}

function changeScreen(list, newScreen) {
  list.updateScreen(newScreen);
  renderTasks(list);
  saveList(list);
}

export default loadUiEvents;
export {
  closeAddTaskForm,
  closeQuickAddTask,
  closeAddProject,
  renderTasks,
  renderProjects,
};
