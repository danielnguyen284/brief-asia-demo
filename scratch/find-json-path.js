import fs from 'fs';

const jsonStr = fs.readFileSync('scratch/script_21288460.js', 'utf8');
const data = JSON.parse(jsonStr);

// Find keys and search recursively
function findPath(obj, searchStr, currentPath = '') {
  if (typeof obj === 'string') {
    if (obj.toLowerCase().includes(searchStr.toLowerCase())) {
      console.log(`Found string in path ${currentPath}:`);
      console.log(obj.slice(0, 1000));
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      findPath(item, searchStr, `${currentPath}[${index}]`);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key of Object.keys(obj)) {
      findPath(obj[key], searchStr, `${currentPath}.${key}`);
    }
  }
}

findPath(data, 'Nikkei');
