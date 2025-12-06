import { useQuery } from '@tanstack/react-query'
import axios from '../config/axios'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function AuctionDetail() {
  const { id } = useParams()
  const { user } = useAuthStore()

  const { data, isLoading } = useQuery({
    queryKey: ['auction', id],
    queryFn: async () => {
      const response = await axios.get(`/api/auctions/${id}`)
      return response.data.data.auction
    }
  })

  if (isLoading) return <div>Carregando...</div>

  if (!data) return <div>Leilão não encontrado</div>

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Leilão: {data.auctionCode}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h2>{data.asset.title}</h2>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>
            {data.asset.address}, {data.asset.city} - {data.asset.state}
          </p>
          <div style={{ marginTop: '2rem' }}>
            <h3>Lances Recentes</h3>
            {data.bids && data.bids.length > 0 ? (
              <div style={{ marginTop: '1rem' }}>
                {data.bids.map((bid: any) => (
                  <div key={bid.id} style={{
                    padding: '1rem',
                    background: '#1a1a1a',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>R$ {bid.amount.toLocaleString('pt-BR')}</span>
                    <span style={{ color: '#888' }}>
                      {new Date(bid.placedAt).toLocaleString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#888', marginTop: '1rem' }}>Nenhum lance ainda</p>
            )}
          </div>
        </div>
        <div>
          <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', position: 'sticky', top: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Informações do Leilão</h2>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Lance Inicial:</strong>
              <p style={{ color: '#10b981', fontSize: '1.5rem', marginTop: '0.5rem' }}>
                R$ {data.startingBid.toLocaleString('pt-BR')}
              </p>
            </div>
            {data.reservePrice && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Lance Mínimo:</strong>
                <p style={{ color: '#888', marginTop: '0.5rem' }}>
                  R$ {data.reservePrice.toLocaleString('pt-BR')}
                </p>
              </div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <strong>Incremento:</strong>
              <p style={{ marginTop: '0.5rem' }}>R$ {data.bidIncrement.toLocaleString('pt-BR')}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Status:</strong>
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                background: data.status === 'ACTIVE' ? '#10b981' : '#333',
                marginLeft: '0.5rem'
              }}>
                {data.status}
              </span>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <strong>Início:</strong>
              <p style={{ marginTop: '0.5rem' }}>
                {new Date(data.scheduledStart).toLocaleString('pt-BR')}
              </p>
            </div>
            {user ? (
              <div style={{ marginTop: '2rem' }}>
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}>
                  Registrar-se no Leilão
                </button>
                {data.status === 'ACTIVE' && (
                  <button style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}>
                    Fazer Lance
                  </button>
                )}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
                Faça login para participar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


