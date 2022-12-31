import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { getObject, convertToString } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [nameOfFile1, nameOfFile2] = ['__fixtures__/file1.json', '__fixtures__/file2.json'];

const pathToFile1 = path.join(__dirname, '..', nameOfFile1);
const pathToFile2 = path.join(__dirname, '..', nameOfFile2);

const object1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
const object2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));

test('getObject', () => {
  expect(getObject(nameOfFile1)).toEqual(object1);
  expect(getObject(nameOfFile2)).toEqual(object2);
});

const expectedString = `{
    timeout: 20
    verbose: true
    host: hexlet.io
}`;

test('convertToString', () => {
  expect(convertToString(object2)).toEqual(expectedString);
});
