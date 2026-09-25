import React, { useState, useEffect } from 'react';
import {
  X, Phone, MapPin, Calendar, ExternalLink, Copy, Check,
  Wallet, Award, FileText, Activity, Clock, ShieldCheck
} from 'lucide-react';
import { fetchPatientById } from './adminApi';

export default function PatientInfo({ patient, onClose, onBookAppointment }) {
  const [copied, setCopied] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadFullPatient = async () => {
      if (patient?.id) {
        setLoadingDetails(true);
        try {
          const detailedData = await fetchPatientById(patient.id);
          if (isMounted && detailedData) {
            setPatientDetails(detailedData);
          }
        } catch (e) {
          console.error('Could not fetch patient details:', e);
        } finally {
          if (isMounted) setLoadingDetails(false);
        }
      }
    };

    loadFullPatient();
    return () => { isMounted = false; };
  }, [patient?.id]);

  if (!patient) return null;

  // Use detailed patient object if loaded from backend, or fallback to passed patient prop
  const currentPatient = patientDetails || patient;

  const getInitials = (name) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not Available';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Not Available';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCopyPhone = () => {
    if (currentPatient.phone) {
      navigator.clipboard.writeText(currentPatient.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Field values with "Not Available" fallback
  const ageDisplay = currentPatient.age != null ? `${currentPatient.age} yrs` : 'Not Available';
  const genderDisplay = currentPatient.gender || 'Not Available';
  const addressDisplay = currentPatient.address || 'Not Available';
  const walletDisplay = currentPatient.walletBalance != null
    ? (typeof currentPatient.walletBalance === 'number' ? `$${currentPatient.walletBalance.toFixed(2)}` : currentPatient.walletBalance)
    : 'Not Available';
  const referralDisplay = currentPatient.referralCode || 'Not Available';
  const registrationDisplay = formatDate(currentPatient.createdAt || currentPatient.registeredAt);

  const medicalHistoryList = Array.isArray(currentPatient.medicalHistory) && currentPatient.medicalHistory.length > 0
    ? currentPatient.medicalHistory
    : (typeof currentPatient.medicalHistory === 'string' && currentPatient.medicalHistory ? [currentPatient.medicalHistory] : []);

  const recentBookingsList = Array.isArray(currentPatient.appointments) && currentPatient.appointments.length > 0
    ? currentPatient.appointments
    : [];

  return (
    <div className="crm-patient-drawer">
      {/* Header Profile Summary */}
      <div className="crm-patient-drawer-header">
        <div style={{ alignSelf: 'flex-end', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="crm-btn-sm" onClick={onClose} title="Close Drawer"><X size={16} /></button>
        </div>

        <div className="crm-drawer-avatar">{getInitials(currentPatient.fullName)}</div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--crm-text-heading)', marginTop: '0.2rem' }}>
          {currentPatient.fullName || 'Not Available'}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--crm-primary)', fontWeight: 700 }}>
          {currentPatient.phone || 'Not Available'}
        </p>
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            className="crm-btn-sm"
            style={{ justifyContent: 'center' }}
            onClick={() => currentPatient.phone && window.open(`tel:${currentPatient.phone}`)}
            disabled={!currentPatient.phone}
          >
            <Phone size={13} color="#00B894" />
            <span>Call Patient</span>
          </button>
          <button className="crm-btn-sm" style={{ justifyContent: 'center' }} onClick={() => onBookAppointment && onBookAppointment(currentPatient)}>
            <Calendar size={13} color="#0EA5E9" />
            <span>Book Visit</span>
          </button>
        </div>

        {/* Demographics & Address */}
        <div className="crm-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--crm-text-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Demographics & Address
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--crm-text-sub)' }}>Age:</span>
            <strong>{ageDisplay}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--crm-text-sub)' }}>Gender:</span>
            <strong>{genderDisplay}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--crm-text-sub)' }}>Address:</span>
            <strong style={{ textAlign: 'right', maxWidth: '160px' }}>{addressDisplay}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--crm-text-sub)' }}>Registration Date:</span>
            <strong>{registrationDisplay}</strong>
          </div>
        </div>

        {/* Wallet & Referral */}
        <div className="crm-card" style={{ padding: '1rem', background: 'linear-gradient(135deg, rgba(0,184,148,0.08) 0%, rgba(46,204,113,0.08) 100%)', borderColor: 'rgba(0,184,148,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Wallet size={16} color="#00B894" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--crm-text-heading)' }}>Health Wallet</span>
            </div>
            <strong style={{ fontSize: '1.1rem', color: '#00B894' }}>{walletDisplay}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,184,148,0.2)' }}>
            <span style={{ color: 'var(--crm-text-sub)' }}>Referral Code:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <strong style={{ color: '#0EA5E9' }}>{referralDisplay}</strong>
              {referralDisplay !== 'Not Available' && (
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--crm-text-sub)' }} onClick={handleCopyPhone}>
                  {copied ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="crm-card" style={{ padding: '1rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--crm-text-heading)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Medical History
          </h4>
          {medicalHistoryList.length === 0 ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--crm-text-muted)' }}>Not Available</span>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {medicalHistoryList.map((tag, idx) => (
                <span key={idx} className="crm-btn-sm" style={{ cursor: 'default', backgroundColor: 'rgba(0,184,148,0.1)', color: '#00B894', borderColor: 'transparent' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="crm-card" style={{ padding: '1rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--crm-text-heading)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recent Bookings
          </h4>
          {recentBookingsList.length === 0 ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--crm-text-muted)' }}>Not Available</span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem' }}>
              {recentBookingsList.map((apt) => (
                <div key={apt.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem', backgroundColor: 'var(--crm-bg)', borderRadius: '6px' }}>
                  <span>{apt.doctor?.name || apt.department || 'Consultation'}</span>
                  <strong style={{ color: apt.status === 'COMPLETED' ? '#10B981' : '#00B894' }}>{apt.status}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
