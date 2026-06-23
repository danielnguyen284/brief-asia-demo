import fs from 'fs';

const filePath = 'c:\\Users\\admin\\Documents\\Freelance Projects\\apc\\brief-asia\\BriefAsia (full site).html';
const html = fs.readFileSync(filePath, 'utf8');

// Find all script tags
const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const attrs = match[1];
  const content = match[2];
  console.log(`Script tag with attributes [${attrs}]: index ${match.index}, length ${content.length}`);
  if (content.length > 500 && content.length < 500000) {
    fs.writeFileSync(`scratch/script_${match.index}.js`, content);
    console.log(`Wrote script_${match.index}.js`);
  }
}
