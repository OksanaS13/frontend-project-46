import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const expectedResults = fs.readFileSync(getFixturePath('expected-results.txt'), 'utf-8').trim().split('\n\n');
const [stylish, plain, json] = expectedResults;

const files = [
  ['json', 'file1', 'file2'],
  ['yml', 'file1', 'file2'],
  ['yaml', 'file1', 'file2'],
];
const cases = [['stylish', stylish], ['plain', plain], ['json', json]];

describe.each(files)('generate difference between files in the "%s" format', (extension, file1, file2) => {
  const path1 = getFixturePath(`${file1}.${extension}`);
  const path2 = getFixturePath(`${file2}.${extension}`);
  test.each(cases)('testing the formatter "%s"', (format, result) => {
    expect(genDiff(path1, path2, format)).toEqual(result);
  });
});
