# 🚀 Guia de Início Rápido - Prosperty Brazil

## Instalação Rápida

### 1. Instalar Dependências

```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

### 2. Configurar Banco de Dados

1. Crie um banco PostgreSQL
2. Configure a variável `DATABASE_URL` no arquivo `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/prosperty_brazil?schema=public"
   ```

3. Execute as migrações:
```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:
- `DATABASE_URL` - URL do banco PostgreSQL
- `JWT_SECRET` - Chave secreta para JWT (use uma string aleatória forte)
- `PORT` - Porta do servidor (padrão: 3000)

### 4. Iniciar o Sistema

```bash
# Desenvolvimento (backend + frontend)
npm run dev

# Ou separadamente:
npm run dev:server  # Backend na porta 3000
cd client && npm run dev  # Frontend na porta 5173
```

## 🎯 Primeiros Passos

### 1. Criar Usuário Administrador

```bash
# Via API ou Prisma Studio
npx prisma studio
```

Ou use a API:
```bash
POST http://localhost:3000/api/auth/register
{
  "email": "admin@caixa.gov.br",
  "password": "senha123",
  "role": "CAIXA_ADMIN"
}
```

### 2. Criar Primeiro Ativo

```bash
POST http://localhost:3000/api/assets
Authorization: Bearer <token>

{
  "assetCode": "REO-001",
  "assetType": "REO",
  "title": "Apartamento em São Paulo",
  "address": "Av. Paulista, 1000",
  "city": "São Paulo",
  "state": "SP",
  "propertyType": "RESIDENTIAL",
  "area": 80,
  "bedrooms": 2,
  "bathrooms": 1,
  "askingPrice": 500000,
  "legalStatus": "CLEAR_TITLE"
}
```

### 3. Criar Leilão

```bash
POST http://localhost:3000/api/auctions
Authorization: Bearer <token>

{
  "assetId": "<asset-id>",
  "auctionCode": "LEIL-001",
  "auctionType": "ENGLISH",
  "scheduledStart": "2024-12-31T10:00:00Z",
  "startingBid": 400000,
  "bidIncrement": 10000
}
```

## 📚 Estrutura de Módulos

### ✅ Módulos Implementados

1. **ProspertyCore** - Gestão de Ativos
   - CRUD completo de ativos
   - Documentos e mídia
   - Rastreamento de status

2. **Auction Management** - Leilões
   - Criação e gestão de leilões
   - Registro de participantes
   - Sistema de lances

3. **CRM & Leads** - Gestão de Leads
   - Criação e atribuição de leads
   - Rastreamento de conversão
   - Integração com corretores

4. **Agent Management** - Gestão de Corretores
   - Perfis de corretores
   - Estatísticas de performance
   - Certificação

5. **Valuation (AVM)** - Avaliações Automatizadas
   - Geração de AVMs
   - Comparáveis
   - Histórico de avaliações

6. **AreaIQ** - Relatórios de Área
   - Scoring de mercado
   - Tendências de preço
   - Dados de infraestrutura

7. **PropertyInvest** - Simulações de Investimento
   - Cenários FLIP, HOLD, RENT
   - Cálculo de ROI/IRR
   - Comparação de cenários

8. **ScoutAI** - Agregação de Listagens
   - Agregação de múltiplas fontes
   - Filtros avançados
   - Sincronização

9. **Subscriptions** - Sistema de Assinaturas
   - Planos (Free, Starter, Pro, Investor+)
   - Sistema de créditos
   - Gestão de assinaturas

10. **Dashboard** - Analytics
    - Estatísticas gerais
    - KPIs de ativos, leilões, leads
    - Performance de corretores

## 🔑 Roles e Permissões

- **USER** - Acesso básico, visualização
- **AGENT** - Corretores, gestão de leads atribuídos
- **CAIXA_OPERATOR** - Operadores CAIXA, gestão de ativos
- **CAIXA_ADMIN** - Administradores CAIXA, acesso total
- **AUCTION_VENDOR** - Fornecedores de leilões
- **SUPER_ADMIN** - Acesso total ao sistema

## 📡 Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil

### Ativos
- `GET /api/assets` - Listar
- `GET /api/assets/:id` - Detalhes
- `POST /api/assets` - Criar (CAIXA)
- `PUT /api/assets/:id` - Atualizar (CAIXA)

### Leilões
- `GET /api/auctions` - Listar
- `POST /api/auctions` - Criar
- `POST /api/auctions/:id/register` - Registrar
- `POST /api/auctions/:id/bid` - Fazer lance

### Leads
- `GET /api/leads` - Listar
- `POST /api/leads` - Criar
- `POST /api/leads/:id/assign` - Atribuir a corretor

### Avaliações
- `POST /api/valuations/generate` - Gerar AVM
- `GET /api/valuations` - Listar

### Simulações
- `POST /api/property-invest/simulate` - Simular investimento
- `POST /api/property-invest/compare` - Comparar cenários

## 🎨 Frontend

O frontend está em `client/` e inclui:
- Página inicial
- Listagem de imóveis
- Detalhes de imóveis
- Leilões
- Dashboard
- Login/Autenticação

## 🔧 Próximos Passos de Desenvolvimento

1. **Integrações Externas**
   - APIs OLX, VivaReal, Zap Imóveis
   - Serviços de AVM reais
   - Serviços de AreaIQ reais

2. **Upload de Arquivos**
   - Sistema de upload de imagens
   - Upload de documentos
   - Integração com S3/Cloud Storage

3. **Notificações**
   - Email notifications
   - Push notifications
   - SMS (opcional)

4. **Pagamentos**
   - Integração com gateway de pagamento
   - Processamento de assinaturas
   - Sistema de créditos

5. **AI Features**
   - Geração de teasers com IA
   - Assistente GPT para imóveis
   - Recomendações inteligentes (FocusList)

## 🐛 Troubleshooting

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme a `DATABASE_URL` no `.env`
- Execute `npx prisma migrate dev`

### Erro de autenticação
- Verifique o `JWT_SECRET` no `.env`
- Confirme que o token está sendo enviado no header

### Frontend não conecta ao backend
- Verifique se o backend está rodando na porta 3000
- Confirme o proxy no `vite.config.ts`

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação completa no `README.md`.


