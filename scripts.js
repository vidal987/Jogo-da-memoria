const cards = document.querySelectorAll('.memory-card');

let hasFlipperdCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if( lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlipperdCard){
        hasFlipperdCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click' , flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard () {
    [hasFlipperdCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12 );
        card.styled.order = ramdomPos;
    });
}

cards.forEach(card => card.addEventListener('click', flipCard));