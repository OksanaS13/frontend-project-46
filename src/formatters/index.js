import printDiffsInStylish from './stylish.js';
import printDiffsInPlain from './plain.js';
import printInJson from './json.js';

const formatData = (diffsTree, format) => {
  switch (format) {
    case 'plain':
      return printDiffsInPlain(diffsTree);
    case 'stylish':
      return printDiffsInStylish(diffsTree);
    case 'json':
      return printInJson(diffsTree);
    default:
      return Error(`Unknown format: '${format}'!`);
  }
};

export default formatData;
