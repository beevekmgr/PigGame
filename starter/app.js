/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();
var lastDice;

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' +dice+ '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		var diceDOM1 = document.querySelector('.dice1');

		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		diceDOM1.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';

		if (dice === 6 && lastDice === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}
		//3. Update the round score if the roll number was NOT 1;
		else if (dice !== 1 && dice1 !== 1){
			//Add score
			var score = dice + dice1;
			roundScore += score;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            console.log(dice+'  ' +dice1)
		} else {
            nextPlayer();
            console.log(dice+'  ' +dice1)
        }
			// document.querySelector('.player-0-panel').classList.remove('active');
			// document.querySelector('.player-1-panel').classList.add('active');
		
		lastDice = dice;
	}
});
document.querySelector('.btn-hold').addEventListener('click', function() {
	//Add CURRENT score to GLOBAl score
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		var winningScore;
		//Undefined, 0, null or "" are COERCED to false
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		//Check if player win the game
		if (scores[activePlayer] >= winningScore) {
			//Winner
			document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;
	//Update the UI
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	
	
}
document.querySelector('.btn-new').addEventListener('click', init);
function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice1').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

//User defined score
