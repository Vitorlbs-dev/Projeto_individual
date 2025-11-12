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
    pergunta text,
    opcaoA varchar(10),
    opcaoB varchar(10),
    opcaoC varchar(10),
    opcaoD varchar(10),
    resposta varchar(1)
    );
    
/*
OUTRA OPÇÃO:

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
*/

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
