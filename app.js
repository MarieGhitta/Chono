let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = null;
let wakeLock = null;


// affichage du temps
function updateDisplay() {

  const display = document.getElementById("display");

  let hr = hours < 10 ? "0" + hours : hours;
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = `${hr}:${min}:${sec}`;
}


// wake lock
async function enableWakeLock() {

  try {

    if ("wakeLock" in navigator && wakeLock === null) {

      wakeLock = await navigator.wakeLock.request("screen");

      wakeLock.addEventListener("release", () => {
        wakeLock = null;
      });

    }

  } catch (err) {

    console.error(err);

  }

}


// start
async function startTimer() {

  await enableWakeLock();

  if (interval) return;

  document.getElementById("start").classList.add("active-start");
  document.getElementById("stop").classList.remove("active-stop");

  interval = setInterval(() => {

    seconds++;

    if (seconds === 60) {

      seconds = 0;
      minutes++;

    }

    if (minutes === 60) {

      minutes = 0;
      hours++;

    }

    updateDisplay();

  }, 1000);

}


// stop
function stopTimer() {

  clearInterval(interval);
  interval = null;

  document.getElementById("start").classList.remove("active-start");
  document.getElementById("stop").classList.add("active-stop");

}


// reset
function resetTimer() {

  stopTimer();

  hours = 0;
  minutes = 0;
  seconds = 0;

  document.getElementById("stop").classList.remove("active-stop");

  updateDisplay();

}


// définir temps
function setStartTime(hr, min, sec) {

  stopTimer();

  hours = parseInt(hr, 10) || 0;
  minutes = parseInt(min, 10) || 0;
  seconds = parseInt(sec, 10) || 0;

  if (seconds >= 60) {

    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;

  }

  if (minutes >= 60) {

    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

  }

  updateDisplay();

}


// wake lock si retour page
document.addEventListener("visibilitychange", async () => {

  if (document.visibilityState === "visible") {

    await enableWakeLock();

  }

});


// boutons

document.getElementById("start").addEventListener("click", startTimer);

document.getElementById("stop").addEventListener("click", stopTimer);

document.getElementById("reset").addEventListener("click", resetTimer);


document.getElementById("setTime").addEventListener("click", async () => {

  await enableWakeLock();

  const hr = document.getElementById("inputHour").value;
  const min = document.getElementById("inputMin").value;
  const sec = document.getElementById("inputSec").value;

  setStartTime(hr, min, sec);

});


updateDisplay();