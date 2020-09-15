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
}

const handleClick = function(event) {
	if(gameOver) {
		return;
	}

	if(event.target.getAttribute('status') === 'clicked') {
		return;
	}

	clickAudio.play();
	
	let clickedRowidx = event.target.getAttribute('row');
	let clickedColidx = event.target.getAttribute('col');

	for(let idx in blackList) {
		if(blackList[idx].row === clickedRowidx && blackList[idx].col === clickedColidx) {
			event.target.classList.add('wrong');
			gameOver = true;
			explodeAudio.play();
			if(musicStatus) {
				checkMusic();
			}
			showAlert('Game Over');
			return;
		}
	}

	event.target.classList.add('correct');
	scoreTillNow += 10;
	if(scoreTillNow >= 710) {
		showAlert('You Wan the Game');
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

const createAndShowGrid = function(row, col) {
	let grid = document.getElementById('grid');

	for(let i=0; i<row; i++) {
		let makeRow = document.createElement('div');
		makeRow.classList.add('row');
		for(let j=0; j<col; j++) {
			let makeCol = document.createElement('div');
			makeCol.addEventListener('click', (event) => handleClick(event));
			makeCol.setAttribute('row', i);
			makeCol.setAttribute('col', j);
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