import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const { user } = useAuthStore()

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard/stats')
      return response.data.data
    }
  })

  if (isLoading) return <div>Carregando...</div>

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Bem-vindo, {user?.email}
      </p>
      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total de Ativos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.overview.totalAssets}</p>
          </div>
          <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Leilões Ativos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.overview.activeAuctions}</p>
          </div>
          <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total de Leads</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.overview.totalLeads}</p>
          </div>
          <div style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Taxa de Conversão</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {Math.round(data.overview.conversionRate * 100) / 100}%
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


