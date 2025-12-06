# ✅ Checklist Pré-Deploy Railway

## 🔍 Antes de Fazer Deploy - Verifique Tudo!

### 1. 📦 Estrutura do Projeto ✅
- [x] `package.json` existe e está correto
- [x] `railway.json` configurado
- [x] `start.sh` criado
- [x] `.nvmrc` com versão do Node (18)
- [x] `tsconfig.json` configurado
- [x] `prisma/schema.prisma` existe

### 2. 🗄️ Banco de Dados PostgreSQL
- [ ] **PostgreSQL criado no Railway**
  - Vá em "+ New" → "Database" → "Add PostgreSQL"
  - Aguarde a criação
  - Anote a URL do banco

- [ ] **Migrações criadas localmente** (opcional, mas recomendado)
  ```powershell
  npx prisma migrate dev --name init
  ```
  Isso cria a pasta `prisma/migrations/` que será usada no deploy

### 3. 🔐 Variáveis de Ambiente
- [ ] `DATABASE_URL` - Copiada do PostgreSQL Railway
- [ ] `JWT_SECRET` - Chave forte gerada
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGIN=*` (ou URL do frontend)

### 4. 📝 Arquivos de Configuração

#### Verificar `package.json`:
- [x] `"engines"` especifica Node 18.x
- [x] `"build"` script: `"tsc"`
- [x] `"start"` script: `"npx prisma migrate deploy && node dist/server.js"`
- [x] `"postinstall"` script: `"npx prisma generate"`

#### Verificar `railway.json`:
- [x] Build command configurado
- [x] Start command configurado

### 5. 🧪 Testar Localmente (Recomendado)
- [ ] **Build funciona:**
  ```powershell
  npm run build
  ```
  Deve compilar TypeScript sem erros

- [ ] **Prisma Client gerado:**
  ```powershell
  npx prisma generate
  ```
  Deve gerar sem erros

- [ ] **Servidor inicia:**
  ```powershell
  npm start
  ```
  Deve iniciar na porta 3000

### 6. 📤 Git e Repositório
- [ ] **Tudo commitado:**
  ```powershell
  git status
  ```
  Não deve ter arquivos não commitados importantes

- [ ] **Push feito:**
  ```powershell
  git push
  ```
  Código atualizado no GitHub

### 7. 🚂 Configuração no Railway

#### No Serviço do Backend:
- [ ] **Build Command configurado:**
  ```
  npm ci && npx prisma generate && npm run build
  ```

- [ ] **Start Command configurado:**
  ```
  npm start
  ```

- [ ] **Variáveis de ambiente adicionadas** (veja RAILWAY_VARIABLES.md)

#### No Serviço PostgreSQL:
- [ ] PostgreSQL criado e rodando
- [ ] `DATABASE_URL` copiada

### 8. 🔧 Verificações Finais

- [ ] **`.gitignore` está correto:**
  - `node_modules/` está ignorado
  - `.env` está ignorado
  - `dist/` está ignorado (ou não, dependendo da estratégia)

- [ ] **Dependências no `package.json`:**
  - Todas as dependências necessárias estão listadas
  - Nenhuma dependência de desenvolvimento crítica está faltando

- [ ] **Porta configurada:**
  - O código usa `process.env.PORT || 3000`
  - Railway vai definir automaticamente

---

## 🚀 Ordem de Execução Recomendada

### Passo 1: Preparação Local
```powershell
# 1. Testar build
npm run build

# 2. Gerar Prisma Client
npx prisma generate

# 3. Testar servidor localmente (se tiver PostgreSQL local)
npm start
```

### Passo 2: Criar Migrações (Opcional mas Recomendado)
```powershell
# Se ainda não criou as migrações
npx prisma migrate dev --name init
```

### Passo 3: Commit e Push
```powershell
git add .
git commit -m "Ready for deployment"
git push
```

### Passo 4: No Railway
1. Criar PostgreSQL Database
2. Criar Web Service (conectar ao GitHub)
3. Configurar variáveis de ambiente
4. Configurar Build/Start commands
5. Fazer deploy

### Passo 5: Verificar
1. Ver logs do deploy
2. Testar `/health` endpoint
3. Verificar se banco está conectado

---

## ⚠️ Problemas Comuns e Soluções

### Erro: "Prisma Client not generated"
**Solução:** Adicione `npx prisma generate` no Build Command

### Erro: "Cannot find module"
**Solução:** Verifique se todas as dependências estão no `package.json`

### Erro: "Database connection failed"
**Solução:** 
- Verifique `DATABASE_URL`
- Certifique-se de que PostgreSQL está rodando
- Use a URL interna do Railway

### Erro: "Build failed"
**Solução:**
- Verifique os logs
- Teste `npm run build` localmente
- Verifique se TypeScript compila sem erros

### Erro: "Port already in use"
**Solução:** Railway define a porta automaticamente, não precisa configurar

---

## ✅ Checklist Final Antes de Deploy

- [ ] PostgreSQL criado no Railway
- [ ] `DATABASE_URL` copiada
- [ ] `JWT_SECRET` gerada e adicionada
- [ ] `NODE_ENV=production` adicionada
- [ ] `CORS_ORIGIN` configurada
- [ ] Build funciona localmente (`npm run build`)
- [ ] Prisma Client gera localmente (`npx prisma generate`)
- [ ] Código commitado e no GitHub
- [ ] Build Command configurado no Railway
- [ ] Start Command configurado no Railway
- [ ] Todas as variáveis adicionadas no Railway

**Se todos os itens estão ✅, pode fazer deploy!** 🚀

---

## 📞 Após o Deploy

1. **Verificar logs:**
   - Deve aparecer: "Prisma Client generated"
   - Deve aparecer: "Database connected"
   - Deve aparecer: "Server running on port..."

2. **Testar endpoints:**
   - `GET /health` → Deve retornar `{"status":"ok"}`
   - `GET /api/assets` → Deve retornar lista (ou erro de auth, que é normal)

3. **Verificar banco:**
   - As tabelas devem estar criadas
   - Pode verificar via Prisma Studio (localmente, conectando ao banco do Railway)

---

## 🎯 Resumo Rápido

**Mínimo necessário:**
1. ✅ PostgreSQL criado no Railway
2. ✅ Variáveis de ambiente configuradas
3. ✅ Código no GitHub
4. ✅ Build/Start commands configurados

**Recomendado:**
- Testar build localmente
- Criar migrações localmente
- Verificar logs após deploy

