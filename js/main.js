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
  counterTimer('6 November 2020 00:00');

  //menu

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    document.addEventListener('click', (e) => {
      if (e.target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (e.target.matches('.close-btn') || e.target.closest('li>a') || !e.target.closest('menu')) {
        menu.classList.remove('active-menu');
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

  //slider

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    const dotList = () => {
      const dotContainer = document.querySelector('.portfolio-dots');
      slide.forEach(() => {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dotContainer.append(dot);
      });
      let dot = dotContainer.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');
      return dot;
    };

    const dot = dotList();

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 2000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);

  };
  slider();

  //change image

  const ourTeam = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach(item => {
      let imgSrc = item.getAttribute('src');
      item.addEventListener('mouseover', (e) => e.target.src = e.target.dataset.img);
      item.addEventListener('mouseout', (e) => e.target.src = imgSrc);
    });
  };
  ourTeam();

  //calc

  const calc = (price = 100) => {
    const input = document.querySelectorAll('.calc-item'),
      calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    input.forEach((item, i) => {
      if (i !== 0) {
        item.addEventListener('input', () => item.value = item.value.replace(/\D/g, ''));
      }
    });

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1,
        count = 0,
        intervalTime;

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      const totalResult = Math.floor(total);

      let numberUp = () => {
        count += 100;
        if (count <= totalResult) {
          totalValue.textContent = count;
          intervalTime = setTimeout(numberUp, 1);
        } else {
          clearTimeout(intervalTime);
          count = 0;
        }
      };
      setTimeout(numberUp, 100);
    };

    calcBlock.addEventListener('change', (e) => {
      const target = e.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });

  };
  calc(100);
});