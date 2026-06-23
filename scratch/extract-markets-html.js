import fs from 'fs';

const html = fs.readFileSync('scratch/unpacked_BriefAsia Homepage v3.dc.html', 'utf8');

const targetStr = 'NIKKEI 225';
const idx = html.indexOf(targetStr);
if (idx !== -1) {
  console.log('Found NIKKEI 225 in template html!');
  console.log(html.slice(idx - 1000, idx + 2000));
} else {
  // Let's search case insensitively
  const lowerIdx = html.toLowerCase().indexOf('nikkei');
  if (lowerIdx !== -1) {
    console.log('Found nikkei (case-insensitive) in template html!');
    console.log(html.slice(lowerIdx - 1000, lowerIdx + 2000));
  } else {
    console.log('Not found in template HTML');
  }
}
