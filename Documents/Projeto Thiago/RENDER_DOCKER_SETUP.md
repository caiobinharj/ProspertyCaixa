# 🐳 Configuração Docker no Render

## ✅ Dockerfile Criado

Criei um `Dockerfile` que o Render vai usar automaticamente.

## 🔧 Configuração no Render

### Opção 1: Usar Docker (Recomendado - Automático)

O Render detecta o Dockerfile automaticamente. Configure assim:

1. **Runtime:** Deixe como `Docker` (ou `Auto-detect`)
2. **Build Command:** (deixe vazio - Dockerfile faz tudo)
3. **Start Command:** (deixe vazio - Dockerfile faz tudo)

### Opção 2: Usar Node.js (Alternativa)

Se preferir não usar Docker:

1. **Runtime:** `Node`
2. **Build Command:**
   ```
   npm install && npx prisma generate && npm run build
   ```
3. **Start Command:**
   ```
   npx prisma migrate deploy && npm start
   ```

---

## 📋 O que o Dockerfile faz

1. Usa Node.js 18
2. Instala dependências do sistema (openssl)
3. Copia `package.json` e `prisma/`
4. Instala dependências (`npm ci`)
5. Gera Prisma Client
6. Copia código fonte
7. Compila TypeScript
8. Expõe porta 3000
9. Inicia com `npm start`

---

## ✅ Após Push do Dockerfile

1. **Faça push** (já fizemos)
2. **No Render, faça Redeploy:**
   - Vá em "Manual Deploy" → "Deploy latest commit"
   - Ou aguarde auto-deploy (se ativado)

3. **O Render vai:**
   - Detectar o Dockerfile
   - Fazer build da imagem Docker
   - Iniciar o container

---

## 🔍 Verificar Deploy

Após o deploy:
- Acesse: `https://seu-servico.onrender.com/health`
- Deve retornar: `{"status":"ok",...}`

---

## 🐛 Se Ainda Der Erro

### Erro: "Dockerfile not found"
**Solução:**
- Confirme que o Dockerfile está na raiz do projeto
- Faça push novamente
- Faça redeploy no Render

### Erro: "Build failed"
**Solução:**
- Verifique os logs no Render
- Confirme que todas as variáveis estão configuradas
- Verifique se `DATABASE_URL` está correta

---

## 💡 Dica

O Dockerfile já está configurado e pronto. Basta fazer redeploy no Render após o push!



