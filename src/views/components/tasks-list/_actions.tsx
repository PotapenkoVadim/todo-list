import { useEffect, useState } from 'react';
import { Task } from '../../../data/models';
import { useTodoStore } from '../../../data/stores/todo.store';
import Button from '../ui-kit/button/button';
import FormCheckbox from '../ui-kit/form/_checkbox';
import Icon from '../ui-kit/icon/icon';
import styles from './tasks-list.module.scss';

export default function TasksListActions({ tasks }: { tasks: Array<Task> }): JSX.Element {
  const [sortTasksAction, toggleCompleteTasks] = useTodoStore((state) => [state.sortTasks, state.toggleCompleteTasks]);

  const [sortIndex, setSortIndex] = useState(1);
  const [isCompletedTasks, setIsCompletedTasks] = useState(false);
  const [countCompletedTasks, setCountCompletedtasks] = useState(0);

  useEffect(() => {
    if (tasks) {
      const competedTasks = tasks.filter((task) => task.isComplete);

      setCountCompletedtasks(competedTasks.length);
      setIsCompletedTasks(tasks.every((task) => task.isComplete));
    }
  }, [tasks]);

  const sortTasks = () => {
    sortTasksAction('title', sortIndex);
    setSortIndex(sortIndex * -1);
  };

  const handleCheckboxChange = () => toggleCompleteTasks(!isCompletedTasks);

  return (
    <div className={styles['taskslist-actions']}>
      <FormCheckbox onChange={handleCheckboxChange} checked={isCompletedTasks} />

      <Button
        onClick={sortTasks}
        className={styles['taskslist-button']}
        variant='outline'>
        <Icon variant='filter' color='gray' />
      </Button>

      {countCompletedTasks ? (
        <div className={styles['taskslist-actions-tasks']}>
          <Icon variant='arrow-right' color='gray' />
          {countCompletedTasks}
        </div>
      ) : null}
    </div>
  );
}