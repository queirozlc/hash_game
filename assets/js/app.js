// Aux Functions
const c = (element) => document.querySelector(element),
  cs = (element) => document.querySelectorAll(element);

// DOM

const cellElements = cs('[data-cell]');
const board = c('[data-board]');
const winDescElement = c('[data-win-msg-desc]');
const winMsg = c('[data-win-msg]');
const restartButton = c('[data-restart-btn]');

// Variables

let isCircleTurn;

const winCombination = [
  // HORIZONTAL WINS
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Diagonal Wins

  [0, 4, 8],
  [2, 4, 6],

  // Vertical Wins
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// FUNCTIONS

function startGame() {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
    cell.classList.remove('circle');
    cell.classList.remove('x');
  }

  isCircleTurn = false;

  setBoardHoverClass();
  winMsg.classList.remove('show-win-msg');
}

function endGame(isTie) {
  if (isTie) {
    winDescElement.innerText = 'Deu Velha !';
  } else {
    winDescElement.innerText = isCircleTurn
      ? 'Bolinha ganhou !!'
      : 'X ganhou !!';
  }

  winMsg.classList.add('show-win-msg');
}

function checkWin(currentPlayer) {
  return winCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

function checkTie() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
}

function placeMark(element, classAdd) {
  element.classList.add(classAdd);
}

function setBoardHoverClass() {
  board.classList.remove('circle');
  board.classList.remove('x');

  if (isCircleTurn) {
    placeMark(board, 'circle');
  } else {
    placeMark(board, 'x');
  }
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
}

function handleClick(e) {
  // Put X or Circle element

  const classAdd = isCircleTurn ? 'circle' : 'x';
  const cell = e.target;

  placeMark(cell, classAdd);

  // Check win and tie case

  const isWin = checkWin(classAdd);
  const isTie = checkTie();

  if (isWin) {
    endGame(false);
  } else if (isTie) {
    endGame(true);
  } else {
    // Change element
    swapTurns();
  }
}

// Call Func
startGame();
restartButton.addEventListener('click', startGame);
