const taskList = [];

const input = document.getElementById("taskInput");
const button = document.getElementById("btn");
const tasks = document.getElementById("taskShow");

function addTask(){
    if (input.value.trim() == ""){
        tasks.innerHTML = "Task can't be empty!!"
    }else{
        taskList.push(input.value);
        input.value = "";
        tasks.innerHTML = "";

        for (const task of taskList){
            tasks.innerHTML += `<li>${task}</li>`;
        }
    }
    
}

button.addEventListener("click", addTask);
input.addEventListener("keypress", (event) =>{
    if (event.key === "Enter"){
        addTask();
    }
})
