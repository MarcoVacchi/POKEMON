document.addEventListener("DOMContentLoaded", function () {
    loadData();

    // Associa l'evento al pulsante tramite l'ID
    document.getElementById("calculate-btn").addEventListener("click", calculatePoints);

    // Aggiungi l'evento per le caselle .win e .lose
    document.querySelectorAll(".win, .lose").forEach(input => {
        input.addEventListener("input", calculatePoints);
    });

    // Controlla se gli eventi sono associati correttamente
    console.log("Eventi input collegati alle caselle .win e .lose");
});

function calculatePoints() {
    // Per ogni riga della tabella, calcola i punti
    document.querySelectorAll(".table-row").forEach(row => {
        let winInputs = row.querySelectorAll(".win");
        let totalWins = 0;
        
        // Somma tutte le vittorie per quella riga
        winInputs.forEach(input => {
            let wins = parseInt(input.value, 10);
            if (isNaN(wins)) wins = 0;
            totalWins += wins;
        });

        // Calcola i punti basati sul totale delle vittorie
        let points = totalWins * 2; // Supponiamo che ogni vittoria valga 2 punti
        let pointsCell = row.querySelector(".points");
        if (pointsCell) {
            pointsCell.textContent = points;
        }
    });

    // Stampa i punteggi sotto la tabella
    displayScores();
    // Salva i dati dopo il calcolo
    saveData();
}

function displayScores() {
    let scoresList = document.getElementById("scores-list");
    scoresList.innerHTML = ""; // Pulisce la lista esistente prima di aggiungere i nuovi punteggi

    document.querySelectorAll(".table-row").forEach(row => {
        let playerName = row.querySelector(".cell").textContent;
        let points = row.querySelector(".points").textContent;

        // Crea un nuovo elemento di lista per ogni giocatore
        let li = document.createElement("li");
        li.textContent = `${playerName}: ${points} Punti`;
        scoresList.appendChild(li);
    });
}

function saveData() {
    let data = [];
    document.querySelectorAll(".table-row").forEach(row => {
        let name = row.querySelector(".cell").textContent;
        let wins = [];
        row.querySelectorAll(".win").forEach(winInput => {
            wins.push(winInput.value);
        });
        let losses = [];
        row.querySelectorAll(".lose").forEach(loseInput => {
            losses.push(loseInput.value);
        });
        let points = row.querySelector(".points").textContent;
        data.push({ name, wins, losses, points });
    });
    localStorage.setItem("scoreData", JSON.stringify(data));
}

function loadData() {
    let data = JSON.parse(localStorage.getItem("scoreData"));
    if (data) {
        document.querySelectorAll(".table-row").forEach((row, index) => {
            if (data[index]) {
                row.querySelectorAll(".win").forEach((input, i) => {
                    input.value = data[index].wins[i];
                });
                row.querySelectorAll(".lose").forEach((input, i) => {
                    input.value = data[index].losses[i];
                });
                row.querySelector(".points").textContent = data[index].points;
            }
        });
    }
}