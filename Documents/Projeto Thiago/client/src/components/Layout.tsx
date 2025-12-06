import { Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Layout() {
  const { user, logout } = useAuthStore()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: '#1a1a1a',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333'
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🏢 Prosperty Brazil
          </Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/properties" style={{ color: '#fff', textDecoration: 'none' }}>Imóveis</Link>
            <Link to="/auctions" style={{ color: '#fff', textDecoration: 'none' }}>Leilões</Link>
            {user ? (
              <>
                <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
                <span style={{ color: '#888' }}>{user.email}</span>
                <button onClick={logout} style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" style={{
                background: '#3b82f6',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}>
                Entrar
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>
      <footer style={{
        background: '#1a1a1a',
        padding: '2rem',
        textAlign: 'center',
        color: '#888',
        marginTop: 'auto'
      }}>
        <p>© 2024 Prosperty Brazil - Plataforma de Gestão Imobiliária</p>
      </footer>
    </div>
  )
}


