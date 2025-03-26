const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let gameInterval;
let gameDuration = 30; // Game lasts for 30 seconds
let bubbleSpeed = 5; // Speed of falling bubbles
let bubbleSpawnRate = 800; // Time in ms between bubble spawns
let gameActive = true;

// Function to Create Bubble
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

    // Falling animation duration
    const duration = bubbleSpeed + Math.random() * 2;
    bubble.style.animation = `floatDown ${duration}s linear forwards`;

    // Click/Tap Event for Scoring
    bubble.addEventListener("click", () => {
        if (gameActive) {
            score += Math.floor(100 / size); // Smaller bubble = more points
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

// Start the Game
function startGame() {
    score = 0;
    gameActive = true;
    scoreBoard.textContent = `Score: 0`;
    gameOverScreen.classList.remove("show"); // Hide at start

    // Spawn bubbles repeatedly
    gameInterval = setInterval(createBubble, bubbleSpawnRate);

    // End game after specified duration
    setTimeout(() => {
        endGame();
    }, gameDuration * 1000);
}

// End the Game
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    finalScore.textContent = score;
    gameOverScreen.classList.add("show"); // Show popup at the end
}

// Restart the Game
restartBtn.addEventListener("click", () => {
    gameContainer.innerHTML = ""; // Clear bubbles
    startGame(); // Restart
});

// Handle Touch Events for Mobile
gameContainer.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("bubble")) {
        element.click(); // Trigger score on touch
    }
});

// Start Game Initially
startGame();
