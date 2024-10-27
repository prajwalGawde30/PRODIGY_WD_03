const board = document.getElementById("board");
const message = document.getElementById("message");
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations for Tic-Tac-Toe
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell clicks
function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (gameBoard[index] === "" && isGameActive) {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    switchPlayer();
  }
}

// Switch player after each turn
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `${currentPlayer}'s turn`;
}

// Check for winner or tie
function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      isGameActive = false;
      message.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    isGameActive = false;
    message.textContent = "It's a tie!";
  }
}

// Reset the game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  message.textContent = `${currentPlayer}'s turn`;
  Array.from(board.children).forEach(cell => cell.textContent = "");
}

// Add click event listeners to cells
Array.from(board.children).forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

resetGame();  // Initialize the game
