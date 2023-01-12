import process from 'process';
import path from 'path';
import fs from 'fs';
import defineFormat from './formatters/index.js';
import toParseFile from './parsers.js';
import buildTreeOfDifferences from './tree-builder.js';

const buildCorrectPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (pathToFile) => fs.readFileSync(buildCorrectPath(pathToFile), 'utf8');

const getExtension = (pathToFile) => path.extname(pathToFile).slice(1);

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const [file1, file2] = [readFile(pathToFile1), readFile(pathToFile2)];
  const [extension1, extension2] = [getExtension(pathToFile1), getExtension(pathToFile2)];
  const data1 = toParseFile(file1, extension1);
  const data2 = toParseFile(file2, extension2);
  const diffsTree = buildTreeOfDifferences(data1, data2);

  const formalizeDiffs = defineFormat(format);
  return formalizeDiffs(diffsTree);
};

export default genDiff;
