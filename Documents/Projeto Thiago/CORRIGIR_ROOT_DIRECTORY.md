# 🔧 Corrigir Root Directory no Render

## ❌ Problema Identificado

O repositório Git tem os arquivos dentro de `Documents/Projeto Thiago/`, não na raiz!

Quando o Render clona, os arquivos ficam em:
```
/opt/render/project/Documents/Projeto Thiago/package.json
```

Mas o Render está procurando em:
```
/opt/render/project/package.json
```

## ✅ Solução

### No Render, configure o Root Directory:

**Root Directory:**
```
Documents/Projeto Thiago
```

**OU** (se não funcionar):
```
Documents/Projeto Thiago/
```

---

## 🔧 Configuração Completa no Render

### Settings → Build & Deploy:

1. **Root Directory:**
   ```
   Documents/Projeto Thiago
   ```

2. **Build Command:**
   ```
   npm install && npx prisma generate && npm run build
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

## 🔍 Como Verificar

No histórico do Git, os arquivos aparecem como:
```
Documents/Projeto Thiago/package.json
Documents/Projeto Thiago/src/...
```

Por isso o Root Directory precisa apontar para essa pasta!

---

## ✅ Checklist

- [ ] Root Directory = `Documents/Projeto Thiago`
- [ ] Build Command configurado
- [ ] Start Command configurado
- [ ] Language = Node
- [ ] Variáveis de ambiente configuradas
- [ ] Redeploy feito

---

## 🚀 Após Configurar

1. **Salve as configurações**
2. **Faça Redeploy**
3. **Aguarde o build**
4. **Teste:** `https://seu-servico.onrender.com/health`

---

## 💡 Alternativa: Reorganizar Repositório

Se quiser evitar isso no futuro, você pode reorganizar o repositório para que os arquivos fiquem na raiz. Mas por enquanto, usar o Root Directory é mais rápido!

---

**A solução é simples: Root Directory = `Documents/Projeto Thiago`**

