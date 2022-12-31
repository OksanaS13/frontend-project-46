import findDifferences from '../src/index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const path1 = '__fixtures__/file1.json';
const path2 = '__fixtures__/file2.json';

test('differences', () => {
  expect(findDifferences(path1, path2)).toEqual(result);
});
