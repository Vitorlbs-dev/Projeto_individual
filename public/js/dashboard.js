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




  function sairSessao() {
    sessionStorage.clear()
    window.location = "/index.html";
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