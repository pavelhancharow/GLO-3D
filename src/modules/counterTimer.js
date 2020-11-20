const counterTimer = (deadline) => {
  let timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  function getTimeRemaining() {
    let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor((timeRemaining / 60 / 60) % 24);

    return { timeRemaining, hours, minutes, seconds };
  }

  function updateClock() {
    let timer = getTimeRemaining();
    if (timer.timeRemaining > 0) {
      timerHours.textContent = (timer.hours < 10) ? '0' + timer.hours : timer.hours;
      timerMinutes.textContent = (timer.minutes < 10) ? '0' + timer.minutes : timer.minutes;
      timerSeconds.textContent = (timer.seconds < 10) ? '0' + timer.seconds : timer.seconds;
    } else {
      clearInterval(idInterval);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  }
  let idInterval = setInterval(updateClock, 1000);
  updateClock();
};

export default counterTimer;