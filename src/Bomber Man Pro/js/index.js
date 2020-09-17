let scoreTillNow = 0;
let gameOver = false;
let blackList;
let musicStatus = false;

let clickAudio = new Audio('./sounds/click.mp3');
let explodeAudio = new Audio('./sounds/explode.mp3');
explodeAudio.volume = 0.2;
let musicAudio = new Audio('./sounds/music.mp3');
musicAudio.volume = 0.2;
musicAudio.loop = true;
let winAudio = new Audio('./sounds/win.mp3');
winAudio.volume = 0.3;


const playMusic = function() {
	musicAudio.currentTime = 0;
	musicStatus = true;
	musicAudio.play();
}

const stopMusic = function() {
	musicStatus = false;
	musicAudio.pause();
}

const checkMusic = function() {
	let musicBtn = document.getElementById('music_btn');
	if(musicStatus) {
		musicBtn.style.backgroundImage = "url(./images/playicon.svg)";
		stopMusic();
	} else {
		musicBtn.style.backgroundImage = "url(./images/stopicon.svg)";
		playMusic();
	}
}

// Music Btn Trigger Start Here

let musicBtn = document.getElementById('music_btn');
musicBtn.addEventListener('click', () => checkMusic());

// Music Btn Trigger End Here

const generateRandom = function(limit) {
	return (Math.random() * limit).toFixed();
};

const getRandomIndexes = function(noOfIdx, limit) {
	let obj = {};
	for(let i=1; i< noOfIdx+1; i++) {
		let idxs = {row: generateRandom(limit), col: generateRandom(limit)};
		/*if(idxs in obj) {
			idxs = {row: generateRandom(limit), col: generateRandom(limit)};
		}*/
		obj[i] = idxs;
	}
	return obj;
};

const createAlert = (msg) => {
    let newAlert = document.createElement('div');
    newAlert.classList.add('alert');
    newAlert.setAttribute('id', 'alert');
    let newAlertBody = document.createElement('div');
    newAlertBody.classList.add('alert-body');
    newAlertBody.innerHTML = msg;
    let showScore = document.createElement('div');
    showScore.classList.add('show-score');
    showScore.innerText = `Your Score : ${scoreTillNow}`;

    let btnMain = document.createElement('div');
    btnMain.classList.add('btn-main');

    let tryAgainBtn = document.createElement('button');
    tryAgainBtn.classList.add('alert-btn');
    tryAgainBtn.addEventListener('click', () => startNewGame());
    tryAgainBtn.innerText = "Try Again";

    let exitGame = document.createElement('button');
    exitGame.classList.add('alert-btn');
    exitGame.addEventListener('click', () => {clickAudio.play(); window.location.reload()});
    exitGame.innerText = "Exit Game";
  
    btnMain.appendChild(tryAgainBtn);
    btnMain.appendChild(exitGame);

    newAlertBody.appendChild(showScore);
    newAlertBody.appendChild(btnMain);

    newAlert.appendChild(newAlertBody);
    return newAlert;
};

const showAlert = (msg) => {
    let getAlert = createAlert(msg);
    document.body.appendChild(getAlert);
};

const removeAlert = () => {
	let getAlert = document.getElementById('alert');
	document.body.removeChild(getAlert);
};

const disposeAllBombs = () => {
	for(let idx in blackList) {
		let ele = document.getElementById(`${blackList[idx].row}${blackList[idx].col}`);
		ele.classList.add('wrong');
	}
}

const checkBombs = (row, col) => {
	for(let idx in blackList) {
		if(parseInt(blackList[idx].row) === row && parseInt(blackList[idx].col) === col) {
			return true;
		}
	}
	return false;
}


// We have to find location of all pointes from which dis is equal to 1
// to cuurent point and it's co ordinates must be > 0 and < 8 

const getHint = function(event) {
	let currentRow = parseInt(event.target.getAttribute('data-row'));
	let currentCol = parseInt(event.target.getAttribute('data-col'));
	let count = 0;

	console.log( "Clicked Co ordinates",currentRow, currentCol);

	if(currentRow > 0 && currentCol > 0 && currentCol < 8 && currentRow < 8) {
		// for diagonals
		console.log('Checking Diagonals');
		if(checkBombs(currentRow+1, currentCol+1)) {
			count++;
		}
		if(checkBombs(currentRow-1, currentCol-1)) {
			count++;
		}
		if(checkBombs(currentRow+1, currentCol-1)) {
			count++;
		}
		if(checkBombs(currentRow-1, currentCol+1)) {
			count++;
		}

		console.log('Checking Axis');
		// for axis coordinates
		if(checkBombs(currentRow+1, currentCol)) {
			count++;
		}
		if(checkBombs(currentRow-1, currentCol)) {
			count++;
		}
		if(checkBombs(currentRow, currentCol-1)) {
			count++;
		}
		if(checkBombs(currentRow, currentCol+1)) {
			count++;
		}
	}
	// try to do it for edge cases 
	return count;
};


const handleClick = function(event) {
	if(gameOver) {
		return;
	}

	if(event.target.getAttribute('status') === 'clicked') {
		return;
	}

	clickAudio.play();
	
	let clickedRowidx = event.target.getAttribute('data-row');
	let clickedColidx = event.target.getAttribute('data-col');

	for(let idx in blackList) {
		if(blackList[idx].row === clickedRowidx && blackList[idx].col === clickedColidx) {
			event.target.setAttribute('class', 'wrong');
			event.target.classList.add('col');
			disposeAllBombs();
			gameOver = true;
			explodeAudio.play();
			if(musicStatus) {
				checkMusic();
			}
			showAlert('Game Over');
			return;
		}
	}

	event.target.setAttribute('class', 'correct');
	event.target.classList.add('col');
	event.target.innerText = getHint(event);
	scoreTillNow += 10;
	if(scoreTillNow >= 710) {
		showAlert('You Won the Game');
		winAudio.play();
		gameOver = true;
	}

	event.target.setAttribute('status', 'clicked');
};

const removeMainSection = function() {
	let mainSection = document.getElementById('main_section');
	document.body.removeChild(mainSection);
	grid.classList.remove('hide');
};

const setWarning = function(event) {
	event.target.classList.add('warning');
	event.preventDefault();
}

const createAndShowGrid = function(row, col) {
	let grid = document.getElementById('grid');

	for(let i=0; i<row; i++) {
		let makeRow = document.createElement('div');
		makeRow.classList.add('row');
		for(let j=0; j<col; j++) {
			let makeCol = document.createElement('div');
			makeCol.addEventListener('click', (event) => handleClick(event));
			makeCol.addEventListener('contextmenu', (event) => setWarning(event), false);
			makeCol.id = `${i}${j}`;
			makeCol.setAttribute('data-row', i);
			makeCol.setAttribute('data-col', j);
			makeCol.classList.add('col');
			makeRow.appendChild(makeCol);
		}
		grid.appendChild(makeRow);
	}
};

const startGame = function() {
	removeMainSection();
	clickAudio.play();
	createAndShowGrid(9,9);
	blackList = getRandomIndexes(10, 8);
	checkMusic();
};

const startNewGame = function() {
	clickAudio.play();
	removeAlert();
	let grid = document.getElementById('grid');
	document.body.removeChild(grid);

	gameOver = false;
	scoreTillNow = 0;

	let createGrid = document.createElement('div');
	createGrid.id = 'grid';
	createGrid.classList.add('grid');
	document.body.appendChild(createGrid);

	createAndShowGrid(9,9);
	blackList = getRandomIndexes(10, 8);
	if(!musicStatus) {
		checkMusic();
	}
}

// Start Game Trigger from here

let startBtn = document.getElementById('start_game');
startBtn.addEventListener('click', () => startGame());

// Start Game Trigger End here
