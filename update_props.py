import json

bad_url = 'https://images.unsplash.com/photo-1600607687931-cebf581d6f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
replacement_url = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'

video_url = '/videos/luxury-villa.mp4'
video_url2 = '/videos/modern-home.mp4'

with open('src/data/properties.json', 'r') as f:
    data = json.load(f)

for prop in data:
    if 'media' in prop:
        if 'heroImages' in prop['media']:
            prop['media']['heroImages'] = [
                replacement_url if url == bad_url else url
                for url in prop['media']['heroImages']
            ]
        if 'gallery' in prop['media']:
            prop['media']['gallery'] = [
                replacement_url if url == bad_url else url
                for url in prop['media']['gallery']
            ]

# Add videos to a couple of properties for testing!
if len(data) > 0:
    data[0]['media']['heroImages'].insert(0, video_url) # Add playing video at index 0
if len(data) > 3:
    data[3]['media']['heroImages'].insert(1, video_url2) # Add playing video at index 1

with open('src/data/properties.json', 'w') as f:
    json.dump(data, f, indent=2)

print("properties.json updated successfully!")
