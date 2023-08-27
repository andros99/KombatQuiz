const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

const fetchQuestions = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=4&type=multiple');
        const data = await response.json();
        
        questions = data.results.map(q => {

            let combinedAnswers = [q.correct_answer, ...q.incorrect_answers];
            
            combinedAnswers = combinedAnswers.sort(() => 0.5 - Math.random());
            
            const answerIndex = combinedAnswers.indexOf(q.correct_answer) + 1;
            
            return {
                question: q.question,
                choice1: combinedAnswers[0],
                choice2: combinedAnswers[1],
                choice3: combinedAnswers[2],
                choice4: combinedAnswers[3],
                answer: answerIndex
            };
        });
        
        availableQuestions = [...questions];
        
        // Start the game
        startGame();
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

fetchQuestions();

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return
        
        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

