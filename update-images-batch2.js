const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['inventory-planning-optimisation']) {
  if (offers['inventory-planning-optimisation'].blocks[0]) {
    offers['inventory-planning-optimisation'].blocks[0].image.src = '/images/live/inventory-opt-block0.png';
  }
  if (offers['inventory-planning-optimisation'].blocks[1]) {
    offers['inventory-planning-optimisation'].blocks[1].image.src = '/images/live/inventory-opt-block1.png';
  }
}

if (offers['master-data-management']) {
  if (offers['master-data-management'].blocks[0]) {
    offers['master-data-management'].blocks[0].image.src = '/images/live/mdm-block0.png';
  }
  if (offers['master-data-management'].blocks[1]) {
    offers['master-data-management'].blocks[1].image.src = '/images/live/mdm-block1.png';
  }
}

if (offers['mro-supply']) {
  if (offers['mro-supply'].blocks[0]) {
    offers['mro-supply'].blocks[0].image.src = '/images/live/mro-supply-block0.png';
  }
  if (offers['mro-supply'].blocks[1]) {
    offers['mro-supply'].blocks[1].image.src = '/images/live/mro-supply-block1.png';
  }
}

fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
console.log('Successfully updated images for batch 2');
