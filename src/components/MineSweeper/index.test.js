import React from 'react';
import {shallow} from 'enzyme';
import MineSweeper from '.';

describe('MineSweeper Component', () => {
    it('Should render without errors', () => {
        const component = shallow(<MineSweeper />);
        const wrapper = component.find('[data-test="mine-sweeper"]');
        expect(wrapper.length).toBe(1);
    })
});