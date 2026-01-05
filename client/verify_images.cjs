
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/data.ts');
const publicPath = path.join(__dirname, 'public');

const dataContent = fs.readFileSync(dataPath, 'utf8');
const imageRegex = /"\/images\/([^"]+)"/g;

let match;
const foundImages = new Set();
while ((match = imageRegex.exec(dataContent)) !== null) {
    foundImages.add(match[1]);
}

console.log(`Found ${foundImages.size} image references.`);

const missingImages = [];
foundImages.forEach(image => {
    const fullPath = path.join(publicPath, 'images', image.replace('images/', ''));
    // Note: The regex captures "project-foo.jpg" if the string is "/images/project-foo.jpg"
    // But wait, the regex group 1 is the part AFTER /images/ ? 
    // /"\/images\/([^"]+)"/ -> captures everything after /images/

    // Actually, let's adjust logic.
    // The string in file is "/images/foo.jpg".
    // Regex matches "/images/foo.jpg", captures "foo.jpg".

    if (!fs.existsSync(path.join(publicPath, 'images', image))) {
        missingImages.push(image);
    }
});

if (missingImages.length > 0) {
    console.log('Missing images:');
    missingImages.forEach(img => console.log(`- ${img}`));
} else {
    console.log('All images exist.');
}
