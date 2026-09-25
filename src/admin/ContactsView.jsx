import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, Download, Upload, Phone, MessageSquare,
  Eye, Plus, X, Copy, MapPin, Wallet, Calendar, RefreshCw
} from 'lucide-react';
import { fetchPatients, fetchInbox } from './adminApi';

export default function ContactsView({ onOpenChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllBackendPatients = async () => {
    setLoading(true);
    try {
      // Fetch ALL patients from backend without truncation
      const res = await fetchPatients(1, 1000, searchQuery);
      let patientList = res.data || [];

      // If patients table empty, fallback to all inbox conversations
      if (patientList.length === 0) {
        const inboxList = await fetchInbox(1, 1000);
        if (inboxList && inboxList.length > 0) {
          patientList = inboxList;
        }
      }

      setPatients(patientList);
    } catch (e) {
      console.error('Failed to load backend patients:', e);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBackendPatients();
  }, [searchQuery]);

  const filteredPatients = patients.filter((p) => {
    const cityVal = p.city || p.address || '';
    const matchesCity = cityFilter === 'ALL' || cityVal.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesCity;
  });

  const handleExportCSV = () => {
    if (patients.length === 0) return;
    const headers = ['ID,Full Name,Phone,City,Status,Age,Gender,Wallet Balance\n'];
    const rows = patients.map(p => `${p.id},"${p.fullName || 'Not Available'}",${p.phone || 'Not Available'},${p.city || 'Not Available'},${p.status || 'Active'},${p.age || 'N/A'},${p.gender || 'N/A'},${p.walletBalance || 'N/A'}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LINELEKUNDA_All_Patients.csv';
    a.click();
  };

  return (
    <div className="crm-view-container">
      {/* View Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>Patient Directory & Contacts ({patients.length})</h1>
          <p>Real-time synchronised patient records from WhatsApp chats and app registrations.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="crm-btn-sm" onClick={loadAllBackendPatients} title="Refresh Live Database">
            <RefreshCw size={14} />
            <span>Sync</span>
          </button>
          <button className="crm-btn-sm" onClick={handleExportCSV}>
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button className="crm-btn-primary" onClick={() => setShowImportModal(true)}>
            <Upload size={14} />
            <span>Import Contacts</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="crm-card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--crm-text-sub)' }}>Filter Location:</span>
          <select className="crm-input" style={{ width: 'auto', fontSize: '0.85rem' }} value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="ALL">All Cities</option>
            <option value="Kampala">Kampala</option>
            <option value="Entebbe">Entebbe</option>
            <option value="Jinja">Jinja</option>
          </select>
        </div>

        <div className="crm-search-box" style={{ width: '280px' }}>
          <Search className="crm-search-icon" size={15} />
          <input
            type="text"
            className="crm-search-input"
            placeholder="Search database patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Directory Table Container - Grows naturally with data */}
      <div className="crm-table-card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Gender & Age</th>
              <th>Status</th>
              <th>Wallet Balance</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7}>
                    <div className="crm-skeleton" style={{ height: '24px', width: '100%' }} />
                  </td>
                </tr>
              ))
            ) : filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--crm-text-sub)' }}>
                  <Users size={36} opacity={0.4} style={{ margin: '0 auto 0.5rem' }} />
                  <h4>No patient records in database</h4>
                  <p style={{ fontSize: '0.8rem' }}>Registered WhatsApp patients will automatically appear here.</p>
                </td>
              </tr>
            ) : (
              /* Render ALL patient records returned by backend */
              filteredPatients.map((pt) => (
                <tr key={pt.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--crm-text-heading)' }}>{pt.fullName || 'Not Available'}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--crm-text-muted)' }}>ID: {pt.id}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--crm-primary)' }}>{pt.phone || 'Not Available'}</td>
                  <td style={{ fontSize: '0.85rem' }}>{pt.city || pt.address || 'Not Available'}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--crm-text-sub)' }}>
                    {pt.gender || 'Not Available'}{pt.age != null ? `, ${pt.age} yrs` : ''}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        backgroundColor: 'rgba(0,184,148,0.1)',
                        color: '#00B894'
                      }}
                    >
                      ● {pt.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#10B981' }}>
                    {pt.walletBalance != null
                      ? (typeof pt.walletBalance === 'number' ? `$${pt.walletBalance.toFixed(2)}` : pt.walletBalance)
                      : 'Not Available'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                      <button className="crm-btn-sm" onClick={() => setSelectedPatient(pt)} title="View Patient Details">
                        <Eye size={13} />
                        <span>Details</span>
                      </button>
                      {onOpenChat && (
                        <button className="crm-btn-sm" onClick={() => onOpenChat(pt.fullName || pt.phone)} title="WhatsApp Chat">
                          <MessageSquare size={13} color="#00B894" />
                          <span>Chat</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--crm-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--crm-text-sub)' }}>
            Total <strong>{filteredPatients.length}</strong> patient records loaded from database
          </span>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="crm-modal-overlay">
          <div className="crm-modal" style={{ maxWidth: '440px' }}>
            <div className="crm-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Database Patient Profile</h3>
              <button className="crm-btn-sm" onClick={() => setSelectedPatient(null)}><X size={16} /></button>
            </div>
            <div className="crm-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #00B894 0%, #0EA5E9 100%)', color: '#fff', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedPatient.fullName ? selectedPatient.fullName.substring(0, 2).toUpperCase() : 'P'}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>{selectedPatient.fullName || 'Not Available'}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--crm-primary)', fontWeight: 700 }}>{selectedPatient.phone || 'Not Available'}</span>
              </div>

              <div style={{ backgroundColor: 'var(--crm-bg)', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--crm-text-sub)' }}>Age / Gender:</span>
                  <strong>{selectedPatient.age != null ? `${selectedPatient.age} yrs` : 'Not Available'} / {selectedPatient.gender || 'Not Available'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--crm-text-sub)' }}>Address / City:</span>
                  <strong style={{ textAlign: 'right', maxWidth: '200px' }}>{selectedPatient.address || selectedPatient.city || 'Not Available'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--crm-text-sub)' }}>Referral Code:</span>
                  <strong style={{ color: '#0EA5E9' }}>{selectedPatient.referralCode || 'Not Available'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--crm-text-sub)' }}>Health Wallet Balance:</span>
                  <strong style={{ color: '#10B981', fontSize: '1rem' }}>
                    {selectedPatient.walletBalance != null
                      ? (typeof selectedPatient.walletBalance === 'number' ? `$${selectedPatient.walletBalance.toFixed(2)}` : selectedPatient.walletBalance)
                      : 'Not Available'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="crm-modal-footer">
              <button className="crm-btn-sm" onClick={() => selectedPatient.phone && window.open(`tel:${selectedPatient.phone}`)} disabled={!selectedPatient.phone}>
                <Phone size={14} />
                <span>Call Patient</span>
              </button>
              {onOpenChat && (
                <button className="crm-btn-primary" onClick={() => { setSelectedPatient(null); onOpenChat(selectedPatient.fullName || selectedPatient.phone); }}>
                  <MessageSquare size={14} />
                  <span>Open WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal">
            <div className="crm-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Import Patient Contacts</h3>
              <button className="crm-btn-sm" onClick={() => setShowImportModal(false)}><X size={16} /></button>
            </div>
            <div className="crm-modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
              <Upload size={36} color="#00B894" style={{ margin: '0 auto 1rem' }} />
              <h4>Upload Excel or CSV File</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--crm-text-sub)', marginTop: '0.3rem' }}>
                Drag and drop your patient directory list (.csv, .xlsx).
              </p>
            </div>
            <div className="crm-modal-footer">
              <button className="crm-btn-sm" onClick={() => setShowImportModal(false)}>Cancel</button>
              <button className="crm-btn-primary" onClick={() => setShowImportModal(false)}>
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
