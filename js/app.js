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
function moveCounter() {
	count++;
	document.querySelector('.moves').innerHTML= count;
	console.log(count);
};

// event listener for cardDisplay
deck.addEventListener('click', function(evt){
	let cardActive;
	if (evt.target.nodeName === "UL") {
		return false;
	} else if (evt.target.nodeName === "LI") {
		cardActive = evt.target;
	}
	cardDisplay(cardActive);
	cardComparison();
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