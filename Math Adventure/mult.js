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
      onclick="location.href='div.html';"
      class="button"
    >
      Proximo Desafio
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
    question: "Quanto é 7x7?",
    answers: [
      { text : "a) 14", correct: false },
      { text: "b) 49", correct: true },
      { text: "c) 21", correct: false },
      { text: "d) 32", correct: false }
    ]
  },
  {
    question: "Quanto é 11x11?",
    answers: [
      { text: "a) 52", correct: false },
      { text: "b) 71", correct: false },
      { text: "c) 99", correct: false },
      { text: "d) 121", correct: true }
    ]
  },
  {
    question: "Quanto é 22x23",
    answers: [
      { text: "a) 345", correct: false },
      { text: "b) 506", correct: true },
      { text: "c) 444", correct: false },
      { text: "d) 244", correct: false }
    ]
  },
  {
    question: "Quanto é 111x333? ",
    answers: [
      { text: "a) 36.963", correct: true },
      { text: "b) 23.459", correct: false },
      { text: "c) 63.969", correct: false },
      { text: "d) 12.812", correct: false }
    ]
  },
  {
    question: "Quanto é 2x0?",
    answers: [
      { text: "a) 0", correct: true },
      { text: "b) 2", correct: false },
      { text: "c) N.D.A", correct: false },
      { text: "d) sou burro, n sei ☹️", correct: false }
    ]
  }
]


// feito so por eu 
// Victor Natã Felix Alves