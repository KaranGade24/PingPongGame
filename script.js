const leftPlayer = document.querySelector(".left-player-box");
const rightPlayer = document.querySelector(".right-player-box");
const ball = document.querySelector(".ball");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const resultPanel = document.querySelector(".result-panel");
const music = document.querySelector("#music");

var xminLeft = 5;
var xminRight = 5;
const xMax = 344;
var speed = 1;
const sliderSpeed = 20;

document.body.addEventListener("keydown", (e) => {
  if (e.key == "w") {
    if (xminLeft > 5) {
      xminLeft -= sliderSpeed;
      leftPlayer.style.top = xminLeft + "px";
    }
  } else if (e.key == "s") {
    if (xminLeft < xMax) {
      xminLeft += sliderSpeed;
      leftPlayer.style.top = xminLeft + "px";
    }
  }
  //   console.log(e.key  );
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    if (xminRight > 5) {
      xminRight -= sliderSpeed;
      rightPlayer.style.top = xminRight + "px";
    }
  } else if (e.key == "ArrowDown") {
    if (xminRight < xMax) {
      xminRight += sliderSpeed;
      rightPlayer.style.top = xminRight + "px";
    }
  }
  //   console.log(e.key  );
});

var startX = 30,
  endX = 635,
  startY = 5,
  endY = 416;

var flagXR = 1,
  flagYB = 1,
  failFlag = 0;

var ballX = 40,
  ballY = 40;

startBtn.addEventListener("click", function a() {
  music.play();
  startBtn.removeEventListener("click", a);
  setInterval(() => {
    startBtn.addEventListener("click", () => {
      resultPanel.innerHTML = "";
      failFlag = 0;
      speed = 1;
      music.play();
    });

    if (ballX <= endX && flagXR) {
      // for x right
      ballX += speed;
      ball.style.left = ballX + "px";
      // for x right flag = 0
      if (ballX == endX) {
        flagXR = 0;
      }
      if (ballY <= endY && flagYB) {
        ballY += speed;
        ball.style.top = ballY + "px";
        if (ballY == endY) {
          flagYB = 0;
        }
      } else {
        ballY -= speed;
        ball.style.top = ballY + "px";
        if (ballY == startY) {
          flagYB = 1;
        }
      }
    } else {
      // for x left
      ballX -= speed;
      ball.style.left = ballX + "px";
      // for x right flag = 1
      if (ballX == startX) {
        flagXR = 1;
      }
      if (ballY <= endY && flagYB) {
        ballY += speed;
        ball.style.top = ballY + "px";
        if (ballY == endY) {
          flagYB = 0;
        }
      } else {
        ballY -= speed;
        ball.style.top = ballY + "px";
        if (ballY == startY) {
          flagYB = 1;
        }
      }
    }

    // console.log(rightPlayer.offsetTop + 100);
    if (
      ballX == endX &&
      ballY <= rightPlayer.offsetTop + 100 &&
      ballY >= rightPlayer.offsetTop
    ) {
      // console.log("wing1");
    } else if (ballX == endX) {
      // console.log("fail1");
      failFlag = 1;
      result("Left Player is WIN");
    }
    if (
      ballX == startX &&
      ballY <= leftPlayer.offsetTop + 100 &&
      ballY >= leftPlayer.offsetTop - 5
    ) {
      // console.log("wing2");
    } else if (ballX == startX) {
      // console.log("fail2");
      failFlag = 1;
      if (failFlag) {
        // console.log({ failFlag });
        ball.style.top = "100px";
        ball.style.left = "100px";
        // failFlag = 0;
        result("Right Player is WIN");
        // console.log({ failFlag });
      }
    }

    // console.log(ball.offsetLeft, ball.offsetTop, rightPlayer.offsetTop);
  }, 4);
});
function result(str) {
  resultPanel.innerHTML = str;
  speed = 0;
  ball.style.left = "100px";
  failFlag = 0;
  music.pause();
}
