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

    populateMines(board, numOfMines);
    populateNumberCells(board);

    return board;
}

function getBoardSize(board) {
    return [board.length, board[0].length];
}

function populateMines(board, numOfMines) {
    let remainingMines = numOfMines;
    const [width, height] = getBoardSize(board);

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

function getCellAtIndex(board, rowIndex, colIndex) {
    const [width, height] = getBoardSize(board);

    // Check if the cell is inside the board and return it
    if (rowIndex >= 0 && rowIndex < width && colIndex >= 0 && colIndex < height) {
        return board[rowIndex][colIndex];
    } else {
        return undefined;
    }
}

function getSorroundingCells(board, cell) {
    const sorroundingCells = [];

    // For each index around current cell starting from row-1,col-1
    for (let i = -1; i <= 1; i ++) {
        for (let j = -1; j <= 1; j ++) {
            const sorroundingCell = getCellAtIndex(board, cell.rowIndex + i, cell.colIndex + j);

            // If it is not the current cell and not outside the borders add it
            if ((i !== 0 || j !== 0) && sorroundingCell) {
                sorroundingCells.push(sorroundingCell);
            }
        }
    }

    return sorroundingCells;
}

function countBombsAroundCell(board, cell) {
    const sorroundingCells = getSorroundingCells(board, cell);

    // Filter sorrounding cells to include only bombs and return length
    return sorroundingCells.filter(cell => cell.value === -1).length;
}

function populateNumberCells(board) {
    const [width, height] = getBoardSize(board);

    // For each non-bomb cell calculate its value
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
        for (let colIndex = 0; colIndex < height; colIndex++) {
            const cell = board[rowIndex][colIndex];

            if (cell.value !== -1) {
                cell.value = countBombsAroundCell(board, cell);
            }
        }
    }
}

function revealAll(board) {
    // Iterate through the board and reveal the cells
    for (let row of board) {
        for (let cell of row) {
            cell.revealed = true;
        }
    }
}

function revealSorroundingCells(board, cell) {
    cell.revealed = true;

    const sorroundingCells = getSorroundingCells(board, cell);
    sorroundingCells.forEach((sorroundingCell) => {
        revealCell(board, sorroundingCell);
    });
}

export function revealCell(board, cell) {
    // If the cell is not revealed, reveal it
    if (!cell.revealed) {
        // If the cell contains a bomb reveal all and return true
        if (cell.value === -1) {
            revealAll(board);
            
            return true;
        } else if(cell.value === 0) {
            revealSorroundingCells(board, cell);

            return false;
        } else {
            cell.revealed = true;

            return false;
        }
    }
}

export function flagCell(cell) {
    // Change the flag status if its not revealed
    if (!cell.revealed) {
        cell.flagged = !cell.flagged;
    }
}