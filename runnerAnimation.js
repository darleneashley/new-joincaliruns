const canvas = document.getElementById('runnerCanvas');
const ctx = canvas.getContext('2d');

const footsteps = [];       // dynamic footsteps array
const stepSpacing = 40;     // horizontal spacing between steps
const speed = 2;            // speed of footsteps
let stepSide = 1;           // 1 = right, -1 = left

// Load foot images
const leftFootImg = new Image();
leftFootImg.src = 'Footprints_PNG2(2).png';

const rightFootImg = new Image();
rightFootImg.src = 'Footprints_PNG2(1).png';

let imagesLoaded = 0;
[leftFootImg, rightFootImg].forEach(img => {
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 2) init(); // start animation after images load
    };
});

// Initialize with first few footsteps
function init() {
    // Create two initial footsteps to establish the pattern
    addFoot(50);
    addFoot(50 + stepSpacing);
    animate();
}

// Add a new foot in front of the last one
function addFoot(x = 0) {
    const y = canvas.height / 2 + stepSide * 10; // alternate left/right
    footsteps.push({ x, y, side: stepSide });
    stepSide *= -1; // switch foot
}

// Update footsteps positions
function updateFeet() {
    // Move all footsteps
    footsteps.forEach(foot => foot.x += speed);

    // Remove footsteps off-screen
    while (footsteps.length && footsteps[0].x > canvas.width + 30) {
        footsteps.shift();
    }

    // Add new foot if last foot has moved far enough
    const lastFoot = footsteps[footsteps.length - 1];
    if (lastFoot && lastFoot.x > stepSpacing) {
        addFoot(lastFoot.x - stepSpacing);
    }
}

// Draw all footsteps
function drawFeet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    footsteps.forEach(foot => {
        if (foot.side === 1) {
            ctx.drawImage(rightFootImg, foot.x - 15, foot.y - 15, 30, 30);
        } else {
            ctx.drawImage(leftFootImg, foot.x - 15, foot.y - 15, 30, 30);
        }
    });

    // Draw ground line
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 20);
    ctx.lineTo(canvas.width, canvas.height - 20);
    ctx.stroke();
}

// Animation loop
function animate() {
    updateFeet();
    drawFeet();
    requestAnimationFrame(animate);
}
