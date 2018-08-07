import React from 'react';
import {shallow} from 'enzyme';
import Square from './Square';

describe('Квадрат на поле', () => {
	it('рендерится корректно', () => {
		const component = shallow(<Square/>);
		expect(component.length).toMatchSnapshot();
	});

	it('выбирает нужный класс в зависимости от переданного цвета', () => {
		const component = shallow(<Square color="red"/>);
		expect(component.find('.board__square').hasClass('board__square_color_red')).toEqual(true);
	});
});
