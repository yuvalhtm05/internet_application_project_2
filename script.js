const levels = [
]

const dynamicLayer = document.querySelector('.dynamic-layer');
let currentLevel = 1;

textArea.addEventListener('input', (event) => {
    const currentText = event.target.value; // current text by user
    dynamicLayer.style = currentText;       // change pikachu based on user text
    const currentLevelData = levels[currentLevel - 1];
    }


nextLevelBtn.addEventListener('click', () => {
});
