import logo from "../assets/format-list-checks.svg";
import inbox from "../assets/inbox.svg";
import today from "../assets/calendar-today.svg";
import week from "../assets/calendar-week.svg";
import plus from "../assets/plus.svg";
import project from "../assets/list-box-outline.svg";
import highPrio from "../assets/high-prio.svg";
import medPrio from "../assets/med-prio.svg";
import note from "../assets/note-text.svg";
import clock from "../assets/calendar-clock.svg";
import trash from "../assets/delete.svg";

const loadImages = () => {
  const logoImg = document.getElementById("logoImg");
  logoImg.src = logo;
  const inboxImg = document.getElementById("inboxImg");
  inboxImg.src = inbox;
  const todayImg = document.getElementById("todayImg");
  todayImg.src = today;
  const weekImg = document.getElementById("weekImg");
  weekImg.src = week;

  const plusImgs = document.querySelectorAll(".plusImg");
  plusImgs.forEach((plusImg) => {
    plusImg.src = plus;
  });

  const noteImgs = document.querySelectorAll(".noteImg");
  noteImgs.forEach((noteImg) => {
    noteImg.src = note;
  });

  const clockImgs = document.querySelectorAll(".clockImg");
  clockImgs.forEach((clockImg) => {
    clockImg.src = clock;
  });

  const projectImgs = document.querySelectorAll(".projectImg");
  projectImgs.forEach((projectImg) => {
    projectImg.src = project;
  });

  const highPrioImgs = document.querySelectorAll(".highPrioImg");
  highPrioImgs.forEach((highPrioImg) => {
    highPrioImg.src = highPrio;
  });

  const medPrioImgs = document.querySelectorAll(".medPrioImg");
  medPrioImgs.forEach((medPrioImg) => {
    medPrioImg.src = medPrio;
  });

  const trashImgs = document.querySelectorAll(".trashImg");
  trashImgs.forEach((trashImg) => {
    trashImg.src = trash;
  });
};

export default loadImages;
