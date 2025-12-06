import { create } from 'zustand'
import axios from '../config/axios'

interface User {
  id: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setAuth: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>((set) => {
  // Load from localStorage on init
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')
  
  if (storedToken && storedUser) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
  }

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    login: async (email: string, password: string) => {
      const response = await axios.post('/api/auth/login', { email, password })
      const { user, token } = response.data.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      set({ user, token })
    },
    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      set({ user: null, token: null })
    },
    setAuth: (user: User, token: string) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      set({ user, token })
    }
  }
})


