
var letter = function(character) {
	// A string value to store the underlying character for the letter
	this.character = character.toUpperCase();
	// A boolean value that stores whether that letter has been guessed yet
	this.letterGuessedCorrectly = false;
	// A function that returns the underlying character if the letter has been guessed
	this.showCharacter = function() {
		if (this.letterGuessedCorrectly) {
			console.log(this.character);
		}
		else {
			// console.log ("_");
		}

	}
}

module.exports = letter