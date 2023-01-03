import _ from 'lodash';
import process from 'process';
import path from 'path';
import fs from 'fs';

const buildCorrectPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (pathToFile) => fs.readFileSync(buildCorrectPath(pathToFile), 'utf8');

const getExtension = (pathToFile) => path.extname(pathToFile);

const buildTreeOfDifferences = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();

  const diffs = keys.reduce((acc, key) => {
    if (object1[key] === object2[key]) {
      return { ...acc, [key]: { value: object1[key], status: 'equal' } };
    }
    return { ...acc, [key]: { value1: object1[key], value2: object2[key], status: 'modified' } };
  }, {});

  return diffs;
};

const makeDifferenceList = (object) => {
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

  return result;
};

const convertToString = (list) => `{
${list.join('\n')}
}`;

export {
  readFile,
  getExtension,
  buildTreeOfDifferences,
  makeDifferenceList,
  convertToString,
};
