function openPlayerConfig(e) {
  const selectedPlayerId = +e.target.dataset.playerid; // + converts string to number + '1' => 1
  editedPlayer = selectedPlayerId;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayername = formData.get("playername").trim(); //'   Max   '=>'Max'

  if (!enteredPlayername) {
    //enteredPlayername === ''
    e.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid player name.";
    console.log(e.target.firstElementChild);
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;

  if (players[0].name === players[1].name) {
    players[editedPlayer - 1].name = "";
    updatedPlayerDataElement.children[1].textContent = "name already taken";
  }

  closePlayerConfig();
}
