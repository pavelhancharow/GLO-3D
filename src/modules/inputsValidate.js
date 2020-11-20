const inputsValidate = () => {
  const inputSymbols = document.querySelectorAll('[name=user_name],[name=user_message]'),
    inputPhone = document.querySelectorAll('[name="user_phone"]'),
    inputEmail = document.querySelectorAll('[name="user_email"]'),
    formInputs = [inputSymbols, inputPhone, inputEmail];

  formInputs.forEach((item, index) => item.forEach(input => {
    input.addEventListener('input', () => {
      if (index === 0) {
        input.value = input.value.replace(/[^а-яё\s]/ig, '');
      } else if (index === 1) {
        input.value = input.value.replace(/[^0-9+]/ig, '').substring(0, 13);
        if (input.value.length >= 7) {
          input.style.border = 'none';
        }
      } else {
        input.value = input.value.replace(/[^\S]/gi, '');
      }
    });
  }));
};

export default inputsValidate;