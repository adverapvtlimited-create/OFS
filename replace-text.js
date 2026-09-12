const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace "Procurement & Shipping"
  content = content.replace(/Procurement & Shipping/g, 'Procurement & Sourcing');
  content = content.replace(/procurement & shipping/gi, 'procurement & sourcing');
  content = content.replace(/Procurement &amp; Global Shipping/g, 'Procurement &amp; Global Sourcing');

  // Replace tagline
  content = content.replace(/End-to-End Sourcing and Global Shipping Solutions/g, 'End-to-End Global Sourcing Solutions');
  content = content.replace(/End-to-end sourcing and global shipping/gi, 'End-to-end global sourcing');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.match(/\.(js|jsx|json|md)$/)) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log('Done.');
