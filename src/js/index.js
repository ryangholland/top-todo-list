import '../css/style.css'

import Todo from "./todo";
import Project from "./project";
import List from "./list";

const myList = new List();

const testProject = new Project("Chores")
myList.addProject(testProject)

const testBtn = document.getElementById("test-task");
testBtn.addEventListener("click", () => {
  const testTodo = new Todo(
    "Test Task",
    "This is a test todo item",
    "tomorrow",
    "high",
    testProject
  );
  myList.addTodo(testTodo);
  myList.renderTodos();
})

myList.renderTodos();
