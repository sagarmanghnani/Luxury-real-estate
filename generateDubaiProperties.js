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

const theBroksProperties = [
  { title: "Aqua Flora", image: "https://optim.tildacdn.com/tild3936-3963-4562-b937-356336626235/-/cover/480x474/center/center/-/format/webp/Cover_Aqua_Flora_2.jpg.webp", address: "Dubai Science Park, Dubai, UAE" },
  { title: "Binghatti Hills", image: "https://optim.tildacdn.com/tild3665-3533-4162-b432-363139613030/-/cover/480x474/center/center/-/format/webp/Cover_Hills_2.jpg.webp", address: "Dubai Science Park, Dubai, UAE" },
  { title: "Ocean Pearl 2", image: "https://optim.tildacdn.com/tild6264-6438-4466-a663-313463313633/-/cover/480x474/center/center/-/format/webp/Cover_Pearl_2.jpg.webp", address: "Dubai Islands, Dubai, UAE" },
  { title: "Volga Tower", image: "https://optim.tildacdn.com/tild6564-6530-4833-a630-623035333566/-/cover/480x474/center/center/-/format/webp/Cover_Volga_2.jpg.webp", address: "Jumeirah Village Triangle, Dubai, UAE" },
  { title: "Tiger Sky Tower", image: "https://optim.tildacdn.com/tild6664-3134-4463-b835-326432383466/-/cover/480x474/center/center/-/format/webp/Cover_Sky_2.jpg.webp", address: "Business Bay, Dubai, UAE" },
  { title: "Address Residences", image: "https://optim.tildacdn.com/tild3033-3163-4232-a536-633962393331/-/cover/480x474/center/center/-/format/webp/Cover_Address_2.jpg.webp", address: "Zabeel, Dubai, UAE" },
  { title: "Tanmiyat Villa", image: "https://static.tildacdn.com/tild3161-3437-4361-b130-343633666664/Cover_Legends_1.jpg", address: "Living Legends, Dubailand, UAE" }
];

const getBroksProperty = (idx) => theBroksProperties[idx % theBroksProperties.length];

const dubaiProperties = originalData.map((prop, idx) => {
    const newProp = { ...prop };
    const broksProp = getBroksProperty(idx);
    
    // Uniqe titles for duplicates
    const iter = Math.floor(idx / theBroksProperties.length);
    newProp.title = iter > 0 ? `${broksProp.title} - Unit ${iter + 1}` : broksProp.title;
    newProp.slug = newProp.title.toLowerCase().replace(/ /g, '-');
    newProp.address = broksProp.address;

    // Use The Broks specific image for the main hero image
    const isVideo1 = newProp.media.heroImages[0]?.includes('.mp4');
    const isVideo2 = newProp.media.heroImages[1]?.includes('.mp4');

    const hero1 = isVideo1 ? newProp.media.heroImages[0] : broksProp.image;
    const hero2 = isVideo2 ? newProp.media.heroImages[1] : broksProp.image; // Use the same hero for simplicity or fallback
    const hero3 = getUniqueImage(); // Keep original fallback images for 3rd image

    newProp.media.heroImages = [hero1, hero2, hero3];
    newProp.media.gallery = [
        hero1, hero1, hero3,
        getUniqueImage(), getUniqueImage(),
        getUniqueImage(), getUniqueImage(), getUniqueImage()
    ];

    return newProp;
});

fs.writeFileSync(dubaiPath, JSON.stringify(dubaiProperties, null, 2));

// Remove original to force importing from index.ts
fs.unlinkSync(srcPath);

console.log("Migration complete!");
