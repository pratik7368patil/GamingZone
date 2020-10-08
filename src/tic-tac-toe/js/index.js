let players = [];
let board;
let turn = 0;
let he_wi = '';
let player_1 = '';
let player_2 = '';
let no_of_grid = 0;
let grid = document.getElementById('grid');
let celebrate = document.getElementById('celebrate_btn');

let playMode = document.getElementById('play_mode');
let mode;
playMode.addEventListener('change', (event) => {
	mode = event.target.value;
	//console.log(mode);
	if(mode === 'manual') {
		document.getElementById('hidden_player_field').removeAttribute('class', 'hide');
	} else if(mode === 'comp') {
		document.getElementById('hidden_player_field').setAttribute('class', 'hide');
	}
});

let gameOver = false;
let turnElement = document.getElementById("turn");

const createCells = () => {
	for(let i=0; i<no_of_grid; i++) {
		let row = document.createElement('div');
		row.className = 'row';
		for(let j=0; j<no_of_grid; j++) {
			let cell = document.createElement('div');
			cell.className = 'cell';
			cell.style.height = he_wi;
			cell.style.width = he_wi;
			cell.id = `${i}${j}`;
			cell.setAttribute('onclick', 'handleClick(this)');
			row.appendChild(cell);
		}
		grid.appendChild(row);
	}
};

const start = () => {
	player_1 = document.getElementById('player_1').value;
	player_2 = document.getElementById('player_2').value;

	if(player_1.length === 0 || player_2.length === 0) {
		alert("Please select name of players!");
		return;
	}

	if(player_1 === player_2) {
		alert("Players Names should be different!");
		return;
	}

	let no_of_grid_str = document.getElementById('no_of_grid').value;
	no_of_grid = parseInt(no_of_grid_str);

	players.push(player_1);
	players.push(player_2);
	
	//console.log(no_of_grid);

	if(no_of_grid > 10) {
		alert("10 is the Max limit to create Grid!");
		return;
	}
	if(isNaN(no_of_grid)) {
		alert("Please provide valid Grid No. !");
		return;
	}


	if(no_of_grid <= 3) {
		if(screen.width <= 420) {
			he_wi = '80px';
		} else {
			he_wi = '120px';
		}
	} else if(no_of_grid >3 && no_of_grid <= 5) {
		if(screen.width <= 480) {
			he_wi = '50px';
		} else {
			he_wi = '80px';
		}
	} else if(no_of_grid >5 && no_of_grid <= 10) {
		if(screen.width <= 424) {
			if(no_of_grid > 8) {
				alert("8 is the Max limit to create Grid! (for your device)");
				return;
			}
			//console.log("everything good here! 424");
			he_wi = '35px';
		} else if(screen.width <= 480) {
			he_wi = '30px';
			//console.log("everything good here! 480");
		} else if(screen.width <= 770) {
			he_wi = '40px';
			//console.log("everything good here! 770");
		} else {
			//console.log("everything good here! else");
			he_wi = '50px';
		}
	}		     

	//console.log(players);
	// hide form
	document.body.style.backgroundImage = 'none';
	document.getElementById('form_container').setAttribute('class', 'hide');

	createCells();
	createBoard();

	document.getElementById('turn').innerHTML = players[turn%2];
	document.getElementById('player_1').disabled = 'true';
	document.getElementById('player_2').disabled = 'true';
	document.getElementById('no_of_grid').disabled = 'true';
	document.getElementById('start_btn').disabled = 'true';
	document.getElementById('hide_section').className = '';
	//console.log("Calling Computer function");
};

const isWinner = () => {
	// first check for all rows in board and then for col and then for diagonals
	let len = board.length;
	if(turn < len) {
		return false;
	}
	//console.log(board);

	for(let i=0; i<len; i++) {

		if(board[i].every((el) => el === board[i][0] && el !== "")) {
			return true;
		}
		//console.log(`${i} Row clear`);
		let start_col_val = board[0][i];
		let count = 1;
		for(let j=1; j<len; j++) {
			if(start_col_val === board[j][i] && start_col_val !== "") {
				count++;
			}
		}
		//console.log(`${i} Col clear`);
		if(count === len) {
			return true;
		}
	}

	// check for diagonal

	let i = board[0][0];
	let j=0;
	while(j < len) {
		//console.log(`${board[j][j]} diagonal`);
		if(board[0][0] === "") {
			break;
		}
		if(board[j][j] !== i) {
			break;
		} else {
			j++;
		}
	}
	//console.log(`Diagonal clear`);
	//console.log(`${j} j for diagonal`);
	if(j === len) {
		return true;
	}

	let rev_i = 0
	let rev_j = len - 1;
	let rev_val = board[rev_i][rev_j];

	while(rev_i < len) {
		if(board[rev_i][rev_j] === "") {
			break;
		}
		if(rev_val !== board[rev_i][rev_j]) {
			break;
		} else {
			rev_i++;
			rev_j--;
		}
	}
	//console.log(`reverse Diagonal clear`);
	if(rev_i === len) {
		return true;
	}

	return false;
};

let gameStatus = document.getElementById('game_status');

const handleClick = (el) => {
	let value = el.innerHTML;
	if(value !== '' || gameOver) {
		return;
	}

	let id = el.id;
	let i = parseInt(id[0]);
	let j = parseInt(id[1]);

	board[i][j] = turn % 2 === 0 ? 'X' : 'O';
	//console.log(board[i][j]);

	el.style.border = '0px solid gray';
	el.innerHTML = board[i][j];
	turnElement.innerHTML = players[turn%2 === 0 ? 1 : 0];
	turn++;

	if(isWinner()) {
		gameOver = true;
		//document.getElementById('status_main').removeAttribute('class', 'hide');
		celebrate.click();
		gameStatus.innerHTML = `${players[turn%2 === 0 ? 1 : 0]} is the Winner!`;
		//alert(`${players[turn%2]} is the winner of Game`);
		return;
	}

	if(turn === board.length**2) {
		gameOver = true;
		//document.getElementById('status_main').removeAttribute('class', 'hide');
		gameStatus.innerHTML = "Game Over";
		celebrate.click();
		//alert("Match Draw, Please Try again!");
		return;
	}

};


const createBoard = () => {
	board = new Array(no_of_grid).fill('').map(() => new Array(no_of_grid).fill(''));
};

const newGame = () => {
	//document.getElementById('status_main').setAttribute('class', 'hide');
	grid.innerHTML = '';
	turn = 0;
	turnElement.innerHTML = players[turn];
	gameOver = false;
	createBoard();
	createCells();
};
