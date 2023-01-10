import printDifferences from '../src/index.js';

const plainResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const nestedResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const pathJson1 = '__fixtures__/file1.json';
const pathJson2 = '__fixtures__/file2.json';
const pathJson3 = '__fixtures__/file3.json';
const pathJson4 = '__fixtures__/file4.json';

const pathYml1 = '__fixtures__/file1.yml';
const pathYml2 = '__fixtures__/file2.yaml';
const pathYml3 = '__fixtures__/file3.yml';
const pathYml4 = '__fixtures__/file4.yaml';

test('differences', () => {
  expect(printDifferences(pathJson1, pathJson2)).toEqual(plainResult);
  expect(printDifferences(pathYml1, pathYml2)).toEqual(plainResult);
  expect(printDifferences(pathJson3, pathJson4)).toEqual(nestedResult);
  expect(printDifferences(pathYml3, pathYml4)).toEqual(nestedResult);
});
