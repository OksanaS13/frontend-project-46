import { fileURLToPath } from 'url';
import path from 'path';
import printInJson from '../src/formatters/json.js';
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

test('test JSOn format', () => {
  const expectedResult = `{
  "common": {
    "follow": {
      "value": false,
      "status": "added"
    },
    "setting1": {
      "value": "Value 1",
      "status": "equal"
    },
    "setting2": {
      "value": 200,
      "status": "deleted"
    },
    "setting3": [
      {
        "value": true,
        "status": "deleted"
      },
      {
        "value": null,
        "status": "added"
      }
    ],
    "setting4": {
      "value": "blah blah",
      "status": "added"
    },
    "setting5": {
      "value": {
        "key5": "value5"
      },
      "status": "added"
    },
    "setting6": {
      "doge": {
        "wow": [
          {
            "value": "",
            "status": "deleted"
          },
          {
            "value": "so much",
            "status": "added"
          }
        ]
      },
      "key": {
        "value": "value",
        "status": "equal"
      },
      "ops": {
        "value": "vops",
        "status": "added"
      }
    }
  },
  "group1": {
    "baz": [
      {
        "value": "bas",
        "status": "deleted"
      },
      {
        "value": "bars",
        "status": "added"
      }
    ],
    "foo": {
      "value": "bar",
      "status": "equal"
    },
    "nest": [
      {
        "value": {
          "key": "value"
        },
        "status": "deleted"
      },
      {
        "value": "str",
        "status": "added"
      }
    ]
  },
  "group2": {
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    },
    "status": "deleted"
  },
  "group3": {
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    },
    "status": "added"
  }
}`;

  expect(printInJson(tree)).toEqual(expectedResult);
});
