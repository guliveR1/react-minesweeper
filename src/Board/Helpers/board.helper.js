export function initializeGameBoard(width, height, numOfMines) {
    // Initialize an empty matrix of size width x height
    const board = Array.from({length: width}, (_, rowIndex) => {
        return Array.from({length: height}, (_, colIndex) => ({
            value: 0,
            revealed: false,
            flagged: false,
            rowIndex,
            colIndex
        }));
    });

    populateMines(board, width, height, numOfMines);
    populateNumberCells(board, width, height);

    return board;
}

function populateMines(board, width, height, numOfMines) {
    let remainingMines = numOfMines;

    // Run while there are mines to place
    while (remainingMines > 0) {
        // Generate random row and column
        let rowIndex = Math.floor(Math.random() * width);
        let colIndex = Math.floor(Math.random() * height);
    
        // If there is no bomb at that place, place one
        if (board[rowIndex][colIndex].value !== -1) {
            board[rowIndex][colIndex].value = -1;
            remainingMines--;
        }
    };
}

function getCellValue(board, width, height, rowIndex, colIndex) {
    // Check if the cell is inside the board and return its value.
    if (rowIndex > 0 && rowIndex < width && colIndex > 0 && colIndex < height) {
        return board[rowIndex][colIndex].value;
    } else {
        return 0;
    }
}

function countBombsAroundCell(board, width, height, rowIndex, colIndex) {
    // Add one for each bomb around current cell    
    return (getCellValue(board, width, height, rowIndex - 1, colIndex - 1) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex - 1, colIndex) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex - 1, colIndex + 1) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex, colIndex - 1) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex, colIndex + 1) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex + 1, colIndex - 1) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex + 1, colIndex) === -1 ? 1 : 0) +
        (getCellValue(board, width, height, rowIndex + 1, colIndex + 1) === -1 ? 1 : 0);
}

function populateNumberCells(board, width, height) {
    // For each non-bomb cell calculate its value
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
        for (let colIndex = 0; colIndex < height; colIndex++) {
            if (board[rowIndex][colIndex].value !== -1) {
                board[rowIndex][colIndex].value = countBombsAroundCell(board, width, height, rowIndex, colIndex);
            }
        }
    }
}

export function revealCell(board, rowIndex, colIndex) {
    board[rowIndex][colIndex].revealed = true;
}