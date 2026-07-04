const formJogo = document.getElementById('formJogo');
const mensagem = document.getElementById('mensagem');

formJogo.addEventListener('submit', cadastrarJogo);

async function cadastrarJogo(evento) {
    evento.preventDefault();

    const dados = obterDadosFormulario();

    try {
        mensagem.textContent = 'Salvando jogo...';
        const resultado = await BibliotecaRetroApi.salvar(dados);

        if (!resultado.sucesso) {
            throw new Error(formatarErro(resultado));
        }

        mensagem.textContent = `${resultado.mensagem} Origem: ${resultado.origem}.`;
        formJogo.reset();
        setTimeout(() => {
            window.location.href = 'jogos.html';
        }, 700);
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
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

function formatarErro(resultado) {
    if (!resultado.erros) {
        return resultado.mensagem || 'Erro ao cadastrar o jogo.';
    }

    return Object.values(resultado.erros).join(' ');
}
