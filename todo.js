let taskList = [];

const input = document.getElementById("taskInput");
const button = document.getElementById("btn");
const tasks = document.getElementById("taskShow");

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");

    
    if (savedTasks) {
        taskList = JSON.parse(savedTasks);
    }

}

let nextId = 1;

for (const task of taskList){
    if (task.id >=nextId){
        nextId = task.id + 1;
    }
}

function render(){
    tasks.innerHTML = "";
    for (const task of taskList){
        tasks.innerHTML += `
            <li class="${task.completed ? "completed" : ""}">
            <span>${task.task}</span>

            <div class="actions">
                <button class="complete-btn" onclick="complete(${task.id})">✓</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">✕</button>
            </div>
            </li>
        `;
    }
}

function complete(id){
    const completedTask = taskList.find(task => task.id == id);
    completedTask.completed = true;

    saveTasks();
    render();
}

function deleteTask(id){
    taskList = taskList.filter(task => task.id !== id);

    saveTasks();
    render();

}

function addTask(){
    if (input.value.trim() == ""){
        tasks.innerHTML = "Task can't be empty!!"
    }else{
        const newTask = {
            id : nextId,
            task : input.value,
            completed: false
        };
        nextId++;

        taskList.push(newTask);
        input.value = "";

        saveTasks();
        render();
    }
    
}

button.addEventListener("click", addTask);
input.addEventListener("keypress", (event) =>{
    if (event.key === "Enter"){
        addTask();
    }
})

loadTasks();
render();