import json
import urllib.request
import urllib.error
import glob

urls = set()
for filepath in glob.glob('src/data/*.json'):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
            for prop in data:
                if 'media' in prop:
                    if 'heroImages' in prop['media']:
                        urls.update(prop['media']['heroImages'])
                    if 'gallery' in prop['media']:
                        urls.update(prop['media']['gallery'])
    except Exception as e:
        print(f"Skipping {filepath}: {e}")

print(f"Checking {len(urls)} unique URLs...")

bad_urls = []
for url in urls:
    if not url.startswith('http'):
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        urllib.request.urlopen(req, timeout=5)
    except urllib.error.HTTPError as e:
        print(f"{e.code}: {url}")
        bad_urls.append(url)
    except Exception as e:
        print(f"Error checking {url}: {e}")
        bad_urls.append(url)

with open('bad_urls.json', 'w') as f:
    json.dump(bad_urls, f)
print(f"Done. Found {len(bad_urls)} bad URLs.")
