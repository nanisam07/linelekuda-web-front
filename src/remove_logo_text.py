import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.strip() == 'Linelekunda':
        # Check if previous line had the logo
        if len(new_lines) > 0 and 'logo.png' in new_lines[-1]:
            continue # Skip this line
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('Removed Linelekunda text beside logo.')
