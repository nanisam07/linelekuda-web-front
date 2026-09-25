import React, { useState } from 'react';
import {
  Megaphone, Plus, Copy, Pause, Play, Trash2, CheckCircle2,
  Clock, AlertCircle, Users, FileText, Send, Info, Eye, BarChart2, X
} from 'lucide-react';

export default function CampaignsView() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Interactive Form State for New Campaign
  const [campaignName, setCampaignName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('dental_reminder_v1');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [scheduleType, setScheduleType] = useState('immediate');
  const [scheduleTime, setScheduleTime] = useState('');

  // Sample Campaign Datasets
  const [campaigns, setCampaigns] = useState([
    {
      id: 'cmp-101',
      name: 'Monsoon Preventive Health Checkup',
      template: 'preventive_checkup_monsoon',
      audience: 'All Patients (City: Kampala)',
      scheduledAt: 'Immediate',
      status: 'Completed',
      total: 1250,
      delivered: 1210,
      read: 980,
      failed: 40,
      deliveryPct: 96.8,
      readPct: 78.4,
      createdAt: '2026-08-01'
    },
    {
      id: 'cmp-102',
      name: 'Orthopedic OPD Follow-up Broadcast',
      template: 'ortho_followup_reminder',
      audience: 'Orthopedic Patients',
      scheduledAt: '2026-08-10 09:00 AM',
      status: 'Scheduled',
      total: 480,
      delivered: 0,
      read: 0,
      failed: 0,
      deliveryPct: 0,
      readPct: 0,
      createdAt: '2026-08-05'
    },
    {
      id: 'cmp-103',
      name: 'Pediatrics Vaccination Awareness',
      template: 'peds_vaccine_drive',
      audience: 'New Patients (Last 30 Days)',
      scheduledAt: 'Immediate',
      status: 'Running',
      total: 890,
      delivered: 620,
      read: 410,
      failed: 12,
      deliveryPct: 69.6,
      readPct: 46.0,
      createdAt: '2026-08-07'
    }
  ]);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!campaignName.trim()) return;

    const newCmp = {
      id: 'cmp-' + (100 + campaigns.length + 1),
      name: campaignName,
      template: selectedTemplate,
      audience: selectedAudience === 'all' ? 'All Patients' : selectedAudience === 'new' ? 'New Patients' : `${selectedAudience.toUpperCase()} Patients`,
      scheduledAt: scheduleType === 'immediate' ? 'Immediate' : scheduleTime || 'Tomorrow 10:00 AM',
      status: scheduleType === 'immediate' ? 'Running' : 'Scheduled',
      total: 650,
      delivered: 0,
      read: 0,
      failed: 0,
      deliveryPct: 0,
      readPct: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns([newCmp, ...campaigns]);
    setShowCreateModal(false);
    setCampaignName('');
  };

  const handleDuplicate = (cmp) => {
    const dup = { ...cmp, id: 'cmp-' + Date.now(), name: `${cmp.name} (Copy)`, status: 'Draft' };
    setCampaigns([dup, ...campaigns]);
  };

  const handleTogglePause = (id) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: c.status === 'Running' ? 'Paused' : 'Running' } : c));
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  return (
    <div className="crm-view-container">
      {/* View Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>WhatsApp Broadcast Campaigns</h1>
          <p>Meta WhatsApp Cloud API Campaign Broadcast Manager & Delivery Analytics.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="crm-roadmap-badge">
            <Info size={14} />
            <span>Backend integration will be connected later</span>
          </span>

          <button className="crm-btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaign Analytics Cards */}
      <div className="crm-stats-grid">
        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#00B894' }}>
              <Megaphone size={20} />
            </div>
            <span className="crm-stat-trend up">Live Queue</span>
          </div>
          <div className="crm-stat-value">3</div>
          <div className="crm-stat-label">Total Campaigns</div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#2ECC71' }}>
              <CheckCircle2 size={20} />
            </div>
            <span className="crm-stat-trend up">96.8% Avg</span>
          </div>
          <div className="crm-stat-value">1,830</div>
          <div className="crm-stat-label">Messages Delivered</div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#0EA5E9' }}>
              <Eye size={20} />
            </div>
            <span className="crm-stat-trend up">76.2% Open</span>
          </div>
          <div className="crm-stat-value">1,390</div>
          <div className="crm-stat-label">Read Receipts</div>
        </div>

        <div className="crm-stat-card">
          <div className="crm-stat-top">
            <div className="crm-stat-icon-wrapper" style={{ backgroundColor: '#EF4444' }}>
              <AlertCircle size={20} />
            </div>
            <span className="crm-stat-trend down">2.8% Error</span>
          </div>
          <div className="crm-stat-value">52</div>
          <div className="crm-stat-label">Failed Recipients</div>
        </div>
      </div>

      {/* Rules Banner */}
      <div className="crm-card" style={{ backgroundColor: 'rgba(0,184,148,0.06)', borderColor: 'rgba(0,184,148,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Info size={20} color="#00B894" />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '0.88rem', color: 'var(--crm-text-heading)' }}>Meta WhatsApp Policy Notice:</strong>
            <span style={{ fontSize: '0.82rem', color: 'var(--crm-text-sub)', marginLeft: '0.5rem' }}>
              Campaigns strictly use approved Meta WhatsApp Templates. No free-text broadcasts are allowed by Meta API policies.
            </span>
          </div>
        </div>
      </div>

      {/* Campaign List Table */}
      <div className="crm-table-card">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--crm-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Campaign Records</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--crm-text-sub)' }}>Showing {campaigns.length} campaigns</span>
        </div>

        <table className="crm-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Template</th>
              <th>Target Audience</th>
              <th>Schedule</th>
              <th>Status</th>
              <th>Delivery Progress</th>
              <th>Analytics</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((cmp) => (
              <tr key={cmp.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--crm-text-heading)' }}>{cmp.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--crm-text-muted)' }}>ID: {cmp.id}</div>
                </td>
                <td>
                  <span className="crm-btn-sm" style={{ cursor: 'default' }}>
                    <FileText size={13} color="#00B894" />
                    <span>{cmp.template}</span>
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--crm-text-sub)' }}>{cmp.audience}</td>
                <td style={{ fontSize: '0.82rem', fontWeight: 600 }}>{cmp.scheduledAt}</td>
                <td>
                  <span
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor:
                        cmp.status === 'Completed' ? 'rgba(16,185,129,0.1)' :
                        cmp.status === 'Running' ? 'rgba(14,165,233,0.1)' :
                        cmp.status === 'Scheduled' ? 'rgba(245,158,11,0.1)' : 'rgba(148,163,184,0.1)',
                      color:
                        cmp.status === 'Completed' ? '#10B981' :
                        cmp.status === 'Running' ? '#0EA5E9' :
                        cmp.status === 'Scheduled' ? '#F59E0B' : '#64748B'
                    }}
                  >
                    ● {cmp.status}
                  </span>
                </td>
                <td style={{ width: '180px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700 }}>
                      <span>{cmp.delivered} / {cmp.total}</span>
                      <span>{cmp.deliveryPct}%</span>
                    </div>
                    <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--crm-border)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${cmp.deliveryPct}%`, backgroundColor: '#00B894', transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: '0.78rem' }}>
                  <div>Delivered: <strong style={{ color: '#00B894' }}>{cmp.delivered}</strong></div>
                  <div>Read: <strong style={{ color: '#0EA5E9' }}>{cmp.read}</strong> | Failed: <strong style={{ color: '#EF4444' }}>{cmp.failed}</strong></div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    <button className="crm-btn-sm" title="Duplicate Campaign" onClick={() => handleDuplicate(cmp)}>
                      <Copy size={13} />
                    </button>
                    {cmp.status === 'Running' || cmp.status === 'Paused' ? (
                      <button className="crm-btn-sm" title={cmp.status === 'Running' ? 'Pause' : 'Resume'} onClick={() => handleTogglePause(cmp.id)}>
                        {cmp.status === 'Running' ? <Pause size={13} color="#F59E0B" /> : <Play size={13} color="#10B981" />}
                      </button>
                    ) : null}
                    <button className="crm-btn-sm" title="Delete" onClick={() => handleDelete(cmp.id)}>
                      <Trash2 size={13} color="#EF4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal">
            <div className="crm-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Megaphone size={20} color="#00B894" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Create Broadcast Campaign</h3>
              </div>
              <button className="crm-btn-sm" onClick={() => setShowCreateModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign}>
              <div className="crm-modal-body">
                <div className="crm-form-group">
                  <label>Campaign Name</label>
                  <input
                    type="text"
                    className="crm-input"
                    placeholder="e.g. Orthopedic Checkup Broadcast"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    required
                  />
                </div>

                <div className="crm-form-group">
                  <label>Select Meta WhatsApp Approved Template</label>
                  <select
                    className="crm-input"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="dental_reminder_v1">dental_reminder_v1 (Approved - Utility)</option>
                    <option value="preventive_checkup_monsoon">preventive_checkup_monsoon (Approved - Marketing)</option>
                    <option value="ortho_followup_reminder">ortho_followup_reminder (Approved - Service)</option>
                  </select>
                </div>

                <div className="crm-form-group">
                  <label>Target Audience Segment</label>
                  <select
                    className="crm-input"
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                  >
                    <option value="all">All Registered Patients</option>
                    <option value="new">New Patients (Registered last 30 days)</option>
                    <option value="orthopedic">Orthopedic Department Patients</option>
                    <option value="ent">ENT Department Patients</option>
                  </select>
                </div>

                <div className="crm-form-group">
                  <label>Scheduling Option</label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="schedule"
                        value="immediate"
                        checked={scheduleType === 'immediate'}
                        onChange={() => setScheduleType('immediate')}
                      />
                      <span>Send Immediately</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="schedule"
                        value="later"
                        checked={scheduleType === 'later'}
                        onChange={() => setScheduleType('later')}
                      />
                      <span>Schedule for Later</span>
                    </label>
                  </div>
                </div>

                {scheduleType === 'later' && (
                  <div className="crm-form-group">
                    <label>Broadcast Date & Time</label>
                    <input
                      type="datetime-local"
                      className="crm-input"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="crm-modal-footer">
                <button type="button" className="crm-btn-sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="crm-btn-primary">
                  <Send size={15} />
                  <span>Launch Campaign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
