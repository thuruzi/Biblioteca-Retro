<?php

require_once __DIR__ . '/../models/Jogo.php';

class JogoController
{
    private Jogo $jogo;

    public function __construct(PDO $db)
    {
        $this->jogo = new Jogo($db);
    }

    public function listar(): void
    {
        $jogos = $this->jogo->listar();

        $this->responder(200, [
            'sucesso' => true,
            'total' => count($jogos),
            'dados' => $jogos,
        ]);
    }

    public function buscar(int $id): void
    {
        $jogo = $this->jogo->buscarPorId($id);

        if (!$jogo) {
            $this->responder(404, [
                'sucesso' => false,
                'mensagem' => 'Jogo nao encontrado.',
            ]);
            return;
        }

        $this->responder(200, [
            'sucesso' => true,
            'dados' => $jogo,
        ]);
    }

    public function salvar(): void
    {
        $dados = $this->obterJson();
        $erros = $this->validar($dados);

        if (!empty($erros)) {
            $this->responder(422, [
                'sucesso' => false,
                'mensagem' => 'Existem campos invalidos.',
                'erros' => $erros,
            ]);
            return;
        }

        $id = $this->jogo->salvar($dados);
        $this->responder(201, [
            'sucesso' => true,
            'mensagem' => 'Jogo cadastrado com sucesso.',
            'id' => $id,
        ]);
    }

    public function editar(int $id): void
    {
        if (!$this->jogo->buscarPorId($id)) {
            $this->responder(404, [
                'sucesso' => false,
                'mensagem' => 'Jogo nao encontrado.',
            ]);
            return;
        }

        $dados = $this->obterJson();
        $erros = $this->validar($dados);

        if (!empty($erros)) {
            $this->responder(422, [
                'sucesso' => false,
                'mensagem' => 'Existem campos invalidos.',
                'erros' => $erros,
            ]);
            return;
        }

        $this->jogo->editar($id, $dados);
        $this->responder(200, [
            'sucesso' => true,
            'mensagem' => 'Jogo atualizado com sucesso.',
        ]);
    }

    public function deletar(int $id): void
    {
        if (!$this->jogo->buscarPorId($id)) {
            $this->responder(404, [
                'sucesso' => false,
                'mensagem' => 'Jogo nao encontrado.',
            ]);
            return;
        }

        $this->jogo->deletar($id);
        $this->responder(200, [
            'sucesso' => true,
            'mensagem' => 'Jogo excluido com sucesso.',
        ]);
    }

    private function obterJson(): array
    {
        $conteudo = file_get_contents('php://input');
        $dados = json_decode($conteudo, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($dados)) {
            $this->responder(400, [
                'sucesso' => false,
                'mensagem' => 'JSON invalido ou ausente.',
            ]);
            exit;
        }

        return $dados;
    }

    private function validar(array $dados): array
    {
        $erros = [];
        $campos = ['titulo', 'plataforma', 'genero', 'ano_lancamento', 'desenvolvedora', 'descricao'];

        foreach ($campos as $campo) {
            if (!isset($dados[$campo]) || trim((string) $dados[$campo]) === '') {
                $erros[$campo] = 'Campo obrigatorio.';
            }
        }

        if (isset($dados['ano_lancamento'])) {
            $ano = filter_var($dados['ano_lancamento'], FILTER_VALIDATE_INT);
            $anoAtual = (int) date('Y');

            if ($ano === false || $ano < 1970 || $ano > $anoAtual) {
                $erros['ano_lancamento'] = "Informe um ano entre 1970 e {$anoAtual}.";
            }
        }

        return $erros;
    }

    private function responder(int $status, array $dados): void
    {
        http_response_code($status);
        echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}
