const parametros = new URLSearchParams(window.location.search);
const jogoId = Number(parametros.get('id'));
const iniciarEditando = parametros.get('editar') === '1';

const formJogo = document.getElementById('formJogo');
const mensagem = document.getElementById('mensagem');
const btnEditar = document.getElementById('btnEditar');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
let jogoOriginal = null;

document.addEventListener('DOMContentLoaded', buscarJogo);
formJogo.addEventListener('submit', editarJogo);
btnEditar.addEventListener('click', () => alternarEdicao(true));
btnCancelar.addEventListener('click', cancelarEdicao);

async function buscarJogo() {
    if (!jogoId) {
        mensagem.textContent = 'ID do jogo não informado.';
        return;
    }

    try {
        mensagem.textContent = 'Buscando jogo...';
        const resultado = await BibliotecaRetroApi.buscar(jogoId);

        if (!resultado.sucesso) {
            throw new Error(resultado.mensagem || 'Jogo não encontrado.');
        }

        jogoOriginal = resultado.dados;
        preencherFormulario(jogoOriginal);
        mensagem.textContent = `Dados carregados. Origem: ${resultado.origem}.`;

        if (iniciarEditando) {
            alternarEdicao(true);
        }
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

async function editarJogo(evento) {
    evento.preventDefault();

    const dados = obterDadosFormulario();

    try {
        mensagem.textContent = 'Atualizando jogo...';
        const resultado = await BibliotecaRetroApi.editar(jogoId, dados);

        if (!resultado.sucesso) {
            throw new Error(formatarErro(resultado));
        }

        jogoOriginal = { id: jogoId, ...dados };
        alternarEdicao(false);
        mensagem.textContent = `${resultado.mensagem} Origem: ${resultado.origem}.`;
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

function preencherFormulario(jogo) {
    document.getElementById('id').value = jogo.id;
    document.getElementById('titulo').value = jogo.titulo;
    document.getElementById('plataforma').value = jogo.plataforma;
    document.getElementById('genero').value = jogo.genero;
    document.getElementById('ano_lancamento').value = jogo.ano_lancamento;
    document.getElementById('desenvolvedora').value = jogo.desenvolvedora;
    document.getElementById('descricao').value = jogo.descricao;
}

function obterDadosFormulario() {
    const formData = new FormData(formJogo);

    return {
        titulo: formData.get('titulo'),
        plataforma: formData.get('plataforma'),
        genero: formData.get('genero'),
        ano_lancamento: Number(formData.get('ano_lancamento')),
        desenvolvedora: formData.get('desenvolvedora'),
        descricao: formData.get('descricao'),
    };
}

function alternarEdicao(editar) {
    const campos = formJogo.querySelectorAll('input:not([type="hidden"]), select, textarea');

    campos.forEach((campo) => {
        campo.disabled = !editar;
    });

    btnEditar.hidden = editar;
    btnSalvar.hidden = !editar;
    btnCancelar.hidden = !editar;
    mensagem.textContent = editar ? 'Modo de edição ativado.' : 'Modo de visualização ativado.';
}

function cancelarEdicao() {
    if (jogoOriginal) {
        preencherFormulario(jogoOriginal);
    }

    alternarEdicao(false);
}

function formatarErro(resultado) {
    if (!resultado.erros) {
        return resultado.mensagem || 'Erro ao editar o jogo.';
    }

    return Object.values(resultado.erros).join(' ');
}
