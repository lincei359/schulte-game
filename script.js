const gridContainer = document.getElementById('grid-container');
const startBtn = document.getElementById('start-btn');
const modeBtn = document.getElementById('mode-btn');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best');

let numbers = [];
let time = 0;
let interval;
let isCountdown = false;
let countdownTime = 60; // 倒计时时间
let bestTime = null;

// 可选的点击颜色列表
const colors = ['#ff6ec4', '#f94d6a', '#f5ab99', '#fdae7d', '#f783a7', '#84fab0', '#6a89cc', '#fdcb6e'];

startBtn.addEventListener('click', startGame);
modeBtn.addEventListener('click', toggleMode);

function startGame() {
    resetGame();
    generateGrid();
    startTimer();
}

function resetGame() {
    gridContainer.innerHTML = '';
    numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    time = 0;
    clearInterval(interval);
    timerDisplay.textContent = '时间: 0 秒';
}

function generateGrid() {
    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.textContent = num;
        div.addEventListener('click', () => handleClick(num, div));
        gridContainer.appendChild(div);
    });
}

function startTimer() {
    if (isCountdown) {
        timerDisplay.textContent = `剩余时间: ${countdownTime} 秒`;
        interval = setInterval(() => {
            countdownTime--;
            timerDisplay.textContent = `剩余时间: ${countdownTime} 秒`;
            if (countdownTime <= 0) {
                clearInterval(interval);
                alert('时间结束！请再试一次。');
            }
        }, 1000);
    } else {
        interval = setInterval(() => {
            time++;
            timerDisplay.textContent = `时间: ${time} 秒`;
        }, 1000);
    }
}

let nextNumber = 1;

function handleClick(num, div) {
    if (num === nextNumber) {
        div.classList.add('clicked');
        div.style.backgroundColor = getRandomColor(); // 点击时改变颜色
        nextNumber++;
        if (nextNumber > 25) {
            clearInterval(interval);
            alert(`完成！用时: ${time} 秒`);
            updateBestTime();
        }
    }
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function toggleMode() {}
    isCountdown = !isCountdown;
   
