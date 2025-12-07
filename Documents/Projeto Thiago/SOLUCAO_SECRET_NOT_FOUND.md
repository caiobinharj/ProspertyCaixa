# 🔧 Solução: "secret JWT_SECRET: not found"

## ❌ Problema

Mesmo configurando no Web Service, o erro persiste:
```
ERROR: failed to build: failed to solve: secret JWT_SECRET: not found
```

## 🔍 Possíveis Causas

1. **Railway está procurando como "Secret" em vez de "Variable"**
2. **Variável não está sendo reconhecida durante o build**
3. **Railway precisa de configuração especial para secrets**

---

## ✅ Soluções (Tente nesta ordem)

### Solução 1: Verificar se a Variável Está Salva Corretamente

1. No Web Service, vá em **"Variables"**
2. **Confirme que `JWT_SECRET` aparece na lista**
3. **Clique na variável** para ver se o valor está lá
4. Se não estiver, **adicione novamente** e **salve**

### Solução 2: Usar "Secrets" em vez de "Variables"

Alguns Railway usam "Secrets" separado:

1. No Web Service, procure por **"Secrets"** (pode estar em Settings)
2. Adicione `JWT_SECRET` como **Secret**
3. Ou use a opção **"Add Secret"** se disponível

### Solução 3: Remover Referência no Build (Temporário)

O problema pode ser que o Railway está tentando usar durante o build. Vamos ajustar:

**Opção A: Remover do Build Command**

No Railway, Settings → Build:
- **Build Command:** `npm ci && npx prisma generate && npm run build`
- **Não use variáveis no build command**

**Opção B: Usar Valor Padrão no Código**

O código já tem `|| 'default-secret'`, mas vamos garantir que funcione.

### Solução 4: Verificar Nome Exato

Certifique-se de que o nome está **exatamente** assim:
- ✅ `JWT_SECRET` (maiúsculas, sem espaços)
- ❌ `jwt_secret`
- ❌ `JWT_SECRET_KEY`
- ❌ `JWT_SECRET ` (com espaço)

### Solução 5: Adicionar Todas as Variáveis Obrigatórias

O Railway pode estar exigindo todas de uma vez. Adicione:

```
DATABASE_URL = (do PostgreSQL)
JWT_SECRET = sua-chave-forte
NODE_ENV = production
CORS_ORIGIN = *
```

**Todas devem estar no Web Service, não no projeto geral.**

### Solução 6: Deletar e Recriar o Serviço

Se nada funcionar:

1. **Delete o Web Service** (não o PostgreSQL!)
2. **Crie um novo:**
   - "+ New" → "Deploy from GitHub repo"
   - Escolha `ProspertyCaixa`
3. **Configure tudo novamente:**
   - Variáveis primeiro
   - Build/Start commands
   - Deploy

---

## 🔍 Verificação Passo a Passo

### 1. Verificar Localização
- [ ] Estou no **Web Service** (não no PostgreSQL)
- [ ] Estou na aba **"Variables"** (não "Settings")
- [ ] Vejo a lista de variáveis

### 2. Verificar Variável
- [ ] `JWT_SECRET` aparece na lista
- [ ] Nome está exatamente: `JWT_SECRET` (maiúsculas)
- [ ] Tem um valor (não está vazio)
- [ ] Foi salva (não está em modo de edição)

### 3. Verificar Outras Variáveis
- [ ] `DATABASE_URL` está configurada
- [ ] `NODE_ENV=production` está configurada
- [ ] `CORS_ORIGIN=*` está configurada

### 4. Verificar Build Command
- [ ] Build Command: `npm ci && npx prisma generate && npm run build`
- [ ] Não tem referências a variáveis no comando
- [ ] Start Command: `npm start`

---

## 🎯 Solução Rápida (Tente Primeiro)

### Passo 1: Deletar e Recriar a Variável

1. No Web Service → Variables
2. **Delete** `JWT_SECRET` (se existir)
3. **Adicione novamente:**
   - Name: `JWT_SECRET` (exatamente assim)
   - Value: `sua-chave-super-forte-aqui` (mínimo 32 caracteres)
4. **Salve**

### Passo 2: Verificar se Aparece na Lista

- A variável deve aparecer na lista de Variables
- Deve mostrar o nome e um indicador de que tem valor

### Passo 3: Fazer Redeploy

- Vá em "Deployments"
- Clique em "Redeploy"
- Aguarde

---

## 💡 Dica: Gerar Chave Forte

Use este comando (ou online):
```bash
openssl rand -base64 32
```

Ou use: https://randomkeygen.com/

**Exemplo de chave válida:**
```
K8j#mP2$vL9@nQ5&wR7*tY3!uI6^oE4%aS1dF8gH0jK2lM4nO6pQ8rS0
```

---

## 🐛 Se Ainda Não Funcionar

### Verificar Logs Completos

1. Vá em "Deployments"
2. Clique no deploy que falhou
3. Veja os logs completos
4. Procure por mensagens específicas sobre `JWT_SECRET`

### Contatar Suporte Railway

Se nada funcionar, pode ser um bug do Railway. Nesse caso:
1. Verifique a documentação: https://docs.railway.app
2. Ou contate o suporte do Railway

---

## ✅ Checklist Final

- [ ] Variável `JWT_SECRET` está no **Web Service** (não no projeto)
- [ ] Nome está exatamente: `JWT_SECRET` (maiúsculas)
- [ ] Tem um valor (não vazio)
- [ ] Foi salva corretamente
- [ ] Todas as outras variáveis também estão configuradas
- [ ] Build Command não referencia variáveis
- [ ] Redeploy foi feito após configurar

---

## 🚀 Alternativa: Usar Valor Padrão Temporário

Se o problema persistir, podemos modificar o código para não exigir a variável durante o build. Mas isso não é ideal para produção.



