let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "×";
let gameOver = false;

function drawBoard() {
  let table = document.getElementById("board");
  let html = "";

  for (let i = 0; i < board.length; i++) {
    html += "<tr>";

    for (let j = 0; j < board[i].length; j++) {
      let cell = board[i][j];
      if (cell == "×") {
        html += `<td class="x-cell" onclick="makeMove(${i}, ${j})">${board[i][j]}</td>`;
      }else{
        html += `<td class="o-cell" onclick="makeMove(${i}, ${j})">${board[i][j]}</td>`;
      }
    }

    html += "</tr>";
  }

  table.innerHTML = html;
}

function makeMove(row, col) {
  if (gameOver === true) {
    return;
  }

  if (board[row][col] !== "") {
    return;
  }

  board[row][col] = currentPlayer;

  drawBoard();

  let winner = checkWinner();

  if (winner !== "") {
    document.getElementById("turnText").textContent = "Game Over";
    document.getElementById("message").textContent = currentPlayer + " wins!";
    showWinLine(winner);
    gameOver = true;
    return;
  }

  if (checkTie() === true) {
    document.getElementById("turnText").textContent = "Game Over";
    document.getElementById("message").textContent = "It's a tie!";
    gameOver = true;
    return;
  }

  if (currentPlayer === "×") {
    currentPlayer = "O";
  } else {
    currentPlayer = "×";
  }

  document.getElementById("turnText").textContent =
    "Current Turn: " + currentPlayer;
}

function checkWinner() {
  // row 1
  if (
    board[0][0] !== "" &&
    board[0][0] === board[0][1] &&
    board[0][1] === board[0][2]
  ) {
    return "row1";
  }

  // row 2
  if (
    board[1][0] !== "" &&
    board[1][0] === board[1][1] &&
    board[1][1] === board[1][2]
  ) {
    return "row2";
  }

  // row 3
  if (
    board[2][0] !== "" &&
    board[2][0] === board[2][1] &&
    board[2][1] === board[2][2]
  ) {
    return "row3";
  }

  // column 1
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][0] &&
    board[1][0] === board[2][0]
  ) {
    return "col1";
  }

  // column 2
  if (
    board[0][1] !== "" &&
    board[0][1] === board[1][1] &&
    board[1][1] === board[2][1]
  ) {
    return "col2";
  }

  // column 3
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][2] &&
    board[1][2] === board[2][2]
  ) {
    return "col3";
  }

  // diagonal 1
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return "diag1";
  }

  // diagonal 2
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return "diag2";
  }

  return "";
}

function checkTie() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }

  return true;
}



function resetGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  currentPlayer = "×";
  gameOver = false;

  document.getElementById("turnText").textContent = "Current Turn: ×";
  document.getElementById("message").textContent = "";

  let line = document.getElementById("winLine");
  line.style.display = "none";
  line.style.width = "0";
  line.style.left = "0";
  line.style.top = "0";
  line.style.transform = "rotate(0deg)";

  drawBoard();
}

drawBoard();