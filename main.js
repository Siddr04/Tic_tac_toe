const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const resetButton = document.querySelector('#resetButton');



const startCells = ["", "", "", "", "", "", "", "", ""];
const cellElements = [];

let turn = "circle";
infoDisplay.textContent = `It is ${turn}'s turn`;

function createGameBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener('click', handleCellClick);
    gameBoard.append(cellElement);
    cellElements.push(cellElement);
  })
}

createGameBoard();

function handleCellClick(e) {
  const display = document.createElement('div');
  display.classList.add(turn);
  e.target.append(display);
  if (turn === "circle") {
    turn = "cross";
  } else {
    turn = "circle";
  }
  infoDisplay.textContent = `It is ${turn}'s turn`;
  e.target.removeEventListener('click', handleCellClick);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square');

  const WinCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  WinCombinations.forEach((combination) => {
    const circleWins = combination.every((index) => {
      return allSquares[index].firstChild?.classList.contains('circle');
    });
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins";
      cellElements.forEach((cellElement) => {
        cellElement.removeEventListener('click', handleCellClick);
      });
      return;
    }
  });

  WinCombinations.forEach((combination) => {
    const crossWins = combination.every((index) => {
      return allSquares[index].firstChild?.classList.contains('cross');
    });
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins";
      cellElements.forEach((cellElement) => {
        cellElement.removeEventListener('click', handleCellClick);
      });
      return;
    }
  });
}
resetButton.addEventListener('click', resetGame);

function resetGame() {

  gameBoard.innerHTML = '';


  startCells.fill("");

  turn = "circle";
  infoDisplay.textContent = `It is ${turn}'s turn`;

  createGameBoard();
}