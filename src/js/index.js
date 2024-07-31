import Todo from "./todo";
import Project from "./project";


const myList = {
  todos: [],
  projects: [],
};

const testTodo = new Todo(
  "Test",
  "This is a test todo item",
  "tomorrow",
  "high",
);

myList.todos.push(testTodo);

console.log(myList);