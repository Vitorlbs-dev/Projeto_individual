var myPieChart;
        var myBarChart;
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        Chart.defaults.color = "#fff";
        
function plotarGrafico() {
    var data = {
        labels: [`Acertos: ${total_acertos}`, `Erros: ${total_erros}`],
        datasets: [{
            data: [total_acertos, total_erros],
            backgroundColor: ['blue', 'red']
        }]
    };

    var options = {
        responsive: false,
        maintainAspectRatio: false
    };

    if (myPieChart) {
        myPieChart.data = data;
        myPieChart.update();
    } else {
        myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options
        });
    }
}

function plotarGrafico2() {
    var data2 = {
        labels: ['Fácil', 'Médio', 'Difícil'],
        datasets: [{
            label: 'Pontos',
            data: [pontosFacil, pontosMedio, pontosDificil],
            backgroundColor: 'orange',
            borderColor: 'white',
            borderWidth: 1
        }]
    };

    var options2 = {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    if (myBarChart) {
        myBarChart.data = data2;
        myBarChart.update();
    } else {
        myBarChart = new Chart(ctx2, {
            type: 'bar',
            data: data2,
            options: options2
        });
    }
}