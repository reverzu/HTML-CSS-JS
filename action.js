const newGameButton = document.getElementById('new-game-btn');
const rollDiceButton = document.getElementById('roll-dice-btn');
const holdButton = document.getElementById('hold-btn');
const diceImage = document.getElementById('dice-img');
const winnerBanner = document.getElementById('winner-banner');
const player1Title = document.getElementById('player-1-title');
const player2Title = document.getElementById('player-2-title');
const player1Score = document.getElementById('player-1-score');
const player2Score = document.getElementById('player-2-score');
const player1CurrentScoreLabel = document.getElementById('player-1-current-score');
const player2CurrentScoreLabel = document.getElementById('player-2-current-score');
const containerLeftPlayer1 = document.getElementById('container-left-player1');
const containerRightPlayer2 = document.getElementById('container-right-player2');

let player1MainScore = 0;
let player2MainScore = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let togglePlayer = false;


const windowEventActions = (event) => {
    switch (event.key) {
        case 'r':
            const player = (togglePlayer === false) ? 1 : 2;
            diceRoll(player);
            break;
        case 'h':
            holdScore();
            break;
        default:
            break;
    }
}

const block = function (player) {
    rollDiceButton.removeEventListener('click', diceRollCallback);

    holdButton.removeEventListener('click', holdScore);

    window.removeEventListener('keypress', windowEventActions);
    togglePlayer = (player===1)?(false):(true);
    toggle();
}

const initialize = function () {
    rollDiceButton.addEventListener('click', diceRollCallback);

    holdButton.addEventListener('click', holdScore);

    window.addEventListener('keypress', windowEventActions);

    newGameButton.addEventListener('click', newGame);

    window.addEventListener('keypress', windowEventActions);
    window.addEventListener('keypress', (event) => {
        if (event.key === 'n') {
            newGame();
        }
    });
}

const toggle = function () {
    togglePlayer = !togglePlayer;
    if (!togglePlayer) {
        containerLeftPlayer1.style.animation = "active 1s";
        containerRightPlayer2.style.animation = "inactive 1s";
        containerLeftPlayer1.style.animationFillMode = "forwards";
        containerRightPlayer2.style.animationFillMode = "forwards";
        player2CurrentScore = 0;
        player2CurrentScoreLabel.innerHTML = 0;
        player1Title.style.fontWeight = "bold";
        player2Title.style.fontWeight = "normal";
    } else if (togglePlayer) {
        containerLeftPlayer1.style.animation = "inactive 1s";
        containerRightPlayer2.style.animation = "active 1s";
        containerLeftPlayer1.style.animationFillMode = "forwards";
        containerRightPlayer2.style.animationFillMode = "forwards";
        player1CurrentScore = 0;
        player1CurrentScoreLabel.innerHTML = 0;
        player1Title.style.fontWeight = "normal";
        player2Title.style.fontWeight = "bold";
    }
}

const newGame = function () {
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    player1MainScore = 0;
    player2MainScore = 0;
    player1Score.innerHTML = 0;
    player2Score.innerHTML = 0;
    diceImage.src = ``;
    diceImage.alt = ``;
    winnerBanner.innerHTML = "";
    player1CurrentScoreLabel.innerHTML = 0;
    player2CurrentScoreLabel.innerHTML = 0;
    togglePlayer = true;
    toggle();
    initialize();
}

const diceRollCallback = function () {
    const player = (togglePlayer === false) ? 1 : 2;
    diceRoll(player);
}

const diceRoll = function (player) {
    const diceValue = Math.floor((Math.random() * 6) + 1);
    diceImage.src = `images/dice-${diceValue}.png`;
    diceImage.alt = `images/dice-${diceValue}.png`;
    if (diceValue == 1) {
        // togglePlayer = !togglePlayer;
        toggle();
    } else {
        if (player === 1) {
            player1CurrentScore += diceValue;
            player1CurrentScoreLabel.innerHTML = player1CurrentScore;

        } else if (player === 2) {
            player2CurrentScore += diceValue;
            player2CurrentScoreLabel.innerHTML = player2CurrentScore;

        }
    }
}

const holdScore = function () {
    if (!togglePlayer) {
        console.log(player1CurrentScore);
        player1MainScore += Number(player1CurrentScoreLabel.innerHTML);
        player1Score.innerHTML = player1MainScore;
        if (player1MainScore >= 100) {
            winnerBanner.innerHTML = "Player 1 Wins 🎉";
            block(1);
        }
        toggle();
    } else if (togglePlayer) {
        console.log(player2CurrentScore);
        player2MainScore += Number(player2CurrentScoreLabel.innerHTML);
        player2Score.innerHTML = player2MainScore;
        if (player2MainScore >= 100) {
            winnerBanner.innerHTML = "Player 2 Wins 🎉";
            block(2);
        }
        toggle();
    }
}


newGame();