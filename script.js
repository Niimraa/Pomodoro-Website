let timer;
let isRunning = false;
let totalSeconds = 0;

document.getElementById("startButton").addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        this.textContent = "Resume";
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
    const buttonText = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    this.textContent = buttonText;
});

function updateTimer() {
    if (totalSeconds === 0) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("startButton").textContent = "Start";
    } else {
        totalSeconds--;
        updateTimerDisplay();
    }
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
