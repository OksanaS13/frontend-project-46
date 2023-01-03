import { fileURLToPath } from 'url';
import path from 'path';
import { readFile } from '../src/utils.js';
import toParseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const file1 = readFile(getFixturePath('file1.json'));
const file2 = readFile(getFixturePath('file2.json'));
const file3 = readFile(getFixturePath('file1.yml'));
const file4 = readFile(getFixturePath('file2.yaml'));

const expectedObj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const expectedObj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('read file', () => {
  expect(toParseFile(file1, '.json')).toEqual(expectedObj1);
  expect(toParseFile(file2, '.json')).toEqual(expectedObj2);
  expect(toParseFile(file3, '.yml')).toEqual(expectedObj1);
  expect(toParseFile(file4, '.yaml')).toEqual(expectedObj2);
});
