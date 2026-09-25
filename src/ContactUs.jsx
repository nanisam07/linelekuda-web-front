import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Check, 
  Plus, 
  Minus, 
  ArrowRight,
  HeartPulse, 
  Clock, 
  CalendarCheck, 
  ShieldCheck,
  Map as MapIcon
} from 'lucide-react';
import './ContactUs.css';

const ContactUs = ({ setIsBookingOpen, setBookingStep }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
    const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div className="contact-page">
      
      {/* SECTION 1: HERO */}
      <section className="contact-hero">
        <motion.div 
          className="contact-hero-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact-hero-title">We're Here to Help.</h1>
          <p className="contact-hero-desc">
            Whether you need help finding the right specialist, coordinating an appointment, or have questions about our services, the LineLekunda Care Team is here to support you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#send-message" className="btn btn-primary">Contact Care Team</a>
            <a href="https://wa.me/919063903355" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="contact-hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="/images/contact_hero.png" 
            alt="LineLekunda Care Team Support" 
            style={{ width: '100%', maxWidth: '500px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} 
          />
        </motion.div>
      </section>

      {/* SECTION 3: SEND US A MESSAGE */}
      <section className="contact-section" id="send-message">
        <div className="send-message-container">
          <div className="send-message-left">
            <h2 className="send-message-title">Send Us a Message</h2>
            <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Fill out the form below, and our Care Team will get back to you as soon as possible to assist with your healthcare needs.
            </p>
          </div>
          <div className="send-message-right">
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <div className="contact-form-grid">
                  <div className="contact-form-group full">
                    <label>Full Name</label>
                    <input type="text" name="name" className="contact-input" placeholder="John Doe" value={formState.name} onChange={handleInputChange} required />
                  </div>
                  <div className="contact-form-group">
                    <label>Mobile Number</label>
                    <input type="tel" name="phone" className="contact-input" placeholder="+91 90000 00000" value={formState.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="contact-form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="contact-input" placeholder="you@example.com" value={formState.email} onChange={handleInputChange} required />
                  </div>
                  <div className="contact-form-group full">
                    <label>Subject</label>
                    <input type="text" name="subject" className="contact-input" placeholder="How can we help?" value={formState.subject} onChange={handleInputChange} required />
                  </div>
                  <div className="contact-form-group full">
                    <label>Message</label>
                    <textarea name="message" className="contact-input" placeholder="Write your message here..." style={{ minHeight: '120px', resize: 'vertical' }} value={formState.message} onChange={handleInputChange} required></textarea>
                  </div>
                  <div className="contact-form-group full" style={{ marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid var(--border)' }}
              >
                <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(76,175,80,0.1)', color: '#4CAF50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-grey)' }}>Thank you for reaching out. Our Care Team will contact you shortly.</p>
                <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => setIsSubmitted(false)}>Send Another</button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: APPOINTMENT HIGHLIGHT */}
      <section>
        <div className="appointment-highlight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Need Help Finding the Right Specialist?</h2>
            <p>Our Care Team will understand your healthcare needs, guide you to the appropriate specialist, coordinate your appointment, and help make your hospital visit smoother.</p>
            <div className="appointment-buttons">
              <button 
                className="btn btn-white" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.05rem' }}
                onClick={() => {
                  setBookingStep(1);
                  setIsBookingOpen(true);
                }}
              >
                Request an Appointment <ArrowRight size={18} />
              </button>
              <a 
                href="https://wa.me/919063903355" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-white" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.05rem', textDecoration: 'none' }}
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
  );
};

export default ContactUs;
