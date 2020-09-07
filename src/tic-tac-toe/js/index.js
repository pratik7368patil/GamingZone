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
let prevComp_position = [undefined, undefined];

const choosePosition = (val1, val2) => {
  return Math.random() < 0.5 ? val1 : val2;
};

const chooseBwtPosition = () => (Math.random() * 2).toFixed();

const playComputer = () => {
  let i;
  let j;
  const getcorner = () => {
    let count_r = 0;
    let m = 0;
    while (m < 3) {
      if (board[0][m] === "O") {
        count_r++;
      }
      m++;
    }
    //console.log(`${count_r} Count row 0`);
    if (count_r === 2) {
      i = 0;
      j = 1;
      return;
    }
    let count_r_2 = 0;
    m = 0;
    while (m < 3) {
      if (board[2][m] === "O") {
        count_r_2++;
      }
      m++;
    }
    //console.log(`${count_r_2} Count row 0`);
    if (count_r_2 === 2) {
      i = 2;
      j = 1;
      return;
    }

    let y = 0;
    let count_col_1 = 0;
    while (y < 3) {
      if (board[y][0] === "O") {
        count_col_1++;
      }
      y++;
    }
    //console.log(`${count_col_1} Count col 1`);
    if (count_col_1 === 2) {
      i = 1;
      j = 0;
      return;
    }
    count_col_1 = 0;
    let x = 0;
    while (x < 3) {
      if (board[x][2] === "O") {
        count_col_1++;
      }
      x++;
    }
    //console.log(`${count_col_1} Count col 2`);
    if (count_col_1 === 2) {
      i = 2;
      j = 1;
      return;
    }

    function fun(a, b) {
      if (board[a][b] === "") {
        i = a;
        j = b;
        return;
      }
      fun(choosePosition(0, 2), choosePosition(0, 2));
    }
    fun(choosePosition(0, 2), choosePosition(0, 2));
  };

  const getBlank = () => {
		let count_r = 0;
	    let m = 0;
	    while (m < 3) {
	      if (board[0][m] === "O") {
	        count_r++;
	      }
	      m++;
	    }
	    //console.log(`${count_r} Count row 0`);
	    if (count_r === 2) {
	    	if(board[0][0] === 'O') {
	    		i = 0;
	      		j = 2;
	    	} else {
	    		i = 0;
	      		j = 0;
	    	}
	      	return;
	    }
	    let count_r_2 = 0;
	    m = 0;
	    while (m < 3) {
	      if (board[2][m] === "O") {
	        count_r_2++;
	      }
	      m++;
	    }
	    //console.log(`${count_r_2} Count row 0`);
	    if (count_r_2 === 2) {
	      if(board[2][0] === 'O') {
	    		i = 2;
	      		j = 2;
	    	} else {
	    		i = 2;
	      		j = 0;
	    	}
	      return;
	    }

	    let y = 0;
	    let count_col_1 = 0;
	    while (y < 3) {
	      if (board[y][0] === "O") {
	        count_col_1++;
	      }
	      y++;
	    }
	    //console.log(`${count_col_1} Count col 1`);
	    if (count_col_1 === 2) {
	      if(board[0][0] === 'O') {
	    		i = 2;
	      		j = 0;
	    	} else {
	    		i = 0;
	      		j = 0;
	    	}
	      return;
	    }
	    count_col_1 = 0;
	    let x = 0;
	    while (x < 3) {
	      if (board[x][2] === "O") {
	        count_col_1++;
	      }
	      x++;
	    }
	    //console.log(`${count_col_1} Count col 2`);
	    if (count_col_1 === 2) {
	      if(board[0][2] === 'O') {
	    		i = 2;
	      		j = 2;
	    	} else {
	    		i = 0;
	      		j = 2;
	    	}
	      return;
	    }
	}; 

  if (turn === 0) {
    board[1][1] = "X";
    document.getElementById(`${1}${1}`).innerHTML = "X";
    document.getElementById(`${1}${1}`).style.border = "0px solid gray";
    //console.log("1 move Success!");
    //console.log(board);
    turn++;
    if(isWinner()) {
		gameOver = true;
		//document.getElementById('status_main').removeAttribute('class', 'hide');
		celebrate.click();
		gameStatus.innerHTML = `Computer is the Winner!`;
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
    return;
  } else if (turn === 2) {
    getcorner();
    board[i][j] = "X";
    prevComp_position[0] = i;
    prevComp_position[1] = j;
    document.getElementById(`${i}${j}`).innerHTML = "X";
    document.getElementById(`${i}${j}`).style.border = "0px solid gray";
    //console.log("2 move Success!");
    //console.log(board);
    //console.log(prevComp_position);

    turn++;
    if(isWinner()) {
		gameOver = true;
		//document.getElementById('status_main').removeAttribute('class', 'hide');
		celebrate.click();
		gameStatus.innerHTML = `Computer is the Winner!`;
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
    return;
  } else {
    //console.log("in else part");
    if (
      prevComp_position[0] === 2 &&
      prevComp_position[1] === 2 &&
      board[0][0] === ""
    ) {
      i = 0;
      j = 0;
    } else if (
      prevComp_position[0] === 0 &&
      prevComp_position[1] === 0 &&
      board[2][2] === ""
    ) {
      i = 2;
      j = 2;
    } else if (
      prevComp_position[0] === 0 &&
      prevComp_position[1] === 2 &&
      board[2][0] === ""
    ) {
      i = 2;
      j = 0;
    } else if (
      prevComp_position[0] === 2 &&
      prevComp_position[1] === 0 &&
      board[0][2] === ""
    ) {
      i = 0;
      j = 2;
    } else {
      //console.log("In recursion");
      function fun(a, b) {
	      if (board[a][b] === "") {
	        i = a;
	        j = b;
	        return;
	      }
	      fun(chooseBwtPosition(), chooseBwtPosition());
	  } 
      if (turn < 5) {
        getcorner();
      } else {
      	fun(chooseBwtPosition(), chooseBwtPosition());
      }
    }
    if(board[i][j] === 'O') {
    	getBlank();
    }
    board[i][j] = "X";
    prevComp_position[0] = i;
    prevComp_position[1] = j;
    document.getElementById(`${i}${j}`).innerHTML = "X";
    document.getElementById(`${i}${j}`).style.border = "0px solid gray";
    //console.log("3 move Success!");
    turn++;
    if(isWinner()) {
		gameOver = true;
		//document.getElementById('status_main').removeAttribute('class', 'hide');
		celebrate.click();
		gameStatus.innerHTML = `Computer is the Winner!`;
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
    return;
  }
};

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

	if(mode === 'comp') {
		mode = 'comp';
		//return;
		player_1 = "Computer";
	}

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

	if(no_of_grid > 3 && mode === 'comp') {
		alert("Computer can play with only 3 Grids!");
		return;
	}

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
	if(mode === 'comp') {
		playComputer();
		turnElement.innerHTML = players[1];
	}
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
	if(mode === 'comp') {
		turnElement.innerHTML = players[1];
	} else {
		turnElement.innerHTML = players[turn%2 === 0 ? 1 : 0];
	}
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

	// computer's turn
	if (mode === "comp") {
		playComputer();
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
	if (mode === "comp") {
		playComputer();
		turnElement.innerHTML = players[1];
	}
};