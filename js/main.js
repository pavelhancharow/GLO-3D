window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function counterTimer(deadline) {
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
    updateClock();
    let idInterval = setInterval(updateClock, 1000);
  }

  counterTimer('4 November 2020 00:00');

  //menu

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li'),
      anchor = document.querySelectorAll('a[href*="#"]');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((item) => item.addEventListener('click', handlerMenu));
    anchor.forEach((item) => item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(item.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }));
  };
  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content');

    const windowCheckIn = () => {
      if (document.documentElement.clientWidth > 768) {
        popupContent.style.top = '-100%';
        let count = 0;

        popupBtn.forEach((item) => {
          item.addEventListener('click', () => {
            count = 0;
            popup.style.display = 'block';
            popupDown();
          });
        });

        popupClose.addEventListener('click', () => {
          count = 10;
          setTimeout(() => {
            popup.style.display = 'none';
          }, 250);
          popupUp();
        });

        let popupDown = () => {
          count++;
          if (count > 10) {
            clearTimeout(popupDown);
          } else {
            popupContent.style.top = count + '%';
            setTimeout(popupDown, 10);
          }
        };

        let popupUp = () => {
          count--;
          if (count < -100) {
            clearTimeout(popupUp);
          } else {
            popupContent.style.top = `${count}%`;
            setTimeout(popupUp, 10);
          }
        };
      } else {
        popupBtn.forEach((item) => {
          item.addEventListener('click', () => {
            popup.style.display = 'block';
          });
        });

        popupClose.addEventListener('click', () => {
          popup.style.display = 'none';
        });
      }
    };
    windowCheckIn();
  };
  togglePopup();
});