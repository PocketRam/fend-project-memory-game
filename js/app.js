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
const card = document.getElementsByClassName('card');
let cards = [...card];

// event listener for cardDisplay
cards.forEach(function(card) {
	card.addEventListener('click', cardDisplay);
});

function cardDisplay() {
	// add .open, .show, .disable to display card
	this.classList.add('open');
	this.classList.add('show');
	this.classList.add('disable');
};