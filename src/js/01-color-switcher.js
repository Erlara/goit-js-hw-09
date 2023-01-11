const start = document.querySelector("[data-start]");
const stop = document.querySelector("[data-stop]");
const bodyEl = document.querySelector("body");
let timerId = null;

start.addEventListener('click', onStartColor);
stop.addEventListener("click", onStopColor);

function onStartColor() {
    start.disabled = true;
    stop.disabled = false;
    bodyEl.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopColor() {
    start.disabled = false;
    stop.disabled = true;
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}