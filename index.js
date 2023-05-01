import keysArr from './src/data/keysArr.js';
import ruKeysArr from './src/data/ruKeysArr.js';
import ruKeysArrShift from './src/data/ruKeysArrShift.js';
import enKeysArr from './src/data/enKeysArr.js';
import enKeysArrShift from './src/data/enKeysArrShift.js';
import codesArr from './src/data/codesArr.js';
// import objKeys from './src/data/objKeys.js';

const body = document.querySelector('body');
const textarea = document.createElement('textarea');

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
    const key = `<div class = "key" data = "${codesArr[i]}">${keysArr[i]}</div>`;
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
// --add letters to the TEXTAREA--------------------------------------------------------------------
function pressKey() {
  textarea.setRangeText(this.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();
}
console.log(KEYS_ARRAY);
LETTER_KEYS.forEach((key) => key.addEventListener('click', pressKey));
// --add animation to keys--------------------------------------------------------------------

document.addEventListener('keydown', (event) => {
  document.querySelector(`.key[data ="${event.code}"`).classList.add('active');
  setTimeout(() => (document.querySelector(`.key[data ="${event.code}"`).classList.remove('active')), 200);
});
document.querySelectorAll('.key').forEach((key) => {
  key.addEventListener('click', () => {
    key.classList.add('active');
    setTimeout(() => {
      key.classList.remove('active');
    }, 200);
  });
});
// --Enter--------------------------------------------------------------------
const enter = KEYS_ARRAY[43]; // Исправить!!!!
console.log(enter);
enter.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
});

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
arrowUp.innerText = '⯅ ';
arrowUp.addEventListener('click', () => {
  textarea.value += '⯅';
});
const arrowLeft = KEYS_ARRAY[64];
arrowLeft.innerText = '⯇ ';
arrowLeft.addEventListener('click', () => {
  textarea.value += '⯇';
});
const arrowDown = KEYS_ARRAY[65];
arrowDown.innerText = '⯆ ';
arrowDown.addEventListener('click', () => {
  textarea.value += '⯆';
});
const arrowRight = KEYS_ARRAY[66];
arrowRight.innerText = '⯈ ';
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
    changeLang();
  }
});
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
// --shift------------------------------------------------------------
const shifts = [KEYS_ARRAY[45], KEYS_ARRAY[57]];
console.log(KEYS_ARRAY);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift' && !event.repeat) {
    event.preventDefault();
    for (let i = 0; i < LETTER_KEYS.length; i += 1) {
      if (lang === 'eng') {
        LETTER_KEYS[i].innerText = enKeysArrShift[i].toUpperCase();
      } else {
        LETTER_KEYS[i].innerText = ruKeysArrShift[i].toUpperCase();
      }
    }
  }
});
document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift' && !event.repeat) {
    event.preventDefault();
    for (let i = 0; i < LETTER_KEYS.length; i += 1) {
      if (lang === 'eng') {
        LETTER_KEYS[i].innerText = enKeysArr[i];
      } else {
        LETTER_KEYS[i].innerText = ruKeysArr[i];
      }
    }
  }
});
shifts.forEach((element) => element.addEventListener('mousedown', () => {
  for (let i = 0; i < LETTER_KEYS.length; i += 1) {
    if (lang === 'eng') {
      LETTER_KEYS[i].innerText = enKeysArrShift[i].toUpperCase();
    } else {
      LETTER_KEYS[i].innerText = ruKeysArrShift[i].toUpperCase();
    }
  }
}));
shifts.forEach((element) => element.addEventListener('mouseup', () => {
  for (let i = 0; i < LETTER_KEYS.length; i += 1) {
    if (lang === 'eng') {
      LETTER_KEYS[i].innerText = enKeysArr[i];
    } else {
      LETTER_KEYS[i].innerText = ruKeysArr[i];
    }
  }
}));
