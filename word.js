
var letter = require("./letter");

var Word = function(myWord) {
	//Take chosen word from word list.
	this.myWord = myWord;
	//This is an array of letters representing the letters of the random chosen word.
	this.letters = [];
	//This is an array of underscores representing the number of underscores needed for the random chosen word 
	//This is based on the number of letters in the word.
	this.underscores = [];
	//After we get a random word from the word list, I think I need to use the split method to add the letters to the this.letters array.
	this.splitWord = function() {
		this.letters = this.myWord.split("");
		numberUnderscoresNeeded = this.letters.length;
		console.log(this.underscores.join(" "));
	}
	this.generateLetters = function() {
		for (i=0; i < this.letters.length; i++){
			this.letters[i] = new letter (this.letters[i]);
			this.letters[i].showCharacter();
		}
	}
}


module.exports = Word;