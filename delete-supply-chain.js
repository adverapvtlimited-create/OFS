const fs = require('fs');
const path = require('path');

const offersPath = path.join(__dirname, 'src', 'data', 'offers.json');
let offers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

if (offers['supply-chain-financing']) {
  delete offers['supply-chain-financing'];
  fs.writeFileSync(offersPath, JSON.stringify(offers, null, 2), 'utf8');
  console.log('Successfully deleted supply-chain-financing from offers.json');
} else {
  console.log('supply-chain-financing not found in offers.json');
}

const servicesPath = path.join(__dirname, 'src', 'data', 'services.json');
if (fs.existsSync(servicesPath)) {
  let services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
  const idx = services.findIndex(s => s.id === 'supply-chain-financing' || s.title === 'Supply Chain Financing' || s.href === '/supply-chain-financing');
  if (idx !== -1) {
    services.splice(idx, 1);
    fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2), 'utf8');
    console.log('Successfully deleted supply-chain-financing from services.json');
  }
}
