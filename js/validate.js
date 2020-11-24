'use strict';

class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.forms = document.querySelectorAll(selector);
    this.form = Array.from(this.forms);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = this.form.map(form => {
      [...form] = [...form].filter(item => {
        return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
      });
      return [...form];
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();

    this.elementsForm.forEach(form => form.forEach(elem => {
      elem.addEventListener('change', this.checkIt.bind(this));
    }));

    this.form.forEach((form) => {
      form.addEventListener('submit', (e) => {
        [...form.elements].forEach(elem => this.checkIt({ target: elem }));
        if (this.error.size) {
          e.preventDefault();
        }
      });
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.name];
      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать атрибут name полей ввода и методы проверки этих полей');
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = `
      .success {
        border: 2px solid green !important;
      }
      .error {
        border: 2px solid red !important;
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red;
      }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
    if (!this.pattern.name) {
      this.pattern.name = /[а-яё\s]/ig;
    }
    if (!this.pattern.message) {
      this.pattern.message = /[а-яё\s]/ig;
    }
  }
}