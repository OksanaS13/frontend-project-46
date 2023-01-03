import { fileURLToPath } from 'url';
import path from 'path';
import getObject from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const [fileName1, fileName2, fileName3, fileName4] = ['file1.json', 'file2.json', 'file1.yml', 'file2.yaml'];

const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const file2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('read file', () => {
  expect(getObject(getFixturePath(fileName1))).toEqual(file1);
  expect(getObject(getFixturePath(fileName2))).toEqual(file2);
  expect(getObject(getFixturePath(fileName3))).toEqual(file1);
  expect(getObject(getFixturePath(fileName4))).toEqual(file2);
});
