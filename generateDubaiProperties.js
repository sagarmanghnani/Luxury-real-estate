const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src/data/properties.json');
const usPath = path.join(__dirname, 'src/data/properties-us.json');
const dubaiPath = path.join(__dirname, 'src/data/properties-dubai.json');

const originalData = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

// Copy to US exactly as is
fs.writeFileSync(usPath, JSON.stringify(originalData, null, 2));

// Diverse high-end Dubai/Luxury real estate Unsplash image IDs
const imageDatabase = [
  "1600585154340-be6161a56a0c", "1600566753190-17f0baa2a6c3", "1613977257363-707ba9348227",
  "1512917774080-9991f1c4c750", "1600596542815-ffad4c1539a9", "1583608205776-bfd35f0d9f83",
  "1545324418-cc1a3fa10c00", "1613490493576-7fde63acd811", "1628624747186-a941c476b7ef",
  "1615529182904-142f3fb1cded", "1600607686527-6fca040684f0", "1564013799919-ab600027ffc6",
  "1449844908441-8829872d2607", "1600607688969-a5bfcd64fc15", "1600566752355-32c0211a7f6f",
  "1576941088065-9221cdce81fd", "1600585154526-990d1ce31d04", "1613545325278-f24b0cae1224",
  "1615874959474-d609969a20ed", "1512915922686-57c11dde9c6b", "1484154218962-a197022b58da",
  "1522708323590-d24dbb6b0267", "1416331108676-a22ccb276e35", "1501183638710-8b010c733f3e"
];

const constructImageUrl = (id) => `https://images.unsplash.com/photo-${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60`;

// Deterministic random selection
let imageIndex = 0;
const getUniqueImage = () => {
    const id = imageDatabase[imageIndex % imageDatabase.length];
    imageIndex++;
    return constructImageUrl(id);
};

const dubaiTitles = [
  "Emirates Hills Mega Mansion",
  "Palm Jumeirah Signature Villa",
  "Downtown Dubai Penthouse",
  "Al Barari Forest Estate",
  "Jumeirah Bay Island Mansion",
  "Dubai Marina Duplex",
  "Jumeirah Golf Estates Villa",
  "Burj Khalifa Sky Retreat",
  "District One Crystal Lagoon Villa",
  "The World Islands Estate",
  "Bluewaters Island Penthouse",
  "Dubai Hills Masterpiece",
  "Zabeel Saray Royal Residence",
  "Bulgari Resort Private Villa",
  "Volante Tower Opulence"
];

const dubaiAddresses = [
  "Sector L, Emirates Hills, Dubai, UAE",
  "Frond N, Palm Jumeirah, Dubai, UAE",
  "IL Primo, Downtown Dubai, Dubai, UAE",
  "The Nest, Al Barari, Dubai, UAE",
  "Jumeirah Bay Island, Dubai, UAE",
  "Le Reve, Dubai Marina, Dubai, UAE",
  "Wildflower, Jumeirah Golf Estates, Dubai, UAE",
  "Burj Khalifa Zone 4, Downtown Dubai, UAE",
  "District One, MBR City, Dubai, UAE",
  "Sweden Island, The World, Dubai, UAE",
  "Building 1, Bluewaters, Dubai, UAE",
  "Dubai Hills Grove, Dubai Hills Estate, UAE",
  "West Crescent, Palm Jumeirah, Dubai, UAE",
  "Bulgari Resort, Jumeirah Bay, Dubai, UAE",
  "Volante, Business Bay, Dubai, UAE"
];

const dubaiProperties = originalData.map((prop, idx) => {
    const newProp = { ...prop };
    newProp.title = dubaiTitles[idx];
    newProp.slug = newProp.title.toLowerCase().replace(/ /g, '-');
    newProp.address = dubaiAddresses[idx];

    // Give each property uniquely varied media but retain videos if present
    const isVideo1 = newProp.media.heroImages[0]?.includes('.mp4');
    const isVideo2 = newProp.media.heroImages[1]?.includes('.mp4');

    const hero1 = isVideo1 ? newProp.media.heroImages[0] : getUniqueImage();
    const hero2 = isVideo2 ? newProp.media.heroImages[1] : getUniqueImage();
    const hero3 = getUniqueImage();

    newProp.media.heroImages = [hero1, hero2, hero3];
    newProp.media.gallery = [
        hero1, hero2, hero3,
        getUniqueImage(), getUniqueImage(),
        getUniqueImage(), getUniqueImage(), getUniqueImage()
    ];

    return newProp;
});

fs.writeFileSync(dubaiPath, JSON.stringify(dubaiProperties, null, 2));

// Remove original to force importing from index.ts
fs.unlinkSync(srcPath);

console.log("Migration complete!");
