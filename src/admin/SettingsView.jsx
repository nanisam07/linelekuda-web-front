import React, { useState } from 'react';
import {
  Settings, Building2, Smartphone, Bell, Palette, Users, Shield,
  Save, Info, Upload, Check, Lock, Globe, Key
} from 'lucide-react';

export default function SettingsView({ user }) {
  const [activeTab, setActiveTab] = useState('hospital');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form States
  const [hospitalName, setHospitalName] = useState('LINELEKUNDA Hospital & Research Center');
  const [address, setAddress] = useState('Plot 12 Nakasero Road, Kampala, Uganda');
  const [hotline, setHotline] = useState('+256 414 100 200');

  const [waPhoneId, setWaPhoneId] = useState('109283746501928');
  const [waWabaId, setWaWabaId] = useState('991827364501928');
  const [waToken, setWaToken] = useState('EAAGk...MetaCloudPermanentToken');

  const [notificationsSound, setNotificationsSound] = useState(true);
  const [desktopPush, setDesktopPush] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="crm-view-container">
      {/* Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>CRM & System Settings</h1>
          <p>Configure hospital branding, WhatsApp Cloud API tokens, receptionists, and notification alerts.</p>
        </div>

        <button className="crm-btn-primary" onClick={handleSave}>
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid #10B981', borderRadius: '12px', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={18} />
          <span>Settings saved successfully! (Frontend state updated)</span>
        </div>
      )}

      {/* Tabs */}
      <div className="crm-card" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto' }}>
        <button className={`crm-filter-pill ${activeTab === 'hospital' ? 'active' : ''}`} onClick={() => setActiveTab('hospital')}>
          <Building2 size={14} />
          <span>Hospital Profile</span>
        </button>
        <button className={`crm-filter-pill ${activeTab === 'whatsapp' ? 'active' : ''}`} onClick={() => setActiveTab('whatsapp')}>
          <Smartphone size={14} />
          <span>WhatsApp Cloud API</span>
        </button>
        <button className={`crm-filter-pill ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
          <Users size={14} />
          <span>Receptionists & Roles</span>
        </button>
        <button className={`crm-filter-pill ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
          <Bell size={14} />
          <span>Notification Alerts</span>
        </button>
        <button className={`crm-filter-pill ${activeTab === 'theme' ? 'active' : ''}`} onClick={() => setActiveTab('theme')}>
          <Palette size={14} />
          <span>Appearance & Theme</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="crm-card">
        {activeTab === 'hospital' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Hospital Information</h3>

            <div className="crm-form-group">
              <label>Hospital Brand Name</label>
              <input type="text" className="crm-input" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
            </div>

            <div className="crm-form-group">
              <label>Physical Address</label>
              <input type="text" className="crm-input" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="crm-form-group">
              <label>Emergency Hotline Number</label>
              <input type="text" className="crm-input" value={hotline} onChange={(e) => setHotline(e.target.value)} />
            </div>

            <div className="crm-form-group">
              <label>Hospital Logo Upload</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #00B894, #2ECC71)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  LLK
                </div>
                <button className="crm-btn-sm" type="button">
                  <Upload size={14} />
                  <span>Choose Logo File</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Meta WhatsApp Business API</h3>
              <span className="crm-btn-sm" style={{ cursor: 'default', color: '#10B981', borderColor: '#10B981' }}>
                ● Webhook Connected
              </span>
            </div>

            <div className="crm-form-group">
              <label>WhatsApp Phone Number ID</label>
              <input type="text" className="crm-input" value={waPhoneId} onChange={(e) => setWaPhoneId(e.target.value)} />
            </div>

            <div className="crm-form-group">
              <label>WhatsApp Business Account ID (WABA)</label>
              <input type="text" className="crm-input" value={waWabaId} onChange={(e) => setWaWabaId(e.target.value)} />
            </div>

            <div className="crm-form-group">
              <label>Permanent Access Token</label>
              <input type="password" className="crm-input" value={waToken} onChange={(e) => setWaToken(e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Receptionist Staff Accounts</h3>
              <button className="crm-btn-sm" onClick={() => alert("Add User Modal (Placeholder UI)")}>
                <span>+ Add Staff Account</span>
              </button>
            </div>

            <table className="crm-table">
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>{user?.name || 'Head Receptionist'}</strong></td>
                  <td>{user?.email || 'reception@linelekunda.com'}</td>
                  <td><span className="crm-btn-sm" style={{ cursor: 'default' }}>Senior Receptionist</span></td>
                  <td><span style={{ color: '#10B981', fontWeight: 800 }}>Active</span></td>
                </tr>
                <tr>
                  <td><strong>Janet N.</strong></td>
                  <td>janet@linelekunda.com</td>
                  <td><span className="crm-btn-sm" style={{ cursor: 'default' }}>Shift Receptionist</span></td>
                  <td><span style={{ color: '#10B981', fontWeight: 800 }}>Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Notification Preferences</h3>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', backgroundColor: 'var(--crm-bg)', borderRadius: '10px', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 700 }}>Incoming WhatsApp Sound Alert</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--crm-text-sub)' }}>Play chime audio when patient sends message</div>
              </div>
              <input type="checkbox" checked={notificationsSound} onChange={(e) => setNotificationsSound(e.target.checked)} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', backgroundColor: 'var(--crm-bg)', borderRadius: '10px', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 700 }}>Desktop Push Notifications</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--crm-text-sub)' }}>Show browser popups for unread messages</div>
              </div>
              <input type="checkbox" checked={desktopPush} onChange={(e) => setDesktopPush(e.target.checked)} />
            </label>
          </div>
        )}

        {activeTab === 'theme' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Appearance & Palette</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--crm-text-sub)' }}>
              Primary theme color is set to <strong>#00B894</strong> (Emerald Green) with <strong>#2ECC71</strong> (Secondary) and <strong>#F8FAFC</strong> (Clean White Interface).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
