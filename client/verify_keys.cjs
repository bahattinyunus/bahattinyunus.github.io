
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// We need to extract the featured_projects array.
// It starts with "featured_projects: [" and ends with "],"
const start = dataContent.indexOf("featured_projects: [");
if (start === -1) {
    console.log("Could not find featured_projects");
    process.exit(1);
}

// Find the matching closing bracket? Rough heuristic: scan for "]," before "certificates:"?
// Or just regex "match objects inside".
// Let's use a simple state machine approach since regex is hard for nested objects.
// But featured_projects is flat array of objects.

// Extract the content of the array
const arrayContent = dataContent.substring(start);
// We can just iterate looking for "name: " and check if "image: " appears before the next "name: " or end of object.

const projects = [];
const nameRegex = /name:\s*"([^"]+)"/g;
let match;

// We need to be careful not to match items outside featured_projects.
// Let's assume the array ends at "certificates: {"
const end = dataContent.indexOf("certificates: {");
const projectsBlock = dataContent.substring(start, end);

while ((match = nameRegex.exec(projectsBlock)) !== null) {
    const name = match[1];
    // Look for image property in the vicinity?
    // This is tricky with regex.

    // Better: split by "{" to get object chunks?
    // No, objects are comma separated.
}

// Let's just visually inspect the file content I have in memory or use grep line numbers.
// But verifying programmatically is safer.
// Let's parse the file line by line.

const lines = projectsBlock.split('\n');
let currentProject = null;
let hasImage = false;

lines.forEach(line => {
    if (line.includes('name: "')) {
        if (currentProject && !hasImage) {
            console.log(`MISSING IMAGE KEY: ${currentProject}`);
        }
        currentProject = line.match(/name:\s*"([^"]+)"/)[1];
        hasImage = false;
    }
    if (line.includes('image: "')) {
        hasImage = true;
    }
});
// Check last one
if (currentProject && !hasImage) {
    console.log(`MISSING IMAGE KEY: ${currentProject}`);
}

console.log("Done checking for missing keys.");
