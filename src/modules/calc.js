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

export default calc;