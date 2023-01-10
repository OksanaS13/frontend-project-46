import _ from 'lodash';

const getCorrectString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return typeof item === 'string' ? `'${item}'` : `${item}`;
};

const printDiffsInPlain = (data) => {
  const iter = (currentValue, path) => {
    if (Object.hasOwn(currentValue, 'status')) {
      if (currentValue.status === 'deleted') {
        return `Property '${path}' was removed`;
      }
      if (currentValue.status === 'added') {
        const value = getCorrectString(currentValue.value);
        return `Property '${path}' was added with value: ${value}`;
      }
      return '';
    }
    if (Array.isArray(currentValue)) {
      const deletedValue = getCorrectString(currentValue[0].value);
      const addedValue = getCorrectString(currentValue[1].value);
      return `Property '${path}' was updated. From ${deletedValue} to ${addedValue}`;
    }
    const diffs = Object.entries(currentValue).reduce((acc, [key, val]) => {
      const currentPath = path ? `${path}.${key}` : `${key}`;
      const currentResult = iter(val, currentPath);
      return currentResult ? [...acc, currentResult] : [...acc];
    }, []);
    return diffs.join('\n');
  };
  return iter(data, '');
};

export default printDiffsInPlain;
