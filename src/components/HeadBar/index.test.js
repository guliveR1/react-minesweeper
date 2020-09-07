import React from 'react';
import {mount} from 'enzyme';
import {findByTestAttribute, getInputValue} from '../../helpers/test.helper';
import HeadBar from '.';
import {Provider} from 'react-redux';
import {startNewGame, toggleSuperman} from '../../actions/board';
import configureStore from 'redux-mock-store';

describe('HeadBar Component', () => {
    let component, store;

    beforeEach(()=> {
        const mockStore = configureStore([]);

        store = mockStore({
            boardReducer: {
                width: 10,
                height: 10,
                numOfMines: 10,
                flagsLeft: 10,
                superman: false
            }
        });

        store.dispatch = jest.fn();

        component = mount(<Provider store={store}><HeadBar /></Provider>);
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAttribute(component, 'head-bar');
        expect(wrapper.length).toEqual(1);
    });

    it('Should render width input without errors', () => {
        const wrapper = findByTestAttribute(component, 'width-input');
        expect(wrapper.length).toEqual(1);
        expect(getInputValue(wrapper)).toEqual(store.getState().boardReducer.width);
    });

    it('Should render height input without errors', () => {
        const wrapper = findByTestAttribute(component, 'height-input');
        expect(wrapper.length).toEqual(1);
        expect(getInputValue(wrapper)).toEqual(store.getState().boardReducer.height);
    });

    it('Should render mines input without errors', () => {
        const wrapper = findByTestAttribute(component, 'mines-input');
        expect(wrapper.length).toEqual(1);
        expect(getInputValue(wrapper)).toEqual(store.getState().boardReducer.numOfMines);
    });

    it('Should render actions without errors', () => {
        const wrapper = findByTestAttribute(component, 'head-bar-actions');
        expect(wrapper.length).toEqual(1);
    });

    it('Should render superman checkbox without errors', () => {
        const wrapper = findByTestAttribute(component, 'superman-checkbox');
        expect(wrapper.length).toEqual(1);
        expect(wrapper.instance().checked).toEqual(store.getState().boardReducer.superman);
    });

    it('Should render new game button without errors', () => {
        const wrapper = findByTestAttribute(component, 'new-game-button');
        expect(wrapper.length).toEqual(1);
    });

    it('Should render flags left without errors', () => {
        const wrapper = findByTestAttribute(component, 'flags-left');
        expect(wrapper.length).toEqual(1);
    });

    it('Should render 10 flags left', () => {
        const wrapper = findByTestAttribute(component, 'flags-left');
        expect(wrapper.text()).toEqual('Flags left: 10');
    });

    it('Should dispatch NEW_GAME one time with correct values', () => {
        const wrapper = findByTestAttribute(component, 'new-game-button');
        const {width, height, numOfMines} = store.getState().boardReducer;
        
        wrapper.simulate('click');

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            startNewGame(width, height, numOfMines)
        );
    });

    it('Should dispatch TOGGLE_SUPERMAN one time', () => {
        const wrapper = findByTestAttribute(component, 'superman-checkbox');
        
        wrapper.simulate('change');

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            toggleSuperman()
        );
    });
});