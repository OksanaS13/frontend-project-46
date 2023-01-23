import _ from 'lodash';

const buildTreeOfDifferences = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));
  const sortedKeys = _.sortBy(keys);

  const diffs = sortedKeys.reduce((acc, key) => {
    if (!_.has(object1, key)) {
      return { ...acc, [key]: { type: 'added', value: object2[key] } };
    }
    if (!_.has(object2, key)) {
      return { ...acc, [key]: { type: 'deleted', value: object1[key] } };
    }
    if (object1[key] === object2[key]) {
      return { ...acc, [key]: { type: 'unchanged', value: object1[key] } };
    }
    if (!_.isObject(object1[key]) || !_.isObject(object2[key])) {
      return { ...acc, [key]: { type: 'changed', changes: { deleted: object1[key], added: object2[key] } } };
    }

    return { ...acc, [key]: { type: 'nested', children: buildTreeOfDifferences(object1[key], object2[key]) } };
  }, {});

  return diffs;
};

export default buildTreeOfDifferences;
