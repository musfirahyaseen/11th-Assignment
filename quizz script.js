const questions = [
    {
        question: "What is the capital of Pakistan?",
        answers: [
            { text: "Karachi", correct: false },
            { text: "Lahore", correct: false },
            { text: "Islamabad", correct: true },
            { text: "Peshawar", correct: false }
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },

    {
        question: "What is 10 + 5?",
        answers: [
            { text: "12", correct: false },
            { text: "15", correct: true },
            { text: "20", correct: false },
            { text: "25", correct: false }
        ]
    },

    {
        question: "Which language is used to style a web page?",
        answers: [
            { text: "HTML", correct: false },
            { text: "JavaScript", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which animal is known as the King of the Jungle?",
        answers: [
            { text: "Tiger", correct: false },
            { text: "Elephant", correct: false },
            { text: "Lion", correct: true },
            { text: "Bear", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const finalScore = document.getElementById("final-score");

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    result.classList.add("hide");
    document.querySelector(".quiz-header").style.display = "flex";
    document.querySelector(".progress-container").style.display = "block";
    questionElement.style.display = "block";
    answerButtons.style.display = "block";

    showQuestion();
}

function showQuestion() {

    resetState();

    let current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    current.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {

    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    scoreElement.textContent = `Score: ${score}`;

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {

    questionElement.style.display = "none";
    answerButtons.style.display = "none";
    nextButton.style.display = "none";
    document.querySelector(".quiz-header").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";

    result.classList.remove("hide");

    finalScore.textContent =
        `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();