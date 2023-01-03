import printDifferences from '../src/index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const pathJson1 = '__fixtures__/file1.json';
const pathJson2 = '__fixtures__/file2.json';

const pathYml1 = '__fixtures__/file1.yml';
const pathYml2 = '__fixtures__/file2.yaml';

test('differences', () => {
  expect(printDifferences(pathJson1, pathJson2)).toEqual(result);
  expect(printDifferences(pathYml1, pathYml2)).toEqual(result);
});
