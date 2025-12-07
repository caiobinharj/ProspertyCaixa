# 🌐 Como Acessar o Site - Prosperty Brazil

## ✅ Opção 1: Rodar Localmente (MAIS RÁPIDO)

### Passo 1: Verificar se PostgreSQL está rodando

**Windows:**
```powershell
# Verificar se está rodando
Get-Service | Where-Object {$_.Name -like "*postgresql*"}

# Se não estiver rodando, inicie:
net start postgresql-x64-18  # (ajuste a versão)
```

### Passo 2: Rodar as migrações do banco

```powershell
npx prisma migrate dev --name init
```

### Passo 3: Iniciar o sistema

```powershell
npm run dev
```

### Passo 4: Acessar no navegador

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/health

**Pronto!** Você já pode usar o site localmente! 🎉

---

## 🚀 Opção 2: Deploy em Produção (Acessar de qualquer lugar)

### Por que GitHub Pages NÃO funciona?

GitHub Pages só suporta:
- ❌ Sites estáticos (HTML/CSS/JS puro)
- ❌ Não suporta backend Node.js
- ❌ Não suporta banco de dados PostgreSQL

Este projeto precisa de:
- ✅ Backend Node.js/Express
- ✅ Banco PostgreSQL
- ✅ API REST

### ✅ Soluções GRATUITAS Recomendadas

#### **Opção A: Railway (Backend + DB) + Vercel (Frontend)** ⭐ RECOMENDADO

**1. Deploy do Backend no Railway:**

1. Acesse: https://railway.app
2. Faça login com GitHub
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Escolha o repositório `ProspertyCaixa`
6. Railway detecta automaticamente que é Node.js
7. Adicione um **PostgreSQL Database**:
   - Clique em **"+ New"** → **"Database"** → **"Add PostgreSQL"**
8. Configure as variáveis de ambiente:
   - Vá em **"Variables"**
   - Adicione:
     ```
     DATABASE_URL=<copie da aba PostgreSQL>
     JWT_SECRET=sua-chave-secreta-forte-aqui
     NODE_ENV=production
     PORT=3000
     CORS_ORIGIN=https://seu-frontend.vercel.app
     ```
9. Railway faz deploy automático!
10. Anote a URL do backend (ex: `https://prosperty-backend.railway.app`)

**2. Deploy do Frontend no Vercel:**

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New..."** → **"Project"**
4. Importe o repositório `ProspertyCaixa`
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Adicione variável de ambiente:
   - **VITE_API_URL**: URL do backend Railway (ex: `https://prosperty-backend.railway.app`)
7. Clique em **"Deploy"**
8. Vercel gera uma URL (ex: `https://prosperty-caixa.vercel.app`)

**3. Atualizar CORS no Backend:**

Volte no Railway e atualize:
```
CORS_ORIGIN=https://prosperty-caixa.vercel.app
```

**Pronto!** Agora você tem:
- ✅ Backend: `https://prosperty-backend.railway.app`
- ✅ Frontend: `https://prosperty-caixa.vercel.app`
- ✅ Banco de dados: PostgreSQL no Railway

---

#### **Opção B: Render (Tudo Junto)**

1. Acesse: https://render.com
2. Faça login com GitHub
3. Crie 3 serviços:

   **a) PostgreSQL Database:**
   - **New** → **PostgreSQL**
   - Nome: `prosperty-db`
   - Plano: Free
   - Anote a **Internal Database URL**

   **b) Web Service (Backend):**
   - **New** → **Web Service**
   - Conecte o repositório `ProspertyCaixa`
   - Configurações:
     - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       ```
       DATABASE_URL=<Internal Database URL>
       JWT_SECRET=sua-chave-secreta
       NODE_ENV=production
       CORS_ORIGIN=https://seu-frontend.onrender.com
       ```
   - Plano: Free

   **c) Static Site (Frontend):**
   - **New** → **Static Site**
   - Conecte o repositório `ProspertyCaixa`
   - Configurações:
     - **Build Command**: `cd client && npm install && npm run build`
     - **Publish Directory**: `client/dist`
     - **Environment Variables**:
       ```
       VITE_API_URL=https://seu-backend.onrender.com
       ```

**Pronto!** Você terá URLs como:
- Backend: `https://prosperty-backend.onrender.com`
- Frontend: `https://prosperty-caixa.onrender.com`

---

## 📊 Comparação das Opções

| Recurso | Local | Railway+Vercel | Render |
|---------|-------|----------------|--------|
| **Velocidade de setup** | ⚡⚡⚡ Muito rápido | ⚡⚡ Rápido | ⚡ Médio |
| **Custo** | Grátis | Grátis | Grátis |
| **Acesso externo** | ❌ Só local | ✅ Sim | ✅ Sim |
| **Facilidade** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Performance** | ⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡ |

---

## 🎯 Recomendação

**Para começar AGORA:**
1. Use a **Opção 1 (Local)** - Roda em 2 minutos!

**Para compartilhar/publicar:**
1. Use **Railway + Vercel** - Mais fácil e rápido
2. Ou **Render** - Tudo em um lugar

---

## 🔧 Troubleshooting

### Erro: "Can't reach database"
- Verifique se PostgreSQL está rodando
- Confirme a `DATABASE_URL` no `.env`

### Erro no deploy: "Build failed"
- Verifique os logs no Railway/Vercel
- Confirme que todas as variáveis de ambiente estão configuradas

### Frontend não conecta ao backend
- Verifique a variável `VITE_API_URL` no frontend
- Confirme o `CORS_ORIGIN` no backend

---

## 📞 Próximos Passos

1. **Agora**: Rode localmente (`npm run dev`)
2. **Depois**: Faça deploy no Railway + Vercel
3. **Compartilhe**: A URL do Vercel com quem quiser acessar!



