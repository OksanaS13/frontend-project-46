import printDiffsInStylish from './stylish.js';
import printDiffsInPlain from './plain.js';

const defineFormat = (format) => {
  if (format === 'plain') {
    return printDiffsInPlain;
  }
  if (format === 'stylish') {
    return printDiffsInStylish;
  }
  return Error(`Unknown format: '${format}'!`);
};

export default defineFormat;
