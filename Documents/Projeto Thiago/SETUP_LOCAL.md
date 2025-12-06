# 🚀 Setup Local - Passo a Passo

## Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- Git instalado

## Passo 1: Instalar Dependências

```bash
# No diretório raiz do projeto
npm install

# No diretório client
cd client
npm install
cd ..
```

## Passo 2: Configurar PostgreSQL

### Windows (PowerShell):
```powershell
# Se PostgreSQL estiver no PATH
createdb prosperty_brazil

# Ou via psql
psql -U postgres
CREATE DATABASE prosperty_brazil;
\q
```

### Mac/Linux:
```bash
createdb prosperty_brazil
```

## Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e configure:
```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/prosperty_brazil?schema=public"
JWT_SECRET="uma-chave-secreta-forte-aqui"
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Importante**: Substitua `seu_usuario` e `sua_senha` pelas suas credenciais do PostgreSQL.

## Passo 4: Configurar Banco de Dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev
```

## Passo 5: Iniciar o Sistema

### Opção A: Tudo junto (recomendado)
```bash
npm run dev
```

Isso inicia:
- ✅ Backend na porta 3000
- ✅ Frontend na porta 5173

### Opção B: Separado

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Passo 6: Acessar o Site

Abra seu navegador em:
- **Frontend**: http://localhost:5173
- **API Health Check**: http://localhost:3000/health

## 🎉 Pronto!

Agora você pode:
- Navegar pelo site
- Criar usuários
- Adicionar imóveis
- Criar leilões
- Testar todas as funcionalidades

## 🐛 Problemas Comuns

### Erro: "Cannot connect to database"
- Verifique se PostgreSQL está rodando
- Confirme usuário/senha no `.env`
- Teste conexão: `psql -U seu_usuario -d prosperty_brazil`

### Erro: "Port already in use"
- Mude a porta no `.env` (ex: `PORT=3001`)
- Ou mate o processo usando a porta

### Erro: "Module not found"
- Execute `npm install` novamente
- Verifique se está no diretório correto

## 📝 Próximo Passo: Deploy

Veja o arquivo `DEPLOY.md` para fazer deploy em produção!


