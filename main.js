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

let gameCounter = 0;
let playerX = [],
  playerY = [];

function turnListener() {
  // Listener for clicks on grid
  document.querySelector(".parent").addEventListener("click", function(event) {
    if(event.target.classList.contains("square") && !event.target.classList.contains("played")) {
      gameCounter++;
      let gridSquare = event.target.classList[1].substr(7);
      gridSquare = Number(gridSquare);
      event.target.classList.add("played");

      // Calculates who turn it is
      if(gameCounter % 2 == 0) {
        event.target.style.backgroundColor = "forestGreen";
        playerY.push(gridSquare);
        playerY.sort();
        checkWon(playerY, "playerY");
      } else {
        event.target.style.backgroundColor = "tomato";
        playerX.push(gridSquare);
        playerX.sort();
        checkWon(playerX, "playerX")
      }

    }

  })
}

function checkWon (turn, player) {

    // Debug text is the stand in for a true winning state
    const debug = document.querySelector(".debug");
    debug.innerHTML = "playerX: " + playerX + "<br>playerY: " + playerY +  "<br>Turn: " + turn;
    let i = 0;
    // let row1Win = turn[i] === 0 && turn[(i + 1)] === 1 && turn[(i + 2)] === 2;
    // let row2Win = turn[i] === 3 && turn[(i + 1)] === 4 && turn[(i + 2)] === 5;
    // let row3Win = turn[i] === 6 && turn[(i + 1)] === 7 && turn[(i + 2)] === 8;

    // let vertical1Win = turn[i] === 0 && turn[(i + 1)] === 4,

    while(i < turn.length) {
        if(rowWin(i, turn) || verticalWin(i, turn) || diagonalWin(i, turn)) {
          debug.innerHTML += "<br>Woot! " + player + " Won!";
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