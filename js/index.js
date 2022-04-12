// Game constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOver = new Audio("../music/gameover.mp3");
const moveMusic = new Audio("../music/move.mp3");
const bgMusic = new Audio("../music/music.mp3");
let speed = 6;
let despeed = 6;
let score = 0;
let lpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 12, y: 12 };
//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lpainttime) / 1000 < 1 / speed) return;
  lpainttime = ctime;
  // bgMusic.play();
  GameEngine();
}
function myFunction(sx) {
  speed = sx;
}
// if u change speed
ele = document.getElementById("onex");
ele.addEventListener("click", (e) =>{
  speed = despeed;
});
 ele = document.getElementById("twox");
ele.addEventListener("click", (e) =>{
  speed = despeed*1.5;
});
 ele = document.getElementById("thrx");
ele.addEventListener("click", (e) =>{
  speed = despeed*2;
});
 ele = document.getElementById("fourx");
ele.addEventListener("click", (e) =>{
  speed =despeed*2.5;
});


function isCollide(sarr) {
  // if snake bump into itself
  for (let i = 1; i < sarr.length; i++) {
    if( sarr[i].x === sarr[0].x &&  sarr[i].y === sarr[0].y)
    {
      return true;
    }
  }
   if(sarr[0].x >=18  || sarr[0].x <= 0) {return true;}
   else if(sarr[0].y >=18  || sarr[0].y <=0) {return true;}
   else {
     return false;
   }
}

function GameEngine() {
  // part1
  if (isCollide(snakeArr)) {
    gameOver.play();
    bgMusic.pause();
    score = 0;
    inputDir = { x: 0, y: 0 };
    alert("Game Over. press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    // bgMusic.play();
    score = 0;
  }

  // if you have eaten the food
  if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
    let a = 2;
    let b = 17;
    score+=1;
    scoreBox.innerHTML = "Score: " + score;
    if(score>hiscoreval){
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
  }
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = {...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  // console.log(snakeArr[0].x);
  snakeArr[0].y += inputDir.y;

  // part 2 display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic starts here
// here we will bulid a game loop
// request animation framework is preffered over set interaval
window.requestAnimationFrame(main);
bgMusic.play;
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.addEventListener("keydown", (e) => {
  // inputDir = { x: 0, y: 1 }; // start game
  switch (e.key) {
    case "ArrowUp":
      moveMusic.play();
      inputDir.x = 0;
      inputDir.y = -1;
      bgMusic.play();
      // console.log("ArrowUp");
      break;
    case "ArrowDown":
      moveMusic.play();
      inputDir.x = 0;
      inputDir.y = 1;
      bgMusic.play();
      // console.log("ArrowDown");
      break;
    case "ArrowLeft":
      moveMusic.play();
      inputDir.x = -1;
      inputDir.y = 0;
      bgMusic.play();
      // console.log("ArrowLeft");
      break;
    case "ArrowRight":
      moveMusic.play();
      inputDir.x = 1;
      inputDir.y = 0;
      bgMusic.play();
      // console.log("ArrowRight");
      break;
    case "Enter":
      break;

    default:
      break;
  }
});
