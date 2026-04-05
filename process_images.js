const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Next.js should have sharp installed

const reliableDir = path.join(__dirname, 'public/images/reliable');

const propImgs = [
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_mansion_exterior_1775218722469.png",
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_penthouse_interior_1775218740883.png",
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_villa_pool_1775218756302.png",
    "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_kitchen_modern_1775218771373.png"
];

const agentImg = "/Users/sagarmanghnani/.gemini/antigravity/brain/24413e17-cf0b-494d-b2f5-122fe0ef64a1/luxury_agent_headshot_1775218789657.png";

async function processImages() {
    const files = fs.readdirSync(reliableDir);
    let i = 0;
    
    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|webp)$/i)) continue;
        
        const isAgent = file === "img_206f3fc25a28.jpg";
        const sourceImg = isAgent ? agentImg : propImgs[i % propImgs.length];
        if (!isAgent) i++;
        
        const ext = path.extname(file).toLowerCase();
        const targetPath = path.join(reliableDir, file);
        
        // Use sharp to convert the source PNG to the correct DEST format
        try {
            let s = sharp(sourceImg);
            if (ext === '.jpg' || ext === '.jpeg') {
                s = s.jpeg({ quality: 90 });
            } else if (ext === '.webp') {
                s = s.webp({ quality: 90 });
            }
            await s.toFile(targetPath);
            console.log(`Converted and saved ${file} properly from ${path.basename(sourceImg)}`);
        } catch(e) {
            console.error(`Error processing ${file}: ${e.message}`);
        }
    }
}

processImages().then(() => console.log('Done!'));
