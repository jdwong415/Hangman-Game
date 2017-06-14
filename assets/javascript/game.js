// Array of possible word choices.
var wordsArray = ["apple", "orange", "banana", "plum", "coconut", "cherry"];

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Global variables for tracking our wins, remaining guesses & letters guessed.

var wins = 0;
var lives = 10;
var lettersGuessed = [];
var state = [];
var word = "";

function resetGame() {
    lives = 10;
    lettersGuessed = [];
    state = [];
    word = "";
}

function getWord() {
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    for (var s = 0; s < word.length; s++) {
        state.push("_");
    }
}

function print() {
    var html = "Wins: " + wins + "<br>Word: " + word + "<br>State: " + state + "<br>Lives: " + lives + "<br>Letters Guessed: " + lettersGuessed;
    document.querySelector("#game").innerHTML = html;
};

function startGame() {
    resetGame();
    getWord();
    print();
}

startGame();

// Runs function when key is released
document.onkeyup = function(event) {
    // Sets userGuess as key pressed
    var userGuess = event.key;
    if (letters.includes(userGuess) && !lettersGuessed.includes(userGuess) && lives > 0) {
        var correctGuess = false;
        for (var k = 0; k < word.length; k++) {
            if (userGuess === word[k]) {
                correctGuess = true;
                state[k] = userGuess;
            }
        }
        if (correctGuess === false) {
            lettersGuessed.push(userGuess);
            lives--;
        }
    }
    console.log(state);
    print();
    if (!state.includes("_")) {
        console.log("Win");
        alert("Congratulations! You win");
        wins++;
        startGame();
    }
    else if (lives === 0) {
        console.log("lose");
        alert("Game Over!");
        startGame();
    }
};


