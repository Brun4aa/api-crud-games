CREATE DATABASE colecao_jogos;

USE colecao_jogos;


CREATE TABLE jogos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  data VARCHAR(100),
  imagem VARCHAR(255)
);

