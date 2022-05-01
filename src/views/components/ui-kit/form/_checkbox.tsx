import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import styles from './form.module.scss';

export default function FormCheckbox(
  { checked, className, onChange, children }:
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { children?: ReactNode }
): JSX.Element {
  return (
    <div className={`${styles['form-group']} ${styles['form-checkbox']} ${className ? className : ''}`}>
      <label className={styles['form-checkboxlabel']}>
        <input
          onChange={onChange}
          type='checkbox'
          checked={checked} />
          { children }
      </label>
    </div>
  );
}