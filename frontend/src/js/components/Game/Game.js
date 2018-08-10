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
			],
			turn: 'Player',
			playerColor: '',
			enemyColor: '',
		};
		this.setColors = this.setColors.bind(this);
		this.squareClick = this.squareClick.bind(this);
		this.createBoard = this.createBoard.bind(this);
		this.createControls = this.createControls.bind(this);
		this.setInitialColors = this.setInitialColors.bind(this);
		this.AILogic = this.AILogic.bind(this);
		this.AIChooseColor = this.AIChooseColor.bind(this);
		this.AIApplyColor = this.AIApplyColor.bind(this);
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

		this.setInitialColors();
	}

	/**
	 * Сохранение изначальных цветов игроков
	 */
	setInitialColors() {
		const playerColor = this.state.squares[this.state.rows - 1][0];
		const enemyColor = this.state.squares[0][this.state.cols - 1];

		if (playerColor !== enemyColor) {
			this.setState({playerColor});
			this.setState({enemyColor});
		} else {
			this.setColors();
		}
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
					/>
				);
			}
		}

		return squares;
	}

	/**
	 * Создание элементов управления
	 * @returns {Array}
	 */
	createControls() {
		let controls = [];
		for (let x = 0; x < this.state.colors.length; x++) {
			if (this.state.colors[x] !== this.state.playerColor && this.state.colors[x] !== this.state.enemyColor) {
				controls.push(
					<Control
						color={this.state.colors[x]}
						click={this.squareClick}
						key={x}
					/>
				);
			}
		}

		return controls;
	}

	/**
	 * Выбор цвета игроком
	 * @param color
	 * @returns {null}
	 */
	squareClick(color) {
		if(this.state.turn === 'Player') {
			const prevColor = this.state.squares[this.state.rows - 1][0];

			let areaBoard = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

			areaBoard = this.checkArea(this.state.squares, areaBoard, this.state.rows - 1, 0, prevColor);

			let newState = {...this.state};
			for (let x = 0; x < this.state.rows; x++) {
				for (let y = 0; y < this.state.cols; y++) {
					if (areaBoard[x][y] === 1) {
						newState.squares[x][y] = color;
					}
				}
			}

			this.setState({squares: newState.squares});
			this.setState({playerColor: color});
			this.setState({turn: 'Enemy'});

			setTimeout(() => {
				this.AILogic();
			}, 1000);

			return null;
		}
	}

	/**
	 * Логика ии
	 * @constructor
	 */
	AILogic() {
		const color = this.AIChooseColor();
		this.AIApplyColor(color);
		this.setState({enemyColor: color});
		this.setState({turn: 'Player'});
	}

	/**
	 * Выбор цвета ии
	 * @returns {string}
	 * @constructor
	 */
	AIChooseColor() {

		let colors = [...this.state.colors];

		const playerColorIndex = colors.indexOf(this.state.playerColor);
		colors.splice(playerColorIndex, 1);
		const enemyColorIndex = colors.indexOf(this.state.enemyColor);
		colors.splice(enemyColorIndex, 1);

		return colors[Math.floor(Math.random() * colors.length)];
	}

	/**
	 * Ход ии
	 * @param color
	 * @constructor
	 */
	AIApplyColor(color) {
		const prevColor = this.state.squares[0][this.state.cols - 1];
		let areaBoard = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
		areaBoard = this.checkArea(this.state.squares, areaBoard, 0, this.state.cols - 1, prevColor);
		let newState = {...this.state};
		for (let x = 0; x < this.state.rows; x++) {
			for (let y = 0; y < this.state.cols; y++) {
				if (areaBoard[x][y] === 1) {
					newState.squares[x][y] = color;
				}
			}
		}

		this.setState({squares: newState.squares});
	}

	/**
	 * Проверка соответствия цвета у прилегающих элементов определения области смены цвета
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
			return areaBoard;
		} else {
			return areaBoard;
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
