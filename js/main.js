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
    let idInterval = setInterval(updateClock, 1000);
    updateClock();
  }
  counterTimer('5 November 2020 00:00');

  //menu

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul>li');

    btnMenu.addEventListener('click', (e) => {
      let target = e.target;
      target = target.closest('.menu');
      if (target) {
        menu.classList.toggle('active-menu');
      }
    });

    menu.addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('close-btn')) {
        menu.classList.remove('active-menu');
      }
      if (target) {
        target = target.closest('ul>li');
        menuItems.forEach((item) => {
          if (item === target) {
            menu.classList.remove('active-menu');
          }
        });
      }
    });

  };
  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
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

        popup.addEventListener('click', (e) => {
          let target = e.target;
          count = 10;
          if (target.classList.contains('popup-close')) {
            setTimeout(() => {
              popup.style.display = 'none';
            }, 250);
            popupUp();
          } else {
            target = target.closest('.popup-content');
            if (!target) {
              setTimeout(() => {
                popup.style.display = 'none';
              }, 250);
              popupUp();
            }
          }
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

        popup.addEventListener('click', (e) => {
          let target = e.target;

          if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
          } else {
            target = target.closest('.popup-content');
            if (!target) {
              popup.style.display = 'none';
            }
          }
        });
      }
    };
    windowCheckIn();
  };
  togglePopup();

  //tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (e) => {
      let target = e.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
});