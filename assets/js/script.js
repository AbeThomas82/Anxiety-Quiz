//1. Begin game.
//2. Proceed.
//3. Highlight options with hover.
//4. Pick answer.
//5. Timer.
//6. Decrease time but more with wrong answer.

const startItOut = document.getElementById("start-button");
const timeStart = document.getElementById("timer-el");
const questBox = document.getElementById("storage");
const questEl = document.getElementById("questions");
const answerEl = document.getElementById("answers");
const scoreBoard = document.getElementById("scoreboard");
const nextScores = document.getElementById("next");
scoreBoard.style.display = "none"
let startQuest = 0;
startItOut.addEventListener("click", starter);
timeStart.addEventListener("click", starter);
nextScores.addEventListener("click", starter);
var timerSec = 120; //Two minutes to answer every question
var wrongAns = 10; //Penalty for a wrong answer
var endGame = false; //Ends everything
var timeEle = document.getElementById("timer-el");
var timerObject;
var score = 0;
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
  

function starter() {
  document.getElementById("saveUser").addEventListener("click",storeName);  
  document.getElementById("clearScores").addEventListener("click",clearScores);  
  document.getElementById("Test-Title").classList.add("hide");
  document.getElementById("Instruct").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  console.log("GOOD LUCK");
  startQuest = 0;
  timerSec = 120;
  startItOut.classList.add("hide");
  timeStart.classList.remove("hide");
  questBox.classList.remove("hide");
  startTimer();
  nextQuest();
}

function nextQuest() {
  resetState();  
  if (startQuest < questAnnoying.length) {
    displayQuest(questAnnoying[startQuest]);
    console.log(startQuest);  
  }else{
    endQuiz();
    scoreBoard.classList.remove("hide");    
    countScore();
  }
}

function displayQuest(questions) {
  questEl.classList.remove("hide");  
  console.log(questions);  
  questEl.innerText = questions.question;
  questions.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerText = answers.text;
    button.classList.add("options");
    button.dataset.correct = answers.accurate;
    button.addEventListener("click", pickClick);
    answerEl.appendChild(button);
  });
}
function pickClick(event) {
  let chooseAnswer = event.target;
  const valid = chooseAnswer.dataset.correct;
  console.log("valid", valid);
  if (valid == "true") {
    chooseAnswer.classList.add("correct");
    score++
    startQuest++;
    nextQuest();
  } else {
    timerSec -= 30;
    chooseAnswer.classList.add("wrong");
    startQuest++;
    nextQuest();
  }

  if (questAnnoying.length >= startQuest + 1) {
  } else {
    document.getElementById("questions").classList.add("hide");
  }
 
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
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

function startTimer() {
  timerObject = setInterval(function () {
    if (timerSec >= 0) {
      timeEle.textContent = "Time Left: " + timerSec;
      timerSec--;
    } else {
      clearInterval(timerObject);
      endQuiz();
    }
  }, 1000);
}

function storeName(){
    var username = document.getElementById("Initials").value
    var storeLeader = JSON.parse(localStorage.getItem("userScore"))||[]
    storeLeader.push({user:username,score:score*20})
    var highScores = [];
    localStorage.setItem("userScore",JSON.stringify(storeLeader))
    scoreBoard.style.display = "none";
    nextScores.style.display = "none";
    startItOut.innerText = "Restart";
    alert("If you would like to restart the quiz. Click restart button on next page.");
    startItOut.classList.remove("hide");
    next.classList.remove("hide");
    for (let i = 0; i < storeLeader.length; i++) {
        highScores[i] = JSON.parse(localStorage.getItem("userScore"));

        //inside here create an element for score and initials, can be an li
        //set textContent to be user and score
        //and append it to that next div
        }
}

function clearScores(){
    localStorage.clear();
}

function endQuiz() {
  clearInterval(timerObject);
  scoreBoard.style.display = "block";
}

function countScore(){       
    alert("Your score is "+ score*20 +"!");
    console.log("Your score is "+ score*20 +"!");
}
