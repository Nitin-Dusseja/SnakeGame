const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".key");

let foodX, foodY;
let SnakeX = 5, SnakeY = 10;
let SnakeBody = [];
let velocityX = 0,velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
let controlsDisplay = false;
let speed = 120;
let speedup = document.getElementById("speed");

// to handle game over conduction 
const handleGameOver = () => {
  clearInterval(setIntervalId); // 
  alert("Game Over ! Press Any Key to Play Again...");
  location.reload(); // for relode the page
}

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random()*30) + 1;
  foodY = Math.floor(Math.random()*30) + 1;
}

const changeDirection = (e) => {
  if(e.key === "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }else if(e.key === "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }else if(e.key === "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }else if(e.key === "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }
  // console.log(e);
}

controls.forEach(key => {
  key.addEventListener('click',()=> changeDirection({ key: key.dataset.key }))
  // console.log({ key: key });
});

const initGame = () => {
  if(gameOver) return handleGameOver();
  highscoreElement.innerText = `HighScore: ${highScore}`;


  // for make a grid for food
  let htmlMarkup = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`;
  
  if(SnakeX === foodX && SnakeY === foodY){
    changeFoodPosition();
    SnakeBody.push([foodX,foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score',highScore);
    scoreElement.innerText = `Score: ${score}`;

    // for speed up 
    if(speed>=90){
      speed-=1;
      speedup.innerHTML=90+(120-speed);
    }
  }

  
  // for moving snake head with the help of changeDirection function
  SnakeX += velocityX;
  SnakeY += velocityY;


  //if snake touch the wall
  if(SnakeX <= 0 || SnakeX > 30 || SnakeY <= 0 || SnakeY > 30){
    gameOver = true;
  } 

  for (let i = SnakeBody.length -1; i > 0; i--) {
    SnakeBody[i] = SnakeBody[i-1]; 
  }
  
  // snakeBody is a array of arrays of 2 indexs 0 & 1 
  SnakeBody[0] = [SnakeX,SnakeY]; 

  // here is you can see for loop to print snake body using arrays values
  for(let i = 0; i< SnakeBody.length; i++){
    htmlMarkup += `<div class="head" style="grid-area : ${SnakeBody[i][1]} / ${SnakeBody[i][0]}"></div>`;
    if(i !==0 && SnakeBody[0][1] === SnakeBody[i][1] && SnakeBody[0][0] === SnakeBody[i][0]){
      gameOver = true;
    }
  }
  console.clear();
  // console.log(SnakeBody);
  // to print snake head && food in play-board (grid display)
  playBoard.innerHTML = htmlMarkup;  
}




changeFoodPosition();
setIntervalId = setInterval(initGame,speed);

document.addEventListener("keydown", changeDirection);