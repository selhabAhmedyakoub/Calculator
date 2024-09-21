import {
  updateScreen,
  numberButtonHandler,
  deleteButtonHandler,
  resetButtonHandler,
  operationButtonHandler,
  executeOperation,
} from './utils.js';
// Light/Dark theme
const themeButon = document.querySelector('.themes__toggle');

const switchTheme = () => {
  themeButon.classList.toggle('themes__toggle--isActive');
};
const switchThemewithenter = (event) => event.key === 'Enter' && switchTheme();
themeButon.addEventListener('keydown', switchThemewithenter);
themeButon.addEventListener('click', switchTheme);

// Logic for calculator
let storedNumber = '';
let currentNumber = '';
let operation = '';

const resultElement = document.querySelector('.calc__result');
const keyElements = document.querySelectorAll('[data-type]');

const keyElementHandler = (element) => {
  element.addEventListener('click', () => {
    const type = element.dataset.type;
    if (type === 'number') {
      numberButtonHandler(element.dataset.value);
    } else if (type === 'operation') {
      switch (element.dataset.value) {
        case 'c':
          resetButtonHandler();
          break;
        case 'Backspace':
          deleteButtonHandler();
          break;
        case 'Enter':
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};
keyElements.forEach(keyElementHandler);

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

window.addEventListener('keydown', (event) => {
  //   keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});

const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === 'Backspace') {
    deleteButtonHandler(); // Ensure this function is defined
  } else if (key === 'Enter') {
    executeOperation(); // Ensure this function is defined
  } else if (key === 'c') {
    resetButtonHandler();
  }
};

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);
    elem.classList.add('hover');
    elem.click();
    setTimeout(() => elem.classList.remove('hover'), 100);
  }
};
