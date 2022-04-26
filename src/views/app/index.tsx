import styles from './index.module.scss';
import { useTodoStore } from '../../data/stores/todo.store';
import TaskForm from '../components/task-form/task-form';
import { Task } from '../../data/models';
import { generateID } from '../../data/helpers';
import TasksList from '../components/tasks-list/tasks-list';
import UpdateTaskModal from '../components/modals/update-task/update-task';
import ConfirmationModal from '../components/modals/confirmation/confirmation';
import configuration from '../../data/configuration';
import { useEffect } from 'react';

export default function App(): JSX.Element {
  const [tasks, createTask, init] = useTodoStore((state) => [state.tasks, state.createTask, state.init]);

  const createNewTask = (credentialsTask: Task): void => {
    createTask(new Task({
      ...credentialsTask,
      id: generateID(),
      createdAt: Date.now(),
      isComplete: false,
      order: tasks.length
    }));
  };

  useEffect(() => init(), []);

  return (
    <main className={styles['app']}>
      <span className={styles['app-version']}>v{configuration.version}</span>
      <h1 className={styles['app-title']}>{configuration.appName}</h1>
      <section className={styles['app-section']}>
        <TaskForm onSubmit={createNewTask} />
      </section>

      <section className={styles['app-section']}>
        <TasksList tasks={tasks} />
      </section>

      <UpdateTaskModal />
      <ConfirmationModal />
    </main>
  );
}