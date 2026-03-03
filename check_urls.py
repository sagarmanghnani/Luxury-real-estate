import json
import urllib.request
import urllib.error

with open('src/data/properties.json', 'r') as f:
    data = json.load(f)

urls = set()
for prop in data:
    if 'media' in prop:
        if 'heroImages' in prop['media']:
            urls.update(prop['media']['heroImages'])
        if 'gallery' in prop['media']:
            urls.update(prop['media']['gallery'])

print(f"Checking {len(urls)} unique URLs...")

bad_urls = []
for url in urls:
    try:
        req = urllib.request.Request(url, method='HEAD')
        urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            bad_urls.append(url)
            print("404:", url)
        else:
            print(f"{e.code}: {url}")
    except Exception as e:
        print(f"Error checking {url}: {e}")

print("Done. Bad URLs:", bad_urls)
with open('bad_urls.json', 'w') as f:
    json.dump(bad_urls, f)
