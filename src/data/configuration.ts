import packagejson from '../../package.json';

export default {
  appName: 'Todo List',
  version: packagejson.version,
  notification: { emptyList: 'There is no one tasks.' }
};
