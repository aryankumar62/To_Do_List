let todos = JSON.parse(localStorage.getItem("todos")) || [] ;
let body = document.querySelector("body");
document.querySelector("#blue").addEventListener("click", () => {
    body.style.background = "linear-gradient(to bottom, #0000ff 0%, #cc00ff 100%)"
    body.style.color = "black"
    body.style.backgroundRepeat = "no-repeat"
    body.style.backgroundAttachment = "fixed"
    body.style.backgroundSize = "cover"
});

document.querySelector("#black").addEventListener("click", ()=>{
    body.style.background = "linear-gradient(to bottom, #000000 0%, #5e6b62 100%)"
    body.style.color = "white"
    body.style.backgroundRepeat = "no-repeat"
    body.style.backgroundAttachment = "fixed"
    body.style.backgroundSize = "cover"

})

document.querySelector("#white").addEventListener("click", ()=>{
    body.style.background = "linear-gradient(to bottom, #ffffff 0%, #99ccff 100%"
    body.style.color = "#ff3300"
    body.style.backgroundRepeat = "no-repeat"
    body.style.backgroundAttachment = "fixed"
    body.style.backgroundSize = "cover"
})


function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    const formatted = now.toLocaleString('en-US', options);

    document.getElementById("datetime").textContent = formatted;
}

updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);

const input = document.querySelector("input");
const addBtn = document.getElementById("add");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }
    const newTodo = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    todos.push(newTodo);

    saveData();
    showTasks();

    input.value = "";
}

function saveData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showTasks() {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.textContent = todo.text;

    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    // buttons
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveData();
      showTasks();
    };

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";
    completeBtn.classList.add("complete-btn");

    completeBtn.onclick = () => {
      todo.completed = !todo.completed;
      saveData();
      showTasks();
    };

    const btnContainer = document.createElement("div");
    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(completeBtn);

    li.appendChild(btnContainer);
    todoList.appendChild(li);
  });
}
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    addTask();
  }
});
showTasks();