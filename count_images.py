import json
import glob
import urllib.parse
import os

urls = set()
for filepath in glob.glob('src/data/*.json'):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
            if not isinstance(data, list):
                if 'properties' in data:
                    data = data['properties']
            for prop in data:
                print(prop.get('id', 'unknown'))
                if 'media' in prop:
                    if 'heroImages' in prop['media']:
                        urls.update(prop['media']['heroImages'])
                    if 'gallery' in prop['media']:
                        urls.update(prop['media']['gallery'])
    except Exception as e:
        print(f"Skipping {filepath}: {e}")

remote_urls = [u for u in urls if u.startswith('http') and not u.startswith('localhost')]
print(f"Total remote URLs to download: {len(remote_urls)}")
