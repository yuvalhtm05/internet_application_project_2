// The levels array contains all the data for each stage.
// "numItems" tells the code how many Pikachus/Pokeballs to create (crucial for flex-wrap).
// "answer" is an array so the user can type the commands in any order.
const levels = [
    {
        "level": 1,
        "instructions": "Use 'justify-content: flex-end;' to move Pikachu to the right.",
        "answer": ["justify-content: flex-end;"],
        "starting-pos": "justify-content: flex-end;",
        "numItems": 1
    },
    {
        "level": 2,
        "instructions": "Use 'align-items: flex-end;' to move Pikachu to the bottom.",
        "answer": ["align-items: flex-end;"],
        "starting-pos": "align-items: flex-end;",
        "numItems": 1
    },
    {
        "level": 3,
        "instructions": "Use 'justify-content: center;' and 'align-items: center;' to move Pikachu to the exact center.",
        "answer": ["justify-content: center;", "align-items: center;"],
        "starting-pos": "justify-content: center; align-items: center;",
        "numItems": 1
    },
    {
        "level": 4,
        "instructions": "Use 'flex-direction: row-reverse;' to flip the layout horizontally.",
        "answer": ["flex-direction: row-reverse;"],
        "starting-pos": "flex-direction: row-reverse;",
        "numItems": 3
    },
    {
        "level": 5,
        "instructions": "Use 'flex-direction: column;' to stack the items from top to bottom.",
        "answer": ["flex-direction: column;"],
        "starting-pos": "flex-direction: column;",
        "numItems": 3
    },
    {
        "level": 6,
        "instructions": "Too many Pikachus! They are squished. Use 'flex-wrap: wrap;' to let them drop to the next line.",
        "answer": ["flex-wrap: wrap;"],
        "starting-pos": "flex-wrap: wrap;",
        "numItems": 15
    }
]

// Get all HTML elements
const textArea = document.getElementById('css-input');
const dynamicLayer = document.querySelector('.dynamic-layer');
const staticLayer = document.querySelector('.static-layer');
const nextLevelBtn = document.getElementById('next-lvl-btn');
const prevLevelBtn = document.getElementById('prev-lvl-btn');
const levelTitle = document.getElementById('level-title');
const levelInstructions = document.getElementById('level-instructions');

let currentLevel = 1;

// Function to load a specific level based on its index
function loadLevel(levelIndex) {
    const data = levels[levelIndex - 1]; // Get current level data

    // 1. Update titles and instructions
    levelTitle.innerText = "Level " + data.level;
    levelInstructions.innerText = data.instructions;

    // 2. Generate the correct amount of Pokeballs and Pikachus dynamically
    staticLayer.innerHTML = "";
    dynamicLayer.innerHTML = "";
    for (let i = 0; i < data.numItems; i++) {
        staticLayer.innerHTML += '<img src="pokeball.png" alt="pokeball" class="pokeball">';
        dynamicLayer.innerHTML += '<img src="pikachu.png" alt="pikachu" class="pikachu">';
    }

    // 3. Reset CSS styles and text area
    staticLayer.style = data["starting-pos"];
    dynamicLayer.style = "";
    textArea.value = "";

    // 4. Update buttons state
    nextLevelBtn.disabled = true;

    // Disable "Previous" button if we are on the first level
    if (currentLevel === 1) {
        prevLevelBtn.disabled = true;
    } else {
        prevLevelBtn.disabled = false;
    }
}

// Load the first level when the page starts
loadLevel(currentLevel);

// Event Listener for user input
textArea.addEventListener('input', (event) => {
    const currentText = event.target.value; // current text by user
    dynamicLayer.style = currentText;       // change pikachu based on user text

    const currentLevelData = levels[currentLevel - 1];

    // Check if the user typed ALL the required answers for this level
    let isCorrect = true;
    for (let i = 0; i < currentLevelData.answer.length; i++) {
        // If one of the required strings is missing, it's not correct yet
        if (!currentText.includes(currentLevelData.answer[i])) {
            isCorrect = false;
        }
    }

    if (isCorrect) {
        nextLevelBtn.disabled = false; // Turn on Next button
    } else {
        nextLevelBtn.disabled = true;  // Keep it off if they delete the correct answer
    }
});

// Event Listener for Next Button
nextLevelBtn.addEventListener('click', () => {
    if (currentLevel < levels.length) {
        currentLevel++;          // Go to next level number
        loadLevel(currentLevel); // Load new level
    } else {
        alert("Congratulations! You won the game!");
    }
});

// Event Listener for Previous Button
prevLevelBtn.addEventListener('click', () => {
    if (currentLevel > 1) {
        currentLevel--;          // Go back one level number
        loadLevel(currentLevel); // Load previous level
    }
});