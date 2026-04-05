import os
import shutil
from pathlib import Path
import random

agent_img = "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_agent_headshot_1775218789657.png"
prop_imgs = [
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_mansion_exterior_1775218722469.png",
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_penthouse_interior_1775218740883.png",
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_villa_pool_1775218756302.png",
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_kitchen_modern_1775218771373.png"
]

target_dir = Path("/Users/sagarmanghnani/Desktop/Development/real-estate-project/luxury-realty-engine/public/images/reliable")
agent_target = "img_206f3fc25a28.jpg"

i = 0
for file in target_dir.iterdir():
    if not file.is_file():
        continue
        
    if file.name == agent_target:
        print(f"Replacing {file.name} with agent headshot")
        shutil.copyfile(agent_img, file)
    else:
        # Avoid overriding with exactly the same image twice in a row if possible, 
        # but just round-robin is fine to ensure variety.
        source = prop_imgs[i % len(prop_imgs)]
        print(f"Replacing {file.name} with property image {i % len(prop_imgs)}")
        shutil.copyfile(source, file)
        i += 1

print("All placeholder images replaced with high-quality generated images!")
