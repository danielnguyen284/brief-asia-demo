import fs from 'fs';

const filePath = 'c:\\Users\\admin\\Documents\\Freelance Projects\\apc\\brief-asia\\BriefAsia (full site).html';
const html = fs.readFileSync(filePath, 'utf8');

const targetStr = 'STI';
const idx = html.indexOf(targetStr, 21000000);
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 1500));
} else {
  console.log('Not found past 21MB');
}
