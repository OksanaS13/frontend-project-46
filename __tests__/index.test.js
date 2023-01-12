import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const files = {};

beforeAll(() => {
  const [jsonFile1, jsonFile2] = [fs.readFileSync(getFixturePath('file1.json'), 'utf-8'), fs.readFileSync(getFixturePath('file2.json'), 'utf-8')];
  const [ymlFile1, ymlFile2] = [fs.readFileSync(getFixturePath('file1.yml'), 'utf-8'), fs.readFileSync(getFixturePath('file2.yaml'), 'utf-8')];

  files.json = [jsonFile1, jsonFile2];
  files.yml = [ymlFile1, ymlFile2];
});

test('generate difference', () => {
  const expectedResults = fs.readFileSync(getFixturePath('expected-results.txt'), 'utf-8').trim().split('\n\n');
  const [stylish, plain, json] = expectedResults;

  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(stylish);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml', 'plain')).toEqual(plain);
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yaml', 'json')).toEqual(json);
});
