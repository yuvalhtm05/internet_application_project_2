const levels = [
    {"level": 1, "instructions": "adsasddsa", "answer": "justify-content: flex-end;"},
    {"level": 2, "instructions": "adsasddsa", "answer": "center"},
    {"level": 3, "instructions": "adsasddsa", "answer": "abcd"},
    {"level": 4, "instructions": "adsasddsa", "answer": "abcd"},
    {"level": 5, "instructions": "adsasddsa", "answer": "abcd"},
    {"level": 6, "instructions": "adsasddsa", "answer": "abcd"},
]


const textArea = document.getElementById('css-input')
const pikachu = document.getElementById('pikachu')
const dynamicLayer = document.querySelector('.dynamic-layer');
const nextLevelBtn = document.getElementById('next-lvl-btn')
let currentLevel = 1;

// event Listener for user input
textArea.addEventListener('input', (event) => {
    const currentText = event.target.value; // current text by user
    dynamicLayer.style = currentText;       // change pikachu based on user text
    const currentLevelData = levels[currentLevel - 1];
    if (currentText.includes(currentLevelData.answer)) {
        nextLevelBtn.disabled = false; // מדליק את הכפתור
    }
});



nextLevelBtn.addEventListener('click', () => {



});
