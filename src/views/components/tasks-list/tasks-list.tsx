import configuration from '../../../data/configuration';
import { Task } from '../../../data/models';
import Notification from '../notification/notification';
import styles from './tasks-list.module.scss';
import TasksListActions from './_actions';
import TasksListItem from './_item';

export default function TasksList({ tasks }: { tasks: Array<Task> }): JSX.Element {
  return (
    <div className={styles['taskslist']}>
      {tasks.length
        ? <div className={styles['taskslist-list']}>
            <TasksListActions />
            {tasks.map(item => <TasksListItem key={item.id} task={item} />)}
          </div>
        : <Notification text={configuration.notification.emptyList} />
      }
    </div>
  );
}