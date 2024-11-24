// Simple p5.js Clock Template
// Golan Levin, 2016-2023

var prevSec;
var millisRolloverTime;
var i;
var j;

var w = 2400;
var h = 960;
var sizeOfText = 40;
var cellSize = h/2;
var tX = 500;
var tY = 600;

var writing_guang;
var still_frames;

function preload() {
  // Load the GIF
  writing_guang = createImg("https://cdn.glitch.global/78d088eb-536b-4c54-9682-d312fc67d687/writing_guang.gif?v=1732331066349", "guang");
  still_guang_1 = loadImage("https://cdn.glitch.global/78d088eb-536b-4c54-9682-d312fc67d687/still_guang_1.png?v=1732414613674");
  still_guang_2 = loadImage("https://cdn.glitch.global/78d088eb-536b-4c54-9682-d312fc67d687/still_guang_2.png?v=1732414618791");
  still_guang_3 = loadImage("https://cdn.glitch.global/78d088eb-536b-4c54-9682-d312fc67d687/still_guang_3.png?v=1732414624810");
  still_guang_4 = loadImage("https://cdn.glitch.global/78d088eb-536b-4c54-9682-d312fc67d687/still_guang_4.png?v=1732414629898");
}


//--------------------------
function setup() {
  frameRate(12);
	createCanvas(w + 40, h + 100);
	millisRolloverTime = 0;
}

//--------------------------
function draw() {
	blendMode(BLEND);
	background(255);
	textFont('Helvetica');
	textSize(sizeOfText);
  textAlign(LEFT);
  noStroke();
  text("Zhong/Light, 2024.", 20, 60);
	textAlign(CENTER);

	blendMode(MULTIPLY);

	// Fetch the current time
	var H = hour();
	var M = minute() + second() / 60;
	var S = second();

	// Reckon the current millisecond, 
	// particularly if the second has rolled over.
	// Note that this is more correct than using millis()%1000;
	if (prevSec != S) {
		millisRolloverTime = millis();
	}
	prevSec = S;
	var mils = floor(millis() - millisRolloverTime);

  translate(20, 80);
	drawGrid();

	if (S < 5) {
		fill(((S + (mils / 1000.0)) / 5) * 255);
		noStroke();
		drawTime();
		stroke(0);
	}
  translate(-20, -80);
}

function drawGrid() {
  // bruh...
	for (i = 0; i < 5; i++) {
		for (j = 0; j < 2; j++) {
			cellNum = j * 5 + i;
      strokeWeight(2);
      stroke(200);
      line(i * cellSize + cellSize/2, j * cellSize, i * cellSize + cellSize/2, (j + 1) * cellSize);
      line(i * cellSize, j * cellSize + cellSize/2, (i + 1) * cellSize, j * cellSize + cellSize/2);
      line(i * cellSize, j * cellSize, (i + 1) * cellSize, (j + 1) * cellSize);
      line(i * cellSize, (j + 1) * cellSize, (i + 1) * cellSize, j * cellSize);
			stroke(0);
			noFill();
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
			fill(0);
      
			if (floor(second() / 6) == cellNum) {
				drawing(i, j);
			} if (floor(second() / 6) > cellNum) {
        drawStill(i, j);
			}
		}
	}
}

function drawing(i, j) {
  writing_guang.position(i * cellSize + 20, j * cellSize + 80);
}

function drawStill(i, j) {
  still_frames = [still_guang_1, still_guang_2, still_guang_3, still_guang_4];
  image(still_frames[floor(random(4))], i * cellSize, j * cellSize, cellSize, cellSize);
}

function drawTime() {
	hours = 17 - hour() - 1;
	if (hours < 0) {
		hours += 24;
	}
	minutes = 60 - minute();
	seconds = 60 - second();

	if (hours > 1 && minutes > 1) {
		text(hours + ' hours and ' + minutes + ' minutes until dad picks me up', tX, tY);
	} else if (hours == 1 && minutes > 1) {
		text(hours + ' hour and ' + minutes + ' minutes until dad picks me up', tX, tY);
	} else if (hours == 0 && minutes > 1) {
		text(minutes + ' minutes until dad picks me up', tX, tY);
	} else if (hours == 1 && minutes == 1) {
		text(hours + ' hour and ' + minutes + ' minute until dad picks me up', tX, tY);
	} else if (hours == 0 && minutes == 1) {
		text(seconds + ' second(s) until dad picks me up', tX, tY);
	} else if (hours == 0 && minutes == 0) {
		text('dad should be here any minute now.', tX, tY);
	} else if (hours > 1 && minutes == 1) {
		text(hours + ' hours and ' + minutes + ' minute until dad picks me up', tX, tY);
	} else if (hours > 1 && minutes == 0) {
		text(hours + ' hours until dad picks me up', tX, tY);
	}
}