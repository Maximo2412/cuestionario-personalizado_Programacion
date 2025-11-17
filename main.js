const correctAnswers = {
    p1: 'd', // Gestiona la transferencia de datos entre nodos en la misma red
    p2: 'b', // TCP
    p3: 'a', // Lo desampaqueta, lo direcciona, lo enruta y lo empaqueta
    p4: 'a', // Capa de Red
    p5: 'a', // Transmisión de bits a través del medio
    p6: 'c', // Capa de Aplicación
    p7: 'b', // Router
    p8: 'a', // Capa de Presentación
    p9: 'd', // TCP
    p10: 'a', // Capa de Sesión
    p11: 'c' //
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateScore();
        });
    }
    
    showStoredResults();
    mostrarRanking(); 
});

function calculateScore() {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `p${i}`;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedAnswer && selectedAnswer.value === correctAnswers[questionName]) {
            score++;
        }
    }
    
    const results = {
        score: score,
        totalQuestions: totalQuestions,
        percentage: (score / totalQuestions) * 100
    };
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    
    guardarEnRanking(score);
}

function guardarEnRanking(puntaje) {
    let nombreJugador = prompt("¡Felicidades! Ingresa tu nombre para el ranking:");
    
    if (!nombreJugador || nombreJugador.trim() === "") {
        nombreJugador = "Anónimo";
    }
    
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    
    ranking.push({
        nombre: nombreJugador,
        puntaje: puntaje,
        fecha: new Date().toLocaleDateString()
    });
    
    ranking.sort((a, b) => b.puntaje - a.puntaje);
    
    if (ranking.length > 10) {
        ranking = ranking.slice(0, 10);
    }
    
    localStorage.setItem("ranking", JSON.stringify(ranking));
    
    window.location.href = 'Resultado.html';
}

function mostrarRanking() {
    const rankingContainer = document.getElementById('ranking-container');
    if (!rankingContainer) return;
    
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    
    if (ranking.length === 0) {
        rankingContainer.innerHTML = "<p>No hay resultados en el ranking aún</p>";
        return;
    }
    
    let html = `
        <div class="ranking-section">
            <h3>🏆 Ranking de Jugadores</h3>
            <table class="tabla-ranking">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Jugador</th>
                        <th>Puntaje</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    ranking.forEach((jugador, index) => {
        let emoji = '';
        if (index === 0) emoji = 'Campeon ';
        else if (index === 1) emoji = 'Sub-Campeon ';
        else if (index === 2) emoji = 'Tercer Puesto ';
        
        html += `
            <tr>
                <td>${emoji} ${index + 1}°</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntaje}/10</td>
                <td>${jugador.fecha}</td>
            </tr>
        `;
    });
    
    html += `</tbody></table></div>`;
    rankingContainer.innerHTML = html;
}

function showStoredResults() {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        const storedResults = localStorage.getItem('quizResults');
        if (storedResults) {
            const results = JSON.parse(storedResults);
            displayResults(results, resultsContainer);
        }
    }
}

function displayResults(results, container) {
    const { score, totalQuestions, percentage } = results;
    
    let message = '';
    let messageClass = '';
    
    if (percentage >= 80) {
        message = `¡Excelente!`;
        messageClass = 'excellent';
    } else if (percentage >= 60) {
        message = `¡Bien hecho!`;
        messageClass = 'good';
    } else {
        message = `¡Sigue practicando!`;
        messageClass = 'needs-improvement';
    }
    
    container.innerHTML = `
        <div class="result-message ${messageClass}">
            <h2>${message}</h2>
            <div class="score-display">
                <p class="score">Obtuviste: <span>${score}/${totalQuestions}</span></p>
                <p class="percentage">Porcentaje: <span>${percentage.toFixed(1)}%</span></p>
            </div>
        </div>
    `;

}


