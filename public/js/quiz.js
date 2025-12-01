    const listaDeQuestoes = [
  {
    pergunta: "Quais foram os primeiros Androids a aparecer na saga dos Androids?",
    alternativaA: "17 e 19",
    alternativaB: "19 e 20",
    alternativaC: "17 e 18",
    alternativaD: "10 e 11",
    alternativaCorreta: "alternativaB"
  },
  {
    pergunta: "Qual é o nome verdadeiro de goku?",
    alternativaA: "Kakaroto",
    alternativaB: "Son goku",
    alternativaC: "Son gohan",
    alternativaD: "Broly",
    alternativaCorreta: "alternativaA"
  },
  {
    pergunta: "Em dragon ball super, quem é o vilão da saga do futuro?",
    alternativaA: "Bills",
    alternativaB: "Majin Vegeta",
    alternativaC: "Cell",
    alternativaD: "Zamasu",
    alternativaCorreta: "alternativaD"
  },
  {
    pergunta: "Quem é o ser mais poderoso do Universo 7?",
    alternativaA: "Whis",
    alternativaB: "Bills",
    alternativaC: "Goku",
    alternativaD: "Freeza",
    alternativaCorreta: "alternativaA"
  },
  {
    pergunta: "Qual é o nome do planeta de origem dos Saiyajins?",
    alternativaA: "Planeta Vegeta",
    alternativaB: "Planeta Namek",
    alternativaC: "Planeta Terra",
    alternativaD: "Planeta Yardrat",
    alternativaCorreta: "alternativaA"
  },
  {
    pergunta: "Qual desses personagens não possui células Z?",
    alternativaA: "Turles",
    alternativaB: "Bardock",
    alternativaC: "Cell",
    alternativaD: "Jeice",
    alternativaCorreta: "alternativaA"
  },
  {
    pergunta: "Quem foi o vencedor do torneio do poder?",
    alternativaA: "Goku",
    alternativaB: "Android 17",
    alternativaC: "Jiren",
    alternativaD: "Freeza",
    alternativaCorreta: "alternativaB"
  },
  {
    pergunta: "Quem ensinou a técnica de teletransporte para Goku?",
    alternativaA: "Mestre Kame",
    alternativaB: "Kami-Sama",
    alternativaC: "Yardrats",
    alternativaD: "Rei Yemma",
    alternativaCorreta: "alternativaC"
  },
  {
    pergunta: "Quem mata o Androide n° 20 no presente?",
    alternativaA: "Cell",
    alternativaB: "Vegeta",
    alternativaC: "Piccolo",
    alternativaD: "Android 17",
    alternativaCorreta: "alternativaB"
  },
  {
    pergunta: "Majin boo foi criado por qual mago?",
    alternativaA: "Zarama",
    alternativaB: "Babidi",
    alternativaC: "Dabura",
    alternativaD: "Bibidi",
    alternativaCorreta: "alternativaD"
  }
]

    // variáveis globais    
    var numeroDaQuestaoAtual = 0
    var pontuacaoFinal = 0
    var tentativaIncorreta = 0
    var certas = 0
    var erradas = 0
    var quantidadeDeQuestoes = listaDeQuestoes.length
    // let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

    function onloadEsconder() {
        document.getElementById('pontuacao').style.display = "none"
        document.getElementById('jogo').style.display = "none"
    }

    function iniciarQuiz() {
        document.getElementById('pontuacao').style.display = "flex"
        document.getElementById('jogo').style.display = "flex"
        document.getElementById('btnIniciarQuiz').style.display = "none"

        document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

        preencherHTMLcomQuestaoAtual(0)

        btnSubmeter.disabled = false
        btnProx.disabled = true
        // btnConcluir.disabled = true
        btnTentarNovamente.disabled = true
       
    }

    function preencherHTMLcomQuestaoAtual(index) {
        habilitarAlternativas(true)
        const questaoAtual = listaDeQuestoes[index]
        numeroDaQuestaoAtual = index
        console.log("questaoAtual")
        console.log(questaoAtual)
        document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
        document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
        document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
        document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
        document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
        document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
    }

    function submeter() {
        const options = document.getElementsByName("option"); // recupera alternativas no html

        let hasChecked = false
        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                hasChecked = true
                break
            }
        }

        if (!hasChecked) {
            alert("Não há alternativas escolhidas. Escolha uma opção.")
        } else {
            btnSubmeter.disabled = true
            btnProx.disabled = false

            habilitarAlternativas(false)

            checarResposta()
        }
    }

    function habilitarAlternativas(trueOrFalse) {
        let opcaoEscolhida = trueOrFalse ? false : true

        primeiraOpcao.disabled = opcaoEscolhida
        segundaOpcao.disabled = opcaoEscolhida
        terceiraOpcao.disabled = opcaoEscolhida
        quartaOpcao.disabled = opcaoEscolhida

    }

    function avancar() {
        btnProx.disabled = true
        btnSubmeter.disabled = false

        desmarcarRadioButtons()

        if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
            preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
        } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
            alert("Atenção... a próxima é a ultima questão!")
            preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
        } else {
            finalizarJogo()
        }
        limparCoresBackgroundOpcoes()
    }

    function tentarNovamente() {
        // atualiza a página
        window.location.reload()
    }

    function checarResposta() {
        const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 
        const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

        const options = document.getElementsByName("option"); // recupera alternativas no html

        let alternativaCorreta = null // variável para armazenar a alternativa correta

        options.forEach((option) => {
            if (option.value === respostaQuestaoAtual) {
                console.log("alternativaCorreta está no componente: " + alternativaCorreta)
                alternativaCorreta = option.labels[0].id
            }
        })

        // verifica se resposta assinalada é correta
        options.forEach((option) => {
            if (option.checked === true && option.value === respostaQuestaoAtual) {
                document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
                pontuacaoFinal++
                certas++
                document.getElementById("spanCertas").innerHTML = certas
                numeroDaQuestaoAtual++
            } else if (option.checked && option.value !== respostaQuestaoAtual) {
                const wrongLabelId = option.labels[0].id

                document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
                document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
                tentativaIncorreta++
                erradas++
                document.getElementById("spanErradas").innerHTML = erradas
                numeroDaQuestaoAtual++
            }
        })
    }

    function limparCoresBackgroundOpcoes() {
        const options = document.getElementsByName("option");
        options.forEach((option) => {
            document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
            document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
        })
    }

    function desmarcarRadioButtons() {
        const options = document.getElementsByName("option");
        for (let i = 0; i < options.length; i++) {
            options[i].checked = false;
        }
    }

    function finalizarJogo() {
        let textoParaMensagemFinal = null
        let classComCoresParaMensagemFinal = null
        const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes

        if (porcentagemFinalDeAcertos <= 0.3) {
            textoParaMensagemFinal = "Parece que você não estudou..."
            classComCoresParaMensagemFinal = "text-danger-with-bg"
        }
        else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
            textoParaMensagemFinal = "Pode melhorar na próxima, hein!"
            classComCoresParaMensagemFinal = "text-warning-with-bg"
        }
        else if (porcentagemFinalDeAcertos >= 0.9) {
            textoParaMensagemFinal = "Uau, parabéns!"
            classComCoresParaMensagemFinal = "text-success-with-bg"
        }

        textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos)*100) + "% das questões."


        document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
        document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal) 
        document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal
        document.getElementById('jogo').classList.add("text-new-gray") 

        btnProx.disabled = true
        btnSubmeter.disabled = true
        // btnConcluir.disabled = true
        btnTentarNovamente.disabled = false
    
        buscarCertas()
        sessionStorage.CERTAS = certas
        enviarPontuacaoParaBanco();
        window.location = "../dashboard.html";
       
    }

    // FETCH DE INSERT DO QUIZ NO BANCO

    function enviarPontuacaoParaBanco(){
        
        const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`http://localhost:3333/pontuacoes/insert/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            acertos: certas,
            erros: erradas,
            pontos: pontuacaoFinal
          
        })
    })
    .then(res => {
        if (res.ok) {
            console.log("Pontuações enviadas com sucesso!");
        } else {
            console.error("Erro ao enviar pontuações.");
        }
    })
    .catch(err => {
        console.error("Erro na requisição:", error);
    });
}

function buscarCertas() {
    acertosGrafico = certas
    console.log(`ACHEIII ${certas}`)
}
