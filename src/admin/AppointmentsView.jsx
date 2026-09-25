import React, { useState, useEffect } from 'react';
import {
  Calendar, Plus, Search, Filter, CheckCircle2, XCircle, Clock,
  MessageSquare, User, Stethoscope, Eye, RefreshCw, X, Send, AlertCircle
} from 'lucide-react';
import { fetchAppointments, updateAppointmentStatus, createAppointment, fetchDoctors } from './adminApi';
import { onNewAppointment } from './adminSocket';

export default function AppointmentsView({ onOpenChat }) {
  const [activeTab, setActiveTab] = useState('TODAY');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showBookModal, setShowBookModal] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);

  // Booking Form State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [apptTime, setApptTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  const loadRealAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetchAppointments(1, 100, activeTab === 'ALL' ? '' : activeTab, searchQuery);
      setAppointments(res.data || []);
    } catch (e) {
      console.error('Failed to load appointments from backend:', e);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const docs = await fetchDoctors();
      setDoctorsList(docs || []);
      if (docs && docs.length > 0) {
        setSelectedDoctorId(docs[0].id);
      }
    } catch (e) {
      console.error('Failed to load doctors:', e);
    }
  };

  useEffect(() => {
    loadRealAppointments();
    loadDoctors();
  }, [activeTab, searchQuery]);

  // Real-time socket updates for new mobile appointments
  useEffect(() => {
    onNewAppointment((newApt) => {
      if (newApt) {
        setAppointments((prev) => [newApt, ...prev]);
      }
    });
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    const pName = apt.patient?.fullName || apt.patientName || 'Not Available';
    const pPhone = apt.patient?.phone || apt.phone || '';
    const dName = apt.doctor?.name || apt.doctorName || '';
    const matchesSearch =
      pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pPhone.includes(searchQuery) ||
      dName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    } catch (e) {
      alert(`Status update failed: ${e.message}`);
    }
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!patientName) return;

    try {
      const newAptData = {
        patientName,
        phone: patientPhone,
        doctorId: selectedDoctorId,
        date: selectedDate,
        time: apptTime,
        notes
      };

      const created = await createAppointment(newAptData);
      setAppointments([created, ...appointments]);
      setShowBookModal(false);
      setPatientName('');
      setPatientPhone('');
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    }
  };

  return (
    <div className="crm-view-container">
      {/* Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>Real-Time Appointments & Bookings</h1>
          <p>Live appointments registered from the mobile app and WhatsApp bot.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="crm-btn-sm" onClick={loadRealAppointments} title="Refresh Database">
            <RefreshCw size={14} />
            <span>Sync</span>
          </button>
          <button className="crm-btn-primary" onClick={() => setShowBookModal(true)}>
            <Plus size={16} />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="crm-card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="crm-filter-pills">
          <button className={`crm-filter-pill ${activeTab === 'TODAY' ? 'active' : ''}`} onClick={() => setActiveTab('TODAY')}>
            Today's
          </button>
          <button className={`crm-filter-pill ${activeTab === 'UPCOMING' ? 'active' : ''}`} onClick={() => setActiveTab('UPCOMING')}>
            Upcoming
          </button>
          <button className={`crm-filter-pill ${activeTab === 'COMPLETED' ? 'active' : ''}`} onClick={() => setActiveTab('COMPLETED')}>
            Completed
          </button>
          <button className={`crm-filter-pill ${activeTab === 'CANCELLED' ? 'active' : ''}`} onClick={() => setActiveTab('CANCELLED')}>
            Cancelled
          </button>
          <button className={`crm-filter-pill ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTab('ALL')}>
            All Records ({appointments.length})
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="date"
            className="crm-input"
            style={{ width: 'auto', fontSize: '0.85rem' }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <div className="crm-search-box" style={{ width: '220px' }}>
            <Search className="crm-search-icon" size={15} />
            <input
              type="text"
              className="crm-search-input"
              placeholder="Search patient, doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointment Directory Table */}
      <div className="crm-table-card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Patient Details</th>
              <th>Assigned Doctor</th>
              <th>Department</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Notes / Reason</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7}>
                    <div className="crm-skeleton" style={{ height: '24px', width: '100%' }} />
                  </td>
                </tr>
              ))
            ) : filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--crm-text-sub)' }}>
                  <Calendar size={36} opacity={0.4} style={{ margin: '0 auto 0.5rem' }} />
                  <h4>No backend appointments found</h4>
                  <p style={{ fontSize: '0.8rem' }}>Appointments booked from the mobile app will automatically appear here.</p>
                </td>
              </tr>
            ) : (
              filteredAppointments.map((apt) => {
                const pName = apt.patient?.fullName || apt.patientName || 'Not Available';
                const pPhone = apt.patient?.phone || apt.phone || 'Not Available';
                const dName = apt.doctor?.name || apt.doctorName || 'Not Assigned';
                const deptName = apt.doctor?.department || apt.department || 'General Medicine';

                return (
                  <tr key={apt.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--crm-text-heading)' }}>{pName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)' }}>{pPhone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--crm-primary)' }}>{dName}</div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--crm-text-body)' }}>{deptName}</td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{apt.time || apt.slotTime || 'Not Available'}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--crm-text-muted)' }}>{apt.date || apt.appointmentDate || 'Not Available'}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          backgroundColor:
                            apt.status === 'CONFIRMED' || apt.status === 'COMPLETED' ? 'rgba(16,185,129,0.1)' :
                            apt.status === 'PENDING' || apt.status === 'TODAY' ? 'rgba(0,184,148,0.1)' :
                            apt.status === 'CANCELLED' ? 'rgba(239,68,68,0.1)' : 'rgba(14,165,233,0.1)',
                          color:
                            apt.status === 'CONFIRMED' || apt.status === 'COMPLETED' ? '#10B981' :
                            apt.status === 'PENDING' || apt.status === 'TODAY' ? '#00B894' :
                            apt.status === 'CANCELLED' ? '#EF4444' : '#0EA5E9'
                        }}
                      >
                        ● {apt.status || 'PENDING'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', maxWidth: '180px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--crm-text-sub)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {apt.notes || apt.symptoms || 'Not Available'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                        {onOpenChat && (
                          <button className="crm-btn-sm" title="Open Patient WhatsApp Chat" onClick={() => onOpenChat(pName)}>
                            <MessageSquare size={13} color="#00B894" />
                            <span>Chat</span>
                          </button>
                        )}
                        {apt.status !== 'COMPLETED' && apt.status !== 'CANCELLED' && (
                          <>
                            <button className="crm-btn-sm" title="Confirm" onClick={() => handleStatusUpdate(apt.id, 'COMPLETED')}>
                              <CheckCircle2 size={13} color="#10B981" />
                              <span>Confirm</span>
                            </button>
                            <button className="crm-btn-sm" title="Cancel" onClick={() => handleStatusUpdate(apt.id, 'CANCELLED')}>
                              <XCircle size={13} color="#EF4444" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal">
            <div className="crm-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Schedule Patient Appointment</h3>
              <button className="crm-btn-sm" onClick={() => setShowBookModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleBookSubmit}>
              <div className="crm-modal-body">
                <div className="crm-form-group">
                  <label>Patient Full Name</label>
                  <input type="text" className="crm-input" placeholder="e.g. Sarah Jenkins" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                </div>
                <div className="crm-form-group">
                  <label>Phone Number (WhatsApp)</label>
                  <input type="text" className="crm-input" placeholder="+256 700 000000" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} required />
                </div>
                <div className="crm-form-group">
                  <label>Consulting Doctor</label>
                  <select className="crm-input" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
                    {doctorsList.length > 0 ? (
                      doctorsList.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.department || 'Consultant'})</option>
                      ))
                    ) : (
                      <option value="">No doctors available in backend</option>
                    )}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="crm-form-group">
                    <label>Appointment Date</label>
                    <input type="date" className="crm-input" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                  </div>
                  <div className="crm-form-group">
                    <label>Slot Time</label>
                    <input type="text" className="crm-input" placeholder="10:00 AM" value={apptTime} onChange={(e) => setApptTime(e.target.value)} required />
                  </div>
                </div>
                <div className="crm-form-group">
                  <label>Notes / Symptoms</label>
                  <textarea className="crm-input" rows={2} placeholder="Reason for visit..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
              <div className="crm-modal-footer">
                <button type="button" className="crm-btn-sm" onClick={() => setShowBookModal(false)}>Cancel</button>
                <button type="submit" className="crm-btn-primary">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
