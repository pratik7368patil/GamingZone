// Default values
let huPlayer = '0';
let aiPlayer = 'X';

//what human want to play?
let xBtn = document.getElementById('player_x_id');
let oBtn = document.getElementById('player_o_id');
xBtn.addEventListener('click', getHumanValue , false);
oBtn.addEventListener('click', getHumanValue , false);

function getHumanValue(event) {
  document.getElementById('form').classList.add('hide');
  document.getElementById('grid').classList.remove('hide');
  huPlayer = event.target.value;
  aiPlayer = huPlayer === 'X' ? 'O' : 'X';
}

// main game logic from here
let origBoard;
const winCombos = [
	[0, 1 ,2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector('.endgame').style.display = 'none';
	origBoard = Array.from(Array(9).keys());

	for(let i=0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].style.removeProperty('color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if(typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer);
		if(!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
  document.getElementById(squareId).style.color = player === huPlayer ? 'brown' : '';
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, [])
	let gameWon = null;
	for(let [index, win]  of winCombos.entries()) {
		if(win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index : index, player: player};
			break;
		}
	}

	return gameWon;
}

function gameOver(gameWon) {
	for(let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.color = 'royalblue';
	}

	for(let i=0; i< cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}

	declareWinner(gameWon.player == huPlayer ? 'You Win!' : 'You Lose!', gameWon.player);
}

function declareWinner(who, wonPlayer) {
	document.querySelector('.endgame').style.display = 'block';
	document.querySelector('.endgame .text').innerText = who;
	let xplayer = document.getElementById('x_player');
	let oplayer = document.getElementById('o_player'); 
	if(wonPlayer === huPlayer) {
		let o = oplayer.innerText;
		oplayer.innerText = parseInt(o) + 1;
	} else {
		let x = xplayer.innerText;
		xplayer.innerText = parseInt(x) + 1;
	}
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function checkTie() {
	if(emptySquares().length == 0) {
		for(let i=0; i<cells.length; i++) {
			cells[i].style.color = 'red';
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner('Tie Game');
		return true;
	}

	return false;
}

function minimax(newBoard, player) {
	let availSpots = emptySquares(newBoard);

	if(checkWin(newBoard, player)) {
		return {score: -10};
	} else if(checkWin(newBoard, aiPlayer)) {
		return {score: 20};
	} else if(availSpots.length === 0) {
		return {score: 0};
	}

	let moves = [];

	for(let i=0; i<availSpots.length; i++) {
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;
		if (player == aiPlayer) {
			let result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			let result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}

	let bestMove;
	if(player === aiPlayer) {
		let bestScore = -10000;
		for(let i=0; i<moves.length; i++) {
			if(moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i=0; i<moves.length; i++) {
			if(moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
