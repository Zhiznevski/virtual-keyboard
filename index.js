import { keysArr } from './src/data/keysArr.js';
import { ruKeysArr } from './src/data/ruKeysArr.js';
import { enKeysArr } from './src/data/enKeysArr.js';

const body = document.querySelector('body');
const textarea = document.createElement('textarea');

document.addEventListener('keydown', () => {
  // textarea.focus();
  // event.preventDefault();
  // console.log(event);
});
const longKeys = ['Backspace', 'CapsLock', 'Enter', 'Shift'];
const CssClasses = {
  SPACE: 'key_space',
  LONG_KEYS: 'key_long',
};
const keyboard = document.createElement('div');
const description = document.createElement('p');
function createKeyboard() {
  keyboard.classList.add('keyboard');
  textarea.classList.add('textarea');
  description.classList.add('title');
  description.innerText = 'To change language press left "CTRL" + "ALT"';
  body.appendChild(textarea);
  body.appendChild(keyboard);
  body.appendChild(description);
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
  textarea.value += `${this.innerText}`;
}
console.log(KEYS_ARRAY);
LETTER_KEYS.forEach((key) => key.addEventListener('click', pressKey));
// --Enter--------------------------------------------------------------------
const enter = KEYS_ARRAY[43]; // Исправить!!!!
console.log(enter);
enter.addEventListener('click', () => {
  textarea.focus();

  textarea.value = `${textarea.value.slice(0, textarea.selectionStart)} ${`\n${textarea.value.slice(textarea.selectionEnd, textarea.value.length)}`}`;
  console.log(textarea.value.length);
});
// const caret = textarea.selectionStart;
// textarea.value = textarea.value.slice(0, textarea.selectionStart)
//   + textarea.value.slice(textarea.selectionStart + 1, textarea.value.length);

// textarea.selectionStart = caret;
// textarea.selectionEnd = caret;

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
// --DELETE DEFAULT BEHAVIOR------------------------------------------------------------
document.addEventListener('keydown', (event) => {
  textarea.focus();
  console.log(event);
  // console.log(event.key);
  // console.log(event.code);
  if (event.key === 'Tab') {
    event.preventDefault();
  }
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
  const caret = textarea.selectionStart;
  textarea.value = textarea.value.slice(0, textarea.selectionStart)
    + textarea.value.slice(textarea.selectionStart + 1, textarea.value.length);

  textarea.selectionStart = caret;
  textarea.selectionEnd = caret;
});
// --CAPS------------------------------------------------------------
const capsLock = KEYS_ARRAY[31];
let capsFlag = false;
function pressCaps() {
  if (capsFlag === false) {
    LETTER_KEYS.forEach((el) => {
      const key = el;
      key.innerText = key.innerText.toUpperCase();
    });
    capsFlag = true;
  } else {
    LETTER_KEYS.forEach((el) => {
      const key = el;
      key.innerText = key.innerText.toLowerCase();
    });
    capsFlag = false;
  }
}
capsLock.addEventListener('click', pressCaps);
document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    event.preventDefault();
    pressCaps();
  }
});
// --SWITCH LANG------------------------------------------------------------
let lang = 'eng';
function changeLang() {
  if (lang === 'eng') {
    for (let i = 0; i < LETTER_KEYS.length; i += 1) {
      LETTER_KEYS[i].innerHTML = ruKeysArr[i];
      lang = 'rus';
    }
  } else {
    for (let i = 0; i < LETTER_KEYS.length; i += 1) {
      LETTER_KEYS[i].innerHTML = enKeysArr[i];
      lang = 'eng';
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Alt' && event.ctrlKey === true) {
    console.log(LETTER_KEYS.length);
    console.log(enKeysArr.length);
    console.log(ruKeysArr);
    changeLang();
  }
});
console.log(keyboard);
function setLocalStorage() {
  localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
  lang = localStorage.getItem('lang');
  if (lang === 'eng') {
    for (let i = 0; i < LETTER_KEYS.length; i += 1) {
      LETTER_KEYS[i].innerHTML = enKeysArr[i];
      lang = 'eng';
    }
  } else {
    for (let i = 0; i < LETTER_KEYS.length; i += 1) {
      LETTER_KEYS[i].innerHTML = ruKeysArr[i];
      lang = 'rus';
    }
  }
}

window.addEventListener('load', getLocalStorage);
// --tab------------------------------------------------------------
const tab = KEYS_ARRAY[15];
function pressTab() {
  textarea.focus();
  textarea.value += '  ';
}
tab.addEventListener('click', pressTab);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    pressTab();
  }
});
// --create object of keys------------------------------------------------------------
// const keysObj = {};
// document.addEventListener('keydown', (event) => {
//   // event.classList.add('active');
//   `${keysObj[event.key]}` = event.code;
//   console.log(keysObj);
// });
