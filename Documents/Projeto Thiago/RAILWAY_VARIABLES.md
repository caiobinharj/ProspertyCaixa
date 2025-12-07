# 🔐 Variáveis de Ambiente para Railway

## 📋 Variáveis Obrigatórias

### 1. **DATABASE_URL** ⭐ OBRIGATÓRIA
```
DATABASE_URL=postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```
**Como obter:**
- No Railway, vá no serviço **PostgreSQL Database**
- Clique na aba **"Variables"**
- Copie o valor de `DATABASE_URL` (já vem configurado automaticamente)
- **OU** copie de `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` e monte a URL

**Formato completo:**
```
postgresql://[usuário]:[senha]@[host]:[porta]/[database]?schema=public
```

---

### 2. **JWT_SECRET** ⭐ OBRIGATÓRIA
```
JWT_SECRET=sua-chave-secreta-super-forte-aqui-mude-isso
```
**Como gerar uma chave forte:**
- Use um gerador online: https://randomkeygen.com/
- Ou gere no terminal: `openssl rand -base64 32`
- **Importante**: Use uma chave longa e aleatória (mínimo 32 caracteres)

**Exemplo:**
```
JWT_SECRET=K8j#mP2$vL9@nQ5&wR7*tY3!uI6^oE4%aS1
```

---

### 3. **NODE_ENV** ⭐ OBRIGATÓRIA
```
NODE_ENV=production
```
**Valor fixo:** `production`

---

### 4. **PORT** (Opcional - Railway define automaticamente)
```
PORT=3000
```
**Nota:** O Railway geralmente define isso automaticamente, mas você pode especificar.

---

### 5. **CORS_ORIGIN** ⭐ IMPORTANTE
```
CORS_ORIGIN=https://seu-frontend.vercel.app
```
**O que colocar:**
- Se ainda não tem frontend: `*` (permite qualquer origem - apenas para testes)
- Quando tiver frontend no Vercel: `https://seu-site.vercel.app`
- Para múltiplos domínios: `https://site1.com,https://site2.com`

**Exemplo temporário (desenvolvimento):**
```
CORS_ORIGIN=*
```

---

## 📋 Variáveis Opcionais (mas recomendadas)

### 6. **JWT_EXPIRES_IN**
```
JWT_EXPIRES_IN=7d
```
**Valores comuns:**
- `7d` = 7 dias
- `24h` = 24 horas
- `1h` = 1 hora

---

### 7. **MAX_FILE_SIZE**
```
MAX_FILE_SIZE=10485760
```
**Valor:** Tamanho máximo de upload em bytes (10MB = 10485760)

---

### 8. **UPLOAD_DIR**
```
UPLOAD_DIR=./uploads
```
**Nota:** No Railway, considere usar storage externo (S3, etc.)

---

## 🔧 Como Configurar no Railway

### Passo 1: Acessar Variáveis
1. No Railway, vá no seu **serviço do backend** (não no PostgreSQL)
2. Clique na aba **"Variables"**
3. Clique em **"+ New Variable"**

### Passo 2: Adicionar Cada Variável

**Variável 1:**
- **Name:** `DATABASE_URL`
- **Value:** (Copie do serviço PostgreSQL)

**Variável 2:**
- **Name:** `JWT_SECRET`
- **Value:** (Gere uma chave forte - veja acima)

**Variável 3:**
- **Name:** `NODE_ENV`
- **Value:** `production`

**Variável 4:**
- **Name:** `CORS_ORIGIN`
- **Value:** `*` (temporário) ou URL do seu frontend

**Variável 5:**
- **Name:** `JWT_EXPIRES_IN`
- **Value:** `7d`

### Passo 3: Verificar
Após adicionar todas, você deve ver:
```
✅ DATABASE_URL
✅ JWT_SECRET
✅ NODE_ENV
✅ CORS_ORIGIN
✅ JWT_EXPIRES_IN
```

---

## 📝 Exemplo Completo de Configuração

No Railway, suas variáveis devem ficar assim:

```
DATABASE_URL=postgresql://postgres:abc123@containers-us-west-123.railway.app:5432/railway
JWT_SECRET=K8j#mP2$vL9@nQ5&wR7*tY3!uI6^oE4%aS1dF8gH0jK2lM4nO6pQ8rS0
NODE_ENV=production
PORT=3000
CORS_ORIGIN=*
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=10485760
```

---

## ⚠️ Importante

### Segurança:
- ✅ **NUNCA** compartilhe o `JWT_SECRET` publicamente
- ✅ **NUNCA** faça commit do `.env` no Git
- ✅ Use `CORS_ORIGIN=*` apenas para testes
- ✅ Em produção, use a URL específica do frontend

### DATABASE_URL:
- ✅ O Railway cria automaticamente quando você adiciona PostgreSQL
- ✅ Copie do serviço PostgreSQL, não crie manualmente
- ✅ A URL já inclui usuário, senha, host e porta

---

## 🚀 Após Configurar

1. **Salve todas as variáveis**
2. **Faça Redeploy** no Railway
3. **Verifique os logs** para confirmar que está funcionando
4. **Teste:** Acesse `https://sua-url.railway.app/health`

---

## 🔍 Como Verificar se Está Funcionando

### 1. Verificar Logs:
No Railway, vá em **"Deployments"** → **"View Logs"**

Deve aparecer:
```
✅ Prisma Client generated
✅ Database connected successfully
✅ Server running on port 3000
```

### 2. Testar API:
Acesse: `https://sua-url.railway.app/health`

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "service": "Prosperty Brazil API"
}
```

---

## 🐛 Troubleshooting

### Erro: "Can't reach database"
- ✅ Verifique se `DATABASE_URL` está correto
- ✅ Certifique-se de que o PostgreSQL está rodando
- ✅ Use a URL do serviço PostgreSQL do Railway

### Erro: "JWT_SECRET is required"
- ✅ Adicione a variável `JWT_SECRET`
- ✅ Use uma chave forte (mínimo 32 caracteres)

### Erro: "CORS policy"
- ✅ Verifique `CORS_ORIGIN`
- ✅ Use `*` temporariamente para testes
- ✅ Em produção, use a URL específica do frontend

---

## 📞 Próximos Passos

Depois de configurar as variáveis:
1. ✅ Faça redeploy
2. ✅ Verifique os logs
3. ✅ Teste o endpoint `/health`
4. ✅ Configure o frontend no Vercel
5. ✅ Atualize `CORS_ORIGIN` com a URL do Vercel



