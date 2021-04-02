var currentUser = 'X';
let hasWon = false;

var gameStatus = document.querySelector("#game-status");

var container = document.getElementById("container");
var cell1 = document.createElement("div");
var cell2 = document.createElement("div");
var cell3 = document.createElement("div");
var cell4 = document.createElement("div");
var cell5 = document.createElement("div");
var cell6 = document.createElement("div");
var cell7 = document.createElement("div");
var cell8 = document.createElement("div");
var cell9 = document.createElement("div");

var cellsMatrix = [
  [cell1, cell2, cell3],
  [cell4, cell5, cell6], 
  [cell7, cell8, cell9]
];

//Use a DocumentFragment?
const frag = document.createDocumentFragment();
for(i = 0; i < 3; i++) {
  for(j = 0; j < 3; j++){
    let row = i;
    let column = j;
    cellsMatrix[i][j].classList.add('cell');
    frag.appendChild(cellsMatrix[i][j]);
    let idName = "cell-"+ i.toString() + j.toString(); 
    cellsMatrix[i][j].setAttribute("id", idName);
    var button = document.createElement("button");
    button.classList.add("choice");
    cellsMatrix[i][j].appendChild(button);
    button.onclick = function() {displayOption(row, column);}
  }
}

//Add the document fragment to the div container
container.appendChild(frag);

function displayOption(row, column) {
  if(cellsMatrix[row][column].textContent == "" && !hasWon) { //maybe disable button
    cellsMatrix[row][column].textContent = currentUser;
    currentUser = currentUser == 'X' ? 'O' : 'X';
    gameStatus.textContent = currentUser + " Turn";
    checkWinningCondition(row, column, cellsMatrix[row][column]);
  }
}

function checkWinningCondition(row, column, elem){
  let text = elem.textContent;
  let strikeRow = 1;
  let strikeCol = 1;
  let strikeDiagLR = 1;
  let strikeDiagRL = 1;

  let winningRow = new Array(3);
  let winningCol = new Array(3);
  let winningDiagLR = new Array(3);
  let winningDiagRL = new Array(3);

  for(i = 0; i < 3; i++) {
    if(cellsMatrix[i][i].textContent == elem.textContent){
      strikeDiagLR++;
      winningDiagLR.push(cellsMatrix[i][i]);
    }

    for(j = 0; j < 3; j++){
      if(cellsMatrix[i][j].textContent == elem.textContent){
        strikeRow++;
        winningRow.push(cellsMatrix[i][j]);
      }
      if(cellsMatrix[j][i].textContent == elem.textContent){
        strikeCol++;
        winningCol.push(cellsMatrix[j][i]);
      }
    }

    if(cellsMatrix[i][j-1-i].textContent == elem.textContent){
      strikeDiagRL++;
      winningDiagRL.push(cellsMatrix[i][j-1-i]);
    }

    if(strikeRow == 4) {
      setStatusToWin(text);
      updateGameBoard(winningRow);
      break; 
    }

    if(strikeCol == 4) {
      setStatusToWin(text);
      updateGameBoard(winningCol);
      break; 
    }
  
    strikeRow = 1;
    strikeCol = 1;

    winningRow.length = 0;
    winningCol.length = 0;
  }

  if(strikeDiagLR == 4) {
    setStatusToWin(text);
    updateGameBoard(winningDiagLR);
  }

  if(strikeDiagRL == 4) {
    setStatusToWin(text);
    updateGameBoard(winningDiagRL);
  }
}

function setStatusToWin(text){
  gameStatus.textContent = text + " Wins!";
  hasWon = true;
}

function updateGameBoard(winningArray){
 winningArray.forEach(cell => cell.classList.add("winning-cells"));
}
