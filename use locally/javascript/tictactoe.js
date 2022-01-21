let board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
let playing = true;
let turn = 0;
let xScore = 0;
let oScore = 0;

document.getElementById("x-score").textContent = xScore;
document.getElementById("o-score").textContent = oScore;
document.getElementById("current-turn").textContent = "X";
document.getElementById("winnerMsg").style.display = "none";

function clickedSquare (subArray, subArrayIndex, htmlElement) {
    if (playing == true && board[subArray][subArrayIndex] == 0) {    // if match in progress & square clicked has no value
        console.log("playing: true");               
        if (turn % 2 == 0) {            // if turn = even (x's turn)
            document.getElementById("current-turn").textContent = "O";
            board[subArray][subArrayIndex] = "x"
            document.getElementById(htmlElement).style.background = "url('images/x-mark-256.png') center no-repeat";
            document.getElementById(htmlElement).style.backgroundSize = "60%";
            document.getElementById("")
            checkForWin(board, subArray, subArrayIndex);
        } else {
            document.getElementById("current-turn").textContent = "X";
            board[subArray][subArrayIndex] = "o"
            document.getElementById(htmlElement).style.background = "url('images/thicc-circle.png') center no-repeat";
            document.getElementById(htmlElement).style.backgroundSize = "70%";
            checkForWin(board, subArray, subArrayIndex);
            };
        turn++;

    };
    if (turn > 8 && playing == true) { // if all cells are filled and theres no winner, call a tie
            playing = false;
            endGame("tie");
    };
    console.log(board);
};

function checkForWin (board, subArray, subArrayIndex) {         //check clicked row if row is all x or o
        
    //check clicked row, then column, then diagonal if row is all x or o
    if ((board[subArray][0] == "x" && board[subArray][1] == "x" && board[subArray][2] == "x") || //row
    (board[0][subArrayIndex] == "x"&& board[1][subArrayIndex] == "x" && board[2][subArrayIndex] == "x") || //column
    (board[0][0] == "x" && board[1][1] == "x" && board[2][2] == "x") || //both diagonals
    (board[0][2] == "x" && board[1][1] == "x" && board[2][0] == "x")) {
        endGame("x");
    } else if ((board[subArray][0] == "o" && board[subArray][1] == "o" && board[subArray][2]) == "o" || 
    (board[0][subArrayIndex] == "o" && board[1][subArrayIndex] == "o" && board[2][subArrayIndex] == "o") ||
    (board[0][0] == "o" && board[1][1] == "o" && board[2][2] == "o") || 
    (board[0][2] == "o" && board[1][1] == "o" && board[2][0] == "o")) {
        endGame("o");
    };        
};

function endGame(victor) {      //after someone wins or tie
    document.getElementById("current-turn").textContent = "-";
    playing = false;
    switch (victor) {
        case "x":
            xScore++;
            document.getElementById("x-score").textContent = xScore;
            document.getElementById("winnerMsg").textContent = "Player X is the winner!";
            break;
        case "o":
            oScore++;
            document.getElementById("o-score").textContent = oScore;
            document.getElementById("winnerMsg").textContent = "Player O is the winner!"
            break;
        case "tie":
            document.getElementById("winnerMsg").textContent = "Tie!"
            break;
    };
    document.getElementById("play-again").style.display = "block";
    document.getElementById("winnerMsg").style.display = "block";
};

document.getElementById("play-again").onclick = function() {
    if (playing == false) {
        for (let p=1; p<10; p++) {
            document.getElementById("cell" + String(p)).style.background = ""; //cannot be none or else pseudoclasses dont work
        };
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        turn = 0;
        document.getElementById("current-turn").textContent = "X";
        document.getElementById("play-again").style.display = "none";
        document.getElementById("winnerMsg").style.display = "none";
        playing = true;
    };
};

document.getElementById("cell1").onclick = function() {clickedSquare(0, 0, "cell1");}; // kinda satisfying in a way
document.getElementById("cell2").onclick = function() {clickedSquare(0, 1, "cell2");};
document.getElementById("cell3").onclick = function() {clickedSquare(0, 2, "cell3");};
document.getElementById("cell4").onclick = function() {clickedSquare(1, 0, "cell4");};
document.getElementById("cell5").onclick = function() {clickedSquare(1, 1, "cell5");};
document.getElementById("cell6").onclick = function() {clickedSquare(1, 2, "cell6");};
document.getElementById("cell7").onclick = function() {clickedSquare(2, 0, "cell7");};
document.getElementById("cell8").onclick = function() {clickedSquare(2, 1, "cell8");};
document.getElementById("cell9").onclick = function() {clickedSquare(2, 2, "cell9");};