import _ from 'lodash';

const getIndent = (depth, status = 'nested', indent = ' ') => {
  const signs = {
    deleted: '-', added: '+', unchanged: ' ', nested: ' ',
  };
  const spacesCount = depth * 4 - 2;

  return (spacesCount > 0) ? `${indent.repeat(spacesCount)}${signs[status]} ` : '';
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object
    .entries(data)
    .map(([key, val]) => {
      const res = `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`;

      return res;
    });

  return `{\n${output.join('\n')}\n${getIndent(depth)}}`;
};

const printDiffsInStylish = (tree) => {
  const iter = (data, depth) => {
    const lines = Object
      .entries(data)
      .map(([key, val]) => {
        switch (val.status) {
          case 'added':
          case 'deleted':
          case 'unchanged':
            return `${getIndent(depth, val.status)}${key}: ${stringify(val.value, depth)}`;
          case 'changed':
            return `${getIndent(depth, 'deleted')}${key}: ${stringify(val.changes.deleted, depth)}
${getIndent(depth, 'added')}${key}: ${stringify(val.changes.added, depth)}`;
          case 'nested':
            return `${getIndent(depth, val.status)}${key}: {\n${iter(val.children, depth + 1)}`;
          default:
            return new Error(`Unknown operator: '${val.status}'!`);
        }
      });

    return [
      ...lines,
      `${getIndent(depth - 1)}}`,
    ].join('\n');
  };
  return `{\n${iter(tree, 1)}`;
};

export default printDiffsInStylish;
