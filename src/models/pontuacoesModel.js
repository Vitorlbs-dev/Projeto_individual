var database = require("../database/config");

function buscarUltimasPontuacoes(idUsuario, limite_linhas) {

    var instrucaoSql = `SELECT 
    u.*,
    SUM(p.acertos) AS qtd_acertos,
    SUM(p.erros) AS qtd_erros,
    SUM(p.pontos_recebidos) AS total_pontos,
    COUNT(*) AS quantidade
FROM usuario u
JOIN (
    SELECT *
    FROM pontuacoes
    WHERE fkUsuario = ${idUsuario}
    ORDER BY idPontuacao DESC
    LIMIT ${limite_linhas}
) p ON p.fkUsuario = u.idUsuario
WHERE u.idUsuario =  ${idUsuario}
GROUP BY u.idUsuario;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontosPorNivel(idUsuario) {

    var instrucaoSql = `select usuario.idUsuario, sum(pontuacoes.acertos) as acertos_totais, quiz.dificuldade from quiz join pontuacoes on idQuiz = fkQuiz
    join usuario on fkUsuario = idUsuario where idUsuario = ${idUsuario} group by idUsuario, quiz.dificuldade order by quiz.dificuldade;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarPontuacoesEmTempoReal() {

    var instrucaoSql = `select usuario.nome, sum(pontuacoes.pontos_recebidos) as total_pontos from pontuacoes join usuario on idUsuario = fkUsuario 
    group by usuario.nome order by total_pontos desc limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirPontuacoes(idUsuario, pontos, erros, acertos) {
    var instrucaoSql = `
    insert into pontuacoes (fkUsuario, pontos_recebidos, acertos, erros) values
    (${idUsuario}, ${pontos}, ${acertos}, ${erros});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/*function registrarPontuacao(acertos, erros, pontos, idUsuario) {
    var instrucao = `
        INSERT INTO pontuacoes (acertos, erros, pontos_recebidos, fkUsuario)
        VALUES (${acertos}, ${erros}, ${pontos}, ${idUsuario});
    `;
    return database.executar(instrucao);
}*/

module.exports = {
    buscarPontosPorNivel,
    buscarPontuacoesEmTempoReal,
    buscarUltimasPontuacoes,
    inserirPontuacoes

}