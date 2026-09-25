import React, { useState } from 'react';
import {
  FileText, Plus, Search, Filter, Eye, Edit3, Trash2, Send,
  CheckCircle2, Clock, AlertTriangle, Globe, Layers, X, Info
} from 'lucide-react';

export default function TemplatesView() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for new template creation (placeholder preview state)
  const [templateName, setTemplateName] = useState('');
  const [templateCategory, setTemplateCategory] = useState('UTILITY');
  const [templateLang, setTemplateLang] = useState('en_US');
  const [templateHeader, setTemplateHeader] = useState('');
  const [templateBody, setTemplateBody] = useState('');
  const [templateFooter, setTemplateFooter] = useState('');

  const [templates, setTemplates] = useState([
    {
      id: 'tmpl-1',
      name: 'dental_reminder_v1',
      category: 'UTILITY',
      language: 'English (US)',
      status: 'APPROVED',
      header: 'Dental Appointment Reminder',
      body: 'Hello {{1}}, this is a reminder for your upcoming appointment with {{2}} at {{3}}. Please reply YES to confirm.',
      footer: 'LINELEKUNDA Hospital & Dental Care',
      buttons: ['Confirm Appointment', 'Call Desk'],
      updatedAt: '2026-08-02'
    },
    {
      id: 'tmpl-2',
      name: 'preventive_checkup_monsoon',
      category: 'MARKETING',
      language: 'English (US)',
      status: 'APPROVED',
      header: 'Monsoon Wellness Drive',
      body: 'Dear {{1}}, protect your family this season! Book a Comprehensive Health Package at 20% discount this week.',
      footer: 'LINELEKUNDA Health Services',
      buttons: ['Book Now'],
      updatedAt: '2026-08-04'
    },
    {
      id: 'tmpl-3',
      name: 'lab_report_ready_v2',
      category: 'UTILITY',
      language: 'English (US)',
      status: 'PENDING',
      header: 'Lab Test Reports Available',
      body: 'Hi {{1}}, your blood test report is ready for viewing. Click below to download your confidential PDF file.',
      footer: 'LINELEKUNDA Diagnostics',
      buttons: ['Download Report'],
      updatedAt: '2026-08-06'
    },
    {
      id: 'tmpl-4',
      name: 'discount_promo_freeform',
      category: 'MARKETING',
      language: 'English (US)',
      status: 'REJECTED',
      header: 'Special Promo Offer',
      body: 'Hey {{1}}, get cheap medicines now! Buy 1 Get 1 Free on all wellness supplements.',
      footer: 'LINELEKUNDA Pharmacy',
      buttons: ['Buy Now'],
      rejectionReason: 'Policy violation: Unsubstantiated promotional claim.',
      updatedAt: '2026-08-05'
    }
  ]);

  const filteredTemplates = templates.filter((t) => {
    const matchesTab = activeTab === 'ALL' || t.status === activeTab;
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (!templateName) return;

    const newTmpl = {
      id: 'tmpl-' + Date.now(),
      name: templateName.toLowerCase().replace(/\s+/g, '_'),
      category: templateCategory,
      language: templateLang === 'en_US' ? 'English (US)' : 'Swahili (KE)',
      status: 'PENDING',
      header: templateHeader,
      body: templateBody || 'Hello {{1}}, your appointment is scheduled.',
      footer: templateFooter || 'LINELEKUNDA Hospital',
      buttons: ['View Details'],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setTemplates([newTmpl, ...templates]);
    setShowCreateModal(false);
    setTemplateName('');
    setTemplateHeader('');
    setTemplateBody('');
    setTemplateFooter('');
  };

  return (
    <div className="crm-view-container">
      {/* View Header */}
      <div className="crm-view-header">
        <div className="crm-view-title-group">
          <h1>Meta WhatsApp Approved Templates</h1>
          <p>Manage, create, and submit WhatsApp Cloud API broadcast templates for Meta approval.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="crm-roadmap-badge">
            <Info size={14} />
            <span>UI Only - Backend connection later</span>
          </span>

          <button className="crm-btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            <span>Create New Template</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="crm-card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="crm-filter-pills">
          <button className={`crm-filter-pill ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTab('ALL')}>
            All Templates ({templates.length})
          </button>
          <button className={`crm-filter-pill ${activeTab === 'APPROVED' ? 'active' : ''}`} onClick={() => setActiveTab('APPROVED')}>
            Approved ({templates.filter(t => t.status === 'APPROVED').length})
          </button>
          <button className={`crm-filter-pill ${activeTab === 'PENDING' ? 'active' : ''}`} onClick={() => setActiveTab('PENDING')}>
            Pending Meta Review ({templates.filter(t => t.status === 'PENDING').length})
          </button>
          <button className={`crm-filter-pill ${activeTab === 'REJECTED' ? 'active' : ''}`} onClick={() => setActiveTab('REJECTED')}>
            Rejected ({templates.filter(t => t.status === 'REJECTED').length})
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select className="crm-input" style={{ width: 'auto', fontSize: '0.82rem' }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="ALL">All Categories</option>
            <option value="UTILITY">Utility</option>
            <option value="MARKETING">Marketing</option>
            <option value="AUTHENTICATION">Authentication</option>
          </select>

          <div className="crm-search-box" style={{ width: '220px' }}>
            <Search className="crm-search-icon" size={15} />
            <input
              type="text"
              className="crm-search-input"
              placeholder="Search template name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Template Card Grid */}
      <div className="crm-grid-3">
        {filteredTemplates.map((t) => (
          <div className="crm-card" key={t.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: t.category === 'UTILITY' ? 'rgba(0,184,148,0.1)' : 'rgba(14,165,233,0.1)', color: t.category === 'UTILITY' ? '#00B894' : '#0EA5E9' }}>
                {t.category}
              </span>

              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                backgroundColor: t.status === 'APPROVED' ? 'rgba(16,185,129,0.1)' : t.status === 'PENDING' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                color: t.status === 'APPROVED' ? '#10B981' : t.status === 'PENDING' ? '#F59E0B' : '#EF4444'
              }}>
                ● {t.status}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--crm-text-heading)' }}>{t.name}</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--crm-text-sub)' }}>{t.language}</div>
            </div>

            {/* Template Body Container */}
            <div style={{ backgroundColor: 'var(--crm-bg)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--crm-border-subtle)', fontSize: '0.82rem', flex: 1, minHeight: '110px' }}>
              {t.header && <div style={{ fontWeight: 700, marginBottom: '0.3rem', color: 'var(--crm-text-heading)' }}>{t.header}</div>}
              <p style={{ color: 'var(--crm-text-body)', whiteSpace: 'pre-wrap' }}>{t.body}</p>
              {t.footer && <div style={{ fontSize: '0.72rem', color: 'var(--crm-text-muted)', marginTop: '0.5rem' }}>{t.footer}</div>}
            </div>

            {t.rejectionReason && (
              <div style={{ fontSize: '0.75rem', color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.08)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                <strong>Rejection Reason:</strong> {t.rejectionReason}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--crm-border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--crm-text-muted)' }}>Updated {t.updatedAt}</span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button className="crm-btn-sm" onClick={() => setSelectedTemplate(t)} title="Preview Template">
                  <Eye size={13} />
                  <span>Preview</span>
                </button>
                <button className="crm-btn-sm" onClick={() => alert(`Template Edit UI (Placeholder)`)} title="Edit Template">
                  <Edit3 size={13} />
                </button>
                <button className="crm-btn-sm" onClick={() => setTemplates(templates.filter(x => x.id !== t.id))} title="Delete Template">
                  <Trash2 size={13} color="#EF4444" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="crm-modal-overlay">
          <div className="crm-modal">
            <div className="crm-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Meta WhatsApp Preview</h3>
              <button className="crm-btn-sm" onClick={() => setSelectedTemplate(null)}><X size={16} /></button>
            </div>
            <div className="crm-modal-body">
              <div style={{ backgroundColor: '#ECE5DD', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '0.85rem 1.1rem', maxWidth: '320px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  {selectedTemplate.header && <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#075E54' }}>{selectedTemplate.header}</strong>}
                  <p style={{ fontSize: '0.88rem', color: '#111827' }}>{selectedTemplate.body}</p>
                  {selectedTemplate.footer && <div style={{ fontSize: '0.72rem', color: '#667781', marginTop: '0.5rem' }}>{selectedTemplate.footer}</div>}
                  <div style={{ fontSize: '0.65rem', textAlign: 'right', color: '#667781', marginTop: '0.2rem' }}>10:45 AM ✓✓</div>
                  {selectedTemplate.buttons?.map((b, i) => (
                    <div key={i} style={{ borderTop: '1px solid #E9EDEF', marginTop: '0.5rem', paddingTop: '0.5rem', textAlign: 'center', color: '#00A884', fontWeight: 700, fontSize: '0.82rem' }}>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="crm-modal-footer">
              <button className="crm-btn-sm" onClick={() => alert("Test WhatsApp Message simulated to receptionist device!")}>
                <Send size={14} />
                <span>Send Test Message</span>
              </button>
              <button className="crm-btn-primary" onClick={() => setSelectedTemplate(null)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal">
            <div className="crm-modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Create Meta Template Message</h3>
              <button className="crm-btn-sm" onClick={() => setShowCreateModal(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleCreateTemplate}>
              <div className="crm-modal-body">
                <div className="crm-form-group">
                  <label>Template Identifier Name (lowercase_with_underscores)</label>
                  <input type="text" className="crm-input" placeholder="e.g. appointment_confirmation_v1" value={templateName} onChange={(e) => setTemplateName(e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="crm-form-group">
                    <label>Category</label>
                    <select className="crm-input" value={templateCategory} onChange={(e) => setTemplateCategory(e.target.value)}>
                      <option value="UTILITY">Utility</option>
                      <option value="MARKETING">Marketing</option>
                      <option value="AUTHENTICATION">Authentication</option>
                    </select>
                  </div>
                  <div className="crm-form-group">
                    <label>Language</label>
                    <select className="crm-input" value={templateLang} onChange={(e) => setTemplateLang(e.target.value)}>
                      <option value="en_US">English (US)</option>
                      <option value="sw_KE">Swahili (KE)</option>
                    </select>
                  </div>
                </div>
                <div className="crm-form-group">
                  <label>Header Text (Optional)</label>
                  <input type="text" className="crm-input" placeholder="Header title..." value={templateHeader} onChange={(e) => setTemplateHeader(e.target.value)} />
                </div>
                <div className="crm-form-group">
                  <label>Message Body Content (Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125; for dynamic variables)</label>
                  <textarea className="crm-input" rows={4} placeholder="Hello {{1}}, your appointment with {{2}} is confirmed..." value={templateBody} onChange={(e) => setTemplateBody(e.target.value)} required />
                </div>
                <div className="crm-form-group">
                  <label>Footer Text (Optional)</label>
                  <input type="text" className="crm-input" placeholder="Hospital footer..." value={templateFooter} onChange={(e) => setTemplateFooter(e.target.value)} />
                </div>
              </div>
              <div className="crm-modal-footer">
                <button type="button" className="crm-btn-sm" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="crm-btn-primary">Submit to Meta Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
