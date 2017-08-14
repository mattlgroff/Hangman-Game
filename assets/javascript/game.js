//hangmanPicture
//The ID of the left side's picture, which changes depending on how many Guesses are left.

//guessesLeftHeader
//The ID of the left side's header, which shows how manyy Guesses are left.

//Begin at 0
var wordNumber = 0;

//The words in play.
var wordArray = ["marge", "homer", "bart", "lisa", "maggie", "smithers", "milhouse", "krustys", "moe", "skinner", "flanders"];

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

//Key Input Event
document.onkeyup = function(event) {

		//Only runs the first time. newGame makes itself false.
		if ( newGameVar ) {
			document.getElementById('anyKeySound').play();
			document.getElementById('hangmanPicture').src = "assets/images/homerHangman.jpg"
			newGame();
		}

		
		//Runs every time a key is unpressed.
		updateGuessesLeft();

        var keyHit = event.key.toLowerCase();

        var keyHitIndex = alphabet.indexOf(keyHit);

        if(keyHitIndex == -1) {
          console.log("You pressed the '" + event.key + "' key.");
          console.log("This is not accepted into Hangman.");
        }
        else {
        	console.log("You pressed the '" + event.key + "' key.")

        		//If the typed letter is NOT in the list of guessed letters or curred word array..
	        	if(guessedLetters.indexOf(keyHit) == -1) {

	        		console.log(keyHit + " is not already in guessed letters.");


	        		if(currentWord.indexOf(keyHit) !== -1) {

	        			//Correctly guessed the letter!
	        			console.log(keyHit + " was a correct letter!");


	        			for ( i = 0; i < currentWord.length; i++){
	        				//Needed if there is more than one of a letter.
	        				if(currentWord[i] == keyHit) {

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

	        				
	        			}

	    				//If they win the round.
	        			if ( currentWord.toString() == currentWordArray.toString().replace(/,/g, '') ) {

	        				//Ran out of words
	        				console.log("wordNumber = " + wordNumber + " wordArray.length= " + wordArray.length);
							if (wordNumber == wordArray.length -1) {
								wordNumber = 0;
								wins++;
								updateWins();
								document.getElementById('roundWinSound').play();
								alert("You are out of words! Starting over from the beginning.");
								newGame();
							}
	        				else{
		        				document.getElementById('roundWinSound').play();
		        				alert("You won the round! The word was " + currentWord + ". New round!");
		        				wordNumber++
		        				wins++;
		        				updateWins();
		        				newGame();
	        				}
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

	        			//Update our guesses left/image.
	        			updateGuessesLeft();

	        			//Display the guessed letters.
	        			displayGuessedLetters();
	        		}

	        		
	        	}
	        	else if(guessedLetters.indexOf(keyHit)) {

	        		console.log("The letter '" + keyHit + "' has already been guessed.")

	        	}



        	//Now we need to check if this letter has been guessed or not.
        	// if (guessedLetters.indexOf(KeyHit) !== 1 && currentWordArray.indexOf(KeyHit) !== -1 )
        	// then we push the KeyHit value to the indexOf location in the displayedWordArray
        }


}


//Changes any array into underscores of the same length.
function underscoreWord(word) {

	displayedWordArray = [];

	for (i = 0; i < word.length; i++){
		displayedWordArray[i] = "_ ";
	}

}

function displayUnderscoredWord() {

	var blankWord = " ";

	blankWord = displayedWordArray.toString();
	blankWord = blankWord.replace(/,/g, '');

	document.getElementById("blankWordHeader").innerHTML = blankWord;
}

function displayGuessedLetters() {
	guessedLettersF = guessedLettersPublic.toString();
	guessedLettersF = guessedLettersF.replace(/,/g, '');
	document.getElementById("guessedLettersP").innerHTML = guessedLettersF;
}

function updateGuessesLeft() {
	document.getElementById("guessesLeftHeader").innerHTML = guessesLeft + " Guesses Left.";

	//Ran out of guesses.
		if (guessesLeft == 0) {
			document.getElementById('badGuessSound').play();

			alert("You lose! Better luck next time. You get 12 guesses next time.");

			guessesLeft = 12;

			newGame();

			document.getElementById("guessesLeftHeader").innerHTML = guessesLeft + " Guesses Left.";
		}

}

function newGame() {

	//Only do newGame once.
	newGameVar = false;

	currentWord = wordArray[wordNumber];

	currentWordArray = [];

	guessedLetters = [];

	guessedLettersPublic = [];

	//Makes currentWord underscored in the displayedWordArray.
	underscoreWord(currentWord);

	//Updated the displayedWordArray.
	displayUnderscoredWord();

	//Display the guessed letters.
	displayGuessedLetters();
}


function updateWins() {
	document.getElementById("winsHeader").innerHTML = "Wins: " + wins;
}
