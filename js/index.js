let data = [
{
	cardHead: "Hang Man",
	cardBody: "The word to guess is represented by a row of dashes, representing each letter of the word.",
	url: "./src/Hang Man/index.html"
},
{
	cardHead: "Math Clash",
	cardBody: "Math Clash game is an entertaining game for people who love maths ! ",
	url: "./src/Math Clash/index.html"
},
{
	cardHead: "Tic Tac Toe",
	cardBody: "Tic-tac-toe, noughts and crosses, or Xs and Os is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid.",
	url: "./src/tic-tac-toe/index.html"
},
{
	cardHead: "Bomber Man",
	cardBody: "Bomberman is an arcade-style maze-based video game.",
	url: "./src/Bomber Man/index.html"
},
]


const createCard = (dataObj) => {
	let card = document.createElement('div');
	card.classList.add('card');
	card.classList.add('mr-2');
	let cardhead = document.createElement('div');
	cardhead.classList.add('card-head');
	cardhead.innerHTML = dataObj.cardHead;
	let cardbody = document.createElement('div');
	cardbody.classList.add('card-body');
	cardbody.innerHTML = dataObj.cardBody;
	let cardbtn = document.createElement('div');
	cardbtn.classList.add('card-btn')
	let preview = document.createElement('a');
	preview.classList.add('custom-card-btn');
	preview.href = dataObj.url;
	preview.target = "_blank";
	preview.innerHTML = "PREVIEW";

	cardbtn.appendChild(preview);
	card.appendChild(cardhead);
	card.appendChild(cardbody);
	card.appendChild(cardbtn);
	return card;
};


const createRow = (dataObj_1, dataObj_2) => {
	let row = document.createElement('div');
	row.classList.add('row');
	row.classList.add('mb-4');

	row.appendChild(createCard(dataObj_1));
	row.appendChild(createCard(dataObj_2));

	return row;
};

let exploreBtn = document.getElementById('explore');

let explored = false;
const explore = () => {
	if(explored) {
		return;
	}
	exploreBtn.disabled = true;
	let allCards = document.getElementById('all_cards');
	allCards.classList.remove('hide');
	allCards.classList.add('card-col');
	for(let i=0; i<data.length; i+=2) {
		allCards.appendChild(createRow(data[i], data[i+1]));
	}
	explored = true;
};

exploreBtn.addEventListener('click', explore);
