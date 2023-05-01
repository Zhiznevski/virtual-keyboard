import keysArr from './src/data/keysArr.js';
import ruKeysArr from './src/data/ruKeysArr.js';
import ruKeysArrShift from './src/data/ruKeysArrShift.js';
import enKeysArr from './src/data/enKeysArr.js';
import enKeysArrShift from './src/data/enKeysArrShift.js';
import codesArr from './src/data/codesArr.js';
import objKeys from './src/data/objKeys.js';

const body = document.querySelector('body');
const textarea = document.createElement('textarea');

const longKeys = ['Backspace', 'CapsLock', 'Enter', 'Shift'];
const CssClasses = {
  SPACE: 'key_space',
  LONG_KEYS: 'key_long',
};

const keyboard = document.createElement('div');
const description = document.createElement('p');

// --Create keyboard--------------------------------------------------------------------------

function createKeyboard() {
  keyboard.classList.add('keyboard');
  textarea.classList.add('textarea');
  description.classList.add('title');
  description.innerText = `To change language press left "CTRL" + "ALT"

                           Virtual keyboard created in Windows system`;
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

// --Add width to non-standard keys----------------------------------------------------------------

function addClasses() {
  for (let i = 0; i < keyboard.childNodes.length; i += 1) {
    const div = keyboard.childNodes[i];
    if (longKeys.includes(div.innerText)) {
      div.classList.add(CssClasses.LONG_KEYS);
    } else if (div.innerText === '') {
      div.classList.add(CssClasses.SPACE);
    }
  }
}
addClasses();

// --Create array of letters-----------------------------------------------------------------------

const KEYS_ARRAY = keyboard.childNodes;

KEYS_ARRAY[59].innerText = 'Ctrl';
KEYS_ARRAY[60].innerText = 'Win';
KEYS_ARRAY[67].innerText = 'Ctrl';
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

// --add letters to the TEXTAREA--------------------------------------------------------------------

function pressKey() {
  textarea.setRangeText(this.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
  textarea.focus();
}

LETTER_KEYS.forEach((key) => key.addEventListener('click', pressKey));

// --add animation to keys--------------------------------------------------------------------

document.addEventListener('keydown', (event) => {
  if (objKeys[event.code]) {
    if (event.key !== 'CapsLock') {
      document.querySelector(`.key[data ="${event.code}"`).classList.add('active');
    }
  }
});
document.addEventListener('keyup', (event) => {
  if (objKeys[event.code]) {
    if (event.key !== 'CapsLock') {
      document.querySelector(`.key[data ="${event.code}"`).classList.remove('active');
    }
  }
});
document.querySelectorAll('.key').forEach((key) => {
  key.addEventListener('mousedown', () => {
    key.classList.add('active');
  });
  key.addEventListener('mouseup', () => {
    key.classList.remove('active');
  });
});

// --Enter functional-----------------------------------------------------------------------

const enter = KEYS_ARRAY[43];

enter.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
});

// --Backspace--functional--------------------------------------------------------------------

const backspace = KEYS_ARRAY[13];
backspace.addEventListener('click', () => {
  textarea.focus();
  const caret = textarea.selectionStart;
  textarea.value = textarea.value.slice(0, textarea.selectionStart - 1)
  + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
  textarea.selectionStart = caret - 1;
  textarea.selectionEnd = caret - 1;
});

// --SPACE--functional--------------------------------------------------------------------
const space = KEYS_ARRAY[62];
space.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
});
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    textarea.focus();
    textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
  }
});
// --Arrows--functional-----------------------------------------------------------------------
const arrowsArr = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const arrowUp = KEYS_ARRAY[56];
arrowUp.innerText = '⯅ ';
arrowUp.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText('⯅', textarea.selectionStart, textarea.selectionEnd, 'end');
});
const arrowLeft = KEYS_ARRAY[64];
arrowLeft.innerText = '⯇ ';
arrowLeft.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText('⯇', textarea.selectionStart, textarea.selectionEnd, 'end');
});
const arrowDown = KEYS_ARRAY[65];
arrowDown.innerText = '⯆ ';
arrowDown.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText('⯆', textarea.selectionStart, textarea.selectionEnd, 'end');
});
const arrowRight = KEYS_ARRAY[66];
arrowRight.innerText = '⯈ ';
arrowRight.addEventListener('click', () => {
  textarea.focus();
  textarea.setRangeText('⯈', textarea.selectionStart, textarea.selectionEnd, 'end');
});

// --Delete default behavior-of arrows and tab------------------------------------------------------

document.addEventListener('keydown', (event) => {
  textarea.focus();
  if (event.key.length === 1 && LETTER_KEYS[0].innerText === 'ё' && event.code !== 'Space' && objKeys[event.code]) {
    event.preventDefault();
    textarea.setRangeText(ruKeysArr[enKeysArr.indexOf(objKeys[event.code])], textarea.selectionStart, textarea.selectionEnd, 'end');
  }
  if (event.key.length === 1 && LETTER_KEYS[13].innerText === 'q' && event.code !== 'Space' && objKeys[event.code]) {
    event.preventDefault();
    textarea.setRangeText(enKeysArr[enKeysArr.indexOf(objKeys[event.code])], textarea.selectionStart, textarea.selectionEnd, 'end');
  }
  if (event.key === 'Tab') {
    event.preventDefault();
  }
  if (arrowsArr.includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === 'Alt') {
    event.preventDefault();
  }
  if (event.key === 'ArrowLeft') {
    textarea.focus();
    textarea.setRangeText('⯇', textarea.selectionStart, textarea.selectionEnd, 'end');
  } else if (event.key === 'ArrowRight') {
    textarea.focus();
    textarea.setRangeText('⯈', textarea.selectionStart, textarea.selectionEnd, 'end');
  } else if (event.key === 'ArrowUp') {
    textarea.focus();
    textarea.setRangeText('⯅', textarea.selectionStart, textarea.selectionEnd, 'end');
  } else if (event.key === 'ArrowDown') {
    textarea.focus();
    textarea.setRangeText('⯆', textarea.selectionStart, textarea.selectionEnd, 'end');
  }
});

// --Delete functional------------------------------------------------------------

const del = KEYS_ARRAY[29];
del.addEventListener('click', () => {
  textarea.focus();
  const caret = textarea.selectionStart;
  textarea.value = textarea.value.slice(0, textarea.selectionStart)
    + textarea.value.slice(textarea.selectionStart + 1, textarea.value.length);
  textarea.selectionStart = caret;
  textarea.selectionEnd = caret;
});

// --CAPS functional------------------------------------------------------------

const capsLock = KEYS_ARRAY[31];
let capsFlag = false;

function pressCaps() {
  if (capsFlag === false) {
    LETTER_KEYS.forEach((el) => {
      const key = el;
      key.innerText = key.innerText.toUpperCase();
    });
    capsLock.classList.add('active');
    capsFlag = true;
  } else {
    LETTER_KEYS.forEach((el) => {
      const key = el;
      key.innerText = key.innerText.toLowerCase();
    });
    capsFlag = false;
    capsLock.classList.remove('active');
  }
}
capsLock.addEventListener('click', pressCaps);

document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    event.preventDefault();
    pressCaps();
  }
  if (event.key.length === 1 && LETTER_KEYS[0].innerText === 'Ё' && LETTER_KEYS[2].innerText !== '"' && event.code !== 'Space' && objKeys[event.code]) {
    event.preventDefault();
    textarea.setRangeText(ruKeysArr[enKeysArr.indexOf(objKeys[event.code])].toUpperCase(), textarea.selectionStart, textarea.selectionEnd, 'end');
  }
  if (event.key.length === 1 && LETTER_KEYS[13].innerText === 'Q' && LETTER_KEYS[2].innerText !== '@' && event.code !== 'Space' && objKeys[event.code]) {
    event.preventDefault();
    textarea.setRangeText(enKeysArr[enKeysArr.indexOf(objKeys[event.code])].toUpperCase(), textarea.selectionStart, textarea.selectionEnd, 'end');
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

// --Tab functional------------------------------------------------------------

const tab = KEYS_ARRAY[15];
function pressTab() {
  textarea.focus();
  textarea.setRangeText('  ', textarea.selectionStart, textarea.selectionEnd, 'end');
}
tab.addEventListener('click', pressTab);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    pressTab();
  }
});

// --Shift functional------------------------------------------------------------

const shifts = [KEYS_ARRAY[45], KEYS_ARRAY[57]];

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
  if (event.key.length === 1 && LETTER_KEYS[2].innerText === '"' && event.code !== 'Space' && objKeys[event.code]) {
    event.preventDefault();
    textarea.setRangeText(ruKeysArrShift[enKeysArr.indexOf(objKeys[event.code])].toUpperCase(), textarea.selectionStart, textarea.selectionEnd, 'end');
  }
  if (event.key.length === 1 && LETTER_KEYS[2].innerText === '@' && event.code !== 'Space' && objKeys[event.code]) {
    event.preventDefault();
    textarea.setRangeText(enKeysArrShift[enKeysArr.indexOf(objKeys[event.code])].toUpperCase(), textarea.selectionStart, textarea.selectionEnd, 'end');
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
