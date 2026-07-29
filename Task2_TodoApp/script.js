const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let total = 0;
let completed = 0;
let pending = 0;

// Add Task using Enter Key
taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask.click();

    }

});
// Add Task
addTask.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
        <div class="task-info">
            <h3>${task}</h3>
            <p><b>Category:</b> ${category.value}</p>
            <p><b>Priority:</b> ${priority.value}</p>
            <p><b>Due Date:</b> ${dueDate.value || "Not Set"}</p>
        </div>

        <div class="task-actions">

            <button class="complete-btn">
                <i class="fa-solid fa-check"></i>
            </button>

            <button class="edit-btn">
                <i class="fa-solid fa-pen"></i>
            </button>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
    `;

    taskList.appendChild(li);

    total++;
    pending++;

    updateCounts();

    taskInput.value = "";
    dueDate.value = "";

    addEvents(li);

});

// Attach Events
function addEvents(li){

    // Complete
    li.querySelector(".complete-btn").addEventListener("click",function(){

        if(!li.classList.contains("completed")){

            li.classList.add("completed");
            completed++;
            pending--;

        }else{

            li.classList.remove("completed");
            completed--;
            pending++;

        }

        updateCounts();

    });

    // Edit
    li.querySelector(".edit-btn").addEventListener("click",function(){

        const current=li.querySelector("h3").textContent;

        const updated=prompt("Edit Task",current);

        if(updated!==null && updated.trim()!==""){

            li.querySelector("h3").textContent=updated;

        }

    });

    // Delete
    li.querySelector(".delete-btn").addEventListener("click",function(){

        if(confirm("Delete this task?")){

            if(li.classList.contains("completed")){

                completed--;

            }else{

                pending--;

            }

            total--;

            li.remove();

            updateCounts();

        }

    });

}

// Update Counters
function updateCounts(){

    totalTasks.textContent=total;
    completedTasks.textContent=completed;
    pendingTasks.textContent=pending;

}

function updateCounts(){

    totalTasks.textContent=total;
    completedTasks.textContent=completed;
    pendingTasks.textContent=pending;

}

// 👇 IKKADA NEW CODE PASTE CHEYYALI

// Dark Mode Toggle

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = themeToggle.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});