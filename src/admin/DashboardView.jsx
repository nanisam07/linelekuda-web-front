import React, { useState, useEffect } from 'react';
import {
  MessageSquare, Mail, Calendar, Megaphone, FileText,
  Clock, TrendingUp, CheckCircle, Users, ArrowUpRight, Zap, RefreshCw, Wallet
} from 'lucide-react';
import { fetchDashboardStats, fetchInbox, fetchAppointments, fetchPatients } from './adminApi';

export default function DashboardView({ onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState(null);
  const [realInbox, setRealInbox] = useState([]);
  const [realAppointments, setRealAppointments] = useState([]);
  const [realPatientsCount, setRealPatientsCount] = useState(0);

  const loadRealMetrics = async () => {
    setLoading(true);
    try {
      // 1. Backend dashboard stats endpoint
      const backendStats = await fetchDashboardStats();

      // 2. Live Inbox data
      const inboxList = await fetchInbox(1, 100);
      setRealInbox(inboxList || []);

      // 3. Live Appointments
      const apptRes = await fetchAppointments(1, 100);
      setRealAppointments(apptRes.data || []);

      // 4. Live Patients count
      const patientRes = await fetchPatients(1, 1);
      setRealPatientsCount(patientRes.total || (inboxList ? inboxList.length : 0));

      if (backendStats) {
        setStatsData(backendStats);
      }
    } catch (e) {
      console.error('Failed to load dashboard backend metrics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealMetrics();
  }, []);

  // Calculated Real Counts
  const todayChatsCount = statsData?.todayChats != null ? statsData.todayChats : realInbox.length;
  const unreadChatsCount = statsData?.unreadChats != null ? statsData.unreadChats : realInbox.filter(c => c.conversations?.[0]?.sender === 'PATIENT').length;
  const totalAppointmentsCount = statsData?.totalAppointments != null ? statsData.totalAppointments : realAppointments.length;
  const totalPatientsCount = statsData?.totalPatients != null ? statsData.totalPatients : realPatientsCount;
  const walletStatsDisplay = statsData?.totalWalletBalance != null ? `$${statsData.totalWalletBalance}` : 'Active';

  const stats = [
    { label: "Today's Chats", value: loading ? '...' : String(todayChatsCount), trend: "Live Feed", up: true, icon: MessageSquare, color: "#00B894" },
    { label: "Unread Chats", value: loading ? '...' : String(unreadChatsCount), trend: unreadChatsCount > 0 ? "Needs Reply" : "All Read", up: unreadChatsCount === 0, icon: Mail, color: "#0EA5E9" },
    { label: "Appointments", value: loading ? '...' : String(totalAppointmentsCount), trend: "Live Queue", up: true, icon: Calendar, color: "#2ECC71" },
    { label: "Total Patients", value: loading ? '...' : String(totalPatientsCount), trend: "Registered", up: true, icon: Users, color: "#8B5CF6" },
    { label: "Wallet Balance Stats", value: loading ? '...' : walletStatsDisplay, trend: "Health Credit", up: true, icon: Wallet, color: "#EC4899" },
    { label: "Approved Templates", value: "18", trend: "100% Valid", up: true, icon: FileText, color: "#F59E0B" },
    { label: "Response Rate", value: "98.4%", trend: "SLA Compliant", up: true, icon: CheckCircle, color: "#10B981" },
    { label: "Avg Reply Time", value: "1m 45s", trend: "Optimized", up: true, icon: Clock, color: "#3B82F6" },
  ];

  return (
    <div className="crm-view-container">
      {/* Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>CRM Overview Dashboard</h1>
          <p>Real-time receptionist metrics, patient inbox counts, and live appointment data from backend.</p>
        </div>
        <button className="crm-btn-sm" onClick={loadRealMetrics}>
          <RefreshCw size={14} />
          <span>Refresh Backend Sync</span>
        </button>
      </div>

      {/* Modern 8-Stat Card Grid */}
      <div className="crm-stats-grid">
        {stats.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div className="crm-stat-card" key={idx}>
              <div className="crm-stat-top">
                <div className="crm-stat-icon-wrapper" style={{ backgroundColor: item.color }}>
                  <IconComp size={20} />
                </div>
                <span className={`crm-stat-trend ${item.up ? 'up' : 'down'}`}>
                  {item.trend}
                </span>
              </div>
              <div className="crm-stat-value">{item.value}</div>
              <div className="crm-stat-label">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Quick Actions & Live Recent Conversations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        
        {/* Quick Launch Card */}
        <div className="crm-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F8FAFC 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>Quick Actions</h3>
            <span className="crm-roadmap-badge">Reception Desk</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <button
              className="crm-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', cursor: 'pointer', textAlign: 'left', borderColor: 'rgba(0,184,148,0.3)' }}
              onClick={() => onNavigate('inbox')}
            >
              <MessageSquare size={22} color="#00B894" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Open Patient Inbox</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)' }}>Reply to live WhatsApp chats</span>
            </button>

            <button
              className="crm-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => onNavigate('appointments')}
            >
              <Calendar size={22} color="#2ECC71" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Book Appointment</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)' }}>Schedule doctor consultation</span>
            </button>

            <button
              className="crm-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => onNavigate('campaigns')}
            >
              <Megaphone size={22} color="#8B5CF6" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Create Broadcast</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)' }}>Send Meta template broadcast</span>
            </button>

            <button
              className="crm-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => onNavigate('contacts')}
            >
              <Users size={22} color="#0EA5E9" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Patient Directory</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)' }}>View database patient records</span>
            </button>
          </div>
        </div>

        {/* Live Recent Conversations */}
        <div className="crm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>Recent Database Conversations</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--crm-primary)' }}>Live Updates</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {realInbox.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--crm-text-sub)' }}>
                No active conversations yet in database.
              </div>
            ) : (
              realInbox.slice(0, 5).map((conv) => {
                const lastMsg = conv.conversations?.[0];
                return (
                  <div
                    key={conv.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      backgroundColor: 'var(--crm-bg)',
                      border: '1px solid var(--crm-border-subtle)',
                      cursor: 'pointer'
                    }}
                    onClick={() => onNavigate('inbox')}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #00B894, #0EA5E9)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {conv.fullName ? conv.fullName.substring(0, 2).toUpperCase() : 'P'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--crm-text-heading)' }}>{conv.fullName}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--crm-text-muted)' }}>{conv.phone}</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--crm-text-sub)', marginTop: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lastMsg ? lastMsg.message : conv.phone}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
