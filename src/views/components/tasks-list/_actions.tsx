import { ChangeEvent, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import configuration from '../../../data/configuration';
import { FilterMode } from '../../../data/enums';
import { Task } from '../../../data/models';
import { useConfirmationModalStore } from '../../../data/stores/confirmationModal.store';
import { useTodoStore } from '../../../data/stores/todo.store';
import { TaskSelectOption } from '../../../data/types';
import Button from '../ui-kit/button/button';
import FormCheckbox from '../ui-kit/form/_checkbox';
import FormSelect from '../ui-kit/form/_select';
import Icon from '../ui-kit/icon/icon';
import styles from './tasks-list.module.scss';

export default function TasksListActions({ tasks }: { tasks: Array<Task> }): JSX.Element {
  const [
    filterValue,
    sortTasksAction,
    toggleCompleteTasks,
    deleteTasks,
    changeFilterMode
  ] = useTodoStore((state) => [
    state.filterValue,
    state.sortTasks,
    state.toggleCompleteTasks,
    state.deleteTasks,
    state.changeFilterMode
  ]);
  const [openConfirmationModal, closeConfirmationModal] = useConfirmationModalStore((state) => [state.openModal, state.closeModal]);

  const [sortIndex, setSortIndex] = useState(1);
  const [isCompletedTasks, setIsCompletedTasks] = useState(false);
  const [countCompletedTasks, setCountCompletedtasks] = useState(0);

  const options: Array<TaskSelectOption> = [
    { value: FilterMode.ALL, label: 'All'},
    { value: FilterMode.COMPLETE, label: 'Completed tasks'},
    { value: FilterMode.INCOMPLETE, label: 'Incompleted tasks'},
  ];

  useEffect(() => {
    if (tasks) {
      const competedTasks = tasks.filter((task) => task.isComplete);

      setCountCompletedtasks(competedTasks.length);
      setIsCompletedTasks(tasks.every((task) => task.isComplete));
    }
  }, [tasks]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [tasks, countCompletedTasks]);

  const sortTasks = () => {
    sortTasksAction('title', sortIndex);
    setSortIndex(sortIndex * -1);
  };

  const confirmActions = {
    title: configuration.notification.deleteTasksTitle,
    confirmAction: () => {
      deleteTasks();
      closeConfirmationModal();
    },
    cancelAction: () => closeConfirmationModal()
  };

  const handleCheckboxChange = () :void => toggleCompleteTasks(!isCompletedTasks);
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => changeFilterMode(event.target.value as FilterMode);

  return (
    <div className={styles['taskslist-actions']}>
      {tasks?.length ? (
        <>
          <FormCheckbox
            onChange={handleCheckboxChange}
            checked={isCompletedTasks} />
            
          <div data-tip={configuration.notification.sortTasksTooltip}>
            <Button
              onClick={sortTasks}
              className={styles['taskslist-button']}
              variant='outline'>
              <Icon variant='filter' color='gray' />
            </Button>
          </div>
          <div data-tip={configuration.notification.deleteTasksTooltip}>
            <Button
              onClick={() => openConfirmationModal(confirmActions)}
              className={styles['taskslist-button']}
              variant='outline'>
              <Icon variant='delete' color='red' />
            </Button>
          </div>
        </>
      ) : null}

      {tasks?.length && countCompletedTasks ? (
        <div
          data-tip={configuration.notification.countCompletedTasks}
          className={styles['taskslist-actions-tasks']}>
          <Icon variant='arrow-right' color='gray' />
          {countCompletedTasks}
        </div>
      ) : null}

      <div className={styles['taskslist-actions-select']}>
        <FormSelect
          onChange={handleSelectChange}
          value={filterValue}
          options={options} />
      </div>

      <ReactTooltip place='bottom' effect='solid' />
    </div>
  );
}