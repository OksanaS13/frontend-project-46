import { fileURLToPath } from 'url';
import path from 'path';
import buildTreeOfDifferences from '../src/tree-builder.js';
import { readFile, getExtension } from '../src/utils.js';
import toParseFile from '../src/parsers.js';

let file1;
let file2;
let file3;
let file4;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  const pathToJson1 = getFixturePath('file1.json');
  const pathToJson2 = getFixturePath('file2.json');
  const pathToYml3 = getFixturePath('file3.yml');
  const pathToYml4 = getFixturePath('file4.yaml');

  file1 = toParseFile(readFile(pathToJson1), getExtension(pathToJson1));
  file2 = toParseFile(readFile(pathToJson2), getExtension(pathToJson2));
  file3 = toParseFile(readFile(pathToYml3), getExtension(pathToYml3));
  file4 = toParseFile(readFile(pathToYml4), getExtension(pathToYml4));
});

test('tree of differences', () => {
  const plainResult = {
    follow: { value: false, status: 'deleted' },
    host: { value: 'hexlet.io', status: 'equal' },
    proxy: { value: '123.234.53.22', status: 'deleted' },
    timeout: [{ value: 50, status: 'deleted' }, { value: 20, status: 'added' }],
    verbose: { value: true, status: 'added' },
  };

  const nestedResult = {
    common: {
      follow: {
        value: false,
        status: 'added',
      },
      setting1: {
        value: 'Value 1',
        status: 'equal',
      },
      setting2: {
        value: 200,
        status: 'deleted',
      },
      setting3: [
        {
          value: true,
          status: 'deleted',
        },
        {
          value: null,
          status: 'added',
        },
      ],
      setting4: {
        value: 'blah blah',
        status: 'added',
      },
      setting5: {
        value: {
          key5: 'value5',
        },
        status: 'added',
      },
      setting6: {
        doge: {
          wow: [
            {
              value: '',
              status: 'deleted',
            },
            {
              value: 'so much',
              status: 'added',
            },
          ],
        },
        key: {
          value: 'value',
          status: 'equal',
        },
        ops: {
          value: 'vops',
          status: 'added',
        },
      },
    },
    group1: {
      baz: [
        {
          value: 'bas',
          status: 'deleted',
        },
        {
          value: 'bars',
          status: 'added',
        },
      ],
      foo: {
        value: 'bar',
        status: 'equal',
      },
      nest: [
        {
          value: {
            key: 'value',
          },
          status: 'deleted',
        },
        {
          value: 'str',
          status: 'added',
        },
      ],
    },
    group2: {
      value: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
      status: 'deleted',
    },
    group3: {
      value: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
      status: 'added',
    },
  };

  expect(buildTreeOfDifferences(file1, file2)).toEqual(plainResult);
  expect(buildTreeOfDifferences(file3, file4)).toEqual(nestedResult);
});
