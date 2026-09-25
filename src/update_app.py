import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import ContactUs
import_str = "import './App.css';\n"
if "import ContactUs" not in content:
    content = content.replace(import_str, import_str + "import ContactUs from './ContactUs';\n")

# 2. Add hash routing for contact
hash_target = "} else if (hash === 'blog') {"
hash_replacement = "} else if (hash === 'contact') {\n        setCurrentView('contact');\n        setActiveSection('contact');\n      } else if (hash === 'blog') {"
if "hash === 'contact'" not in content:
    content = content.replace(hash_target, hash_replacement)

# 3. Add to render block
render_target = "{currentView === 'blog' && ("
render_replacement = "{currentView === 'contact' && (\n        <ContactUs setIsBookingOpen={setIsBookingOpen} setBookingStep={setBookingStep} />\n      )}\n\n      {currentView === 'blog' && ("
if "currentView === 'contact'" not in content:
    content = content.replace(render_target, render_replacement)

# 4. Add Contact link in Header Nav
header_nav_target = """              <li>
                <a
                  href="#how-it-works"
                  className={`nav-item-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'how-it-works')}
                >
                  How It Works
                </a>
              </li>"""
header_nav_replacement = header_nav_target + """
              <li>
                <a
                  href="#contact"
                  className={`nav-item-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, 'contact')}
                >
                  Contact Us
                </a>
              </li>"""
if "href=\"#contact\"" not in content:
    content = content.replace(header_nav_target, header_nav_replacement)

# 5. Add Contact link in Footer Nav
footer_nav_target = """                  <li><a href="#home">Home</a></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><a href="#blog">Blog</a></li>"""
footer_nav_replacement = footer_nav_target + """\n                  <li><a href="#contact">Contact Us</a></li>"""
if "<li><a href=\"#contact\">Contact Us</a></li>" not in content:
    content = content.replace(footer_nav_target, footer_nav_replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully updated App.jsx with ContactUs routing and rendering.')
