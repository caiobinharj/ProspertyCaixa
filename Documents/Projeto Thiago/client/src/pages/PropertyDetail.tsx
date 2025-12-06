import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function PropertyDetail() {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['asset', id],
    queryFn: async () => {
      const response = await axios.get(`/api/assets/${id}`)
      return response.data.data.asset
    }
  })

  if (isLoading) return <div>Carregando...</div>

  if (!data) return <div>Imóvel não encontrado</div>

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>{data.title}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          {data.media && data.media.length > 0 && (
            <img
              src={data.media[0].fileUrl}
              alt={data.title}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '2rem' }}
            />
          )}
          <div>
            <h2>Descrição</h2>
            <p style={{ color: '#888', marginTop: '1rem' }}>{data.description || 'Sem descrição disponível'}</p>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <h2>Detalhes</h2>
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <strong>Área:</strong> {data.area}m²
              </div>
              {data.bedrooms && (
                <div>
                  <strong>Quartos:</strong> {data.bedrooms}
                </div>
              )}
              {data.bathrooms && (
                <div>
                  <strong>Banheiros:</strong> {data.bathrooms}
                </div>
              )}
              {data.constructionYear && (
                <div>
                  <strong>Ano:</strong> {data.constructionYear}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', position: 'sticky', top: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Informações</h2>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Endereço:</strong>
              <p style={{ color: '#888', marginTop: '0.5rem' }}>
                {data.address}, {data.city} - {data.state}
              </p>
            </div>
            {data.estimatedValue && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Valor Estimado (AVM):</strong>
                <p style={{ color: '#10b981', fontSize: '1.5rem', marginTop: '0.5rem' }}>
                  R$ {data.estimatedValue.toLocaleString('pt-BR')}
                </p>
              </div>
            )}
            {data.askingPrice && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Preço de Venda:</strong>
                <p style={{ color: '#3b82f6', fontSize: '1.5rem', marginTop: '0.5rem' }}>
                  R$ {data.askingPrice.toLocaleString('pt-BR')}
                </p>
              </div>
            )}
            <div style={{ marginTop: '2rem' }}>
              <strong>Status:</strong>
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                background: '#333',
                marginLeft: '0.5rem'
              }}>
                {data.status}
              </span>
            </div>
            <button style={{
              width: '100%',
              padding: '1rem',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginTop: '2rem'
            }}>
              Entrar em Contato
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


