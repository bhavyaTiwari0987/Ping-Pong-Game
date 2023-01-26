const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "pink";
const paddle1Color = "blue";
const paddle2Color = "purple";
const paddleBorder = "black";
const ballColor = "red";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 100,
    height: 25,
    x: 200,
    y: 0
};
let paddle2 = {
    width: 100,
    height: 25,
    x: 200,
    y: gameHeight - 25
};


// when game starts
// storing score and player in local storage
localStorage.setItem("rod1", "0");
localStorage.setItem("rod2", "0");

// alert msg on starting a game and reseting a game
function AlertOfMaxScore() {
var scoreOfrod1 = localStorage.getItem("rod1");
                    var scoreOfrod2 = localStorage.getItem("rod2");
                    if (scoreOfrod1==0 && scoreOfrod2==0) {
                    alert("This is your first time! Use a and d key for moving rod to left and right!! ");                    
                    } else if (scoreOfrod1 > scoreOfrod2) {
                                        alert("rod1"+" "+ "has maximum score of"+" "+ scoreOfrod1);
                    } else if (scoreOfrod2 > scoreOfrod1) {
                                        alert("rod2"+" "+ "has maximum score of"+" "+ scoreOfrod2);
                                        }
}
// handling enter button event on the starting of the game
document.body.addEventListener('keypress', function (event) {
                    if (event.keyCode === 13) {
                                        gameStarted = true;
                                        gameStart();
                                        AlertOfMaxScore();
                    }
})

// all the function has very clear name as their work...
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10)
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createBall(){
    ballSpeed = 5;
    if(Math.round(Math.random()) == 1){
        ballYDirection =  1; 
    }
    else{
        ballYDirection = -1; 
    }
    if(Math.round(Math.random()) == 1){
ballXDirection = Math.random() * 1; //more random directions
    }
    else{
        ballXDirection = Math.random() * -1; //more random directions
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(ballX <= 0 + ballRadius){
        ballXDirection *= -1;
    }
    if(ballX >= gameWidth - ballRadius){
        ballXDirection *= -1;
    }
    if(ballY <= 0){
         ballYDirection *= -1;
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
    if (ballY >= gameHeight) {
         ballYDirection *= -1;
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }
    if(ballY <= (paddle1.y + paddle1.height + ballRadius)){
        if(ballX > paddle1.x && ballX < paddle1.x + paddle1.width){
            ballY = (paddle1.y + paddle1.height) + ballRadius; // if ball gets stuck
            ballYDirection *= -1;
//             ballSpeed += 1;fd
        }
    }
    if(ballY >= (paddle2.y - ballRadius)){
        if(ballX > paddle2.x && ballX < paddle2.x + paddle2.width){
            ballY = paddle2.y - ballRadius; // if ball gets stuck
            ballYDirection *= -1;
//             ballSpeed += 1;
        }
    }
};
function changeDirection(event){
                    const keyPressed = event.keyCode;
                    console.log(keyPressed);
    const paddle1Left = 65;
    const paddle1Right = 68;
    const paddle2Left = 65;
    const paddle2Right = 68;

    switch(keyPressed){
        case(paddle1Left):
            if(paddle1.x > 0 && paddle2.x > 0){
                                paddle1.x -= paddleSpeed;
                                paddle2.x -= paddleSpeed;
            }
            break;
        case(paddle1Right):
            if(paddle1.x < gameWidth - paddle1.width && paddle2.x< gameWidth - paddle2.width){
                paddle1.x += paddleSpeed;
                paddle2.x += paddleSpeed;
            }
            break;
    }
};

function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame() {
                    console.log("in the reset game");
                    if (localStorage.getItem("rod1") < player1Score) {
                                        
localStorage.setItem("rod1",player1Score.toString
                    ());
                    }

                    if (localStorage.getItem("rod2") < player2Score) {
localStorage.setItem("rod2",player2Score.toString());                   
                     
                    }
                    AlertOfMaxScore();
    player1Score = 0;
    player2Score = 0;
let paddle1 = {
    width: 100,
    height: 25,
    x: 200,
    y: 0
};
let paddle2 = {
    width: 100,
    height: 25,
    x: 200,
    y: gameHeight - 25
};
    ballSpeed = 3;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};