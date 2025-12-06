# Prosperty Brazil - Real Estate Technology Platform

Sistema completo de gestão imobiliária para CAIXA e mercado B2C, incluindo gestão de ativos, leilões, CRM, AVMs e inteligência de mercado.

## 🏗️ Arquitetura

### Backend
- **Node.js + TypeScript + Express**
- **Prisma ORM** com PostgreSQL
- **JWT Authentication**
- **Modular Architecture** com separação de responsabilidades

### Módulos Principais

1. **ProspertyCore** - Sistema de Gestão de Ativos (REO)
2. **Auction Management** - Plataforma unificada de leilões
3. **CRM & Lead Management** - Gestão de leads e corretores
4. **Valuation (AVM)** - Modelo de Avaliação Automatizada
5. **AreaIQ** - Relatórios de inteligência de mercado por região
6. **Subscription Management** - Sistema de assinaturas e créditos
7. **Dashboard & Analytics** - Dashboards e relatórios

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Setup

1. **Clone o repositório**
```bash
git clone <repository-url>
cd prosperty-brazil
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente**
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. **Configure o banco de dados**
```bash
# Atualize DATABASE_URL no .env
npx prisma generate
npx prisma migrate dev
```

5. **Inicie o servidor**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
prosperty-brazil/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── controllers/          # Lógica de negócio
│   ├── routes/               # Rotas da API
│   ├── middleware/           # Middlewares (auth, error handling)
│   ├── utils/                # Utilitários (logger, audit)
│   └── server.ts             # Entry point
├── client/                   # Frontend (a ser criado)
├── package.json
└── tsconfig.json
```

## 🔐 Autenticação

O sistema usa JWT para autenticação. Endpoints protegidos requerem o header:
```
Authorization: Bearer <token>
```

### Roles
- `USER` - Usuário básico
- `AGENT` - Corretor
- `CAIXA_ADMIN` - Administrador CAIXA
- `CAIXA_OPERATOR` - Operador CAIXA
- `AUCTION_VENDOR` - Fornecedor de leilões
- `SUPER_ADMIN` - Super administrador

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário

### Ativos (Assets)
- `GET /api/assets` - Listar ativos
- `GET /api/assets/:id` - Detalhes do ativo
- `POST /api/assets` - Criar ativo (CAIXA only)
- `PUT /api/assets/:id` - Atualizar ativo
- `DELETE /api/assets/:id` - Deletar ativo

### Leilões (Auctions)
- `GET /api/auctions` - Listar leilões
- `GET /api/auctions/:id` - Detalhes do leilão
- `POST /api/auctions` - Criar leilão
- `POST /api/auctions/:id/register` - Registrar para leilão
- `POST /api/auctions/:id/bid` - Fazer lance

### Leads
- `GET /api/leads` - Listar leads
- `POST /api/leads` - Criar lead
- `PUT /api/leads/:id` - Atualizar lead
- `POST /api/leads/:id/assign` - Atribuir lead a corretor

### Corretores (Agents)
- `GET /api/agents` - Listar corretores
- `GET /api/agents/:id` - Detalhes do corretor
- `GET /api/agents/:id/stats` - Estatísticas do corretor

### Avaliações (Valuations)
- `POST /api/valuations/generate` - Gerar AVM
- `GET /api/valuations` - Listar avaliações

### Relatórios de Área (AreaIQ)
- `POST /api/area-reports/generate` - Gerar relatório
- `GET /api/area-reports` - Listar relatórios

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas gerais
- `GET /api/dashboard/assets` - Estatísticas de ativos
- `GET /api/dashboard/auctions` - Estatísticas de leilões

## 🗄️ Banco de Dados

O schema Prisma define todas as entidades:
- Users & Authentication
- Assets (REO, Leilões, etc.)
- Auctions & Bids
- Leads & CRM
- Agents
- Valuations & Area Reports
- Subscriptions
- Audit Logs

Execute migrations:
```bash
npx prisma migrate dev
```

Visualize o banco:
```bash
npx prisma studio
```

## 🔧 Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Desenvolvimento (server + client)
- `npm run dev:server` - Apenas servidor
- `npm run build` - Build para produção
- `npm start` - Iniciar produção

### Linting
```bash
npm run lint
```

## 📝 Próximos Passos

1. **Frontend** - Criar interface React/Vue
2. **Integrações** - APIs externas (OLX, VivaReal, etc.)
3. **AVM Service** - Integração com serviço real de AVM
4. **AreaIQ Service** - Integração com serviço de inteligência
5. **File Upload** - Sistema de upload de documentos/mídia
6. **Email Notifications** - Sistema de notificações
7. **Payment Integration** - Integração de pagamentos para assinaturas

## 📄 Licença

MIT

## 👥 Equipe

Prosperty Brazil Team


