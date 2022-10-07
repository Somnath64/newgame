'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let scores,activePlayer,currentScore,playing;
// Starting condition
const init = function(){
   scores = [0,0];
   activePlayer = 0;
   currentScore = 0;
   playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

}

init();

const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0 ;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

}

//rolling dice functionality
btnRoll.addEventListener('click',function(){
  if (playing) {
  // Generate ramdom number
  const dice=Math.trunc(Math.random() * 6 )+1;

  //Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //Check for rolled 1
  if(dice !== 1){
    // add dice to current to currentScore
    currentScore += dice;

    //Display the current score in current
    //current0.textContent = currentScore;

    // select the element dynamically
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }else{
    //switch to next player
  switchPlayer();
  }
}
});


btnHold.addEventListener('click',function(){
  if (playing) {

  //Add current score to active player's score;
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // Check the player's score is >= 100;
  if(scores[activePlayer] >= 100){
      // Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

  } else {
  //switch to next player
   switchPlayer();
 }
}
});

btnNew.addEventListener('click',init);
