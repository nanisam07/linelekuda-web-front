import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('buttonText="Search Directory"', 'buttonText="Book a Doctor"')
content = content.replace('buttonText="Book Instantly"', 'buttonText="Book an Ambulance"')
content = content.replace('buttonText="Simulate Queue"', 'buttonText="Book Physiotherapy"')

# Mobile buttons as well
content = content.replace('Search Directory', 'Book a Doctor')
content = content.replace('Book Instantly', 'Book an Ambulance')
content = content.replace('Simulate Queue', 'Book Physiotherapy')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated button texts.')
