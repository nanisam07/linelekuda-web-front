import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update handleHashChange
hash_target = "} else if (hash === '#blog') {"
hash_replacement = "} else if (hash === '#contact') {\n        setCurrentView('contact');\n        setActiveBlogSlug('');\n        setActiveSection('contact');\n        window.scrollTo({ top: 0, behavior: 'instant' });\n      } else if (hash === '#blog') {"
if "hash === '#contact'" not in content:
    content = content.replace(hash_target, hash_replacement)

# 2. Update handleNavLinkClick (inside currentView !== 'home')
nav_target_1 = "} else if (targetId === 'blog') {"
nav_replacement_1 = "} else if (targetId === 'contact') {\n        e.preventDefault();\n        setCurrentView('contact');\n        setActiveBlogSlug('');\n        setActiveSection('contact');\n        window.history.pushState(null, '', '#contact');\n        window.scrollTo({ top: 0, behavior: 'instant' });\n      } else if (targetId === 'blog') {"
if "targetId === 'contact'" not in content:
    content = content.replace(nav_target_1, nav_replacement_1)

# 3. Update handleNavLinkClick (outside currentView !== 'home')
nav_target_2 = "if (targetId === 'blog') {"
nav_replacement_2 = """if (targetId === 'contact') {
      e.preventDefault();
      setCurrentView('contact');
      setActiveBlogSlug('');
      setActiveSection('contact');
      window.history.pushState(null, '', '#contact');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (targetId === 'blog') {"""
if "if (targetId === 'contact') {" not in content:
    content = content.replace(nav_target_2, nav_replacement_2)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully fixed routing for contact page.')
