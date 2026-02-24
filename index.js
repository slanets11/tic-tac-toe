const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = [];
let currentPlayer = CROSS; 
let gameOver = false;
let dimension = 3;
startGame();
addResetListener();

function startGame() {
    initBoard(dimension);
    gameOver = false;
    currentPlayer = CROSS;
    renderGrid(dimension);
}

function initBoard(dim) {
    board = Array.from({length: dim }, () => Array(dim).fill(EMPTY));
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (gameOver) return;
    if (board[row][col] !== EMPTY) return;

    board[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer, row, col);

    const winCells = checkWinner();
    if (winCells.length > 0) {
        gameOver = true;
        winCells.forEach(([r, c]) => {
            renderSymbolInCell(board[r][c], r, c, 'red');
        });
        alert(`Победитель: ${currentPlayer}`);
        return;
    }
    
    if (isBoardFull()) {
        gameOver = true;
        alert('Победила дружба');
        return;
    }

    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== EMPTY));
}

function checkWinner() {
    const size = board.length;

    for (let r = 0; r < size; r++) {
        if (board[r][0] !== EMPTY && board[r].every(cell => cell === board[r][0])) {
            return Array.from({ length: size }, (_, c) => [r, c]);
        }
    }

    for (let c = 0; c < size; c++) {
        const first = board[0][c];
        if (first !== EMPTY) {
            let win = true;
            for (let r = 1; r < size; r++) {
                if (board[r][c] !== first) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return Array.from({ length: size }, (_, r) => [r, c]);
            }
        }
    }

    const firstMain = board[0][0];
    if (firstMain !== EMPTY) {
        let win = true;
        for (let i = 1; i < size; i++) {
            if (board[i][i] !== firstMain) {
                win = false;
                break;
            }
        }
        if (win) {
            return Array.from({ length: size }, (_, i) => [i, i]);
        }
    }

    const firstSecondary = board[0][size - 1];
    if (firstSecondary !== EMPTY) {
        let win = true;
        for (let i = 1; i < size; i++) {
            if (board[i][size - 1 - i] !== firstSecondary) {
                win = false;
                break;
            }
        }
        if (win) {
            return Array.from({ length: size }, (_, i) => [i, size - 1 - i]);
        }
    }

    return [];
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    
    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    startGame(); 
}


/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}


/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}