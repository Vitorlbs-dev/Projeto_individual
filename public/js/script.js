
    var respostaSelecionada = false;
    var qtd_perguntas_respondidas = 0;
    var acertos = 0;
    var pontuacao = 0;
    var erros = 0;
    var dificuldade = 1;

    var lista_respostas_facil = [2, 1, 4, 1, 1, 4, 2, 3, 4, 4];
    var lista_respostas_medio = [3, 4, 4, 2, 4, 3, 2, 4, 1, 3];
    var lista_respostas_dificil = [2, 4, 1, 1, 1, 2, 2, 1, 4, 3];

    function AbrirModal() {
        quizModal.showModal();
        var paginaInicial = recuperarEstado();
            
            mostrarProximaPagina(paginaInicial);    
    }

    function FecharModal() {
        quizModal.close();
        salvarEstado(document.querySelector('.modal.page.current-page').classList[2].split('page')[1]);
    }

    function iniciarQuiz(paginaInicial, nivelDificuldade) {
        dificuldade = nivelDificuldade;
        sessionStorage.removeItem('estadoQuiz');
        qtd_perguntas_respondidas = 0;
        acertos = 0;
        pontuacao = 0;
        erros = 0;
        mostrarProximaPagina(paginaInicial);
    }

    function salvarEstado(paginaAtual) {
        var estado = {
            qtd_perguntas_respondidas: qtd_perguntas_respondidas,
            acertos: acertos,
            pontuacao: pontuacao,
            erros: erros,
            paginaAtual: paginaAtual,
            dificuldade: dificuldade
        };
        sessionStorage.setItem('estadoQuiz', JSON.stringify(estado));
    }

    function recuperarEstado() {
        var estado = JSON.parse(sessionStorage.getItem('estadoQuiz'));
        if (estado) {
            qtd_perguntas_respondidas = estado.qtd_perguntas_respondidas;
            acertos = estado.acertos;
            pontuacao = estado.pontuacao;
            erros = estado.erros;
            dificuldade = estado.dificuldade
            return estado.paginaAtual;
        }
        return 1;
    }




    var contagem = sessionStorage.getItem('contagem');
    if (contagem === null) {
        contagem = 0;
    }
    function verificarResposta(numero, divClicada) {
        if (respostaSelecionada) {
            return;
        }

        respostaSelecionada = true;

        var paginaAtual = document.querySelector('.modal.page.current-page');
        var paginas = document.querySelectorAll('.modal.page');
        var paginaIndex = Array.from(paginas).indexOf(paginaAtual);

        qtd_perguntas_respondidas++;

        var respostas_corretas;
        var pontuacao_atual;
        
        if (dificuldade == 1) {   //fácil
            respostas_corretas = lista_respostas_facil;
            pontuacao_atual = 1;
        } else if (dificuldade == 2) {   //médio
            respostas_corretas = lista_respostas_medio;
            pontuacao_atual = 2;
        } else if (dificuldade == 3) {   //difícil
            respostas_corretas = lista_respostas_dificil;
            pontuacao_atual = 3;
        }

        if (numero == respostas_corretas[qtd_perguntas_respondidas - 1]) {
            acertos++;
            pontuacao += pontuacao_atual;
            divClicada.classList.add("certa");
        } else {
            erros++;
            divClicada.classList.add("errada");

            var alternativas = paginaAtual.querySelectorAll('.alternativa');
            var respostaCorretaIndex = respostas_corretas[qtd_perguntas_respondidas - 1] - 1;

            alternativas[respostaCorretaIndex].classList.add("certa");
        }

        setTimeout(() => {
            var proximaPaginaNumero = paginaIndex + 2;

            if (proximaPaginaNumero > paginas.length) {
                reiniciarQuiz();
            } else {
                mostrarProximaPagina(proximaPaginaNumero);
                salvarEstado(proximaPaginaNumero);
            }
            contagem++
            sessionStorage.setItem('contagem', contagem);
        if(contagem == 10) {
            finalizarQuiz();
            contagem = 0
        }
            
            respostaSelecionada = false;
        }, 1000);
    
    }

    function mostrarProximaPagina(paginaNumero) {
        var todasPaginas = document.querySelectorAll('.modal.page');
        todasPaginas.forEach(pagina => {
            pagina.style.display = 'none';
            pagina.style.opacity = '0';
            pagina.classList.remove('current-page');
        });

        var proximaPagina = document.querySelector(`.modal.page.page${paginaNumero}`);
        if (proximaPagina) {
            proximaPagina.style.display = 'flex';
            setTimeout(() => {
                proximaPagina.style.opacity = '1';
                proximaPagina.classList.add('current-page');
            }, 10);
        }
    }

    function reiniciarQuiz() {
        qtd_perguntas_respondidas = 0;
        acertos = 0;
        pontuacao = 0;
        erros = 0;
        dificuldade = 1;
        sessionStorage.removeItem('estadoQuiz');
        mostrarProximaPagina(1);
        var alternativas = document.querySelectorAll('.alternativa');
        alternativas.forEach(alternativa => {
            alternativa.classList.remove('certa', 'errada');
        });
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        recuperarEstado();
    });


/*


//  QUIZ DRAGON BALL - VERSÃO SIMPLIFICADA (10 PERGUNTAS)
//  - sem níveis
//  - usa APENAS o gabarito da dificuldade fácil
//  - código mais limpo, leve e fácil de editar
//  - 100% compatível com seu HTML atual
// ----------------------------------------------

// GABARITO DO QUIZ FÁCIL (10 perguntas)
// Cada número representa a alternativa correta (1 a 4)
var gabarito = [1, 1, 4, 2, 2, 3, 4, 3, 1, 1];

// Variáveis de controle
var paginaAtual = 1;      // Qual página/pergunta está sendo exibida
var acertos = 0;          // Quantidade de respostas corretas
var podeResponder = true; // Bloqueia múltiplos cliques


// ----------------------------------------------
//  MOSTRAR O QUIZ (abre a página 1)
// ----------------------------------------------
function iniciarQuiz() {
    paginaAtual = 1;
    acertos = 0;
    podeResponder = true;

    document.getElementById("quizModal").showModal();
    mostrarPagina(paginaAtual);
}

// ----------------------------------------------
//  MOSTRA UMA PÁGINA ESPECÍFICA DO QUIZ
// ----------------------------------------------
function mostrarPagina(num) {
    let pages = document.querySelectorAll(".page");

    pages.forEach(p => p.style.display = "none");

    let pagina = document.querySelector(".page" + num);
    if (pagina) pagina.style.display = "flex";
}

// ----------------------------------------------
//  VERIFICA A RESPOSTA DA PERGUNTA ATUAL
// ----------------------------------------------
function verificarResposta(respostaUsuario, elementoHTML) {

    if (!podeResponder) return; 
    podeResponder = false;

    let respostaCorreta = gabarito[paginaAtual - 1];

    // SE ACERTOU
    if (respostaUsuario === respostaCorreta) {
        acertos++;
        elementoHTML.style.background = "#54e646"; // verde
    } else {
        elementoHTML.style.background = "#ff5c5c"; // vermelho
    }

    // Espera 800ms antes de ir para a próxima pergunta
    setTimeout(() => {
        elementoHTML.style.background = ""; // limpa

        paginaAtual++;

        // Se já respondeu as 10 perguntas → mostra tela final
        if (paginaAtual > 10) {
            mostrarResultado();
            return;
        }

        podeResponder = true;
        mostrarPagina(paginaAtual);

    }, 800);
}

// ----------------------------------------------
//  MOSTRA A TELA FINAL (Resultados)
// ----------------------------------------------
function mostrarResultado() {
    // Calcula pontuação
    let pontos = acertos; // você pode mudar depois se quiser multiplicadores

    // Preenche os textos do HTML
    document.getElementById("acertos_text").innerText = acertos;
    document.getElementById("pontos_text").innerText = pontos;

    mostrarPagina(13); // página final do seu HTML
}

// ----------------------------------------------
//  REINICIAR QUIZ
// ----------------------------------------------
function reiniciarQuiz() {
    iniciarQuiz();
}

// ----------------------------------------------
//  FECHAR MODAL DO QUIZ
// ----------------------------------------------
function FecharModal() {
    document.getElementById("quizModal").close();
}

*/