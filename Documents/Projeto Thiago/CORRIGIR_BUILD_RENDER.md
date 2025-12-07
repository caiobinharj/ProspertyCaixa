# 🔧 Corrigir Build Command no Render

## ❌ Problema

O TypeScript não encontra os tipos porque `devDependencies` não estão sendo instaladas.

## ✅ Solução

### No Render, atualize o Build Command:

**Build Command:**
```
npm ci --include=dev && npx prisma generate && npm run build
```

**OU** (alternativa):
```
npm install --include=dev && npx prisma generate && npm run build
```

O `--include=dev` garante que as dependências de desenvolvimento (incluindo @types/*) sejam instaladas.

---

## 🔧 Configuração Completa no Render

### Settings → Build & Deploy:

1. **Root Directory:**
   ```
   Documents/Projeto Thiago
   ```

2. **Build Command:**
   ```
   npm ci --include=dev && npx prisma generate && npm run build
   ```

3. **Start Command:**
   ```
   npx prisma migrate deploy && npm start
   ```

4. **Language:**
   ```
   Node
   ```

---

## 📋 Por que isso funciona

- `npm ci --include=dev` instala TODAS as dependências, incluindo devDependencies
- Isso garante que `@types/express`, `@types/node`, etc. sejam instalados
- O TypeScript consegue encontrar os tipos

---

## ✅ Checklist

- [ ] Build Command atualizado com `--include=dev`
- [ ] Root Directory = `Documents/Projeto Thiago`
- [ ] Start Command configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Redeploy feito

---

## 🚀 Após Atualizar

1. **Salve as configurações**
2. **Faça Redeploy**
3. **Aguarde o build** (deve funcionar agora!)

---

**A solução é adicionar `--include=dev` no Build Command!**



