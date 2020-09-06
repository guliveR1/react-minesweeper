import {
    REVEAL_CELL, 
    TOGGLE_FLAG, 
    START_NEW_GAME, 
    TOGGLE_SUPERMAN
} from '../constants/actionType';

export const revealCell = (cell) => {
    return {
        type: REVEAL_CELL,
        payload: {
            cell
        }
    }
}

export const toggleFlag = (cell) => {
    return {
        type: TOGGLE_FLAG,
        payload: {
            cell
        }
    }
}

export const startNewGame = (width, height, numOfMines) => {
    return {
        type: START_NEW_GAME,
        payload: {
            width,
            height,
            numOfMines
        }
    }
}

export const toggleSuperman = (active) => {
    return {
        type: TOGGLE_SUPERMAN,
        payload: {
            active
        }
    }
}