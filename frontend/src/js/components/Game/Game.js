import React, {Component} from 'react';
import Square from './Square';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colors: [
				[],[],[],[],[],[],[],[]
			],
		};
		this.setColors = this.setColors.bind(this);
		this.squareClick = this.squareClick.bind(this);
		this.createBoard = this.createBoard.bind(this);
	}

	componentDidMount() {
		this.setColors();
	}

	/**
	 * Установка случайных цветов при старте
	 */
	setColors() {
		const COLORS = [
			'red', 'green', 'blue'
		];
		const row = 8, col = 8;
		let newState = {...this.state};

		for (let x = 0; x < row; x++) {
			newState.colors[x] = [];
			for (let y = 0; y < col; y++) {
				newState.colors[x][y] = COLORS[Math.floor(Math.random() * COLORS.length)];
			}
		}

		this.setState({colors: newState.colors});
	}

	/**
	 * Генератор клеток
	 * @returns {Array}
	 */
	createBoard() {
		let squares = [];
		const row = 8, col = 8;
		for (let x = 0; x < row; x++) {
			for (let y = 0; y < col; y++) {
				squares.push(<Square key={squares.length} color={this.state.colors[x][y]} click={this.squareClick} x={x} y={y}/>);
			}
		}
		return squares;
	}

	squareClick(x, y, color) {
		let newState = {...this.state};
		newState.colors[0][0] = color;
		this.setState({colors: newState.colors});
		return null;
	}

	render() {
		return (
			<div className="board">
				{this.createBoard()}
			</div>
		);
	}
}

export default Game;
