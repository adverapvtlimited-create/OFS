const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['global-mro-procurement-excellence']) {
  offers['global-mro-procurement-excellence'].heroImage = '/images/live/global-mro-hero.png';
  if (offers['global-mro-procurement-excellence'].blocks[0]) {
    offers['global-mro-procurement-excellence'].blocks[0].image.src = '/images/live/global-mro-block0.png';
  }
  if (offers['global-mro-procurement-excellence'].blocks[1]) {
    offers['global-mro-procurement-excellence'].blocks[1].image.src = '/images/live/global-mro-block1.png';
  }
  if (offers['global-mro-procurement-excellence'].blocks[2]) {
    offers['global-mro-procurement-excellence'].blocks[2].image.src = '/images/live/global-mro-block2.png';
  }
  
  fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
  console.log('Successfully updated images for global-mro-procurement-excellence');
} else {
  console.error('global-mro-procurement-excellence not found');
}
