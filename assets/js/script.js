//set all common working letiables
let interval;
let index = 0;
let timer = 60;
let score= 0;
// let resultsScreen = false;
let leaderboardsRm = false;
// set questionBank object
let questionBank = {
  questions: ["Which one of these logs content to the console?", "what does CSS stand for?", "which one shows a prompt for the user?", "which one would I  use to get a decimal bewteen 0 and 1?", "freebee: whos the best?"],
  number: [1,2,3,4,5],
  letter: ["A", "B", "C", "D"],
  answers: ["console.log()", "Cascading Style Sheet", "window.prompt()", "Math.Random()", "The person playing this!"]
}
//set AnswerBank for each question
let AnswerBank = [
   ["console.log()", "console.dir()", "window.alert()", "Math.Random()"],
   ["Cascading Style Sheet", "JavaScript Object Notation", "Asynchronous JavaScript And XML", "HyperText Markup Language"],
   ["window.prompt()", "console.dir()", "window.alert()", "console.log()"],
   ["Math.Random()", "Math.Floor()", "Math,Random()", "Math()"],
   ["The person playing this!", "Not this one!","Not this one!","Not this one!"]
]
//Holding Arrays
let namesArray = []
let scoresArray = []
//high score object
let leaderboards = {
  user:[],
  score:[]
}


//declare query selections
let TopEl = document.querySelector("#top-bar");
let startBtn = document.querySelector("#start-game")
let leaderboardsBtn = document.querySelector("#show-leaderboards")
let time = document.querySelector("#timer")
let qNumber = document.querySelector("#qNumber")
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");
let workingHeader = document.querySelector(".list-title")


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function loadData (){
  var savedTasks = localStorage.getItem("leaderboards");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!");

  leaderboards = JSON.parse(savedTasks)
  namesArray = leaderboards.user
  scoresArray = leaderboards.score
}

function persistData(){
    console.log(JSON.stringify(leaderboards))
    localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
}

//timer function
function updateTimer(){
  timer--;
  time.innerText = timer
  time.innerText = timer
  if (timer == 0) {
    gameOver();
  }
}

// start the interval for the timer function and game
function startGame(){
  startBtn.disabled = true
  leaderboardsBtn.disabled = true
  interval = setInterval(updateTimer, 1000);
  questions();
}

// /reset game so they can try again
function gameOver(){
  score = score + timer;
  let workingIndex;
  clearInterval(interval);
  if (index>4){
  workingIndex = index - 1;
  }
  else{
    workingIndex = index
  }
    console.log(".task-item[data-task-id='" + workingIndex + "']")
    let taskSelected = document.querySelector(
      ".task-item[data-task-id='" + workingIndex + "']"
    );

    taskSelected.remove();
  reset()
  results()
}

//reset all parameters for a new game
function reset(){
  timer = 60;
  index = 0;
  time.innerText = "--"
}

//show results card
function results(){

  let questionItemEl = document.createElement("li");
  questionItemEl.className = "task-item";
  questionItemEl.setAttribute("data-task-id", "results");

  let questionEl = document.createElement("div");
  questionEl.className = "task-info";
  questionEl.innerHTML ="<h3 class='task-name'>Game Over! Your Score is: "+ score +
  "</h3><span class='task-type'> Save your high Score!</span>";
  workingHeader.innerText = "Final Results:"
  questionItemEl.appendChild(questionEl)
  tasksToDoEl.append(questionItemEl);
  // resultsScreen = true;
  let taskActionsEl = createTaskActions(0,"results")
  questionItemEl.appendChild(taskActionsEl);
}

// self explanatory
function questions(){

  // if (resultsScreen){

  //   let taskSelected = document.querySelector(
  //     ".task-item[data-task-id='results']"
  //   );

  //   taskSelected.remove();
  //   resultsScreen = false;
  // }
   if(leaderboardsRm){

    for (let i = 0; i < namesArray.length; i++) {
      let taskSelected = document.querySelector(
        ".task-item[data-task-id='leaderboards']"
      );

      taskSelected.remove();
      leaderboardsRm = false;
    }
  } 
  console.log(score)
  if(index > 4){
    gameOver()
    return false;
  }

  if(index > 0) {
    
    let prevIndex = index - 1;
    let taskSelected = document.querySelector(
      ".task-item[data-task-id='" + prevIndex + "']"
    );

    taskSelected.remove();
  }

  
  qNumber.innerText = questionBank.number[index]
  let questionItemEl = document.createElement("li");
  questionItemEl.className = "task-item";
  questionItemEl.setAttribute("data-task-id", index);

  let questionEl = document.createElement("div");
  questionEl.className = "task-info";
  questionEl.innerHTML ="<h3 class='task-name'>"+ questionBank.questions[index] +
  "</h3><span class='task-type'>Pick 1; Wrong answers loose you 10 seconds </span>";
  questionItemEl.appendChild(questionEl)
  tasksToDoEl.append(questionItemEl);

  let taskActionsEl = createTaskActions(index,"questions");
  questionItemEl.appendChild(taskActionsEl);

 


  // console.log(questionBank.questions[index],questionBank.number[index],questionBank.answers[index])
  // index ++
  // console.log(questionBank.questions[index],questionBank.number[index],questionBank.answers[index])
}

function leaderboardsScreen(type){ 
  leaderboardsBtn.disabled = true; 
  startBtn.disabled = false;
  if(type == "results"){
    let taskSelected = document.querySelector(
      ".task-item[data-task-id='"+type+"']"
    );

    taskSelected.remove();
  }
    
  
  workingHeader.innerText = "Leaderboards"

  for (let i = 0; i < namesArray.length; i++) {
    let questionItemEl = document.createElement("li");
    questionItemEl.className = "task-item";
    questionItemEl.setAttribute("data-task-id", "leaderboards");
    let questionEl = document.createElement("div");
    questionEl.className = "task-info";
    questionEl.innerHTML ="<h3 class='task-name'>"+namesArray[i]+"</h3><span class='task-type'>"+scoresArray[i]+"</span>";
    questionItemEl.appendChild(questionEl)
    tasksToDoEl.append(questionItemEl);
  }
  leaderboardsRm = true;
}

let createTaskActions = function (index, type) {
  // create container to hold elements
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

 if(type == "questions"){ //create all buttons in one loop
  let currentBank = shuffle(AnswerBank[index])
  for (let i = 0; i < currentBank.length; i++) {
    let interactionButton = document.createElement("button");
        interactionButton.textContent = currentBank[i];
        interactionButton.className = "btn " +questionBank.letter[i]+ "-btn";
        interactionButton.setAttribute("data-task-id", index);
        actionContainerEl.appendChild(interactionButton);
  }}
  else if(type == "results"){
    let playerRecord = document.createElement("input")
    playerRecord.type = "text"
    playerRecord.name = "name-field"
    playerRecord.placeholder = "Enter your Name or Initials"
    actionContainerEl.appendChild(playerRecord);

    let interactionButton = document.createElement("button");
    interactionButton.textContent = "Save";
    interactionButton.className = "btn S-btn";
    interactionButton.setAttribute("data-task-id", "results");
    actionContainerEl.appendChild(interactionButton);
  }
  return actionContainerEl;
};

let taskButtonHandler = function (event) {
  // get target element from event
  let targetEl = event.target;
  

  console.log(targetEl);

  if(targetEl.matches(".S-btn")){
    let playerRecordValue = document.querySelector("input[name='name-field']").value;
    namesArray.push(playerRecordValue)
    scoresArray.push(score)
    leaderboards.user = namesArray;
    leaderboards.score = scoresArray;
    persistData();
    leaderboardsScreen("results");

  }

    else if (targetEl.matches(".A-btn") || targetEl.matches(".B-btn") || targetEl.matches(".C-btn") || targetEl.matches(".D-btn")  ){
    if(targetEl.textContent == questionBank.answers[index]){

      score++
      score = timer + score
      index ++
      questions()
    }
    else{
      timer -= 10
      index ++
      questions()
    }
  }

};

startBtn.addEventListener("click", startGame);
leaderboardsBtn.addEventListener("click", leaderboardsScreen);

pageContentEl.addEventListener("click", taskButtonHandler);

loadData();

