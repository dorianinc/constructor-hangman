var word = require("./word.js");

//NPM installs
var inquirer = require("inquirer");
var clc = require('cli-color');
var isLetter = require('is-letter');

var gameTextColor = clc.cyanBright; //pre-defined color for game text.
var incorrect = clc.red.bold; //Pre-defined color for incorrect guess.
var correct = clc.green.bold; //Pre-defined color for correct guess.


//Word bank
var wordList = ["bulbasaur", "charmander", "squirtle", "pikachu", "mew", "articuno", "zapdos", "moltres"];
var userGuessedCorrectly = false;

//Choose random word from wordList.
var randomWord;
var someWord;

//Counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 10;

//Creating a variable to hold the letter that the user enters at the inquirer prompt.
var userGuess = "";

//Creating a variable to hold letters that user already guessed.
var lettersAlreadyGuessedList = "";
var lettersAlreadyGuessedListArray = [];

//Number of underscores/slots that have been filled in with a letter. 
//When game starts or is reset, this value should be 0.
var slotsFilledIn = 0;



//Use Inquirer package to display game confirmation prompt to user.
function confirmStart() {
    var readyToStartGame = [
        {
            type: 'text',
            name: 'playerName',
            message: 'Hello trainer whats your name?'
        },
        {
            type: 'confirm',
            name: 'readyToPlay',
            message: 'Are you ready to play Pokemon Hangman?',
            default: true
        }
    ];

    inquirer.prompt(readyToStartGame).then(answers => {
        //If the user confirms that they want to play, start game.
        if (answers.readyToPlay) {
            console.log(gameTextColor("Great! Welcome, " + answers.playerName + ". Let's begin..."));
            startGame();
        }

        else {
            //If the user decides they don't want to play, exit game.
            console.log(gameTextColor("Good bye, " + answers.playerName + "! Come back soon."));
            return;
        }
    });
}

//Start game function.
function startGame() {
    //Reset number of guesses remaining when user starts a new game.
    guessesRemaining = 10;
    //Pick random word from word list.
    chooseRandomWord();
    //When game is reset, empty out list of already guessed letters.
    lettersAlreadyGuessedList = "";
    lettersAlreadyGuessedListArray = [];
}

//Function to choose a random word from the list of cities in the word bank array.
function chooseRandomWord() {

    randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    someWord = new word(randomWord);

    console.log(gameTextColor("Your word contains " + randomWord.length + " letters."));
    // console.log(gameTextColor("WORD TO GUESS: " + randomWord));

    someWord.splitWord();
    someWord.generateLetters();
    guessLetter();
}

//Function that will prompt the user to enter a letter. This letter is the user's guess.
function guessLetter() {

    if (slotsFilledIn < someWord.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
            {
                name: "letter",
                message: "Guess a letter:",
                validate: function (value) {
                    if (isLetter(value)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]).then(function (guess) {
            guess.letter.toUpperCase();
            console.log(gameTextColor("You guessed: " + guess.letter.toUpperCase()));
            userGuessedCorrectly = false;

            if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
                console.log(gameTextColor("You already guessed that letter. Enter another one."));
                console.log(gameTextColor("====================================================================="));
                guessLetter();
            }

            //If user entered a letter that was not already guessed...
            else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {

                lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
                lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());

                console.log('Letters already guessed: ' + lettersAlreadyGuessedList);

                for (i = 0; i < someWord.letters.length; i++) {

                    if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessedCorrectly === false) {

                        someWord.letters[i].letterGuessedCorrectly === true;
                        userGuessedCorrectly = true;
                        someWord.underscores[i] = guess.letter.toUp
                        slotsFilledIn++
                    }
                }
                console.log(gameTextColor("WORD TO GUESS:"));

                someWord.splitWord();
                someWord.generateLetters();

                //If user guessed correctly...
                if (userGuessedCorrectly) {

                    console.log(correct('CORRECT!'));
                    console.log(gameTextColor("====================================================================="));
                    checkIfUserWon();
                }

                //Else if user guessed incorrectly...
                else {
                    console.log(incorrect('INCORRECT!'));

                    guessesRemaining--;

                    console.log(gameTextColor("You have " + guessesRemaining + " guesses left."));
                    console.log(gameTextColor("====================================================================="));
                    checkIfUserWon();
                }
            }
        });
    }
}

//This function will check if the user won or lost after user guesses a letter.
function checkIfUserWon() {
    if (guessesRemaining === 0) {

        console.log(gameTextColor("====================================================================="));
        console.log(incorrect('YOU LOST. BETTER LUCK NEXT TIME.'));
        console.log(gameTextColor("The correct city was: " + randomWord));

        losses++;

        console.log(gameTextColor("Wins: " + wins));
        console.log(gameTextColor("Losses: " + losses));
        console.log(gameTextColor("====================================================================="));
        playAgain();
    }

    //else if the number of slots/underscores that are filled in with a letter equals the number of letters in the word, the user won.
    else if (slotsFilledIn === someWord.letters.length) {

        console.log(gameTextColor("====================================================================="));
        console.log(correct("YOU WON! YOU'RE A TRUE POKEMON MASTER!"));

        wins++;

        console.log(gameTextColor("Wins: " + wins));
        console.log(gameTextColor("Losses: " + losses));
        console.log(gameTextColor("====================================================================="));
        playAgain();
    }

    else {
        //If user did not win or lose after a guess, keep running inquirer.
        guessLetter("");
    }

}

//Create a function that will ask user if they want to play again at the end of the game.
function playAgain() {

    var playGameAgain = [
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Do you want to play again?',
            default: true
        }
    ];

    inquirer.prompt(playGameAgain).then(userWantsTo => {

        if (userWantsTo.playAgain) {

            lettersAlreadyGuessedList = "";
            lettersAlreadyGuessedListArray = [];
            slotsFilledIn = 0;

            console.log(gameTextColor("Great! Welcome back. Let's begin..."));
            startGame();
        }

        else {
            //If user doesn't want to play again, exit game.
            console.log(gameTextColor("Good bye! Come back soon."));
            return;
        }
    });
}

confirmStart();