const sendForm = () => {
  const errorMessage = 'Что то пошло не так...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form = document.getElementById('form1'),
    form2 = document.getElementById('form2'),
    form3 = document.getElementById('form3'),
    description = document.querySelectorAll('.description'),
    forms = [form, form2, form3];

  const closeModal = () => {
    const popupContent = document.querySelector('.popup-content'),
      popup = document.querySelector('.popup');
    if (document.documentElement.clientWidth > 768) {
      let count = 0;
      let popupUp = () => {
        count--;
        if (count < -100) {
          clearTimeout(popupUp);
        } else {
          popupContent.style.top = `${count}%`;
          setTimeout(popupUp, 10);
        }
      };
      setTimeout(popupUp, 1000);
      setTimeout(() => {
        popup.style.display = 'none';
      }, 2000);
    } else {
      setTimeout(() => {
        popup.style.display = 'none';
      }, 2000);
    }
  };

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #ffffff';

  forms.forEach((form, index) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputPhone = form.querySelector('.form-phone'),
        inputEmail = form.querySelector('.form-email'),
        inputUserName = form.querySelector('[name=user_name]');

      if (!inputPhone.value.match(/^[\+]?[0-9]{7,13}$/ig)) {
        inputPhone.style.border = '1px solid red';
        alert('Вы ввели некорректный номер телефона');
        return;
      } else if (!inputEmail.value.match(/\w+@\w+\.\w{2,}/ig)) {
        inputEmail.style.border = '1px solid red';
        alert('Вы ввели некорректный адрес электронной почты');
        return;
      } else if (inputUserName.value === '') {
        inputUserName.style.border = '1px solid red';
        alert('Введите ваше имя');
        return;
      }

      if (index === 2) {
        form.prepend(statusMessage);
      } else if (index === 1) {
        description[7].textContent = '';
        description[7].append(statusMessage);
      } else {
        form.append(statusMessage);
      }

      statusMessage.innerHTML = `
          <div class="load-wrapp">
            <div class="load-6">
              <div class="letter-holder">
                <div class="l-1 letter">З</div>
                <div class="l-2 letter">а</div>
                <div class="l-3 letter">г</div>
                <div class="l-4 letter">р</div>
                <div class="l-5 letter">у</div>
                <div class="l-6 letter">з</div>
                <div class="l-7 letter">к</div>
                <div class="l-8 letter">а</div>
                <div class="l-9 letter">.</div>
                <div class="l-10 letter">.</div>
                <div class="l-11 letter">.</div>
              </div>
            </div>
          </div>`;

      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => body[key] = val);

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200.');
          }
          if (index === 1) {
            description[7].textContent = successMessage;
          } else {
            statusMessage.textContent = successMessage;
          }
        })
        .catch((error) => {
          if (index === 1) {
            description[7].textContent = errorMessage;
          } else {
            statusMessage.textContent = errorMessage;
          }
          console.log(error);
        })
        .finally(() => {
          const inputs = form.querySelectorAll('input');
          inputs.forEach(item => item.value = '');
          setTimeout(() => {
            if (index === 1) {
              description[7].textContent = 'Задайте их в форме ниже и наши специалисты свяжуться с Вами!';
            } else {
              statusMessage.remove();
            }
          }, 2000);
          if (index === 2) {
            closeModal();
          }
        });
    });
  });

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };
};

export default sendForm;