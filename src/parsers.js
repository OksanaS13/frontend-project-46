import yaml from 'js-yaml';

const toParseFile = (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(data);
  }
  return Error(`Unknown extension: '${extension}'!`);
};

export default toParseFile;
