import sys, re

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace bookingDate state
state_pattern = r'const \[bookingDate, setBookingDate\] = useState\(new Date\(\)\.getDate\(\) \+ 1\); // Next day as default'
new_state = '''const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });'''
content = re.sub(state_pattern, new_state, content)

# 2. Replace handleBookingSubmit Oct ${bookingDate}
submit_pattern = r'Preferred Date:\nOct \$\{bookingDate\}'
new_submit = r'Preferred Date:\n${bookingDate}'
content = re.sub(submit_pattern, new_submit, content)

# 3. Replace Step 2 calendar
cal_pattern = r'<div className="calendar-grid">.*?</div>'
new_cal = '''<div style={{ marginTop: '2rem' }}>
                    <input
                      type="date"
                      className="input-field"
                      style={{ fontSize: '1.1rem', padding: '1rem', width: '100%', fontFamily: 'inherit', color: 'var(--text-dark)', cursor: 'text', appearance: 'none', WebkitAppearance: 'none' }}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>'''
content = re.sub(cal_pattern, new_cal, content, flags=re.DOTALL)

# 4. Replace Step 3 summary
sum_pattern = r'Oct \{bookingDate\}'
new_sum = r'{bookingDate}'
content = re.sub(sum_pattern, new_sum, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully replaced live calendar components.')
