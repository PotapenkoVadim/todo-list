import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import styles from './form.module.scss';

export interface FormSelectOption {
  label: string;
  value: number | string;
}

export default function FormSelect(
  { placeholder, value, options, name, id, className, onChange }:
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>,HTMLSelectElement>
  & { classNameInput?: string; options: Array<FormSelectOption>; }
): JSX.Element {
  return (
    <div className={`${styles['form-group']} ${className ? className : ''}`}>
      <select
        onChange={onChange}
        className={styles['form-select']}
        value={value}
        name={name}
        id={id} >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}