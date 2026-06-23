import fs from 'fs';

const raw = fs.readFileSync('scratch/manifest.json', 'utf8');
console.log('Manifest head (500 chars):', raw.slice(0, 500));
