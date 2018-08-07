import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Square = ({color, click, x, y}) => (
	<div
		className={classNames('board__square', `board__square_color_${color}`)}
		onClick={() => click(x, y, color)}
	/>
);

Square.propTypes = {
	color: PropTypes.string,
	click: PropTypes.func,
	x: PropTypes.number,
	y: PropTypes.number,
};

export default Square;