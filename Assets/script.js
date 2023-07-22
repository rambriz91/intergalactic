var questionTxt = document.querySelector('#questions');
var answersOl = document.querySelector('#answers');
var timerTxt = document.querySelector('#timer');

function init() {
    questionTxt.textContent = 'Intergalactic Coding Quiz Challenge!';
    var startBtn =document.createElement('button');
    startBtn.setAttribute('class', 'startBtn');
    startBtn.textContent = 'Start Quiz';
    answersOl.appendChild(startBtn);
    startBtn.addEventListener('click', function() {
        console.log('I work!');
    })
    
};

init()