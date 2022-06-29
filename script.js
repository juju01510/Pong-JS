const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let ballRadius = 5;


let paddleHeight = 50;
let paddleWidth = 5;
let paddleY1 = (canvas.height - paddleHeight)/2;
let paddleY2 = (canvas.height - paddleHeight)/2;

//direction haut/bas paddle1
let upPressed1 = false;
let downPressed1 = false;

//direction haut/bas paddle2
let upPressed2 = false;
let downPressed2 = false;

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

function drawPaddle1() {
	ctx.beginPath();
	ctx.rect(0, paddleY1, paddleWidth, paddleHeight);
	ctx.fillStyle = "blanchedalmond";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle2() {
    ctx.beginPath();
	ctx.rect(canvas.width - paddleWidth, paddleY2, paddleWidth, paddleHeight);
	ctx.fillStyle = "blanchedalmond";
	ctx.fill();
	ctx.closePath();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle1()
    drawPaddle2()

    if (downPressed1 && paddleY1 < canvas.height - paddleHeight) {
        paddleY1 += 5;
    } else if (upPressed1 && paddleY1 > 0) {
        paddleY1 -= 5;
    }

    if (downPressed2 && paddleY2 < canvas.height - paddleHeight) {
        paddleY2 += 5;
    } else if (upPressed2 && paddleY2 > 0) {
        paddleY2 -= 5;
    }


    requestAnimationFrame(draw);

}
draw()






















