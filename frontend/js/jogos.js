const corpoTabela = document.getElementById('corpoTabela');
const mensagem = document.getElementById('mensagem');
const busca = document.getElementById('busca');
const filtroPlataforma = document.getElementById('filtroPlataforma');
const filtroGenero = document.getElementById('filtroGenero');
const btnLimparFiltros = document.getElementById('btnLimparFiltros');
const estadoVazio = document.getElementById('estadoVazio');
const totalJogos = document.getElementById('totalJogos');
const totalFiltrado = document.getElementById('totalFiltrado');
const anoMaisAntigo = document.getElementById('anoMaisAntigo');

let jogos = [];
let origemAtual = 'localStorage';

document.addEventListener('DOMContentLoaded', listarJogos);
busca.addEventListener('input', aplicarFiltros);
filtroPlataforma.addEventListener('change', aplicarFiltros);
filtroGenero.addEventListener('change', aplicarFiltros);
btnLimparFiltros.addEventListener('click', limparFiltros);

async function listarJogos() {
    try {
        mensagem.textContent = 'Carregando biblioteca...';
        const resultado = await BibliotecaRetroApi.listar();

        if (!resultado.sucesso) {
            throw new Error(resultado.mensagem || 'Não foi possível listar os jogos.');
        }

        jogos = resultado.dados;
        origemAtual = resultado.origem;
        montarFiltros(jogos);
        aplicarFiltros();
    } catch (erro) {
        jogos = [];
        mensagem.textContent = erro.message;
        atualizarTabela([]);
        atualizarResumo([]);
    }
}

function aplicarFiltros() {
    const termo = normalizarTexto(busca.value);
    const plataforma = filtroPlataforma.value;
    const genero = filtroGenero.value;

    const filtrados = jogos.filter((jogo) => {
        const textoBusca = normalizarTexto([
            jogo.titulo,
            jogo.plataforma,
            jogo.genero,
            jogo.desenvolvedora,
            jogo.ano_lancamento,
        ].join(' '));

        const bateBusca = termo === '' || textoBusca.includes(termo);
        const batePlataforma = plataforma === '' || jogo.plataforma === plataforma;
        const bateGenero = genero === '' || jogo.genero === genero;

        return bateBusca && batePlataforma && bateGenero;
    });

    atualizarTabela(filtrados);
    atualizarResumo(filtrados);
    mensagem.textContent = `${filtrados.length} de ${jogos.length} jogo(s) exibido(s). Origem: ${origemAtual}.`;
}

function atualizarTabela(lista) {
    corpoTabela.innerHTML = '';
    estadoVazio.hidden = lista.length > 0;

    lista.forEach((jogo) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td data-label="ID">${jogo.id}</td>
            <td data-label="Título">
                <div class="titulo-jogo">
                    <span class="mini-sprite">${obterInicial(jogo.titulo)}</span>
                    <strong>${escapeHtml(jogo.titulo)}</strong>
                </div>
            </td>
            <td data-label="Plataforma">${escapeHtml(jogo.plataforma)}</td>
            <td data-label="Gênero">${escapeHtml(jogo.genero)}</td>
            <td data-label="Ano">${jogo.ano_lancamento}</td>
            <td data-label="Ações" class="acoes-tabela">
                <a class="acao visualizar" href="detalhes.html?id=${jogo.id}" title="Visualizar">Ver</a>
                <a class="acao editar" href="detalhes.html?id=${jogo.id}&editar=1" title="Editar">Editar</a>
                <button class="acao excluir" type="button" onclick="excluirJogo(${jogo.id})" title="Excluir">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

function atualizarResumo(listaFiltrada) {
    totalJogos.textContent = jogos.length;
    totalFiltrado.textContent = listaFiltrada.length;

    if (jogos.length === 0) {
        anoMaisAntigo.textContent = '-';
        return;
    }

    const menorAno = Math.min(...jogos.map((jogo) => Number(jogo.ano_lancamento)));
    anoMaisAntigo.textContent = menorAno;
}

function montarFiltros(lista) {
    preencherSelect(filtroPlataforma, ['Todas', ...valoresUnicos(lista, 'plataforma')]);
    preencherSelect(filtroGenero, ['Todos', ...valoresUnicos(lista, 'genero')]);
}

function preencherSelect(select, opcoes) {
    const valorAtual = select.value;
    select.innerHTML = '';

    opcoes.forEach((opcao, indice) => {
        const option = document.createElement('option');
        option.value = indice === 0 ? '' : opcao;
        option.textContent = opcao;
        select.appendChild(option);
    });

    select.value = [...select.options].some((option) => option.value === valorAtual) ? valorAtual : '';
}

function valoresUnicos(lista, campo) {
    return [...new Set(lista.map((jogo) => jogo[campo]).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

async function excluirJogo(id) {
    const confirmar = confirm('Deseja realmente excluir este jogo?');

    if (!confirmar) {
        return;
    }

    try {
        const resultado = await BibliotecaRetroApi.deletar(id);

        if (!resultado.sucesso) {
            throw new Error(resultado.mensagem || 'Não foi possível excluir o jogo.');
        }

        mensagem.textContent = resultado.mensagem;
        await listarJogos();
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

function limparFiltros() {
    busca.value = '';
    filtroPlataforma.value = '';
    filtroGenero.value = '';
    aplicarFiltros();
}

function obterInicial(titulo) {
    return String(titulo || '?').trim().charAt(0).toUpperCase();
}

function normalizarTexto(valor) {
    return String(valor || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function escapeHtml(valor) {
    return String(valor)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
