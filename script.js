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
let gameActive = true; // Track game state

// Function to Create Bubble
function createBubble() {
    if (!gameActive) return; // Stop spawning if game is over

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Random size
    const size = Math.random() * 50 + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random position
    const posX = Math.random() * (gameContainer.offsetWidth - size);
    bubble.style.left = `${posX}px`;

    // Set animation duration
    const duration = bubbleSpeed + Math.random() * 2;
    bubble.style.animation = `floatDown ${duration}s linear forwards`;

    // Add event listener for click/tap
    bubble.addEventListener("click", () => {
        if (!gameActive) return;
        score += Math.floor(100 / size); // Smaller bubbles = More points
        scoreBoard.textContent = `Score: ${score}`;
        bubble.remove();
    });

    // Remove bubble when animation ends
    bubble.addEventListener("animationend", () => {
        bubble.remove();
    });

    gameContainer.appendChild(bubble);
}

// Function to Start Game
function startGame() {
    score = 0;
    gameActive = true;
    scoreBoard.textContent = `Score: 0`;
    gameOverScreen.classList.add("hidden");

    // Start spawning bubbles
    gameInterval = setInterval(createBubble, bubbleSpawnRate);

    // End game after duration
    setTimeout(() => {
        endGame();
    }, gameDuration * 1000);
}

// Function to End Game
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    finalScore.textContent = score;
    gameOverScreen.classList.remove("hidden");
}

// Restart Game
restartBtn.addEventListener("click", () => {
    gameOverScreen.classList.add("hidden");
    gameContainer.innerHTML = ""; // Clear bubbles
    startGame();
});

// Handle Touch Events (Tap Support for Mobile)
gameContainer.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("bubble")) {
        element.click();
    }
});

// Start the Game
startGame();
