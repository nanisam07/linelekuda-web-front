import sys, re

file_path_css = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\ContactUs.css'
with open(file_path_css, 'r', encoding='utf-8') as f:
    content_css = f.read()

# Fix CSS color
content_css = content_css.replace('.appointment-highlight p {\n  font-size: 1.15rem;\n  opacity: 0.9;', '.appointment-highlight p {\n  color: #ffffff;\n  font-size: 1.15rem;\n  opacity: 0.9;')
with open(file_path_css, 'w', encoding='utf-8') as f:
    f.write(content_css)

file_path_jsx = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\ContactUs.jsx'
with open(file_path_jsx, 'r', encoding='utf-8') as f:
    content_jsx = f.read()

# Replace the placeholder with the image
target_placeholder = """          <div className="hero-visual-placeholder">
            {/* Placeholder for Premium Illustration */}
            <div style={{ textAlign: 'center', color: 'var(--primary)' }}>
              <HeartPulse size={80} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '1.2rem' }}>LineLekunda Care</p>
            </div>
          </div>"""

replacement_image = """          <img 
            src="/images/contact_hero.png" 
            alt="LineLekunda Care Team Support" 
            style={{ width: '100%', maxWidth: '500px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} 
          />"""

content_jsx = content_jsx.replace(target_placeholder, replacement_image)

with open(file_path_jsx, 'w', encoding='utf-8') as f:
    f.write(content_jsx)

print('Updated CSS and JSX files.')
