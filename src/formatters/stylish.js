import _ from 'lodash';

const getIndent = (depth, indent = ' ') => `${indent.repeat(depth * 4)}`;

const getSign = (type) => {
  const signs = {
    deleted: '-', added: '+', unchanged: ' ',
  };
  return `${signs[type]} `;
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object
    .entries(data)
    .map(([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`);

  return `{\n${output.join('\n')}\n${getIndent(depth)}}`;
};

const printDiffsInStylish = (tree) => {
  const iter = (data, depth) => {
    const lines = Object
      .entries(data)
      .map(([key, val]) => {
        switch (val.type) {
          case 'added':
          case 'deleted':
          case 'unchanged':
            return `${getIndent(depth).slice(0, -2)}${getSign(val.type)}${key}: ${stringify(val.value, depth)}`;
          case 'changed':
            return `${getIndent(depth).slice(0, -2)}${getSign('deleted')}${key}: ${stringify(val.changes.deleted, depth)}
${getIndent(depth).slice(0, -2)}${getSign('added')}${key}: ${stringify(val.changes.added, depth)}`;
          case 'nested':
            return `${getIndent(depth)}${key}: {\n${iter(val.children, depth + 1)}`;
          default:
            return new Error(`Unknown type: '${val.type}'!`);
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
