import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as glob from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractTranslationKeys = (content: string): string[] => {
  const regex = /t\(['"](.+?)['"]/g;
  const keys: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  return keys;
};

const scanFiles = (pattern: string): string[] => {
  const files = glob.sync(pattern);
  const allKeys: string[] = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const keys = extractTranslationKeys(content);
    allKeys.push(...keys);
  });

  return Array.from(new Set(allKeys)); // Remove duplicates
};

const updateTranslationFile = (keys: string[], filePath: string) => {
  let translations: Record<string, any> = {};
  if (fs.existsSync(filePath)) {
    translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  keys.forEach((key) => {
    if (!translations[key]) {
      const parts = key.split('.');
      let current = translations;
      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          current[parts[i]] = key; // Use the key as a placeholder value
        } else {
          current[parts[i]] = current[parts[i]] || {};
          current = current[parts[i]];
        }
      }
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
};

const main = () => {
  const keys = scanFiles('src/**/*.{ts,tsx}');
  updateTranslationFile(keys, 'src/locales/en.json');
  updateTranslationFile(keys, 'src/locales/es.json');
  console.log('Translation keys extracted and files updated.');
};

main();
