import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<LogoSVG size={38} />', '<img src="/logo.png" alt="LineLekunda Logo" style={{ height: \'38px\', width: \'auto\' }} />')
content = content.replace('<LogoSVG size={30} />', '<img src="/logo.png" alt="LineLekunda Logo" style={{ height: \'30px\', width: \'auto\' }} />')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated LogoSVG to img tags.')
