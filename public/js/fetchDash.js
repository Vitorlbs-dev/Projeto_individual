
//OBTÉM ÚLTIMOS PONTOS DO USUÁRIO (para KPI)

var contadorGrafico = 0;
var mostrarGrafico = 0;
function obterPontos() {
    fetch(`http://localhost:3333/pontuacoes/ultimas/${idUsuario}`, {
        method: "GET",
        
    })
    .then(res => res.json())
    .then(resposta => {

        // KPIS

        resposta.reverse();

        var pontosRecebidos = resposta[0].total_pontos;
        var vezesRealizadas = resposta[0].quantidade;
        var qtd_acertos = resposta[0].qtd_acertos;
        var qtd_erros = resposta[0].qtd_erros;

        pts_kpi.innerHTML = `${pontosRecebidos} Pts`;
        vezes_kpi.innerHTML = `${vezesRealizadas} Vezes`;
        acertos_kpi.innerHTML = `${qtd_acertos} Acertos`;

        total_acertos = qtd_acertos;
        total_erros = qtd_erros;
        // DADOS DO DO GRAFICO DE BARRAS

        var acertosGrafico = Number(sessionStorage.CERTAS)
        mostrarGrafico = (acertosGrafico*100)/(10)

        if (contadorGrafico == 0) {
            setTimeout(plotarGrafico, 150);
            setTimeout(plotarGrafico2, 150);           
        }
        contadorGrafico++;  

    contadorGrafico = 0;
    contadorGrafico2 = 0;
    })
    .catch(error => console.error('Erro:', error));
}


 




//  RANKING GERAL


function PontosGerais() {
    fetch(`http://localhost:3333/pontuacoes/tempo-real/`, {
        method: "GET",
        
    })
    .then(res => res.json())
    .then(resposta => {

        resposta.reverse();

        // RANKING

        var pontosPrimeiro = resposta[4].total_pontos;
        var pontosSegundo = resposta[3].total_pontos;
        var pontosTerceiro = resposta[2].total_pontos;
        var pontosQuarto = resposta[1].total_pontos;
        var pontosQuinto = resposta[0].total_pontos;

        var nomePrimeiro = resposta[4].nome;
        var nomeSegundo = resposta[3].nome;
        var nomeTerceiro = resposta[2].nome;
        var nomeQuarto = resposta[1].nome;
        var nomeQuinto = resposta[0].nome;

        nome_primeiro.innerHTML = nomePrimeiro;
        nome_segundo.innerHTML = nomeSegundo;
        nome_terceiro.innerHTML = nomeTerceiro;
        nome_quarto.innerHTML = nomeQuarto;
        nome_quinto.innerHTML = nomeQuinto;

        pts_primeiro.innerHTML = `${pontosPrimeiro} Pts`;
        pts_segundo.innerHTML = `${pontosSegundo} Pts`;
        pts_terceiro.innerHTML = `${pontosTerceiro} Pts`;
        pts_quarto.innerHTML = `${pontosQuarto} Pts`;
        pts_quinto.innerHTML = `${pontosQuinto} Pts`;

        verificacao();
        console.log(resposta)
    })
    .catch(error => console.error('Erro ranking:', error));
}

