const totalJogos = document.getElementById('totalJogos');
const totalPlataformas = document.getElementById('totalPlataformas');
const totalGeneros = document.getElementById('totalGeneros');

document.addEventListener('DOMContentLoaded', carregarResumo);

async function carregarResumo() {
    try {
        const resultado = await BibliotecaRetroApi.listar();

        if (!resultado.sucesso) {
            throw new Error(resultado.mensagem || 'Não foi possível carregar o resumo.');
        }

        const jogos = resultado.dados;
        const plataformas = new Set(jogos.map((jogo) => jogo.plataforma));
        const generos = new Set(jogos.map((jogo) => jogo.genero));

        totalJogos.textContent = jogos.length;
        totalPlataformas.textContent = plataformas.size;
        totalGeneros.textContent = generos.size;
    } catch {
        totalJogos.textContent = '0';
        totalPlataformas.textContent = '0';
        totalGeneros.textContent = '0';
    }
}
