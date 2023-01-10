import { fileURLToPath } from 'url';
import path from 'path';
import printDiffsInStylish from '../src/formatters/stylish.js';
import { readFile, getExtension } from '../src/utils.js';
import toParseFile from '../src/parsers.js';
import buildTreeOfDifferences from '../src/tree-builder.js';

let tree;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

  const pathToYml3 = getFixturePath('file3.yml');
  const pathToYml4 = getFixturePath('file4.yaml');

  const [file1, file2] = [readFile(pathToYml3), readFile(pathToYml4)];
  const [extension1, extension2] = [getExtension(pathToYml3), getExtension(pathToYml4)];
  const object1 = toParseFile(file1, extension1);
  const object2 = toParseFile(file2, extension2);
  tree = buildTreeOfDifferences(object1, object2);
});

test('Convert to string', () => {
  const expectedResult = `{
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

  expect(printDiffsInStylish(tree)).toEqual(expectedResult);
});
