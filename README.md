# SOOS CTIGRE11 - API de Suporte Técnico

[![NPM Version](https://img.shields.io/npm/v/express.svg?style=flat)](https://www.npmjs.com/package/express)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

API backend para sistema de suporte técnico, desenvolvido em Node.js com Express, MySQL e JWT. Permite o gerenciamento de usuários, autenticação e controle de chamados (tickets).

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript para o backend.
* **Express 5**: Framework web minimalista e flexível para Node.js.
* **MySQL 8** (via Docker): Banco de dados relacional utilizado para persistência dos dados.
* **JWT (JSON Web Tokens)**: Padrão da indústria para criação de tokens de acesso seguros.
* **bcryptjs**: Biblioteca para realizar hash de senhas de forma segura.
* **dotenv**: Carrega variáveis de ambiente a partir do arquivo `.env`.
* **cors**: Middleware para habilitar o Cross-Origin Resource Sharing.
* **nodemon**: Utilitário que reinicia automaticamente o servidor Node.js durante o desenvolvimento.
* **mysql2**: Driver MySQL para Node.js, oferecendo performance e funcionalidades adicionais.
* **Docker**: Utilizado para conteinerizar o banco de dados MySQL, facilitando a configuração e o ambiente de desenvolvimento.
* **Postman**: Ferramenta utilizada para testar as APIs e endpoints do backend.

## ⚙️ Instalação

1.  **Clone o repositório e instale as dependências:**

    ```bash
    git clone [https://github.com/Deyvlucas/SOOS-CTIGRE11](https://github.com/Deyvlucas/SOOS-CTIGRE11)
    cd SOOS-CTIGRE11/backend
    npm install
    ```

2.  **Configure as variáveis de ambiente no arquivo `.env`:**

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=suporte_tecnico
    JWT_SECRET=sua_chave_secreta
    ```

3.  **Inicie o servidor em modo de desenvolvimento:**

    ```bash
    npm run dev
    ```

## 🐳 Uso com Docker

Para iniciar a API e o banco de dados MySQL utilizando Docker, execute o seguinte comando:

```bash
docker-compose up --build
