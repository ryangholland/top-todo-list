import "../css/index.css";
import loadImages from "./images";
import loadEventListeners from "./events";

import Task from "./task";
import Project from "./project";
import List from "./list";

const myList = new List();
loadImages();
loadEventListeners(myList);

