//Hangman Object
hangmanObj = {
	wordArray: ["marge", "homer", "bart", 
				 "lisa", "maggie", "smithers",
				 "milhouse", "krusty", "moe",
				 "skinner", "flanders", "selma",
				 "apu", "snake", "lenny", 
				 "carl", "patty", "grandpa"],
	wordNumber: 0,
	currentWordArray: [],
	alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
	guessedLetters: [],
	guessedLettersPublic: [],
	displayedWordArray: [],
	hangmanPictureArray: [0, 1, 2, 3, 4, 5, 6, 7],
	guessesLeft: 10,
	newGameVar: true,
	wins: 0,
	numbersUsed: [],
	underscoreWord: function(word) {
		//Clear out the old displayedWordArray if there was one.
		this.displayedWordArray = [];

		//Replace each letter with "_ " in the word given to the function.
		for (i = 0; i < word.length; i++){
			this.displayedWordArray[i] = "_ ";
		}
	},
	updateGuessesLeft: function() {
		//Update the number of guesses left on the HTML.
		document.getElementById("guessesLeftHeader").innerHTML = this.guessesLeft + " Guesses Left.";

		if (this.guessesLeft === 1 ) {
			//Set the picture to the GameOver image.
			document.getElementById('hangmanPicture').src = "assets/images/gameOver.jpg"
		}


		//Ran out of guesses.
		if (this.guessesLeft === 0) {

			//Play the Game Over sound effect.
			document.getElementById('gameOverSound').play();


			//Alert that they lost the game.
			alert("You lose! Better luck next time. You get 12 guesses next time.");

			//Raising the number of guesses left to 12, if the user loses.
			this.guessesLeft = 12;

			//Begin a new game.
			this.newGame();

			//Set the number of guessed left after beginning the new game.
			document.getElementById("guessesLeftHeader").innerHTML = this.guessesLeft + " Guesses Left.";
		}

	},
	displayUnderscoredWord: function() {
		//set blankWord to an empty string to avoid null errors
		var blankWord = " ";

		//set blankWord to the displayedArray.toString. This has commas in it.
		blankWord = this.displayedWordArray.toString();

		//Remove commas from the new blankWord string. Replace with nothing.
		blankWord = blankWord.replace(/,/g, '');

		//Set the HTML ID "blankWordHeader" to our blankWord string.
		document.getElementById("blankWordHeader").innerHTML = blankWord;
	},
	displayGuessedLetters: function() {
		//sets guessedLettersF to a string from the public guessed letters array.
		var guessedLettersF = this.guessedLettersPublic.toString();

		//Remove commas from the guessedLettersF string.
		guessedLettersF = guessedLettersF.replace(/,/g, '');

		//Update the guessed letters publicly facing HTML with our new value.
		document.getElementById("guessedLettersP").innerHTML = guessedLettersF;
	},
	newGame: function() {
		//Only do newGame once.
		this.newGameVar = false;

		//Set wordNumber to random place in the array
		this.wordNumber = Math.floor((Math.random() * this.wordArray.length));

		//Set the currentWord to the next in the array of words (wordArray)
		this.currentWord = this.wordArray[this.wordNumber];

		//Blank out the currentWordArray, which is used to store correctly guessed letters.
		this.currentWordArray = [];

		//Blank out the guessedLetters array.
		this.guessedLetters = [];

		//Blank out the guesstLettersPublic array. This is the client-facing version.
		this.guessedLettersPublic = [];

		//Makes currentWord underscored in the displayedWordArray.
		this.underscoreWord(this.currentWord);

		//Updated the displayedWordArray.
		this.displayUnderscoredWord();

		//Display the guessed letters.
		this.displayGuessedLetters();

		//Set the picture back to normal Homer.
		document.getElementById('hangmanPicture').src = "assets/images/homerHangman.jpg"
	},
	updateWins: function() {
		document.getElementById("winsHeader").innerHTML = "Wins: " + this.wins;
	},
	newWordNumber: function() {
		this.wordNumber = Math.floor((Math.random() * this.wordArray.length - 1));

		return this.wordNumber;
	}
}


var currentWord = hangmanObj.wordArray[hangmanObj.wordNumber];


//Document.ready equivalent
document.addEventListener("DOMContentLoaded", function(event) { 
	//Play the "Any Key" wav file.
	document.getElementById('anyKeySound').play();
})


//Key Input Event
document.onkeyup = function(event) {

	//Only runs the first time. newGame makes itself false after the first run.
	if ( hangmanObj.newGameVar ) {

		//Run the new game function.
		hangmanObj.newGame();
	}
	
	//Runs every time a key is unpressed. Updates # of guesses left in the HTML.
	hangmanObj.updateGuessesLeft();

	//Set a new variable, keyHit and set it to lowercase of the event.key
    var keyHit = event.key.toLowerCase();

    var keyHitIndex = hangmanObj.alphabet.indexOf(keyHit);

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
    	if(hangmanObj.guessedLetters.indexOf(keyHit) === -1) {
    		//Log to the console that the keyHit is not in the guessed letters yet.
    		console.log(keyHit + " is not already in guessed letters.");

    		//This only happens if it has NOT been guessed AND it is a correct letter.
    		if(hangmanObj.currentWord.indexOf(keyHit) !== -1) {

    			//Correctly guessed the letter!
    			console.log(keyHit + " was a correct letter!");

    			//Running this for loop to check EVERY CHARACTER in the currentWord string for matching letters.
    			for ( i = 0; i < hangmanObj.currentWord.length; i++){
    				
    				//Needed if there is more than one of a letter.
    				if(hangmanObj.currentWord[i] === keyHit) {

    					//If the letter is correct, but previously guessed correctly in the for loop we will push the
    					//guess to the HTML and the currentWordArray, but NOT add it to the guessedLettersP HTML.
    					//This is so "A" doesn't show up as a guess twice.
    					if (hangmanObj.guessedLetters.indexOf(hangmanObj.currentWord[i]) !== -1) {

    						//Update the displayedWordArray, remove underscore and replace our letter.
    						hangmanObj.displayedWordArray[i] = keyHit + " ";

    						//Display the guessed letters.
        					hangmanObj.displayGuessedLetters();

        					//display the underscored word update
        					hangmanObj.displayUnderscoredWord();

        					//Update the hidden currentWord array.
        					hangmanObj.currentWordArray[i] = keyHit;
    					}
    					else {
        					//Adding to hidden guessed letters
        					hangmanObj.guessedLetters.push(keyHit);

        					//Push to public guessed letters
        					hangmanObj.guessedLettersPublic.push(keyHit + " ");

        					//Update the displayedWordArray, remove underscore and replace our letter.
        					hangmanObj.displayedWordArray[i] = keyHit + " ";
        					
        					//Display the guessed letters.
        					hangmanObj.displayGuessedLetters();

        					//display the underscored word update
        					hangmanObj.displayUnderscoredWord();

        					//Update the hidden currentWord array.
        					hangmanObj.currentWordArray[i] = keyHit;
        				}

        			}
        				
    			} //End For Loop

				//If they win the round.
				if ( hangmanObj.currentWord.toString() === hangmanObj.currentWordArray.toString().replace(/,/g, '') ) {

    				document.getElementById('roundWinSound').play();
    				alert("You won the round! The word was " + hangmanObj.currentWord + ". New round!");
    				hangmanObj.newWordNumber();
    				hangmanObj.wins++;
    				hangmanObj.updateWins();
    				hangmanObj.newGame();
					
				}
    			
			}
    		else {

    			//Incorrectly guessed the letter.
    			console.log(keyHit + " was NOT a correct letter!");

    			//Adding to guessed letters.
    			hangmanObj.guessedLetters.push(keyHit);

    			//Adding to public guessed letters
    			hangmanObj.guessedLettersPublic.push(keyHit + " ");

    			//Subtracting number of guesses left.
    			hangmanObj.guessesLeft--;

    			//Playing Bad Guess Sound
    			document.getElementById('badGuessSound').play();

    			//Update our guesses left/image.
    			hangmanObj.updateGuessesLeft();

    			//Display the guessed letters.
    			hangmanObj.displayGuessedLetters();
    		}

    		
    	}
    	else if(hangmanObj.guessedLetters.indexOf(keyHit)) {
    		
    		//Nothing happens for the user. They already guessed this letter.
    		console.log("The letter '" + keyHit + "' has already been guessed.")

    	}

    }


}