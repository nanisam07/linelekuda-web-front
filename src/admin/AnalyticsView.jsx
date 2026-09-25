import React from 'react';
import {
  BarChart2, TrendingUp, Users, MessageSquare, Calendar,
  Clock, Smile, Award, Megaphone, Info, ArrowUpRight
} from 'lucide-react';

export default function AnalyticsView() {
  // Demo analytics metrics
  const chatVolumeData = [
    { day: 'Mon', count: 65 },
    { day: 'Tue', count: 82 },
    { day: 'Wed', count: 95 },
    { day: 'Thu', count: 78 },
    { day: 'Fri', count: 110 },
    { day: 'Sat', count: 88 },
    { day: 'Sun', count: 42 }
  ];

  const maxChat = 120;

  const departmentAppointments = [
    { dept: 'Orthopedics', count: 145, pct: 85, color: '#00B894' },
    { dept: 'ENT', count: 112, pct: 68, color: '#0EA5E9' },
    { dept: 'Pediatrics', count: 98, pct: 55, color: '#2ECC71' },
    { dept: 'Cardiology', count: 76, pct: 45, color: '#8B5CF6' },
    { dept: 'General OPD', count: 210, pct: 95, color: '#F59E0B' }
  ];

  return (
    <div className="crm-view-container">
      {/* View Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>Hospital Analytics & Performance</h1>
          <p>Comprehensive operational metrics, receptionist response times, appointment trends, and campaign ROI.</p>
        </div>
        <span className="crm-roadmap-badge">
          <Info size={14} />
          <span>Interactive Visual Demo Analytics</span>
        </span>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="crm-stats-grid">
        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#00B894' }}>
              <MessageSquare size={20} />
            </div>
            <span className="crm-stat-trend up">+18% MoM</span>
          </div>
          <div className="crm-stat-value">4,280</div>
          <div className="crm-stat-label">Total Conversations</div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#0EA5E9' }}>
              <Calendar size={20} />
            </div>
            <span className="crm-stat-trend up">+12% vs last wk</span>
          </div>
          <div className="crm-stat-value">641</div>
          <div className="crm-stat-label">Appointments Booked</div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#2ECC71' }}>
              <Clock size={20} />
            </div>
            <span className="crm-stat-trend up">1m 45s</span>
          </div>
          <div className="crm-stat-value">98.5%</div>
          <div className="crm-stat-label">Response Time SLA</div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#F59E0B' }}>
              <Smile size={20} />
            </div>
            <span className="crm-stat-trend up">4.9 / 5.0</span>
          </div>
          <div className="crm-stat-value">96.4%</div>
          <div className="crm-stat-label">Customer Satisfaction</div>
        </div>
      </div>

      {/* Visual Chart Row 1: Weekly Chat Volume Bar Chart & Department Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        
        {/* Weekly Chat Volume Bar Chart */}
        <div className="crm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Weekly WhatsApp Volume</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--crm-text-sub)' }}>Incoming patient inquiries per day</p>
            </div>
            <span className="crm-btn-sm" style={{ cursor: 'default' }}>
              <TrendingUp size={14} color="#00B894" />
              <span>+24% Volume</span>
            </span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '1rem', borderBottom: '1px solid var(--crm-border)' }}>
            {chatVolumeData.map((item, i) => {
              const heightPct = (item.count / maxChat) * 100;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--crm-text-sub)' }}>{item.count}</span>
                  <div
                    style={{
                      width: '28px',
                      height: `${heightPct}%`,
                      background: i === 4 ? 'linear-gradient(180deg, #00B894 0%, #2ECC71 100%)' : 'rgba(0,184,148,0.25)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--crm-text-heading)' }}>{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Appointment Breakdown */}
        <div className="crm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Department Appointments</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--crm-text-sub)' }}>Monthly patient distribution by specialty</p>
            </div>
            <Award size={20} color="#0EA5E9" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {departmentAppointments.map((dept, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>{dept.dept}</span>
                  <span>{dept.count} bookings</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--crm-border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${dept.pct}%`, backgroundColor: dept.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Visual Chart Row 2: Campaign Performance & Referral Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        
        {/* Campaign Performance Breakdown */}
        <div className="crm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Broadcast Campaign Performance</h3>
            <Megaphone size={18} color="#8B5CF6" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'var(--crm-bg)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00B894' }}>96.8%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)', marginTop: '0.2rem' }}>Delivery Rate</div>
            </div>
            <div style={{ backgroundColor: 'var(--crm-bg)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0EA5E9' }}>78.4%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)', marginTop: '0.2rem' }}>Read Rate</div>
            </div>
            <div style={{ backgroundColor: 'var(--crm-bg)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8B5CF6' }}>24.2%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)', marginTop: '0.2rem' }}>Appointment Conversion</div>
            </div>
          </div>
        </div>

        {/* Referral Statistics */}
        <div className="crm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Patient Referrals & Growth</h3>
            <Users size={18} color="#2ECC71" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--crm-bg)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Total Referral Registrations</span>
              <strong style={{ fontSize: '1.1rem', color: '#2ECC71' }}>342 Patients</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--crm-bg)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Active Referral Codes Claimed</span>
              <strong style={{ fontSize: '1.1rem', color: '#00B894' }}>189 Codes</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
