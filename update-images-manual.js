const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['strategic-sourcing-mro-data-enrichment']) {
  if (offers['strategic-sourcing-mro-data-enrichment'].blocks[0]) {
    offers['strategic-sourcing-mro-data-enrichment'].blocks[0].image.src = '/images/live/strategic-sourcing-block0.png';
  }
  if (offers['strategic-sourcing-mro-data-enrichment'].blocks[1]) {
    offers['strategic-sourcing-mro-data-enrichment'].blocks[1].image.src = '/images/live/strategic-sourcing-block1.png';
  }
}

if (offers['supply-chain-financing']) {
  if (offers['supply-chain-financing'].blocks[0]) {
    offers['supply-chain-financing'].blocks[0].image.src = '/images/live/supply-chain-finance-block0.png';
  }
  if (offers['supply-chain-financing'].blocks[1]) {
    offers['supply-chain-financing'].blocks[1].image.src = '/images/live/supply-chain-finance-block1.png';
  }
}

fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
console.log('Successfully updated images for strategic sourcing and supply chain financing');
