import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Auction {
  id: string
  auctionCode: string
  status: string
  scheduledStart: string
  startingBid: number
  asset: {
    id: string
    title: string
    address: string
    city: string
    state: string
    media: Array<{ fileUrl: string }>
  }
  _count: {
    bids: number
    registrations: number
  }
}

export default function Auctions() {
  const { data, isLoading } = useQuery({
    queryKey: ['auctions'],
    queryFn: async () => {
      const response = await axios.get('/api/auctions')
      return response.data.data.auctions as Auction[]
    }
  })

  if (isLoading) return <div>Carregando...</div>

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Leilões Ativos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {data?.map((auction) => (
          <Link
            key={auction.id}
            to={`/auctions/${auction.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              background: '#1a1a1a',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            {auction.asset.media[0] && (
              <img
                src={auction.asset.media[0].fileUrl}
                alt={auction.asset.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{auction.asset.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {auction.asset.address}, {auction.asset.city} - {auction.asset.state}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                  Lance Inicial: R$ {auction.startingBid.toLocaleString('pt-BR')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#888' }}>
                <span>Lances: {auction._count.bids}</span>
                <span>Inscritos: {auction._count.registrations}</span>
              </div>
              <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#333', borderRadius: '4px', textAlign: 'center' }}>
                {new Date(auction.scheduledStart).toLocaleString('pt-BR')}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!data?.length && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          Nenhum leilão encontrado
        </div>
      )}
    </div>
  )
}


