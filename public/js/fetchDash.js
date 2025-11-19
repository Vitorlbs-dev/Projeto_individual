/***************************************************
 * VARIÁVEIS GERAIS
 ***************************************************/
var total_acertos = 0;
var total_erros = 0;
var pontosFacil = 0;

// Como agora só existe 1 quiz (fácil)
var pontosMedio = 0;
var pontosDificil = 0;

var estadoQuiz = JSON.parse(sessionStorage.getItem('estadoQuiz'));


/***************************************************
 * ATUALIZA TELA FINAL
 ***************************************************/
function atualizarPagFinal() {
    estadoQuiz = JSON.parse(sessionStorage.getItem('estadoQuiz'));

    document.getElementById('acertos_text').innerHTML = estadoQuiz.acertos; 
    document.getElementById('pontos_text').innerHTML = estadoQuiz.pontuacao;
}


/***************************************************
 * FINALIZA QUIZ — envia para o banco
 ***************************************************/
function finalizarQuiz() {

    // Apaga contador de tempo salvo
    sessionStorage.removeItem('contagem');

    // Como agora só existe UM quiz fixo (fácil)
    var dadosQuiz = {
    dificuldade: "facil",
    acertos: acertos,
    erros: erros,
    pontuacao: pontuacao,
    pontos: acertos
};


    // Envia para API
    fetch(`/pontuacoes/insert/${idUsuario}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosQuiz)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os resultados do quiz');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resultados enviados com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    // Atualiza telas e KPIs
    setTimeout(atualizarPagFinal, 500);
    setTimeout(PontosGerais, 500);
    setTimeout(obterPontos, 500);

    contadorGrafico = 0;
    contadorGrafico2 = 0;
}


/***************************************************
 * ATUALIZA SENHA DO USUÁRIO
 ***************************************************/
function atualizarUsuario() {
    var senha = ipt_senha.value;
    var confirmar_senha = ipt_senhaConfirmacao.value;

    if (senha.length < 6) {
        alert('Digite uma senha válida (mínimo 6 caracteres)');
        return;
    }
    if (senha != confirmar_senha) {
        alert('A confirmação de senha precisa ser igual');
        return;
    }

    alert(`Senha alterada com sucesso!`);

    var dadosSenha = {
        senha: senha
    };

    fetch(`/usuarios/update/${idUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosSenha)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar a senha');
        }
        return response.text();
    })
    .then(data => {
        console.log('Resposta do servidor:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}


/***************************************************
 * OBTÉM ÚLTIMOS PONTOS DO USUÁRIO (para KPI)
 ***************************************************/
var contadorGrafico = 0;

function obterPontos() {
    fetch(`/pontuacoes/ultimas/${idUsuario}`, { cache: 'no-store' })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw "Erro ao carregar pontos";
        }
    })
    .then(resposta => {

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

        if (contadorGrafico == 0) {
            setTimeout(plotarGrafico, 150);
        }
        contadorGrafico++;

        selecionarPersonagem();
    })
    .catch(error => console.error('Erro:', error));
}



/***************************************************
 * AGORA O QUIZ TEM SÓ UM NÍVEL (FÁCIL)
 ***************************************************/
var contadorGrafico2 = 0;

function obterPontosPorNivel() {

    // Como só existe 'facil', agora retornamos apenas ele
    pontosFacil = total_acertos;

    // Atualiza gráfico apenas uma vez
    if (contadorGrafico2 === 0) {
        setTimeout(plotarGrafico2, 150);
    }
    contadorGrafico2++;
}




//  RANKING GERAL


function PontosGerais() {
    fetch(`/pontuacoes/tempo-real`, { cache: 'no-store' })
    .then(response => {
        if (!response.ok) throw "Erro no ranking";
        return response.json();
    })
    .then(resposta => {

        resposta.reverse();

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
    })
    .catch(error => console.error('Erro ranking:', error));
}
