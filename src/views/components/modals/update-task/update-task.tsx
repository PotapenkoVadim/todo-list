import { Task } from '../../../../data/models';
import { useTodoStore } from '../../../../data/stores/todo.store';
import { useUpdateTaskModalStore } from '../../../../data/stores/updateTaskModal.store';
import TaskForm from '../../task-form/task-form';
import Modal from '../modal/modal';
import styles from './update-task.module.scss';

export default function UpdateTaskModal(): JSX.Element {
  const [isShow, task, closeModal] = useUpdateTaskModalStore((state) => [state.isShow, state.task, state.closeModal]);
  const [updateTask] = useTodoStore((state) => [state.updateTask]);

  const closeUpdateTaskModal = (event): void => {
    if (event.target.dataset.type === 'modal') {
      closeModal();
    }
  };

  const handleSubmit = (updatedTask: Task): void => {
    updateTask(task.id, updatedTask);
    closeModal();
  };

  return (
    <div
      onClick={closeUpdateTaskModal}
      data-type='modal'
      className={`${styles['updatetask']} ${isShow ? styles['updatetask__isShow'] : ''}`}>
      <Modal className={styles['updatetask-content']} title='Update task'>
        <TaskForm task={task} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}