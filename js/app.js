// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
// deck
const deck = document.querySelector('.deck'),
// card array
card = document.querySelectorAll('.card');
let cards = [...card],
// open cards;
cardOpen = [],
// counters
count = 0,
matchCounter = 0;
// stars display
const displayStars = document.querySelectorAll('.stars')[0],
// timer
timer = document.querySelector('.timer');
let second = 0,
minute = 0,
finalSecond,
finalMinute,
interval,
timerOn = false;
// start timer
function startTimer() {
	second = 1;
	interval = setInterval(function() {
		// update page html with timer
		timer.innerHTML = minute + ' mins ' + second + ' secs';
		second++;
		// increment minutes by 1 and reset seconds to 0
		if (second == 60) {
			minute++;
			second = 0;
		}
		// run every second
	}, 1000);
}
// stop timer
function stopTimer() {
	// captures final minute and second once cards match
	finalSecond = second;
	finalMinute = minute;
	// clears the current time
	clearInterval(interval);
}
// Modal
const modal = document.querySelector('#win-modal'),
// modal moves
	modalMoves = document.querySelector('.modal-moves'),
// close button
	closeButton = document.querySelector('.close-modal');
// close modal
closeButton.onclick = function() {
	modal.style.display = 'none';
};
// close on click outside of modal
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
// star ratings
let starRating;
// start/restart
function start() {
	// shuffle card elements and append them to UL
	var shuffledCards = shuffle(cards);
	shuffledCards.forEach.call(shuffledCards, function(item) {
		deck.appendChild(item);
	});
	// stop timer
	stopTimer();
	// reset flipped cards by removing .open, .show, .match
	cards.forEach(function(card) {
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('match');
	});
	// reset open cards
	cardOpen = [];
	// reset moves and matches
	count = 0;
	matchCounter = 0;
	// reset html page count
	document.querySelector('.moves').innerHTML = count;
	// reset star rating
	starRating = 3;
	// reset html page star rating
	displayStars.children[1].style.visibility = 'visible';
	displayStars.children[2].style.visibility = 'visible';
	// reset timer
	let timer = document.querySelector('.timer');
	// reset html page timer
	timer.innerHTML = '0 mins 0 secs';
	// stop timer from counting
	timerOn = false;
	// hide the modal
	modal.style.display = 'none';
}
// reset and shuffle on page load
window.onload = start();
// move counter
function moveCounter() {
	// increment 1 move count
	count++;
	// update the html on page for move count
	document.querySelector('.moves').innerHTML = count;
}
// stars
function stars() {
	// hide the last star on page when move count is 10
	if (count === 10) {
		displayStars.children[2].style.visibility = 'hidden';
		// update star rating count to 2
		starRating = 2;
		// hide 2nd star when move count is 18
	} else if (count === 18) {
		displayStars.children[1].style.visibility = 'hidden';
		// update star rating to 1
		starRating = 1;
	}
}
// win
function win() {
	// run at 8 matches
	if (matchCounter === 8) {
		// stop current timer
		stopTimer();
		// display the modal
		modal.style.display = 'block';
		// update modal html with move count
		modalMoves.innerHTML = count;
		// update modal html with time
		document.querySelectorAll('.modal-time')[0].innerHTML = `Your time was ${finalMinute} min ${finalSecond} sec.`;
		// update modal html with star rating
		const starsEarned = document.querySelectorAll('.stars')[0].innerHTML;
		document.querySelectorAll('.modal-stars')[0].innerHTML = starsEarned;
	}
}
// restart and reset event listeners
document.querySelector('.restart').addEventListener('click', start);
document.querySelector('.play-again').addEventListener('click', start);
// card handler
deck.addEventListener('click', function(evt) {
	let cardActive;
	// avoid activating for ul elements
	if (evt.target.nodeName === 'UL') {
		return false;
		// activate for li and img elements
	} else if (evt.target.nodeName === 'LI') {
		// if li is clicked pass li as event target
		cardActive = evt.target;
	} else if (evt.target.nodeName === 'IMG') {
		// if img is clicked pass parent which is the li
		cardActive = evt.target.parentElement;
	}
	// does not contain .match AND .open
	if (cardActive.classList.contains('match') === false && cardActive.classList.contains('open') === false) {
		// if timer has been activated before start
		if (timerOn === false) {
			timerOn = true;
			startTimer();
		}
		// display card
		cardDisplay(cardActive);
		// compare cards
		cardComparison();
	}
	// increment and log stars
	stars();
	// check for win
	win();
});
// card flip
function cardDisplay(cardActive) {
	if (cardOpen.length < 2) {
		// push open cards to an array
		cardOpen.push(cardActive);
		// add .open, .show to clicked card
		cardActive.classList.add('open');
		cardActive.classList.add('show');
	}
}
// match comparison
function cardComparison() {
	// if two cards open
	if (cardOpen.length === 2) {
		// compare open card's image alt
		cardOpen[0].querySelector('img').getAttribute('alt') === cardOpen[1].querySelector('img').getAttribute('alt')
		? match() : noMatch();
		// increment moves
		moveCounter();
		// reset open cards array
		cardOpen = [];
	}
	// match success
	function match() {
		// remove .open, .show and add .match to open cards
		cardOpen.forEach(function(card) {
			card.classList.remove('open');
			card.classList.remove('show');
			card.classList.add('match');
		});
		// increment match count by 1
		matchCounter++;
	}
	// match fail
	function noMatch() {
		// remove .open, .show from open cards after short pause
		cardOpen.forEach(function(card) {
			setTimeout(function() {
				card.classList.remove('open');
				card.classList.remove('show');
			}, 600);
		});
	}
}