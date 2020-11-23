const inputsValidate = () => {
  const inputName = document.querySelectorAll('[name=user_name]'),
    inputMessage = document.querySelector('[name=user_message]'),
    inputPhone = document.querySelectorAll('[name="user_phone"]'),
    inputEmail = document.querySelectorAll('[name="user_email"]'),
    formInputs = [inputName, inputPhone, inputEmail];

  formInputs.forEach((item, index) => item.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^\S]/gi, '');
      if (index === 0) {
        input.value = input.value.replace(/[^а-яё\s]/ig, '');
      } else if (index === 1) {
        input.value = input.value.replace(/[^0-9+]/ig, '').substring(0, 13);
        if (input.value.length >= 7) {
          input.style.border = 'none';
        }
      }
      input.style.border = 'none';
    });
  }));
  inputMessage.addEventListener('input', () => {
    inputMessage.value = inputMessage.value.replace(/[^а-яё\s\W]/ig, '');
  });
};

export default inputsValidate;