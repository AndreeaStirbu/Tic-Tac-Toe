var currentUser = 'X';

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

var cells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9];

var cellsMatrix = [
  [cell1, cell2, cell3],
  [cell4, cell5, cell6], 
  [cell7, cell8, cell9]
];

for(i = 0; i < 3; i++) {
  for(j = 0; j < 3; j++){
    let row = i;
    let column = j;
    cellsMatrix[i][j].classList.add('cell');
    container.appendChild(cellsMatrix[i][j]);
    let idName = "cell-"+ i.toString() + j.toString(); 
    cellsMatrix[i][j].setAttribute("id", idName);
    var button = document.createElement("button");
    button.classList.add("choice");
    cellsMatrix[i][j].appendChild(button);
    button.onclick = function() {displayOption(this, row, column);}
  }
}

function displayOption(elem, row, column) {
  if(elem.innerHTML == "") { //maybe disable button
    elem.textContent = currentUser;
    currentUser = currentUser == 'X' ? 'O' : 'X';
    checkWinningCondition(row, column, elem);
  }
}

function checkWinningCondition(row, column, elem){
  let text = elem.textContent;
  let strikeRow = 1;
  let strikeCol = 1;
  let strikeDiagLR = 1;
  let strikeDiagRL = 1;

  for(i = 0; i < 3; i++) {
    if(cellsMatrix[i][i].textContent == elem.textContent){
      strikeDiagLR++;
    }

    for(j = 0; j < 3; j++){
      if(cellsMatrix[i][j].textContent == elem.textContent){
        strikeRow++;
      }
      if(cellsMatrix[j][i].textContent == elem.textContent){
        strikeCol++;
      }
    }

    if(cellsMatrix[i][j-1-i].textContent == elem.textContent){
      strikeDiagRL++;
    }

    if(strikeRow == 4 || strikeCol == 4) {
      console.log("Winning");
      alert(elem.textContent + " Wins!");
      break; 
    }
  
    strikeRow = 1;
    strikeCol = 1;
  }

  if(strikeDiagLR == 4 || strikeDiagRL == 4) {
    console.log("Winning");
    alert(elem.textContent + " Wins!");
  }
}

