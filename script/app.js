
function Question(title, choices, answer) {
    this.title = title;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkResult = function (answer) {
    var question = this.getQuestion();
    console.log(question.checkAnswer(answer), answer);
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}

function loadQuestions() {
    if (quiz.isFinish()) {
        showScore();
    }
    else{
        var question = quiz.getQuestion();
        var choices = question.choices;
        var questionTitle = question.title;
    
        document.querySelector('#question-title').innerHTML = questionTitle;
        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector(`#r${i}`);
            element.textContent = choices[i];
        }
        guess();
        showProgress();
    }
}
function showScore() {
    var html = `<h2>Score ${quiz.score}</h2> `;
    document.querySelector('.card-body').innerHTML = html;
    document.querySelector('.card-body').classList.add("text-center");
    document.querySelector('#nextBtn').innerHTML = "Bitir";
    document.querySelector('.card-footer').innerHTML = "";
}

function guess() {
    var btn = document.getElementById('nextBtn');
    btn.onclick = function () {
        if(quiz.isFinish()){
            location.href = 'index.html';
        }
        else{
            quiz.checkResult(myAnswer());
            loadQuestions();
        }
    }
}

function myAnswer() {
    var radios = document.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            return document.querySelector(`#r${i}`).textContent;
        }
    }
    alert('Lütfen boş birakmayiniz.');
    return false;
}

function showProgress() {
    var totalQuestions = quiz.questions.length;
    var currentQuestion = quiz.questionIndex;
    document.querySelector('#progress').innerHTML = `${currentQuestion + 1}. soruyu çözüyorsunuz. Geriye ${totalQuestions - currentQuestion} soru kaldı.`
}
// questions
var q1 = new Question("What does HTML stand for?",
    ["Hyper Text Markup Language", "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language"],
    "Hyper Text Markup Language");

var q2 = new Question("Choose the correct HTML element for the largest heading:",
    ["<h6>", "<h1>",
        "<head>"],
    "<h1>");

var q3 = new Question("What is the correct HTML element for inserting a line break?",
    ["<br>", "<lb>",
        "<break>"],
    "<br>");

var q4 = new Question("")

// creating objects
var questions = [q1, q2, q3];
var quiz = new Quiz(questions);

loadQuestions();