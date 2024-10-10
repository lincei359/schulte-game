const gridContainer = document.getElementById('grid-container');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best');

// 添加输入用户姓名的表单和排行榜显示区域
const playerNameInput = document.createElement('input');
playerNameInput.placeholder = '请输入您的姓名';
document.body.insertBefore(playerNameInput, gridContainer);

const leaderboardContainer = document.createElement('div');
leaderboardContainer.id = 'leaderboard';
document.body.appendChild(leaderboardContainer);

let numbers = [];
let time = 0;
let interval;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []; // 从 localStorage 获取排行榜数据

startBtn.addEventListener('click', startGame);

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
    interval = setInterval(() => {
        time++;
        timerDisplay.textContent = `时间: ${time} 秒`;
    }, 1000);
}

let nextNumber = 1;

function handleClick(num, div) {
    if (num === nextNumber) {
        div.classList.add('clicked');
        nextNumber++;
        if (nextNumber > 25) {
            clearInterval(interval);
            let playerName = playerNameInput.value || '匿名用户'; // 获取用户输入的姓名
            saveScore(playerName, time);
            alert(`完成！用时: ${time} 秒`);
            updateLeaderboard();
        }
    }
}

function saveScore(name, score) {
    leaderboard.push({ name: name, score: score });
    leaderboard.sort((a, b) => a.score - b.score); // 按时间升序排列
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // 将排行榜数据存储到 localStorage
}

function updateLeaderboard() {
    leaderboardContainer.innerHTML = '<h2>排行榜</h2>';
    leaderboard.slice(0, 5).forEach((entry, index) => {
        leaderboardContainer.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score} 秒</p>`;
    });
}

// 初始化排行榜
updateLeaderboard();
