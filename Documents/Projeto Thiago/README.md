# 🏢 Prosperty Brazil - Plataforma de Tecnologia Imobiliária

**Prosperty Brazil** é uma plataforma completa de tecnologia imobiliária desenvolvida para a **CAIXA** e o mercado B2C, oferecendo soluções integradas para gestão de ativos, leilões, CRM, inteligência de dados e muito mais.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Features Implementadas](#features-implementadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura da API](#estrutura-da-api)
- [Autenticação](#autenticação)
- [Como Testar as Requisições](#como-testar-as-requisições)
- [Deploy](#deploy)

---

## 🎯 Sobre o Projeto

O **Prosperty Brazil** é uma plataforma full-stack que integra múltiplos módulos para gestão completa do ciclo de vida de imóveis, desde a aquisição até a venda, passando por leilões, avaliações automatizadas e gestão de relacionamento com clientes.

### Principais Objetivos:

- ✅ Gestão completa de ativos imobiliários da CAIXA
- ✅ Sistema de leilões online com registro e lances
- ✅ CRM integrado para gestão de leads e agentes
- ✅ Ferramentas de inteligência de dados (AVM, relatórios de área)
- ✅ Portal B2C para investidores e compradores
- ✅ Sistema de assinaturas e créditos

---

## ✨ Features Implementadas

### 1. 🔐 **Autenticação e Autorização**
- Registro de usuários com diferentes roles
- Login com JWT
- Perfis de usuário (Agente, CAIXA Admin, CAIXA Operator, etc.)
- Middleware de autenticação e autorização baseado em roles

### 2. 🏠 **Gestão de Ativos (Assets)**
- CRUD completo de imóveis
- Upload de documentos e mídia (fotos, vídeos, tours virtuais)
- Classificação por tipo (REO, Leilão Judicial, Habitação Social, etc.)
- Status de rastreamento (Pré-Leilão, Venda Ativa, Vendido, etc.)
- Informações detalhadas (localização, características, valores)

### 3. 🔨 **Sistema de Leilões**
- Criação e gestão de leilões
- Registro de participantes com KYC
- Sistema de lances em tempo real
- Tipos de leilão (Inglês, Holandês, Sealed Bid, Híbrido)
- Rastreamento de lances e participantes

### 4. 📊 **CRM e Gestão de Leads**
- Criação e gestão de leads
- Atribuição de leads a agentes
- Rastreamento de status (Novo, Contatado, Qualificado, Convertido, etc.)
- Priorização de leads
- Histórico de interações

### 5. 👥 **Gestão de Agentes**
- Perfis de agentes com CRECI
- Certificação de agentes
- Estatísticas de performance
- Especialização e regiões de atuação

### 6. 💰 **Avaliações Automatizadas (AVM)**
- Geração de avaliações automatizadas
- Múltiplos tipos (Venda, Aluguel, Comparação de Mercado)
- Score de confiança
- Dados de propriedades comparáveis

### 7. 📈 **Relatórios de Área**
- Análise de mercado por região
- Score de comercialização (0-100)
- Dados de demanda, oferta e infraestrutura
- Tendências de preços

### 8. 🤖 **Scout AI**
- Agregação de listagens de múltiplas fontes
- Inteligência de mercado

### 9. 💼 **Simulador de Investimento**
- Simulação de cenários de investimento
- Comparação de múltiplos cenários
- Análise de ROI

### 10. 📊 **Dashboard e Analytics**
- Estatísticas gerais do sistema
- Métricas de ativos, leilões e leads
- Performance de agentes
- Visualizações de dados

### 11. 💳 **Sistema de Assinaturas**
- Planos de assinatura (Free, Starter, Pro, Investor Plus)
- Sistema de créditos
- Gestão de assinaturas

### 12. 📝 **Auditoria e Compliance**
- Logs de auditoria de todas as ações
- Rastreamento de mudanças
- Informações de IP e User Agent

---

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **Winston** - Logging
- **Zod** - Validação de schemas
- **Multer** - Upload de arquivos
- **Helmet** - Segurança
- **CORS** - Controle de acesso

### Frontend
- **React** + **TypeScript**
- **Vite** - Build tool
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estado

### DevOps
- **Docker** - Containerização
- **Render** - Deploy do backend
- **Vercel** - Deploy do frontend (recomendado)

---

## 📡 Estrutura da API

### Base URL
- **Produção**: `https://prospertycaixa-4.onrender.com`
- **Local**: `http://localhost:3000`

### Endpoints Principais

```
/api/auth              - Autenticação
/api/assets            - Gestão de ativos
/api/auctions          - Leilões
/api/leads             - CRM e leads
/api/agents            - Gestão de agentes
/api/valuations        - Avaliações (AVM)
/api/area-reports      - Relatórios de área
/api/subscriptions     - Assinaturas
/api/dashboard         - Dashboard e analytics
/api/scout-ai          - Scout AI
/api/property-invest   - Simulador de investimento
```

---

## 🔑 Autenticação

### Roles Disponíveis

- `USER` - Usuário comum
- `AGENT` - Corretor de imóveis
- `CAIXA_ADMIN` - Administrador CAIXA
- `CAIXA_OPERATOR` - Operador CAIXA
- `AUCTION_VENDOR` - Vendedor de leilões
- `SUPER_ADMIN` - Super administrador

### Como Obter o Token

1. Faça login via `POST /api/auth/login`
2. Copie o `token` retornado na resposta
3. Inclua no header de todas as requisições protegidas:
   ```
   Authorization: Bearer <seu-token>
   ```

---

## 🧪 Como Testar as Requisições

### Pré-requisitos

- **Postman** ou **Insomnia** (recomendado)
- Ou use **curl** no terminal
- Ou use o **frontend** da aplicação

### 1. 🔐 Autenticação

#### Registrar Novo Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "firstName": "João",
  "lastName": "Silva",
  "phone": "+5511999999999"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "firstName": "João",
    "lastName": "Silva",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "firstName": "João",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Obter Perfil
```http
GET /api/auth/profile
Authorization: Bearer <seu-token>
```

#### Atualizar Perfil
```http
PUT /api/auth/profile
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "firstName": "João",
  "lastName": "Silva",
  "phone": "+5511999999999"
}
```

---

### 2. 🏠 Gestão de Ativos

#### Listar Ativos
```http
GET /api/assets?status=ACTIVE_SALE&city=Rio de Janeiro&page=1&limit=10
Authorization: Bearer <seu-token>
```

**Query Parameters:**
- `status` - Filtrar por status (PRE_AUCTION, ACTIVE_SALE, SOLD, etc.)
- `city` - Filtrar por cidade
- `state` - Filtrar por estado
- `propertyType` - Filtrar por tipo (RESIDENTIAL, COMMERCIAL, LAND, MIXED_USE)
- `page` - Número da página
- `limit` - Itens por página

#### Obter Ativo por ID
```http
GET /api/assets/{id}
Authorization: Bearer <seu-token>
```

#### Criar Ativo (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, SUPER_ADMIN)
```http
POST /api/assets
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assetCode": "CAIXA-2024-001",
  "assetType": "REO",
  "status": "PRE_AUCTION",
  "title": "Apartamento 3 quartos - Copacabana",
  "description": "Apartamento bem localizado com vista para o mar",
  "address": "Av. Atlântica, 1234",
  "city": "Rio de Janeiro",
  "state": "RJ",
  "zipCode": "22010-000",
  "neighborhood": "Copacabana",
  "latitude": -22.9711,
  "longitude": -43.1822,
  "propertyType": "RESIDENTIAL",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 85.5,
  "lotArea": 120.0,
  "constructionYear": 2010,
  "estimatedValue": 850000,
  "askingPrice": 800000,
  "reservePrice": 750000,
  "legalStatus": "CLEAR_TITLE",
  "hasTitleIssues": false,
  "hasOccupancy": false,
  "tags": ["vista-mar", "reformado", "condominio"]
}
```

#### Atualizar Ativo (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, SUPER_ADMIN)
```http
PUT /api/assets/{id}
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "status": "ACTIVE_SALE",
  "askingPrice": 780000
}
```

#### Deletar Ativo (Requer: CAIXA_ADMIN, SUPER_ADMIN)
```http
DELETE /api/assets/{id}
Authorization: Bearer <seu-token>
```

#### Listar Documentos do Ativo
```http
GET /api/assets/{id}/documents
Authorization: Bearer <seu-token>
```

#### Upload de Documento (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, SUPER_ADMIN)
```http
POST /api/assets/{id}/documents
Authorization: Bearer <seu-token>
Content-Type: multipart/form-data

file: [arquivo.pdf]
documentType: TITLE_DEED
```

#### Listar Mídia do Ativo
```http
GET /api/assets/{id}/media
Authorization: Bearer <seu-token>
```

#### Upload de Mídia (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, SUPER_ADMIN)
```http
POST /api/assets/{id}/media
Authorization: Bearer <seu-token>
Content-Type: multipart/form-data

file: [imagem.jpg]
mediaType: IMAGE
isPrimary: true
```

---

### 3. 🔨 Sistema de Leilões

#### Listar Leilões
```http
GET /api/auctions?status=ACTIVE&page=1&limit=10
Authorization: Bearer <seu-token>
```

**Query Parameters:**
- `status` - SCHEDULED, ACTIVE, COMPLETED, CANCELLED
- `auctionType` - ENGLISH, DUTCH, SEALED_BID, HYBRID
- `page` - Número da página
- `limit` - Itens por página

#### Obter Leilão por ID
```http
GET /api/auctions/{id}
Authorization: Bearer <seu-token>
```

#### Criar Leilão (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, AUCTION_VENDOR, SUPER_ADMIN)
```http
POST /api/auctions
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assetId": "uuid-do-ativo",
  "auctionCode": "LEILAO-2024-001",
  "auctionType": "ENGLISH",
  "status": "SCHEDULED",
  "scheduledStart": "2024-12-20T10:00:00Z",
  "scheduledEnd": "2024-12-20T18:00:00Z",
  "startingBid": 500000,
  "reservePrice": 600000,
  "bidIncrement": 10000,
  "vendorName": "CAIXA Econômica Federal"
}
```

#### Atualizar Leilão (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, AUCTION_VENDOR, SUPER_ADMIN)
```http
PUT /api/auctions/{id}
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "status": "ACTIVE",
  "actualStart": "2024-12-20T10:00:00Z"
}
```

#### Registrar-se em um Leilão
```http
POST /api/auctions/{id}/register
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "kycData": {
    "cpf": "12345678900",
    "rg": "1234567",
    "address": "Rua Exemplo, 123"
  }
}
```

#### Fazer um Lance
```http
POST /api/auctions/{id}/bid
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "amount": 550000
}
```

#### Listar Lances de um Leilão
```http
GET /api/auctions/{id}/bids
Authorization: Bearer <seu-token>
```

#### Listar Registros de um Leilão
```http
GET /api/auctions/{id}/registrations
Authorization: Bearer <seu-token>
```

---

### 4. 📊 CRM e Gestão de Leads

#### Listar Leads
```http
GET /api/leads?status=NEW&assignedToId=uuid&page=1&limit=10
Authorization: Bearer <seu-token>
```

**Query Parameters:**
- `status` - NEW, CONTACTED, QUALIFIED, CONVERTED, etc.
- `assignedToId` - Filtrar por agente atribuído
- `source` - PORTAL_INQUIRY, PHONE_CALL, EMAIL, etc.
- `page` - Número da página
- `limit` - Itens por página

#### Obter Lead por ID
```http
GET /api/leads/{id}
Authorization: Bearer <seu-token>
```

#### Criar Lead
```http
POST /api/leads
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assetId": "uuid-do-ativo",
  "source": "PORTAL_INQUIRY",
  "name": "Maria Santos",
  "email": "maria@exemplo.com",
  "phone": "+5511888888888",
  "message": "Tenho interesse neste imóvel",
  "intent": "BUY",
  "priority": "HIGH"
}
```

#### Atualizar Lead
```http
PUT /api/leads/{id}
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "status": "CONTACTED",
  "message": "Cliente foi contatado via telefone"
}
```

#### Atribuir Lead a Agente (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, SUPER_ADMIN)
```http
POST /api/leads/{id}/assign
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assignedToId": "uuid-do-agente"
}
```

#### Converter Lead
```http
POST /api/leads/{id}/convert
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "notes": "Lead convertido em venda"
}
```

---

### 5. 👥 Gestão de Agentes

#### Listar Agentes
```http
GET /api/agents?isActive=true&page=1&limit=10
Authorization: Bearer <seu-token>
```

#### Obter Agente por ID
```http
GET /api/agents/{id}
Authorization: Bearer <seu-token>
```

#### Obter Estatísticas do Agente
```http
GET /api/agents/{id}/stats
Authorization: Bearer <seu-token>
```

#### Atualizar Perfil do Agente
```http
PUT /api/agents/{id}/profile
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "creciNumber": "12345F",
  "agencyName": "Imobiliária Exemplo",
  "specialization": ["residencial", "comercial"],
  "regions": ["Rio de Janeiro", "São Paulo"]
}
```

#### Certificar Agente (Requer: CAIXA_ADMIN, SUPER_ADMIN)
```http
POST /api/agents/{id}/certify
Authorization: Bearer <seu-token>
```

---

### 6. 💰 Avaliações (AVM)

#### Gerar Avaliação
```http
POST /api/valuations/generate
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assetId": "uuid-do-ativo",
  "valuationType": "AVM_SALE"
}
```

**Tipos de Avaliação:**
- `AVM_SALE` - Avaliação automatizada para venda
- `AVM_RENT` - Avaliação automatizada para aluguel
- `MANUAL_APPRAISAL` - Avaliação manual
- `MARKET_COMPARISON` - Comparação de mercado

#### Listar Avaliações
```http
GET /api/valuations?assetId=uuid&page=1&limit=10
Authorization: Bearer <seu-token>
```

#### Obter Avaliação por ID
```http
GET /api/valuations/{id}
Authorization: Bearer <seu-token>
```

---

### 7. 📈 Relatórios de Área

#### Gerar Relatório de Área
```http
POST /api/area-reports/generate
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assetId": "uuid-do-ativo",
  "areaType": "NEIGHBORHOOD",
  "areaName": "Copacabana"
}
```

**Tipos de Área:**
- `NEIGHBORHOOD` - Bairro
- `MUNICIPALITY` - Município
- `REGION` - Região
- `STATE` - Estado

#### Listar Relatórios
```http
GET /api/area-reports?assetId=uuid&page=1&limit=10
Authorization: Bearer <seu-token>
```

#### Obter Relatório por ID
```http
GET /api/area-reports/{id}
Authorization: Bearer <seu-token>
```

---

### 8. 🤖 Scout AI

#### Agregar Listagens
```http
GET /api/scout-ai/listings?city=Rio de Janeiro&propertyType=RESIDENTIAL&limit=50
Authorization: Bearer <seu-token>
```

**Query Parameters:**
- `city` - Cidade para buscar
- `state` - Estado
- `propertyType` - Tipo de propriedade
- `limit` - Limite de resultados

---

### 9. 💼 Simulador de Investimento

#### Simular Investimento
```http
POST /api/property-invest/simulate
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "assetId": "uuid-do-ativo",
  "purchasePrice": 800000,
  "downPayment": 160000,
  "loanAmount": 640000,
  "interestRate": 0.12,
  "loanTerm": 360,
  "expectedRent": 5000,
  "monthlyExpenses": 2000,
  "appreciationRate": 0.05,
  "holdingPeriod": 60
}
```

#### Comparar Cenários
```http
POST /api/property-invest/compare
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "scenarios": [
    {
      "name": "Cenário Conservador",
      "purchasePrice": 800000,
      "downPayment": 160000,
      "interestRate": 0.12,
      "expectedRent": 5000
    },
    {
      "name": "Cenário Otimista",
      "purchasePrice": 800000,
      "downPayment": 160000,
      "interestRate": 0.10,
      "expectedRent": 6000
    }
  ]
}
```

---

### 10. 📊 Dashboard e Analytics

#### Estatísticas Gerais
```http
GET /api/dashboard/stats
Authorization: Bearer <seu-token>
```

#### Estatísticas de Ativos
```http
GET /api/dashboard/assets?period=30d
Authorization: Bearer <seu-token>
```

#### Estatísticas de Leilões
```http
GET /api/dashboard/auctions?period=30d
Authorization: Bearer <seu-token>
```

#### Estatísticas de Leads
```http
GET /api/dashboard/leads?period=30d
Authorization: Bearer <seu-token>
```

#### Performance de Agentes (Requer: CAIXA_ADMIN, CAIXA_OPERATOR, SUPER_ADMIN)
```http
GET /api/dashboard/agents?period=30d
Authorization: Bearer <seu-token>
```

---

### 11. 💳 Sistema de Assinaturas

#### Listar Assinaturas
```http
GET /api/subscriptions
Authorization: Bearer <seu-token>
```

#### Obter Assinatura por ID
```http
GET /api/subscriptions/{id}
Authorization: Bearer <seu-token>
```

#### Criar Assinatura
```http
POST /api/subscriptions
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "planType": "PRO",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Planos Disponíveis:**
- `FREE` - Plano gratuito
- `STARTER` - Plano inicial
- `PRO` - Plano profissional
- `INVESTOR_PLUS` - Plano investidor plus

#### Atualizar Assinatura
```http
PUT /api/subscriptions/{id}
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "planType": "INVESTOR_PLUS",
  "credits": 1000
}
```

#### Comprar Créditos
```http
POST /api/subscriptions/{id}/credits
Authorization: Bearer <seu-token>
Content-Type: application/json

{
  "credits": 100
}
```

---

### 12. 🏥 Health Check

#### Verificar Status da API
```http
GET /health
```

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2024-12-06T23:00:00.000Z",
  "service": "Prosperty Brazil API"
}
```

---

## 🚀 Deploy

### Backend (Render)
- **URL**: `https://prospertycaixa-4.onrender.com`
- **Status**: ✅ Deployado e funcionando

### Frontend (Vercel/Netlify)
- Configure a variável de ambiente `VITE_API_URL` apontando para o backend
- Faça deploy do diretório `client/`

### Variáveis de Ambiente Necessárias

**Backend:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=sua-chave-secreta
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://seu-frontend.vercel.app
```

**Frontend:**
```
VITE_API_URL=https://prospertycaixa-4.onrender.com
```

---

## 📝 Exemplos de Uso com cURL

### Exemplo Completo: Criar Ativo e Leilão

```bash
# 1. Login
TOKEN=$(curl -X POST https://prospertycaixa-4.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@exemplo.com","password":"senha123"}' \
  | jq -r '.token')

# 2. Criar Ativo
ASSET_ID=$(curl -X POST https://prospertycaixa-4.onrender.com/api/assets \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "assetCode": "CAIXA-2024-001",
    "assetType": "REO",
    "status": "PRE_AUCTION",
    "title": "Apartamento 3 quartos",
    "address": "Av. Atlântica, 1234",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "propertyType": "RESIDENTIAL",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 85.5,
    "estimatedValue": 850000,
    "legalStatus": "CLEAR_TITLE"
  }' | jq -r '.id')

# 3. Criar Leilão
curl -X POST https://prospertycaixa-4.onrender.com/api/auctions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"assetId\": \"$ASSET_ID\",
    \"auctionCode\": \"LEILAO-2024-001\",
    \"auctionType\": \"ENGLISH\",
    \"scheduledStart\": \"2024-12-20T10:00:00Z\",
    \"startingBid\": 500000,
    \"bidIncrement\": 10000
  }"
```

---

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Rate limiting
- ✅ Helmet para segurança HTTP
- ✅ CORS configurado
- ✅ Validação de dados com Zod
- ✅ Logs de auditoria

---

## 📚 Documentação Adicional

- [Schema do Banco de Dados](./prisma/schema.prisma)
- [Estrutura do Projeto](./src/)
- [Configuração do Frontend](./client/)

---

## 🤝 Contribuindo

Este é um projeto desenvolvido para a CAIXA. Para contribuições, entre em contato com a equipe de desenvolvimento.

---

## 📄 Licença

MIT License - Prosperty Brazil

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs da aplicação
- Consulte a documentação da API
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para a CAIXA Econômica Federal**
