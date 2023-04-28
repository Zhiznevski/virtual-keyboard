// eslint-disable-next-line import/extensions, import/no-unresolved
import { keysArr } from './src/data/keysArr.js';

const body = document.querySelector('body');
const textarea = document.createElement('textarea');

document.addEventListener('keydown', () => {
  textarea.focus();
  // console.log(event);
});
const longKeys = ['Backspace', 'CapsLock', 'Enter', 'Shift'];
const CssClasses = {
  SPACE: 'key_space',
  LONG_KEYS: 'key_long',
};
const keyboard = document.createElement('div');
function createKeyboard() {
  keyboard.classList.add('keyboard');
  textarea.classList.add('textarea');
  body.appendChild(textarea);
  body.appendChild(keyboard);
  for (let i = 0; i < keysArr.length; i += 1) {
    const key = `<div class = "key">${keysArr[i]}</div>`;
    if (i === 14 || i === 29 || i === 42 || i === 55) {
      const clearFix = '<div class = "clearfix"></div>';
      keyboard.insertAdjacentHTML('beforeend', clearFix);
    }
    keyboard.insertAdjacentHTML('beforeend', key);
  }
}
createKeyboard();
console.log(keyboard.childNodes[0].innerText);
function addClasses() {
  for (let i = 0; i < keyboard.childNodes.length; i += 1) {
    const div = keyboard.childNodes[i];
    console.log(div);
    if (longKeys.includes(div.innerText)) {
      div.classList.add(CssClasses.LONG_KEYS);
    } else if (div.innerText === '') {
      div.classList.add(CssClasses.SPACE);
    }
  }
}
addClasses();

const KEYS_ARRAY = keyboard.childNodes;
function createLettersArray() {
  const arr = [];
  for (let i = 0; i < KEYS_ARRAY.length; i += 1) {
    if (KEYS_ARRAY[i].innerText.length === 1) {
      arr.push(KEYS_ARRAY[i]);
    }
  }
  return arr;
}
const LETTER_KEYS = createLettersArray();
console.log(LETTER_KEYS);
function pressKey() {
  // eslint-disable-next-line no-useless-concat

  // eslint-disable-next-line no-useless-concat
  textarea.value += '' + `${this.innerText}`;
}
console.log(KEYS_ARRAY);
LETTER_KEYS.forEach((key) => key.addEventListener('click', pressKey));
// --Enter--------------------------------------------------------------------
const enter = KEYS_ARRAY[43]; // Исправить!!!!
console.log(enter);
enter.addEventListener('click', () => {
  textarea.focus();
  textarea.value += '\n';
});

// enter.addEventListener('click', () => {
//   textarea.focus();
//   textarea.setSelectionRange(textarea.value.length, textarea.value.length--);
// });
// --BACKSPACE--------------------------------------------------------------------
const backspace = KEYS_ARRAY[13];
backspace.addEventListener('click', () => {
  textarea.focus();
  textarea.value = textarea.value.slice(0, -1);
});
// --SPACE--------------------------------------------------------------------
const space = KEYS_ARRAY[62];
space.addEventListener('click', () => {
  textarea.focus();
  textarea.value += ' ';
});
// eslint-disable-next-line max-len
// --Arrows-----------------------------------------------------------------------
const arrowsArr = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const arrowUp = KEYS_ARRAY[56];
arrowUp.addEventListener('click', () => {
  textarea.value += '⯅';
});
const arrowLeft = KEYS_ARRAY[64];
arrowLeft.addEventListener('click', () => {
  textarea.value += '⯇';
});
const arrowDown = KEYS_ARRAY[65];
arrowDown.addEventListener('click', () => {
  textarea.value += '⯆';
});
const arrowRight = KEYS_ARRAY[66];
arrowRight.addEventListener('click', () => {
  textarea.value += '⯈';
});

document.addEventListener('keydown', (event) => {
  textarea.focus();
  if (arrowsArr.includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === 'ArrowLeft') {
    textarea.value += '⯇';
  } else if (event.key === 'ArrowRight') {
    textarea.value += '⯈';
  } else if (event.key === 'ArrowUp') {
    textarea.value += '⯅';
  } else if (event.key === 'ArrowDown') {
    textarea.value += '⯆';
  }
});
// --DEL------------------------------------------------------------
const del = KEYS_ARRAY[29];
del.addEventListener('click', () => {
  textarea.focus();
  const caret = textarea.selectionStart;
  textarea.value = textarea.value.slice(0, textarea.selectionStart) + (textarea.value.slice(
    textarea.selectionStart + 1,
    textarea.value.length,
  ));

  // eslint-disable-next-line no-multi-assign
  textarea.selectionStart = textarea.selectionEnd = caret;
});
