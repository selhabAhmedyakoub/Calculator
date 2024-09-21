// Use keyboard as input source
const availableNumbers = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
];
const availableOperations = ['+', '-', '*', '/'];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  'Backspace',
  'Enter',
  'c',
];

// Make sure these variables are declared and accessible
let storedNumber = '';
let currentNumber = '';
let operation = '';
const resultElement = document.querySelector('.calc__result');

const updateScreen = (value) => {
  resultElement.innerText = !value ? 0 : value;
};

const numberButtonHandler = (value) => {
  if (value === '.' && currentNumber.includes('.')) return;
  if (value === '0' && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === '0') return;

  if (currentNumber.length === 1) {
    currentNumber = '';
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = '';
  currentNumber = '';
  operation = '';
  updateScreen(currentNumber);
};

const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = '';
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) {
      executeOperation();
    }
  }
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    storedNumber = parseFloat(storedNumber);
    currentNumber = parseFloat(currentNumber);
    switch (operation) {
      case '+':
        storedNumber = storedNumber + currentNumber;
        break;
      case '-':
        storedNumber = storedNumber - currentNumber;
        break;
      case '/':
        storedNumber = storedNumber / currentNumber;
        break;
      case '*':
        storedNumber = storedNumber * currentNumber;
        break;
    }
    currentNumber = '';
    updateScreen(storedNumber);
  }
};

// Export the functions at the end
export {
  updateScreen,
  numberButtonHandler,
  deleteButtonHandler,
  resetButtonHandler,
  operationButtonHandler,
  executeOperation,
};
