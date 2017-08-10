
function createDeck() {
  let deck = [];
  let suites = ["H", "D", "S", "C"];

  for (let j = 0; j < suites.length; j++) {
    for (let i = 2; i < 11; i++) {
      deck.push(i + suites[j]);
    }
    deck.push("J" + suites[j]);
    deck.push("Q" + suites[j]);
    deck.push("K" + suites[j]);
    deck.push("A" + suites[j]);
  }
  return shuffleDeck(deck);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let x = Math.floor(Math.random() * i);
    let temp = deck[x];
    deck[x] = deck[i];
    deck[i] = temp;
  }
  return(deck);
}

function makeValueDeck(deck) {
  let valueDeck = [];
  for (let i = 0; i < deck.length; i++) {
    let num = deck[i].slice(0,1);
    if (num === "A") {
      valueDeck[i] = 14;
    } else if (num === "K") {
      valueDeck[i] = 13;
    } else if (num === "Q") {
      valueDeck[i] = 12;
    } else if (num === "J") {
      valueDeck[i] = 11;
    } else {
      valueDeck[i] = parseInt(deck[i]);
    }
  }
  return valueDeck;
}

let freshDeck = createDeck();
let numDeck = makeValueDeck(freshDeck);

let compDeck = numDeck.slice(0,26);
let playerDeck = numDeck.slice(26);
console.log(compDeck.length);
console.log(playerDeck.length);

let warDeck = [];
let warNum = 0;
let numHands = 0;

function war(p, c) {
  console.log("war");
  warNum += 1;
  warDeck.push(p);
  warDeck.push(c);
  let numCards = 3;
  if (playerDeck.length < 4) {
    numCards = playerDeck.length - 1;
  } else if (compDeck.length < 4) {
    numCards = compDeck.length - 1;
  }
  for (let i = 0; i < numCards; i++) {
    warDeck.push(playerDeck.pop());
    warDeck.push(compDeck.pop());
  }
  playHand();
}

function playHand() {
  numHands += 1;
  let playerCard = playerDeck.pop();
  let compCard = compDeck.pop();
  if (playerCard > compCard) {
    playerDeck.unshift(playerCard, compCard);
    if (warDeck.length) {
      for (let i = 0; i < warDeck.length; i++) {
        playerDeck.unshift(warDeck[i]);
      }
      warDeck = [];
    }
  } else if (compCard > playerCard) {
    compDeck.unshift(compCard, playerCard);
    if (warDeck.length) {
      for (let i = 0; i < warDeck.length; i++) {
        playerDeck.unshift(warDeck[i]);
      }
      warDeck = [];
    }
  } else {
    if (playerDeck.length && compDeck.length) {
      war(playerCard, compCard);
    }
  }
}

while (playerDeck.length > 0 && compDeck.length > 0) {
  playHand();
  console.log(playerDeck.length + " " + compDeck.length);
}
console.log("Num Hands " + numHands + " NumWars " + warNum);
