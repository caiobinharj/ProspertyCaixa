import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Bem-vindo ao Prosperty Brazil
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '3rem' }}>
        Plataforma completa de gestão imobiliária para CAIXA e investidores
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/properties" style={{
          background: '#3b82f6',
          color: '#fff',
          textDecoration: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1.1rem'
        }}>
          Ver Imóveis
        </Link>
        <Link to="/auctions" style={{
          background: '#10b981',
          color: '#fff',
          textDecoration: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1.1rem'
        }}>
          Ver Leilões
        </Link>
      </div>
      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3>🏢 Gestão de Ativos</h3>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            Sistema completo para gerenciar portfólio REO da CAIXA
          </p>
        </div>
        <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3>🔨 Leilões Unificados</h3>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            Plataforma centralizada para leilões imobiliários
          </p>
        </div>
        <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3>📊 Inteligência de Mercado</h3>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            AVMs, AreaIQ e relatórios de mercado
          </p>
        </div>
        <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3>👥 CRM & Leads</h3>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            Gestão de corretores e distribuição de leads
          </p>
        </div>
      </div>
    </div>
  )
}




