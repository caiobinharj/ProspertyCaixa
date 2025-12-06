import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface Asset {
  id: string
  title: string
  address: string
  city: string
  state: string
  area: number
  estimatedValue?: number
  askingPrice?: number
  status: string
  media: Array<{ fileUrl: string; isPrimary: boolean }>
}

export default function Properties() {
  const { data, isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await axios.get('/api/assets')
      return response.data.data.assets as Asset[]
    }
  })

  if (isLoading) return <div>Carregando...</div>

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Imóveis Disponíveis</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {data?.map((asset) => (
          <Link
            key={asset.id}
            to={`/properties/${asset.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              background: '#1a1a1a',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.2s'
            }}
          >
            {asset.media[0] && (
              <img
                src={asset.media[0].fileUrl}
                alt={asset.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{asset.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {asset.address}, {asset.city} - {asset.state}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#888' }}>{asset.area}m²</span>
                {asset.askingPrice && (
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                    R$ {asset.askingPrice.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!data?.length && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          Nenhum imóvel encontrado
        </div>
      )}
    </div>
  )
}


