let dimenstions = 6;
let gameOver = false;
let board = [];

let colSize = 0;
let rowSize = 6;

let countScore = 0;
let bestScore = 0;

let currentSum = 0;

let playerName;

let level;

let winAudio = new Audio();
winAudio.src = "./sound/win.mp3";

let clickAudio = new Audio();
clickAudio.src = "./sound/click.mp3";

let gameOverAudio = new Audio();
gameOverAudio.src = "./sound/over.mp3";

let musicAudio = new Audio();
musicAudio.src = "./sound/music.mp3";
musicAudio.volume = 0.2;

let musicOn = false;

const playMusic = (swtch) => {
  if(swtch) {
    musicAudio.play();
  } else {
    musicAudio.pause();
  }
  musicAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, swtch);
  //musicAudio.play();
};


const checkMusic = () => {
  if(musicOn) {
    document.getElementById('stop').classList.add('hide');
    document.getElementById('play').classList.remove('hide');
    playMusic(false);
    musicOn = false;
  } else {
    document.getElementById('play').classList.add('hide');
    document.getElementById('stop').classList.remove('hide');
    playMusic(true);
    musicOn = true;
  }
};


let musicBtn = document.getElementById('music_btn');
musicBtn.addEventListener('click', checkMusic);


const getTarget = () => {
  return Math.ceil(10 + Math.random() * 60);
};

let target;

const updateTarget = () => {
  target = getTarget();
  document.getElementById("target").innerHTML = target;
};

const updateCurrentSum = () => {
  document.getElementById("current_sum").innerHTML = currentSum;
};

const updateScore = () => {
  document.getElementById("score").innerHTML = countScore;
};

const updateBestScore = () => {
  document.getElementById("best_score").innerHTML = bestScore;
};

const removeAll = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].selected) {
        board[i][j].value = "";
        board[i][j].selected = !board[i][j].selected;
      }
    }
  }
};

const shiftValues = () => {
  //console.log(`In newShift Colsize ${colSize}`);
  for (let i = 0; i < colSize; i++) {
    if (board[i].every((el) => el === "")) {
      //console.log(`Poping this row ${i}`);
      board.splice(i, 1); // remove empty rows first
      colSize -= 1;
    }
  }
  const shift = (j, i) => {
    //console.log(`Clear here ${i}, ${j}`);
    if (j < colSize) {
      let x = j;
      while (board[j - 1][i].value === "" && j < colSize) {
        //console.log(`Shifting here ${j-1}, ${i} getting val from ${j} ${i}`);
        //console.log(`Value : ${board[j][i].value}`);
        let m = j;
        while (board[m - 1][i].value === "" && m < colSize) {
          m++;
        }
        //console.log(`Vlaue of M ${m}`);
        board[j - 1][i].value = board[m - 1][i].value;
        board[m - 1][i].value = "";
        j += 1;
      }
      shift(x + 1, i);
    } else if (i + 1 < board[0].length) {
      //console.log(`Changing Col here ${i+1} passing`);
      shift(1, i + 1);
    } else {
      return;
    }
  };
  shift(1, 0); // j is row and i is col
};

const deselectAll = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].selected) {
        board[i][j].selected = false;
      }
    }
  }
};

const handleClick = (cell) => {
  if (cell.innerText === "" || gameOver) {
    // add gameOver too here
    return;
  }

  let i = parseInt(cell.id[0]);
  let j = parseInt(cell.id[1]);
  //console.log(i, j); // improve this method
  board[i][j].selected = !board[i][j].selected;

  if (board[i][j].selected) {
    cell.classList.add("selected");
    currentSum += parseInt(cell.innerHTML);
  } else if (cell.classList.contains("selected")) {
    cell.classList.remove("selected");
    currentSum -= parseInt(cell.innerHTML);
  }

  checkSum();
  updateCurrentSum();
  updateBoard();
  clickAudio.play()
};

const createCells = () => {
  let allCells = document.getElementById("all_cell");
  for (let i = 0; i < dimenstions; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row anti-row");
    for (let j = 0; j < dimenstions; j++) {
      let cell = document.createElement("div");
      cell.id = `${i}${j}`;
      cell.setAttribute("class", "cell");
      cell.addEventListener("click", (event) => handleClick(cell));
      row.appendChild(cell);
    }
    allCells.appendChild(row);
  }
};

const generateRandomValues = () => {
  let generatedValues = [];
  for (let i = 0; i < dimenstions; i++) {
    let obj = {};
    obj["value"] = Math.ceil(Math.random() * 9);
    obj["selected"] = false;
    generatedValues.push(obj);
  }
  board.unshift(generatedValues);
};

const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`${i}${j}`);
      cell.innerHTML = board[i][j].value;

      if (board[i][j].selected) {
        cell.classList.add("selected");
      } else if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
      }
    }
  }
};

const checkSum = () => {
  if (currentSum === target) {
    removeAll();
    shiftValues();
    updateTarget();
    countScore += currentSum;
    bestScore = Math.max(countScore, bestScore);
    updateBestScore();
    updateScore();
    currentSum = 0;
    winAudio.play();
  } else if (currentSum > target) {
    deselectAll();
    updateBoard();
    currentSum = 0;
  }
};

const isGameOver = () => {
  if (board.length !== rowSize) {
    return false;
  }

  //console.log("in GameOver to check");
  for (let i = 0; i < rowSize; i++) {
    if (board[rowSize - 1][i].value !== "") {
      deselectAll();
      document.getElementById("try_btn").classList.remove("hide"); // enable try btn
      return true;
    }
  }

  //console.log("Poping empty row");
  board.pop();
  colSize -= 1;

  return false;
};

let intervalId;

const startTime = (levelTime) => {
  intervalId = setInterval(() => {
    generateRandomValues();
    //console.log(`Col size : ${colSize}`);
    colSize += 1;
    updateBoard();

    if (isGameOver()) {
      gameOver = true;
      clearInterval(intervalId);
      playMusic(false);
      gameOverAudio.play();
      setTimeout(() => {
        alert("Game Over!");
      }, 100);
      return;
    }
  }, levelTime * 1000); // time as per level
};

const delayAtStart = (level_time) => {
  setTimeout(() => {
    generateRandomValues();
    colSize += 1;
    updateBoard();
    startTime(level_time);
  }, 3000); // three second Delay
};

const stopGame = () => {
  if (gameOver) {
    return;
  }
  clearInterval(intervalId);
  alert("Game Over, By Player!");
};

const startGame = () => {
  if (gameOver) {
    return;
  }

  playerName = document.getElementById("player").value;
  if (playerName === "") {
    alert("Player Name Required!");
    return;
  }
  level = document.getElementById("level").value;

  document.getElementById("main_game_container").classList.remove("hide");
  document.getElementById("main_form_container").classList.add("hide");
  createCells();
  updateTarget();
  if (level === "mid") {
    delayAtStart(5);
  } else if (level === "hard") {
    delayAtStart(3);
  } else {
    delayAtStart(7);
  }
  playMusic(true); // to start music
};

// add event listener to try again btn

document
  .getElementById("try_btn")
  .addEventListener("click", () => enableTryAgain());

const emptyAllCells = () => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let cell = document.getElementById(`${i}${j}`);
      cell.innerHTML = "";
      if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
      }
    }
  }
};

const enableTryAgain = () => {
  board = [];
  gameOver = false;
  colSize = 0;
  countScore = 0;
  currentSum = 0;
  updateTarget();
  updateScore();
  updateCurrentSum();
  emptyAllCells();
  if (level === "mid") {
    delayAtStart(5);
  } else if (level === "hard") {
    delayAtStart(3);
  } else {
    delayAtStart(7);
  }
  document.getElementById("try_btn").classList.add("hide"); // disable try btn
  playMusic(true);
};
