import React from 'react';
import { Building2, Users, Calendar, Clock, Plus, Info, Award } from 'lucide-react';

export default function DepartmentsView() {
  const departments = [
    {
      id: 'dept-1',
      name: 'Orthopedics & Spine Center',
      headDoctor: 'Dr. Samuel Kintu',
      activeDoctors: 4,
      todayAppointments: 18,
      queueCount: 3,
      desc: 'Comprehensive bone joint care, trauma management, arthroscopy, and spine corrective surgeries.',
      color: '#00B894'
    },
    {
      id: 'dept-2',
      name: 'ENT & Head Neck Surgery',
      headDoctor: 'Dr. Amanda Vance',
      activeDoctors: 3,
      todayAppointments: 14,
      queueCount: 2,
      desc: 'Ear nose throat diagnostic care, audiometry testing, sinus endoscopic surgeries, and vocal therapy.',
      color: '#0EA5E9'
    },
    {
      id: 'dept-3',
      name: 'Pediatrics & Child Care',
      headDoctor: 'Dr. Grace Mukasa',
      activeDoctors: 5,
      todayAppointments: 22,
      queueCount: 5,
      desc: 'Infant immunization drives, pediatric wellness checks, neonatal care, and growth monitoring.',
      color: '#2ECC71'
    },
    {
      id: 'dept-4',
      name: 'Cardiology & Heart Care',
      headDoctor: 'Dr. Patrick Omondi',
      activeDoctors: 3,
      todayAppointments: 12,
      queueCount: 1,
      desc: 'Non-invasive cardiac evaluation, ECG, 2D Echo, TMT stress test, and hypertension management.',
      color: '#8B5CF6'
    },
    {
      id: 'dept-5',
      name: 'General Medicine & OPD',
      headDoctor: 'Dr. Robert Ssebugwawo',
      activeDoctors: 6,
      todayAppointments: 34,
      queueCount: 8,
      desc: 'Primary outpatient consultation, fever clinic, diagnostic triaging, and chronic illness management.',
      color: '#F59E0B'
    }
  ];

  return (
    <div className="crm-view-container">
      {/* View Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>Hospital Departments & OPD Queues</h1>
          <p>Medical department overview, department head doctors, active consulting queues, and appointment counts.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="crm-roadmap-badge">
            <Info size={14} />
            <span>UI Only - Backend connection later</span>
          </span>

          <button className="crm-btn-primary" onClick={() => alert("Add Department Modal (UI Placeholder)")}>
            <Plus size={16} />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Grid of Department Cards */}
      <div className="crm-grid-3">
        {departments.map((dept) => (
          <div className="crm-card" key={dept.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: dept.color,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--crm-shadow-sm)',
                  flexShrink: 0
                }}
              >
                <Building2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>{dept.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--crm-text-sub)' }}>Head: <strong>{dept.headDoctor}</strong></span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--crm-text-body)', lineHeight: 1.45 }}>{dept.desc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
              <div style={{ backgroundColor: 'var(--crm-bg)', padding: '0.65rem 0.4rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>{dept.activeDoctors}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--crm-text-sub)' }}>Doctors</div>
              </div>
              <div style={{ backgroundColor: 'var(--crm-bg)', padding: '0.65rem 0.4rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00B894' }}>{dept.todayAppointments}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--crm-text-sub)' }}>Today's Appts</div>
              </div>
              <div style={{ backgroundColor: 'var(--crm-bg)', padding: '0.65rem 0.4rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F59E0B' }}>{dept.queueCount}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--crm-text-sub)' }}>Live Queue</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--crm-border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>● OPD Active</span>
              <button className="crm-btn-sm" onClick={() => alert(`Managing queue for ${dept.name}`)}>
                <span>Manage Queue</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
