import { readFile, getExtension } from './utils.js';
import defineFormat from './formatters/index.js';
import toParseFile from './parsers.js';
import buildTreeOfDifferences from './tree-builder.js';

const printDifferences = (pathToFile1, pathToFile2, format = 'stylish') => {
  const [file1, file2] = [readFile(pathToFile1), readFile(pathToFile2)];
  const [extension1, extension2] = [getExtension(pathToFile1), getExtension(pathToFile2)];
  const object1 = toParseFile(file1, extension1);
  const object2 = toParseFile(file2, extension2);
  const diffsTree = buildTreeOfDifferences(object1, object2);

  const convertToString = defineFormat(format);
  return convertToString(diffsTree);
};

export default printDifferences;
