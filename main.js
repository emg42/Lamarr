
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
  return deck;
}
