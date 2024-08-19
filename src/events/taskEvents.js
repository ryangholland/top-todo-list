import Task from "../models/Task";
import { renderTasks } from "../app";

const activeTasks = document.getElementById("active-tasks");
const addTaskBtn = document.getElementById("add-task");
const addTaskModal = document.getElementById("add-task-modal");
const cancelAddTaskBtn = document.getElementById("cancel-add-task");
const addTaskForm = document.getElementById("add-task-form");
const quickAddTaskBtn = document.getElementById("quick-add-task");
const quickAddTaskContainer = document.getElementById(
  "quick-add-task-container"
);
const quickAddTaskInput = document.getElementById("quick-add-task-input");
const quickAddTaskForm = document.getElementById("quick-add-task-form");

const loadTaskEvents = (myList) => {
  // Toggle tasks complete
  activeTasks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-btn")) return;
    const selectedTask = myList.getTaskById(e.target.dataset.id)
    selectedTask.toggleCompleted();
    renderTasks();
  })

  // Delete task

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
      renderTasks();
    }

    addTaskModal.close();
    addTaskForm.reset();
  });

  cancelAddTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTaskModal.close();
    addTaskForm.reset();
  });

  quickAddTaskBtn.addEventListener("click", () => {
    quickAddTaskBtn.classList.add("hidden");
    quickAddTaskContainer.classList.remove("hidden");
    quickAddTaskInput.focus();
  });

  quickAddTaskInput.addEventListener("blur", () => {
    quickAddTaskInput.value = "";
    quickAddTaskBtn.classList.remove("hidden");
    quickAddTaskContainer.classList.add("hidden");
  });

  quickAddTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (quickAddTaskInput.value.trim() !== "") {
      const activeScreen = myList.screen;
      let proj = "";
      if (
        activeScreen !== "Inbox" &&
        activeScreen !== "This Week" &&
        activeScreen !== "Today"
      ) {
        proj = activeScreen;
      }

      const newTask = new Task(quickAddTaskInput.value, proj);
      myList.addTask(newTask);
      renderTasks();
    }

    quickAddTaskInput.value = "";
    quickAddTaskBtn.classList.remove("hidden");
    quickAddTaskContainer.classList.add("hidden");
  });
};

export default loadTaskEvents;
