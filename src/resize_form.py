import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace textarea style
content = content.replace("style={{ minHeight: '100px', resize: 'vertical', paddingTop: '12px' }}",
                          "style={{ minHeight: '60px', resize: 'vertical', paddingTop: '8px' }}")

# Replace summary style
content = content.replace("padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', fontSize: '0.9rem'",
                          "padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.85rem'")

# Replace buttons marginTop
content = content.replace("display: 'flex', justifyContent: 'space-between', marginTop: '2rem'",
                          "display: 'flex', justifyContent: 'space-between', marginTop: '1rem'")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

css_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

css_content = css_content.replace('''
.booking-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}''', '''
.booking-form-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}''')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print('Updated form UI sizes to fit modal better.')
