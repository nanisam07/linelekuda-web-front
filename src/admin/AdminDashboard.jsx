import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, MessageSquare, Megaphone, Users, FileText,
  Calendar, Stethoscope, Building2, BarChart2, Settings, LogOut,
  Search, Bell, Plus, CheckCircle2, ChevronLeft, Menu, RefreshCw, X, Info
} from 'lucide-react';

import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import PatientInfo from './PatientInfo';
import DashboardView from './DashboardView';
import CampaignsView from './CampaignsView';
import TemplatesView from './TemplatesView';
import AnalyticsView from './AnalyticsView';
import DoctorsView from './DoctorsView';
import DepartmentsView from './DepartmentsView';
import AppointmentsView from './AppointmentsView';
import ContactsView from './ContactsView';
import SettingsView from './SettingsView';

import { fetchInbox, fetchHistory, sendMessage } from './adminApi';
import { connectSocket, disconnectSocket, onNewMessage } from './adminSocket';
import './admin.css';

export default function AdminDashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('inbox'); // 'dashboard' | 'inbox' | 'campaigns' | 'contacts' | 'templates' | 'appointments' | 'doctors' | 'departments' | 'analytics' | 'settings'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Live Inbox State
  const [conversations, setConversations] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPatientInfo, setShowPatientInfo] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  // Notifications State
  const notificationsList = [
    { id: 1, text: 'Incoming WhatsApp message from Sarah Jenkins', time: '2m ago', unread: true },
    { id: 2, text: 'Dr. Samuel Kintu updated OP Consulting hours', time: '1h ago', unread: true },
    { id: 3, text: 'Campaign "Monsoon Checkup" completed 96.8% delivery', time: '3h ago', unread: false }
  ];

  // Fetch Inbox Data
  const loadInbox = async () => {
    setLoadingInbox(true);
    try {
      const data = await fetchInbox();
      setConversations(data || []);
    } catch (e) {
      console.error('Failed to load inbox:', e);
    } finally {
      setLoadingInbox(false);
    }
  };

  useEffect(() => {
    loadInbox();
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  // Handle selecting patient from list or other modules
  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setActiveTab('inbox');
    setLoadingMessages(true);
    try {
      const result = await fetchHistory(patient.id);
      setMessages(result.data || []);
    } catch (e) {
      console.error('Failed to load history:', e);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Select patient by name from other views (Appointments/Contacts)
  const handleOpenChatByName = (patientName) => {
    const match = conversations.find(c => c.fullName?.toLowerCase().includes(patientName.toLowerCase()));
    if (match) {
      handleSelectPatient(match);
    } else {
      setActiveTab('inbox');
    }
  };

  // Send WhatsApp message
  const handleSendMessage = async (text) => {
    if (!selectedPatient || sending) return;

    setSending(true);
    setSendError('');
    const tempId = 'temp-' + Date.now();
    const nowIso = new Date().toISOString();

    const tempMsg = {
      id: tempId,
      patientId: selectedPatient.id,
      message: text,
      sender: 'DOCTOR',
      messageType: 'TEXT',
      deliveryStatus: 'SENT',
      timestamp: nowIso
    };

    setMessages((prev) => [...prev, tempMsg]);

    setConversations((prev) =>
      prev
        .map((c) =>
          c.id === selectedPatient.id
            ? { ...c, conversations: [{ ...tempMsg }], updatedAt: nowIso }
            : c
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );

    try {
      const savedMsg = await sendMessage(selectedPatient.id, text);
      if (savedMsg && savedMsg.id) {
        setMessages((prev) => prev.map((m) => (m.id === tempId ? savedMsg : m)));
      }
    } catch (e) {
      console.error('Error sending message:', e);
      setSendError(e.message || 'WhatsApp delivery failed.');
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, deliveryStatus: 'FAILED' } : m))
      );
    } finally {
      setSending(false);
    }
  };

  // Socket listener for real-time messages
  const handleSocketMessage = useCallback(
    (msg) => {
      if (!msg) return;

      if (selectedPatient && msg.patientId === selectedPatient.id) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          const filtered = prev.filter(
            (m) => !(m.id.startsWith('temp-') && m.message === msg.message)
          );
          return [...filtered, msg];
        });
      }

      setConversations((prev) => {
        const updated = prev.map((c) => {
          if (c.id === msg.patientId) {
            return {
              ...c,
              conversations: [msg],
              updatedAt: msg.timestamp || new Date().toISOString()
            };
          }
          return c;
        });
        return updated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      });
    },
    [selectedPatient]
  );

  useEffect(() => {
    onNewMessage(handleSocketMessage);
  }, [handleSocketMessage]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: conversations.length || 0 },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="crm-layout">
      {/* ================= SIDEBAR ================= */}
      <aside className={`crm-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Top Logo Header */}
        <div className="crm-sidebar-header">
          <div className="crm-brand-logo" onClick={() => setActiveTab('dashboard')}>
            <div className="crm-logo-icon">
              <Building2 size={24} />
            </div>
            {!sidebarCollapsed && (
              <div className="crm-brand-text">
                <span className="crm-brand-title">LINELEKUNDA</span>
                <span className="crm-brand-subtitle">Reception CRM</span>
              </div>
            )}
          </div>

          <button
            className="crm-sidebar-toggle-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft size={16} style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
          </button>
        </div>

        {/* Sidebar Menu Navigation */}
        <nav className="crm-sidebar-menu">
          {!sidebarCollapsed && <span className="crm-menu-section-label">Main Navigation</span>}

          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                className={`crm-menu-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="crm-menu-icon">
                  <IconComp size={18} />
                </div>
                {!sidebarCollapsed && <span className="crm-menu-text">{item.label}</span>}
                {!sidebarCollapsed && item.badge != null && item.badge > 0 && (
                  <span className={`crm-menu-badge ${isActive ? 'active-badge' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info & Logout */}
        <div className="crm-sidebar-footer">
          <div className="crm-sidebar-user-card">
            <div className="crm-user-avatar">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'RC'}
            </div>
            {!sidebarCollapsed && (
              <div className="crm-user-info">
                <div className="crm-user-name">{user?.name || 'Receptionist Desk'}</div>
                <div className="crm-user-role">LINELEKUNDA Admin</div>
              </div>
            )}
            <button
              style={{ background: 'none', border: 'none', color: 'var(--crm-text-sub)', cursor: 'pointer', marginLeft: sidebarCollapsed ? '0' : 'auto' }}
              onClick={onLogout}
              title="Logout"
            >
              <LogOut size={16} color="#EF4444" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="crm-main-wrapper">
        {/* TOP BAR */}
        <header className="crm-topbar">
          <div className="crm-topbar-left">
            <div className="crm-search-box">
              <Search className="crm-search-icon" size={16} />
              <input
                type="text"
                className="crm-search-input"
                placeholder="Global search patient, doctor, appointment... (Ctrl + K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="crm-search-shortcut">⌘K</span>
            </div>
          </div>

          <div className="crm-topbar-right">
            {/* Hospital Name & Online Status Badge */}
            <div className="crm-hospital-badge">
              <div className="crm-online-dot" />
              <span className="crm-hospital-name">LINELEKUNDA Hospital</span>
            </div>

            {/* Quick Action Button */}
            <button
              className="crm-quick-action-btn"
              onClick={() => setActiveTab('appointments')}
            >
              <Plus size={15} />
              <span>Quick Action</span>
            </button>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                className="crm-topbar-icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
              >
                <Bell size={18} />
                <span className="crm-topbar-badge">2</span>
              </button>

              {showNotifications && (
                <div
                  className="crm-card"
                  style={{
                    position: 'absolute',
                    top: '48px',
                    right: '0',
                    width: '300px',
                    zIndex: 100,
                    padding: '0.85rem',
                    boxShadow: 'var(--crm-shadow-xl)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid var(--crm-border-subtle)', paddingBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.88rem' }}>Notifications</strong>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowNotifications(false)}>
                      <X size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {notificationsList.map(n => (
                      <div key={n.id} style={{ fontSize: '0.78rem', padding: '0.4rem', borderRadius: '6px', backgroundColor: n.unread ? 'var(--crm-primary-light)' : 'transparent' }}>
                        <div>{n.text}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--crm-text-muted)', marginTop: '0.15rem' }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN VIEW AREA */}
        {activeTab === 'dashboard' && (
          <DashboardView onNavigate={(tab) => setActiveTab(tab)} unreadCount={3} patientCount={conversations.length} />
        )}

        {activeTab === 'inbox' && (
          <div className="crm-inbox-layout">
            <ConversationList
              conversations={conversations}
              selectedPatientId={selectedPatient?.id}
              onSelectPatient={handleSelectPatient}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              loading={loadingInbox}
            />

            <div className="crm-chat-center">
              {selectedPatient ? (
                <>
                  <div className="crm-chat-header">
                    <div className="crm-chat-user-info">
                      <div className="crm-conv-avatar" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                        {selectedPatient.fullName ? selectedPatient.fullName.substring(0, 2).toUpperCase() : 'P'}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>
                          {selectedPatient.fullName}
                        </h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--crm-primary)', fontWeight: 600 }}>
                          {selectedPatient.phone}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="crm-btn-sm" onClick={() => handleSelectPatient(selectedPatient)} title="Refresh">
                        <RefreshCw size={14} />
                      </button>
                      <button
                        className="crm-btn-sm"
                        onClick={() => setShowPatientInfo(!showPatientInfo)}
                        title="Toggle Patient Details Drawer"
                      >
                        <Info size={14} color={showPatientInfo ? '#00B894' : 'currentColor'} />
                      </button>
                    </div>
                  </div>

                  {sendError && (
                    <div style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>⚠️ {sendError}</span>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 'bold' }} onClick={() => setSendError('')}>✕</button>
                    </div>
                  )}

                  <ChatWindow
                    messages={messages}
                    loading={loadingMessages}
                    selectedPatient={selectedPatient}
                  />

                  <MessageInput onSend={handleSendMessage} disabled={loadingMessages || sending} />
                </>
              ) : (
                <ChatWindow messages={[]} loading={false} selectedPatient={null} />
              )}
            </div>

            {showPatientInfo && selectedPatient && (
              <PatientInfo
                patient={selectedPatient}
                onClose={() => setShowPatientInfo(false)}
                onBookAppointment={() => setActiveTab('appointments')}
              />
            )}
          </div>
        )}

        {activeTab === 'campaigns' && <CampaignsView />}
        {activeTab === 'templates' && <TemplatesView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'doctors' && <DoctorsView />}
        {activeTab === 'departments' && <DepartmentsView />}
        {activeTab === 'appointments' && <AppointmentsView onOpenChat={handleOpenChatByName} />}
        {activeTab === 'contacts' && <ContactsView onOpenChat={handleOpenChatByName} />}
        {activeTab === 'settings' && <SettingsView user={user} />}
      </div>
    </div>
  );
}
