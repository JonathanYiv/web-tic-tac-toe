"use strict";
// Player Factory
const playerFactory = (name, score = 0) => {
  return { name, score };
}

// Selecting Display Elements
const playerOneNameDisplay = document.querySelector(".p1-name");
const playerTwoNameDisplay = document.querySelector(".p2-name");
const playerOneScoreDisplay = document.querySelector(".p1-score");
const playerTwoScoreDisplay = document.querySelector(".p2-score");
const currentPlayerDisplay = document.querySelector(".current-player");
const victoryDisplay = document.querySelector(".turn-track");

// Selecting Game/Start Screen Elements
const nameForm = document.querySelector(".name-form");
const game     = document.querySelector("main");
const playerOneNameInput = document.querySelector("#p1-name-input");
const playerTwoNameInput = document.querySelector("#p2-name-input");

// Selecting Button Elements
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const rematchButton = document.querySelector("#rematch");

// Selecting Grid Elements
const cells = document.querySelectorAll(".cell");

// Tic Tac Toe Module
const ticTacToe = (() => {
  let gameBoard = Array.from(' '.repeat(9));
  const currentPlayer = undefined;
  const winConditions = [ [0,1,2],
                          [0,4,8],
                          [0,3,6],
                          [3,4,5],
                          [6,7,8],
                          [6,4,2],
                          [1,4,7],
                          [8,5,2],
                        ];

  const updateDisplay = () => {
    playerOneNameDisplay.textContent = ticTacToe.playerOne.name;
    playerOneScoreDisplay.textContent = ticTacToe.playerOne.score;
    playerTwoNameDisplay.textContent = ticTacToe.playerTwo.name;
    playerTwoScoreDisplay.textContent = ticTacToe.playerTwo.score;
    currentPlayerDisplay.textContent = ticTacToe.currentPlayer.name;
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
    ticTacToe.updateDisplay();
  }

  const assignRandomStartingPlayer = () => {
    ticTacToe.currentPlayer = [ticTacToe.playerOne, ticTacToe.playerTwo][Math.floor(Math.random() * 2)];
  }

  const checkWinConditions = () => {
    let won = false;
    ticTacToe.winConditions.forEach(winCondition => {
      if (ticTacToe.gameBoard[winCondition[0]] !== " " &&
          ticTacToe.gameBoard[winCondition[0]] === ticTacToe.gameBoard[winCondition[1]] &&
          ticTacToe.gameBoard[winCondition[1]] === ticTacToe.gameBoard[winCondition[2]] &&
          ticTacToe.gameBoard[winCondition[0]] === ticTacToe.gameBoard[winCondition[2]]) {
        won = true;
      }
    });
    return won;
  }

  const endGame = () => {
    ticTacToe.currentPlayer.score += 1;
    victoryDisplay.textContent = " is victorious!";
  }

  const watchCells = () => {
    cells.forEach(cell => {
      cell.addEventListener("click", fillCell);
    });
  }

  function fillCell() {
    console.log(this);
    if(this.firstElementChild.textContent === "") {
      if (ticTacToe.currentPlayer === ticTacToe.playerOne) {
        this.firstElementChild.textContent = "x";
        ticTacToe.gameBoard[this.dataset.position] = "x";
      } else {
        this.firstElementChild.textContent = "o";
        ticTacToe.gameBoard[this.dataset.position] = "o";
      }
      if(ticTacToe.checkWinConditions()) {
        ticTacToe.endGame();
      } else {
        ticTacToe.nextTurn();
      }
    }
  }

  const resetGame = () => {
    cells.forEach(cell => {
      cell.firstElementChild.textContent = "";
      cell.removeEventListener("click", fillCell);
    });
    victoryDisplay.textContent = "'s turn!";
    console.log(ticTacToe.gameBoard);
    ticTacToe.gameBoard = Array.from(' '.repeat(9));
    console.log(ticTacToe.gameBoard);
  }

  const startGame = () => {
    ticTacToe.assignRandomStartingPlayer();
    ticTacToe.updateDisplay();
    ticTacToe.watchCells();
  }

  return {
    gameBoard,
    updateDisplay,
    toggleDisplay,
    assignRandomStartingPlayer,
    currentPlayer,
    nextTurn,
    winConditions,
    checkWinConditions,
    endGame,
    startGame,
    watchCells,
    resetGame,
  };
})();

// Start Button Event
startButton.addEventListener("click", () => {
  ticTacToe.toggleDisplay();
  const playerOneName = playerOneNameInput.value ? playerOneNameInput.value : "P1";
  const playerTwoName = playerTwoNameInput.value ? playerTwoNameInput.value : "P2";
  ticTacToe.playerOne = playerFactory(playerOneName);
  ticTacToe.playerTwo = playerFactory(playerTwoName);
  ticTacToe.startGame();
});

// Restart Button Event
restartButton.addEventListener("click", () => {
  ticTacToe.resetGame();
  ticTacToe.toggleDisplay();
});

// Rematch Button Event
rematchButton.addEventListener("click", () => {
  ticTacToe.resetGame();
  ticTacToe.startGame();
});
