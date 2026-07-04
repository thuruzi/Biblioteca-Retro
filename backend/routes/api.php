<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$metodo = $_SERVER['REQUEST_METHOD'];
$rota = $_SERVER['PATH_INFO'] ?? '';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
$phpSelf = $_SERVER['PHP_SELF'] ?? '';

if ($rota === '' && $uri !== '') {
    $rota = str_replace([$scriptName, $phpSelf], '', $uri);
}

$rota = trim($rota, '/');

if ($rota === '' && isset($_GET['rota'])) {
    $rota = trim($_GET['rota'], '/');
}

$partes = $rota === '' ? [] : explode('/', $rota);
$recurso = $partes[0] ?? '';
$id = isset($partes[1]) ? (int) $partes[1] : 0;

try {
    if ($metodo === 'GET' && $recurso === 'listar') {
        obterController()->listar();
        exit;
    }

    if ($metodo === 'GET' && $recurso === 'buscar' && $id > 0) {
        obterController()->buscar($id);
        exit;
    }

    if ($metodo === 'POST' && $recurso === 'salvar') {
        obterController()->salvar();
        exit;
    }

    if ($metodo === 'PUT' && $recurso === 'editar' && $id > 0) {
        obterController()->editar($id);
        exit;
    }

    if ($metodo === 'DELETE' && $recurso === 'deletar' && $id > 0) {
        obterController()->deletar($id);
        exit;
    }

    responderRotaNaoEncontrada();
} catch (Throwable $erro) {
    http_response_code(500);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro interno da API.',
        'erro' => $erro->getMessage(),
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function obterController(): JogoController
{
    require_once __DIR__ . '/../config/database.php';
    require_once __DIR__ . '/../controllers/JogoController.php';

    $database = new Database();
    return new JogoController($database->conectar());
}

function responderRotaNaoEncontrada(): void
{
    http_response_code(404);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Rota nao encontrada.',
        'endpoints' => [
            'GET /listar',
            'GET /buscar/{id}',
            'POST /salvar',
            'PUT /editar/{id}',
            'DELETE /deletar/{id}',
        ],
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
