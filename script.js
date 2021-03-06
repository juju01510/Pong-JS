const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 8;
let dy = 2;

let paddleHeight = 60;
let paddleWidth = 5;
let paddleY1 = (canvas.height - paddleHeight) / 2;
let paddleY2 = (canvas.height - paddleHeight) / 2;
let paddleSpeed = 8;

//direction haut/bas paddle1
let upPressed1 = false;
let downPressed1 = false;

//direction haut/bas paddle2
let upPressed2 = false;
let downPressed2 = false;

let midLineHeight = 320;
let midLineWidth = 5;

let score1 = 0;
let score2 = 0;

let color = "rgb(255, 235, 205)";
let colorP1 = "rgb(236, 23, 203)";
let colorP2 = "rgb(230, 240, 14)";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 81) {
		upPressed1 = true;
	} else if (e.keyCode == 87) {
		downPressed1 = true;
	}
	if (e.keyCode == 38) {
		upPressed2 = true;
	} else if (e.keyCode == 40) {
		downPressed2 = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 81) {
		upPressed1 = false;
	} else if (e.keyCode == 87) {
		downPressed1 = false;
	}
	if (e.keyCode == 38) {
		upPressed2 = false;
	} else if (e.keyCode == 40) {
		downPressed2 = false;
	}
}

function drawScore1() {
	ctx.font = "40px Arial";
	ctx.fillStyle = colorP1;
	ctx.fillText(score1, 180, 40);
}

function drawScore2() {
	ctx.font = "40px Arial";
	ctx.fillStyle = colorP2;
	ctx.fillText(score2, 275, 40);
}

function drawStart() {
	ctx.font = "35px Arial";
	ctx.fillStyle = color;
	ctx.fillText("-- Press Spacebar to play --", 25, canvas.height / 2 + 10);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle1() {
	ctx.beginPath();
	ctx.rect(5, paddleY1, paddleWidth, paddleHeight);
	ctx.fillStyle = colorP1;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle2() {
	ctx.beginPath();
	ctx.rect(-5 + canvas.width - paddleWidth, paddleY2, paddleWidth, paddleHeight);
	ctx.fillStyle = colorP2;
	ctx.fill();
	ctx.closePath();
}

function drawMidline() {
	ctx.beginPath();
	ctx.rect(canvas.width / 2 - midLineWidth / 2, 0, midLineWidth, midLineHeight);
	ctx.fillStyle = "rgb(255, 235, 205)";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle1();
	drawPaddle2();
	drawMidline();
	drawScore1();
	drawScore2();

	//   ball left paddle
	if (x + dx < ballRadius) {
		if (y > paddleY1 && y < paddleY1 + paddleHeight) {
			dx = -dx;
			color = colorP1;
		} else {
			//remet la balle en jeu
			x = canvas.width;
			y = canvas.height / 2;
			score2++;
			if (score2 == 11) {
				alert(`Le joueur 2 gagne`);
				document.location.reload();
			}
		}

		//	ball right paddle
	} else if (x + dx > canvas.width - ballRadius) {
		if (y > paddleY2 && y < paddleY2 + paddleHeight) {
			dx = -dx;
			color = colorP2;
		} else {
			//remet la balle en jeu
			x = canvas.width - canvas.width;
			y = canvas.height / 2;
			score1++;
			if (score1 == 11) {
				alert(`Le joueur 1 gagne`);
				document.location.reload();
			}
		}
	}
	//      ball top wall                  ball bottom wall
	if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
		dy = -dy;
	}
	if (downPressed1 && paddleY1 < canvas.height - paddleHeight) {
		paddleY1 += paddleSpeed;
	} else if (upPressed1 && paddleY1 > 0) {
		paddleY1 -= paddleSpeed;
	}

	if (downPressed2 && paddleY2 < canvas.height - paddleHeight) {
		paddleY2 += paddleSpeed;
	} else if (upPressed2 && paddleY2 > 0) {
		paddleY2 -= paddleSpeed;
	}

	x += dx;
	y += dy;

	requestAnimationFrame(draw);
}
// draw();
drawStart();

document.addEventListener("keypress", start);

function start(e) {
	if (e.keyCode == 32) {
		draw();

		document.removeEventListener("keypress", start);
	}
}
