import _ from 'lodash';

const printObjectInStylish = (data, indent = ' ', spacesCount = 4) => {
  const iter = (obj, depth) => {
    if (!_.isObject(obj)) {
      return `${obj}`;
    }
    const indentCount = depth * spacesCount;
    const currentIndent = indent.repeat(indentCount);
    const bracketIndent = indent.repeat(indentCount - spacesCount);

    const lines = Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        const arr = [
          `${currentIndent.slice(0, -2)}- ${[key]}: ${iter(value[0].value, depth + 1)}`,
          `${currentIndent.slice(0, -2)}+ ${[key]}: ${iter(value[1].value, depth + 1)}`,
        ];
        return arr.join('\n');
      }
      if (Object.hasOwn(value, 'status')) {
        switch (value.status) {
          case 'equal':
            return `${currentIndent}${[key]}: ${iter(value.value, depth + 1)}`;
          case 'deleted':
            return `${currentIndent.slice(0, -2)}- ${[key]}: ${iter(value.value, depth + 1)}`;
          default:
            return `${currentIndent.slice(0, -2)}+ ${[key]}: ${iter(value.value, depth + 1)}`;
        }
      }
      return `${currentIndent}${[key]}: ${iter(value, depth + 1)}`;
    });
    return ['{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default printObjectInStylish;
