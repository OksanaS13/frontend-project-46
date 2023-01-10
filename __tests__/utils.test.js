import { fileURLToPath } from 'url';
import path from 'path';
import { getExtension } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const pathToJson1 = getFixturePath('file1.json');
const pathToYml3 = getFixturePath('file3.yml');

test('Get extension', () => {
  expect(getExtension(pathToJson1)).toEqual('.json');
  expect(getExtension(pathToYml3)).toEqual('.yml');
});
