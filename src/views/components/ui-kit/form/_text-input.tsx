import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './form.module.scss';

export default function FormTextInput(
  { placeholder, value, className, onChange, classNameInput }:
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { classNameInput?: string }
): JSX.Element {
  return (
    <div className={`${styles['form-group']} ${className ? className : ''}`}>
      <input
        className={`
          ${styles['form-control']}
          ${value ? styles['form-control__filled'] : ''}
          ${classNameInput ? classNameInput : ''}
        `}
        onChange={onChange}
        type='text'
        value={value} />

      <label className={styles['form-label']}>
        { placeholder }
      </label>
    </div>
  );
}