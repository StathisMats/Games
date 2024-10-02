const gridSize = 4;
let robotPosition = { x: 0, y: 0 };
let goalPosition = { x: 0, y: 0 };
let commands = [];

// Function to generate a random position on the grid
function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}

// Initialize the game and randomize robot and goal positions
function initializeGame() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear existing grid

    // Randomize the robot position
    robotPosition = getRandomPosition();

    // Randomize the goal position and ensure it's not the same as the robot's
    do {
        goalPosition = getRandomPosition();
    } while (robotPosition.x === goalPosition.x && robotPosition.y === goalPosition.y);

    // Render the grid with robot and goal
    renderGrid();
}

// Function to render the grid with the robot and goal
function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear the grid

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');

            // Place the robot
            if (i === robotPosition.y && j === robotPosition.x) {
                const robot = document.createElement('div');
                robot.classList.add('robot');
                robot.textContent = '🤖';
                cell.appendChild(robot);
            }

            // Place the goal (e.g., a star)
            if (i === goalPosition.y && j === goalPosition.x) {
                const goal = document.createElement('div');
                goal.classList.add('goal');
                goal.textContent = '⭐';
                cell.appendChild(goal);
            }

            grid.appendChild(cell);
        }
    }

    // Check if the robot has reached the goal
    if (robotPosition.x === goalPosition.x && robotPosition.y === goalPosition.y) {
        celebrate();
    }
}

// Add command to the queue
function addCommand(direction) {
    commands.push(direction);
    document.getElementById('message').textContent = `Commands: ${commands.join(', ')}`;
}

// Run all commands in sequence
function runCommands() {
    if (commands.length > 0) {
        let interval = 500; // Time between each move
        commands.forEach((command, index) => {
            setTimeout(() => {
                moveRobot(command);
                renderGrid(); // Re-render after each move
            }, index * interval);
        });
        commands = []; // Reset the commands after execution
        document.getElementById('message').textContent = 'Running commands...';
    }
}

// Move the robot based on the command
function moveRobot(direction) {
    switch (direction) {
        case 'up':
            if (robotPosition.y > 0) robotPosition.y -= 1;
            break;
        case 'down':
            if (robotPosition.y < gridSize - 1) robotPosition.y += 1;
            break;
        case 'left':
            if (robotPosition.x > 0) robotPosition.x -= 1;
            break;
        case 'right':
            if (robotPosition.x < gridSize - 1) robotPosition.x += 1;
            break;
    }
}

// Celebration when the robot reaches the goal
function celebrate() {
    const successMessage = document.createElement('div');
    successMessage.id = 'success-message';
    successMessage.textContent = 'Hooray! You did it! 🎉🤖⭐';
    document.body.appendChild(successMessage);

    // Show the message in the center of the screen
    successMessage.style.display = 'flex';

    // Hide the message after 4 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 4000); // Show for 4 seconds
}

// Restart the game by reinitializing
function restartGame() {
    initializeGame();
    document.getElementById('message').textContent = ''; // Clear message
}

// Start the game when the page loads
window.onload = function() {
    initializeGame();
};
