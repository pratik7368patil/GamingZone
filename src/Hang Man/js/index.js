let started = false;
let player_name;
let life = 5;
let game_over = false;
let count_correct = 0;
let reward_count = 10;

let pressendChar = {};

let keyBoard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

let wordlist = [
  "HANGMAN",
  "AWESOME",
  "NEWTON",
  "SCHOOL",
  "INDIA",
  "BINOD",
  "IRONMAN",
  "NICKFURY",
  "HAMMERTHOR",
  "PASSWORD",
  "USERNAME"
];

let generated_word = "";

const getRandom = () => {
  return (Math.random() * (wordlist.length - 1)).toFixed();
};

const createkeyboard = () => {
  let inputField = document.getElementById("input_field");
  for (let i = 0; i < keyBoard.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < keyBoard[i].length; j++) {
      let keyCell = document.createElement("div");
      keyCell.classList.add("key-cell");
      keyCell.innerHTML = keyBoard[i][j];
      keyCell.addEventListener("click", (event) => handleClick(event));
      row.appendChild(keyCell);
    }
    inputField.appendChild(row);
  }
};

const createCell = (word) => {
  const main_cell = document.getElementById("main_cell");
  for (let i = 0; i < word.length; i++) {
    let cell = document.createElement("div");
    cell.id = `${i}`;
    cell.setAttribute("class", "cell");
    main_cell.appendChild(cell);
  }
};

const start = () => {
  if (started) {
    return;
  }
  player_name = document.getElementById("player");
  if (player_name.value === "") {
    alert("Player Name required!");
    return;
  }
  document.getElementById("main_container_in").setAttribute("class", "hide");
  document.getElementById("main_container").style.background = "#1b1b1b";
  document.getElementById("all_cell").removeAttribute("class", "hide");
  document.getElementById("reward_count").innerHTML = reward_count;
  generated_word = wordlist[getRandom()];
  createCell(generated_word);
  createkeyboard();
  started = true;
  document.getElementById(
    "player_info"
  ).innerHTML = player_name.value.toUpperCase();
  document.getElementById("start_form").remove();
  document.getElementById("start_form_btn").remove();
};

const isWinner = () => {
  if (life > 0 && count_correct === generated_word.length) {
    return true;
  }
  return false;
};

const isGameOver = () => {
  if (life > 0) {
    return false;
  }
  return true;
};

const handleClick = (event) => {
  if (game_over) {
    return;
  }
  if (life === 0) {
    setTimeout(() => alert("Game Over!"), 100);
    return;
  }
  let user_alpha = event.target.innerHTML;

  if (user_alpha in pressendChar) {
    alert("Don't press key multiple times!");
    return;
  }
  pressendChar[user_alpha] = 1;

  let get_index = generated_word.indexOf(user_alpha.toUpperCase());
  let get_all_index = [];

  for (let el = 0; el < generated_word.length; el++) {
    if (generated_word[el] === user_alpha.toUpperCase()) {
      get_all_index.push(el);
    }
  }

  if (get_all_index.length !== 0) {
    for (let i = 0; i < get_all_index.length; i++) {
      document.getElementById(`${get_all_index[i]}`).innerHTML =
        generated_word[get_all_index[i]];
      count_correct++;
      reward_count += 10;
    }
  }
  //console.log(user_alpha.toUpperCase());
  //console.log(get_all_index);

  // if get index === -1 then word not exists remove one life
  // if user_alpha === generated_word and life is > 0 then win

  if (isWinner()) {
    document.getElementById("input_field").setAttribute("class", "hide");
    game_over = true;
    alert("You win the Game!");
    return;
  }
  if (get_index === -1) {
    document.getElementById(`life_${life}`).remove();
    alert("You lost one life!");
    life--;
  }
  if (isGameOver()) {
    document.getElementById("input_field").setAttribute("class", "hide");
    game_over = true;
    alert("Game Over!");
    return;
  }

  document.getElementById("reward_count").innerHTML = reward_count;
  //console.log(get_index);
  //console.log("Clicked");
};

document.getElementById("start_btn").addEventListener("click", start);

// display content from here (all updated)
