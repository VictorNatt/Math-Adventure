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
      message = "Parabens! Você passou de nìvel! <br> Vamos para o pròximo desafio!:)"
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
    onclick="location.href='mult.html';"
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
    question: "Quanto é 1000-7",
    answers: [
      { text : "a) 439", correct: false },
      { text: "b) 556", correct: false },
      { text: "c) 993", correct: true },
      { text: "d) 678", correct: false }
    ]
  },
  {
    question: "Quanto é 10-5",
    answers: [
      { text: "a) 7", correct: false },
      { text: "b) 5", correct: true },
      { text: "c) 8", correct: false },
      { text: "d) 16,33", correct: false }
    ]
  },
  {
    question: "Quanto é 10-15",
    answers: [
      { text: "a) 10", correct: false },
      { text: "b) -25", correct: false },
      { text: "c) 5", correct: false },
      { text: "d) -5", correct: true }
    ]
  },
  {
    question: "Quanto é 330-270",
    answers: [
      { text: "a) 50", correct: false },
      { text: "b) 60", correct: true },
      { text: "c) 77", correct: false },
      { text: "d) 40", correct: false }
    ]
  },
  {
    question: "Quanto é 5-7",
    answers: [
      { text: "a) 2", correct: false },
      { text: "b) -2", correct: true },
      { text: "c) -3", correct: false },
      { text: "d) 0", correct: false }
    ]
  }
]
// feito so por eu 
// Victor Natã Felix Alves