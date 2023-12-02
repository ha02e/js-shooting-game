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

let keysDown = {};
function setupKeyboardListener() {
  //키를 눌렀을 때
  document.addEventListener("keydown", function (event) {
    console.log("무슨 키가 눌렸어?", event.keyCode);
    keysDown[event.keyCode] = true;
  });
  //키를 누르고 뗐을 때
  document.addEventListener("keyup", function () {
    delete keysDown[event.keyCode];
  });
}

//방향키를 눌렀을 때 우주선 움직임
function update() {
  if (39 in keysDown) {
    //오른쪽 방향키 눌렀을 때
    spaceshipX += 4;
  }
  if (37 in keysDown) {
    //왼쪽 방향키 눌렀을 때
    spaceshipX -= 4;
  }

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  } else if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 66, 66);
}

function main() {
  update(); //좌표값 업데이트
  render(); //렌더
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
