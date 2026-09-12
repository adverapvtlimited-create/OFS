const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['plant-maintenance-mro-spare-parts-management']) {
  if (offers['plant-maintenance-mro-spare-parts-management'].blocks[0]) {
    offers['plant-maintenance-mro-spare-parts-management'].blocks[0].image.src = '/images/live/plant-maint-block0.png';
  }
}

fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
console.log('Successfully updated image for plant maintenance block 0');
