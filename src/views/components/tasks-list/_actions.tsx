import { useState } from 'react';
import { useTodoStore } from '../../../data/stores/todo.store';
import Button from '../ui-kit/button/button';
import Icon from '../ui-kit/icon/icon';
import styles from './tasks-list.module.scss';

export default function TasksListActions(): JSX.Element {
  const [sortTasksAction] = useTodoStore((state) => [state.sortTasks]);

  const [sortIndex, setSortIndex] = useState(1);
  const sortTasks = () => {
    sortTasksAction('title', sortIndex);
    setSortIndex(sortIndex * -1);
  };

  return (
    <div className={styles['taskslist-actions']}>
      <Button
        onClick={sortTasks}
        className={styles['taskslist-button']}
        variant='outline'>
        <Icon variant='filter' />
      </Button>
    </div>
  );
}