# 🚀 Como Fazer Deploy do Frontend

## 📍 Situação Atual

- ✅ **Backend (API)**: https://prospertycaixa-4.onrender.com (funcionando)
- ❌ **Frontend**: Precisa ser hospedado separadamente

---

## 🎯 Opção 1: Vercel (Recomendado - Mais Fácil)

### Passo a Passo:

1. **Acesse**: https://vercel.com
2. **Login** com GitHub
3. **New Project** → Import `ProspertyCaixa`
4. **Configure**:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://prospertycaixa-4.onrender.com
   ```

6. **Deploy!**

**Resultado**: Você terá uma URL como `https://prosperty-caixa.vercel.app`

---

## 🎯 Opção 2: Netlify

1. **Acesse**: https://netlify.com
2. **Login** com GitHub
3. **Add new site** → **Import from Git** → Selecione `ProspertyCaixa`
4. **Configure**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

5. **Environment Variables** (Site settings → Environment variables):
   ```
   VITE_API_URL=https://prospertycaixa-4.onrender.com
   ```

6. **Deploy!**

**Resultado**: Você terá uma URL como `https://prosperty-caixa.netlify.app`

---

## 🎯 Opção 3: Render (Static Site)

1. No Render, clique em **New** → **Static Site**
2. **Conecte** o repositório `ProspertyCaixa`
3. **Configure**:
   - **Name**: `prosperty-caixa-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://prospertycaixa-4.onrender.com
     ```

4. **Deploy!**

**Resultado**: Você terá uma URL como `https://prosperty-caixa-frontend.onrender.com`

---

## ⚙️ Configuração Necessária no Backend

### Atualizar CORS no Render:

1. No Render, vá em **Environment** do seu Web Service
2. Adicione/Atualize:
   ```
   CORS_ORIGIN=https://sua-url-frontend.vercel.app
   ```
   (ou a URL do Netlify/Render que você escolher)

3. **Redeploy** o backend

---

## 🔧 Configurar Axios no Frontend

O frontend precisa saber qual é a URL da API em produção. Vou criar um arquivo de configuração.

---

## 📝 Resumo

1. ✅ Backend já está no Render: https://prospertycaixa-4.onrender.com
2. ⏳ Escolha uma plataforma para o frontend (Vercel recomendado)
3. ⏳ Configure `VITE_API_URL` apontando para o backend
4. ⏳ Atualize `CORS_ORIGIN` no backend com a URL do frontend
5. ✅ Pronto! Acesse o site normalmente

---

## 🎉 Após o Deploy

Você terá:
- **Frontend**: `https://sua-url.vercel.app` (ou Netlify/Render)
- **Backend**: `https://prospertycaixa-4.onrender.com`

**Acesse o frontend normalmente!** Ele já está configurado para chamar o backend automaticamente.

