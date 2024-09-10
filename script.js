const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningMessageText = document.getElementById('winningMessageText');
const winningMessage = document.getElementById('winningMessage');
const newGameButton = document.getElementById('newGameButton');

const X_CLASS = 'X';
const O_CLASS = 'O';
let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

newGameButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        // Clear any previous marks
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear the text content

        // Reset the event listeners for each cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessage.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    
    // Place the mark (X or O)
    placeMark(cell, currentClass);

    // Check if the game is won
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Swap turns
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    // Add the X or O class to the cell
    cell.classList.add(currentClass);

    // Also set the text content of the cell to "X" or "O"
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O';
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add('show');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
