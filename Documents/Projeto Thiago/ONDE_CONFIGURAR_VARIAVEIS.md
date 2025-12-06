# 📍 Onde Configurar Variáveis no Railway

## ⚠️ Problema Comum

Você pode ter configurado no lugar errado! O Railway tem diferentes níveis de configuração.

## ✅ Onde Configurar CORRETAMENTE

### ❌ NÃO configure aqui:
- No **projeto/repositório** geral
- No **card do repositório**
- No **PostgreSQL Database**

### ✅ Configure AQUI:
- No **serviço do backend** (Web Service)

---

## 🔍 Como Encontrar o Lugar Certo

### Passo 1: Identificar o Serviço
1. No Railway, você deve ter **2 serviços**:
   - **PostgreSQL Database** (banco de dados)
   - **Web Service** ou **Backend** (seu código Node.js)

### Passo 2: Abrir o Serviço Correto
1. Clique no **serviço do backend** (não no PostgreSQL)
2. Deve aparecer uma tela com abas: **Deployments**, **Variables**, **Settings**, etc.

### Passo 3: Configurar Variáveis
1. Clique na aba **"Variables"**
2. Você deve ver uma lista de variáveis (pode estar vazia)
3. Clique em **"+ New Variable"** ou **"Add Variable"**
4. Adicione cada variável

---

## 📋 Variáveis que DEVEM estar no Backend

No serviço do **backend** (Web Service), adicione:

```
DATABASE_URL = (copie do PostgreSQL)
JWT_SECRET = seu-token-aleatorio-aqui
NODE_ENV = production
CORS_ORIGIN = *
```

---

## 🔍 Como Verificar se Está Correto

### Verificação 1: Localização
- ✅ Variáveis estão no **serviço do backend** (não no projeto geral)
- ✅ Aba "Variables" do serviço específico

### Verificação 2: Nomes Corretos
- ✅ `JWT_SECRET` (exatamente assim, maiúsculas)
- ✅ `DATABASE_URL` (exatamente assim)
- ✅ `NODE_ENV` (exatamente assim)
- ✅ `CORS_ORIGIN` (exatamente assim)

### Verificação 3: Valores
- ✅ `JWT_SECRET` tem um valor (não está vazio)
- ✅ `DATABASE_URL` copiada do PostgreSQL
- ✅ `NODE_ENV` = `production` (exatamente assim)

---

## 🐛 Problemas Comuns

### Problema 1: "Defini no projeto, não no serviço"
**Solução:** Variáveis devem estar no **serviço do backend**, não no projeto geral.

### Problema 2: "Nome errado"
**Solução:** Use exatamente: `JWT_SECRET` (não `jwt_secret`, não `JWT_SECRET_KEY`)

### Problema 3: "Não salvei"
**Solução:** Após adicionar, certifique-se de clicar em **"Save"** ou **"Add"**

### Problema 4: "Defini no PostgreSQL"
**Solução:** Variáveis do backend devem estar no **serviço do backend**, não no PostgreSQL.

---

## 🎯 Passo a Passo Visual

```
Railway Dashboard
└── Seu Projeto
    ├── PostgreSQL Database ← NÃO configure aqui
    │   └── Variables (só DATABASE_URL interna)
    │
    └── Web Service / Backend ← ✅ CONFIGURE AQUI!
        └── Variables ← Clique aqui!
            ├── DATABASE_URL = ...
            ├── JWT_SECRET = ...
            ├── NODE_ENV = production
            └── CORS_ORIGIN = *
```

---

## ✅ Checklist de Verificação

- [ ] Estou no **serviço do backend** (não no PostgreSQL)
- [ ] Estou na aba **"Variables"**
- [ ] `JWT_SECRET` está adicionada
- [ ] `DATABASE_URL` está adicionada (copiada do PostgreSQL)
- [ ] `NODE_ENV=production` está adicionada
- [ ] `CORS_ORIGIN=*` está adicionada
- [ ] Todas as variáveis foram **salvas**
- [ ] Fiz **Redeploy** após adicionar

---

## 🚀 Após Configurar Corretamente

1. **Salve todas as variáveis**
2. **Faça Redeploy:**
   - Vá em "Deployments"
   - Clique em "Redeploy" ou "Deploy"
3. **Verifique os logs:**
   - Deve aparecer: "Prisma Client generated"
   - Deve aparecer: "Database connected"
   - Não deve aparecer: "secret JWT_SECRET: not found"

---

## 💡 Dica

Se ainda der erro após configurar corretamente:
1. Verifique os **logs completos** do build
2. Confirme que as variáveis aparecem na lista
3. Tente **deletar e recriar** o serviço (último recurso)

