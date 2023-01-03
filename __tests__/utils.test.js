import { fileURLToPath } from 'url';
import path from 'path';
import {
  readFile, getExtension, buildTreeOfDifferences, makeDifferenceList, convertToString,
} from '../src/utils.js';
import toParseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const pathToJson1 = getFixturePath('file1.json');
const pathToJson2 = getFixturePath('file2.json');
const pathToYml1 = getFixturePath('file1.yml');
const pathToYml2 = getFixturePath('file2.yaml');

test('tree of differences', () => {
  const expectedResult = {
    host: { value: 'hexlet.io', status: 'equal' },
    timeout: { value1: 50, value2: 20, status: 'modified' },
    proxy: { value1: '123.234.53.22', value2: undefined, status: 'modified' },
    follow: { value1: false, value2: undefined, status: 'modified' },
    verbose: { value1: undefined, value2: true, status: 'modified' },
  };

  const file1 = toParseFile(readFile(pathToJson1), getExtension(pathToJson1));
  const file2 = toParseFile(readFile(pathToJson2), getExtension(pathToJson2));

  const file3 = toParseFile(readFile(pathToYml1), getExtension(pathToYml1));
  const file4 = toParseFile(readFile(pathToYml2), getExtension(pathToYml2));

  expect(buildTreeOfDifferences(file1, file2)).toEqual(expectedResult);
  expect(buildTreeOfDifferences(file3, file4)).toEqual(expectedResult);
  expect(buildTreeOfDifferences(file1, file4)).toEqual(expectedResult);
});

test('list of diferences', () => {
  const object = {
    follow: { value1: false, value2: undefined, status: 'modified' },
    host: { value: 'hexlet.io', status: 'equal' },
    proxy: { value1: '123.234.53.22', value2: undefined, status: 'modified' },
    timeout: { value1: 50, value2: 20, status: 'modified' },
    verbose: { value1: undefined, value2: true, status: 'modified' },
  };
  const expectedResult = [
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
  ];

  expect(makeDifferenceList(object)).toEqual(expectedResult);
});

test('convert to string', () => {
  const list1 = [
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
  ];
  const list2 = [
    '    timeout: 20',
    '    verbose: true',
    '    host: hexlet.io',
  ];
  const expectedString1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const expectedString2 = `{
    timeout: 20
    verbose: true
    host: hexlet.io
}`;

  expect(convertToString(list1)).toEqual(expectedString1);
  expect(convertToString(list2)).toEqual(expectedString2);
});
