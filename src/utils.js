import fs from 'fs';
import process from 'process';
import path from 'path';

const getObject = (pathToFile) => {
  const correctPath = path.resolve(process.cwd(), pathToFile);
  const [, extension] = pathToFile.split('.');
  if (extension === 'json') {
    return JSON.parse(fs.readFileSync(correctPath, 'utf8'));
  }
  return Error(`Unknown extension: '${extension}'!`);
};

const convertToString = (object) => {
  const keys = Object.keys(object);
  const result = keys.reduce((acc, key) => {
    const strings = [];

    if (object[key].status !== 'modified') {
      const value = object[key].value ? object[key].value : object[key];
      strings.push(`    ${key}: ${value}`);
    }

    if (object[key].value1 !== undefined) {
      strings.push(`  - ${key}: ${object[key].value1}`);
    }
    if (object[key].value2 !== undefined) {
      strings.push(`  + ${key}: ${object[key].value2}`);
    }
    return [...acc, ...strings];
  }, []);

  return `{
${result.join('\n')}
}`;
};

export { getObject, convertToString };
