//The words in play.
var wordArray = ["marge", "homer", "bart", 
				 "lisa", "maggie", "smithers",
				 "milhouse", "krusty", "moe",
				 "skinner", "flanders", "selma",
				 "apu", "snake", "lenny", 
				 "carl", "patty", "grandpa"];

//RNG 
var wordNumber;

//currentWordArray
//An array made from the currentWord being guessed. Not visible.
var currentWordArray = [];

//The current word in play. Start in order in the wordArray from 0.
var currentWord = wordArray[wordNumber];

//Guessed letters array.
var guessedLetters = [];

//Public guessed letters array
var guessedLettersPublic = [];

//Displayed Word Array. This will always start out as underscore strings, instead of letters.
var displayedWordArray = [];

//Make an array from the alphabet.
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

//Directly changes depending on guessesLeft.
var hangmanPictureArray = [0, 1, 2, 3, 4, 5, 6, 7];

//Start off with 7 guesses.
var guessesLeft = 10;

//Only run the initial new game once when a key is pressed for the first time
var newGameVar = true;

//Tracking WINS
var wins = 0;

var numbersUsed = [];

//Document.ready equivalent
document.addEventListener("DOMContentLoaded", function(event) { 
	//Play the "Any Key" wav file.
	document.getElementById('anyKeySound').play();
})


//Key Input Event
document.onkeyup = function(event) {

	//Only runs the first time. newGame makes itself false after the first run.
	if ( newGameVar ) {

		//Run the new game function.
		newGame();
	}
	
	//Runs every time a key is unpressed. Updates # of guesses left in the HTML.
	updateGuessesLeft();

	//Set a new variable, keyHit and set it to lowercase of the event.key
    var keyHit = event.key.toLowerCase();

    var keyHitIndex = alphabet.indexOf(keyHit);

    //if they key pressed is NOT in the alphabet array do this...
    if(keyHitIndex === -1) {

    	//Log the key pressed.
      	console.log("You pressed the '" + event.key + "' key.");

      	//Log that the key pressed was not accepted into Hangman.
      	console.log("This is not accepted into Hangman.");
    }
    else {
    	
    	//The key was a valid a-z key. Log this.
    	console.log("You pressed the '" + event.key + "' key.")

		//If the typed letter is NOT in the list of guessed letters or curred word array..
    	if(guessedLetters.indexOf(keyHit) === -1) {
    		//Log to the console that the keyHit is not in the guessed letters yet.
    		console.log(keyHit + " is not already in guessed letters.");

    		//This only happens if it has NOT been guessed AND it is a correct letter.
    		if(currentWord.indexOf(keyHit) !== -1) {

    			//Correctly guessed the letter!
    			console.log(keyHit + " was a correct letter!");

    			//Running this for loop to check EVERY CHARACTER in the currentWord string for matching letters.
    			for ( i = 0; i < currentWord.length; i++){
    				
    				//Needed if there is more than one of a letter.
    				if(currentWord[i] === keyHit) {

    					//If the letter is correct, but previously guessed correctly in the for loop we will push the
    					//guess to the HTML and the currentWordArray, but NOT add it to the guessedLettersP HTML.
    					//This is so "A" doesn't show up as a guess twice.
    					if (guessedLetters.indexOf(currentWord[i]) !== -1) {

    						//Update the displayedWordArray, remove underscore and replace our letter.
    						displayedWordArray[i] = keyHit + " ";

    						//Display the guessed letters.
        					displayGuessedLetters();

        					//display the underscored word update
        					displayUnderscoredWord();

        					//Update the hidden currentWord array.
        					currentWordArray[i] = keyHit;
    					}
    					else {
        					//Adding to hidden guessed letters
        					guessedLetters.push(keyHit);

        					//Push to public guessed letters
        					guessedLettersPublic.push(keyHit + " ");

        					//Update the displayedWordArray, remove underscore and replace our letter.
        					displayedWordArray[i] = keyHit + " ";
        					
        					//Display the guessed letters.
        					displayGuessedLetters();

        					//display the underscored word update
        					displayUnderscoredWord();

        					//Update the hidden currentWord array.
        					currentWordArray[i] = keyHit;
        				}

        			}
        				
    			} //End For Loop

				//If they win the round.
				if ( currentWord.toString() === currentWordArray.toString().replace(/,/g, '') ) {

    				document.getElementById('roundWinSound').play();
    				alert("You won the round! The word was " + currentWord + ". New round!");
    				newWordNumber();
    				wins++;
    				updateWins();
    				newGame();
					
				}
    			
			}
    		else {

    			//Incorrectly guessed the letter.
    			console.log(keyHit + " was NOT a correct letter!");

    			//Adding to guessed letters.
    			guessedLetters.push(keyHit);

    			//Adding to public guessed letters
    			guessedLettersPublic.push(keyHit + " ");

    			//Subtracting number of guesses left.
    			guessesLeft = guessesLeft -1;

    			//Playing Bad Guess Sound
    			document.getElementById('badGuessSound').play();

    			//Update our guesses left/image.
    			updateGuessesLeft();

    			//Display the guessed letters.
    			displayGuessedLetters();
    		}

    		
    	}
    	else if(guessedLetters.indexOf(keyHit)) {
    		
    		//Nothing happens for the user. They already guessed this letter.
    		console.log("The letter '" + keyHit + "' has already been guessed.")

    	}

    }


}


//Changes any array into underscores of the same length.
function underscoreWord(word) {

	//Clear out the old displayedWordArray if there was one.
	displayedWordArray = [];

	//Replace each letter with "_ " in the word given to the function.
	for (i = 0; i < word.length; i++){
		displayedWordArray[i] = "_ ";
	}

}

//Displays the underscored word to the screen. 
function displayUnderscoredWord() {

	//set blankWord to an empty string to avoid null errors
	var blankWord = " ";

	//set blankWord to the displayedArray.toString. This has commas in it.
	blankWord = displayedWordArray.toString();

	//Remove commas from the new blankWord string. Replace with nothing.
	blankWord = blankWord.replace(/,/g, '');

	//Set the HTML ID "blankWordHeader" to our blankWord string.
	document.getElementById("blankWordHeader").innerHTML = blankWord;
}

//Updates the displayed guessed letters on the HTML
function displayGuessedLetters() {
	//sets guessedLettersF to a string from the public guessed letters array.
	guessedLettersF = guessedLettersPublic.toString();

	//Remove commas from the guessedLettersF string.
	guessedLettersF = guessedLettersF.replace(/,/g, '');

	//Update the guessed letters publicly facing HTML with our new value.
	document.getElementById("guessedLettersP").innerHTML = guessedLettersF;
}

//Update guesses left. Self explanatory.
function updateGuessesLeft() {
	//Update the number of guesses left on the HTML.
	document.getElementById("guessesLeftHeader").innerHTML = guessesLeft + " Guesses Left.";

		if (guessesLeft === 1 ) {
			//Set the picture to the GameOver image.
			document.getElementById('hangmanPicture').src = "assets/images/gameOver.jpg"
		}


		//Ran out of guesses.
		if (guessesLeft === 0) {

			//Play the Game Over sound effect.
			document.getElementById('gameOverSound').play();


			//Alert that they lost the game.
			alert("You lose! Better luck next time. You get 12 guesses next time.");

			//Raising the number of guesses left to 12, if the user loses.
			guessesLeft = 12;

			//Begin a new game.
			newGame();

			//Set the number of guessed left after beginning the new game.
			document.getElementById("guessesLeftHeader").innerHTML = guessesLeft + " Guesses Left.";
		}

}

//Start a new game/round
function newGame() {

	//Only do newGame once.
	newGameVar = false;

	//Set wordNumber to random place in the array
	wordNumber = Math.floor((Math.random() * wordArray.length));

	//Set the currentWord to the next in the array of words (wordArray)
	currentWord = wordArray[wordNumber];

	//Blank out the currentWordArray, which is used to store correctly guessed letters.
	currentWordArray = [];

	//Blank out the guessedLetters array.
	guessedLetters = [];

	//Blank out the guesstLettersPublic array. This is the client-facing version.
	guessedLettersPublic = [];

	//Makes currentWord underscored in the displayedWordArray.
	underscoreWord(currentWord);

	//Updated the displayedWordArray.
	displayUnderscoredWord();

	//Display the guessed letters.
	displayGuessedLetters();

	//Set the picture back to normal Homer.
	document.getElementById('hangmanPicture').src = "assets/images/homerHangman.jpg"
}

//Update the wins on the screen
function updateWins() {
	document.getElementById("winsHeader").innerHTML = "Wins: " + wins;
}

//New Word RNG
function newWordNumber() {
	wordNumber = Math.floor((Math.random() * wordArray.length - 1));

	return wordNumber;
}
