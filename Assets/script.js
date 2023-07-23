var questionTxt = document.querySelector('#questions');
var answersOl = document.querySelector('#answers');
var timerTxt = document.querySelector('#timer');
var commentTxt = document.querySelector('#comment');
var q;

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
        question: ['Coerces JSON strings into numbers', 'Converts JSON object into string', 'Converts JSON string to an object', 'Press "X" for JSON!'],
        correct: 'Converts JSON string to an object',
    }
]

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
                renderQuestion(q);
                
            } else {
                commentTxt.textContent = 'Wrong!';
                penalize(secondsLeft);
            }
        })

    }
}

init()
console.log(questions[0].question)

// function firstQ() {
//     questionTxt.textContent = questions.question_1;
//     for (var i = 0; i < questions.answers_1.length; i++) {
//         var answerBtn = document.createElement('button');
//         answerBtn.textContent = questions.answers_1[i];
//         answerBtn.setAttribute('class', 'answerBtn');
//         answersOl.appendChild(answerBtn)
//         answerBtn.addEventListener('click', function(event) {
//             if (event.target.textContent === questions.answers_1[1]) {
//                 commentTxt.textContent = 'Correct!';
//                 // for (var i = 0; i < questions.answers_1.length; i++) {
//                 //     answersOl.removeChild(answerBtn); 
//                 // }
//             } else {
//                 commentTxt.textContent = 'Wrong!';
//                 penalize(secondsLeft);
//             }
            
//         })
//     }
// };