import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import { fetchMe } from './adminApi'
import './admin.css'

export default function AdminApp() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || null)
  const [user, setUser] = useState(null)
  const [authChecking, setAuthChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await fetchMe()
          setUser(userData)
        } catch (error) {
          console.error("Auth verification failed", error)
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_user')
          setToken(null)
          setUser(null)
        }
      }
      setAuthChecking(false)
    }
    checkAuth()
  }, [token])

  const handleLogin = (newToken, newUser) => {
    localStorage.setItem('admin_token', newToken)
    localStorage.setItem('admin_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToken(null)
    setUser(null)
  }

  return (
    <div className='admin-root'>
      {authChecking ? (
        <div className='admin-login-page'>
          <div className='admin-loading'><div className='admin-spinner'></div></div>
        </div>
      ) : token && user ? (
        <AdminDashboard user={user} token={token} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  )
}
