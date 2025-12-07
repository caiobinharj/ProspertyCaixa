# ⚡ Comandos Rápidos - Prosperty Brazil

## 🏠 Rodar Localmente

### 1. Instalar tudo
```bash
npm install
cd client && npm install && cd ..
```

### 2. Configurar banco (PostgreSQL)
```bash
# Criar banco (no PostgreSQL)
createdb prosperty_brazil

# Ou via psql:
psql -U postgres
CREATE DATABASE prosperty_brazil;
\q
```

### 3. Configurar .env
```bash
cp .env.example .env
# Edite o .env com suas credenciais do banco
```

### 4. Rodar migrações
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Iniciar o sistema
```bash
npm run dev
```

**Acesse:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## 📤 Push para GitHub

### Se ainda não inicializou o Git:
```bash
git init
git remote add origin https://github.com/caiobinharj/ProspertyCaixa.git
```

### Fazer commit e push:
```bash
git add .
git commit -m "Initial commit: Prosperty Brazil platform"
git branch -M main
git push -u origin main
```

---

## ⚠️ GitHub Pages - NÃO FUNCIONA

GitHub Pages **NÃO suporta**:
- ❌ Backend Node.js
- ❌ Banco de dados
- ❌ Apenas sites estáticos

### ✅ Use estas opções GRATUITAS:

#### Opção 1: Railway (Backend + DB) + Vercel (Frontend)
- **Railway**: https://railway.app (backend + PostgreSQL)
- **Vercel**: https://vercel.com (frontend React)

#### Opção 2: Render (Tudo)
- **Render**: https://render.com (full-stack + PostgreSQL)

Veja o arquivo `DEPLOY.md` para instruções detalhadas!




