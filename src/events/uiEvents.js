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

const loadUiEvents = () => {
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

export default loadUiEvents;
export { closeAddTaskForm, closeQuickAddTask, closeAddProject };
