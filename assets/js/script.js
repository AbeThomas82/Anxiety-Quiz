//1. Begin game.
//2. Proceed.
//3. Highlight options with hover.
//4. Pick answer.
//5. Timer.
//6. Decrease time but more with wrong answer.

const startItOut = document.getElementById("start-button");
// const forwardItOut = document.getElementById("forward-game");
const questBox = document.getElementById("storage");
const questEl = document.getElementById("questions");
const answerEl = document.getElementById("answers");
let startQuest = 0;
startItOut.addEventListener("click", starter);
// forwardItOut.addEventListener("click", () => {
//   startQuest++;
//   nextQuest();
// });
var timerSec = 120; //Two minutes to answer every question
var wrongAns = 10; //Penalty for a wrong answer
var endGame = false; //Ends everything
var timeEle = document.getElementById("timer-el");
var timerObject;
function starter() {
  document.getElementById("Test-Title").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  console.log("GOOD LUCK");
  startQuest = 0;
  timerSec = 120;
  startItOut.classList.add("hide");
  questBox.classList.remove("hide");
  startTimer();
  nextQuest();
}

function nextQuest() {
  resetState();  
  if (startQuest < questAnnoying.length) {
    displayQuest(questAnnoying[startQuest]);  
  }else{
    endQuiz();
    startItOut.innerText = "Restart";
    startItOut.classList.remove("hide");
  }
}

function displayQuest(questions) {
  questEl.innerText = questions.question;
  questions.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerText = answers.text;
    button.classList.add("options");
    //if(answers === true){
    button.dataset.correct = answers.accurate;
    //}
    button.addEventListener("click", pickClick);
    answerEl.appendChild(button);
  });
}
function pickClick(event) {
  const chooseAnswer = event.target;
  const valid = chooseAnswer.dataset.correct;
  console.log("valid", valid);
  if (valid == "true") {
    chooseAnswer.classList.add("correct");
    startQuest++;
    nextQuest();
  } else {
    timerSec -= 30;
    chooseAnswer.classList.add("wrong");
    startQuest++;
    nextQuest();
  }
  // setStatusClass(chooseAnswer, valid);
  // Array.from(answerEl.children).forEach(button => {
  //     setStatusClass(button, button.dataset.valid)
  // })
  if (questAnnoying.length > startQuest + 1) {
    // forwardItOut.classList.remove("hide");
  } else {
    document.getElementById("questions").classList.add("hide");
    //startItOut.innerText = "Restart";
    //startItOut.classList.remove("hide");
  }
  // forwardItOut.classList.remove("hide");
  //startTimer()
}

function setStatusClass(element, valid) {
  clearStatusClass(element);
  if (valid) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
function resetState() {
  // forwardItOut.classList.add("hide");
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}
const questAnnoying = [
  //https://quizlet.com/779286477/javascript-fundamentals-flash-cards/
  {
    question: "Which is not a primitive data type in JavaScript?",
    answers: [
      { text: "Strings", accurate: false },
      { text: "Numbers", accurate: false },
      { text: "Booleans", accurate: false },
      { text: "Functions", accurate: true },
      { text: "Symbols", accurate: false },
    ],
  },
  {
    question:
      "Suppose 'object' is a variable array. How would that be displayed on the console?",
    answers: [
      { text: "console.log(object.length);", accurate: true },
      { text: "object.length;", accurate: false },
      { text: "array.length;", accurate: false },
      { text: "function{variable.object.length};", accurate: false },
      { text: "Undefined.", accurate: false },
    ],
  },
  {
    question: "Which characteristics are in a 'for' loop?",
    answers: [
      { text: "Starting point", accurate: false },
      { text: "Limit", accurate: false },
      { text: "Increment", accurate: false },
      { text: "None of the above.", accurate: false },
      { text: "All of the above", accurate: true },
],
  },
  {
    question: "The operator '===' means that comparative objects are ___.",
    answers: [
      { text: "Equal in type", accurate: false },
      { text: "Equal in value", accurate: false },
      { text: "Equal in type and value", accurate: true },
      { text: "Cheeseburgers", accurate: false },
      { text: "This is twisted math type stuff.", accurate: false },
    ],
  },
  {
    question: "Who invented JavaScript?",
    answers: [
      { text: "Spencer Sokol", accurate: false },
      { text: "Brendan Eich", accurate: true },
      { text: "William H. Gates III", accurate: false },
      { text: "Mick Foley", accurate: false },
      { text: "Donald Trump", accurate: false },
    ],
  },
];

function startTimer() {
  timerObject = setInterval(function () {
    //timeEle.textContent = "Time Left: "+timerSec
    if (timerSec >= 0) {
      timeEle.textContent = "Time Left: " + timerSec;
      timerSec--;
    } else {
      clearInterval(timerObject);
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {
  clearInterval(timerObject);
}
var score = 0;
//const valid = chooseAnswer.dataset.correct;

//function countScore(){
//    for (var i=0; i < questAnnoying.length; i++){
//       if(valid == true){
//        score++;
//        prompt("Your score is "+ score)
//        console.log("Your score is "+ score);
//        }
//    }
//}
/*function startOff(){
    .forEach(element => {
        if (answer.checked){

        }    
    });
}

function clearScreen(){
    document.getElementById()
}

for(var i=0; i < questAnnoying.length; i++){
    if(questAnnoying[i] === true){
        console.log("Correct!")
    }else{
        console.log("Wrong answer, homeboy.")
    }    
}*/