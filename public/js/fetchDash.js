var total_acertos = 0
var total_erros = 0
var pontosFacil = 0
var pontosMedio = 0
var pontosDificil = 0
var estadoQuiz = JSON.parse(sessionStorage.getItem('estadoQuiz'));

function atualizarPagFinal() {
    estadoQuiz = JSON.parse(sessionStorage.getItem('estadoQuiz'));
    document.getElementById('acertos_text').innerHTML = estadoQuiz.acertos;
    document.getElementById('acertos_text2').innerHTML = estadoQuiz.acertos;
    document.getElementById('acertos_text3').innerHTML = estadoQuiz.acertos;
    document.getElementById('pontos_text').innerHTML = estadoQuiz.pontuacao;
    document.getElementById('pontos_text2').innerHTML = estadoQuiz.pontuacao;
    document.getElementById('pontos_text3').innerHTML = estadoQuiz.pontuacao;
}
function finalizarQuiz() {
    sessionStorage.removeItem('contagem');
    var dadosQuiz = {
        dificuldade: dificuldade, 
        acertos: acertos,         
        erros: erros,            
        pontos: pontuacao        
    };

   
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
        console.log('Resultados do quiz enviados com sucesso:', data);
 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    setTimeout(atualizarPagFinal, 500);
    setTimeout(PontosGerais, 500); 
    setTimeout(obterPontosPorNivel, 500); 
    setTimeout(obterPontos, 500);
    contadorGrafico = 0
    contadorGrafico2 = 0
}

function atualizarUsuario() {
    var senha = ipt_senha.value;
    var confirmar_senha = ipt_senhaConfirmacao.value
    if(senha.length < 6) {
        alert('Digite uma senha válida (Pelo menos 6 caracteres)')
        return
    }
    if(senha != confirmar_senha) {
        alert('A confirmação de senha precisa ser igual')
        return
    }
    alert(`Senha alterada com sucesso!`)
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
            throw new Error('Erro ao atualizar a senha do usuário');
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
var contadorGrafico = 0

function obterPontos() {
    fetch(`/pontuacoes/ultimas/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                var pontosRecebidos = resposta[0].total_pontos; 
                var vezesRealizadas = resposta[0].quantidade
                var qtd_acertos = resposta[0].qtd_acertos
                var qtd_erros = resposta[0].qtd_erros
                console.log(`${pontosRecebidos}`)

                pts_kpi.innerHTML = `${pontosRecebidos} Pts`
                vezes_kpi.innerHTML = `${vezesRealizadas} Vezes`
                acertos_kpi.innerHTML = `${qtd_acertos} Acertos`
                total_acertos = qtd_acertos
                total_erros = qtd_erros
                pontos_totais = pontosRecebidos
                if(contadorGrafico == 0) {
                    setTimeout(plotarGrafico, 100);
                    }
                contadorGrafico++
                selecionarPersonagem()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        
    });
    
    
}
var contadorGrafico2 = 0
function obterPontosPorNivel() {
    fetch(`/pontuacoes/nivel/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                resposta.forEach(function(quiz) {
                    if (quiz.dificuldade === 'dificil') {
                        pontosDificil = quiz.acertos_totais;
                    } else if (quiz.dificuldade === 'facil') {
                        pontosFacil = quiz.acertos_totais;
                    } else if (quiz.dificuldade === 'media') {
                        pontosMedio = quiz.acertos_totais;
                    }
                });
                
            
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        
    });
    if(contadorGrafico2 == 0) {
        setTimeout(plotarGrafico2, 100)
       }
       contadorGrafico2++
       
}

function PontosGerais() {
    fetch(`/pontuacoes/tempo-real`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
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
                lista_pontos_ranking.push(pontosPrimeiro, pontosSegundo, pontosTerceiro, pontosQuarto, pontosQuinto)
                
                
                
                console.log(`${resposta[4].pontos_recebidos}`)
                nome_primeiro.innerHTML = `${nomePrimeiro}`
                nome_segundo.innerHTML = `${nomeSegundo}`
                nome_terceiro.innerHTML = `${nomeTerceiro}`
                nome_quarto.innerHTML = `${nomeQuarto}`
                nome_quinto.innerHTML = `${nomeQuinto}`
                pts_primeiro.innerHTML = `${pontosPrimeiro} Pts`
                pts_segundo.innerHTML = `${pontosSegundo} Pts`
                pts_terceiro.innerHTML = `${pontosTerceiro} Pts`
                pts_quarto.innerHTML = `${pontosQuarto} Pts`
                pts_quinto.innerHTML = `${pontosQuinto} Pts`
                verificacao()
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}