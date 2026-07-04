CREATE DATABASE IF NOT EXISTS biblioteca_retro
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE biblioteca_retro;

DROP TABLE IF EXISTS jogos;

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    plataforma VARCHAR(100) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    ano_lancamento INT NOT NULL,
    desenvolvedora VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL
);

INSERT INTO jogos (titulo, plataforma, genero, ano_lancamento, desenvolvedora, descricao) VALUES
('Super Mario World', 'Super Nintendo', 'Plataforma', 1990, 'Nintendo', 'Mario e Luigi exploram Dinosaur Land para resgatar a Princesa Peach e enfrentar Bowser.'),
('Sonic The Hedgehog', 'Mega Drive', 'Plataforma', 1991, 'Sega', 'Sonic usa sua velocidade para impedir os planos do Dr. Robotnik e libertar animais capturados.'),
('Donkey Kong Country', 'Super Nintendo', 'Plataforma', 1994, 'Rare', 'Donkey Kong e Diddy Kong atravessam fases cheias de desafios para recuperar seu estoque de bananas.'),
('Metal Slug', 'Neo Geo', 'Run and Gun', 1996, 'Nazca Corporation', 'Soldados enfrentam exércitos inimigos em fases de ação intensa com veículos e armas especiais.'),
('Street Fighter II', 'Arcade', 'Luta', 1991, 'Capcom', 'Clássico jogo de luta competitivo com personagens marcantes e golpes especiais.'),
('The Legend of Zelda: A Link to the Past', 'Super Nintendo', 'Aventura', 1991, 'Nintendo', 'Link viaja entre mundos para salvar Hyrule e derrotar o mal que ameaça o reino.'),
('Pac-Man', 'Arcade', 'Labirinto', 1980, 'Namco', 'Pac-Man percorre labirintos coletando pontos enquanto foge de fantasmas coloridos.'),
('Mega Man X', 'Super Nintendo', 'Ação e Plataforma', 1993, 'Capcom', 'X enfrenta Mavericks em fases futuristas com upgrades, chefes e tiros carregados.'),
('Castlevania: Symphony of the Night', 'PlayStation', 'Ação e Aventura', 1997, 'Konami', 'Alucard explora o castelo de Drácula em um jogo com progressão e exploração não linear.'),
('Chrono Trigger', 'Super Nintendo', 'RPG', 1995, 'Square', 'Grupo de heróis viaja pelo tempo para impedir uma catástrofe que ameaça o futuro.'),
('Super Mario 64', 'Nintendo 64', 'Plataforma', 1996, 'Nintendo', 'Mario explora mundos em 3D dentro do castelo da Princesa Peach para recuperar as Power Stars.'),
('Final Fantasy VII', 'PlayStation', 'RPG', 1997, 'Square', 'Cloud Strife e seus aliados enfrentam a Shinra e Sephiroth em uma aventura marcante do RPG japonês.'),
('Devil May Cry', 'PlayStation 2', 'Ação e Aventura', 2001, 'Capcom', 'Dante enfrenta criaturas demoníacas com espadas, armas de fogo e combate estiloso.'),
('Pokémon Silver', 'Game Boy Color', 'RPG', 1999, 'Game Freak', 'Treinadores exploram Johto, capturam Pokémon e desafiam líderes de ginásio em uma jornada clássica.'),
('The Legend of Zelda', 'Nintendo Entertainment System', 'Aventura', 1986, 'Nintendo', 'Link explora Hyrule, encontra itens especiais e enfrenta Ganon para salvar a Princesa Zelda.'),
('Metroid', 'Nintendo Entertainment System', 'Ação e Aventura', 1986, 'Nintendo', 'Samus Aran explora Zebes em uma aventura de ação com progressão baseada em habilidades.'),
('Contra', 'Nintendo Entertainment System', 'Run and Gun', 1987, 'Konami', 'Soldados avançam por fases intensas enfrentando tropas inimigas e ameaças alienígenas.'),
('Tetris', 'Game Boy', 'Puzzle', 1989, 'Nintendo', 'Peças geométricas caem em ritmo constante, desafiando o jogador a formar linhas completas.'),
('Pokémon Red', 'Game Boy', 'RPG', 1996, 'Game Freak', 'O jogador viaja por Kanto para capturar Pokémon, vencer ginásios e completar a Pokédex.'),
('Mortal Kombat', 'Arcade', 'Luta', 1992, 'Midway', 'Lutadores participam de um torneio brutal com golpes especiais e finalizações famosas.'),
('Galaga', 'Arcade', 'Ação', 1981, 'Namco', 'Naves inimigas atacam em formações enquanto o jogador defende a tela com tiros precisos.'),
('Space Invaders', 'Atari 2600', 'Ação', 1980, 'Taito', 'O jogador controla uma base móvel para impedir a invasão de fileiras de alienígenas.'),
('Pitfall!', 'Atari 2600', 'Aventura', 1982, 'Activision', 'Pitfall Harry atravessa selvas, buracos e perigos em busca de tesouros escondidos.'),
('Golden Axe', 'Mega Drive', 'Beat em up', 1989, 'Sega', 'Heróis de fantasia enfrentam hordas inimigas para derrotar Death Adder.'),
('Streets of Rage 2', 'Mega Drive', 'Beat em up', 1992, 'Sega', 'Lutadores percorrem ruas perigosas em combates cooperativos contra gangues urbanas.'),
('Phantasy Star IV', 'Mega Drive', 'RPG', 1993, 'Sega', 'Um RPG de ficção científica com batalhas por turno, personagens marcantes e narrativa épica.'),
('Samurai Shodown', 'Neo Geo', 'Luta', 1993, 'SNK', 'Duelistas armados disputam combates estratégicos em um clássico jogo de luta da SNK.'),
('The King of Fighters 98', 'Neo Geo', 'Luta', 1998, 'SNK', 'Equipes de lutadores se enfrentam em um dos capítulos mais celebrados da série KOF.'),
('Resident Evil', 'PlayStation', 'Ação e Aventura', 1996, 'Capcom', 'Agentes investigam uma mansão repleta de criaturas, enigmas e elementos de terror de sobrevivência.'),
('Tekken 3', 'PlayStation', 'Luta', 1997, 'Namco', 'Lutadores competem em batalhas 3D com movimentos rápidos e elenco memorável.'),
('Gran Turismo', 'PlayStation', 'Corrida', 1997, 'Polyphony Digital', 'Simulador de corrida com licenças, carros reais e progressão por campeonatos.'),
('God of War', 'PlayStation 2', 'Ação e Aventura', 2005, 'Santa Monica Studio', 'Kratos enfrenta criaturas da mitologia grega em uma jornada de vingança e combate intenso.'),
('Shadow of the Colossus', 'PlayStation 2', 'Aventura', 2005, 'Team Ico', 'Wander percorre terras proibidas para derrotar colossos em batalhas grandiosas e melancólicas.');
