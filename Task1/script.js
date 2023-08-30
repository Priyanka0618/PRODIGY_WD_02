let timerInterval;
let running = false;
let startTime;
let lapTimes = [];

function formatTime(time) {
  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  const currentTime = running
    ? Math.floor((Date.now() - startTime) / 1000)
    : 0;
  document.getElementById("display").textContent = formatTime(currentTime);
}

function startStop() {
  if (running) {
    clearInterval(timerInterval);
    document.getElementById("startStop").textContent = "Start";
    lapTimes.push(formatTime(Math.floor((Date.now() - startTime) / 1000)));
    updateLapList();
  } else {
    startTime = Date.now() - (lapTimes.length > 0 ? timeToMilliseconds(lapTimes[lapTimes.length - 1]) : 0);
    timerInterval = setInterval(updateDisplay, 1000);
    document.getElementById("startStop").textContent = "Stop";
  }
  running = !running;
}

function timeToMilliseconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function lapTime() {
  if (running) {
    lapTimes.push(formatTime(Math.floor((Date.now() - startTime) / 1000)));
    updateLapList();
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("startStop").textContent = "Start";
  lapTimes = [];
  updateLapList();
  running = false;
}

function updateLapList() {
  const lapList = document.getElementById("lapList");
  lapList.innerHTML = "";
  lapTimes.forEach((lapTime, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${lapTime}`;
    lapList.appendChild(li);
  });
}
