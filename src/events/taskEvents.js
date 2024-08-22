import Task from "../models/Task";
import { renderTasks } from "./uiEvents";
import { closeAddTaskForm, closeQuickAddTask } from "./uiEvents";

const activeTasks = document.getElementById("active-tasks");
const addTaskModal = document.getElementById("add-task-modal");
const quickAddTaskInput = document.getElementById("quick-add-task-input");
const quickAddTaskForm = document.getElementById("quick-add-task-form");

const loadTaskEvents = (myList) => {
  // Toggle tasks complete
  activeTasks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-btn")) return;
    const selectedTask = myList.getTaskById(e.target.dataset.id);
    selectedTask.toggleCompleted();
    renderTasks();
  });

  // Delete task
  activeTasks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("trash-btn")) return;
    myList.deleteTask(e.target.dataset.id);
    renderTasks();
  });

  // Add task
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

    closeAddTaskForm();
  });

  // Quick add task
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
      renderTasks(myList);
    }

    closeQuickAddTask();
  });
};

export default loadTaskEvents;
