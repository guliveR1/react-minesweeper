import React from 'react';
import {mount} from 'enzyme';
import {findByTestAttribute} from '../../helpers/test.helper';
import Cell from '.';
import {Provider} from 'react-redux';
import {revealCell, toggleFlag} from '../../actions/board';
import configureStore from 'redux-mock-store';

const mountCell = (store, rowIndex, colIndex) => {
    return mount(
        <Provider store={store}>
            <Cell rowIndex={rowIndex} columnIndex={colIndex} />
        </Provider>
    );
}

describe('Cell Component', () => {
    describe('Superman off', () => {
        let store;

        beforeEach(()=> {
            const mockStore = configureStore([]);
    
            store = mockStore({
                boardReducer: {
                    board: [
                        [
                            {value:0,revealed:false,flagged:false,rowIndex:0,colIndex:0},
                            {value:1,revealed:false,flagged:false,rowIndex:0,colIndex:1},
                            {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:2},
                            {value:0,revealed:true,flagged:false,rowIndex:0,colIndex:3},
                            {value:2,revealed:true,flagged:false,rowIndex:0,colIndex:4},
                            {value:-1,revealed:true,flagged:false,rowIndex:0,colIndex:5},
                            {value:-1,revealed:false,flagged:true,rowIndex:0,colIndex:6}
                        ]
                    ],
                    superman: false
                }
            });
    
            store.dispatch = jest.fn();
        });
    
        it('Should render without errors', () => {
            const component = mountCell(store, 0, 0);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.length).toEqual(1);
        });
    
        it('Should render with empty text when value is 0', () => {
            const component = mountCell(store, 0, 0);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('');
        });
    
        it('Should render with empty text when value is number and cell no revealed', () => {
            const component = mountCell(store, 0, 1);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('');
        });
    
        it('Should render with empty text when value is mine and cell no revealed', () => {
            const component = mountCell(store, 0, 2);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('');
        });
    
        it('Should render with empty text when value is 0 and cell is revealed', () => {
            const component = mountCell(store, 0, 3);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('');
        });

        it('Should render number when cell is revealed', () => {
            const component = mountCell(store, 0, 4);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('2');
        });

        it('Should render explosion when cell is revealed and a mine', () => {
            const component = mountCell(store, 0, 5);
            const wrapper = findByTestAttribute(component, 'explode');
            
            expect(wrapper.length).toEqual(1);
        });

        it('Should render flag', () => {
            const component = mountCell(store, 0, 6);
            const wrapper = findByTestAttribute(component, 'flag');

            expect(wrapper.length).toEqual(1);
        });

        it('Should dispatch REVEAL_CELL', () => {
            const component = mountCell(store, 0, 0);
            const wrapper = findByTestAttribute(component, 'cell');

            wrapper.simulate('click');

            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith(
                revealCell(store.getState().boardReducer.board[0][0])
            );
        });

        it('Should not dispatch REVEAL_CELL when cell revealed', () => {
            const component = mountCell(store, 0, 3);
            const wrapper = findByTestAttribute(component, 'cell');

            wrapper.simulate('click');

            expect(store.dispatch).toHaveBeenCalledTimes(0);
        });

        it('Should not dispatch REVEAL_CELL when cell flagged', () => {
            const component = mountCell(store, 0, 6);
            const wrapper = findByTestAttribute(component, 'cell');

            wrapper.simulate('click');

            expect(store.dispatch).toHaveBeenCalledTimes(0);
        });

        it('Should dispatch TOGGLE_FLAG', () => {
            const component = mountCell(store, 0, 0);
            const wrapper = findByTestAttribute(component, 'cell');

            wrapper.simulate('click', {shiftKey: true});

            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith(
                toggleFlag(store.getState().boardReducer.board[0][0])
            );
        });

        it('Should not dispatch TOGGLE_FLAG when cell revealed', () => {
            const component = mountCell(store, 0, 3);
            const wrapper = findByTestAttribute(component, 'cell');

            wrapper.simulate('click', {shiftKey: true});

            expect(store.dispatch).toHaveBeenCalledTimes(0);
        });
    });

    describe('Superman on', () => {
        let store;

        beforeEach(()=> {
            const mockStore = configureStore([]);
    
            store = mockStore({
                boardReducer: {
                    board: [
                        [
                            {value:0,revealed:false,flagged:false,rowIndex:0,colIndex:0},
                            {value:2,revealed:false,flagged:false,rowIndex:0,colIndex:1},
                            {value:-1,revealed:false,flagged:false,rowIndex:0,colIndex:2}
                        ]
                    ],
                    superman: true
                }
            });
    
            store.dispatch = jest.fn();
        });
    
        it('Should render with empty text when value is 0', () => {
            const component = mountCell(store, 0, 0);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('');
        });
    
        it('Should render number when cell is not revealed', () => {
            const component = mountCell(store, 0, 1);
            const wrapper = findByTestAttribute(component, 'cell');
            expect(wrapper.text()).toEqual('2');
        });

        it('Should render mine when cell is not revealed and a mine', () => {
            const component = mountCell(store, 0, 2);
            const wrapper = findByTestAttribute(component, 'mine');
            
            expect(wrapper.length).toEqual(1);
        });
    })
});