const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("scoreBoard");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let score = 0;
let gameInterval;
let gameDuration = 30; // Game duration in seconds
let bubbleSpeed = 5; // Speed of bubble falling (seconds)
let bubbleSpawnRate = 800; // Time in ms between bubble spawns

// Function to Create Bubble
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Random size
    const size = Math.random() * 50 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random position
    const posX = Math.random() * (gameContainer.offsetWidth - size);
    bubble.style.left = `${posX}px`;

    // Random speed
    const duration = bubbleSpeed + Math.random() * 2;
    bubble.style.animationDuration = `${duration}s`;

    // Add event listener for click/tap
    bubble.addEventListener("click", () => {
        score += Math.floor(100 / size); // Smaller bubbles = More points
        scoreBoard.textContent = `Score: ${score}`;
        bubble.remove();
    });

    // Remove bubble if it falls off
    bubble.addEventListener("animationend", () => {
        bubble.remove();
    });

    gameContainer.appendChild(bubble);
}

// Function to Start Game
function startGame() {
    score = 0;
    scoreBoard.textContent = `Score: 0`;
    gameOverScreen.classList.add("hidden");

    // Spawn bubbles continuously
    gameInterval = setInterval(createBubble, bubbleSpawnRate);

    // End game after duration
    setTimeout(() => {
        endGame();
    }, gameDuration * 1000);
}

// Function to End Game
function endGame() {
    clearInterval(gameInterval);
    finalScore.textContent = score;
    gameOverScreen.classList.remove("hidden");
}

// Restart Game
function restartGame() {
    startGame();
}

// Handle Touch Events (Tap)
gameContainer.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("bubble")) {
        element.click();
    }
});

// Start the Game
startGame();
