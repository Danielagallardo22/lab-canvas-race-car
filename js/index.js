let canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');

let background = new Image()
background.src = "./images/road.png"

//load the image of my car 
const carImage = new Image()
carImage.src = "./images/car.png"

class player {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }
  moveRight() {
    this.x += 10
  }
  moveLeft() {
    this.x -= 10
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
 

  collisionCheck(obstacle) {
    if (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.height + this.y > obstacle.y
    ) {
      // Collision detected!

      return true

    } else {

      return false
    }
  }
}

class obstacle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

  }

  moveDown() {
    this.y += 5
  }
  draw() {

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height, "color");
  }


}
let myPlayer = new player(215, 530, 70, 150,carImage)

let frameCount = 0;

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
}

window.addEventListener("keydown", function (e) {

  switch (e.code) {
    case 'ArrowLeft':
      myPlayer.moveLeft();
      break;
    case 'ArrowRight':
      myPlayer.moveRight();
      break;
  }

})


let scoreElement = document.querySelector(".score")
let score =0;
let intervalID;

let obstacleArr = []


function startGame() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  myPlayer.draw()
  
  

  frameCount++;
  if (frameCount % 180 == 0) {

    // do this if you want to get random sizes of the falling obstacle but since is an image leave one specific size. 
    // let randomWidth = 10 * Math.random() + 10;
    // let randomHeight = 10 * Math.random() + 10;
    let randomX = (500 - 100) * Math.random();

    const obstaclesFalling = new obstacle(randomX, 0, 250, 30, "orange");

    obstacleArr.push(obstaclesFalling);
  }

  

  for (let i = 0; i < obstacleArr.length; i++) {

    obstacleArr[i].draw()
    obstacleArr[i].moveDown();

    if (myPlayer.collisionCheck(obstacleArr[i])) {
        clearInterval(intervalID);
       
        let loser = document.querySelector(".loser")
        loser.style.visibility = "visible"
        obstacleArr = []
        score = 0
        

       

    }


    if (obstacleArr[i].y >= canvas.height) {
        score += 1;
        scoreElement.innerText = `${score}`;
        obstacleArr.shift()
    }

} }

    intervalID = setInterval(startGame, 16)








