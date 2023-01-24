"use strict";
//Refrences
const level = document.querySelector('#level');
const time = document.querySelector('.time');
const startgame = document.querySelector(".startgame");
const words = document.querySelector(".words");
const wordsInput = document.querySelector(".words-input");
let timeCheck = document.querySelector(".time-check");
const correct = document.querySelector(".correct");
let score = document.querySelector(".score");
const over = document.querySelector(".over");
const showModal = document.querySelector(".show-modal");
const closeModal = document.querySelector(".close-modal");
const modalContainer = document.querySelector(".container");
//Initialize game.
startgame.addEventListener("click", startGame);
level.addEventListener("change", checkLevelPicked);
function startGame() {
    startgame.style.opacity = '0';
    setTimeout(() => {
        startgame.style.visibility = 'hidden';
    }, 1000);
    assignWord();
    enableInput();
    disableLevels();
    reduceTime();
    isGameOver();
    autoFocusOnInput();
}
//Enable input
function enableInput() {
    wordsInput.disabled = false;
}
//Disable Levels picking on start Game
function disableLevels() {
    level.disabled = true;
}
// Levels
var Levels;
(function (Levels) {
    Levels[Levels["easy"] = 5] = "easy";
    Levels[Levels["medium"] = 3] = "medium";
    Levels[Levels["hard"] = 2] = "hard";
})(Levels || (Levels = {}));
//Check the level picked and set time based on it.
function checkLevelPicked() {
    if (level.value === 'easy') {
        time.innerHTML = String(Levels.easy);
    }
    else if (level.value === 'medium') {
        time.innerHTML = String(Levels.medium);
    }
    else {
        time.innerHTML = String(Levels.hard);
    }
}
//Generated words
const arrayOfWords = ["Javascript", "Boiler", "Milk", "Fresh", "Yoghurt", "Parse", "Conclude", "Kitchen", "Cook", "Home", "Random", "Language", "Find", "Seek", "Saw", "Return"];
//Select words randomly
function selectWords() {
    const i = Math.floor(Math.random() * 16);
    return arrayOfWords[i];
}
//put seleted word in the DOM.
function assignWord() {
    words.innerHTML = selectWords();
}
//Reorder array elements
function reOrderArrayOfwords() {
    arrayOfWords.sort(() => {
        return 0.5 - Math.random();
    });
    // console.log(arrayOfWords[0]);
}
setInterval(reOrderArrayOfwords, 100);
//reduce time as game starts
function assign(some) {
    if (typeof some === 'string') {
        return parseInt(some);
    }
    else {
        return some;
    }
}
let scoreCount = 0;
let timeCount;
let checkMate = 0;
function reduceTime() {
    timeCheck.innerHTML = time.innerHTML;
    timeCount = assign(timeCheck.innerHTML);
    const loop = setInterval(() => {
        if (typeof timeCount == 'number') {
            timeCount--;
            if (timeCount == 0) {
                clearInterval(loop);
                checkTimeElapse();
            }
        }
        timeCheck.innerHTML = String(timeCount);
    }, 1000);
}
//End game when time elapses
function checkTimeElapse() {
    startgame.style.opacity = '1';
    startgame.style.visibility = 'visible';
    level.disabled = false;
    wordsInput.value = '';
    wordsInput.disabled = true;
    correct.style.display = 'none';
    score.innerHTML = '0';
    checkMate = 0;
    showGameOver();
}
//display game over 
function isGameOver() {
    over.style.display = 'none';
}
function showGameOver() {
    over.style.display = 'block';
}
// Increase score when word matches input value
wordsInput.addEventListener('keyup', checkValidation);
function checkValidation() {
    if (wordsInput.value == words.innerHTML && level.value == 'easy') {
        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 5;
        increaseScore();
    }
    else if (wordsInput.value == words.innerHTML && level.value == 'medium') {
        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 3;
        increaseScore();
    }
    else if (wordsInput.value == words.innerHTML && level.value == 'hard') {
        checkMate++;
        assignWord();
        wordsInput.value = '';
        correct.style.display = 'block';
        timeCount = 2;
        increaseScore();
    }
    checkHighscore();
}
//increment score.
function increaseScore() {
    scoreCount = 0;
    scoreCount += checkMate;
    if (typeof scoreCount === 'number') {
        score.innerHTML = String(scoreCount);
    }
}
//show highscore modal 
showModal.addEventListener("click", showHighscoreModal);
closeModal.addEventListener("click", hideHighscoreModal);
function showHighscoreModal() {
    modalContainer.style.display = 'block';
    setHighScore();
}
//Hide highscore modal
function hideHighscoreModal() {
    modalContainer.style.display = 'none';
    modalContainer.classList.add('hidemodal');
}
//Autofocus on input when game starts.
function autoFocusOnInput() {
    wordsInput.focus();
}
//Local storage
let easyHighscore = document.querySelector(".easy-highscore");
let mediumHighscore = document.querySelector(".medium-highscore");
let hardHighscore = document.querySelector(".hard-highscore");
// Check if value exists in localStorage.
window.addEventListener("load", checkExistence);
console.log(localStorage.getItem('easyUpd'));
function checkExistence() {
    if (level.value === 'easy' && localStorage.getItem('easyUpd') === null) {
        console.log("Hello");
        easyHighscore.innerHTML = '0';
    }
    else if (level.value === 'medium' && localStorage.getItem('mediumUpd') === null) {
        mediumHighscore.innerHTML = '0';
    }
    else if (level.value === 'hard' && localStorage.getItem('hardUpd') === null) {
        hardHighscore.innerHTML = '0';
    }
}
function checkHighscore() {
    if (level.value === 'easy') {
        if (Number(easyHighscore.innerHTML) < Number(score.innerHTML)) {
            localStorage.setItem("easyUpd", score.innerHTML);
            easyHighscore.innerHTML = localStorage.getItem("easyUpd");
        }
    }
    else if (level.value === 'medium') {
        if (Number(mediumHighscore.innerHTML) < Number(score.innerHTML)) {
            localStorage.setItem("mediumUpd", score.innerHTML);
            mediumHighscore.innerHTML = localStorage.getItem("mediumUpd");
        }
    }
    else if (level.value === 'hard') {
        if (Number(hardHighscore.innerHTML) < Number(score.innerHTML)) {
            localStorage.setItem("hardUpd", score.innerHTML);
            hardHighscore.innerHTML = localStorage.getItem("hardUpd");
        }
    }
}
//Set the Highscores
function setHighScore() {
    easyHighscore.innerHTML = localStorage.getItem("easyUpd");
    mediumHighscore.innerHTML = localStorage.getItem("mediumUpd");
    hardHighscore.innerHTML = localStorage.getItem("hardUpd");
}
