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

    // Populate the cells with mines and corresponding numbers
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
    
        // If there is no mine at that place, place one
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
            const sorroundingCell = 
                getCellAtIndex(board, cell.rowIndex + i, cell.colIndex + j);

            // If it is not the current cell and not outside the borders add it
            if ((i !== 0 || j !== 0) && sorroundingCell) {
                sorroundingCells.push(sorroundingCell);
            }
        }
    }

    return sorroundingCells;
}

function countMinesAroundCell(board, cell) {
    const sorroundingCells = getSorroundingCells(board, cell);

    // Filter sorrounding cells to include only mines and return length
    return sorroundingCells.filter(cell => cell.value === -1).length;
}

function populateNumberCells(board) {
    const [width, height] = getBoardSize(board);

    // For each non-mine cell calculate its value
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
        for (let colIndex = 0; colIndex < height; colIndex++) {
            const cell = board[rowIndex][colIndex];

            if (cell.value !== -1) {
                cell.value = countMinesAroundCell(board, cell);
            }
        }
    }
}

function revealSorroundingCells(board, cell) {
    // Initialize a stack and the current cell
    let stack = [];
    let currCell = cell;

    // While there are cells in the stack
    while (currCell) {    
        const sorroundingCells = getSorroundingCells(board, currCell);

        // For each sorrounding cell if the value is 0 push it to the stack and reveal it
        for (let sorroundingCell of sorroundingCells) {
            if (sorroundingCell.value === 0 && !sorroundingCell.revealed) {
                stack.push(sorroundingCell);
            }

            sorroundingCell.revealed = true;
            board[sorroundingCell.rowIndex][sorroundingCell.colIndex] = {...sorroundingCell};
        }

        currCell = stack.pop();
    }    
}

export function revealCell(board, cell) {
    // If the cell is not revealed or flagged, reveal it
    if (!cell.revealed && !cell.flagged) {
        cell.revealed = true;
        board[cell.rowIndex][cell.colIndex] = {...cell};

        // If the cell value is 0 reveal the sorrounding cells
        if (cell.value === 0) {
            revealSorroundingCells(board, cell);
        }
    }
}

export function toggleFlagForCell(board, cell) {
    // Change flag status
    cell.flagged = !cell.flagged;
    board[cell.rowIndex][cell.colIndex] = {...cell};
}