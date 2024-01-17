let timer;
let isRunning = false;
let totalSeconds = 0;

document.getElementById("startButton").addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        this.textContent = "Start";
    } else {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        this.textContent = "Pause";
    }
});

document.getElementById("resetButton").addEventListener("click", function() {
    clearInterval(timer);
    isRunning = false;
    totalSeconds = 0;
    updateTimerDisplay();
    document.getElementById("startButton").textContent = "Start";
});

document.getElementById("optionsButton").addEventListener("click", function() {
    const options = document.querySelector(".options");
    options.style.display = options.style.display === "none" ? "flex" : "none";
});



document.getElementById("setTimerButton").addEventListener("click", function() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
        clearInterval(timer);
        isRunning = false;
        updateTimerDisplay();
        document.getElementById("startButton").textContent = "Start";
        document.querySelector(".options").style.display = "none";
    }
});

document.getElementById("modeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

function updateTimer() {
    if (totalSeconds === 0) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startButton").textContent = "Start";
        playSound(); // Play sound when timer ends
    } else {
        totalSeconds--;
        updateTimerDisplay();
    }
}

// Function to play sound
        function playSound() {
    var sound = document.getElementById("alertSound");
    sound.play();
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("display").textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(value) {
    return value < 10 ? "0" + value : value.toString();
}

// Initial display setup
updateTimerDisplay();

function addTodoItem() {
const todoList = document.getElementById("todoList");
const newItemText = document.getElementById("newTodoItem").value.trim();

if (newItemText !== "") {
const listItem = document.createElement("li");
listItem.innerHTML = `
    <input type="checkbox" class="todo-checkbox">
    <span class="todo-item-text">${newItemText}</span>
    <button class="delete-btn" onclick="deleteTodoItem(this)">Delete</button>
`;
todoList.appendChild(listItem);
document.getElementById("newTodoItem").value = ""; // Reset input field
}
}

function deleteTodoItem(button) {
button.parentElement.remove();
}
