import packagejson from '../../package.json';

export default {
  appName: 'Todo List',
  version: packagejson.version,
  notification: {
    emptyList: 'There is no one tasks.',
    deleteTaskTitle: 'Are you sure you want to delete task?',
    deleteTasksTitle: 'Are you sure you want to delete all tasks?'
  }
};
