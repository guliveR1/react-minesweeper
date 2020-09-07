import {
    REVEAL_CELL, 
    TOGGLE_FLAG, 
    START_NEW_GAME,
    TOGGLE_SUPERMAN
} from '../constants/actionType';
import {initializeGameBoard, revealCell, toggleFlagForCell} from '../helpers/board.helper';
import config from '../config.json';
import Swal from 'sweetalert2';

const initialState = {
    board: initializeGameBoard(
        config.defaultWidth, 
        config.defaultHeight,
        config.defaultNumOfMines
    ),
    width: config.defaultWidth,
    height: config.defaultHeight,
    numOfMines: config.defaultNumOfMines,
    flagsLeft: config.defaultNumOfMines,
    flaggedMines: 0,
    superman: false,
    lost: false
};

const boardReducer = (state = initialState,  action) => {
    switch (action.type) {
        case REVEAL_CELL:
            revealCell(state.board, action.payload.cell);
    
            // If the cell is a mine set lost as true
            state.lost = action.payload.cell.value === -1 && !action.payload.cell.flagged;

            return state;
        case TOGGLE_FLAG:
            const cell = action.payload.cell;

            if (cell.revealed) return state;

            // Check if there are enough flags left
            if (!cell.flagged && state.flagsLeft === 0) {
                Swal.fire('Oh no!', 'You do not have any more flags to place.', 'error');
                return state;
            }

            // Change flag status
            toggleFlagForCell(state.board, cell);

            // Increase or decrease left flags and flaggedMines depending on the action
            state.flagsLeft += cell.flagged ? -1 : 1;
            state.flaggedMines += cell.value === -1 ? cell.flagged ? 1 : -1 : 0;
            
            return state;
        case START_NEW_GAME:
            const width = action.payload.width || state.width;
            const height = action.payload.height || state.height;
            const numOfMines = action.payload.numOfMines || state.numOfMines;

            const board = initializeGameBoard(width, height, numOfMines);
        
            return {
                board, 
                width,
                height,
                numOfMines, 
                flagsLeft: numOfMines,
                flaggedMines: 0,
                lost: false,
                superman: state.superman
            };
        case TOGGLE_SUPERMAN:
            state.superman = !state.superman;
            
            return state;
        default:
            return state;
    }
}

export default boardReducer;