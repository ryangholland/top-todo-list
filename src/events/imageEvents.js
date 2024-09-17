import logo from "../assets/format-list-checks.svg";
import inbox from "../assets/inbox.svg";
import today from "../assets/calendar-today.svg";
import week from "../assets/calendar-week.svg";
import plus from "../assets/plus.svg";
import trash from "../assets/delete.svg";
import pencil from "../assets/pencil.svg";

const loadStaticImages = () => {
  const logoImg = document.getElementById("logoImg");
  logoImg.src = logo;
  const inboxImg = document.getElementById("inboxImg");
  inboxImg.src = inbox;
  const todayImg = document.getElementById("todayImg");
  todayImg.src = today;
  const weekImg = document.getElementById("weekImg");
  weekImg.src = week;

  const trashImg = document.querySelector(".trashImg")
  trashImg.src = trash;
  const pencilImg = document.querySelector(".pencilImg")
  pencilImg.src = pencil;

  const plusImgs = document.querySelectorAll(".plusImg");
  plusImgs.forEach((plusImg) => {
    plusImg.src = plus;
  });
};

export default loadStaticImages;
