import {REVEAL_CELL, TOGGLE_FLAG, START_NEW_GAME} from '../constants/actionType';
import {initializeGameBoard, revealCell, toggleFlagForCell} from '../helpers/board.helper';
import config from '../config.json';

const initialState = {
    board: initializeGameBoard(
        config.defaultWidth, 
        config.defaultHeight, 
        config.defaultNumOfMines
    ),
    width: config.defaultWidth,
    height: config.defaultHeight,
    numOfMines: config.defaultNumOfMines,
    flagsLeft: config.defaultNumOfMines
};

const boardReducer = (state = initialState,  action) => {
    switch (action.type) {
        case REVEAL_CELL:
            const lost = revealCell(state, action.payload.cell);
    
            if (lost) {
                alert('you lose!');
            }

            return state;
        case TOGGLE_FLAG:
            toggleFlagForCell(state, action.payload.cell);

            return state;
        case START_NEW_GAME:
            const newBoard = initializeGameBoard(
                action.payload.width, 
                action.payload.height, 
                action.payload.numOfMines
            );

            return {board: newBoard, numOfMines: action.payload.numOfMines, flagsLeft: action.payload.numOfMines};
        default:
            return state;
    }
}

export default boardReducer;