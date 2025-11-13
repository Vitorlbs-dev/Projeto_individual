var pontosRecebidos = 0; 
var vezesRealizadas = 0
var pontos_totais = 0
var lista_pontos_ranking = []
var foto_ranking = []
var idUsuario = sessionStorage.ID_USUARIO
b_usuario.innerHTML = sessionStorage.NOME_USUARIO
var nomeUsuario = sessionStorage.NOME_USUARIO
var emailUsuario = sessionStorage.EMAIL_USUARIO
ipt_nome.value = nomeUsuario
ipt_email.value = emailUsuario




function AbrirConfiguracoes() {
    modal_configuracoes.showModal()
}

function sairConfiguracoes() {
    modal_configuracoes.close()
    trocarFundo.style.display = 'flex'
   trocarSenha.style.display = 'flex'
   background.style.display = 'none'
   senha.style.display = 'none'
}
function destrocar() {
    trocarFundo.style.display = 'flex'
   trocarSenha.style.display = 'flex'
   background.style.display = 'none'
   senha.style.display = 'none'
}

function TrocarBackground() {
   trocarFundo.style.display = 'none'
   trocarSenha.style.display = 'none'
   background.style.display = 'flex'
}
function TrocarSenha() {
    trocarFundo.style.display = 'none'
   trocarSenha.style.display = 'none'
   senha.style.display = 'flex'
}
var stage = sessionStorage.numeroStage
dash.classList.remove(`fotoStage1`)
dash.classList.add(`fotoStage${stage}`)

function verificarStage(numeroStage) {
    dash.classList.remove(`fotoStage${stage}`)
    sessionStorage.removeItem(numeroStage)
    sessionStorage.setItem('numeroStage', numeroStage);
    stage = sessionStorage.numeroStage
    dash.classList.add(`fotoStage${stage}`)
    sairConfiguracoes()
}
  function sairSessao() {
    sessionStorage.clear()
    window.location = "/cadastro.html";
  }


function verificacao() {
    for(var index = 0; index < lista_pontos_ranking.length; index++){

          if (lista_pontos_ranking[index] <= 5) {
              foto_ranking.push(1) 

            } else if(lista_pontos_ranking[index] <= 10) {
            foto_ranking.push(2)

        } else if(lista_pontos_ranking[index] <= 15) {
            foto_ranking.push(3)

        } else if(lista_pontos_ranking[index] <= 20) {
            foto_ranking.push(4)

        } else if(lista_pontos_ranking[index] <= 25) {
            foto_ranking.push(5)

        } else if(lista_pontos_ranking[index] <= 30) {
            foto_ranking.push(6)
 
        } else if (lista_pontos_ranking[index] <= 35) {
            foto_ranking.push(7)
        } else {
            foto_ranking.push(8)
        }
        document.getElementById(`placar_img_usuario${index + 1}`).classList.add(`placar_img_usuario${foto_ranking[index]}`)
    }
}

        function selecionarPersonagem() {
          var personagem = 0
          var nivel = 0
          if (pontos_totais <= 5) {
              personagem = 1
              nivel = `Terráqueo`
            } else if(pontos_totais <= 10) {
            personagem = 2
            nivel = `namekuseijin`
        } else if(pontos_totais <= 15) {
            personagem = 3
            nivel = `Sayajin`
        } else if(pontos_totais <= 20) {
            personagem = 4
            nivel = `Lendário SSJ`
        } else if(pontos_totais <= 25) {
            personagem = 5
            nivel = `Kaioshin`
        } else if(pontos_totais <= 30) {
            personagem = 6
            nivel = `Semi-Deus`
        } else if (pontos_totais <= 35) {
            personagem = 7
            nivel = `Hakaishin`
        } else {
            personagem = 8
            nivel = `Anjo`
        }
        nivel_numero.innerHTML = personagem
        nivel_texto.innerHTML = nivel
        MostrarPersonagem(personagem)
        }
        function MostrarPersonagem(personagemid) {
        document.getElementById("img_usuario").classList.add(`img-usuario${personagemid}`)
      }
      
    var onload = sessionStorage.getItem('contagemCarregar');
    window.onload = function() {
    PontosGerais();
    obterPontos();
    obterPontosPorNivel();
    selecionarPersonagem();
    plotarGrafico();
    atualizarPagFinal();

    
    
};