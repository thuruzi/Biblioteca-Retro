<?php

class Jogo
{
    private PDO $conn;
    private string $tabela = 'jogos';

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    public function listar(): array
    {
        $sql = "SELECT * FROM {$this->tabela} ORDER BY titulo ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function buscarPorId(int $id): ?array
    {
        $sql = "SELECT * FROM {$this->tabela} WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $jogo = $stmt->fetch();
        return $jogo ?: null;
    }

    public function salvar(array $dados): int
    {
        $sql = "INSERT INTO {$this->tabela}
            (titulo, plataforma, genero, ano_lancamento, desenvolvedora, descricao)
            VALUES
            (:titulo, :plataforma, :genero, :ano_lancamento, :desenvolvedora, :descricao)";

        $stmt = $this->conn->prepare($sql);
        $this->vincularDados($stmt, $dados);
        $stmt->execute();

        return (int) $this->conn->lastInsertId();
    }

    public function editar(int $id, array $dados): bool
    {
        $sql = "UPDATE {$this->tabela}
            SET titulo = :titulo,
                plataforma = :plataforma,
                genero = :genero,
                ano_lancamento = :ano_lancamento,
                desenvolvedora = :desenvolvedora,
                descricao = :descricao
            WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $this->vincularDados($stmt, $dados);

        return $stmt->execute();
    }

    public function deletar(int $id): bool
    {
        $sql = "DELETE FROM {$this->tabela} WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    private function vincularDados(PDOStatement $stmt, array $dados): void
    {
        $stmt->bindValue(':titulo', trim($dados['titulo']));
        $stmt->bindValue(':plataforma', trim($dados['plataforma']));
        $stmt->bindValue(':genero', trim($dados['genero']));
        $stmt->bindValue(':ano_lancamento', (int) $dados['ano_lancamento'], PDO::PARAM_INT);
        $stmt->bindValue(':desenvolvedora', trim($dados['desenvolvedora']));
        $stmt->bindValue(':descricao', trim($dados['descricao']));
    }
}
