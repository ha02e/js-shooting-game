//canvas 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 45;
let spaceshipY = canvas.height - 90;

//총알
let bulletList = []; //총알들 저장하는 리스트
function Bullet() {
  this.x = 0;
  this.y = 0;
  //초기화
  this.init = function () {
    this.x = spaceshipX + 29;
    this.y = spaceshipY - 8;

    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };
}

//적군
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 80);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 3;
  };
}

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
    //console.log("무슨 키가 눌렸어?", event.keyCode);
    keysDown[event.keyCode] = true;
  });
  //키를 누르고 뗐을 때
  document.addEventListener("keyup", function () {
    delete keysDown[event.keyCode];

    //스페이스바를 누르고 뗐을 때 총알 발사
    if (event.keyCode == 32) {
      createBullet();
    }
  });
}

function createBullet() {
  let b = new Bullet();
  b.init();
  console.log("새로운 총알 리스트", bulletList);
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000);
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
  } else if (spaceshipX >= canvas.width - 90) {
    spaceshipX = canvas.width - 90;
  }

  //총알의 y좌표 업데이트 함수
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 90, 69);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y, 70, 64);
  }
}

function main() {
  update(); //좌표값 업데이트
  render(); //렌더
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
createEnemy();
main();
