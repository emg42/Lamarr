let button = document.querySelector("button");
button.addEventListener("click", playHand);

let playerCardDiv = document.querySelector("#player-card");
let compCardDiv = document.querySelector("#computer-card");
let playerDeckDiv = document.querySelector("#player-deck");
let compDeckDiv = document.querySelector("#computer-deck");


function createDeck() {
  let deck = [];
  let suites = ["H", "D", "S", "C"];

  for (let j = 0; j < suites.length; j++) {
    for (let i = 2; i < 11; i++) {
      deck.push({"name":i + suites[j], "value": i});
    }
    deck.push({"name":"J" + suites[j], "value": 11});
    deck.push({"name":"Q" + suites[j], "value": 12});
    deck.push({"name":"K" + suites[j], "value": 13});
    deck.push({"name":"A" + suites[j], "value": 14});
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
  console.log(deck);
  return(deck);
}

let freshDeck = createDeck();

let compDeck = freshDeck.slice(0,26);
let playerDeck = freshDeck.slice(26);

let warDeck = [];

function war(p, c) {
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
  compDeckDiv.innerHTML = `<h1>WAR!</h1>`;
  playerDeckDiv.innerHTML = `<h1>WAR!</h1>`;
}

function playHand() {
  let playerCard = playerDeck.pop();
  let compCard = compDeck.pop();

  if (playerCard.value > compCard.value) {
    playerDeck.unshift(playerCard, compCard);
    if (warDeck.length) {
      for (let i = 0; i < warDeck.length; i++) {
        playerDeck.unshift(warDeck[i]);
      }
      warDeck = [];
    }
    playerDeckDiv.innerHTML = `<h1>Player Wins!</h1>`;
    compDeckDiv.innerHTML = "";
  } else if (compCard.value > playerCard.value) {
    compDeck.unshift(compCard, playerCard);
    if (warDeck.length) {
      for (let i = 0; i < warDeck.length; i++) {
        compDeck.unshift(warDeck[i]);
      }
      warDeck = [];
    }
    compDeckDiv.innerHTML = `<h1>Computer Wins!</h1>`;
    playerDeckDiv.innerHTML = "";
  } else {
    if (playerDeck.length && compDeck.length) {
      war(playerCard, compCard);
    }
  }
  playerCardDiv.innerHTML = `<h1>${playerCard.name}</h1>
    <br>
    <h1>${playerDeck.length}</h1>
    `;
  compCardDiv.innerHTML = `<h1>${compCard.name}</h1>
    <br>
    <h1>${compDeck.length}</h1>
    `;
}
