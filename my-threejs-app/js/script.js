let scene, camera, renderer, listener, sound, soundSource;

function init() {
	// Basic scene setup
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Create a cube to interact with
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// Position the camera
	camera.position.z = 5;

	// Set up the listener and sound
	listener = new THREE.AudioListener();
	camera.add(listener);

	// Load sound file (make sure it's in the same directory or provide a path)
	const audioLoader = new THREE.AudioLoader();
	sound = new THREE.Audio(listener);
	audioLoader.load('path/to/your/soundfile.mp3', function (buffer) {
	sound.setBuffer(buffer);
	sound.setLoop(true);
	sound.setVolume(0.5);
	sound.play();  // Automatically play sound
	});

	// Animation loop
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

init();
