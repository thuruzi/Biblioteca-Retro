const BibliotecaRetroApi = (() => {
    const API_BASE = '../backend/routes/api.php';
    const STORAGE_KEY = 'bibliotecaRetroJogos';
    const NEXT_ID_KEY = 'bibliotecaRetroProximoId';
    const STORAGE_VERSION_KEY = 'bibliotecaRetroVersao';
    const STORAGE_VERSION = '4';
    let ultimoModo = 'API';

    const exemplos = [
        { id: 1, titulo: 'Super Mario World', plataforma: 'Super Nintendo', genero: 'Plataforma', ano_lancamento: 1990, desenvolvedora: 'Nintendo', descricao: 'Mario e Luigi exploram Dinosaur Land para resgatar a Princesa Peach e enfrentar Bowser.' },
        { id: 2, titulo: 'Sonic The Hedgehog', plataforma: 'Mega Drive', genero: 'Plataforma', ano_lancamento: 1991, desenvolvedora: 'Sega', descricao: 'Sonic usa sua velocidade para impedir os planos do Dr. Robotnik e libertar animais capturados.' },
        { id: 3, titulo: 'Donkey Kong Country', plataforma: 'Super Nintendo', genero: 'Plataforma', ano_lancamento: 1994, desenvolvedora: 'Rare', descricao: 'Donkey Kong e Diddy Kong atravessam fases cheias de desafios para recuperar seu estoque de bananas.' },
        { id: 4, titulo: 'Metal Slug', plataforma: 'Neo Geo', genero: 'Run and Gun', ano_lancamento: 1996, desenvolvedora: 'Nazca Corporation', descricao: 'Soldados enfrentam exércitos inimigos em fases de ação intensa com veículos e armas especiais.' },
        { id: 5, titulo: 'Street Fighter II', plataforma: 'Arcade', genero: 'Luta', ano_lancamento: 1991, desenvolvedora: 'Capcom', descricao: 'Clássico jogo de luta competitivo com personagens marcantes e golpes especiais.' },
        { id: 6, titulo: 'The Legend of Zelda: A Link to the Past', plataforma: 'Super Nintendo', genero: 'Aventura', ano_lancamento: 1991, desenvolvedora: 'Nintendo', descricao: 'Link viaja entre mundos para salvar Hyrule e derrotar o mal que ameaça o reino.' },
        { id: 7, titulo: 'Pac-Man', plataforma: 'Arcade', genero: 'Labirinto', ano_lancamento: 1980, desenvolvedora: 'Namco', descricao: 'Pac-Man percorre labirintos coletando pontos enquanto foge de fantasmas coloridos.' },
        { id: 8, titulo: 'Mega Man X', plataforma: 'Super Nintendo', genero: 'Ação e Plataforma', ano_lancamento: 1993, desenvolvedora: 'Capcom', descricao: 'X enfrenta Mavericks em fases futuristas com upgrades, chefes e tiros carregados.' },
        { id: 9, titulo: 'Castlevania: Symphony of the Night', plataforma: 'PlayStation', genero: 'Ação e Aventura', ano_lancamento: 1997, desenvolvedora: 'Konami', descricao: 'Alucard explora o castelo de Drácula em um jogo com progressão e exploração não linear.' },
        { id: 10, titulo: 'Chrono Trigger', plataforma: 'Super Nintendo', genero: 'RPG', ano_lancamento: 1995, desenvolvedora: 'Square', descricao: 'Grupo de heróis viaja pelo tempo para impedir uma catástrofe que ameaça o futuro.' },
        { id: 11, titulo: 'Super Mario 64', plataforma: 'Nintendo 64', genero: 'Plataforma', ano_lancamento: 1996, desenvolvedora: 'Nintendo', descricao: 'Mario explora mundos em 3D dentro do castelo da Princesa Peach para recuperar as Power Stars.' },
        { id: 12, titulo: 'Final Fantasy VII', plataforma: 'PlayStation', genero: 'RPG', ano_lancamento: 1997, desenvolvedora: 'Square', descricao: 'Cloud Strife e seus aliados enfrentam a Shinra e Sephiroth em uma aventura marcante do RPG japonês.' },
        { id: 13, titulo: 'Devil May Cry', plataforma: 'PlayStation 2', genero: 'Ação e Aventura', ano_lancamento: 2001, desenvolvedora: 'Capcom', descricao: 'Dante enfrenta criaturas demoníacas com espadas, armas de fogo e combate estiloso.' },
        { id: 14, titulo: 'Pokémon Silver', plataforma: 'Game Boy Color', genero: 'RPG', ano_lancamento: 1999, desenvolvedora: 'Game Freak', descricao: 'Treinadores exploram Johto, capturam Pokémon e desafiam líderes de ginásio em uma jornada clássica.' },
        { id: 15, titulo: 'The Legend of Zelda', plataforma: 'Nintendo Entertainment System', genero: 'Aventura', ano_lancamento: 1986, desenvolvedora: 'Nintendo', descricao: 'Link explora Hyrule, encontra itens especiais e enfrenta Ganon para salvar a Princesa Zelda.' },
        { id: 16, titulo: 'Metroid', plataforma: 'Nintendo Entertainment System', genero: 'Ação e Aventura', ano_lancamento: 1986, desenvolvedora: 'Nintendo', descricao: 'Samus Aran explora Zebes em uma aventura de ação com progressão baseada em habilidades.' },
        { id: 17, titulo: 'Contra', plataforma: 'Nintendo Entertainment System', genero: 'Run and Gun', ano_lancamento: 1987, desenvolvedora: 'Konami', descricao: 'Soldados avançam por fases intensas enfrentando tropas inimigas e ameaças alienígenas.' },
        { id: 18, titulo: 'Tetris', plataforma: 'Game Boy', genero: 'Puzzle', ano_lancamento: 1989, desenvolvedora: 'Nintendo', descricao: 'Peças geométricas caem em ritmo constante, desafiando o jogador a formar linhas completas.' },
        { id: 19, titulo: 'Pokémon Red', plataforma: 'Game Boy', genero: 'RPG', ano_lancamento: 1996, desenvolvedora: 'Game Freak', descricao: 'O jogador viaja por Kanto para capturar Pokémon, vencer ginásios e completar a Pokédex.' },
        { id: 20, titulo: 'Mortal Kombat', plataforma: 'Arcade', genero: 'Luta', ano_lancamento: 1992, desenvolvedora: 'Midway', descricao: 'Lutadores participam de um torneio brutal com golpes especiais e finalizações famosas.' },
        { id: 21, titulo: 'Galaga', plataforma: 'Arcade', genero: 'Ação', ano_lancamento: 1981, desenvolvedora: 'Namco', descricao: 'Naves inimigas atacam em formações enquanto o jogador defende a tela com tiros precisos.' },
        { id: 22, titulo: 'Space Invaders', plataforma: 'Atari 2600', genero: 'Ação', ano_lancamento: 1980, desenvolvedora: 'Taito', descricao: 'O jogador controla uma base móvel para impedir a invasão de fileiras de alienígenas.' },
        { id: 23, titulo: 'Pitfall!', plataforma: 'Atari 2600', genero: 'Aventura', ano_lancamento: 1982, desenvolvedora: 'Activision', descricao: 'Pitfall Harry atravessa selvas, buracos e perigos em busca de tesouros escondidos.' },
        { id: 24, titulo: 'Golden Axe', plataforma: 'Mega Drive', genero: 'Beat em up', ano_lancamento: 1989, desenvolvedora: 'Sega', descricao: 'Heróis de fantasia enfrentam hordas inimigas para derrotar Death Adder.' },
        { id: 25, titulo: 'Streets of Rage 2', plataforma: 'Mega Drive', genero: 'Beat em up', ano_lancamento: 1992, desenvolvedora: 'Sega', descricao: 'Lutadores percorrem ruas perigosas em combates cooperativos contra gangues urbanas.' },
        { id: 26, titulo: 'Phantasy Star IV', plataforma: 'Mega Drive', genero: 'RPG', ano_lancamento: 1993, desenvolvedora: 'Sega', descricao: 'Um RPG de ficção científica com batalhas por turno, personagens marcantes e narrativa épica.' },
        { id: 27, titulo: 'Samurai Shodown', plataforma: 'Neo Geo', genero: 'Luta', ano_lancamento: 1993, desenvolvedora: 'SNK', descricao: 'Duelistas armados disputam combates estratégicos em um clássico jogo de luta da SNK.' },
        { id: 28, titulo: 'The King of Fighters 98', plataforma: 'Neo Geo', genero: 'Luta', ano_lancamento: 1998, desenvolvedora: 'SNK', descricao: 'Equipes de lutadores se enfrentam em um dos capítulos mais celebrados da série KOF.' },
        { id: 29, titulo: 'Resident Evil', plataforma: 'PlayStation', genero: 'Ação e Aventura', ano_lancamento: 1996, desenvolvedora: 'Capcom', descricao: 'Agentes investigam uma mansão repleta de criaturas, enigmas e elementos de terror de sobrevivência.' },
        { id: 30, titulo: 'Tekken 3', plataforma: 'PlayStation', genero: 'Luta', ano_lancamento: 1997, desenvolvedora: 'Namco', descricao: 'Lutadores competem em batalhas 3D com movimentos rápidos e elenco memorável.' },
        { id: 31, titulo: 'Gran Turismo', plataforma: 'PlayStation', genero: 'Corrida', ano_lancamento: 1997, desenvolvedora: 'Polyphony Digital', descricao: 'Simulador de corrida com licenças, carros reais e progressão por campeonatos.' },
        { id: 32, titulo: 'God of War', plataforma: 'PlayStation 2', genero: 'Ação e Aventura', ano_lancamento: 2005, desenvolvedora: 'Santa Monica Studio', descricao: 'Kratos enfrenta criaturas da mitologia grega em uma jornada de vingança e combate intenso.' },
        { id: 33, titulo: 'Shadow of the Colossus', plataforma: 'PlayStation 2', genero: 'Aventura', ano_lancamento: 2005, desenvolvedora: 'Team Ico', descricao: 'Wander percorre terras proibidas para derrotar colossos em batalhas grandiosas e melancólicas.' },
    ];

    function iniciarLocalStorage() {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(exemplos));
            localStorage.setItem(NEXT_ID_KEY, String(exemplos.length + 1));
            localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
            return;
        }

        if (localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(exemplos));
            localStorage.setItem(NEXT_ID_KEY, String(exemplos.length + 1));
            localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
        }
    }

    function obterJogosLocais() {
        iniciarLocalStorage();
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function salvarJogosLocais(jogos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
    }

    function validar(dados) {
        const erros = {};
        const campos = ['titulo', 'plataforma', 'genero', 'ano_lancamento', 'desenvolvedora', 'descricao'];
        const ano = Number(dados.ano_lancamento);
        const anoAtual = new Date().getFullYear();

        campos.forEach((campo) => {
            if (dados[campo] === undefined || String(dados[campo]).trim() === '') {
                erros[campo] = 'Campo obrigatório.';
            }
        });

        if (!Number.isInteger(ano) || ano < 1970 || ano > anoAtual) {
            erros.ano_lancamento = `Informe um ano entre 1970 e ${anoAtual}.`;
        }

        return erros;
    }

    async function tentarApi(caminho, opcoes = {}) {
        if (window.location.protocol === 'file:') {
            throw new Error('API indisponível em arquivo local.');
        }

        try {
            return await chamarApi(`${API_BASE}${caminho}`, opcoes);
        } catch (erro) {
            const rota = caminho.replace(/^\/+/, '');
            return chamarApi(`${API_BASE}?rota=${encodeURIComponent(rota)}`, opcoes);
        }
    }

    async function chamarApi(url, opcoes = {}) {
        const resposta = await fetch(url, opcoes);
        const texto = await resposta.text();
        let resultado;

        try {
            resultado = JSON.parse(texto);
        } catch {
            throw new Error('A API não retornou JSON válido.');
        }

        if (resposta.status >= 500) {
            throw new Error(resultado.mensagem || 'API indisponível.');
        }

        return resultado;
    }

    function respostaValidacao(erros) {
        return {
            sucesso: false,
            mensagem: 'Existem campos inválidos.',
            erros,
        };
    }

    function normalizar(dados) {
        return {
            titulo: String(dados.titulo || '').trim(),
            plataforma: String(dados.plataforma || '').trim(),
            genero: String(dados.genero || '').trim(),
            ano_lancamento: Number(dados.ano_lancamento),
            desenvolvedora: String(dados.desenvolvedora || '').trim(),
            descricao: String(dados.descricao || '').trim(),
        };
    }

    const local = {
        listar() {
            ultimoModo = 'localStorage';
            const dados = obterJogosLocais().sort((a, b) => a.titulo.localeCompare(b.titulo));
            return Promise.resolve({
                sucesso: true,
                total: dados.length,
                dados,
                origem: ultimoModo,
            });
        },

        buscar(id) {
            ultimoModo = 'localStorage';
            const jogo = obterJogosLocais().find((item) => Number(item.id) === Number(id));

            if (!jogo) {
                return Promise.resolve({
                    sucesso: false,
                    mensagem: 'Jogo não encontrado.',
                    origem: ultimoModo,
                });
            }

            return Promise.resolve({
                sucesso: true,
                dados: jogo,
                origem: ultimoModo,
            });
        },

        salvar(dadosRecebidos) {
            ultimoModo = 'localStorage';
            const dados = normalizar(dadosRecebidos);
            const erros = validar(dados);

            if (Object.keys(erros).length > 0) {
                return Promise.resolve(respostaValidacao(erros));
            }

            const jogos = obterJogosLocais();
            const id = Number(localStorage.getItem(NEXT_ID_KEY) || '1');
            jogos.push({ id, ...dados });
            salvarJogosLocais(jogos);
            localStorage.setItem(NEXT_ID_KEY, String(id + 1));

            return Promise.resolve({
                sucesso: true,
                mensagem: 'Jogo cadastrado com sucesso no localStorage.',
                id,
                origem: ultimoModo,
            });
        },

        editar(id, dadosRecebidos) {
            ultimoModo = 'localStorage';
            const dados = normalizar(dadosRecebidos);
            const erros = validar(dados);

            if (Object.keys(erros).length > 0) {
                return Promise.resolve(respostaValidacao(erros));
            }

            const jogos = obterJogosLocais();
            const indice = jogos.findIndex((item) => Number(item.id) === Number(id));

            if (indice === -1) {
                return Promise.resolve({
                    sucesso: false,
                    mensagem: 'Jogo não encontrado.',
                    origem: ultimoModo,
                });
            }

            jogos[indice] = { id: Number(id), ...dados };
            salvarJogosLocais(jogos);

            return Promise.resolve({
                sucesso: true,
                mensagem: 'Jogo atualizado com sucesso no localStorage.',
                origem: ultimoModo,
            });
        },

        deletar(id) {
            ultimoModo = 'localStorage';
            const jogos = obterJogosLocais();
            const filtrados = jogos.filter((item) => Number(item.id) !== Number(id));

            if (filtrados.length === jogos.length) {
                return Promise.resolve({
                    sucesso: false,
                    mensagem: 'Jogo não encontrado.',
                    origem: ultimoModo,
                });
            }

            salvarJogosLocais(filtrados);

            return Promise.resolve({
                sucesso: true,
                mensagem: 'Jogo excluído com sucesso no localStorage.',
                origem: ultimoModo,
            });
        },
    };

    async function comFallback(caminho, opcoes, acaoLocal) {
        try {
            const resultado = await tentarApi(caminho, opcoes);
            ultimoModo = 'API';
            return { ...resultado, origem: ultimoModo };
        } catch {
            return acaoLocal();
        }
    }

    return {
        listar: () => comFallback('/listar', {}, local.listar),
        buscar: (id) => comFallback(`/buscar/${id}`, {}, () => local.buscar(id)),
        salvar: (dados) => comFallback('/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        }, () => local.salvar(dados)),
        editar: (id, dados) => comFallback(`/editar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        }, () => local.editar(id, dados)),
        deletar: (id) => comFallback(`/deletar/${id}`, {
            method: 'DELETE',
        }, () => local.deletar(id)),
        modo: () => ultimoModo,
    };
})();
