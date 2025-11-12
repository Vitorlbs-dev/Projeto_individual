-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE dragonball;

USE dragonball;

CREATE TABLE usuario (
    idUsuario int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50),
    email varchar(50) unique,
    senha varchar(50)
);

CREATE TABLE quiz (
    idQuiz int PRIMARY KEY AUTO_INCREMENT,
    pergunta text,
    opcaoA varchar(10),
    opcaoB varchar(10),
    opcaoC varchar(10),
    opcaoD varchar(10),
    resposta varchar(1)
    );

CREATE TABLE respostaQuiz (
    id INT,
    fkUsuario INT NOT NULL,
    fkPergunta INT NOT NULL,
    respostaEscolhida VARCHAR(1),
    respostaCorreta boolean,
    constraint pkComposta primary key(id,fkUsuario,fkPergunta),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkPergunta) REFERENCES quiz(idQuiz)
);

/*-- Inserindo dados na tabela usuario
INSERT INTO usuario (nome, email, senha) VALUES 
('matheus', 'matheus@outlook.com', '123456'),
('antônio', 'antonio@outlook.com', '123456'),
('Renato', 'renato@outlook.com', '123456'),
('Araújo', 'Araújo@outlook.com', '123456'),
('Felps', 'Felps@outlook.com', '123456');

select * from usuario;
-- Inserindo dados na tabela quiz
INSERT INTO quiz (dificuldade) VALUES
('facil'),
('media'),
('dificil'),
('media'),
('facil');

-- Inserindo dados na tabela pontuacoes
INSERT INTO pontuacoes (fkUsuario, fkQuiz, pontos_recebidos, acertos, erros) VALUES 
(1, 3, 27, 9, 1),
(2, 2, 22, 11, 9),
(3, 1, 6, 6, 4),
(4, 3, 42, 14, 6),
(5, 2, 34, 17, 3);
*/