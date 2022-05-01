import { useEffect, useState } from 'react';
import configuration from '../../../data/configuration';
import { FilterMode } from '../../../data/enums';
import { Task } from '../../../data/models';
import { useTodoStore } from '../../../data/stores/todo.store';
import Notification from '../notification/notification';
import styles from './tasks-list.module.scss';
import TasksListActions from './_actions';
import TasksListItem from './_item';

export default function TasksList({ tasks }: { tasks: Array<Task> }): JSX.Element {
  const [filterValue] = useTodoStore((state) => [state.filterValue]);

  const [filteredTasks, setFilteredTasks] = useState([]);
  useEffect(() => {
    switch (filterValue) {
      case FilterMode.COMPLETE:
        setFilteredTasks(tasks.filter((task) => task.isComplete));
        break;

      case FilterMode.INCOMPLETE:
        setFilteredTasks(tasks.filter((task) => !task.isComplete));
        break;

      default:
        setFilteredTasks(tasks);
    }
  }, [tasks, filterValue]);

  return (
    <div className={styles['taskslist']}>
      <div className={styles['taskslist-list']}>
        <TasksListActions tasks={filteredTasks} />
        {filteredTasks.length
          ? filteredTasks.map(item => <TasksListItem key={item.id} task={item} />)
          : <Notification text={configuration.notification.emptyList} />
        }
      </div>
       
    </div>
  );
}