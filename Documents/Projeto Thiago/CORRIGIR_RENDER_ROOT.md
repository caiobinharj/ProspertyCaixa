# 🔧 Corrigir Erro: package.json não encontrado no Render

## ❌ Problema

O Render está procurando em `/opt/render/project/src/package.json` mas o arquivo está na raiz.

## ✅ Solução

### No Render, verifique estas configurações:

1. **Root Directory:**
   - Deve estar **VAZIO** ou **`.`**
   - **NÃO** coloque `src` ou qualquer outro caminho

2. **Build Command:**
   ```
   npm install && npx prisma generate && npm run build
   ```

3. **Start Command:**
   ```
   npx prisma migrate deploy && npm start
   ```

---

## 🔍 Verificações

### 1. Root Directory está correto?

No Render, Settings → Build & Deploy:
- **Root Directory:** Deve estar **VAZIO** ou **`.`**
- Se estiver com `src` ou outro caminho, **APAGUE** e deixe vazio

### 2. Estrutura do Repositório

O `package.json` deve estar na **raiz** do repositório, não em subpastas.

Estrutura correta:
```
ProspertyCaixa/
├── package.json  ← Deve estar aqui (raiz)
├── src/
├── prisma/
└── ...
```

---

## 🚀 Passo a Passo para Corrigir

### 1. No Render, vá em Settings

### 2. Verifique Root Directory:
- Se tiver algo escrito (ex: `src`), **APAGUE**
- Deixe **completamente vazio**

### 3. Verifique Build Command:
```
npm install && npx prisma generate && npm run build
```

### 4. Verifique Start Command:
```
npx prisma migrate deploy && npm start
```

### 5. Salve e faça Redeploy

---

## 🐛 Se Ainda Não Funcionar

### Opção 1: Deletar e Recriar

1. **Delete o Web Service** no Render
2. **Crie um novo:**
   - "+ New" → "Web Service"
   - Conecte o repositório
   - **Root Directory:** Deixe VAZIO
   - Configure os comandos
   - Adicione variáveis

### Opção 2: Verificar Estrutura do Git

O problema pode ser que o repositório tem uma estrutura estranha. Verifique:

```bash
git ls-files | Select-String package.json
```

Deve mostrar: `package.json` (na raiz)

---

## ✅ Checklist

- [ ] Root Directory está **VAZIO** (não `src`, não `.`, completamente vazio)
- [ ] Build Command está correto
- [ ] Start Command está correto
- [ ] `package.json` está na raiz do repositório
- [ ] Redeploy feito após corrigir

---

## 💡 Dica Importante

O Render procura o `package.json` na raiz do repositório (ou no Root Directory se configurado). Se você colocar `src` no Root Directory, ele vai procurar em `src/package.json`, que não existe.

**Solução: Root Directory = VAZIO!**



