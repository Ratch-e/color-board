import React, {Component} from 'react';
import Square from './Square';
import Control from './Control';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cols: 15,
			rows: 15,
			squares: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
			colors: [
				'red', 'green', 'blue', 'yellow', 'violet', 'orange', 'lightblue'
			]
		};
		this.setColors = this.setColors.bind(this);
		this.squareClick = this.squareClick.bind(this);
		this.createBoard = this.createBoard.bind(this);
		this.createControls = this.createControls.bind(this);
	}

	componentDidMount() {
		this.setColors();
	}

	/**
	 * Установка случайных цветов при старте
	 */
	setColors() {
		let newState = {...this.state};
		for (let x = 0; x < this.state.rows; x++) {
			newState.squares[x] = [];
			for (let y = 0; y < this.state.cols; y++) {
				newState.squares[x][y] = this.state.colors[Math.floor(Math.random() * this.state.colors.length)];
			}
		}

		this.setState({squares: newState.squares});
	}

	/**
	 * Генератор клеток
	 * @returns {Array}
	 */
	createBoard() {
		let squares = [];
		for (let x = 0; x < this.state.rows; x++) {
			for (let y = 0; y < this.state.cols; y++) {
				squares.push(
					<Square
						key={squares.length}
						color={this.state.squares[x][y]}
						click={this.squareClick}
						x={x}
						y={y}
					/>
				);
			}
		}
		return squares;
	}

	createControls() {
		let controls = [];
		for (let x = 0; x < this.state.colors.length; x++) {
			controls.push(
				<Control
					color={this.state.colors[x]}
					click={this.squareClick}
					key={x}
				/>
			);
		}
		return controls;
	}

	/**
	 * Выбор цвета
	 * @param color
	 * @returns {null}
	 */
	squareClick(color) {
		let areaBoard = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
		const prevColor = this.state.squares[this.state.rows - 1][0];

		this.checkArea(this.state.squares, areaBoard, this.state.rows - 1, 0, prevColor);

		let newState = {...this.state};
		for (let x = 0; x < this.state.rows; x++) {
			for (let y = 0; y < this.state.cols; y++) {
				if (areaBoard[x][y] === 1) {
					newState.squares[x][y] = color;
				}
			}
		}
		this.setState({squares: newState.squares});

		return null;
	}

	/**
	 * Проверка области для смены цвета
	 * @param colorsBoard
	 * @param areaBoard
	 * @param x
	 * @param y
	 * @param color
	 * @returns {null}
	 */
	checkArea(colorsBoard, areaBoard, x, y, color) {
		if (colorsBoard[x][y] === color && areaBoard[x][y] !== 1) {
			areaBoard[x][y] = 1;
			if (areaBoard[x - 1]) {
				this.checkArea(this.state.squares, areaBoard, x - 1, y, color);
			}
			if (areaBoard[x + 1]) {
				this.checkArea(this.state.squares, areaBoard, x + 1, y, color);
			}
			if (areaBoard[y - 1]) {
				this.checkArea(this.state.squares, areaBoard, x, y - 1, color);
			}
			if (areaBoard[y + 1]) {
				this.checkArea(this.state.squares, areaBoard, x, y + 1, color);
			}
		} else {
			return null;
		}
	}

	render() {
		return (
			<div className="game">
				<div className="board">
					{this.createBoard()}
				</div>
				<div className="controls">
					{this.createControls()}
				</div>
			</div>
		);
	}
}

export default Game;
