import sys
import shutil
from PIL import Image

print("Processing formal portrait...", flush=True)

src = r"C:/Users/sanmu/.gemini/antigravity/brain/b0eb6a06-21a9-43fd-928c-37c9dd65d12a/.user_uploaded/media_1795239200747_2212d32a.jpg"
dest_jpg = "assets/profile.jpg"
dest_png = "assets/profile_nobg.png"

# 1. Copy as formal profile.jpg
shutil.copy(src, dest_jpg)
print(f"Updated {dest_jpg}", flush=True)

# 2. Open and inspect
im = Image.open(dest_jpg)
print(f"Image size: {im.size}, format: {im.format}", flush=True)

# 3. Use rembg with lightweight u2netp
import rembg
print("Creating rembg u2netp session...", flush=True)
session = rembg.new_session("u2netp")

print("Removing background...", flush=True)
out = rembg.remove(im, session=session)
out.save(dest_png, "PNG")
print(f"SUCCESS: Saved cutout to {dest_png}!", flush=True)
