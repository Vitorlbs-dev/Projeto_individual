CREATE DATABASE dragonball;

USE dragonball;

CREATE TABLE usuario (
    idUsuario int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50),
    email varchar(50) unique,
    senha varchar(50)
);
select * from usuario;

/*
OUTRA VERSÃO:

CREATE TABLE quiz (
    idQuiz int PRIMARY KEY AUTO_INCREMENT,
    dificuldade varchar(10)
);
*/

CREATE TABLE quiz (
    idQuiz int PRIMARY KEY AUTO_INCREMENT,
    descricao text
    
    );
    

-- OUTRA OPÇÃO:

CREATE TABLE pontuacoes (
    idPontuacao int PRIMARY KEY AUTO_INCREMENT,
    fkUsuario int,
    fkQuiz int,
    pontos_recebidos int,
    acertos int,
    erros int,
    data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz)
);
select * from pontuacoes;
select * from usuario;
-- drop table quiz;


SELECT 
    u.*,
    SUM(p.acertos) AS qtd_acertos,
    SUM(p.erros) AS qtd_erros,
    SUM(p.pontos_recebidos) AS total_pontos,
    COUNT(*) AS quantidade
FROM usuario u
JOIN (
    SELECT *
    FROM pontuacoes
    WHERE fkUsuario = 7
    ORDER BY idPontuacao DESC
    LIMIT 7
) p ON p.fkUsuario = u.idUsuario
WHERE u.idUsuario = 7
GROUP BY u.idUsuario;
SELECT COUNT(*) FROM pontuacoes WHERE fkUsuario = 7;

truncate pontuacoes;

INSERT INTO usuario (nome, email, senha) VALUES 
('Edvaldo', 'edvaldo@outlook.com', 'Vitor@123'),
('Hercules', 'hercules@outlook.com', 'Vitor@123'),
('Weverton', 'weverton@outlook.com', 'Vitor@123'),
('Ana', 'ana@outlook.com', 'Vitor@123'),
('Luiza', 'luiza@outlook.com', 'Vitor@123');
	
INSERT INTO pontuacoes (fkUsuario, pontos_recebidos, acertos, erros) VALUES 
(9, 10, 9, 1),
(10, 8, 11, 9),
(11,  6, 6, 4),
(8,  6, 6, 4),
(7,  6, 6, 4);
