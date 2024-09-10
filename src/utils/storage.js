import List from "../models/List";

function saveList(list) {
  localStorage.setItem("savedList", JSON.stringify(list));
}

function loadList() {
  let loadedList = JSON.parse(localStorage.getItem("savedList"));
  if (loadedList) {
    const newList = new List();
    newList.tasks = loadedList.tasks;
    newList.projects = loadedList.projects;
    newList.screen = loadedList.screen;
    return newList;
  } else {
    return null;
  }
}

export { saveList, loadList };
