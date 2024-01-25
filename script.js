document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");
  const messageElement = document.getElementById("message");
  const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  cells.forEach((cell) => boardElement.appendChild(cell));

  function createCell(index) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(index));
    return cell;
  }

  function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== "") {
      return;
    }

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
      endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageElement.textContent = `Player '${currentPlayer}' turn`;
    }
  }

  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        gameBoard[a] !== "" &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      );
    });
  }

  function checkDraw() {
    return gameBoard.every((cell) => cell !== "");
  }

  function endGame(message) {
    gameActive = false;
    messageElement.textContent = message;
  }
});
