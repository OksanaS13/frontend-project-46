import process from 'process';
import path from 'path';
import fs from 'fs';
import formatData from './formatters/index.js';
import parse from './parsers.js';
import buildTreeOfDifferences from './tree-builder.js';

const buildAbsolutePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const getExtension = (pathToFile) => path.extname(pathToFile).slice(1);

const getData = (pathToFile) => {
  const correctPath = buildAbsolutePath(pathToFile);
  return readFile(correctPath);
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = parse(getData(pathToFile1), getExtension(pathToFile1));
  const data2 = parse(getData(pathToFile2), getExtension(pathToFile2));
  const diffsTree = buildTreeOfDifferences(data1, data2);

  return formatData(diffsTree, format);
};

export default genDiff;
