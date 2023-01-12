import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

test('generate difference', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  const pathJson1 = getFixturePath('file1.json');
  const pathJson2 = getFixturePath('file2.json');

  const pathYml1 = getFixturePath('file1.yml');
  const pathYml2 = getFixturePath('file2.yaml');

  const expectedResults = fs.readFileSync(getFixturePath('expected-results.txt'), 'utf-8').trim().split('\n\n');
  const [stylish, plain, json] = expectedResults;

  expect(genDiff(pathJson1, pathJson2)).toEqual(stylish);
  expect(genDiff(pathYml1, pathYml2, 'plain')).toEqual(plain);
  expect(genDiff(pathJson1, pathYml2, 'json')).toEqual(json);
});
