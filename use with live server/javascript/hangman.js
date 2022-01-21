let randomWordsToGuess = [
    ["indigo", "violet", "peach", "aliceblue"],
    ["Elon Musk", "Xi Jinping", "Michael Jackson", "Will Smith", "Keanu Reeves", "Leonardo Da Vinci", "William Shakespeare", 
    "Mahatma Gandhi", "Albert Einstein", "Nikola Tesla", "Galileo Galilei", "Aristotle", "Socrates", "Bill Gates", "Muhammad Ali"],
    ["Botswana", "Haiti", "Honduras", "Laos", "Czech Republic", "Kazakhstan", "Qatar", "Vatican City", "Vanuatu", "Latvia", "Estonia", 
    "Trinidad and Tobago"],
    ["compass", "radio", "spacecraft", "transistor", "printing press", "paper money", "lightbulb", "magnfiying lens", "gunpowder",
    "airplane"],
    ["Minecraft", "Halo", "Space Wars", "Terraria", "Grand Theft Auto", "Pac-Man", "Fortnite", "Mario", "Half-Life", "Call of Duty"],
    ["rugby", "water polo", "fencing", "ultimate frisbee", "badminton", "chess boxing", "curling", "chess boxing", "toe wrestling", 
    "roller derby", "quidditch"]
    //0: colors | 1:  influential people | 2: countries | 3: important inventions | 4: games | 5: sports
];

let customWord = false; //if they want to enter their own word 
let isHintCustom = false;
let ogLives = 10; //initial lives that the lives can reset to when playing again
let lives = 10; //lives
let word = ""; //word to guess
let playerProgress = ""; //intermediary between word and guessBox in checkGuess 
let hangmanDrawCounter = 1; //counter used to draw the hangman before/during the game
let category = "";
let guessedChars = [];

let customWordInput = document.getElementById("custom-word-input"); //element that player inputs custom word into
let customLivesInput = document.getElementById("custom-lives-input"); //element that player inputs custom lives into
let customLivesDisplay = document.getElementById("custom-lives-display"); //element that displays custom lives if lives = "custom"
let customHint = document.getElementById("custom-hint-input"); //element that player inputs custom hint into
let guessedCharsElement = document.getElementById("used-words"); //element that stores all of the players previously incorrect guesses
let guessBox = document.getElementById("guess-box"); //element that stores word for player to guess
let displayHint = document.getElementById("hint"); //element that displays hint
let guessInput = document.getElementById("guess-input"); //element that player inputs guess into
let submitGuess = document.getElementById("submit-guess"); //element that player clicks to enter guess
let checkOrX = document.getElementById("check-or-x"); //element that display check or x depending on whether answer is right or wrong

customWordInput.style.display = "none";
customLivesInput.style.display = "none";
customLivesDisplay.style.display = "none";
customHint.style.display = "none";
guessedCharsElement.style.display = "none";
guessBox.style.display = "none";
displayHint.style.display = "none";
guessInput.style.display = "none";
submitGuess.style.display = "none";
checkOrX.style.display = "none";
document.getElementById("hangman-guy").style.display = "none";
document.getElementById("win-or-lose").style.display = "none";

//-----------------------------------PREGAME SETTIGNGS-----------------------------------
document.getElementById("random-word").onclick = function() {
    customWord = false;
    isHintCustom = false;
    customWordInput.style.display = "none";
    customHint.style.display = "none";
};
document.getElementById("custom-word").onclick = function() {
    customWord = true;
    isHintCustom = true;
    customWordInput.style.display = "inline";
    customHint.style.display = "inline";
};
//-----------------------------------LIVES-----------------------------------
document.getElementById("easy").onclick = function() {
    lives = 15;
    ogLives = lives;
    customLivesInput.style.display = "none";
};
document.getElementById("normal").onclick = function() {
    lives = 10;
    ogLives = lives;
    customLivesInput.style.display = "none";
};
document.getElementById("hard").onclick = function() {
    lives = 6;
    ogLives = lives;
    customLivesInput.style.display = "none";
};
document.getElementById("custom-lives").onclick = function() {
    lives = "custom";
    ogLives = lives;
    customLivesInput.style.display = "inline";
};

//-----------------------------------START GAME-----------------------------------
document.getElementById("start-game").onclick = function() {
    hangmanDrawCounter = 1;
    for (let b=1; b<16; b++) {document.getElementById("hangman-icon" + b).style.opacity = "0";}
    // check if lives is set to custom and custom lives input is a number less than 100 before continuing with game
    if (lives == "custom" && (isNaN(customLivesInput.value) || customLivesInput.value > 100)) { 
        window.alert("Please enter a valid number of lives. (<99)");
    } else if (customWord == true && customWordInput.value == "") {
        window.alert("Please enter a word.");
    } else {
        setupWordAndHint();
        drawHangman();
        guessedCharsElement.style.display = "inline";
        guessInput.style.display = "block";
        submitGuess.style.display = "block";
        document.getElementById("pregame-options").style.display = "none"; //hide all pregame settings
    };
};

function drawHangman() {
    //only draw hangman pole if lives = 6
    if (lives == "custom" && Number(customLivesInput.value) != 6) {
        lives = Number(customLivesInput.value);
        customLivesDisplay.textContent += customLivesInput.value; 
        customLivesDisplay.style.display = "inline";
    } else if (lives == 6 || Number(customLivesInput.value) == 6) { //if hardmode, draw the pole ONLY
        for (hangmanDrawCounter; hangmanDrawCounter < 5; hangmanDrawCounter++) { // takes 4 to draw the pole
            document.getElementById("hangman-icon" + hangmanDrawCounter).style.opacity = "1";
            document.getElementById("hangman-guy").style.display = "-webkit-flex";
        };
    } else {document.getElementById("hangman-guy").style.display = "-webkit-flex";};
};

function setupWordAndHint() {
    //setup word: first choose one (custom wword or nah)
    if (customWord == true) {
        word = customWordInput.value;
    } else {
        category = Math.floor(Math.random() * 6);
        //sometimes it goes typeerror, but idk why (TRY CATCH IS TEMPORARY FIX: PLEASE MAKE IT BETTER :( )
        try {
            word = randomWordsToGuess[category][Math.floor(Math.random() * (randomWordsToGuess[category].length - 1))];
        } catch (TypeError) {
            word = randomWordsToGuess[category][categoryIndex];
        }
        switch (category) {
            case 0: category = "Colors"; break;
            case 1: category = "Influential people"; break;
            case 2: category = "Countries"; break;
            case 3: category = "Important inventions"; break;
            case 4: category = "Games"; break;
            case 5: category = "Sports"; break; 
        };
    };
    //parse word string into array
    guessBox.style.display = "inline";
    //parse guessBox element to match word (spaces will not count in guess)
    for (let o=0; o<word.length; o++) {
        switch (word[o]) {
            case " ": guessBox.textContent += " "; break;
            case "-": guessBox.textContent += "-"; break;
            case "_": guessBox.textContent += "_"; break;
            case "/": guessBox.textContent += "/"; break;
            case "(": guessBox.textContent += "("; break;
            case ")": guessBox.textContent += ")"; break;
            default: guessBox.textContent += "_"; break;
        };
    };
    playerProgress = guessBox.textContent;
    //setup hint
    if (document.getElementById("hint-checkbox").checked) {
        if (isHintCustom == true) {
            displayHint.textContent += customHint.value;
        } else {
            displayHint.textContent += category;
        };
        if (displayHint.value != "") {
            document.getElementById("hint").style.display = "inline";
        };
    };
};

//-----------------------------------CHECK GUESS AND LIVES-----------------------------------
guessInput.onclick = function() {checkOrX.style.display = "none";};

submitGuess.onclick = function() {
    let alreadyGuessedChar = guessedChars.includes(guessInput.value);
    if (alreadyGuessedChar == true) {
        alert("You've already guessed that!")
    } else if (guessInput.value == "") {
        alert("Please enter a guess first.")
    } else {
        checkGuess();
        checkForWinOrLose();
    };
};

function checkGuess() {
    //if word includes characters listed in guessInput
    let guessValidity = word.toLocaleLowerCase().includes(guessInput.value.toLocaleLowerCase());
    if (guessValidity == true) {
        //put letter into guessBox via intermediary playerProgress array (for loop for multiple instances of same character)
        for (let j=0; j<word.length; j++) {
            if (word[j].toLocaleLowerCase() == guessInput.value.toLocaleLowerCase()) {
                playerProgress = guessBox.textContent.split("");
                playerProgress[j] = word[j];
                playerProgress = playerProgress.join(""); //must assign left hand or there is a comma between every character
                guessBox.textContent = playerProgress;
            };
        };
        checkOrX.style.background = "url(images/hangman-check.png) center no-repeat";
    } else {
        //if guess is 1 character (character guess)
        if (guessInput.value.length == 1) {
            if (customLivesDisplay.style.display != "inline") {
                document.getElementById("hangman-icon" + hangmanDrawCounter).style.opacity = "1";
                hangmanDrawCounter++;
                lives--;
            } else {
                lives --;
                customLivesDisplay.textContent = "Lives: " + lives;
            };
        //if guess is +1 chracter (word guess)
        } else {
            if (customLivesDisplay.style.display != "inline") {
                document.getElementById("hangman-icon" + hangmanDrawCounter).style.opacity = "1";
                document.getElementById("hangman-icon" + (hangmanDrawCounter + 1)).style.opacity = "1";
                hangmanDrawCounter += 2;
                lives -= 2;
            } else {
                lives -= 2;
                customLivesDisplay.textContent = "Lives: " + lives;
            };
        };
        checkOrX.style.background = "url(images/hangman-x.png) center no-repeat";
    };
    checkOrX.style.backgroundSize = "cover";
    checkOrX.style.display = "block";
    //add character to guessed characters and reset guessInput
    guessedChars.push(guessInput.value);
    guessedCharsElement.textContent += guessInput.value + ", ";
    guessInput.value = "";
};

function checkForWinOrLose() {
    if (playerProgress == word) {
        document.getElementById("win-or-lose").textContent = "You guessed the word! Good job!"
        cleanUp();
    };
    if (lives <= 0) {
        document.getElementById("win-or-lose").textContent = `You're out of chances! The word was "` + word + '." Maybe next time!';
        cleanUp();
    };
};

function cleanUp() {
    document.getElementById("win-or-lose").style.display = "block";
    document.getElementById("play-again").style.display = "block";
    checkOrX.style.display = 'none';
    guessInput.style.display = "none";
    submitGuess.style.display = "none";
};

//when play again, reset playerProgress, reset and/or hide all the game stuff
document.getElementById("play-again").onclick = function() {
    lives = ogLives;
    playerProgress = "";
    customLivesDisplay.textContent = "Lives: "
    document.getElementById("hangman-guy").style.display = "none";
    guessedCharsElement.style.display = "none";
    guessedCharsElement.textContent = "Used characters/words: "
    guessedChars = [];
    guessBox.textContent = "";
    customLivesDisplay.style.display = "none";
    guessBox.style.display = "none";
    displayHint.textContent = "Hint: ";
    displayHint.style.display = "none";
    document.getElementById("win-or-lose").style.display = "none";
    document.getElementById("pregame-options").style.display = "block";
    document.getElementById("play-again").style.display = "none";
};