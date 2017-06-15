// Array of possible word choices.
var wordsArray = ["apple", "orange", "banana", "plum", "coconut", "cherry", "apricot", "avocado", "blueberry", "cantaloupe", "persimmon"];

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Global variables for tracking our wins, remaining guesses & letters guessed.

var wins = 0;
var streak = 0;
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

function displayWins() {
    var html = "<p>" + wins + "</p>";
    document.querySelector("#wins").innerHTML = html;
};

function displayState() {
    var html = "<h2>";
    for (var i = 0; i < state.length; i++) {
        html = html + state[i] + " ";
    }
    html = html + "</h2>"
    document.querySelector("#state").innerHTML = html;
};

function displayLives() {
    var html = "<p>" + lives + "</p>";
    document.querySelector("#lives").innerHTML = html;
};

function displayGuess() {
    var html = "<p>" + lettersGuessed + "</p>";
    document.querySelector("#guess").innerHTML = html;
};

function displayStreak() {
    var html = "<p>" + streak + "</p>";
    document.querySelector("#streak").innerHTML = html;
};


function startGame() {
    resetGame();
    getWord();
    displayWins();
    displayStreak();
    displayState();
    displayLives();
    displayGuess();
}

startGame();
console.log(word);

// Runs function when key is released
document.onkeyup = function(event) {
    // Sets userGuess as key pressed
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();;
    if (letters.includes(userGuess) && !lettersGuessed.includes(userGuess) && lives > 0) {
        var correctGuess = false;
        for (var k = 0; k < word.length; k++) {
            if (userGuess === word[k]) {
                correctGuess = true;
                state[k] = userGuess;
                displayState();
            }
        }
        if (correctGuess === false) {
            lettersGuessed.push(userGuess);
            lives--;
            displayGuess();
            displayLives();
        }
    }
    console.log(state);

    if (!state.includes("_")) {
        console.log("Win");
        displayState();
        alert("Congratulations! You correctly guessed: " + word);
        wins++;
        streak++;
        startGame();
    }
    else if (lives === 0) {
        console.log("lose");
        streak = 0;
        alert("Game over! The word was: " + word);
        startGame();
    }
};


