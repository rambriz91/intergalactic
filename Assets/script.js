var questionTxt = document.querySelector('#questions');
var answersOl = document.querySelector('#answers');
var timerTxt = document.querySelector('#timer');
var commentTxt = document.querySelector('#comment');
var lightEl = document.querySelectorAll('.light');
var scoreEl = document.querySelector('#scoreboard');
var isWin = false;
var start = false;

var pScore = [];

//Questions object array
var questions = [
    {
        question: 'We will learn all of the following languages except?',
        answers: ['Javascript', 'Python', 'Hyper Text Markup Langauge', 'Cascading Style Sheets'],
        correct: 'Python',
    },

    {
        question: 'Which of the following is not a primitive type?',
        answers: ['Boolean', 'Number', 'String', 'Undefined', 'They are all primitive!'],
        correct: 'They are all primitive!',
    },

    {
        question: 'JSON.parse() does which of the following?',
        answers: ['Coerces JSON strings into numbers', 'Converts JSON object into string', 'Converts JSON string to an object', 'Press "X" for JSON!'],
        correct: 'Converts JSON string to an object',
    },

    {
        question: 'Which of the following methods combines two arrays?',
        answers: ['concat()', 'push()', 'pop()', 'stringify()', 'toUppercase()', 'split()'],
        correct: 'concat()'
    }
];

//sets the theme and changes the theme once the game has started.
function startSet() {
    if (start === false) {
        start = true;
    } else {
        lightEl.forEach((lightEl) => {
            lightEl.classList.remove('light');
        });
        document.body.setAttribute('class', 'space');

        start = false;
    }
};

//Game timer handles both the timer element, but also the win conditions of the game, and adjusts the images accordingly
function gameTimer() {
    var timer = setInterval(function () {
        secondsLeft--;
        timerTxt.textContent = secondsLeft;
        if (isWin === true) {
            clearInterval(timer);
            timerTxt.textContent = '🏆🏆🏆'
            commentTxt.textContent = 'Your score is ' + secondsLeft + '!';
            questionTxt.textContent = '✨You Win!!';
            clearOl();
            var intergalactic = document.createElement('a');
            intergalactic.setAttribute('href', 'https://www.youtube.com/watch?v=qORYO0atB6g');
            answersOl.appendChild(intergalactic);

            var robot = document.createElement('img');
            robot.setAttribute('src', 'Assets/robot.gif');
            intergalactic.appendChild(robot);
            saveScore();
            addReturn();
        }
        else if (secondsLeft <= 0) {
            clearInterval(timer);
            timerTxt.textContent = '☠️☠️☠️';
            commentTxt.textContent = '';
            questionTxt.textContent = 'You Lose!!';
            clearOl();
            var deadRobot = document.createElement('img');
            deadRobot.setAttribute('src', 'Assets/deadrobot.gif');
            answersOl.appendChild(deadRobot);

            addReturn();
        }
    }, 1000);
};

//penalizes the player if the wrong answer is chosen.
function penalize() {
    if (secondsLeft <= 5) {
        secondsLeft = 0;
    } else {
        secondsLeft = secondsLeft - 5;
    }
};

// initializes on page load and dynamically adds the text content, start button, and sets the timer after the user clicks start.
function init() {
    isWin = false;
    startSet();
    questionTxt.textContent = 'Intergalactic Coding Quiz Challenge!';
    var startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'startBtn');
    startBtn.textContent = 'Start Quiz';
    answersOl.appendChild(startBtn);
    startBtn.addEventListener('click', function () {
        startSet()
        answersOl.removeChild(startBtn)
        secondsLeft = 60;
        q = 0;
        gameTimer();
        renderQuestion(q);
    })
};

//displays the current question from the object array and renders the next question if answered correctly.
function renderQuestion(q) {
    if (q > questions.length - 1) {
        isWin = true;
    } else {
        questionTxt.textContent = questions[q].question;
        for (var i = 0; i < questions[q].answers.length; i++) {
            var answerBtn = document.createElement('button');
            answerBtn.textContent = questions[q].answers[i];
            answerBtn.setAttribute('class', 'answerBtn');
            answersOl.appendChild(answerBtn);
            answerBtn.addEventListener('click', function (event) {
                if (event.target.textContent === questions[q].correct) {
                    commentTxt.textContent = 'Correct!';
                    q++;
                    clearOl();
                    renderQuestion(q);

                } else {
                    commentTxt.textContent = 'Wrong!';
                    penalize(secondsLeft);
                } return q;
            })
        }
    }
}

//saves seconds left to the local storage while also pulling last sessions data.
function saveScore() {
    
    pScore = JSON.parse(localStorage.getItem('PlayerScore'));
    if (pScore === null) {
        pScore = [];
    }
    
    var player = {
        initials: prompt('Please input your initials'),
        score: secondsLeft
    };
    if (player.initials === "") {
        alert('Please enter your initials!');
        saveScore();
        addReturn();
    } else {
        pScore.push(player);
        localStorage.setItem('PlayerScore', JSON.stringify(pScore));
    }
};

//Clears content in the answersOl so that new content may be displayed.
function clearOl() {
    while (answersOl.firstChild) {
        answersOl.removeChild(answersOl.firstChild);
    };
};

//add a return button that allows the user to return to the main menu.
function addReturn() {
    var returnBtn = document.createElement('button');
    returnBtn.setAttribute('class', 'answerBtn');
    returnBtn.textContent = 'Return to Main Screen?'
    answersOl.appendChild(returnBtn);
    returnBtn.addEventListener('click', function () {
        clearOl();
        init();
    })
};

//event listener displayes scores when "View Highscores is clicked"
scoreEl.addEventListener('click', function() {
    clearOl();
    pScore = JSON.parse(localStorage.getItem('PlayerScore'))
    for (var i = 0; i < pScore.length; i++) {
        var scoreLi = document.createElement('li');
        scoreLi.setAttribute('class', 'scoreboard');
        scoreLi.textContent = 'Player: ' + pScore[i].initials + ' || Score: ' + pScore[i].score;
        answersOl.appendChild(scoreLi);
    }
    addReturn();
})

init();