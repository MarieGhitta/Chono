let seconds = 0;
let minutes = 0;
let interval = null;

// Affiche le temps au format mm:ss
function updateDisplay() {
  const display = document.getElementById("display");
  let sec = seconds < 10 ? "0" + seconds : seconds;
  let min = minutes < 10 ? "0" + minutes : minutes;
  display.textContent = `${min}:${sec}`;
}

// Démarre le chronomètre
function startTimer() {
  if (interval) return; // Évite de démarrer plusieurs fois
  interval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 1000);
}

// Arrête le chronomètre
function stopTimer() {
  clearInterval(interval);
  interval = null;
}

// Réinitialise le chronomètre
function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  updateDisplay();
}

// Définit un temps de départ personnalisé
function setStartTime(min, sec) {
  stopTimer(); // on stoppe si le chrono tournait
  minutes = parseInt(min, 10) || 0;
  seconds = parseInt(sec, 10) || 0;
  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
  }
  updateDisplay();
}

// Lien avec les boutons
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("setTime").addEventListener("click", () => {
  const min = document.getElementById("inputMin").value;
  const sec = document.getElementById("inputSec").value;
  setStartTime(min, sec);
});

// Affichage initial
updateDisplay();