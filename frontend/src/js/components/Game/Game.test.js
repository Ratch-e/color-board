import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';

describe('Основное окно игры', () => {
	it('рендерится корректно', () => {
		const component = shallow(<Game/>);
		expect(component.length).toMatchSnapshot();
	});

	it('Устанавливает случайные цвета', () => {
		const component = shallow(<Game/>);
		expect(component.state().colors[0][0].length).toBeGreaterThan(0);
	});
});
