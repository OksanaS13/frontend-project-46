import process from 'process';
import path from 'path';
import fs from 'fs';
import defineFormatter from './formatters/index.js';
import parse from './parsers.js';
import buildTreeOfDifferences from './tree-builder.js';

const buildCorrectPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const getExtension = (pathToFile) => path.extname(pathToFile).slice(1);

const getData = (pathToFile) => {
  const correctPath = buildCorrectPath(pathToFile);
  const file = readFile(correctPath);
  const extension = getExtension(pathToFile);
  return [file, extension];
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = parse(...getData(pathToFile1));
  const data2 = parse(...getData(pathToFile2));
  const diffsTree = buildTreeOfDifferences(data1, data2);

  const formalizeDiffs = defineFormatter(format);
  return formalizeDiffs(diffsTree);
};

export default genDiff;
