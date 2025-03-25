var numMoons;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noFill();
	stroke(255, 255, 255, 122);
	strokeWeight(0.4);
	numMoons = 9;
}

function draw() {
	displacement = map(tan(millis()/3000), 0, 1, 1, 1.05);

	background(0);
	circle(mouseX, mouseY, 20);
	moons();
}

function moons() {
	for (var i = 0; i < numMoons; i ++) {
		circle((i + 5) * (displacement * windowWidth/18), windowHeight/2, 20);
		circle((i + 5) * (displacement * windowWidth/18), windowHeight/2, i * 100);
		circle((i + 5) * (displacement * windowWidth/18), windowHeight/2, (numMoons - i) * 150);
	}
}