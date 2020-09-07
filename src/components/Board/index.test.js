import React from 'react';
import {mount} from 'enzyme';
import {findByTestAttribute} from '../../helpers/test.helper';
import Board from '.';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import { initializeGameBoard } from '../../helpers/board.helper';
import config from '../../config.json';

describe('Board Component', () => {
    describe('Normal size board', () => {
        let component;

        beforeEach(() => {
            const mockStore = configureStore([]);

            const store = mockStore({
                boardReducer: {
                    board: initializeGameBoard(config.virtualizeAfter / 10, 10, 10),
                    width: config.virtualizeAfter / 10,
                    height: 10
                }
            });

            component = mount(<Provider store={store}><Board /></Provider>);
        })

        it('Should render without errors', () => {
            const wrapper = findByTestAttribute(component, 'board');
            expect(wrapper.length).toEqual(1);
        });

        it(`Should render ${config.virtualizeAfter / 10} rows`, () => {
            const wrapper = findByTestAttribute(component, 'row');
            expect(wrapper.length).toEqual(config.virtualizeAfter / 10);
        });
    });

    describe('Large virtualized board', () => {
        it('Should render without errors', () => {
            const mockStore = configureStore([]);

            const store = mockStore({
                boardReducer: {
                    board: initializeGameBoard(config.virtualizeAfter, 10, 10),
                    width: config.virtualizeAfter,
                    height: 10
                }
            });

            const component = mount(<Provider store={store}><Board /></Provider>);
            const wrapper = findByTestAttribute(component, 'grid');
            expect(wrapper.length).toEqual(1);
        });
    })
});