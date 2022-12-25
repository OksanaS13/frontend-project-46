import fs from 'fs';
import _ from 'lodash';

const getObject = (pathToFile) => {
  const [, extension] = pathToFile.split('.');
  if (extension === 'json') {
    return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
  }
  return Error(`Unknown extension: '${extension}'!`);
};

const convertToString = (diffs, keys) => {
  const result = keys.reduce((acc, key) => {
    const strings = [];

    if (diffs[key].status === 'equal') {
      strings.push(`    ${key}: ${diffs[key].value}`);
    }

    if (diffs[key].value1 !== undefined) {
      strings.push(`  - ${key}: ${diffs[key].value1}`);
    }
    if (diffs[key].value2 !== undefined) {
      strings.push(`  + ${key}: ${diffs[key].value2}`);
    }
    return [...acc, ...strings];
  }, []);

  return `{
${result.join('\n')}
}`;
};

const findDifferences = (pathToFile1, pathToFile2) => {
  const file1 = getObject(pathToFile1);
  const file2 = getObject(pathToFile2);

  const keys = _.uniq([...Object.keys(file1), ...Object.keys(file2)]).sort();

  const diffs = keys.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      return { ...acc, [key]: { value: file1[key], status: 'equal' } };
    }
    return { ...acc, [key]: { value1: file1[key], value2: file2[key], status: 'modified' } };
  }, {});

  return convertToString(diffs, keys);
};

export { getObject, convertToString };

export default findDifferences;
