import { Task } from '../../../data/models';
import { useConfirmationModalStore } from '../../../data/stores/confirmationModal.store';
import { useTodoStore } from '../../../data/stores/todo.store';
import { useUpdateTaskModalStore } from '../../../data/stores/updateTaskModal.store';
import Button from '../ui-kit/button/button';
import FormCheckbox from '../ui-kit/form/_checkbox';
import Icon from '../ui-kit/icon/icon';
import styles from './tasks-list.module.scss';

export default function TasksListItem({ task }: { task: Task }): JSX.Element {
  const [updateTask, removeTask] = useTodoStore((state) => [state.updateTask, state.removeTask]);
  const [openUpdateTaskModal ] = useUpdateTaskModalStore((state) => [state.openModal]);
  const [openConfirmationModal, closeConfirmationModal] = useConfirmationModalStore((state) => [state.openModal, state.closeModal]);

  const changeTaskStatus = () => updateTask(task.id, new Task({ ...task, isComplete: !task.isComplete }));

  const confirmActions = {
    title: 'Are you sure you want to delete task?',
    confirmAction: () => {
      removeTask(task.id);
      closeConfirmationModal();
    },
    cancelAction: () => closeConfirmationModal()
  };

  return (
    <div className={styles['taskslist-item']}>
      <FormCheckbox onChange={changeTaskStatus} checked={task.isComplete}>
        <span className={`
          ${styles['taskslist-item-title']}
          ${task.isComplete ? styles['taskslist-item-title_underline'] : ''}
        `}>
          {task.title}
        </span>
      </FormCheckbox>

      {!task.isComplete && (
        <div className={styles['taskslist-item-actions']}>
          <Button
            className={styles['taskslist-item-button']}
            variant='outline'
            onClick={() => openUpdateTaskModal(task)}>
            <Icon variant='edit' color='white' />
          </Button>

          <Button
            className={styles['taskslist-item-button']}
            variant='outline'
            onClick={() => openConfirmationModal(confirmActions)}>
            <Icon variant='delete' color='red' />
          </Button>
        </div>
      )}
    </div>
  );
}