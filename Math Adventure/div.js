const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("p")
    newAsnwer.classList.add("p", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Parabens você passou! :)"
      break
    case (performance >= 70):
      message = "Essa foi por pouco! :)"
      break
    case (performance >= 50):
      message = "Quase faltou muito pouco!"
      break
    default:
      message = "Pode melhorar :("
  }


 
  if (totalCorrect >= 4){
    $questionsContainer.innerHTML = 
    `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
    onclick="location.href='index.html';"
      class="button"
    >
      Voltar para página principal
    </button>
  `
  } else {
    $questionsContainer.innerHTML = 
    `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
  }
}


const questions = [
  {
    question: "Quanto é 20/4",
    answers: [
      { text : "a) 4", correct: false },
      { text: "b) 8", correct: false },
      { text: "c) 5", correct: true },
      { text: "d) 6", correct: false }
    ]
  },
  {
    question: "Quanto é 179/13",
    answers: [
      { text: "a) 13,76", correct: true },
      { text: "b) 14,70", correct: false },
      { text: "c) 12", correct: false },
      { text: "d) 16,33", correct: false }
    ]
  },
  {
    question: "Quanto é 80/5",
    answers: [
      { text: "a) 16", correct: true },
      { text: "b) 34", correct: false },
      { text: "c) 20", correct: false },
      { text: "d) N.D.A", correct: false }
    ]
  },
  {
    question: "Quanto é 3478/2",
    answers: [
      { text: "a) 1.500", correct: false },
      { text: "b) 1.548", correct: false },
      { text: "c) 1.494", correct: false },
      { text: "d) 1.739", correct: true }
    ]
  },
  {
    question: "Quanto é 123456/2",
    answers: [
      { text: "a) 65.786", correct: false },
      { text: "b) 61.728", correct: true },
      { text: "c) 60.987", correct: false },
      { text: "d) 62.146", correct: false }
    ]
  }
]
// feito so por eu 
// Victor Natã Felix Alves