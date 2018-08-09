import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Control = ({color, click}) => (
	<div
		className={classNames('controls__item', `controls__item_color_${color}`)}
		onClick={() => click(color)}
	/>
);

Control.propTypes = {
	color: PropTypes.string,
	click: PropTypes.func,
};

export default Control;