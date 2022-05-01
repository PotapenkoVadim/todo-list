import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndItem } from '../../../data/enums';
import { Task } from '../../../data/models';
import { useConfirmationModalStore } from '../../../data/stores/confirmationModal.store';
import { useTodoStore } from '../../../data/stores/todo.store';
import { useUpdateTaskModalStore } from '../../../data/stores/updateTaskModal.store';
import Button from '../ui-kit/button/button';
import FormCheckbox from '../ui-kit/form/_checkbox';
import Icon from '../ui-kit/icon/icon';
import styles from './tasks-list.module.scss';

export default function TasksListItem({ task }: { task: Task }): JSX.Element {
  const [updateTask, removeTask, dropTask] = useTodoStore((state) => [state.updateTask, state.removeTask, state.dropTask]);
  const [openUpdateTaskModal ] = useUpdateTaskModalStore((state) => [state.openModal]);
  const [openConfirmationModal, closeConfirmationModal] = useConfirmationModalStore((state) => [state.openModal, state.closeModal]);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DndItem.TASK,
    item: task,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
  }));

  const [_, drop] = useDrop(() => ({
    accept: DndItem.TASK,
    drop: (item: Task) => dropTask(item.id, task.id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  }));

  const changeTaskStatus = () => updateTask(task.id, new Task({ ...task, isComplete: !task.isComplete }));

  const confirmActions = {
    title: 'Are you sure you want to delete task?',
    confirmAction: () => {
      removeTask(task.id);
      closeConfirmationModal();
    },
    cancelAction: () => closeConfirmationModal()
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dragPreview(drop(ref));
  }, [ref]);

  return (
    <div
      className={`${styles['taskslist-item']} ${isDragging ? styles['taskslist-item__dragging'] : ''}`}
      ref={ref} >
      <div className={styles['taskslist-item-info']}>
        <span className={styles['taskslist-item-draggble']} ref={drag}>
          <Icon variant='draggble' color='white' />
        </span>

        <FormCheckbox onChange={changeTaskStatus} checked={task.isComplete}>
          <span className={`
            ${styles['taskslist-item-title']}
            ${task.isComplete ? styles['taskslist-item-title_underline'] : ''}
          `}>
            {task.title}
          </span>
        </FormCheckbox>
      </div>

      {!task.isComplete && (
        <div className={styles['taskslist-item-actions']}>
          <Button
            className={styles['taskslist-button']}
            variant='outline'
            onClick={() => openUpdateTaskModal(task)}>
            <Icon variant='edit' color='white' />
          </Button>

          <Button
            className={styles['taskslist-button']}
            variant='outline'
            onClick={() => openConfirmationModal(confirmActions)}>
            <Icon variant='delete' color='red' />
          </Button>
        </div>
      )}
    </div>
  );
}
