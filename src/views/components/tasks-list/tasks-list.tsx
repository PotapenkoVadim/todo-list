import configuration from '../../../data/configuration';
import { Task } from '../../../data/models';
import Notification from '../notification/notification';
import styles from './tasks-list.module.scss';
import TasksListItem from './_item';

export default function TasksList({ tasks }: { tasks: Array<Task> }): JSX.Element {
  return (
    <div className={styles['taskslist']}>{
      tasks.length
        ? tasks.map(item => <TasksListItem key={item.id} task={item} />)
        : <Notification text={configuration.notification.emptyList} />
    }</div>
  );
}