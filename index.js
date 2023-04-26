// eslint-disable-next-line import/extensions, import/no-unresolved
// import keysArr from './src/data/keysArr';

const keysArr = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  '\\',
  'Delete',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'Enter',
  'Shift',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  'ArrowUp',
  'Shift',
  'Control',
  'Meta',
  'Alt',
  ' ',
  'Alt',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'Control',
];

const body = document.querySelector('body');
// document.addEventListener('keydown', (event) => {
//   console.log(event);
//   newArr.push(event.key);
//   console.log(event.key);
//   console.log(newArr);
// });
// const longKeys = ['Backspace', 'Tab', 'CapsLock', 'Enter'];
const keyboard = document.createElement('div');
function createKeyboard() {
  keyboard.classList.add('keyboard');
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
// function addClasses() {}
// addClasses();
