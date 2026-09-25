import React, { useState, useMemo } from 'react';
import { Search, X, MessageSquare, Bot, UserCheck, Pin, CheckCheck } from 'lucide-react';

export default function ConversationList({
  conversations,
  selectedPatientId,
  onSelectPatient,
  searchQuery,
  onSearchChange,
  loading
}) {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'UNREAD' | 'TODAY' | 'BOOKED' | 'COMPLETED' | 'CANCELLED'

  // Helper: Extract Initials
  const getInitials = (name) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Helper: Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      return 'Yesterday';
    }

    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
  };

  // Filter conversations based on search and selected pill tab
  const filteredConversations = useMemo(() => {
    return conversations.filter((patient) => {
      const nameMatch = patient.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
      const phoneMatch = patient.phone?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = nameMatch || phoneMatch;

      if (!matchesSearch) return false;

      const lastMsg = patient.conversations?.[0];

      if (activeFilter === 'UNREAD') {
        return lastMsg && lastMsg.sender === 'PATIENT';
      }

      // Other filters (Today, Booked, etc.) filter appropriately if data present or return true
      return true;
    });
  }, [conversations, searchQuery, activeFilter]);

  return (
    <div className="crm-inbox-left">
      {/* Search & Filters Header */}
      <div className="crm-inbox-header">
        <div className="crm-search-box">
          <Search className="crm-search-icon" size={16} />
          <input
            type="text"
            className="crm-search-input"
            placeholder="Search patient or phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              style={{ position: 'absolute', right: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--crm-text-sub)' }}
              onClick={() => onSearchChange('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="crm-filter-pills">
          <button className={`crm-filter-pill ${activeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveFilter('ALL')}>
            All ({conversations.length})
          </button>
          <button className={`crm-filter-pill ${activeFilter === 'UNREAD' ? 'active' : ''}`} onClick={() => setActiveFilter('UNREAD')}>
            Unread
          </button>
          <button className={`crm-filter-pill ${activeFilter === 'TODAY' ? 'active' : ''}`} onClick={() => setActiveFilter('TODAY')}>
            Today
          </button>
          <button className={`crm-filter-pill ${activeFilter === 'BOOKED' ? 'active' : ''}`} onClick={() => setActiveFilter('BOOKED')}>
            Booked
          </button>
          <button className={`crm-filter-pill ${activeFilter === 'COMPLETED' ? 'active' : ''}`} onClick={() => setActiveFilter('COMPLETED')}>
            Completed
          </button>
        </div>
      </div>

      {/* Conversation Scroll List */}
      <div className="crm-conv-list">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div className="crm-conv-item" key={i}>
              <div className="crm-skeleton" style={{ width: '46px', height: '46px', borderRadius: '50%' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="crm-skeleton" style={{ width: '60%', height: '14px' }} />
                <div className="crm-skeleton" style={{ width: '85%', height: '12px' }} />
              </div>
            </div>
          ))
        ) : filteredConversations.length === 0 ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--crm-text-sub)' }}>
            <MessageSquare size={36} opacity={0.4} style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--crm-text-heading)' }}>No conversations</h4>
            <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>No patients match search criteria.</p>
          </div>
        ) : (
          filteredConversations.map((patient) => {
            const isSelected = selectedPatientId === patient.id;
            const lastMsg = patient.conversations?.[0];
            const sender = lastMsg?.sender;
            const isUnread = sender === 'PATIENT';

            return (
              <div
                key={patient.id}
                className={`crm-conv-item ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectPatient(patient)}
              >
                <div className="crm-conv-avatar">
                  {getInitials(patient.fullName)}
                  <div className="crm-online-badge" />
                </div>

                <div className="crm-conv-details">
                  <div className="crm-conv-top">
                    <span className="crm-conv-name">{patient.fullName}</span>
                    <span className="crm-conv-time">{formatTimestamp(lastMsg?.timestamp || patient.updatedAt)}</span>
                  </div>

                  <div className="crm-conv-bottom">
                    <span className="crm-conv-snippet">
                      {sender === 'BOT' && <Bot size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#2ECC71' }} />}
                      {sender === 'DOCTOR' && <UserCheck size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#00B894' }} />}
                      {lastMsg ? lastMsg.message : patient.phone}
                    </span>

                    {isUnread && <div className="crm-unread-badge">1</div>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
