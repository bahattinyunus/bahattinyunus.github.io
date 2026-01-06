
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Quick and dirty parser for this specific file structure
// Extract categories object
const categoriesMatch = dataContent.match(/categories: \{([\s\S]*?)\},/);
if (!categoriesMatch) { console.log('Categories not found'); process.exit(1); }
const categoriesBlock = categoriesMatch[1];

// Extract all strings in arrays in categories
const categoryProjects = new Set();
const CatRegex = /"([^"]+)": \[(.*?)\]/g;
let catMatch;
while ((catMatch = CatRegex.exec(categoriesBlock)) !== null) {
    const projs = catMatch[2].match(/"([^"]+)"/g);
    if (projs) {
        projs.forEach(p => categoryProjects.add(p.replace(/"/g, '')));
    }
}

// Extract featured_projects
const featuredStart = dataContent.indexOf('featured_projects: [');
const featuredEnd = dataContent.indexOf('certificates: {');
const featuredBlock = dataContent.substring(featuredStart, featuredEnd);

const featuredProjects = new Set();
const nameRegex = /name:\s*"([^"]+)"/g;
let nameMatch;
while ((nameMatch = nameRegex.exec(featuredBlock)) !== null) {
    featuredProjects.add(nameMatch[1]);
}


const logStream = fs.createWriteStream('consistency_report.txt');
function log(msg) {
    logStream.write(msg + '\\n');
    console.log(msg); // keep console for debug
}

log(`Total projects in Categories: ${categoryProjects.size}`);
log(`Total projects in Featured List: ${featuredProjects.size}`);

const missingInFeatured = [];
categoryProjects.forEach(p => {
    if (!featuredProjects.has(p)) {
        missingInFeatured.push(p);
    }
});

const missingInCategories = [];
featuredProjects.forEach(p => {
    if (!categoryProjects.has(p)) {
        missingInCategories.push(p);
    }
});

if (missingInFeatured.length > 0) {
    log('\\nProjects in Categories but MISSING from Featured List (Phantom Projects):');
    missingInFeatured.forEach(p => log(`- ${p}`));
}

if (missingInCategories.length > 0) {
    log('\\nProjects in Featured List but NOT in any Category (Orphan Projects):');
    missingInCategories.forEach(p => log(`- ${p}`));
}

log('\\nChecking for duplicate images...');
const projectChunks = featuredBlock.split('},');
const projImages = {};

projectChunks.forEach(chunk => {
    const n = chunk.match(/name:\\s*"([^"]+)"/);
    const i = chunk.match(/image:\\s*"([^"]+)"/);
    if (n && i) {
        const name = n[1];
        const img = i[1];
        if (!projImages[img]) projImages[img] = [];
        projImages[img].push(name);
    }
});

Object.keys(projImages).forEach(img => {
    if (projImages[img].length > 1) {
        log(`DUPLICATE IMAGE: ${img} is used by: ${projImages[img].join(', ')}`);
    }
});

logStream.end();

