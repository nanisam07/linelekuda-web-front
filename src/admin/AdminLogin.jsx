import React, { useState } from 'react';
import { login } from './adminApi';
import { Lock, Mail, Eye, EyeOff, LogIn, AlertCircle, Building2, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email.trim(), password);
      if (rememberMe) {
        localStorage.setItem('admin_remember_email', email);
      } else {
        localStorage.removeItem('admin_remember_email');
      }
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div
        className="crm-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem',
          borderRadius: '24px',
          boxShadow: 'var(--crm-shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {/* Header Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
          <div
            className="crm-logo-icon"
            style={{ width: '56px', height: '56px', borderRadius: '18px', fontSize: '1.5rem' }}
          >
            <Building2 size={30} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--crm-text-heading)', letterSpacing: '-0.03em' }}>
              LINELEKUNDA
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--crm-primary)', fontWeight: 700, marginTop: '0.1rem' }}>
              Receptionist CRM & WhatsApp Portal
            </p>
          </div>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444', borderRadius: '12px', color: '#EF4444', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div className="crm-form-group">
            <label htmlFor="email">Work Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--crm-text-muted)' }} />
              <input
                id="email"
                type="email"
                className="crm-input"
                style={{ paddingLeft: '2.75rem' }}
                placeholder="receptionist@linelekunda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="crm-form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--crm-text-muted)' }} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="crm-input"
                style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                style={{ position: 'absolute', right: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--crm-text-sub)' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep session signed in</span>
            </label>
          </div>

          <button
            type="submit"
            className="crm-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to CRM Portal</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--crm-text-muted)', borderTop: '1px solid var(--crm-border-subtle)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <ShieldCheck size={14} color="#10B981" />
          <span>Meta WhatsApp Cloud API 256-Bit Encrypted</span>
        </div>
      </div>
    </div>
  );
}
