SOOS CTIGRE11 - API de Suporte Técnico
API backend para sistema de suporte técnico, desenvolvido em Node.js com Express, MySQL e JWT. Permite gerenciamento de usuários, autenticação e controle de chamados (tickets).

Tecnologias Utilizadas
Node.js, Express 5
MySQL 8 (via Docker)
JWT para autenticação
bcryptjs, dotenv, cors, nodemon
Node.js: Ambiente de execução JavaScript para o backend.
Express: Framework web minimalista e flexível para Node.js.
MySQL: Banco de dados relacional utilizado para persistência dos dados.
mysql2: Driver MySQL para Node.js, oferecendo performance e funcionalidades adicionais.
JWT (JSON Web Tokens): Padrão da indústria para criação de tokens de acesso seguros.
Bcrypt: Biblioteca para realizar hash de senhas de forma segura.
Docker: Utilizado para conteinerizar o banco de dados MySQL, facilitando a configuração e o ambiente de desenvolvimento.
Postman: Ferramenta utilizada para testar as APIs e endpoints do backend.
Instalação
Clone o repositório e instale dependências:

git clone https://github.com/Deyvlucas/SOOS-CTIGRE11
cd SOOS CTIGRE11/backend
npm install
Configure variáveis de ambiente em .env:

PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=suporte_tecnico
JWT_SECRET=sua_chave_secreta
Inicie o servidor em modo desenvolvimento:

npm run dev
Uso com Docker
Inicie API e banco MySQL via Docker:

docker-compose up --build
Rotas Principais
POST /api/auth/login - Login e token JWT
POST /api/users/register - Registro de usuário
POST /api/tickets/criar - Criar chamado (autenticado)
GET /api/tickets/meus - Listar chamados do usuário
GET /api/tickets/todos - Listar todos chamados (técnico)
PUT /api/tickets/resolver/:id - Resolver chamado (técnico)
Estrutura do Projeto
src/controllers/ - Controladores
src/routes/ - Rotas da API
src/middlewares/ - Middlewares
src/models/ - Modelos
src/config/ - Configurações
src/utils/ - Utilitários
Resumo
Este backend foi desenvolvido para fornecer a lógica e o armazenamento de dados para uma aplicação de chamados técnicos. Ele oferece funcionalidades completas de autenticação de usuários, gerenciamento de perfis e um CRUD básico para chamados técnicos. Todas as funcionalidades foram testadas com sucesso utilizando o Postman.

Funcionalidades Implementadas
✅ Cadastro de Usuários com Validações
E-mail institucional obrigatório: Garante que apenas usuários com e-mails válidos da instituição possam se cadastrar.
Confirmação de senha: Solicita a confirmação da senha durante o cadastro para evitar erros de digitação.
Campos dinâmicos conforme vínculo com GRE/Escola: O formulário de cadastro se adapta para coletar informações específicas dependendo do tipo de vínculo do usuário (por exemplo, informações adicionais para funcionários da GRE ou de escolas).
✅ Login com Retorno de Token JWT
Permite que usuários autenticados recebam um token JWT que será utilizado para acessar rotas protegidas.
✅ Middleware de Autenticação
Implementado um middleware para proteger rotas específicas, verificando a validade do token JWT presente no header da requisição.
✅ Rota /perfil que Retorna os Dados do Usuário Autenticado
Uma rota protegida que, ao receber um token JWT válido, retorna os dados do usuário correspondente.
✅ CRUD Básico de Chamados Técnicos
Criação de chamado: Permite que usuários autenticados criem novos chamados técnicos, registrando o problema ou solicitação.
Listagem de chamados: Permite visualizar os chamados existentes. A listagem pode ser filtrada ou apresentar informações diferentes dependendo do perfil do usuário (por exemplo, um administrador pode ver todos os chamados, enquanto um usuário comum vê apenas os seus).
Resolução de chamado com status, data e descrição da solução: Permite marcar um chamado como resolvido, registrando o status da resolução, a data em que foi solucionado e uma descrição da solução aplicada.
Testes Realizados com Postman
Todas as rotas foram testadas com sucesso: Cada endpoint da API foi testado para garantir seu funcionamento correto e a integridade dos dados.
Token JWT está sendo enviado corretamente nos headers: Verificação de que o token de autenticação é gerado e enviado corretamente nas respostas de login e que é aceito e validado nas requisições para rotas protegidas.
Contato
Para dúvidas ou contribuições, contate o mantenedor do projeto.

SOOS CTIGRE11 🚀
