import { changeScreen } from "../app";

const loadScreenEvents = () => {
  const screenSelectors = document.querySelectorAll(".screen-selector");
  screenSelectors.forEach((selector) => {
    addSelectScreenEventListener(selector);
  });
};

function addSelectScreenEventListener(selector) {
  selector.addEventListener("click", () => {
    const screenSelectors = document.querySelectorAll(".screen-selector");
    const screenTitle = document.getElementById("screen-title");
    screenSelectors.forEach((selector) =>
      selector.classList.remove("screen-selected")
    );
    selector.classList.add("screen-selected");
    screenTitle.textContent = selector.textContent;

    changeScreen(selector.textContent.trim());
  });
}

export default loadScreenEvents;
export { addSelectScreenEventListener };
