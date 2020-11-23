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
        if (count < -30) {
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

export default togglePopup;