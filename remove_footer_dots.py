import glob, re

html_files = glob.glob('C:/Users/sanmu/Desktop/Portpholio/*.html')

# Footer brand dots block (indented with 8 spaces)
footer_dots = '''        <div class="g-dots">
          <span class="g-dot b"></span><span class="g-dot r"></span><span class="g-dot y"></span><span class="g-dot g"></span>
        </div>'''

updated = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    changed = False

    # Remove footer dots
    if footer_dots in text:
        text = text.replace(footer_dots, '')
        changed = True

    # Also remove any remaining g-dots divs with any indentation using regex
    cleaned, n = re.subn(
        r'\s*<div class="g-dots">\s*<span class="g-dot [a-z]"></span>(?:<span class="g-dot [a-z]"></span>)*\s*</div>',
        '', text
    )
    if n > 0:
        text = cleaned
        changed = True

    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Fixed: {file}")
        updated += 1
    else:
        print(f"Already clean: {file}")

print(f"\nTotal: {updated} files cleaned")
