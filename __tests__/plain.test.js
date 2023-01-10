import { fileURLToPath } from 'url';
import path from 'path';
import printDiffsInPlain from '../src/formatters/plain.js';
import { readFile, getExtension } from '../src/utils.js';
import toParseFile from '../src/parsers.js';
import buildTreeOfDifferences from '../src/tree-builder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const pathToYml3 = getFixturePath('file3.yml');
const pathToYml4 = getFixturePath('file4.yaml');

test('test plain format', () => {
  const expectedResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  const [file1, file2] = [readFile(pathToYml3), readFile(pathToYml4)];
  const [extension1, extension2] = [getExtension(pathToYml3), getExtension(pathToYml4)];
  const object1 = toParseFile(file1, extension1);
  const object2 = toParseFile(file2, extension2);
  const tree = buildTreeOfDifferences(object1, object2);

  expect(printDiffsInPlain(tree)).toEqual(expectedResult);
});