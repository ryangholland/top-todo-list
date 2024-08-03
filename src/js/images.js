import logo from "../assets/format-list-checks.svg";
import inbox from "../assets/inbox.svg";
import today from "../assets/calendar-today.svg";
import week from "../assets/calendar-week.svg";
import plus from "../assets/plus.svg";
import project from "../assets/list-box-outline.svg";
import highPrio from "../assets/high-prio.svg";
import medPrio from "../assets/med-prio.svg";

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

  const projectImgs = document.querySelectorAll(".projectImg")
  projectImgs.forEach((projectImg) => {
    projectImg.src = project;
  })

  const highPrioImgs = document.querySelectorAll(".highPrioImg")
  highPrioImgs.forEach((highPrioImg) => {
    highPrioImg.src = highPrio
  })

  const medPrioImgs = document.querySelectorAll(".medPrioImg")
  medPrioImgs.forEach((medPrioImg) => {
    medPrioImg.src = medPrio
  })
};

export default loadImages;