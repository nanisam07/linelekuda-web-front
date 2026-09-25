import React, { useEffect, useRef, useState } from 'react';
import {
  MessageSquare, Bot, UserCheck, CheckCheck, Clock, FileText, Image as ImageIcon,
  Mic, Play, Smile, MoreVertical, Paperclip, X
} from 'lucide-react';

export default function ChatWindow({ messages, loading, selectedPatient }) {
  const bottomRef = useRef(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeReactionId, setActiveReactionId] = useState(null);
  const [reactions, setReactions] = useState({});

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateSeparator = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return 'Today';
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }

    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const groupedMessages = React.useMemo(() => {
    const groups = [];
    let currentDate = '';

    messages.forEach((msg) => {
      const dateStr = formatDateSeparator(msg.timestamp);
      if (dateStr !== currentDate) {
        currentDate = dateStr;
        groups.push({ type: 'date', label: dateStr, id: `date-${dateStr}-${msg.id}` });
      }
      groups.push({ type: 'message', data: msg });
    });

    return groups;
  }, [messages]);

  const handleReact = (msgId, emoji) => {
    setReactions(prev => ({ ...prev, [msgId]: emoji }));
    setActiveReactionId(null);
  };

  if (!selectedPatient) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center', backgroundColor: '#F8FAFC' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,184,148,0.1)', color: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <MessageSquare size={36} />
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>LINELEKUNDA Reception Portal</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--crm-text-sub)', maxWidth: '420px', marginTop: '0.4rem' }}>
          Select a patient conversation from the left inbox to view chat history, reply via WhatsApp, or inspect medical records.
        </p>
      </div>
    );
  }

  return (
    <div className="crm-chat-messages-area">
      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="crm-skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      ) : messages.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--crm-text-sub)' }}>
          <MessageSquare size={32} opacity={0.4} style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontWeight: 700 }}>No messages yet</h4>
          <p style={{ fontSize: '0.8rem' }}>Type a message below to start the conversation on WhatsApp.</p>
        </div>
      ) : (
        groupedMessages.map((item) => {
          if (item.type === 'date') {
            return (
              <div key={item.id} className="crm-date-divider">
                <span className="crm-date-badge">{item.label}</span>
              </div>
            );
          }

          const msg = item.data;
          const sender = msg.sender;
          const isPatient = sender === 'PATIENT';
          const isBot = sender === 'BOT';
          const isStaff = sender === 'DOCTOR' || sender === 'SYSTEM';
          const alignmentClass = isPatient ? 'patient' : isBot ? 'bot' : 'staff';
          const currentReaction = reactions[msg.id];

          return (
            <div key={msg.id} className={`crm-msg-row ${alignmentClass}`}>
              <div
                className="crm-msg-bubble"
                onMouseEnter={() => setActiveReactionId(msg.id)}
                onMouseLeave={() => setActiveReactionId(null)}
              >
                {activeReactionId === msg.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      right: isPatient ? 'auto' : '0',
                      left: isPatient ? '0' : 'auto',
                      backgroundColor: '#ffffff',
                      borderRadius: '20px',
                      padding: '0.2rem 0.5rem',
                      boxShadow: 'var(--crm-shadow-md)',
                      display: 'flex',
                      gap: '0.3rem',
                      zIndex: 10
                    }}
                  >
                    {['👍', '❤️', '🙏', '😊', '✅'].map((emoji) => (
                      <span
                        key={emoji}
                        style={{ cursor: 'pointer', fontSize: '0.9rem', transition: 'transform 0.15s' }}
                        onClick={() => handleReact(msg.id, emoji)}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}

                {isBot && (
                  <div className="crm-sender-tag">
                    <Bot size={11} />
                    <span>BOT AUTOMATION</span>
                  </div>
                )}
                {isStaff && (
                  <div className="crm-sender-tag">
                    <UserCheck size={11} />
                    <span>RECEPTIONIST</span>
                  </div>
                )}

                <div style={{ wordBreak: 'break-word' }}>{msg.message}</div>

                {msg.messageType === 'IMAGE' && (
                  <div className="crm-attachment-preview">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setSelectedMedia('image')}>
                      <ImageIcon size={20} color="#00B894" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Medical_Scan_Prescription.png</span>
                    </div>
                  </div>
                )}

                {msg.messageType === 'DOCUMENT' && (
                  <div className="crm-attachment-preview">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={20} color="#0EA5E9" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Lab_Test_Report.pdf</span>
                    </div>
                  </div>
                )}

                {msg.messageType === 'AUDIO' && (
                  <div className="crm-attachment-preview" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Play size={16} color="#00B894" style={{ cursor: 'pointer' }} />
                    <div style={{ height: '4px', flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.7rem' }}>0:14</span>
                  </div>
                )}

                {currentReaction && (
                  <div style={{ position: 'absolute', bottom: '-10px', right: '10px', backgroundColor: '#ffffff', border: '1px solid var(--crm-border)', borderRadius: '12px', padding: '0.1rem 0.3rem', fontSize: '0.75rem', boxShadow: 'var(--crm-shadow-sm)' }}>
                    {currentReaction}
                  </div>
                )}

                <div className="crm-msg-meta">
                  <span>{formatTime(msg.timestamp)}</span>
                  {!isPatient && <CheckCheck size={14} color="#ffffff" />}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
}
