let playerCardArray = [];                                //all the cards the player has (26 to start)
let computerCardArray = [];                              //all the cards the computer has (26 to start)

// if (playerCardArray.length === 52) {
//   return "You Win!!!";
// }
// if (computerCardArray.length === 52) {
//   return "The Computer Wins :(";
// }

something.onclick = function() {                         //starts the game based on player action onclick/onsubmit
  let playerCard = playerCardArray.shift();              // assigning cards. Pulled from front of respective arrs
  let computerCard = computerCardArray.shift();

  if (playerCard > computerCard) {                       //if player's card is greater, both cards push to total arr
      playerCardArray.push(playerCard);
      playerCardArray.push(computerCard);
  } // end if
  else if (computerCard > playerCard) {                  //if comp's card is greater, both cards push to total arr
      computerCardArray.push(playerCard);
      computerCardArray.push(computerCard);
  } //end else if
      else {                                                 //if equal, war. Draw 4, last card being compared
        let warHand = [];
        let j = 0;
        while (j < 3) {
          let pullPlayerCard = playerCardArray.shift();
          let pullCompCard = computerCardArray.shift();
          warHand.push(pullPlayerCard);
          warHand.push(pullCompCard);
          j++;
        } //end while
        let playerWarCard = playerCardArray.shift();
        let computerWarCard = computerCardArray.shift();
        if (playerWarCard > computerWarCard) {
          playerCardArray.push(playerWarCard);
          playerCardArray.push(computerWarCard);
          playerCardArray.push(warHand);
        }
        else {
          computerCardArray.push(playerWarCard);
          computerCardArray.push(computerWarCard);
          computerCardArray.push(warHand);
        }
      } // end else
} //end onclick fn
