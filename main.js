//canvas 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

//이미지 가져와 보여주기
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 33;
let spaceshipY = canvas.height - 114;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.png";
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 66, 66);
}

function main() {
  render();
  requestAnimationFrame(main);
}

loadImage();
main();
