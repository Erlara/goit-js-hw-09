import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("[data-start]");
const datetimePicker = document.querySelector("#datetime-picker");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
let futureTime = null;
let intervalId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            return Notiflix.Notify.failure('Please choose a date in the future');
        }
        futureTime = selectedDates[0];
        startBtn.disabled = false;
  },
   };

flatpickr(datetimePicker, options);


const timer = {
  start() {
    intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = futureTime - startTime;

      const time = convertMs(deltaTime);
      deltaTime < 0 ? clearInterval(intervalId) : updateClockFace(time);
    }, 1000);

    startBtn.disabled = true;
    datetimePicker.disabled = true;
  },
};

startBtn.addEventListener('click', timer.start.bind(timer));

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
   const days = addLeadingZero(Math.floor(ms / day));
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}