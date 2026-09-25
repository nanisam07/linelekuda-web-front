import sys

file_path = r'c:\Users\bhava\OneDrive\Desktop\LINELEKUNDA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replacements
content = content.replace('onClick={() => setIsSearchOpen(true)}', "onClick={() => window.open('https://wa.me/918969696456', '_blank')}")
content = content.replace('onClick={() => {\n                      setBookingStep(1);\n                      setIsBookingOpen(true);\n                    }}', "onClick={() => window.open('https://wa.me/918969696456', '_blank')}")
content = content.replace('onClick={() => {\n                        setBookingStep(1);\n                        setIsBookingOpen(true);\n                      }}', "onClick={() => window.open('https://wa.me/918969696456', '_blank')}")
content = content.replace('onClick={() => setIsQueueOpen(true)}', "onClick={() => window.open('https://wa.me/918969696456', '_blank')}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated onClicks for feature buttons.')
