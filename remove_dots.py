import glob

html_files = glob.glob('C:/Users/sanmu/Desktop/Portpholio/*.html')

# The g-dots block in the nav bar (top bar brand area)
old_dots = '''      <div class="g-dots">
        <span class="g-dot b"></span><span class="g-dot r"></span><span class="g-dot y"></span><span class="g-dot g"></span>
      </div>'''

# MCA '26 tag variants
mca_tag = ' <span class="g-brand-tag">MCA \'26</span>'
mca_tag2 = '<span class="g-brand-tag">MCA \'26</span>'

updated = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    changed = False

    # Remove colored dots
    if old_dots in text:
        text = text.replace(old_dots, '')
        changed = True

    # Remove MCA '26 tag
    if mca_tag in text:
        text = text.replace(mca_tag, '')
        changed = True
    elif mca_tag2 in text:
        text = text.replace(mca_tag2, '')
        changed = True

    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Updated: {file}")
        updated += 1
    else:
        print(f"No match: {file}")

print(f"\nTotal: {updated} files updated")
