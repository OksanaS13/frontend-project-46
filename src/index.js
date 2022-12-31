import _ from 'lodash';
import { getObject, convertToString } from './utils.js';

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

  return convertToString(diffs);
};

export default findDifferences;
