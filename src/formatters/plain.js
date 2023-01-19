import _ from 'lodash';

const getCorrectString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return typeof item === 'string' ? `'${item}'` : `${item}`;
};

const printDiffsInPlain = (data) => {
  const iter = (currentValue, path) => {
    const diffs = Object
      .entries(currentValue)
      .reduce((acc, [key, val]) => {
        const currentPath = path ? `${path}.${key}` : `${key}`;
        switch (val.status) {
          case 'added': {
            const value = getCorrectString(val.value);
            return [...acc, `Property '${currentPath}' was added with value: ${value}`];
          }
          case 'deleted':
            return [...acc, `Property '${currentPath}' was removed`];
          case 'changed': {
            const deletedValue = getCorrectString(val.changes.deleted);
            const addedValue = getCorrectString(val.changes.added);
            return [...acc, `Property '${currentPath}' was updated. From ${deletedValue} to ${addedValue}`];
          }
          case 'nested': {
            const currentResult = iter(val.children, currentPath);
            return currentResult ? [...acc, currentResult] : [...acc];
          }
          default:
            return [...acc];
        }
      }, []);

    return diffs.join('\n');
  };
  return iter(data, '');
};

export default printDiffsInPlain;
