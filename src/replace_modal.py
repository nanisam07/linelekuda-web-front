import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '{/* 3. MULTI-STEP BOOKING FLOW MODAL */}'
end_str = '        </div>\n      )}'

start_idx = content.find(start_str)
end_idx = content.find(end_str, start_idx) + len(end_str)

if start_idx == -1 or end_idx == -1:
    print('Error finding bounds')
    sys.exit(1)

new_modal = """{/* 3. MULTI-STEP BOOKING FLOW MODAL */}
      {isBookingOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsBookingOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="booking-modal-body">

              {/* STEP 1: Select Specialty */}
              {bookingStep === 1 && (
                <div>
                  <div className="booking-header-group">
                    <h2>Choose Medical Specialty</h2>
                    <p>Step 1 of 3: Select the specialty you need.</p>
                  </div>
                  <motion.div
                    className="doctors-list"
                    style={{ maxHeight: '400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                      hidden: {}
                    }}
                  >
                    {[
                      { name: 'Orthopaedics', icon: '🦴' },
                      { name: 'Cardiology', icon: '❤️' },
                      { name: 'Neurology', icon: '🧠' },
                      { name: 'Dermatology', icon: '✨' },
                      { name: 'Gastroenterology', icon: '🍏' },
                      { name: 'ENT', icon: '👂' },
                      { name: 'Pediatrics', icon: '👶' },
                      { name: 'Gynecology', icon: '🌸' },
                      { name: 'Pulmonology', icon: '🫁' },
                      { name: 'Urology', icon: '💧' },
                      { name: 'Ophthalmology', icon: '👁️' },
                      { name: 'General Physician', icon: '🩺' }
                    ].map(spec => (
                      <motion.div
                        key={spec.name}
                        className={`doctor-item-row ${bookingSpecialty === spec.name ? 'glass' : ''}`}
                        style={{ cursor: 'pointer', borderColor: bookingSpecialty === spec.name ? 'var(--primary)' : 'var(--border)', flexDirection: 'column', textAlign: 'center', padding: '1.5rem 1rem', borderRadius: '16px' }}
                        onClick={() => setBookingSpecialty(spec.name)}
                        variants={{
                          hidden: { opacity: 0, scale: 0.9 },
                          visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                        }}
                        whileHover={{ y: -4, scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{spec.icon}</div>
                        <h4 style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-dark)' }}>{spec.name}</h4>
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                          {bookingSpecialty === spec.name && <Check size={18} style={{ color: 'var(--primary)' }} />}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button className="btn btn-primary" onClick={() => { if(bookingSpecialty) setBookingStep(2); }} disabled={!bookingSpecialty}>
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Date */}
              {bookingStep === 2 && (
                <div>
                  <div className="booking-header-group">
                    <h2>Preferred Appointment Date</h2>
                    <p>Our care team will coordinate the best available appointment based on your preferred date.</p>
                  </div>

                  <div className="calendar-grid">
                    <span className="calendar-header-day">Mon</span>
                    <span className="calendar-header-day">Tue</span>
                    <span className="calendar-header-day">Wed</span>
                    <span className="calendar-header-day">Thu</span>
                    <span className="calendar-header-day">Fri</span>
                    <span className="calendar-header-day">Sat</span>
                    <span className="calendar-header-day">Sun</span>
                    {[22, 23, 24, 25, 26, 27, 28].map(day => (
                      <button
                        key={day}
                        className={`calendar-day-btn ${bookingDate === day ? 'selected' : ''}`}
                        onClick={() => setBookingDate(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                    <button className="btn btn-outline" onClick={() => setBookingStep(1)}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button className="btn btn-primary" onClick={() => setBookingStep(3)}>
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patient Information Form */}
              {bookingStep === 3 && (
                <form onSubmit={handleBookingSubmit}>
                  <div className="booking-header-group">
                    <h2>Patient Details</h2>
                    <p>Enter patient contact details to request an appointment.</p>
                  </div>

                  <div className="booking-form-fields">
                    <div className="booking-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="pname">Full Name:</label>
                      <input
                        type="text"
                        id="pname"
                        placeholder="John Doe"
                        className="input-field"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-form-group">
                      <label htmlFor="pphone">Phone Number:</label>
                      <input
                        type="tel"
                        id="pphone"
                        placeholder="+91 90000 00000"
                        className="input-field"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-form-group">
                      <label htmlFor="pemail">Email Address:</label>
                      <input
                        type="email"
                        id="pemail"
                        placeholder="johndoe@example.com"
                        className="input-field"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="booking-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="pconcern">Health Concern (Optional):</label>
                      <textarea
                        id="pconcern"
                        placeholder="Briefly describe your symptoms or reason for consultation."
                        className="input-field"
                        style={{ minHeight: '100px', resize: 'vertical', paddingTop: '12px' }}
                        value={healthConcern}
                        onChange={(e) => setHealthConcern(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg)', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-grey)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p style={{ margin: 0 }}><strong>Specialty:</strong> <span style={{ color: 'var(--text-dark)' }}>{bookingSpecialty}</span></p>
                    <p style={{ margin: 0 }}><strong>Preferred Date:</strong> <span style={{ color: 'var(--text-dark)' }}>Oct {bookingDate}</span></p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setBookingStep(2)}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Request Appointment <Check size={16} />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}"""

content = content[:start_idx] + new_modal + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Successfully replaced modal block.')
