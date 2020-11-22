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

  let count = 0,
    total = 0;

  const totalOdometer = () => {
    const requestId = requestAnimationFrame(totalOdometer);
    if (count < total) {
      count += 100;
      totalValue.textContent = count;
    } else if (count > total) {
      count -= 100;
      totalValue.textContent = count;
    } else {
      cancelAnimationFrame(requestId);
    }
  };

  const countSum = () => {
    let countValue = 1,
      dayValue = 1;

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
      total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
    } else {
      total = 0;
    }
    totalOdometer();
  };

  calcBlock.addEventListener('change', (e) => {

    if (e.target.matches('select') || e.target.matches('input')) {
      countSum();
    }
  });

};
calc(100);

export default calc;