let tasks=[]
document.addEventListener('DOMContentLoaded',()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTasksList();
        updateStats();
    }
})


const saveTasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addTask=()=>{
    const taskInput=document.getElementById('taskInput') //Jo task type hoga woh isme aa jayega 
    const text=taskInput.value.trim();//task ki value (if not blank spaces) textmein assign ho jayegi
    if(text)//Check non blank spaces 
    {
        tasks.push({"text":text, "completed":false});//tasks array mein add kar do 
        taskInput.value="";
        console.log(tasks);
        updateTasksList();
        updateStats();
        saveTasks();
    }
    // console.log(tasks);

};

const toggleTaskComplete=(index)=>{  //TIck karne par task completed true ho jaye 
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();

}

const editTask=(index)=>{
    const taskInput=document.getElementById('taskInput')
    taskInput.value=tasks[index].text;
    
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();

}

const updateStats =()=>{
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks=tasks.length;
    const progress=(completedTasks/totalTasks)*100
     const progressBar=document.getElementById('progress')
     progressBar.style.width=`${progress}%`;


     document.getElementById('numbers').innerText=`${completedTasks} / ${totalTasks}`
     if(tasks.length && completedTasks ===totalTasks)
     {
        blaskConfetti();
        showCongratulations(); 
   
     }
}

 const updateTasksList=()=>{
    const taskList=document.getElementById('task-list');
    taskList.innerHTML="";

    tasks.forEach((task,index)=>{
   const listItem=document.createElement('li');
//Add the tasks in task list  
   listItem.innerHTML=`
   <div class="taskItem">
   <div class="task  ${task.completed? "completed":""}">
   <input type="checkbox" class="checkbox" ${task.completed? "checked":""}/>
   <p>${task.text}</p>
   </div>
   <div class="icons">
   <img src="./img/edit.png" onClick="editTask(${index})">
   <img src="./img/bin.png" onClick="deleteTask(${index})">
   </div>
   </div>
   `    ;
listItem.addEventListener('change',()=>toggleTaskComplete(index))
taskList.append(listItem);
    });
 };




document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();//To not to reload page again and again 
        addTask();
})


//Animation

const blaskConfetti=()=>{
    const duration = 5* 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}

// Function to show the Congratulations message
const showCongratulations = () => {
    const messageBox = document.createElement("div");
    messageBox.setAttribute("id", "congratulationsMessage");
    messageBox.innerHTML = `<h2>Congratulations! You've completed all your tasks!</h2>`;

    // Styling the message
    messageBox.style.position = "fixed";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = "#28a745";
    messageBox.style.color = "white";
    messageBox.style.padding = "20px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.fontSize = "1.5em";
    messageBox.style.zIndex = "1001";
    messageBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    
    // Add the message to the body
    document.body.appendChild(messageBox);

    // Remove the message after 3 seconds
    setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => messageBox.remove(), 9000); // Remove the message after fade-out
    }, 3000);
};


