import Task from "../models/Task";
import { renderTasks } from "./uiEvents";
import { closeAddTaskForm, closeQuickAddTask, clo } from "./uiEvents";
import { saveList } from "../utils/storage";

const activeTasks = document.getElementById("active-tasks");
const addTaskModal = document.getElementById("add-task-modal");
const quickAddTaskInput = document.getElementById("quick-add-task-input");
const quickAddTaskForm = document.getElementById("quick-add-task-form");
const notesModal = document.getElementById("notes-modal");
const notesInput = document.getElementById("notes")

const loadTaskEvents = (myList) => {
  // Toggle tasks complete
  activeTasks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-btn")) return;
    const selectedTask = myList.getTaskById(e.target.dataset.id);
    myList.completeTask(selectedTask)
    renderTasks(myList);
    saveList(myList);
  });

  // Delete task
  activeTasks.addEventListener("click", (e) => {
    if (!e.target.classList.contains("trash-btn")) return;
    myList.deleteTask(e.target.dataset.id);
    renderTasks(myList);
    saveList(myList);
  });

  // Add task
  addTaskModal.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitleInput = document.getElementById("taskTitle");
    const taskProjectInput = document.getElementById("taskProject");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const descriptionInput = document.getElementById("description");

    if (myList.openTask) {
      myList.openTask.title = taskTitleInput.value;
      myList.openTask.project = taskProjectInput.value;
      myList.openTask.dueDate = dueDateInput.value;
      myList.openTask.priority = priorityInput.value;
      myList.openTask.description = descriptionInput.value;
      myList.openTask = null;
    } else if (taskTitleInput.value.trim() !== "") {
      const newTask = new Task(
        taskTitleInput.value,
        taskProjectInput.value,
        dueDateInput.value,
        priorityInput.value,
        descriptionInput.value
      );
      myList.addTask(newTask);
    }

    renderTasks(myList);
    closeAddTaskForm();
    saveList(myList);
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
      saveList(myList);
    }

    closeQuickAddTask();
  });

  // Edit notes
  notesModal.addEventListener("submit", (e) => {
    e.preventDefault();

    myList.openTask.description = notesInput.value;
    myList.openTask = null;

    renderTasks(myList);
    notesModal.close();
    saveList(myList);
  })
};

export default loadTaskEvents;
