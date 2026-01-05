
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/data.ts');
const publicPath = path.join(__dirname, 'public/images');

// Read all files in public/images
const actualFiles = fs.readdirSync(publicPath);
const fileMap = new Map();
actualFiles.forEach(f => fileMap.set(f, f)); // Exact match
const lowerMap = new Map();
actualFiles.forEach(f => lowerMap.set(f.toLowerCase(), f)); // Case-insensitive lookup

const dataContent = fs.readFileSync(dataPath, 'utf8');
const imageRegex = /"\/images\/([^"]+)"/g;

let match;
let issues = 0;

console.log('--- Case Sensitivity Check ---');

while ((match = imageRegex.exec(dataContent)) !== null) {
    const requestedImage = match[1]; // e.g. "project-foo.jpg"

    // Check if it exists in directory (exact match)
    if (fileMap.has(requestedImage)) {
        // Perfect
    } else {
        // Check if it exists purely case-insensitively
        const suggestions = lowerMap.get(requestedImage.toLowerCase());
        if (suggestions) {
            console.log(`CASE MISMATCH: Code uses "${requestedImage}", but file is "${suggestions}".`);
            issues++;
        } else {
            // If we are here, verify_images.js should have caught it, but maybe it's in a subdirectory?
            // My regex captured "blog/foo.jpg" as one string?
            // Regex: /images/([^"]+) -> captures "blog/foo.jpg"

            // Handle subdirectories
            if (requestedImage.includes('/')) {
                // simplified check for subdirs
                const parts = requestedImage.split('/');
                const subDir = parts[0];
                const subFile = parts[1];
                // We only listed root images.
                // Let's ignore blog for now as user complained about projects.
                if (subDir !== 'blog') {
                    console.log(`MISSING: ${requestedImage}`);
                    issues++;
                }
            } else {
                console.log(`MISSING: ${requestedImage}`);
                issues++;
            }
        }
    }
}

if (issues === 0) {
    console.log('No case sensitivity issues found.');
} else {
    console.log(`Found ${issues} issues.`);
}
