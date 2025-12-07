# 🔧 Solução: Erro "secret JWT_SECRET: not found"

## ❌ Problema

O Railway está falhando no build com o erro:
```
secret JWT_SECRET: not found
```

## 🔍 Causa

O Railway está tentando usar variáveis de ambiente durante o build, mas elas ainda não foram configuradas.

## ✅ Solução

### Opção 1: Configurar Variáveis ANTES do Build (Recomendado)

1. **No Railway, vá no seu serviço do backend**
2. **Aba "Variables"**
3. **Adicione as variáveis OBRIGATÓRIAS:**
   - `JWT_SECRET` = (gere uma chave forte)
   - `DATABASE_URL` = (copie do PostgreSQL)
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `*`

4. **Depois faça Redeploy**

### Opção 2: Ajustar Build Command

Se ainda der erro, modifique o Build Command no Railway:

**Settings → Build → Build Command:**
```bash
npm ci && npx prisma generate && npm run build
```

E certifique-se de que as variáveis estão configuradas.

### Opção 3: Usar Valores Padrão no Código

O código já tem valores padrão (`|| 'default-secret'`), mas o Railway pode estar exigindo que as variáveis existam.

---

## 📋 Passo a Passo Completo

### 1. Criar PostgreSQL (se ainda não fez)
- "+ New" → "Database" → "Add PostgreSQL"
- Aguarde criação

### 2. Configurar TODAS as Variáveis
No serviço do backend, aba "Variables":

```
DATABASE_URL = (copie do PostgreSQL)
JWT_SECRET = uma-chave-secreta-forte-aqui-mude-isso
NODE_ENV = production
CORS_ORIGIN = *
```

### 3. Verificar Build Command
Settings → Build:
- Build Command: `npm ci && npx prisma generate && npm run build`
- Start Command: `npm start`

### 4. Fazer Redeploy
- Clique em "Redeploy" ou "Deploy"

---

## ⚠️ Importante

- As variáveis de ambiente DEVEM estar configuradas ANTES do build
- O Railway precisa delas para processar o código
- Mesmo que o código tenha valores padrão, o Railway pode exigir que as variáveis existam

---

## 🎯 Checklist

- [ ] PostgreSQL criado
- [ ] DATABASE_URL configurada
- [ ] JWT_SECRET configurada (OBRIGATÓRIA!)
- [ ] NODE_ENV=production configurada
- [ ] CORS_ORIGIN configurada
- [ ] Build Command verificado
- [ ] Redeploy feito

---

## 🔍 Se Ainda Der Erro

1. **Verifique os logs completos** no Railway
2. **Confirme que todas as variáveis estão salvas**
3. **Tente deletar e recriar o serviço** (último recurso)



