# Usar imagem oficial Node.js
FROM node:18

# Criar diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todo o código
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Rodar o servidor
CMD ["npm", "run", "dev"]
