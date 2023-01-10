import process from 'process';
import path from 'path';
import fs from 'fs';

const buildCorrectPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const readFile = (pathToFile) => fs.readFileSync(buildCorrectPath(pathToFile), 'utf8');

const getExtension = (pathToFile) => path.extname(pathToFile);

export {
  readFile,
  getExtension,
};
