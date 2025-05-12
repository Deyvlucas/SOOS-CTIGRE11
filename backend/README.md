# SOOS CTIGRE11 - API de Suporte Técnico

## Descrição do Projeto

Este projeto é uma API backend para um sistema de suporte técnico, desenvolvido em Node.js com Express. A API permite o gerenciamento de usuários, autenticação, e controle de chamados (tickets) para suporte técnico, incluindo criação, listagem e resolução de chamados.

## Tecnologias Utilizadas

- Node.js
- Express 5
- MySQL 8 (via container Docker)
- Sequelize (ORM para MySQL)
- JSON Web Tokens (JWT) para autenticação
- bcryptjs para hash de senhas
- dotenv para variáveis de ambiente
- cors para controle de acesso
- nodemon para desenvolvimento

## Instalação e Execução Local

1. Clone o repositório:

```bash
git clone <https://github.com/Deyvlucas/SOOS-CTIGRE11>
cd SOOS CTIGRE11/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do backend com as seguintes variáveis:

```
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=suporte_tecnico
JWT_SECRET=sua_chave_secreta
```

4. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

## Uso com Docker

O projeto inclui um `Dockerfile` e um `docker-compose.yml` para facilitar a execução com containers Docker.

Para iniciar os serviços (API e banco MySQL) via Docker, execute:

```bash
docker-compose up --build
```

Isso iniciará dois containers:

- `suporte_mysql`: banco de dados MySQL configurado na porta 3307
- `suporte_backend`: aplicação Node.js na porta 3000

## Rotas da API

### Autenticação

- `POST /api/auth/login` - Realiza login e retorna token JWT.

### Usuários

- `POST /api/users/register` - Registra um novo usuário.

### Chamados (Tickets)

- `POST /api/tickets/criar` - Cria um novo chamado (requer autenticação).
- `GET /api/tickets/meus` - Lista chamados do usuário autenticado.
- `GET /api/tickets/todos` - Lista todos os chamados (requer perfil técnico).
- `PUT /api/tickets/resolver/:id` - Marca um chamado como resolvido (requer perfil técnico).

## Middlewares

- `validateJsonBody` - Valida o corpo das requisições JSON.
- `authMiddleware` - Protege rotas que requerem autenticação via JWT.

## Estrutura do Projeto

- `src/controllers/` - Lógica dos controladores para autenticação, usuários e chamados.
- `src/routes/` - Definição das rotas da API.
- `src/middlewares/` - Middlewares para autenticação e validação.
- `src/models/` - Modelos Sequelize para as entidades do banco.
- `src/config/` - Configurações do banco de dados e JWT.
- `src/utils/` - Utilitários diversos.

## Contato

Para dúvidas ou contribuições, entre em contato com o mantenedor do projeto.

---

API de Suporte Técnico - SOOS CTIGRE11 🚀
