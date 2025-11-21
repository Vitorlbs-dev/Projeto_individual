var pontuacoesModel = require("../models/pontuacoesModel");

function buscarPontosPorNivel(req, res) {

    const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando as ultimas ${limite_linhas} pontuacoes`);

    pontuacoesModel.buscarPontosPorNivel(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas pontuacoes.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarUltimasPontuacoes(req, res) {

    const limite_linhas = 7;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando as ultimas ${limite_linhas} pontuacoes`);

    pontuacoesModel.buscarUltimasPontuacoes(idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas pontuacoes.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarPontuacoesEmTempoReal(req, res) {

    var idPontuacoes = req.params.idPontuacoes;

    console.log(`Recuperando pontuacoes em tempo real`);

    pontuacoesModel.buscarPontuacoesEmTempoReal(idPontuacoes).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas pontuacoes.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirPontuacoes(req, res) {
    const {pontos, erros, acertos } = req.body; // Dados da pontuação recebidos no corpo da solicitação
    var idUsuario = req.params.idUsuario;
    // Chamando a função do modelo para inserir a nova pontuação no banco de dados
    pontuacoesModel.inserirPontuacoes(idUsuario, pontos, erros, acertos, (error) => {
        if (error) {
            // Se ocorrer algum erro durante o processo, envia uma resposta de erro com status 500
            console.error("Erro ao criar a pontuação:", error);
            res.status(500).json({ message: "Erro ao criar a pontuação.", error: error.message });
        } else {
            // Se a operação for bem-sucedida, envia uma resposta de sucesso com status 201
            res.status(201).json({ message: "Pontuação criada com sucesso." });
        }
    });
}

/*/function registrarPontuacao(req, res) {
    const = 
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    var pontos = req.body.pontos;
    var idUsuario = req.body.idUsuario;

    pontuacoesModel.registrarPontuacao(acertos, erros, pontos, idUsuario)
 //   .then(resp => res.status(200).json(resp))
 //   .catch(err => res.status(500).json(err));
/}*/


module.exports = {
    buscarPontosPorNivel,
    buscarPontuacoesEmTempoReal,
    buscarUltimasPontuacoes,
    inserirPontuacoes
  
}