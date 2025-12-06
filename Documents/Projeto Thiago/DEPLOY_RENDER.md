# 🚀 Deploy no Render - Guia Completo

## ✅ Por que Render?

- ✅ Mais simples que Railway
- ✅ PostgreSQL gratuito incluído
- ✅ Deploy automático do GitHub
- ✅ Interface mais intuitiva
- ✅ Suporte completo a Node.js/TypeScript

---

## 📋 Passo a Passo Completo

### 1. Criar Conta no Render

1. Acesse: https://render.com
2. Clique em **"Get Started for Free"**
3. Faça login com **GitHub**
4. Autorize o Render a acessar seus repositórios

---

### 2. Criar PostgreSQL Database

1. No Dashboard do Render, clique em **"+ New"**
2. Selecione **"PostgreSQL"**
3. Configure:
   - **Name:** `prosperty-db` (ou qualquer nome)
   - **Database:** `prosperty_brazil` (ou deixe padrão)
   - **User:** Deixe padrão
   - **Region:** Escolha mais próxima (ex: `Oregon (US West)`)
   - **PostgreSQL Version:** `16` (ou mais recente)
   - **Plan:** `Free` (para começar)
4. Clique em **"Create Database"**
5. **Aguarde a criação** (pode levar 1-2 minutos)
6. **Anote as informações:**
   - Vá em **"Connections"** ou **"Info"**
   - Anote: `Internal Database URL` (vamos usar essa)

---

### 3. Criar Web Service (Backend)

1. No Dashboard, clique em **"+ New"**
2. Selecione **"Web Service"**
3. Conecte o repositório:
   - **Connect account:** Seu GitHub
   - **Repository:** `ProspertyCaixa`
   - Clique em **"Connect"**
4. Configure o serviço:

   **Basic Settings:**
   - **Name:** `prosperty-backend` (ou qualquer nome)
   - **Region:** Mesma do PostgreSQL
   - **Branch:** `main`
   - **Root Directory:** (deixe vazio - raiz do projeto)
   - **Runtime:** `Docker` (ou `Node` - ambos funcionam)
   - **Build Command:** (deixe vazio se usar Docker, ou use abaixo se Node)
     ```
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command:** (deixe vazio se usar Docker, ou use abaixo se Node)
     ```
     npx prisma migrate deploy && npm start
     ```
   
   **Nota:** Se usar Docker, o Dockerfile já tem os comandos. Se usar Node, configure os comandos acima.

   **Advanced Settings:**
   - **Instance Type:** `Free` (para começar)
   - **Auto-Deploy:** `Yes` (deploy automático a cada push)

5. **Environment Variables:**
   Clique em **"Add Environment Variable"** e adicione:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | (Cole a **Internal Database URL** do PostgreSQL) |
   | `JWT_SECRET` | (Gere uma chave forte - veja abaixo) |
   | `NODE_ENV` | `production` |
   | `CORS_ORIGIN` | `*` |
   | `PORT` | (Deixe vazio - Render define automaticamente) |

   **Como obter DATABASE_URL:**
   - Vá no serviço PostgreSQL
   - Aba **"Connections"** ou **"Info"**
   - Copie **"Internal Database URL"**
   - Cole no Web Service

   **Como gerar JWT_SECRET:**
   - Use: https://randomkeygen.com/
   - Ou gere: `openssl rand -base64 32`
   - Mínimo: 32 caracteres

6. Clique em **"Create Web Service"**

---

### 4. Executar Migrações do Banco

Após o primeiro deploy, você precisa rodar as migrações:

**Opção A: Via Render Shell (Recomendado)**
1. No Web Service, vá em **"Shell"**
2. Execute:
   ```bash
   npx prisma migrate deploy
   ```

**Opção B: Adicionar no Start Command**
Atualize o Start Command para:
```bash
npx prisma migrate deploy && npm start
```

---

### 5. Verificar Deploy

1. Aguarde o build completar (pode levar 2-5 minutos)
2. Verifique os logs:
   - Deve aparecer: "Prisma Client generated"
   - Deve aparecer: "Database connected"
   - Deve aparecer: "Server running on port..."
3. Teste o endpoint:
   - Acesse: `https://seu-servico.onrender.com/health`
   - Deve retornar: `{"status":"ok",...}`

---

## 🔧 Configurações Detalhadas

### Build Command
```
npm install && npx prisma generate && npm run build
```

**O que faz:**
- `npm install` - Instala dependências
- `npx prisma generate` - Gera Prisma Client
- `npm run build` - Compila TypeScript

### Start Command
```
npx prisma migrate deploy && npm start
```

**O que faz:**
- `npx prisma migrate deploy` - Aplica migrações
- `npm start` - Inicia o servidor

---

## 📋 Variáveis de Ambiente no Render

### Obrigatórias:

```
DATABASE_URL = postgresql://user:pass@host:port/db
JWT_SECRET = sua-chave-secreta-forte
NODE_ENV = production
CORS_ORIGIN = *
```

### Opcionais:

```
JWT_EXPIRES_IN = 7d
MAX_FILE_SIZE = 10485760
```

---

## 🔍 Como Obter DATABASE_URL do Render

### Método 1: Internal Database URL (Recomendado)
1. Vá no serviço **PostgreSQL**
2. Aba **"Connections"** ou **"Info"**
3. Copie **"Internal Database URL"**
4. Use essa URL no Web Service

### Método 2: Montar Manualmente
Se precisar montar manualmente:
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

Você encontra essas informações na aba **"Info"** do PostgreSQL.

---

## ✅ Checklist Completo

### Antes do Deploy:
- [ ] Conta Render criada
- [ ] Repositório conectado ao GitHub
- [ ] PostgreSQL criado
- [ ] DATABASE_URL anotada

### Configuração do Web Service:
- [ ] Nome do serviço definido
- [ ] Branch: `main`
- [ ] Build Command configurado
- [ ] Start Command configurado
- [ ] `DATABASE_URL` adicionada (Internal URL)
- [ ] `JWT_SECRET` adicionada (chave forte)
- [ ] `NODE_ENV=production` adicionada
- [ ] `CORS_ORIGIN=*` adicionada

### Após Deploy:
- [ ] Build completou com sucesso
- [ ] Migrações executadas (`npx prisma migrate deploy`)
- [ ] Logs mostram "Server running"
- [ ] `/health` endpoint funciona
- [ ] Banco de dados conectado

---

## 🐛 Troubleshooting

### Erro: "Build failed"
**Solução:**
- Verifique os logs completos
- Confirme que Build Command está correto
- Teste localmente: `npm run build`

### Erro: "Cannot connect to database"
**Solução:**
- Use **Internal Database URL** (não a externa)
- Verifique se PostgreSQL está rodando
- Confirme que `DATABASE_URL` está correta

### Erro: "Prisma Client not generated"
**Solução:**
- Adicione `npx prisma generate` no Build Command
- Verifique se `prisma/schema.prisma` existe

### Erro: "Port already in use"
**Solução:**
- Render define `PORT` automaticamente
- Use `process.env.PORT` no código (já está assim)

### Deploy lento
**Solução:**
- Normal no plano Free (pode levar 2-5 minutos)
- Após primeiro deploy, próximos são mais rápidos

---

## 🚀 Após Deploy Bem-Sucedido

### 1. Anotar URL do Backend
- Render gera uma URL: `https://seu-servico.onrender.com`
- Anote essa URL

### 2. Deploy do Frontend (Vercel)
1. Acesse: https://vercel.com
2. Importe o repositório `ProspertyCaixa`
3. Configure:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL` = URL do Render
4. Deploy!

### 3. Atualizar CORS
No Render, atualize `CORS_ORIGIN`:
- De `*` para `https://seu-frontend.vercel.app`

---

## 📊 Comparação Render vs Railway

| Recurso | Render | Railway |
|---------|--------|---------|
| **Facilidade** | ⭐⭐⭐ Muito fácil | ⭐⭐ Média |
| **PostgreSQL** | ✅ Gratuito incluído | ✅ Gratuito |
| **Interface** | ✅ Muito intuitiva | ⚠️ Pode confundir |
| **Deploy** | ✅ Automático | ✅ Automático |
| **Logs** | ✅ Claros | ✅ Claros |
| **Free Tier** | ✅ Generoso | ✅ Generoso |

---

## 💡 Dicas Importantes

1. **Use Internal Database URL:**
   - Mais rápido e seguro
   - Não precisa configurar firewall

2. **Plano Free:**
   - Serviços "dormem" após 15 min de inatividade
   - Primeira requisição pode demorar ~30s (spin-up)
   - Para produção, considere plano pago

3. **Auto-Deploy:**
   - Ative para deploy automático a cada push
   - Facilita muito o desenvolvimento

4. **Logs:**
   - Sempre verifique os logs após deploy
   - Render mostra logs em tempo real

---

## 🎯 Resumo Rápido

1. **Criar PostgreSQL** no Render
2. **Criar Web Service** conectado ao GitHub
3. **Configurar Build/Start commands**
4. **Adicionar variáveis de ambiente**
5. **Deploy automático!**
6. **Executar migrações** (via Shell ou Start Command)

---

## 📞 Próximos Passos

Depois que o backend estiver funcionando:
1. ✅ Anotar URL do Render
2. ✅ Deploy do frontend no Vercel
3. ✅ Atualizar CORS_ORIGIN
4. ✅ Testar tudo funcionando!

---

**Render é muito mais simples que Railway!** 🎉

