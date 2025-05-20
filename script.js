const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;

// Your existing game board structure
const gameboard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;

    /* Return/not allowed to click on the cell if it is already clicked or the game is not active*/
    if (gameboard[row][col] !== 0 || !gameActive) return;

    // Update game state
    gameboard[row][col] = currentPlayer === 'X' ? 1 : 2;

    /*This is for adding the X or O to the cell*/
    cell.textContent = currentPlayer;
    /*This is for changing the color of the cell - Adding the class to the cell*/
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        gameActive = false;
        statusDisplay .textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        statusDisplay .textContent = "Game ended in a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay .textContent = `Player ${currentPlayer}'s turn`;
}


function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2] && gameboard[i][0] !== 0) {
            return true;
        }
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i] && gameboard[0][i] !== 0) {
            return true;
        }
    }
    if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2] && gameboard[0][0] !== 0) {
        return true;
    }
    if (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0] && gameboard[0][2] !== 0) {
        return true;
    }
    return false;
}


function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameboard[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function restartGame() {
    // Reset game board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameboard[i][j] = 0;
        }
    }
    
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay .textContent = `Player ${currentPlayer}'s turn`;
    
    // Clear UI
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);