import os
import re
import urllib.request
import urllib.error
import hashlib
import glob
from pathlib import Path
import shutil

# Target directory for local images
public_dir = Path("public/images/reliable")
public_dir.mkdir(parents=True, exist_ok=True)

# URL prefixes to consider as remote images
PREFIXES = [
    r"https://images\.unsplash\.com/[^\s\"'\\]+",
    r"https://optim\.tildacdn\.com/[^\s\"'\\]+",
    r"https://static\.tildacdn\.com/[^\s\"'\\]+"
]
combined_pattern = "|".join(f"({p})" for p in PREFIXES)
regex = re.compile(combined_pattern)

file_paths = []
# Find all json and tsx files in src/
for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.json') or file.endswith('.tsx') or file.endswith('.ts'):
            file_paths.append(Path(root) / file)

unique_urls = set()
for p in file_paths:
    with open(p, 'r') as f:
        content = f.read()
        matches = regex.findall(content)
        for match in matches:
            for url in match:
                if url:
                    # Clean up trailing punctuation if any
                    url = url.rstrip('",\'\\')
                    unique_urls.add(url)

print(f"Found {len(unique_urls)} unique image URLs to download.")

url_to_local = {}
success_images = []

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')]
urllib.request.install_opener(opener)

for url in unique_urls:
    url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
    # Keep some semblance of the original name if tilda or unsplash
    if "unsplash" in url:
        ext = ".jpg"
    elif ".webp" in url:
        ext = ".webp"
    else:
        ext = ".jpg"
    
    filename = f"img_{url_hash}{ext}"
    local_path = public_dir / filename
    local_url = f"/images/reliable/{filename}"
    url_to_local[url] = local_url
    
    if local_path.exists() and local_path.stat().st_size > 0:
        success_images.append(local_url)
        continue
        
    print(f"Downloading {url[:50]}...")
    try:
        urllib.request.urlretrieve(url, local_path)
        success_images.append(local_url)
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        # Will map to a fallback later

print("Download complete. Replacing URLs in files...")

# Fallback for failed downloads
fallback = success_images[0] if success_images else "/images/fallback.jpg"
if not success_images:
    # touch fallback if empty
    with open(public_dir / "fallback.jpg", "wb") as f:
        pass

for url in unique_urls:
    local_url = url_to_local[url]
    local_file = public_dir / Path(local_url).name
    if not local_file.exists() or local_file.stat().st_size == 0:
        url_to_local[url] = fallback

for p in file_paths:
    with open(p, 'r') as f:
        content = f.read()
    
    new_content = content
    for url, local in url_to_local.items():
        new_content = new_content.replace(url, local)
        
    if new_content != content:
        with open(p, 'w') as f:
            f.write(new_content)
        print(f"Updated {p}")

print("All done!")
