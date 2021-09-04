'use strict';

// clubs, diamonds, hearts, spades.

let deck = [];
let suits = ['C', 'D', 'H', 'S'];
let specials = ['A', 'J', 'Q', 'K'];
let playerPoints = 0;
let computerPoints = 0;

// HTML

// BTNS
const hitBtn = document.querySelector('#hitBtn');
const stopBtn = document.querySelector('#stopBtn');
const startBtn = document.querySelector('#startBtn');

// PLAYERS
const playerScore = document.querySelector('#playerScore span');
const playerCards = document.querySelector('#player-cards');
const computerScore = document.querySelector('#computerScore span');
const computerCards = document.querySelector('#computer-cards');


const createDeck = () => {

    for(const suit of suits) {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + suit)
        }

        for (const special of specials) {
            deck.push(special + suit)
        }
    }
    deck = _.shuffle(deck);

    return deck;
}

createDeck();

const hitCard = () => {

    // If we hadn't used the underscore.js library for shuffling the array, this would be an ok solution as it gets a random item from the array of cards and then, remove it from the array.

    // let random = Math.floor(Math.random() * deck.length);
    // let randomCard = deck[random];
    // deck = deck.filter(card => card !== randomCard);

    if (deck.length === 0) {
        throw 'No more cards here'
    }

    let card = deck.pop();
    return card;
}

const getCardValue = (card) => {
    let value = card.substring(0, card.length -1);

    return value = isNaN(value) ?
        value === 'A' ? 11 : 10
        : parseInt(value);
}

// Computer's hand

const computerHand = (minScore) => {

    do {
        const card = hitCard();
        computerPoints = computerPoints + getCardValue(card);
    
        // Changes score
            computerScore.innerHTML = computerPoints;
    
        // Generate card
            const cardImg = document.createElement('img');
            cardImg.src = `./assets/cards/${card}.png`;
            cardImg.classList.add('card');
            computerCards.append(cardImg);

            if(minScore > 21) {
                break;
            }
    } while (
        (computerPoints < minScore) && (minScore <= 21)
    )

    setTimeout(() => {
        if(computerPoints === minScore) {
            alert('Empate')
        } else if(minScore > 21) {
            alert('Gana la casa')
        } else if (computerPoints > 21) {
            alert('You win');
        } else {
            alert('Gana la casa');
        }
    })
  
}


const handleGetCard = () => {
    const card = hitCard();
    const value = getCardValue(card);
    playerPoints = playerPoints + value;

// Changes score
    playerScore.innerHTML = playerPoints;

// Generate card
    const cardImg = document.createElement('img');
    cardImg.src = `./assets/cards/${card}.png`;
    playerCards.append(cardImg);

    // Win or lose game

    if(playerPoints > 21) {
        console.warn('Sorry, you lose, dear.')
        hitBtn.disabled = true;
        stopBtn.disabled = true;
        computerHand(playerPoints);
    } else if(playerPoints === 21) {
        console.warn('21, you win!');
        hitBtn.disabled = true;
        stopBtn.disabled = true;
        computerHand(playerPoints);
        
    }
}

const handleStopBtn = () => {
    hitBtn.disabled = true;
    stopBtn.disabled = true;
    computerHand(playerPoints);
}

const handleRestart = () => {

    deck = [];
    deck = createDeck();
    playerPoints = 0;
    computerPoints = 0;

    hitBtn.disabled = false;
    stopBtn.disabled = false;

    playerCards.innerHTML = '';
    computerCards.innerHTML = '';

    computerScore.innerHTML = '0';
    playerScore.innerHTML = '0';
}


hitBtn.addEventListener('click', handleGetCard);
stopBtn.addEventListener('click', handleStopBtn);
startBtn.addEventListener('click', handleRestart);

