# 🚀 Configurar Web Service no Railway - Guia Completo

## 📋 O que é o Web Service?

O **Web Service** é o serviço que roda seu código Node.js/backend. É aqui que você configura tudo relacionado à aplicação.

---

## 🔧 Configurações Necessárias no Web Service

### 1. 📦 Conectar ao Repositório GitHub

**Se ainda não conectou:**
1. No Railway, clique em **"+ New"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha o repositório: `ProspertyCaixa`
4. Railway vai criar um Web Service automaticamente

**Se já tem o serviço:**
- Verifique se está conectado ao repositório correto
- Settings → Source → Deve mostrar seu repositório

---

### 2. 🔐 Variáveis de Ambiente (OBRIGATÓRIO)

**Aba "Variables" → "+ New Variable"**

Adicione estas 4 variáveis:

#### Variável 1: DATABASE_URL
```
Name: DATABASE_URL
Value: postgresql://postgres:senha@host:port/database
```
**Como obter:**
- Vá no serviço **PostgreSQL Database**
- Aba "Variables"
- Copie o valor de `DATABASE_URL` (já vem configurado)
- Cole no Web Service

#### Variável 2: JWT_SECRET
```
Name: JWT_SECRET
Value: sua-chave-secreta-super-forte-aqui
```
**Como gerar:**
- Use: https://randomkeygen.com/ (escolha "CodeIgniter Encryption Keys")
- Ou gere: `openssl rand -base64 32`
- Mínimo: 32 caracteres

**Exemplo:**
```
JWT_SECRET=K8j#mP2$vL9@nQ5&wR7*tY3!uI6^oE4%aS1dF8gH0jK2lM4nO6pQ8rS0
```

#### Variável 3: NODE_ENV
```
Name: NODE_ENV
Value: production
```

#### Variável 4: CORS_ORIGIN
```
Name: CORS_ORIGIN
Value: *
```
**Nota:** Use `*` temporariamente. Quando tiver frontend, troque pela URL (ex: `https://seu-site.vercel.app`)

---

### 3. ⚙️ Build Settings

**Aba "Settings" → "Build"**

#### Build Command:
```bash
npm ci && npx prisma generate && npm run build
```

#### Start Command:
```bash
npm start
```

**Verifique também:**
- **Root Directory:** Deve estar vazio (ou `/` se tiver opção)
- **Watch Paths:** Pode deixar padrão

---

### 4. 🔄 Deploy Settings

**Aba "Settings" → "Deploy"**

- **Branch:** `main` (ou `master`)
- **Auto Deploy:** Ativado (recomendado)
- **Healthcheck Path:** `/health` (opcional, mas recomendado)

---

### 5. 📊 Health Check (Opcional mas Recomendado)

**Aba "Settings" → "Healthcheck"**

- **Path:** `/health`
- **Timeout:** 100 (segundos)

Isso ajuda o Railway a saber se seu servidor está funcionando.

---

## ✅ Checklist Completo do Web Service

### Variáveis de Ambiente:
- [ ] `DATABASE_URL` adicionada (copiada do PostgreSQL)
- [ ] `JWT_SECRET` adicionada (chave forte gerada)
- [ ] `NODE_ENV=production` adicionada
- [ ] `CORS_ORIGIN=*` adicionada
- [ ] Todas as variáveis **salvas**

### Build Settings:
- [ ] Build Command: `npm ci && npx prisma generate && npm run build`
- [ ] Start Command: `npm start`
- [ ] Root Directory verificado

### Deploy:
- [ ] Repositório conectado (`ProspertyCaixa`)
- [ ] Branch correta (`main`)
- [ ] Auto Deploy ativado (opcional)

### Health Check:
- [ ] Healthcheck Path: `/health` (opcional)

---

## 🚀 Após Configurar Tudo

### 1. Salvar Tudo
- Certifique-se de que todas as variáveis foram salvas
- Verifique se os Build/Start commands estão salvos

### 2. Fazer Deploy
- Vá em **"Deployments"**
- Clique em **"Deploy"** ou **"Redeploy"**
- Aguarde o build completar

### 3. Verificar Logs
- Durante o build, veja os logs
- Deve aparecer:
  ```
  ✅ npm ci (instalando dependências)
  ✅ Prisma Client generated
  ✅ TypeScript compilando
  ✅ Build completed
  ```

### 4. Verificar se Funcionou
- Após o deploy, acesse: `https://sua-url.railway.app/health`
- Deve retornar:
  ```json
  {
    "status": "ok",
    "timestamp": "...",
    "service": "Prosperty Brazil API"
  }
  ```

---

## 🐛 Troubleshooting

### Erro: "Build failed"
**Verifique:**
- Build Command está correto?
- Todas as variáveis estão configuradas?
- Logs mostram algum erro específico?

### Erro: "Cannot connect to database"
**Verifique:**
- `DATABASE_URL` está correta?
- PostgreSQL está rodando?
- URL foi copiada completa do PostgreSQL?

### Erro: "JWT_SECRET not found"
**Verifique:**
- Variável está no **Web Service** (não no projeto)?
- Nome está exatamente: `JWT_SECRET` (maiúsculas)?
- Valor foi salvo?

### Deploy não inicia
**Verifique:**
- Repositório está conectado?
- Branch está correta?
- Código foi feito push para GitHub?

---

## 📝 Resumo Rápido

**No Web Service, configure:**

1. **Variables:**
   - `DATABASE_URL` (do PostgreSQL)
   - `JWT_SECRET` (chave forte)
   - `NODE_ENV=production`
   - `CORS_ORIGIN=*`

2. **Build Command:**
   ```
   npm ci && npx prisma generate && npm run build
   ```

3. **Start Command:**
   ```
   npm start
   ```

4. **Deploy!**

---

## 🎯 Próximos Passos

Depois que o backend estiver funcionando:

1. **Anote a URL do backend** (ex: `https://prosperty-backend.railway.app`)
2. **Deploy do frontend no Vercel:**
   - Use a URL do Railway como `VITE_API_URL`
3. **Atualize CORS_ORIGIN** no Railway com a URL do Vercel

---

## 💡 Dica Final

Se algo der errado:
1. **Veja os logs completos** (aba "Deployments" → "View Logs")
2. **Verifique cada variável** individualmente
3. **Teste o build localmente** primeiro: `npm run build`



