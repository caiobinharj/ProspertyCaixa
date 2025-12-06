# 🚀 Guia de Deploy - Prosperty Brazil

## 📋 Índice
1. [Rodar Localmente](#rodar-localmente)
2. [Fazer Push para GitHub](#fazer-push-para-github)
3. [Hospedagem](#hospedagem)

---

## 🏠 Rodar Localmente

### Passo 1: Instalar Dependências

```bash
# Instalar dependências do backend
npm install

# Instalar dependências do frontend
cd client
npm install
cd ..
```

### Passo 2: Configurar Banco de Dados

1. **Instalar PostgreSQL** (se ainda não tiver):
   - Windows: https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Criar banco de dados**:
   ```sql
   CREATE DATABASE prosperty_brazil;
   ```

3. **Configurar `.env`**:
   ```bash
   cp .env.example .env
   ```
   
   Edite o `.env` e configure:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/prosperty_brazil?schema=public"
   JWT_SECRET="sua-chave-secreta-aqui-mude-em-producao"
   PORT=3000
   ```

4. **Executar migrações**:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

### Passo 3: Iniciar o Sistema

**Opção 1: Rodar tudo junto (recomendado)**
```bash
npm run dev
```

Isso inicia:
- Backend na porta **3000** (http://localhost:3000)
- Frontend na porta **5173** (http://localhost:5173)

**Opção 2: Rodar separadamente**

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

### Passo 4: Acessar o Site

Abra no navegador:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/health

---

## 📤 Fazer Push para GitHub

### Passo 1: Inicializar Git (se ainda não fez)

```bash
git init
```

### Passo 2: Adicionar Remote

```bash
git remote add origin https://github.com/caiobinharj/ProspertyCaixa.git
```

### Passo 3: Criar .gitignore (já existe, mas verifique)

Certifique-se de que o `.gitignore` inclui:
- `node_modules/`
- `.env`
- `dist/`
- `client/dist/`
- `logs/`

### Passo 4: Fazer Commit e Push

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit: Prosperty Brazil platform"

# Fazer push para o repositório
git push -u origin main
```

**Nota**: Se o repositório usar `master` em vez de `main`:
```bash
git branch -M main  # Renomear branch para main
git push -u origin main
```

---

## 🌐 Hospedagem

### ⚠️ GitHub Pages - Limitações

**GitHub Pages NÃO é adequado para este projeto** porque:
- ❌ Não suporta backend (Node.js/Express)
- ❌ Não suporta banco de dados
- ❌ Apenas sites estáticos (HTML/CSS/JS)

### ✅ Opções Recomendadas

#### 1. **Vercel** (Recomendado - Gratuito)
- ✅ Suporta frontend React
- ✅ Suporta backend Node.js (Serverless Functions)
- ✅ Integração fácil com GitHub
- ✅ Plano gratuito generoso

**Como fazer:**
1. Acesse https://vercel.com
2. Conecte seu repositório GitHub
3. Configure:
   - **Root Directory**: `client` (para frontend)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Para o backend, use Vercel Serverless Functions ou hospede separadamente

#### 2. **Railway** (Recomendado - Backend)
- ✅ Suporta Node.js completo
- ✅ PostgreSQL incluído
- ✅ Deploy automático do GitHub
- ✅ Plano gratuito (com limites)

**Como fazer:**
1. Acesse https://railway.app
2. Conecte seu repositório
3. Adicione PostgreSQL
4. Configure variáveis de ambiente
5. Deploy automático!

#### 3. **Render** (Alternativa)
- ✅ Suporta full-stack
- ✅ PostgreSQL gratuito
- ✅ Deploy automático

**Como fazer:**
1. Acesse https://render.com
2. Crie um Web Service (backend)
3. Crie um PostgreSQL Database
4. Crie um Static Site (frontend)

#### 4. **Netlify** (Frontend) + **Railway/Render** (Backend)
- Netlify para frontend (React)
- Railway/Render para backend + banco

### 📝 Estrutura de Deploy Recomendada

```
Frontend (React) → Vercel/Netlify
Backend (Node.js) → Railway/Render
Database (PostgreSQL) → Railway/Render (incluído)
```

---

## 🔧 Configuração para Deploy

### 1. Variáveis de Ambiente em Produção

Configure no painel do seu provedor:
- `DATABASE_URL` - URL do banco de produção
- `JWT_SECRET` - Chave secreta forte
- `NODE_ENV=production`
- `CORS_ORIGIN` - URL do frontend

### 2. Build de Produção

**Backend:**
```bash
npm run build
```

**Frontend:**
```bash
cd client
npm run build
```

### 3. Atualizar CORS

No `src/server.ts`, configure o CORS para aceitar o domínio de produção:
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

---

## 🚀 Deploy Rápido (Railway - Recomendado)

### Backend + Database:

1. **Acesse**: https://railway.app
2. **Login** com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Selecione** `ProspertyCaixa`
5. **Add PostgreSQL** (banco de dados)
6. **Configure variáveis**:
   - `DATABASE_URL` (copie da aba PostgreSQL)
   - `JWT_SECRET` (gere uma chave forte)
   - `NODE_ENV=production`
   - `PORT` (Railway define automaticamente)
7. **Deploy!**

### Frontend (Vercel):

1. **Acesse**: https://vercel.com
2. **Login** com GitHub
3. **New Project** → Import `ProspertyCaixa`
4. **Configure**:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Environment Variables**:
   - `VITE_API_URL` = URL do backend (Railway)
6. **Deploy!**

---

## 📞 Próximos Passos

1. ✅ Fazer push para GitHub
2. ✅ Configurar Railway para backend
3. ✅ Configurar Vercel para frontend
4. ✅ Atualizar URLs no frontend
5. ✅ Testar em produção

---

## 🔗 Links Úteis

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Prisma Deploy Guide](https://www.prisma.io/docs/guides/deployment)


