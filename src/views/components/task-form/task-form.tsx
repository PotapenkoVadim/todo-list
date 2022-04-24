import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Task } from '../../../data/models';
import Button from '../ui-kit/button/button';
import FormTextInput from '../ui-kit/form/_text-input';
import styles from './task-form.module.scss';

export default function TaskForm({
  task,
  onSubmit
}:{
  task?: Partial<Task>;
  onSubmit: (credetials: Partial<Task>) => void;
}): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (task) {
      setInputValue(task.title);
    }
  }, [task]);

  const submit = (event: SyntheticEvent): void => {
    event.preventDefault();

    if (inputValue) {
      onSubmit({ ...task, title: inputValue });
      setInputValue('');
    }
  };

  const onChange = (event: FormEvent<HTMLInputElement>): void => setInputValue(event.currentTarget.value);

  return (
    <form className={styles['taskform']} onSubmit={submit}>
      <FormTextInput
        className={styles['taskform-textfield']}
        classNameInput={styles['taskform-input']}
        placeholder={task ? 'Update task' : 'Create task'}
        value={inputValue}
        onChange={onChange} />

      <Button className={styles['taskform-submit']}>
        {task ? 'Update' : 'Create'}
      </Button>
    </form>
  );
}