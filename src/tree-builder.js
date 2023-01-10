import _ from 'lodash';

const buildTreeOfDifferences = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]);
  const sortedKeys = _.sortBy(keys);

  const diffs = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(object1, key) || !Object.hasOwn(object2, key)) {
      const value = Object.hasOwn(object1, key) ? object1[key] : object2[key];
      const status = Object.hasOwn(object1, key) ? 'deleted' : 'added';
      return { ...acc, [key]: { value, status } };
    }
    if (object1[key] === object2[key]) {
      const value = object1[key];
      const status = 'equal';
      return { ...acc, [key]: { value, status } };
    }
    if (!_.isObject(object1[key]) || !_.isObject(object2[key])) {
      const res = { [key]: [{ value: object1[key], status: 'deleted' }, { value: object2[key], status: 'added' }] };
      return { ...acc, ...res };
    }

    return { ...acc, [key]: { ...buildTreeOfDifferences(object1[key], object2[key]) } };
  }, {});

  return diffs;
};

export default buildTreeOfDifferences;
