import {
  buildTreeOfDifferences, makeDifferenceList, convertToString, readFile, getExtension,
} from './utils.js';
import toParseFile from './parsers.js';

const printDifferences = (pathToFile1, pathToFile2) => {
  const [file1, file2] = [readFile(pathToFile1), readFile(pathToFile2)];
  const [extension1, extension2] = [getExtension(pathToFile1), getExtension(pathToFile2)];
  const object1 = toParseFile(file1, extension1);
  const object2 = toParseFile(file2, extension2);
  const diffsTree = buildTreeOfDifferences(object1, object2);
  const orderedDiffs = makeDifferenceList(diffsTree);

  return convertToString(orderedDiffs);
};

export default printDifferences;
