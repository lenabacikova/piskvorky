'use strict';
console.log('funguju');

let whoPlays = 'circle';
const vsechnyTlacitka = document.querySelectorAll('.field');

for (let i = 0; i < vsechnyTlacitka.length; i++) {
  const tlacitko = vsechnyTlacitka[i];

  tlacitko.addEventListener('click', (event) => {
    if (whoPlays === 'circle') {
      event.target.classList.toggle('board__field--circle');
      document.querySelector('.player').src = 'images/cross.svg';
      whoPlays = 'cross';
      victory(event.target);
      event.target.setAttribute('disabled', true);
    } else if (whoPlays === 'cross') {
      event.target.classList.toggle('board__field--cross');
      document.querySelector('.player').src = 'images/circle.svg';
      whoPlays = 'circle';
      victory(event.target);
      event.target.setAttribute('disabled', true);
    }
  });
}

const boardSize = 10; // 10x10

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < vsechnyTlacitka.length) {
    if (field === vsechnyTlacitka[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};
const getField = (row, column) => vsechnyTlacitka[row * 10 + column];

const getSymbol = (field) => {
  // Název třídy přizpůsob tvému kódu.
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= 5) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

const victory = (field) => {
  if (isWinningMove(field) === true) {
    if (getSymbol(field) === 'circle') {
      window.confirm('Vyhrálo kolečko! Chcete spustit novou hru?');
      setTimeout(() => location.reload(), 400);
    } else if (getSymbol(field) === 'cross') {
      window.confirm('Vyhrál křížek! Chcete spustit novou hru?');
      setTimeout(() => location.reload(), 400);
    }
  }
};
