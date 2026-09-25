import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Clock, 
  ArrowLeft,
  Activity
} from 'lucide-react';
import './Legal.css';

// Printable/Custom Icons defined directly to ensure no missing imports from lucide
const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default function LegalPages({ activeTab = 'privacy', onTabChange }) {
  const [copied, setCopied] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('idle'); // idle, loading, success

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    if (!deleteEmail) return;
    setDeleteStatus('loading');
    setTimeout(() => {
      setDeleteStatus('success');
    }, 1500);
  };

  // Sync state if activeTab changes externally
  const handleTabClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="legal-page animate-fade-in">
      <div className="container">
        
        {/* Navigation Back Link */}
        <div style={{ marginBottom: '2rem' }}>
          <a href="#" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </a>
        </div>

        <div className="legal-container">
          
          {/* Sidebar */}
          <aside className="legal-sidebar">
            <h2 className="legal-sidebar-title">Legal Documents</h2>
            <ul className="legal-sidebar-menu">
              <li>
                <button 
                  className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                  onClick={() => handleTabClick('privacy')}
                >
                  <Lock size={18} /> Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
                  onClick={() => handleTabClick('terms')}
                >
                  <FileIcon /> Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  className={`legal-tab-btn ${activeTab === 'refund-policy' ? 'active' : ''}`}
                  onClick={() => handleTabClick('refund-policy')}
                >
                  <Clock size={18} /> Cancellation & Refund
                </button>
              </li>
            </ul>
          </aside>

          {/* Content area */}
          <main className="legal-content-card">
            
            {activeTab === 'privacy' && (
              <div>
                <header className="legal-header">
                  <div className="legal-header-text">
                    <h1>Privacy Policy</h1>
                    <div className="legal-meta">
                      <Lock size={14} /> <span>Last Updated: June 30, 2026</span>
                    </div>
                  </div>
                  <div className="legal-actions">
                    <button className="btn-icon" onClick={handlePrint} title="Print Document">
                      <PrintIcon />
                    </button>
                    <button className="btn-icon" onClick={handleShare} title={copied ? "Copied!" : "Copy Page Link"}>
                      {copied ? "✓" : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                      )}
                    </button>
                  </div>
                </header>

                <div className="legal-body">
                  <p>At Linelekunda ("we," "our," "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard personal and sensitive health data when you use our mobile application and website.</p>
                  
                  <div className="legal-callout">
                    <p><strong>Strict Adherence Notice:</strong> We collect and process sensitive health data and live geolocation strictly under regional medical guidelines and patient confidentiality regulations.</p>
                  </div>

                  <h2>Data We Collect</h2>
                  <ul>
                    <li><strong>Personal Identity Information:</strong> Name, email address, verified phone number, and physical mailing address.</li>
                    <li><strong>Sensitive Health Data:</strong> Medical history, physician prescriptions, physical rehabilitation records, and emergency health metrics necessary for delivery of clinical and emergency services.</li>
                    <li><strong>Real-Time Geolocation:</strong> Continuous live GPS tracking required for matching emergency ambulance bookings, physician dispatch, and home healthcare tracking.</li>
                    <li><strong>Financial Data:</strong> Secure payment details, billing address, and transaction history processed strictly through encrypted, PCI-compliant payment gateways.</li>
                  </ul>

                  <h2>How We Use Your Data</h2>
                  <ul>
                    <li>To facilitate instant doctor discovery, active appointment scheduling, and automated waiting-room-free queue coordination.</li>
                    <li>To route and dispatch on-demand ambulance vehicles using live tracking services.</li>
                    <li>To coordinate home-based physical therapy and clinical treatments.</li>
                    <li>To strictly adhere to regional healthcare regulations and ensure emergency medical safety.</li>
                  </ul>

                  <h2>Data Sharing and Consent</h2>
                  <p>Your medical, personal, and location data is only shared with authorized medical professionals, ambulance drivers, or clinics explicitly chosen by you during booking. We do not sell user data to third-party ad networks or brokers. Explicit user consent is gathered prior to collecting any device permissions.</p>

                  <h2>User Rights and Account Deletion</h2>
                  <p>You retain complete control over your data. You may review, download, or edit your information at any time. In compliance with Apple and Google mandates, you can instantly initiate a full Account Deletion directly inside the app settings to permanently purge all data from our active servers.</p>

                  {/* Account Deletion Simulator Widget */}
                  <div className="deletion-widget">
                    <div className="deletion-widget-header">
                      <TrashIcon />
                      <h3>Account Deletion Portal</h3>
                    </div>
                    {deleteStatus === 'success' ? (
                      <div className="deletion-success-box">
                        <h4>✓ Deletion Request Received</h4>
                        <p style={{ margin: '0.5rem 0 0', color: '#047857' }}>
                          We have initiated the permanent purge process for your account and all associated health records. A confirmation email has been dispatched.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>In accordance with App Store & Google Play privacy policies, enter your registered email address below to instantly initiate a request to purge all personal, medical, and location records from our active servers.</p>
                        <form className="deletion-form" onSubmit={handleDeleteSubmit}>
                          <input 
                            type="email" 
                            placeholder="Enter your registered email address" 
                            className="deletion-input"
                            value={deleteEmail}
                            onChange={(e) => setDeleteEmail(e.target.value)}
                            required
                          />
                          <button type="submit" className="btn-danger">
                            {deleteStatus === 'loading' ? 'Purging Data...' : 'Delete My Account'}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div>
                <header className="legal-header">
                  <div className="legal-header-text">
                    <h1>Terms and Conditions</h1>
                    <div className="legal-meta">
                      <FileIcon /> <span>Last Updated: June 30, 2026</span>
                    </div>
                  </div>
                  <div className="legal-actions">
                    <button className="btn-icon" onClick={handlePrint} title="Print Document">
                      <PrintIcon />
                    </button>
                    <button className="btn-icon" onClick={handleShare} title={copied ? "Copied!" : "Copy Page Link"}>
                      {copied ? "✓" : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                      )}
                    </button>
                  </div>
                </header>

                <div className="legal-body">
                  <p>These Terms and Conditions govern your use of the Linelekunda platform. By accessing or using our services, you agree to comply legally with these terms.</p>

                  <h2>Scope of Services</h2>
                  <p>Linelekunda is an intermediary health technology logistics provider. We facilitate doctor scheduling, dynamic queue management, ambulance tracking, and home care connection. Linelekunda is not a licensed hospital or direct medical provider. Emergency services depend on local partner dispatch availability.</p>

                  <h2>User Account Responsibilities</h2>
                  <ul>
                    <li>You must provide completely accurate identity and health metrics upon registration.</li>
                    <li>You are fully responsible for maintaining account credential confidentiality.</li>
                    <li>Sharing accounts to falsely obtain regulated prescription medicine or restricted medical transport is strictly prohibited.</li>
                  </ul>

                  <div className="legal-callout warning">
                    <p><strong>Warning:</strong> Sharing accounts or credentials to obtain restricted prescriptions or emergency transport fraudulently will result in immediate suspension of account privileges and report to local health regulators.</p>
                  </div>

                  <h2>Limitation of Liability</h2>
                  <p>While we use strict real-time queue synchronization to remove waiting room delays, Linelekunda is not liable for unexpected physician delays, traffic obstructions impacting ambulance arrival times, or outcomes associated with external medical procedures.</p>
                </div>
              </div>
            )}

            {activeTab === 'refund-policy' && (
              <div>
                <header className="legal-header">
                  <div className="legal-header-text">
                    <h1>Return, Cancellation & Refund Policy</h1>
                    <div className="legal-meta">
                      <Clock size={14} /> <span>Last Updated: June 30, 2026</span>
                    </div>
                  </div>
                  <div className="legal-actions">
                    <button className="btn-icon" onClick={handlePrint} title="Print Document">
                      <PrintIcon />
                    </button>
                    <button className="btn-icon" onClick={handleShare} title={copied ? "Copied!" : "Copy Page Link"}>
                      {copied ? "✓" : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                      )}
                    </button>
                  </div>
                </header>

                <div className="legal-body">
                  <h2>Appointment & Queue Cancellations</h2>
                  <h3>Doctor Appointments</h3>
                  <p>Free cancellations or reschedules are permitted up to 2 hours before the scheduled time slot. Cancellations within the 2-hour window may incur a standard provider convenience fee.</p>
                  
                  <h3>No-Show Clauses</h3>
                  <p>If you miss your synchronized live queue window without notice, the appointment will be marked as a no-show, and refunds will be determined by the specific clinical provider's manual internal policy.</p>

                  <h2>Ambulance On-Demand Booking</h2>
                  <ul>
                    <li>Given the critical nature of emergency transit, once an ambulance dispatch is requested and confirmed by the driver, a nominal vehicle mobilization fee applies if cancelled by the user after 3 minutes.</li>
                    <li>Full refunds are automatically issued if a dispatched ambulance fails to arrive due to platform technical faults or partner logistics constraints.</li>
                  </ul>

                  <h2>Home Care & Physiotherapy Services</h2>
                  <p>Session packages can be fully refunded for any unused portions if requested at least 24 hours prior to the next active clinical session.</p>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
