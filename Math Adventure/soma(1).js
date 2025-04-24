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
      message = "Parabens! Você passou de nìvel! <br> Vamos para o pròximo desafio! :)"
      break
    case (performance >= 70):
      message = "Bom trarbalho! Você alcançou 70% de performance neste nìvel. :)"
      break
    case (performance >= 50):
      message = "Você completou"
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
    onclick="location.href='sub.html';"
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
    question: "Quanto é 25+24 ",
    answers: [
      { text : "a) 39", correct: false },
      { text: "b) 50", correct: false },
      { text: "c) 49", correct: true },
      { text: "d) 45", correct: false }
    ]
  },
  {
    question: "Quanto é 75+25",
    answers: [
      { text: "a) 85", correct: false },
      { text: "b) 110", correct: false },
      { text: "c) 95", correct: false },
      { text: "d) 100", correct: true }
    ]
  },
  {
    question: "Quanto é 130+80",
    answers: [
      { text: "a) 220", correct: false },
      { text: "b) 190", correct: false },
      { text: "c) 210", correct: true },
      { text: "d) 240", correct: false }
    ]
  },
  {
    question: "Quanto é 310+110",
    answers: [
      { text: "a) 440", correct: false },
      { text: "b) 390", correct: false },
      { text: "c) 345", correct: false },
      { text: "d) 420", correct: true }
    ]
  },
  {
    question: "Quanto é  1.234+9.876",
    answers: [
      { text: "a) 12.678", correct: false },
      { text: "b) 11.110", correct: true },
      { text: "c) 9.432", correct: false },
      { text: "d) 11.436", correct: false }
    ]
  }
]


// feito so por eu 
// Victor Natã Felix Alves