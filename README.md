# Biblioteca Retrô

Sistema Web de Biblioteca de Jogos Retrô desenvolvido para atividade acadêmica de Programação II.

O projeto permite cadastrar, listar, consultar, editar e excluir jogos retrô usando frontend separado do backend, API JSON em PHP puro e banco MySQL/MariaDB.

O frontend também possui um modo de testes com `localStorage`. Se a API PHP ou o banco de dados não estiverem disponíveis, as telas continuam funcionando no navegador com 33 jogos de exemplo salvos localmente, sem remover nem substituir o banco MySQL.

## Funcionalidades da interface

- Página inicial com carrossel de capas de jogos clássicos.
- Página de jogos com tabela, busca por texto, filtro por plataforma e filtro por gênero.
- Cards de resumo com total de jogos, total exibido e ano do jogo mais antigo.
- Página de cadastro com listas suspensas para plataforma e gênero.
- Página de detalhes com visualização e edição dos dados do jogo.
- Página Sobre explicando que o projeto é um trabalho acadêmico de faculdade.
- Estado vazio quando nenhum jogo corresponde aos filtros.
- Migração automática dos dados antigos do `localStorage` para corrigir acentuação.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- PHP puro com orientação a objetos
- PDO
- MySQL ou MariaDB

## Estrutura de pastas

```text
/biblioteca-retro
|
├── frontend
│   ├── index.html
│   ├── jogos.html
│   ├── cadastro.html
│   ├── detalhes.html
│   ├── sobre.html
│   |
│   ├── css
│   │   ├── index.css
│   │   ├── jogos.css
│   │   ├── cadastro.css
│   │   ├── detalhes.css
│   │   └── sobre.css
│   |
│   └── js
│       ├── apiService.js
│       ├── index.js
│       ├── jogos.js
│       ├── cadastro.js
│       └── detalhes.js
|
├── backend
│   ├── config
│   │   └── database.php
│   |
│   ├── models
│   │   └── Jogo.php
│   |
│   ├── controllers
│   │   └── JogoController.php
│   |
│   ├── routes
│   │   └── api.php
│   |
│   └── api
│       ├── listar.php
│       ├── buscar.php
│       ├── salvar.php
│       ├── editar.php
│       └── deletar.php
|
├── database
│   └── biblioteca_retro.sql
|
└── README.md
```

## Como criar o banco de dados

1. Abra o MySQL/MariaDB no phpMyAdmin, MySQL Workbench ou terminal.
2. Importe o arquivo:

```sql
database/biblioteca_retro.sql
```

Pelo terminal:

```bash
mysql -u root -p < database/biblioteca_retro.sql
```

O script cria o banco `biblioteca_retro`, cria a tabela `jogos` e insere 33 jogos de exemplo.

## Como configurar a conexão PHP

Abra o arquivo:

```text
backend/config/database.php
```

Altere os dados se o seu ambiente usar outro usuário, senha ou host:

```php
private string $host = 'localhost';
private string $dbName = 'biblioteca_retro';
private string $username = 'root';
private string $password = '';
```

## Como executar o sistema

### Opção com XAMPP/WAMP

1. Copie a pasta `biblioteca-retro` para o diretório do servidor local, como `htdocs`.
2. Inicie Apache e MySQL.
3. Importe o SQL.
4. Acesse:

```text
http://localhost/biblioteca-retro/frontend/index.html
```

### Opção com servidor embutido do PHP

Na pasta acima de `biblioteca-retro`, execute:

```bash
php -S localhost:8000
```

Acesse:

```text
http://localhost:8000/biblioteca-retro/frontend/index.html
```

A página `index.html` é a tela inicial do sistema. A listagem dos jogos fica em:

```text
http://localhost:8000/biblioteca-retro/frontend/jogos.html
```

## Modo de teste com localStorage

Para testar as interfaces sem configurar o MySQL imediatamente, abra:

```text
biblioteca-retro/frontend/index.html
```

ou use um servidor estático/Apache. O arquivo `frontend/js/apiService.js` tenta usar a API PHP primeiro. Se a API não responder, ele usa automaticamente o `localStorage` do navegador.

As operações disponíveis no modo local são:

- listar jogos
- buscar jogo por ID
- cadastrar jogo
- editar jogo
- excluir jogo
- carregar automaticamente 33 jogos clássicos de exemplo

Esse modo serve apenas para testes de interface. O banco de dados continua disponível no arquivo SQL e no backend PHP.

## Endpoints REST

A API principal está em:

```text
backend/routes/api.php
```

Endpoints:

| Método | Rota | Descrição |
|---|---|---|
| GET | `/listar` | Retorna todos os jogos |
| GET | `/buscar/{id}` | Retorna um jogo pelo ID |
| POST | `/salvar` | Cadastra um novo jogo |
| PUT | `/editar/{id}` | Atualiza um jogo |
| DELETE | `/deletar/{id}` | Remove um jogo |

Exemplo de URL usando servidor embutido:

```text
http://localhost:8000/biblioteca-retro/backend/routes/api.php/listar
```

Também existem arquivos individuais em `backend/api`, como:

```text
backend/api/listar.php
backend/api/buscar.php?id=1
backend/api/salvar.php
backend/api/editar.php?id=1
backend/api/deletar.php?id=1
```

## Exemplos de requisição

### Listar jogos

```bash
curl -X GET http://localhost:8000/biblioteca-retro/backend/routes/api.php/listar
```

### Buscar jogo por ID

```bash
curl -X GET http://localhost:8000/biblioteca-retro/backend/routes/api.php/buscar/1
```

### Salvar jogo

```bash
curl -X POST http://localhost:8000/biblioteca-retro/backend/routes/api.php/salvar \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Final Fight",
    "plataforma": "Arcade",
    "genero": "Beat em up",
    "ano_lancamento": 1989,
    "desenvolvedora": "Capcom",
    "descricao": "Jogo de acao urbana com combate corpo a corpo."
  }'
```

### Editar jogo

```bash
curl -X PUT http://localhost:8000/biblioteca-retro/backend/routes/api.php/editar/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Super Mario World",
    "plataforma": "Super Nintendo",
    "genero": "Plataforma",
    "ano_lancamento": 1990,
    "desenvolvedora": "Nintendo",
    "descricao": "Aventura classica de Mario e Luigi em Dinosaur Land."
  }'
```

### Deletar jogo

```bash
curl -X DELETE http://localhost:8000/biblioteca-retro/backend/routes/api.php/deletar/1
```

## Exemplos de resposta JSON

### Sucesso ao listar

```json
{
  "sucesso": true,
  "total": 1,
  "dados": [
    {
      "id": 1,
      "titulo": "Super Mario World",
      "plataforma": "Super Nintendo",
      "genero": "Plataforma",
      "ano_lancamento": 1990,
      "desenvolvedora": "Nintendo",
      "descricao": "Mario e Luigi exploram Dinosaur Land para resgatar a Princesa Peach e enfrentar Bowser."
    }
  ]
}
```

### Sucesso ao salvar

```json
{
  "sucesso": true,
  "mensagem": "Jogo cadastrado com sucesso.",
  "id": 11
}
```

### Erro de validação

```json
{
  "sucesso": false,
  "mensagem": "Existem campos invalidos.",
  "erros": {
    "titulo": "Campo obrigatorio."
  }
}
```

## Observações

- Todas as respostas da API retornam JSON.
- O backend usa PDO e orientação a objetos.
- O frontend consome a API com Fetch.
- O frontend usa `localStorage` como fallback para testes sem banco/API.
- Cada página HTML possui seu próprio CSS.
- O layout usa a paleta: `#1B1B3A`, `#4EF3C9`, `#FF2E88`, `#FFD166`, `#F7F7FF`.
