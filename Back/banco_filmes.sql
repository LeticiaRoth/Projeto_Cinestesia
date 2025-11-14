-- database: :memory:
CREATE DATABASE banco_filmes;
USE banco_filmes;

-- Criação Tabela Genero
CREATE TABLE genero(
	id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (255)
);

-- Criação Tabela Diretor
CREATE TABLE diretor(
	id_diretor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (255)
);

-- Criação Tabela Ator
CREATE TABLE ator(
	id_ator INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (255)
);

-- Criação Tabela Produtora
CREATE TABLE produtora(
	id_produtora INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (255)
);

-- 	Criação Tabela Usuario
CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (255),
    email VARCHAR (255) NOT NULL,
    senha VARCHAR (255) NOT NULL,
    tipo_usuario ENUM ('Comum','Administrador')
);

-- Criação Tabela Filme
CREATE TABLE filme(
	id_filme INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    ano YEAR,
    sinopse TEXT,
    poster VARCHAR (255),
    status_aprovacao ENUM ('Aprovado', 'Pendente_Adicao', 'Pendente_Edicao')
    NOT NULL
    DEFAULT 'Pendente_Adicao',
    id_produtora INT,
    FOREIGN KEY (id_produtora) REFERENCES produtora (id_produtora),
	id_usuario INT,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Criação da tabela Intermediaria Filme_Ator
CREATE TABLE filme_ator(
	id_filme INT,
    FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
    id_ator INT,
    FOREIGN KEY (id_ator) REFERENCES ator(id_ator),
    -- Chave primaria composta
    PRIMARY KEY (id_filme, id_ator)
);

-- Criação da tabela Intermediaria Filme_Genero
CREATE TABLE filme_genero(
	id_filme INT,
    FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
    id_genero INT,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero),
    -- Chave primaria composta
    PRIMARY KEY (id_filme, id_genero)
);

-- Criação da tabela Intermediaria Filme_Diretor
CREATE TABLE filme_diretor(
	id_filme INT,
    FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
    id_diretor INT,
    FOREIGN KEY(id_diretor) REFERENCES diretor(id_diretor),
    -- Criação primaria composta
    PRIMARY KEY (id_filme, id_diretor)
);

-- Populando Tabela: genero 
INSERT INTO genero (nome) VALUES
('Ação'), ('Comédia'), ('Drama'), ('Ficção Científica'), ('Terror'),
('Romance'), ('Documentário'), ('Animação'), ('Suspense'), ('Fantasia');

-- Populando Tabela: diretor 
INSERT INTO diretor (nome) VALUES
('Christopher Nolan'), ('Quentin Tarantino'), ('Francis Ford Coppola'), ('Robert Zemeckis'), ('Lana Wachowski'),
('Lilly Wachowski'), ('Fernando Meirelles'), ('Kátia Lund'), ('Hayao Miyazaki'), ('Bong Joon-ho'),
('Ridley Scott'), ('Stanley Kubrick'), ('Greg Mottola'), ('James Cameron'), ('John Lasseter'),
('Peter Jackson'), ('Jordan Peele'), ('Jean-Pierre Jeunet'), ('David Attenborough'), ('Damien Chazelle');

-- Populando Tabela: ator 
INSERT INTO ator (nome) VALUES
('Christian Bale'), ('Heath Ledger'), ('John Travolta'), ('Samuel L. Jackson'), ('Marlon Brando'),
('Al Pacino'), ('Tom Hanks'), ('Robin Wright'), ('Leonardo DiCaprio'), ('Joseph Gordon-Levitt'),
('Keanu Reeves'), ('Laurence Fishburne'), ('Alexandre Rodrigues'), ('Leandro Firmino'), ('Song Kang-ho'),
('Russell Crowe'), ('Joaquin Phoenix'), ('Jack Nicholson'), ('Kate Winslet'), ('Elijah Wood');

-- Populando Tabela: produtora
INSERT INTO produtora (nome) VALUES
('Warner Bros.'), ('Miramax'), ('Paramount Pictures'), ('O2 Filmes'), ('Studio Ghibli'),
('CJ Entertainment'), ('Universal Pictures'), ('Columbia Pictures'), ('20th Century Fox'), ('Pixar'),
('New Line Cinema'), ('UGC'), ('BBC'), ('Lionsgate'), ('Legendary Pictures'),
('DreamWorks'), ('A24'), ('Focus Features'), ('Marvel Studios'), ('Lucasfilm');

-- Populando Tabela: usuario 
INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES
('Laylla Eduarda', 'laysllaeduarda@email.com', 'senha123', 'Administrador'),
('Leticia Roth', 'leticiaroth1@email.com', 'amora', 'Comum'),
('Clara Nunes', 'clara@email.com', 'senha123', 'Comum'),
('Davi Luiz', 'davi@email.com', 'senha123', 'Comum'),
('Eva Mendes', 'eva@email.com', 'senha123', 'Comum'),
('Felipe Neto', 'felipe@email.com', 'senha123', 'Comum'),
('Gabriela Pires', 'gabi@email.com', 'senha123', 'Comum'),
('Heitor Martins', 'heitor@email.com', 'senha123', 'Comum'),
('Inês Brasil', 'ines@email.com', 'senha123', 'Comum'),
('Jonas Silva', 'jonas@email.com', 'senha123', 'Comum'),
('Karla Souza', 'karla@email.com', 'senha123', 'Administrador'),
('Léo Batista', 'leo@email.com', 'senha123', 'Comum'),
('Maria Clara', 'maria@email.com', 'senha123', 'Comum'),
('Nuno Leal', 'nuno@email.com', 'senha123', 'Comum'),
('Otávio Jr', 'otavio@email.com', 'senha123', 'Comum'),
('Pedro Pascal', 'pedro@email.com', 'senha123', 'Administrador'),
('Quintino Rocha', 'quino@email.com', 'senha123', 'Comum'),
('Raissa Oliveira', 'raissa@email.com', 'senha123', 'Comum'),
('Silvio Santos', 'silvio@email.com', 'senha123', 'Administrador'),
('Tomás Alves', 'tomas@email.com', 'senha123', 'Comum');


-- Populando Tabela Principal: filme 
INSERT INTO filme (titulo, ano, sinopse, poster, status_aprovacao, id_produtora) VALUES
('O Cavaleiro das Trevas', 2008, 'Batman enfrenta o Coringa.', 'https://upload.wikimedia.org/wikipedia/pt/d/d1/The_Dark_Knight.jpg', 'Aprovado', 1),
('Pulp Fiction', 1994, 'Histórias entrelaçadas de crime em Los Angeles.', 'https://pt.wikipedia.org/wiki/Ficheiro:Pulp_Fiction_cover.jpg', 'Aprovado', 2),
('O Poderoso Chefão', 1972, 'A transição de poder em uma família da máfia.', 'https://m.media-amazon.com/images/M/MV5BYTRmMjkwYzYtYTRiMi00NDJjLTk1NjctMDA3MjY2ZWIyMGQ5XkEyXkFqcGc@._V1_.jpg', 'Aprovado', 3),
('Forrest Gump', 1994, 'A história dos EUA através dos olhos de um homem simples.', 'https://upload.wikimedia.org/wikipedia/pt/c/c0/ForrestGumpPoster.jpg', 'Aprovado', 3),
('A Origem', 2010, 'Ladrões que entram nos sonhos das pessoas.', 'https://upload.wikimedia.org/wikipedia/pt/8/84/AOrigemPoster.jpg', 'Aprovado', 1),
('Matrix', 1999, 'Um hacker descobre a verdade sobre sua realidade.', 'https://upload.wikimedia.org/wikipedia/pt/c/c1/The_Matrix_Poster.jpg', 'Aprovado', 1),
('Cidade de Deus', 2002, 'O crescimento do crime organizado no Rio de Janeiro.', 'https://pt.wikipedia.org/wiki/Ficheiro:CidadedeDeus.jpg', 'Aprovado', 4),
('A Viagem de Chihiro', 2001, 'Uma garota se perde em um mundo de espíritos.', 'https://pt.wikipedia.org/wiki/Ficheiro:A_Viagem_de_Chihiro.JPG', 'Aprovado', 5),
('Parasita', 2019, 'Uma família pobre se infiltra na vida de uma família rica.', 'https://www.ultimato.com.br/image/atualiza_home/principal/ultimas/opiniao/2020/02_fevereiro/opi_13_2_20_caldas_parasita.jpg', 'Aprovado', 6),
('Gladiador', 2000, 'Um general romano busca vingança.', 'https://upload.wikimedia.org/wikipedia/pt/4/44/GladiadorPoster.jpg', 'Aprovado', 7),
('O Iluminado', 1980, 'Um escritor enlouquece em um hotel isolado.', 'https://br.web.img3.acsta.net/c_310_420/pictures/14/10/10/19/21/152595.jpg', 'Aprovado', 1),
('Superbad', 2007, 'Dois amigos tentam ir a uma festa de formatura.', 'https://upload.wikimedia.org/wikipedia/pt/8/8b/Superbad_Poster.png', 'Aprovado', 8),
('Titanic', 1997, 'Um romance a bordo do navio inafundável.', 'https://cartolaeditora.com.br/wp-content/uploads/2022/11/capa-titanic.jpg', 'Aprovado', 9),
('Toy Story', 1995, 'Brinquedos ganham vida quando seu dono não está por perto.', 'https://upload.wikimedia.org/wikipedia/pt/a/a7/Toy_Story_1995.jpg', 'Aprovado', 10),
('O Senhor dos Anéis: O Retorno do Rei', 2003, 'A batalha final pela Terra-média.', 'https://upload.wikimedia.org/wikipedia/pt/0/0d/EsdlaIII.jpg', 'Aprovado', 11),
('De Volta para o Futuro', 1985, 'Um adolescente viaja no tempo.', 'https://upload.wikimedia.org/wikipedia/pt/9/97/BackFuturePoster.jpg', 'Aprovado', 7),
('Corra!', 2017, 'Um jovem negro visita a família de sua namorada branca.', 'https://br.web.img3.acsta.net/c_310_420/pictures/17/04/19/21/08/577190.jpg', 'Pendente_Adicao', 7),
('O Fabuloso Destino de Amélie Poulain', 2001, 'Uma garçonete em Paris muda a vida das pessoas.', 'https://upload.wikimedia.org/wikipedia/pt/a/a0/Le_fabuleux_destin_d%27Am%C3%A9lie_Poulain.jpg', 'Aprovado', 12),
('Planeta Terra II', 2016, 'Documentário sobre a vida selvagem.', 'https://m.media-amazon.com/images/I/81OGFsLWWhL._AC_UF894,1000_QL80_.jpg', 'Aprovado', 13),
('La La Land', 2016, 'Um músico e uma atriz tentam a sorte em Los Angeles.', 'https://upload.wikimedia.org/wikipedia/pt/c/c0/La_La_Land_%28filme%29.png', 'Pendente_Edicao', 14);


-- Populando Tabela: filme_genero 
INSERT INTO filme_genero (id_filme, id_genero) VALUES
(1, 1), (1, 3), (1, 9), 
(2, 3), (2, 9),         
(3, 3),                  
(4, 3), (4, 6),          
(5, 1), (5, 4), (5, 9),  
(6, 1), (6, 4),          
(7, 3),                  
(8, 8), (8, 10),        
(9, 3), (9, 9),         
(10, 1), (10, 3),        
(11, 3), (11, 5),       
(12, 2),                 
(13, 3), (13, 6),        
(14, 2), (14, 8), (14, 10), 
(15, 1), (15, 10),       
(16, 2), (16, 4),        
(17, 5), (17, 9),        
(18, 2), (18, 6),      
(19, 7),                 
(20, 3), (20, 6);        

-- Populando Tabela: filme_diretor 
INSERT INTO filme_diretor (id_filme, id_diretor) VALUES
(1, 1),   
(2, 2),   
(3, 3),  
(4, 4),  
(5, 1),  
(6, 5), (6, 6), 
(7, 7), (7, 8), 
(8, 9),   
(9, 10),  
(10, 11),
(11, 12), 
(12, 13), 
(13, 14), 
(14, 15),
(15, 16), 
(16, 4), 
(17, 17), 
(18, 18), 
(19, 19), 
(20, 20);

-- Populando Tabela: filme_ator 
INSERT INTO filme_ator (id_filme, id_ator) VALUES
(1, 1), (1, 2),  
(2, 3), (2, 4),   
(3, 5), (3, 6),   
(4, 7), (4, 8),   
(5, 9), (5, 10),  
(6, 11), (6, 12), 
(7, 13), (7, 14), 
(9, 15),         
(10, 16), (10, 17),
(11, 18),        
(13, 9), (13, 19),
(14, 7),        
(15, 20);        

-- Selects
SELECT * FROM genero;
SELECT * FROM diretor;
SELECT * FROM ator;
SELECT * FROM produtora;
SELECT * FROM usuario;
SELECT * FROM filme;
SELECT * FROM filme_genero;
SELECT * FROM filme_diretor;
SELECT * FROM filme_ator;


-- DROP DATABASE banco_filmes;

