var questionTxt = document.querySelector('#questions');
var answersOl = document.querySelector('#answers');
var timerTxt = document.querySelector('#timer');
var commentTxt = document.querySelector('#comment');

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
    }
];

function gameTimer() {
    var timer = setInterval(function() {
        secondsLeft--;
        timerTxt.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timer);
            timerTxt.textContent = '☠️';  
        }
    }, 1000);
};

function penalize(secondsLeft) {
    if(secondsLeft <= 5) {
        secondsLeft = 0;
    } else {
        secondsLeft = secondsLeft - 5;
    }
}

function init() {
    questionTxt.textContent = 'Intergalactic Coding Quiz Challenge!';
    var startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'startBtn');
    startBtn.textContent = 'Start Quiz';
    answersOl.appendChild(startBtn);
    startBtn.addEventListener('click', function() {
        answersOl.removeChild(startBtn)
        secondsLeft = 60;
        q = 0;
        gameTimer();
        renderQuestion(q);
    })
    
};

function renderQuestion(q) {
    if (q > 2) {
        console.log('You Win');
    } else {
        questionTxt.textContent = questions[q].question;
        for (var i = 0; i < questions[q].answers.length; i++) {
            var answerBtn = document.createElement('button');
            answerBtn.textContent = questions[q].answers[i];
            answerBtn.setAttribute('class', 'answerBtn');
            answersOl.appendChild(answerBtn);
            answerBtn.addEventListener('click', function(event) {
                if (event.target.textContent === questions[q].correct) {
                    commentTxt.textContent = 'Correct!';
                    q++;
                    while (answersOl.firstChild) {
                        answersOl.removeChild(answersOl.firstChild)
                    };
                    renderQuestion(q);
                
                } else {
                commentTxt.textContent = 'Wrong!';
                penalize(secondsLeft);
                } return q;
        })

    }
}}

init()
