"use strict"

let gameCounter = 0;
let playerX = [],
  playerY = [];
const parent = document.querySelector(".parent");

buildGrid();

function buildGrid () {
  let div = document.querySelector("div");

  // Grid Generator
  for(let i = 0; i < 9; i ++) {
    let gridSquare = document.createElement("div");
    gridSquare.classList.add("square");
    gridSquare.classList.add("square-" + i);
    div.appendChild(gridSquare);

    // Border Styles
    if(i < 6) {
      gridSquare.style.borderBottom = "solid 2px black";
    }
    if (i % 3 == 0 || (i - 1) % 3 === 0 ) {
      gridSquare.style.borderRight = "solid 2px black";
    }
  }
  turnListener();
}



function turnListener() {
  // Listener for clicks on grid
  parent.addEventListener("click", function(event) {
    if(event.target.classList.contains("square") && !event.target.classList.contains("played")) {
      gameCounter++;
      let gridSquare = event.target.classList[1].substr(7);
      gridSquare = Number(gridSquare);
      event.target.classList.add("played");

      if(gameCounter === 9) {
        stalemateState();
      }

      // Calculates who turn it is
      if(gameCounter % 2 == 0) {
        event.target.style.backgroundColor = "forestGreen";
        playerY.push(gridSquare);
        playerY.sort();
        checkTurn(playerY, "playerY");
      } else {
        event.target.style.backgroundColor = "tomato";
        playerX.push(gridSquare);
        playerX.sort();
        checkTurn(playerX, "playerX")
      }

    }

  })
}

function checkTurn (turn, player) {

    let i = 0;

    while(i < turn.length) {

      // If any winning condition is met then set Win state
        if(rowWin(i, turn) || verticalWin(i, turn) || diagonalWin(i, turn)) {
         winState(player);
        }
        i ++;
    }
}

function rowWin (i, turn) {
  if(turn[i] === 0 || turn[i] === 3 || turn[i] === 6) {
    if( (turn[i] + 1) === turn[i + 1] && ((turn[i] + 2) === turn[i + 2])) {
        return true;
    }
  }
}

function verticalWin(i, turn) {
  if(turn[i] < 2) {
    if(turn[i + 1] === turn[i] + 3 && turn[i + 2] === turn[i] + 6) {
      return true;
    }
  }
}

function diagonalWin(i, turn) {
  if(turn[i] === 0 && turn[i + 1] === 4 && turn[i + 2] === 8) {
    return true;
  } else if (turn[i] === 2 && turn[i + 1] === 4 && turn[i + 2] === 6 ) {
    return true;
  }
}

function winState(player) {
  const winText = document.createElement("h1");
  winText.textContent = "W00t! " + player + " Won!";

  parent.innerHTML = "";
  parent.appendChild(winText);
  parent.appendChild(playAgain());
}

function stalemateState() {
  const endText = document.createElement("h1");
  endText.textContent = "Sad face no winners";

  parent.innerHTML = "";
  parent.appendChild(endText);
  parent.appendChild(playAgain());
}

function playAgain() {
  const playAgain = document.createElement("button");
  playAgain.textContent = "Play Again?";
  playAgain.addEventListener("click", function() {
    resetGame();
  });
  return playAgain;
}

function resetGame () {
  parent.innerHTML = "";
  gameCounter = 0;
  playerX = [];
  playerY = [];
  buildGrid();
}
