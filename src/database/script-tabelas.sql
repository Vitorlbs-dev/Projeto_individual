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
    descricao text
    
    );
    

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

INSERT INTO usuario (nome, email, senha) VALUES 
('Edvaldo', 'edvaldo@outlook.com', 'Vitor@123'),
('Hercules', 'hercules@outlook.com', 'Vitor@123'),
('Weverton', 'weverton@outlook.com', 'Vitor@123'),
('Ana', 'ana@outlook.com', 'Vitor@123'),
('Luiza', 'luiza@outlook.com', 'Vitor@123');
	
INSERT INTO pontuacoes (fkUsuario, pontos_recebidos, acertos, erros) VALUES 
(1, 10, 9, 1),
(2, 8, 11, 9),
(3,  6, 6, 4),
(4,  6, 6, 4),
(5,  6, 6, 4);

select * from pontuacoes;
select * from usuario;