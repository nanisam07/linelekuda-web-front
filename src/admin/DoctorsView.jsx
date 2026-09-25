import React, { useState, useEffect } from 'react';
import {
  UserCheck, Plus, Search, Filter, Stethoscope, Calendar, Clock,
  Edit3, Trash2, CheckCircle, Info, X, Phone, Mail, Award, RefreshCw
} from 'lucide-react';
import { fetchDoctors } from './adminApi';

export default function DoctorsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [docName, setDocName] = useState('');
  const [docDept, setDocDept] = useState('Orthopedics');
  const [docQual, setDocQual] = useState('MBBS, MS (Ortho)');
  const [docExp, setDocExp] = useState('10 Years');
  const [docTimings, setDocTimings] = useState('Mon - Sat: 9:00 AM - 1:00 PM');

  const [doctors, setDoctors] = useState([]);

  const loadRealDoctors = async () => {
    setLoading(true);
    try {
      const realDocs = await fetchDoctors(departmentFilter === 'ALL' ? '' : departmentFilter, searchQuery);
      if (realDocs && realDocs.length > 0) {
        setDoctors(realDocs);
      } else {
        // Fallback UI doctors if database table empty
        setDoctors([
          {
            id: 'doc-1',
            name: 'Dr. Samuel Kintu',
            department: 'Orthopedics',
            qualification: 'MBBS, MS (Ortho), Fellowship Spine Surgery',
            experience: '14 Years',
            availability: 'Available Today',
            timings: 'Mon - Fri: 9:00 AM - 2:00 PM',
            phone: '+256 701 234567',
            email: 'dr.kintu@linelekunda.com',
            avatarColor: '#00B894'
          },
          {
            id: 'doc-2',
            name: 'Dr. Amanda Vance',
            department: 'ENT & Head Surgery',
            qualification: 'MBBS, DLO, MS (ENT)',
            experience: '9 Years',
            availability: 'Available Today',
            timings: 'Mon - Sat: 10:00 AM - 4:00 PM',
            phone: '+256 702 345678',
            email: 'dr.vance@linelekunda.com',
            avatarColor: '#0EA5E9'
          },
          {
            id: 'doc-3',
            name: 'Dr. Grace Mukasa',
            department: 'Pediatrics',
            qualification: 'MBBS, MD (Pediatrics)',
            experience: '12 Years',
            availability: 'On Leave',
            timings: 'Tue - Sun: 8:00 AM - 1:00 PM',
            phone: '+256 703 456789',
            email: 'dr.mukasa@linelekunda.com',
            avatarColor: '#2ECC71'
          }
        ]);
      }
    } catch (e) {
      console.error('Failed to load doctors:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealDoctors();
  }, [departmentFilter, searchQuery]);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!docName) return;

    const newDoc = {
      id: 'doc-' + Date.now(),
      name: docName.startsWith('Dr.') ? docName : `Dr. ${docName}`,
      department: docDept,
      qualification: docQual,
      experience: docExp,
      availability: 'Available Today',
      timings: docTimings,
      phone: '+256 700 000000',
      email: `${docName.toLowerCase().replace(/\s+/g, '.')}@linelekunda.com`,
      avatarColor: '#00B894'
    };

    setDoctors([newDoc, ...doctors]);
    setShowAddModal(false);
    setDocName('');
  };

  return (
    <div className="crm-view-container">
      {/* View Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>Doctor Roster & OP Schedule</h1>
          <p>Hospital physician profiles, qualifications, department assignments, and OP consulting hours.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="crm-btn-sm" onClick={loadRealDoctors}>
            <RefreshCw size={14} />
            <span>Sync</span>
          </button>
          <button className="crm-btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="crm-card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--crm-text-sub)' }}>Department:</span>
          <select className="crm-input" style={{ width: 'auto', fontSize: '0.85rem' }} value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="ALL">All Departments</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="ENT">ENT</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Cardiology">Cardiology</option>
          </select>
        </div>

        <div className="crm-search-box" style={{ width: '280px' }}>
          <Search className="crm-search-icon" size={15} />
          <input
            type="text"
            className="crm-search-input"
            placeholder="Search doctor by name or qualification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="crm-grid-3">
        {doctors.map((doc) => (
          <div className="crm-card" key={doc.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: doc.avatarColor || '#00B894',
                  color: '#ffffff',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--crm-shadow-sm)',
                  flexShrink: 0
                }}
              >
                {doc.name ? doc.name.replace('Dr. ', '').substring(0, 2).toUpperCase() : 'DR'}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--crm-text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {doc.name}
                  </h3>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--crm-primary)' }}>{doc.department || 'Consultant'}</span>
                <div style={{ fontSize: '0.72rem', color: 'var(--crm-text-sub)', marginTop: '0.15rem' }}>{doc.qualification || 'MBBS'}</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--crm-bg)', padding: '0.85rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={14} color="var(--crm-text-sub)" />
                <span>Experience: <strong>{doc.experience || 'Not Available'}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="var(--crm-text-sub)" />
                <span>OP Hours: <strong>{doc.timings || 'Not Available'}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} color="var(--crm-text-sub)" />
                <span>{doc.phone || 'Not Available'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--crm-border-subtle)' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16,185,129,0.1)',
                color: '#10B981'
              }}>
                ● {doc.availability || 'Available Today'}
              </span>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button className="crm-btn-sm" onClick={() => alert(`View OP Schedule for ${doc.name}`)}>
                  <Calendar size={13} />
                  <span>Schedule</span>
                </button>
                <button className="crm-btn-sm" onClick={() => alert(`Edit ${doc.name}`)}>
                  <Edit3 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal">
            <div className="crm-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Add New Doctor</h3>
              <button className="crm-btn-sm" onClick={() => setShowAddModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleAddDoctor}>
              <div className="crm-modal-body">
                <div className="crm-form-group">
                  <label>Full Name</label>
                  <input type="text" className="crm-input" placeholder="Dr. John Doe" value={docName} onChange={(e) => setDocName(e.target.value)} required />
                </div>
                <div className="crm-form-group">
                  <label>Department</label>
                  <select className="crm-input" value={docDept} onChange={(e) => setDocDept(e.target.value)}>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="ENT & Head Surgery">ENT & Head Surgery</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>
                <div className="crm-form-group">
                  <label>Qualifications</label>
                  <input type="text" className="crm-input" placeholder="e.g. MBBS, MS (Ortho)" value={docQual} onChange={(e) => setDocQual(e.target.value)} />
                </div>
                <div className="crm-form-group">
                  <label>OP Timing Schedule</label>
                  <input type="text" className="crm-input" placeholder="e.g. Mon - Sat: 9:00 AM - 1:00 PM" value={docTimings} onChange={(e) => setDocTimings(e.target.value)} />
                </div>
              </div>
              <div className="crm-modal-footer">
                <button type="button" className="crm-btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="crm-btn-primary">Save Doctor Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
