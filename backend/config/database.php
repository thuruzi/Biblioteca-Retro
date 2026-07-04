<?php

class Database
{
    private string $host = 'localhost';
    private string $dbName = 'biblioteca_retro';
    private string $username = 'root';
    private string $password = '';
    private string $charset = 'utf8mb4';

    public function conectar(): PDO
    {
        $dsn = "mysql:host={$this->host};dbname={$this->dbName};charset={$this->charset}";

        try {
            return new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $erro) {
            http_response_code(500);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Erro ao conectar com o banco de dados.',
                'erro' => $erro->getMessage(),
            ]);
            exit;
        }
    }
}
