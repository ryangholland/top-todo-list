import "../css/style.css";
import logo from "../assets/format-list-checks.svg";
import inbox from "../assets/inbox.svg";
import today from "../assets/calendar-today.svg";
import week from "../assets/calendar-week.svg";
import plus from "../assets/plus.svg"

import Todo from "./todo";
import Project from "./project";
import List from "./list";

const logoImg = document.getElementById("logoImg");
logoImg.src = logo;
const inboxImg = document.getElementById("inboxImg");
inboxImg.src = inbox;
const todayImg = document.getElementById("todayImg");
todayImg.src = today;
const weekImg = document.getElementById("weekImg");
weekImg.src = week;
const plusImgs = document.querySelectorAll(".plusImg");
plusImgs.forEach(plusImg => {
  plusImg.src = plus;
})

const myList = new List();

const testProject = new Project("Chores");
myList.addProject(testProject);

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
});

myList.renderTodos();
