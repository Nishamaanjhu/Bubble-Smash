const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let gameActive = true;
let gameInterval;
let bubbleSpeed = 6; // Bubble fall speed (seconds)
let bubbleSpawnRate = 600; // Spawn bubble every 600 ms
let gameDuration = 30 * 1000; // 30 seconds

// Function to create a bubble
function createBubble() {
    if (!gameActive) return;

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Random size
    const size = Math.random() * 50 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random horizontal position
    const posX = Math.random() * (gameContainer.offsetWidth - size);
    bubble.style.left = `${posX}px`;

    // Random animation duration
    bubble.style.animationDuration = `${bubbleSpeed}s`;

    // Add click/tap event for score
    bubble.addEventListener("click", () => {
        if (gameActive) {
            score += Math.floor(100 / size); // Smaller bubble, more points
            scoreBoard.textContent = `Score: ${score}`;
            bubble.remove();
        }
    });

    // Remove bubble when animation ends
    bubble.addEventListener("animationend", () => {
        bubble.remove();
    });

    gameContainer.appendChild(bubble);
}

// Start Game
function startGame() {
    score = 0;
    gameActive = true;
    gameContainer.innerHTML = ""; // Clear previous bubbles
    scoreBoard.textContent = "Score: 0";
    gameOverScreen.classList.remove("show");

    // Spawn bubbles continuously
    gameInterval = setInterval(createBubble, bubbleSpawnRate);

    // End game after game duration
    setTimeout(() => {
        endGame();
    }, gameDuration);
}

// End Game
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    finalScore.textContent = score;
    gameOverScreen.classList.add("show"); // Show Game Over popup
}

// Restart Game on Button Click
restartBtn.addEventListener("click", () => {
    startGame();
});

// Touch support for mobile
gameContainer.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("bubble")) {
        element.click();
    }
});

// Start game initially
startGame();
