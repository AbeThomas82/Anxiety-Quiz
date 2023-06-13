//1. Begin game.
//2. Proceed.
//3. Highlight options with hover.
//4. Pick answer.
//5. Timer.
//6. Decrease time but more with wrong answer.

//Various global variables
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
const questAnnoying = [//Question bank
    {
      question: "Which is not a primitive data type in JavaScript?",
      answers: [
        { text: "Strings", accurate: false },
        { text: "Numbers", accurate: false },
        { text: "Booleans", accurate: false },
        { text: "Functions", accurate: true },//Every 'true' is a correct value
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
  

function starter() {//Function to start the game
    console.log(this.innerText)
    if(this.innerText=="Restart"){//Button revealed after user input
        window.location.reload()
    }
  document.getElementById("saveUser").addEventListener("click",storeName);  
  document.getElementById("clearScores").addEventListener("click",clearScores);  
  document.getElementById("Test-Title").classList.add("hide");
  document.getElementById("Instruct").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  console.log("GOOD LUCK");//Check to see quiz starts
  startQuest = 0;
  timerSec = 120;
  startItOut.classList.add("hide");
  timeStart.classList.remove("hide");
  questBox.classList.remove("hide");
  startTimer();//Timer element initiates
  nextQuest();//Next question occurs
}

function nextQuest() {
  resetState();  
  if (startQuest < questAnnoying.length) {//Ends questions upon limit
    displayQuest(questAnnoying[startQuest]);//Goes through question bank array
    console.log(startQuest);  
  }else{
    endQuiz();//Terminates quiz after final question
    scoreBoard.classList.remove("hide");    
    countScore();
  }
}

function displayQuest(questions) {
  questEl.classList.remove("hide");//Reveals questions after title screen  
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
function pickClick(event) {//Detects mouse click and proceeds
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

  if (questAnnoying.length >= startQuest + 1) {//Allows every question revealed
  } else {
    document.getElementById("questions").classList.add("hide");
  }
 
}

function setStatusClass(element, valid) {//Allows graphic border for correct and wrong answers
  clearStatusClass(element);
  if (valid) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {//Removes tally
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
function resetState() {//Reset to Question 1
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

function startTimer() {//Timer decrement value
  timerObject = setInterval(function () {
    if (timerSec >= 0) {
      timeEle.textContent = "Time Left: " + timerSec;
      timerSec--;
    } else {
      clearInterval(timerObject);
      endQuiz();
    }
  }, 1000);//Decrements by seconds
}

function storeName(){//Tabulates and stores names with scores
    var username = document.getElementById("Initials").value
    var storeLeader = JSON.parse(localStorage.getItem("userScore"))||[]
    storeLeader.push({user:username,score:score*20})
    localStorage.setItem("userScore",JSON.stringify(storeLeader))
    scoreBoard.style.display = "none";
    nextScores.style.display = "none";
    startItOut.innerText = "Restart";
    alert("If you would like to restart the quiz. Click restart button on next page.");
    startItOut.classList.remove("hide");
    next.classList.remove("hide");
    document.querySelector("#scoreList").classList.remove("hide")
    document.querySelector("#highScores").classList.remove("hide")

    for (let i = 0; i < JSON.parse(localStorage.getItem("userScore")).length; i++) {
        highScores[i] = JSON.parse(localStorage.getItem("userScore"))[i];
        console.log(highScores[i]);
        console.log(highScores[i].score);
        var li = document.createElement("li");
        li.textContent = highScores[i].user + ": " + highScores[i].score;
        scoreList.appendChild(li);//for loop tabulates as quiz proceeds
        }
}

function clearScores(){//Reset values
    localStorage.clear();
}

function endQuiz() {//Terminates quiz
  clearInterval(timerObject);
  scoreBoard.style.display = "block";
}

function countScore(){//Mathematically determines score       
    alert("Your score is "+ score*20 +"!");
    console.log("Your score is "+ score*20 +"!");
}
