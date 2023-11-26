function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'you won <span id="winnerid-name">player name</span>!';
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectedGameField(e) {
  if (e.target.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedFied = e.target;
  const selectedColumn = selectedFied.dataset.col - 1;
  const selectedRow = selectedFied.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("please select an empty field");
    return;
  }
  selectedFied.textContent = players[activePlayer].symbol; //players[0] => 'X'
  selectedFied.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1; //because we are initializing activePlayer with 0 but we have initialized rows and columns with 1

  const winnerid = checkForGamesOver();

  if (winnerid !== 0) {
    endGame(winnerid);
  }
  currentRound++;
  switchPlayer();
}

function checkForGamesOver() {
  for (let i = 0; i <= 2; i++) {
    //checking the rows for equality
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i <= 2; i++) {
    //checking the column for equality
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //checking the diagonals for equality
  //Diagonal : Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  //Diagonal : Top right to bottom left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerid) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerid > 0) {
    const winnerName = players[winnerid - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
