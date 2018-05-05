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
let count = 0;
let matchCounter = 0;

const displayStars = document.querySelectorAll(".stars")[0];

// timer
let second = 0,
minute = 0,
finalSecond,
finalMinute,
interval,
timerOn = false;
const timer = document.querySelector(".timer");
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            minute = 0;
        }
    },1000);
}
// stop timer
function stopTimer() {
	finalSecond = second;
	finalMinute = minute;
	clearInterval(interval);
}

// Modal
const modal = document.querySelector('#win-modal');
// modal moves
const modalMoves = document.querySelector('.modal-moves');
// close button
const closeButton = document.querySelector('.close-modal');
// play again button
const playAgain = document.querySelector('#play-again');
// close modal
closeButton.onclick = function() {
    modal.style.display = "none";
};
// close when clicked outside of modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// star ratings
let starRating;
// start
function start(){
	// shuffle cards
	var shuffledCards = shuffle(cards);
	shuffledCards.forEach.call(shuffledCards, function(item){
		deck.appendChild(item);
	});
	// reset flipped cards
	cards.forEach(function(card) {
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('match');
	});
	// reset open cards
	cardOpen = [];
	// reset moves and matches count
	count = 0;
	matchCounter = 0;
	document.querySelector('.moves').innerHTML= count;
	// reset star rating
	starRating = 3;
	displayStars.children[1].style.visibility = "visible";
	displayStars.children[2].style.visibility = "visible";
	// reset timer
	let timer = document.querySelector('.timer');
	timer.innerHTML = '0 mins 0 secs';
	timerOn = false;
	modal.style.display = 'none';
}
window.onload = start();

function moveCounter() {
	count++;
	document.querySelector('.moves').innerHTML = count;
}

function stars() {
	if (count === 10) {
		displayStars.children[2].style.visibility = "hidden";
		starRating = 2;
		} else if (count === 18) {
			displayStars.children[1].style.visibility = "hidden";
			starRating = 1;
	}
}

// win
function win() {
	if (matchCounter === 8) {
		console.log('win!');
		stopTimer();
		modal.style.display = "block";
		modalMoves.innerHTML = count;
	}
}

// -restart
document.querySelector('.restart').addEventListener('click', start);
document.querySelector('.play-again').addEventListener('click', start);

// -card flip
deck.addEventListener('click', function(evt){
	let cardActive;
	// avoid active for ul elements
	if (evt.target.nodeName === "UL") {
		return false;
	// activate for li and img elements
	} else if (evt.target.nodeName === "LI") {
		cardActive = evt.target;
	} else if (evt.target.nodeName === "IMG") {
		cardActive = evt.target.parentElement;
	}
	// doesn't contain .match AND .open
	if (cardActive.classList.contains('match') === false && cardActive.classList.contains('open') === false) {
		// check if the timer has been activated before start
		if (timerOn === false) {
			timerOn = true;
			startTimer();
		}
		// display card
		cardDisplay(cardActive);
		// compare cards
		cardComparison();
	}
	stars();
	win();
});

function cardDisplay(cardActive) {
	if (cardOpen.length < 2) {
		// push open cards to an array
		cardOpen.push(cardActive);
		// add .open, .show, .disable to display card
		cardActive.classList.add('open');
		cardActive.classList.add('show');
	}
}

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
		matchCounter++;
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
}