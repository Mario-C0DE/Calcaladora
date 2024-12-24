let display = document.querySelector('.display p');
  let buttons = document.querySelectorAll('.botoes button');
  let currentInput = '';
  let operator = '';
  let firstValue = '';

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;

      if (value === 'CL') {
        currentInput = '';
        display.textContent = '0';
      } else if (value === 'DEL') {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
      } else if (value === '=') {
        if (firstValue && operator) {
          currentInput = evaluate(firstValue, currentInput, operator);
          display.textContent = currentInput;
          firstValue = '';
          operator = '';
        }
      } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput) {
          if (firstValue) {
            currentInput = evaluate(firstValue, currentInput, operator);
            display.textContent = currentInput;
          }
          operator = value;
          firstValue = currentInput;
          currentInput = '';
        }
      } else {
        currentInput += value;
        display.textContent = currentInput;
      }
    });
  });

  function evaluate(firstValue, secondValue, operator) {
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);
    switch (operator) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      default: return secondValue;
    }
  }
