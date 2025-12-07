# 🚂 Deploy no Railway - Guia Completo

## ⚠️ Problema Resolvido

O Railway estava tendo dificuldade para detectar o projeto. Agora adicionei:
- ✅ `railway.json` - Configuração do Railway
- ✅ `railway.toml` - Configuração alternativa
- ✅ `nixpacks.toml` - Configuração do builder
- ✅ `Procfile` - Comando de start
- ✅ `.nvmrc` - Versão do Node.js
- ✅ Scripts atualizados no `package.json`

## 📋 Passo a Passo para Deploy

### 1. Fazer Push das Correções

```powershell
git add .
git commit -m "Add Railway configuration files"
git push
```

### 2. No Railway

1. **Acesse**: https://railway.app
2. **Login** com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Selecione**: `ProspertyCaixa`
5. **Aguarde** o Railway detectar (deve mostrar "Node.js" agora)

### 3. Adicionar PostgreSQL

1. No projeto Railway, clique em **"+ New"**
2. Selecione **"Database"** → **"Add PostgreSQL"**
3. Aguarde a criação
4. **Anote a URL** do banco (aparece na aba "Variables")

### 4. Configurar Variáveis de Ambiente

No serviço do backend, vá em **"Variables"** e adicione:

```
DATABASE_URL=<URL do PostgreSQL que você anotou>
JWT_SECRET=uma-chave-secreta-muito-forte-aqui-mude-isso
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://seu-frontend.vercel.app
```

**Importante**: 
- Substitua `<URL do PostgreSQL>` pela URL real do banco
- Use uma chave JWT forte (pode gerar com: `openssl rand -base64 32`)

### 5. Configurar Build Settings

No Railway, vá em **"Settings"** → **"Build"**:

- **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
- **Start Command**: `npm start`

### 6. Deploy

1. O Railway deve fazer deploy automático
2. Aguarde o build completar
3. Anote a URL gerada (ex: `https://prosperty-backend.railway.app`)

### 7. Verificar Deploy

Acesse: `https://sua-url.railway.app/health`

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "Prosperty Brazil API"
}
```

## 🔧 Troubleshooting

### Erro: "Railpack could not determine how to build"
- ✅ **Resolvido**: Adicionei `railway.json` e `nixpacks.toml`
- Faça push novamente e tente de novo

### Erro: "Prisma Client not generated"
- O Railway deve executar `npx prisma generate` automaticamente
- Se não funcionar, adicione no Build Command: `npm install && npx prisma generate`

### Erro: "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o PostgreSQL foi criado
- Use a **Internal Database URL** (não a pública)

### Build falha
- Verifique os logs no Railway
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se o TypeScript compila: `npm run build`

## 📝 Próximos Passos

Depois que o backend estiver no ar:

1. **Anote a URL do backend** (ex: `https://prosperty-backend.railway.app`)
2. **Deploy do frontend no Vercel**:
   - Use a URL do Railway como `VITE_API_URL`
3. **Atualize CORS** no Railway com a URL do Vercel

## ✅ Checklist

- [ ] Push das correções feito
- [ ] Projeto criado no Railway
- [ ] PostgreSQL adicionado
- [ ] Variáveis de ambiente configuradas
- [ ] Build Command configurado
- [ ] Deploy bem-sucedido
- [ ] Health check funcionando
- [ ] Frontend configurado no Vercel



