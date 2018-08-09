import React from 'react';
import {shallow} from 'enzyme';
import Control from './Control';

describe('Элемент управления', () => {
	it('рендерится корректно', () => {
		const component = shallow(<Control/>);
		expect(component.length).toMatchSnapshot();
	});

	it('выбирает нужный класс в зависимости от переданного цвета', () => {
		const component = shallow(<Control color="red"/>);
		expect(component.find('.controls__item').hasClass('controls__item_color_red')).toEqual(true);
	});
});
