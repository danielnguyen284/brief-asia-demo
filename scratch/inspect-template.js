import fs from 'fs';

const raw = fs.readFileSync('scratch/template.json', 'utf8');
const data = JSON.parse(raw);
const pageKeys = Object.keys(data.pages);
console.log('Pages keys:', pageKeys);

for (const k of pageKeys) {
  const htmlContent = data.pages[k];
  console.log(`Page: ${k}, content length: ${htmlContent.length}`);
  fs.writeFileSync(`scratch/unpacked_${k.replace(/\//g, '_')}.html`, htmlContent);
  console.log(`Wrote unpacked_${k.replace(/\//g, '_')}.html`);
}
