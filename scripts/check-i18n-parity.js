// Script to verify i18n key parity between en.json and he.json
const fs = require('fs');
const path = require('path');

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enPath = path.join(__dirname, '..', 'locales', 'en.json');
const hePath = path.join(__dirname, '..', 'locales', 'he.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const heData = JSON.parse(fs.readFileSync(hePath, 'utf8'));

const enKeys = getAllKeys(enData).sort();
const heKeys = getAllKeys(heData).sort();

console.log('\n=== I18N KEY PARITY CHECK ===\n');
console.log(`English keys: ${enKeys.length}`);
console.log(`Hebrew keys: ${heKeys.length}`);

const missingInHebrew = enKeys.filter(k => !heKeys.includes(k));
const missingInEnglish = heKeys.filter(k => !enKeys.includes(k));

if (missingInHebrew.length > 0) {
  console.log('\n❌ Keys missing in Hebrew:');
  missingInHebrew.forEach(k => console.log(`  - ${k}`));
} else {
  console.log('\n✅ All English keys exist in Hebrew');
}

if (missingInEnglish.length > 0) {
  console.log('\n❌ Keys missing in English:');
  missingInEnglish.forEach(k => console.log(`  - ${k}`));
} else {
  console.log('\n✅ All Hebrew keys exist in English');
}

if (missingInHebrew.length === 0 && missingInEnglish.length === 0) {
  console.log('\n🎉 PERFECT PARITY - All keys match between locales!\n');
} else {
  console.log(`\n⚠️  Total mismatches: ${missingInHebrew.length + missingInEnglish.length}\n`);
  process.exit(1);
}
