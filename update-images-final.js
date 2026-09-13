const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['plant-maintenance-mro-spare-parts-management']) {
  if (offers['plant-maintenance-mro-spare-parts-management'].blocks[1]) {
    offers['plant-maintenance-mro-spare-parts-management'].blocks[1].image.src = '/images/live/plant-maint-block1.png';
  }
}

if (offers['spare-parts-availability']) {
  if (offers['spare-parts-availability'].blocks[0]) {
    offers['spare-parts-availability'].blocks[0].image.src = '/images/live/spare-parts-block0.png';
  }
  if (offers['spare-parts-availability'].blocks[1]) {
    offers['spare-parts-availability'].blocks[1].image.src = '/images/live/spare-parts-block1.png';
  }
}

fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
console.log('Successfully updated images for plant maintenance and spare parts availability');
