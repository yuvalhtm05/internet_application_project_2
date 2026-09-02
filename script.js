// מערך השלבים - שימו לב שהתשובות (answer) עכשיו ללא נקודה פסיק (;) כדי להקל על בדיקות הקצה
const levels = [
    {
        "level": 1,
        "instructions": "Use 'justify-content: flex-end;' to move Pikachu to the Pokeball on the right.",
        "answer": ["justify-content:flex-end"],
        "starting-pos": "justify-content: flex-end;",
        "numItems": 1
    },
    {
        "level": 2,
        "instructions": "Use 'align-items: flex-end;' to move Pikachu to the bottom.",
        "answer": ["align-items:flex-end"],
        "starting-pos": "align-items: flex-end;",
        "numItems": 1
    },
    {
        "level": 3,
        "instructions": "Use 'justify-content: center;' and 'align-items: center;' to move Pikachu to the exact center.",
        "answer": ["justify-content:center", "align-items:center"],
        "starting-pos": "justify-content: center; align-items: center;",
        "numItems": 1
    },
    {
        "level": 4,
        "instructions": "Use 'flex-direction: row-reverse;' to flip the layout horizontally.",
        "answer": ["flex-direction:row-reverse"],
        "starting-pos": "flex-direction: row-reverse;",
        "numItems": 3
    },
    {
        "level": 5,
        "instructions": "Use 'flex-direction: column;' to stack the items from top to bottom.",
        "answer": ["flex-direction:column"],
        "starting-pos": "flex-direction: column;",
        "numItems": 3
    },
    {
        "level": 6,
        "instructions": "Too many Pikachus! Use 'flex-wrap: wrap;' to let them drop to the next line.",
        "answer": ["flex-wrap:wrap"],
        "starting-pos": "flex-wrap: wrap;",
        "numItems": 30 // הוגדל ל-30 כדי להבטיח שבירת שורה גם במסכים רחבים
    }
];

const textArea = document.getElementById('css-input');
const dynamicLayer = document.querySelector('.dynamic-layer');
const staticLayer = document.querySelector('.static-layer');
const nextLevelBtn = document.getElementById('next-lvl-btn');
const prevLevelBtn = document.getElementById('prev-lvl-btn');
const levelTitle = document.getElementById('level-title');
const levelInstructions = document.getElementById('level-instructions');

let currentLevel = 1;

function loadLevel(levelIndex) {
    const data = levels[levelIndex - 1];

    levelTitle.innerText = "Level " + data.level;
    levelInstructions.innerText = data.instructions;

    staticLayer.innerHTML = "";
    dynamicLayer.innerHTML = "";
    for (let i = 0; i < data.numItems; i++) {
        staticLayer.innerHTML += '<img src="pokeball.png" alt="pokeball" class="pokeball">';
        dynamicLayer.innerHTML += '<img src="pikachu.png" alt="pikachu" class="pikachu">';
    }

    staticLayer.style = data["starting-pos"];
    dynamicLayer.style = "";
    textArea.value = "";

    nextLevelBtn.disabled = true;

    if (currentLevel === 1) {
        prevLevelBtn.disabled = true;
    } else {
        prevLevelBtn.disabled = false;
    }
}

loadLevel(currentLevel);

textArea.addEventListener('input', (event) => {
    const currentText = event.target.value;
    dynamicLayer.style = currentText;

    const currentLevelData = levels[currentLevel - 1];

    // מנקה את הקלט: מסיר רווחים, מסיר נקודה-פסיק, והופך הכל לאותיות קטנות (פותר את ה-CAPS ומקרי הקצה)
    const cleanInput = currentText.replace(/[\s;]+/g, '').toLowerCase();

    let isCorrect = true;
    for (let i = 0; i < currentLevelData.answer.length; i++) {
        if (!cleanInput.includes(currentLevelData.answer[i])) {
            isCorrect = false;
        }
    }

    if (isCorrect) {
        nextLevelBtn.disabled = false;
    } else {
        nextLevelBtn.disabled = true;
    }
});

nextLevelBtn.addEventListener('click', () => {
    if (currentLevel < levels.length) {
        currentLevel++;
        loadLevel(currentLevel);
    } else {
        alert("Congratulations! You mastered Flexbox and won the game!");
    }
});

prevLevelBtn.addEventListener('click', () => {
    if (currentLevel > 1) {
        currentLevel--;
        loadLevel(currentLevel);
    }
});