import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("style={{ height: '60px', width: 'auto' }}", "style={{ height: '80px', width: 'auto' }}")
content = content.replace("style={{ height: '45px', width: 'auto' }}", "style={{ height: '60px', width: 'auto' }}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated logo size again.')
