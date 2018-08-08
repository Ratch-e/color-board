import React, {Component} from 'react';
import Square from './Square';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colors: [[], [], [], [], [], [], [], []],
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
				squares.push(
					<Square
						key={squares.length}
						color={this.state.colors[x][y]}
						click={this.squareClick}
						x={x}
						y={y}
					/>
				);
			}
		}
		return squares;
	}

	squareClick(x, y, color) {
		let areaBoard = [[], [], [], [], [], [], [], []];
		const prevColor = this.state.colors[7][0];

		this.checkArea(this.state.colors, areaBoard, 7, 0, prevColor);

		let newState = {...this.state};
		const row = 8, col = 8;
		for (let x = 0; x < row; x++) {
			for (let y = 0; y < col; y++) {
				if(areaBoard[x][y] === 1) {
					newState.colors[x][y] = color;
				}
			}
		}
		this.setState({colors: newState.colors});

		return null;
	}

	checkArea(colorsBoard, areaBoard, x, y, color) {
		if (colorsBoard[x][y] === color && areaBoard[x][y] !== 1) {
			areaBoard[x][y] = 1;
			if (areaBoard[x - 1]) {
				this.checkArea(this.state.colors, areaBoard, x - 1, y, color);
			}
			if (areaBoard[x + 1]) {
				this.checkArea(this.state.colors, areaBoard, x + 1, y, color);
			}
			if (areaBoard[y - 1]) {
				this.checkArea(this.state.colors, areaBoard, x, y - 1, color);
			}
			if (areaBoard[y + 1]) {
				this.checkArea(this.state.colors, areaBoard, x, y + 1, color);
			}
		} else {
			return null;
		}
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
