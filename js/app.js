// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// card array
const card = document.querySelectorAll('.card');
let cards = [...card];

// deck
const deck = document.querySelector('.deck');

// open cards;
let cardOpen = [];

// counters
let count = 0
let matchCount = 0;

const displayStars = document.querySelectorAll(".stars")[0];

// shuffle
function start(){
	var shuffledCards = shuffle(cards);
	shuffledCards.forEach.call(shuffledCards, function(item){
		deck.appendChild(item);
	});
	cards.forEach(function(card) {
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('match');
	});
	cardOpen = [];
	count = 0;
	matchCount = 0;
	document.querySelector('.moves').innerHTML= count;
	starRating = 3;
	displayStars.children[1].style.visibility = "visible";
	displayStars.children[2].style.visibility = "visible";
}
window.onload = start();

function moveCounter() {
	count++;
	document.querySelector('.moves').innerHTML= count;
};

function stars() {
	if (count === 10) {
		displayStars.children[2].style.visibility = "hidden";
		starRating = 2;
		} else if (count === 18) {
			displayStars.children[1].style.visibility = "hidden";
			starRating = 1;
	}
};

// event listeners
document.querySelector('.restart').addEventListener('click', start);

deck.addEventListener('click', function(evt){
	let cardActive;
	if (evt.target.nodeName === "UL") {
		return false;
	} else if (evt.target.nodeName === "LI") {
		cardActive = evt.target;
	} else if (evt.target.nodeName === "I") {
		cardActive = evt.target.parentElement;
	}
	if (cardActive.classList.contains('match') === false && cardActive.classList.contains('open') === false) {
		cardDisplay(cardActive)
		cardComparison();
	}
	stars();
});

function cardDisplay(cardActive) {
	if (cardOpen.length < 2) {
		// push open cards to an array
		cardOpen.push(cardActive);
		// add .open, .show, .disable to display card
		cardActive.classList.add('open');
		cardActive.classList.add('show');
	}
};

function cardComparison() {
	// match comparison
	if (cardOpen.length === 2) {
		if (cardOpen[0].getAttribute('name') === cardOpen[1].getAttribute('name')) {
			match();
		} else {
			noMatch();
		}
		moveCounter();
		cardOpen = [];
	}

	// match success
	function match() {
		cardOpen.forEach(function(card) {
			card.classList.remove('open');
			card.classList.remove('show');
			card.classList.add('match');
		});
	}
	// match fail
	function noMatch() {
		cardOpen.forEach(function(card) {
			setTimeout(function() {
				card.classList.remove('open');
				card.classList.remove('show');
			}, 600);
		});
	}
};