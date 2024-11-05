// Copyright (c) 2018-2023 ml5
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// Originally from https://editor.p5js.org/ml5/sketches/OukJYAJAb
// Requires: https://unpkg.com/ml5@0.20.0-alpha.3/dist/ml5.js

let video;
let bodypose;
let poses = [];
let options = {
	maxPoses: 1,
	flipHorizontal: true
};
let mode = false;
var changing = false;
var borderWidth = 185;
let song;
let startNow = false;
let wristArray = [];

function preload() {
	// load sound
	soundFormats('mp3');
	song = loadSound('motion_picture_soundtrack.mp3');

	//Load the handpose model.
	bodypose = ml5.bodypose("BlazePose", options);
}

function organs(nose, leftWrist, rightWrist, leftHip, leftKnee, leftOrRight) {
	noFill();
	//rect(640 + borderWidth + 5, 5, 640 - 2* borderWidth - 10, 470);

	if (leftOrRight == 'left') {
		beginShape();
		vertex(640 + borderWidth + 5, 5);
		vertex(640 + borderWidth + 5, min(nose[1], rightWrist[1]));
		vertex(640 + nose[0], min(nose[1], rightWrist[1]));
		vertex(640 + nose[0], max(nose[1], rightWrist[1]));
		vertex(640 + borderWidth + 5, max(nose[1], rightWrist[1]));
		vertex(640 + borderWidth + 5, 475);
		vertex(1280 - borderWidth - 5, 475);
		vertex(1280 - borderWidth - 5, leftHip[1]);
		vertex(640 + leftHip[0], leftHip[1]);
		vertex(640 + leftHip[0], leftKnee[1]);
		vertex(1280 - borderWidth - 5, leftKnee[1]);
		vertex(1280 - borderWidth - 5, 5);
		endShape(CLOSE);
	} else {
		beginShape();
		vertex(1280 - borderWidth - 5, 5);
		vertex(1280 - borderWidth - 5, min(nose[1], rightWrist[1]));
		vertex(640 + nose[0], min(nose[1], rightWrist[1]));
		vertex(640 + nose[0], max(nose[1], rightWrist[1]));
		vertex(1280 - borderWidth - 5, max(nose[1], rightWrist[1]));
		vertex(1280 - borderWidth - 5, 475);
		vertex(640 + borderWidth + 5, leftHip[1]);
		vertex(640 + leftHip[0], leftHip[1]);
		vertex(640 + leftHip[0], leftKnee[1]);
		vertex(640 + borderWidth + 5, leftKnee[1]);
		vertex(640 + borderWidth + 5, 5);
		endShape(CLOSE);
	}

	beginShape();
	vertex(leftWrist[0] + 640, leftWrist[1]);
	vertex(rightWrist[0] + 640, leftWrist[1]);
	vertex(rightWrist[0] + 640, rightWrist[1]);
	vertex(leftWrist[0] + 640, rightWrist[1]);
	endShape(CLOSE);

	numOfCircles = 30;

	w = abs(rightWrist[0] - leftWrist[0]) / 10;
	startingX = min(rightWrist[0], leftWrist[0]) + w / 2;
	endingX = max(rightWrist[0], leftWrist[0]) - w / 2;
	for (var i = 0; i <= numOfCircles; i++) {
		x = startingX + (endingX - startingX) / numOfCircles * i;
		y = (leftWrist[1] + rightWrist[1]) / 2;
		ellipse(640 + x, y, w, abs(rightWrist[1] - leftWrist[1]));
	}

	rect(nose[0] - 10 + 640 + random(-3, 3), nose[1] - 10 + random(-3, 3), 20, 20);
}

function harp(leftWrist, rightWrist) {
	noFill();
	wristArray.push(new Circle(leftWrist[0], leftWrist[1]));
	wristArray.push(new Circle(rightWrist[0], rightWrist[1]));
	for (var i = 0; i < wristArray.length; i++) {
		p = wristArray[i];
		p.display();
		p.diameter += 1;
	}
}

function part3(leftWrist, rightWrist) { //155000
	fill(0);
	wristArray.push(new Circle(leftWrist[0], leftWrist[1]));
	wristArray.push(new Circle(rightWrist[0], rightWrist[1]));
	for (var i = 0; i < wristArray.length; i++) {
		p = wristArray[i];
		p.displayInk();
		p.diameter += 0.02;
	}
}

function drawText(words, start) {
	fill(0);
	textAlign(CENTER);
	textSize(15);
	text(words, 320, 20);

}

function setup() {

	createCanvas(1280, 480);
	strokeWeight(0.05);

	// Create the video and hide it
	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();

	// Start detecting poses in the webcam video
	bodypose.detectStart(video, gotPoses);
}

function changeBorderWidth() {
	borderWidth = max(map(millis() - startNow, 0, 98000, 185, 0), 0);
}

function draw() {
	background(246, 244, 235, 30);

	// Draw all the tracked landmark points
	for (let i = 0; i < poses.length; i++) {
		let pose = poses[i];
		leftOrRight = whereAmILooking(pose);

		nose = [pose.keypoints[0].x, pose.keypoints[0].y];
		leftWrist = [pose.keypoints[15].x, pose.keypoints[15].y];
		rightWrist = [pose.keypoints[16].x, pose.keypoints[16].y];
		leftHip = [pose.keypoints[23].x, pose.keypoints[23].y];
		leftKnee = [pose.keypoints[25].x, pose.keypoints[25].y];
		if (mode == false) {
			organs(nose, leftWrist, rightWrist, leftHip, leftKnee, leftOrRight);
			for (let j = 0; j < pose.keypoints.length; j++) {
				let keypoint = pose.keypoints[j];
				fill(246, 244, 235);
				circle(keypoint.x + 640, keypoint.y, 10);
			}
		} else if (mode == true) {
			harp(leftWrist, rightWrist);
		} else {
			part3(leftWrist, rightWrist);
			organs(nose, leftWrist, rightWrist, leftHip, leftKnee, leftOrRight);
		}

		// Draw the webcam video

		fill(255);
		rect(0, 0, 640, 480);
		noFill();
		push();
		if (options.flipHorizontal) {
			translate(width / 2, 0);
			scale(-1, 1);
		}
		let transparency = 255; // reduce this to make video transparent
		tint(255, 255, 255, transparency);
		image(video, 0, 0, width / 2, height);
		pop();

	}
	if (mode == false) {
		drawText('I', 1000 + 5000);
	} else if (mode == true) {
		drawText('II', 98800 + 5000);
	} else {
		drawText('III', 156000 + 5000);
	}
	drawBorder();

	if (startNow == false && millis() > 5000) {
		startNow = millis() * 1;
		// play song
		song.setVolume(0.5);
		song.play();
	}
	if (millis() - startNow > 98800) {
		mode = true;

	}
	if (millis() - startNow > 156000) {
		mode = 3;


	}
	changeBorderWidth();
}

function drawBorder() {
	fill(0);
	rect(0, 0, borderWidth, 480);
	rect(width / 2 - borderWidth, 0, borderWidth * 2, 480);
	rect(width - borderWidth, 0, borderWidth, 480);
}

function whereAmILooking(pose) {
	// left = false
	// right = true
	nosex = pose.keypoints[0].x;
	nosey = pose.keypoints[0].y;
	leftEarx = pose.keypoints[7].x;
	leftEary = pose.keypoints[7].y;
	rightEarx = pose.keypoints[8].x;
	rightEary = pose.keypoints[8].y;

	stroke(0);
	fill(0);
	if (abs(nosex - leftEarx) > abs(nosex - rightEarx)) {
		return 'left';

	} else {
		return 'right';
	}
}


// circle
class Circle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.diameter = 1;
	}

	display() {
		if (this.diameter < 160) {
			circle(this.x + 640, this.y, this.diameter);
		}
	}

	displayInk() {
		if (this.diameter < 20) {
			circle(this.x + 640, this.y, this.diameter);
		}
	}
}

// Callback function for when bodypose outputs data
function gotPoses(results) {
	// Save the output to the poses variable
	poses = results;
}

// This information may be helpful:
const ML5BODY_NOSE = 0;
const ML5BODY_LEFT_EYE_INNER = 1;
const ML5BODY_LEFT_EYE = 2;
const ML5BODY_LEFT_EYE_OUTER = 3;
const ML5BODY_RIGHT_EYE_INNER = 4;
const ML5BODY_RIGHT_EYE = 5;
const ML5BODY_RIGHT_EYE_OUTER = 6;
const ML5BODY_LEFT_EAR = 7;
const ML5BODY_RIGHT_EAR = 8;
const ML5BODY_MOUTH_LEFT = 9;
const ML5BODY_MOUTH_RIGHT = 10;
const ML5BODY_LEFT_SHOULDER = 11;
const ML5BODY_RIGHT_SHOULDER = 12;
const ML5BODY_LEFT_ELBOW = 13;
const ML5BODY_RIGHT_ELBOW = 14;
const ML5BODY_LEFT_WRIST = 15;
const ML5BODY_RIGHT_WRIST = 16;
const ML5BODY_LEFT_PINKY = 17;
const ML5BODY_RIGHT_PINKY = 18;
const ML5BODY_LEFT_INDEX = 19;
const ML5BODY_RIGHT_INDEX = 20;
const ML5BODY_LEFT_THUMB = 21;
const ML5BODY_RIGHT_THUMB = 22;
const ML5BODY_LEFT_HIP = 23;
const ML5BODY_RIGHT_HIP = 24;
const ML5BODY_LEFT_KNEE = 25;
const ML5BODY_RIGHT_KNEE = 26;
const ML5BODY_LEFT_ANKLE = 27;
const ML5BODY_RIGHT_ANKLE = 28;
const ML5BODY_LEFT_HEEL = 29;
const ML5BODY_RIGHT_HEEL = 30;
const ML5BODY_LEFT_FOOT_INDEX = 31;
const ML5BODY_RIGHT_FOOT_INDEX = 32;
