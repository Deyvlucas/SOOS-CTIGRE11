# SOOS CTIGRE11 - API de Suporte Técnico

API backend para sistema de suporte técnico, desenvolvido em Node.js com Express, MySQL e JWT. Permite gerenciamento de usuários, autenticação e controle de chamados (tickets).

## Tecnologias

- Node.js, Express 5
- MySQL 8 (via Docker)
- JWT para autenticação
- bcryptjs, dotenv, cors, nodemon

## Instalação

Clone o repositório e instale dependências:

```bash
git clone https://github.com/Deyvlucas/SOOS-CTIGRE11
cd SOOS CTIGRE11/backend
npm install
```

Configure variáveis de ambiente em `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=suporte_tecnico
JWT_SECRET=sua_chave_secreta
```

Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

## Uso com Docker

Inicie API e banco MySQL via Docker:

```bash
docker-compose up --build
```

## Rotas Principais

- `POST /api/auth/login` - Login e token JWT
- `POST /api/users/register` - Registro de usuário
- `POST /api/tickets/criar` - Criar chamado (autenticado)
- `GET /api/tickets/meus` - Listar chamados do usuário
- `GET /api/tickets/todos` - Listar todos chamados (técnico)
- `PUT /api/tickets/resolver/:id` - Resolver chamado (técnico)

## Estrutura do Projeto

- `src/controllers/` - Controladores
- `src/routes/` - Rotas da API
- `src/middlewares/` - Middlewares
- `src/models/` - Modelos
- `src/config/` - Configurações
- `src/utils/` - Utilitários

## Contato

Para dúvidas ou contribuições, contate o mantenedor do projeto.

---

SOOS CTIGRE11 🚀
