# Dockerfile para Prosperty Brazil Backend
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache openssl

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Gerar Prisma Client
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de start
CMD ["npm", "start"]



