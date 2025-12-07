# 📝 Como Preencher o Formulário do Render

## ✅ Configurações Necessárias

### Primeira Tela (Configurações Básicas):

1. **Project (Optional):**
   - ✅ Pode deixar vazio ou criar um projeto

2. **Language:**
   - ✅ `Docker` (já está correto!)

3. **Branch:**
   - ✅ `main` (já está correto!)

4. **Region:**
   - ✅ `Oregon (US West)` (ou a que você escolher - já está correto!)

5. **Root Directory (Optional):**
   - ✅ Deixe **VAZIO** (já está correto!)

6. **Dockerfile Path:**
   - ⚠️ **MUDE:** De `.` para `./Dockerfile` ou `Dockerfile`
   - Isso é importante! O Render precisa saber onde está o Dockerfile

---

### Segunda Tela (Configurações Docker):

1. **Registry Credential:**
   - ✅ Deixe como `No credential` (já está correto!)

2. **Docker Build Context Directory:**
   - ✅ Deixe como `.` (já está correto!)

3. **Dockerfile Path:**
   - ⚠️ **MUDE:** De `.` para `./Dockerfile` ou `Dockerfile`
   - Mesmo ajuste da tela anterior

4. **Docker Command:**
   - ✅ Deixe **VAZIO** (o Dockerfile já tem o CMD)

5. **Pre-Deploy Command:**
   - ⚠️ **IMPORTANTE:** Adicione:
     ```
     npx prisma migrate deploy
     ```
   - Isso roda as migrações antes de iniciar o servidor
   - Se estiver com `$`, apague e coloque o comando acima

---

## 📋 Resumo do que Mudar

### Obrigatório:

1. **Dockerfile Path** (em ambas as telas):
   - De: `.`
   - Para: `./Dockerfile` ou `Dockerfile`

2. **Pre-Deploy Command:**
   - De: `$` (ou vazio)
   - Para: `npx prisma migrate deploy`

### Opcional (mas recomendado):

- **Project:** Pode criar um projeto para organizar (opcional)

---

## ✅ Checklist Final

- [ ] Dockerfile Path = `./Dockerfile` (em ambas as telas)
- [ ] Pre-Deploy Command = `npx prisma migrate deploy`
- [ ] Docker Command = (vazio)
- [ ] Root Directory = (vazio)
- [ ] Language = Docker
- [ ] Branch = main
- [ ] Variáveis de ambiente configuradas (DATABASE_URL, JWT_SECRET, etc.)

---

## 🎯 Por que essas mudanças?

1. **Dockerfile Path:**
   - O Render precisa saber exatamente onde está o Dockerfile
   - `.` pode não funcionar corretamente
   - `./Dockerfile` é o caminho explícito e correto

2. **Pre-Deploy Command:**
   - As migrações do Prisma precisam rodar antes do servidor iniciar
   - Isso cria todas as tabelas no banco de dados
   - Sem isso, o servidor pode falhar ao conectar

---

## 🚀 Após Configurar

1. Clique em **"Create Web Service"**
2. Aguarde o build (2-5 minutos)
3. Verifique os logs
4. Teste: `https://seu-servico.onrender.com/health`

---

## 💡 Dica

Se você já criou o serviço, pode editar essas configurações depois:
- Vá em **Settings** → **Build & Deploy**
- Ajuste o **Dockerfile Path**
- Ajuste o **Pre-Deploy Command**



