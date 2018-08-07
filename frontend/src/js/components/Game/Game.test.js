import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

describe('Основное окно игры', () => {
	it('рендерится корректно', () => {
		const component = shallow(<Game />);
		expect(component.length).toMatchSnapshot();
	});
});
