import printDiffsInStylish from './stylish.js';
import printDiffsInPlain from './plain.js';
import printInJson from './json.js';

const defineFormatter = (format) => {
  switch (format) {
    case 'plain':
      return printDiffsInPlain;
    case 'stylish':
      return printDiffsInStylish;
    case 'json':
      return printInJson;
    default:
      return Error(`Unknown format: '${format}'!`);
  }
};

export default defineFormatter;
