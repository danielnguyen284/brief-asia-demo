import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\admin\\Documents\\Freelance Projects\\apc\\brief-asia\\BriefAsia (full site).html';
const html = fs.readFileSync(filePath, 'utf8');

// Find script tags
const templateMatch = html.match(/<script type="__bundler\/template">([\s\S]*?)<\/script>/);
if (templateMatch) {
  const content = templateMatch[1];
  console.log('Template length:', content.length);
  fs.writeFileSync('c:\\Users\\admin\\Documents\\Freelance Projects\\apc\\brief-asia\\scratch\\template.json', content);
  console.log('Wrote template.json');
} else {
  console.log('No template match found');
}

const manifestMatch = html.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/);
if (manifestMatch) {
  const content = manifestMatch[1];
  console.log('Manifest length:', content.length);
  fs.writeFileSync('c:\\Users\\admin\\Documents\\Freelance Projects\\apc\\brief-asia\\scratch\\manifest.json', content);
  console.log('Wrote manifest.json');
} else {
  console.log('No manifest match found');
}
