import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Square = ({color}) => (
	<div
		className={classNames('board__square', `board__square_color_${color}`)}
	/>
);

Square.propTypes = {
	color: PropTypes.string,
};

export default Square;