//set all common working variables
let interval;
let index = 0;
let timer = 60;
// set questionBank object
let questionBank = {
  questions: ["Which one of these logs content to the console?", "what does CSS stand for?", "which one shows a prompt for the user?", "which one would I  use to get a decimal bewteen 0 and 1?", "freebee: whos the best?"],
  number: [1,2,3,4,5],
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
//declare query selections
let TopEl = document.querySelector("#top-bar");
let startBtn = document.querySelector("#start-game")
let time = document.querySelector("#timer")
let qNumber = document.querySelector("#qNumber")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

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
  interval = setInterval(updateTimer, 1000);
  questions();
}

// /reset game so they can try again
function gameOver(){
  timer = 60;
  index = 0
  startBtn.disabled = false
  clearInterval(interval);
}


// self explanatory
function questions(){


  if(index > 0) {
    debugger;
    let prevIndex = index - 1;
    console.log(".task-item[data-task-id='" + prevIndex + "']")
    var taskSelected = document.querySelector(
      ".task-item[data-task-id='" + prevIndex + "']"
    );

    taskSelected.remove();
  }
  
  qNumber.innerText = questionBank.number[index]
  let questionItemEl = document.createElement("li");
  questionItemEl.className = "task-item";
  questionItemEl.setAttribute("data-task-id", index);

  var questionEl = document.createElement("div");
  questionEl.className = "task-info";
  questionEl.innerHTML ="<h3 class='task-name'>"+ questionBank.questions[index] +
  "</h3><span class='task-type'>Pick 1; Wrong answers loose you 10 seconds </span>";
  questionItemEl.appendChild(questionEl)
  tasksToDoEl.append(questionItemEl);

  var taskActionsEl = createTaskActions(index);
  questionItemEl.appendChild(taskActionsEl);

 


  console.log(questionBank.questions[index],questionBank.number[index],questionBank.answers[index])
  index ++
  console.log(questionBank.questions[index],questionBank.number[index],questionBank.answers[index])
}

var createTaskActions = function (index) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  let currentBank = shuffle(AnswerBank[index])

  // create edit button
  var answerAButton = document.createElement("button");
  answerAButton.textContent = currentBank[0];
  answerAButton.className = "btn A-btn";
  answerAButton.setAttribute("data-task-id", index);
  actionContainerEl.appendChild(answerAButton);
  // create delete button
  var answerBButton = document.createElement("button");
  answerBButton.textContent = currentBank[1]
  answerBButton.className = "btn B-btn";
  answerBButton.setAttribute("data-task-id", index);
  actionContainerEl.appendChild(answerBButton);

  var answerCButton = document.createElement("button");
  answerCButton.textContent = currentBank[2]
  answerCButton.className = "btn C-btn";
  answerCButton.setAttribute("data-task-id", index);
  actionContainerEl.appendChild(answerCButton);
  
  var answerDButton = document.createElement("button");
  answerDButton.textContent = currentBank[3]
  answerDButton.className = "btn D-btn";
  answerDButton.setAttribute("data-task-id", index);
  actionContainerEl.appendChild(answerDButton);
  return actionContainerEl;
};

var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  console.log(targetEl);

  if (targetEl.matches(".A-btn") || targetEl.matches(".B-btn") || targetEl.matches(".C-btn") || targetEl.matches(".D-btn")  ){
    console.log("boop!")
    questions()
  }

  // if (targetEl.matches(".edit-btn")) {
  //   console.log("edit", targetEl);
  //   var taskId = targetEl.getAttribute("data-task-id");
  //   editTask(taskId);
  // } else if (targetEl.matches(".delete-btn")) {
  //   console.log("delete", targetEl);
  //   var taskId = targetEl.getAttribute("data-task-id");
  //   deleteTask(taskId);
  // }
};

startBtn.addEventListener("click", startGame);
pageContentEl.addEventListener("click", taskButtonHandler);

















//------------------------------------------------------------------------------------------------------------------------------------------


// var taskIdCounter = 0;


// var tasksToDoEl = document.querySelector("#tasks-to-do");
// var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// var tasksCompletedEl = document.querySelector("#tasks-completed");
// var pageContentEl = document.querySelector("#page-content");

// // create array to hold tasks for saving
// var tasks = [];

// var taskFormHandler = function (event) {
//   event.preventDefault();
//   var taskNameInput = document.querySelector("input[name='task-name']").value;
//   var taskTypeInput = document.querySelector("select[name='task-type']").value;

//   // check if inputs are empty (validate)
//   if (!taskNameInput || !taskTypeInput) {
//     alert("You need to fill out the task form!");
//     return false;
//   }

//   // reset form fields for next task to be entered
//   document.querySelector("input[name='task-name']").value = "";
//   document.querySelector("select[name='task-type']").selectedIndex = 0;

//   // check if task is new or one being edited by seeing if it has a data-task-id attribute
//   var isEdit = formEl.hasAttribute("data-task-id");

//   if (isEdit) {
//     var taskId = formEl.getAttribute("data-task-id");
//     completeEditTask(taskNameInput, taskTypeInput, taskId);
//   } else {
//     var taskDataObj = {
//       name: taskNameInput,
//       type: taskTypeInput,
//       status: "to do",
//     };

//     createTaskEl(taskDataObj);
//   }
// };

// var createTaskEl = function(taskDataObj) {
//   var listItemEl = document.createElement("li");
//   listItemEl.className = "task-item";
//   listItemEl.setAttribute("data-task-id", taskIdCounter);

//   var taskInfoEl = document.createElement("div");
//   taskInfoEl.className = "task-info";
//   taskInfoEl.innerHTML =
//     "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
//   listItemEl.appendChild(taskInfoEl);

//   var taskActionsEl = createTaskActions(taskIdCounter);
//   listItemEl.appendChild(taskActionsEl);

//   switch (taskDataObj.status) {
//     case "to do":
//       taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
//       tasksToDoEl.append(listItemEl);
//       break;
//     case "in progress":
//       taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
//       tasksInProgressEl.append(listItemEl);
//       break;
//     case "completed":
//       taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
//       tasksCompletedEl.append(listItemEl);
//       break;
//     default:
//       console.log("Something went wrong!");
//   }

//   // save task as an object with name, type, status, and id properties then push it into tasks array
//   taskDataObj.id = taskIdCounter;

//   tasks.push(taskDataObj);

//   // save tasks to localStorage
//   saveTasks();

//   // increase task counter for next unique task id
//   taskIdCounter++;
// };

// var createTaskActions = function (taskId) {
//   // create container to hold elements
//   var actionContainerEl = document.createElement("div");
//   actionContainerEl.className = "task-actions";

//   // create edit button
//   var editButtonEl = document.createElement("button");
//   editButtonEl.textContent = "Edit";
//   editButtonEl.className = "btn edit-btn";
//   editButtonEl.setAttribute("data-task-id", taskId);
//   actionContainerEl.appendChild(editButtonEl);
//   // create delete button
//   var deleteButtonEl = document.createElement("button");
//   deleteButtonEl.textContent = "Delete";
//   deleteButtonEl.className = "btn delete-btn";
//   deleteButtonEl.setAttribute("data-task-id", taskId);
//   actionContainerEl.appendChild(deleteButtonEl);
//   // create change status dropdown
//   var statusSelectEl = document.createElement("select");
//   statusSelectEl.setAttribute("name", "status-change");
//   statusSelectEl.setAttribute("data-task-id", taskId);
//   statusSelectEl.className = "select-status";
//   actionContainerEl.appendChild(statusSelectEl);
//   // create status options
//   var statusChoices = ["To Do", "In Progress", "Completed"];

//   for (var i = 0; i < statusChoices.length; i++) {
//     // create option element
//     var statusOptionEl = document.createElement("option");
//     statusOptionEl.setAttribute("value", statusChoices[i]);
//     statusOptionEl.textContent = statusChoices[i];

//     // append to select
//     statusSelectEl.appendChild(statusOptionEl);
//   }

//   return actionContainerEl;
// };

// var completeEditTask = function (taskName, taskType, taskId) {
//   // find task list item with taskId value
//   var taskSelected = document.querySelector(
//     ".task-item[data-task-id='" + taskId + "']"
//   );

//   // set new values
//   taskSelected.querySelector("h3.task-name").textContent = taskName;
//   taskSelected.querySelector("span.task-type").textContent = taskType;

//   // loop through tasks array and task object with new content
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id === parseInt(taskId)) {
//       tasks[i].name = taskName;
//       tasks[i].type = taskType;
//     }
//   }

//   alert("Task Updated!");

//   // remove data attribute from form
//   formEl.removeAttribute("data-task-id");
//   // update formEl button to go back to saying "Add Task" instead of "Edit Task"
//   formEl.querySelector("#save-task").textContent = "Add Task";
//   // save tasks to localStorage
//   saveTasks();
// };

// var taskButtonHandler = function (event) {
//   // get target element from event
//   var targetEl = event.target;

//   if (targetEl.matches(".edit-btn")) {
//     console.log("edit", targetEl);
//     var taskId = targetEl.getAttribute("data-task-id");
//     editTask(taskId);
//   } else if (targetEl.matches(".delete-btn")) {
//     console.log("delete", targetEl);
//     var taskId = targetEl.getAttribute("data-task-id");
//     deleteTask(taskId);
//   }
// };

// var taskStatusChangeHandler = function (event) {
//   console.log(event.target.value);

//   // find task list item based on event.target's data-task-id attribute
//   var taskId = event.target.getAttribute("data-task-id");

//   var taskSelected = document.querySelector(
//     ".task-item[data-task-id='" + taskId + "']"
//   );

//   // convert value to lower case
//   var statusValue = event.target.value.toLowerCase();

//   if (statusValue === "to do") {
//     tasksToDoEl.appendChild(taskSelected);
//   } else if (statusValue === "in progress") {
//     tasksInProgressEl.appendChild(taskSelected);
//   } else if (statusValue === "completed") {
//     tasksCompletedEl.appendChild(taskSelected);
//   }

//   // update task's in tasks array
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id === parseInt(taskId)) {
//       tasks[i].status = statusValue;
//     }
//   }

//   // save to localStorage
//   saveTasks();
// };

// var editTask = function (taskId) {
//   console.log(taskId);

//   // get task list item element
//   var taskSelected = document.querySelector(
//     ".task-item[data-task-id='" + taskId + "']"
//   );

//   // get content from task name and type
//   var taskName = taskSelected.querySelector("h3.task-name").textContent;
//   console.log(taskName);

//   var taskType = taskSelected.querySelector("span.task-type").textContent;
//   console.log(taskType);

//   // write values of taskName and taskType to form to be edited
//   document.querySelector("input[name='task-name']").value = taskName;
//   document.querySelector("select[name='task-type']").value = taskType;

//   // set data attribute to the form with a value of the task's id so it knows which one is being edited
//   formEl.setAttribute("data-task-id", taskId);
//   // update form's button to reflect editing a task rather than creating a new one
//   formEl.querySelector("#save-task").textContent = "Save Task";
// };

// var deleteTask = function (taskId) {
//   console.log(taskId);
//   // find task list element with taskId value and remove it
//   var taskSelected = document.querySelector(
//     ".task-item[data-task-id='" + taskId + "']"
//   );
//   taskSelected.remove();

//   // create new array to hold updated list of tasks
//   var updatedTaskArr = [];

//   // loop through current tasks
//   for (var i = 0; i < tasks.length; i++) {
//     // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
//     if (tasks[i].id !== parseInt(taskId)) {
//       updatedTaskArr.push(tasks[i]);
//     }
//   }

//   // reassign tasks array to be the same as updatedTaskArr
//   tasks = updatedTaskArr;
//   saveTasks();
// };

// var saveTasks = function() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// };

// var loadTasks = function() {
//   var savedTasks = localStorage.getItem("tasks");
//   // if there are no tasks, set tasks to an empty array and return out of the function
//   if (!savedTasks) {
//     return false;
//   }
//   console.log("Saved tasks found!");
//   // else, load up saved tasks

//   // parse into array of objects
//   savedTasks = JSON.parse(savedTasks);

//   // loop through savedTasks array
//   for (var i = 0; i < savedTasks.length; i++) {
//     // pass each task object into the `createTaskEl()` function
//     createTaskEl(savedTasks[i]);
//   }
// };

// // Create a new task
// formEl.addEventListener("submit", taskFormHandler);

// // for edit and delete buttons
// pageContentEl.addEventListener("click", taskButtonHandler);

// // for changing the status
// pageContentEl.addEventListener("change", taskStatusChangeHandler);

// loadTasks();
