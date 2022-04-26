import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonType } from '../../../../data/types';
import styles from './button.module.scss';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonType;
}

export default function Button({
  children,
  onClick,
  className,
  variant
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`
        ${styles['button']}
        ${styles[`button-${variant ?? 'primary'}`]}
        ${className ? className : ''}
      `}>
      { children }
    </button>
  );
}