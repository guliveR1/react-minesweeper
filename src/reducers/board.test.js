import boardReducer from './board';
import config from '../config.json';
import {initializeGameBoard} from '../helpers/board.helper';
import {
    TOGGLE_SUPERMAN, 
    START_NEW_GAME,
    REVEAL_CELL,
    TOGGLE_FLAG
} from '../constants/actionType';

describe('Board Reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            board: [
                [
                    {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:0},
                    {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:1},
                    {value:3,revealed:false,flagged:false,rowIndex:0,colIndex:2},
                    {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:3},
                    {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:4}
                ],
                [
                    {value:1,revealed:false,flagged:false,rowIndex:1,colIndex:0}
                    ,{value:2,revealed:false,flagged:false,rowIndex:1,colIndex:1}
                    ,{value:-1,revealed:false,flagged:false,rowIndex:1,colIndex:2}
                    ,{value:2,revealed:false,flagged:false,rowIndex:1,colIndex:3}
                    ,{value:1,revealed:false,flagged:false,rowIndex:1,colIndex:4}
                ],
                [
                    {value:0,revealed:false,flagged:false,rowIndex:2,colIndex:0}
                    ,{value:1,revealed:false,flagged:false,rowIndex:2,colIndex:1}
                    ,{value:2,revealed:false,flagged:false,rowIndex:2,colIndex:2}
                    ,{value:2,revealed:false,flagged:false,rowIndex:2,colIndex:3}
                    ,{value:1,revealed:false,flagged:false,rowIndex:2,colIndex:4}
                ],
                [
                    {value:0,revealed:false,flagged:false,rowIndex:3,colIndex:0},
                    {value:1,revealed:false,flagged:false,rowIndex:3,colIndex:1},
                    {value:2,revealed:false,flagged:false,rowIndex:3,colIndex:2},
                    {value:-1,revealed:false,flagged:false,rowIndex:3,colIndex:3},
                    {value:1,revealed:false,flagged:false,rowIndex:3,colIndex:4}
                ],
                [
                    {value:0,revealed:false,flagged:false,rowIndex:4,colIndex:0},
                    {value:1,revealed:false,flagged:false,rowIndex:4,colIndex:1},
                    {value:-1,revealed:false,flagged:false,rowIndex:4,colIndex:2},
                    {value:2,revealed:false,flagged:false,rowIndex:4,colIndex:3},
                    {value:1,revealed:false,flagged:false,rowIndex:4,colIndex:4}
                ]
            ],
            width: 5,
            height: 5,
            numOfMines: 5,
            flagsLeft: 5,
            flaggedMines: 0,
            superman: false,
            lost: false
        }
    })

    it('Should return default state', () => {
        const newState = boardReducer(undefined, {});

        expect(newState.board.length).toEqual(config.defaultWidth);
        expect(newState.board[0].length).toEqual(config.defaultHeight);
        expect(newState.width).toEqual(config.defaultWidth);
        expect(newState.height).toEqual(config.defaultHeight);
        expect(newState.numOfMines).toEqual(config.defaultNumOfMines);
        expect(newState.flagsLeft).toEqual(config.defaultNumOfMines);
        expect(newState.flaggedMines).toEqual(0);
        expect(newState.superman).toBeFalsy();
        expect(newState.lost).toBeFalsy();
    });

    it('Should start a new game with previous settings', () => {
        const newState = boardReducer(state, {type: START_NEW_GAME, payload: {}});

        expect(newState.board).not.toEqual(state.board);
        expect(newState.board.length).toEqual(state.width);
        expect(newState.board[0].length).toEqual(state.height);
        expect(newState.numOfMines).toEqual(state.numOfMines);
    });

    it('Should reveal number cell', () => {
        const cell = {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:0};
        const newState = boardReducer(state, {type: REVEAL_CELL, payload: {cell}});

        expect(newState.board[cell.rowIndex][cell.colIndex].revealed).toBeTruthy();
    });

    it('Should lose when revealing mine cell', () => {
        const cell = {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:1};
        const newState = boardReducer(state, {type: REVEAL_CELL, payload: {cell}});

        expect(newState.lost).toBeTruthy();
    });

    it('Should reveal sorrounding cells when revealing empty cell', () => {
        const cell = {value:0,revealed:false,flagged:false,rowIndex:3,colIndex:0};
        const newState = boardReducer(state, {type: REVEAL_CELL, payload: {cell}});

        expect(newState.board[1][0].revealed).toBeTruthy();
        expect(newState.board[1][1].revealed).toBeTruthy();
        expect(newState.board[2][0].revealed).toBeTruthy();
        expect(newState.board[2][1].revealed).toBeTruthy();
        expect(newState.board[3][0].revealed).toBeTruthy();
        expect(newState.board[3][1].revealed).toBeTruthy();
        expect(newState.board[4][0].revealed).toBeTruthy();
        expect(newState.board[4][1].revealed).toBeTruthy();
    });

    it('Should not reveal flagged cell', () => {
        const cell = {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:0};
        state = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});
        state = boardReducer(state, {type: REVEAL_CELL, payload: {cell}});

        expect(state.board[cell.rowIndex][cell.colIndex].revealed).toBeFalsy();
    });

    it('Should flag cell and decrease left flags', () => {
        const cell = {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:0};
        const newState = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});

        expect(newState.board[cell.rowIndex][cell.colIndex].flagged).toBeTruthy();
        expect(newState.flagsLeft).toEqual(4);
    });

    it('Should unflag cell and increase left flags', () => {
        const cell = {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:0};
        state = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});
        state = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});

        expect(state.board[cell.rowIndex][cell.colIndex].flagged).toBeFalsy();
        expect(state.flagsLeft).toEqual(5);
    });

    it('Should flag mine, decrease left flags and increase flagged mines', () => {
        const cell = {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:1};
        const newState = boardReducer(state, {
            type: TOGGLE_FLAG, 
            payload: {cell}
        });

        expect(newState.board[cell.rowIndex][cell.colIndex].flagged).toBeTruthy();
        expect(newState.flagsLeft).toEqual(4);
        expect(newState.flaggedMines).toEqual(1);
    });

    it('Should unflag mine, increase left flags and decrease flagged mines', () => {
        const cell = {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:1};
        state = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});
        state = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});

        expect(state.board[cell.rowIndex][cell.colIndex].flagged).toBeFalsy();
        expect(state.flagsLeft).toEqual(5);
        expect(state.flaggedMines).toEqual(0);
    });

    it('Should not flag revealed cell', () => {
        const cell = {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:0};
        state = boardReducer(state, {type: REVEAL_CELL, payload: {cell}});
        state = boardReducer(state, {type: TOGGLE_FLAG, payload: {cell}});

        expect(state.board[cell.rowIndex][cell.colIndex].flagged).toBeFalsy();
        expect(state.flagsLeft).toEqual(5);
    });

    it('Should start a new game with new settings', () => {
        const newState = boardReducer(state, {
            type: START_NEW_GAME, 
            payload: {
                width: 10,
                height: 10,
                numOfMines: 10
            }
        });

        expect(newState.board).not.toEqual(state.board);
        expect(newState.board.length).toEqual(10);
        expect(newState.board[0].length).toEqual(10);
        expect(newState.numOfMines).toEqual(10);
    });

    it('Should change superman status', () => {
        const newState1 = boardReducer(state, {type: TOGGLE_SUPERMAN});
        expect(newState1.superman).toBeTruthy();

        const newState2 = boardReducer(newState1, {type: TOGGLE_SUPERMAN});        
        expect(newState2.superman).toBeFalsy();
    });
});