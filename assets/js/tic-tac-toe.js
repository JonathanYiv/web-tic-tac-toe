"use strict";
// JavaScript function to render the array on the webpage
// JavaScript DOM event handlers to add marks to the board
// JavaScript function to check for win logic

// Player Factory
const playerFactory = (name, score = 0) => {
  return { name, score };
}

// Selecting Display Elements
const playerOneNameDisplay = document.querySelector(".p1-name");
const playerTwoNameDisplay = document.querySelector(".p2-name");
const playerOneScoreDisplay = document.querySelector(".p1-score");
const playerTwoScoreDisplay = document.querySelector(".p2-score");

// Selecting Game/Start Screen Elements
const nameForm = document.querySelector(".name-form");
const game     = document.querySelector("main");
const playerOneNameInput = document.querySelector("#p1-name-input");
const playerTwoNameInput = document.querySelector("#p2-name-input");

// Selecting Button Elements
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const rematchButton = document.querySelector("#rematch");

// Tic Tac Toe Module
const ticTacToe = (() => {
  const gameBoard = Array.from(' '.repeat(9));
  const currentPlayer = undefined;

  const updateDisplay = () => {
    playerOneNameDisplay.textContent = ticTacToe.playerOne.name;
    playerOneScoreDisplay.textContent = ticTacToe.playerOne.score;
    playerTwoNameDisplay.textContent = ticTacToe.playerTwo.name;
    playerTwoScoreDisplay.textContent = ticTacToe.playerTwo.score;
  }

  const toggleDisplay = () => {
    nameForm.classList.toggle("invisible");
    game.classList.toggle("invisible");
  }

  const nextTurn = () => {
    if (ticTacToe.currentPlayer === ticTacToe.playerOne) {
      ticTacToe.currentPlayer = ticTacToe.playerTwo;
    }
    else {
      ticTacToe.currentPlayer = ticTacToe.playerOne;
    }
  }

  const assignRandomStartingPlayer = () => {
    ticTacToe.currentPlayer = [ticTacToe.playerOne, ticTacToe.playerTwo][Math.floor(Math.random() * 2)];
  }

  return {
    gameBoard,
    updateDisplay,
    toggleDisplay,
    assignRandomStartingPlayer,
    currentPlayer,
    nextTurn,
  };
})();

// Start Button Event
startButton.addEventListener("click", () => {
  ticTacToe.toggleDisplay();
  const playerOneName = playerOneNameInput.value ? playerOneNameInput.value : "P1";
  const playerTwoName = playerTwoNameInput.value ? playerTwoNameInput.value : "P2";
  ticTacToe.playerOne = playerFactory(playerOneName);
  ticTacToe.playerTwo = playerFactory(playerTwoName);
  ticTacToe.updateDisplay();
  ticTacToe.assignRandomStartingPlayer();
});

// Rematch Button Event
restartButton.addEventListener("click", () => {
  ticTacToe.toggleDisplay();
});
