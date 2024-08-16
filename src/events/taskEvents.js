import Task from "../models/Task"
import { renderTasks } from "../app";

const addTaskBtn = document.getElementById("add-task");
const addTaskModal = document.getElementById("add-task-modal");
const cancelAddTaskBtn = document.getElementById("cancel-add-task");
const addTaskForm = document.getElementById("add-task-form");

const loadTaskEvents = (myList) => {
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
};

export default loadTaskEvents;
